package com.imperialm.imimserservices.security.controller;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelDAOImpl;
import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO;
import com.imperialm.imimserservices.dao.UserPositionCodeRoleDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.ParticipantEnrollmentList;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.dto.UsersDTO;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.security.JwtAuthenticationRequest;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.security.service.JwtAuthenticationResponse;
import com.imperialm.imimserservices.services.UserServiceImpl;

@RestController
public class AuthenticationRestController {

	@Value("${jwt.header}")
	private String tokenHeader;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserPositionCodeRoleDAO userPositionCodeRoleDAO;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserServiceImpl userDetailsService;

	@Autowired
	private com.imperialm.imimserservices.dao.UserProgramRolesDAO UserProgramRolesDAO;

	@Autowired
	private DealerPersonnelPositionsDAO DealerPersonnelPositionsDAO;

	@Autowired
	private GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.DealerInfoDAO DealerInfoDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.ProgramEnrollmentsDAO ProgramEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.ProgramGroupEnrollmentsDAO ProgramGroupEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.UserDAOImpl UserDAOImpl;

	@Autowired
	private DealerPersonnelDAOImpl DealerPersonnelDAOImpl;



	private static Logger logger = LoggerFactory.getLogger(AuthenticationRestController.class);

	@RequestMapping(value = "/login/token", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {
		// Reload password post-security so we can generate token
		final Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						authenticationRequest.getUsername().trim(),
						authenticationRequest.getPassword()
						)
				);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		final UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(authenticationRequest.getUsername().trim());
		final String token = jwtTokenUtil.generateToken(user);

		logger.info("User Id: " + user.getUserId() + ", signed in!");
		return finalizeToken(token,user, null , null);
	}

	@RequestMapping(value = "/login/tokenrefresh", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username.trim());

		if (jwtTokenUtil.canTokenBeRefreshed(token)) {
			String refreshedToken = jwtTokenUtil.refreshToken(token);
			return finalizeToken(refreshedToken,user, null , null);
		} else {
			return ResponseEntity.badRequest().body("Invalid Token");
		}
	}

	@RequestMapping(value = "/login/token/{token}/{positionCode}/{dealerCode}", method = RequestMethod.GET)
	public ResponseEntity<?> createAuthenticationToken(@PathVariable(value="token") String token, @PathVariable(value="positionCode") String tokenPositionCode, @PathVariable(value="dealerCode")String tokenDealerCode) throws AuthenticationException {

		String username = jwtTokenUtil.getUsernameFromToken(token);
		UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username.trim());

		if(!jwtTokenUtil.validateToken(token, user)){
			//token is expired/invalid token
			return ResponseEntity.status(500).body("Invalid Token");
		}

		if(tokenDealerCode.length() != 5){
			tokenDealerCode = "";
		}

		if(!DealerPersonnelPositionsDAO.checkPositionCode(tokenPositionCode) || tokenPositionCode.trim().equals("00")){
			tokenPositionCode = "";
		}

		return finalizeToken(token,user, tokenPositionCode , tokenDealerCode);
	}

	public ResponseEntity<?> finalizeToken(String token, UserDetailsImpl user, String tokenPositionCode, String tokenDealerCode){
		//List<UserPositionCodeRoleDTO> userCodes = userPositionCodeRoleDAO.getDealerCodePCRoleBySid(user.getUserId());

		List<ParticipantEnrollmentList> userCodes = GroupSIDEnrollmentsDAO.getParticipantEnrollementListIgnoreStatus(user.getUserId());

		List<String> positionCode = new ArrayList<String>();
		List<String> dealerCode = new ArrayList<String>();
		List<String> dealerName = new ArrayList<String>();
		List<String> bcs = new ArrayList<String>();
		List<Integer> userRoles = new ArrayList<Integer>();
		List<String> pcdescs = new ArrayList<>();
		List<Boolean> mserEnrollment = new ArrayList<Boolean>();
		List<Boolean> dealerManager = new ArrayList<Boolean>();
		List<Boolean> serviceManagerOfRecord = new ArrayList<Boolean>();
		List<Boolean> partsManagerOfRecord = new ArrayList<Boolean>();
		List<Boolean> elManager = new ArrayList<Boolean>();
		List<Boolean> pcManager = new ArrayList<Boolean>();
		List<Boolean> uvmManager = new ArrayList<Boolean>();
		List<Boolean> elEnrolled = new ArrayList<Boolean>();
		List<Boolean> elValidated = new ArrayList<Boolean>();
		List<Boolean> pcEnrolled = new ArrayList<Boolean>();
		List<Boolean> elManagerExists = new ArrayList<Boolean>();
		List<Boolean> uvmManagerExists = new ArrayList<Boolean>();
		List<Boolean> pcManagerExists = new ArrayList<Boolean>();
		List<Boolean> mvpApproval = new ArrayList<Boolean>();
		Boolean isHalfAdmin = false;

		//change this so it will check the positioncode and the dealercode;
		/*if(!(tokenPositionCode == null || tokenPositionCode.isEmpty() || tokenPositionCode.equalsIgnoreCase("undefined"))){
			positionCode.add(tokenPositionCode);
		}

		if(!(tokenDealerCode == null || tokenDealerCode.isEmpty() ||  tokenDealerCode.equalsIgnoreCase("undefined"))){
			dealerCode.add(tokenDealerCode);
		}*/

		/*for(ParticipantEnrollmentList item: userCodes){
			if(!item.getPositionCode().equalsIgnoreCase("ZZ")){
				if(item.getDealerCode() != null){
					positionCode.add(item.getPositionCode());
				}else{
					positionCode.add("ZZ");
				}
			}else{
				if(item.getOriginalPostionCode() != null){
					positionCode.add(item.getOriginalPostionCode());
				}else{
					positionCode.add("ZZ");
				}
			}
			dealerCode.add(item.getDealerCode());
		}*/


		for(ParticipantEnrollmentList item: userCodes){
			if(!item.getPositionCode().equalsIgnoreCase("ZZ")){
				if(item.getDealerCode() != null){
					positionCode.add(item.getPositionCode());
					dealerCode.add(item.getDealerCode());
				}/*else{
					if(!positionCode.contains("ZZ")){
						positionCode.add("ZZ");
						dealerCode.add(item.getDealerCode());
					}
				}*/
			}else{
				if(item.getOriginalPostionCode() != null){
					int i = positionCode.indexOf(item.getOriginalPostionCode());
					String checkDealerCode = "";
					if(i >= 0){
						checkDealerCode = dealerCode.get(i);
					}
					if(i < 0){
						positionCode.add(item.getOriginalPostionCode());
						dealerCode.add(item.getDealerCode());
					}else if( i >= 0 && !checkDealerCode.trim().equalsIgnoreCase(item.getDealerCode().trim())){
						positionCode.add(item.getOriginalPostionCode());
						dealerCode.add(item.getDealerCode());
					}
				}/*else{
					if(!positionCode.contains("ZZ")){
						positionCode.add("ZZ");
						dealerCode.add(item.getDealerCode());
					}
				}*/
			}
		}




		if(userCodes.size() == 0){
			/*List<TIDUsersDTO> tids = TIDUsersDAO.getTIDUsersByTID(user.getUserId());
			if(tids.size() > 0){
				for(TIDUsersDTO item: tids){
					positionCode.add(item.getPositionCode());
					if (item.getTerritory().length() == 5){
						dealerCode.add(item.getTerritory());
					}
				}
			}else{*/
			List<String> territoryCheck = this.userPositionCodeRoleDAO.getUserTerritoyById(user.getUserId());
			//if(territoryCheck.size() > 0){
			for(int i=0; i< territoryCheck.size(); i++){
				if(territoryCheck.get(i).equalsIgnoreCase("nat")){
					positionCode.add("90");
					dealerCode.add(territoryCheck.get(i));
					mserEnrollment.add(true);

					elManager.add(false);
					pcManager.add(false);
					uvmManager.add(false);
					dealerManager.add(false);
					serviceManagerOfRecord.add(false);
					partsManagerOfRecord.add(false);
					elEnrolled.add(false);
					pcEnrolled.add(false);
					elValidated.add(false);
					
					elManagerExists.add(false);
					uvmManagerExists.add(false);
					pcManagerExists.add(false);
					
					mvpApproval.add(false);

					bcs.add("NAT");

					isHalfAdmin = true;

				}else if(territoryCheck.get(i).contains("-") && territoryCheck.get(i).length()>2){
					positionCode.add("97");
					dealerCode.add(territoryCheck.get(i));
					mserEnrollment.add(true);

					elManager.add(false);
					pcManager.add(false);
					uvmManager.add(false);
					dealerManager.add(false);
					serviceManagerOfRecord.add(false);
					partsManagerOfRecord.add(false);
					elEnrolled.add(false);
					pcEnrolled.add(false);
					elValidated.add(false);


					elManagerExists.add(false);
					uvmManagerExists.add(false);
					pcManagerExists.add(false);
					
					mvpApproval.add(false);
					
					bcs.add(territoryCheck.get(i).substring(0,2));

					isHalfAdmin = true;

				}else if(territoryCheck.get(i).trim().length() == 2){
					positionCode.add("8D");
					dealerCode.add(territoryCheck.get(i));
					mserEnrollment.add(true);

					elManager.add(false);
					pcManager.add(false);
					uvmManager.add(false);
					dealerManager.add(false);
					serviceManagerOfRecord.add(false);
					partsManagerOfRecord.add(false);
					elEnrolled.add(false);
					pcEnrolled.add(false);
					elValidated.add(false);
					
					elManagerExists.add(false);
					uvmManagerExists.add(false);
					pcManagerExists.add(false);
					
					mvpApproval.add(false);

					bcs.add(territoryCheck.get(i));

					isHalfAdmin = true;
				}
			}
		}

		Set<String> d = new LinkedHashSet<>(dealerCode);
		String sid = user.getUserId().trim();
		Map<String, String> districtsMap = this.getDealerDistrict(d);
		Map<String, Boolean> mserEnrollmentMap = this.getmserEnrollment(d);
		Map<String, Boolean> elManagerMap = this.getelManager(d, sid);
		Map<String, Boolean> pcManagerMap = this.getpcManager(d, sid);
		Map<String, Boolean> uvmManagerMap = this.getUVMManager(d, sid);
		Map<String, Boolean> elEnrolledMap = this.getisDealershipEnrolledByProgramGroup(d, 1);
		Map<String, Boolean> elValidatedMap = this.getelValidated(d);
		Map<String, Boolean> pcEnrolledMap = this.getisDealershipEnrolledByProgramGroup(d, 6);
		Map<String, Boolean> dealerManagerMap = this.getDealerPrecipal(d, sid);
		Map<String, Boolean> serviceManagerOfRecordMap = this.getisServiceManagerOfRecord(d, sid);
		Map<String, Boolean> partsManagerOfRecordMap = this.getisPartsManagerOfRecord(d, sid);
		Map<String, Boolean> currentDealershipMap = this.currentDealership(d, sid);
		Map<String, Boolean> elManagerExistsMap = this.isEnrolledParticipantExistsByDealerAndProgramGoupId(d, 1);
		Map<String, Boolean> uvmManagerExistsMap = this.isEnrolledParticipantExistsByDealerAndProgramGoupId(d, 15);
		Map<String, Boolean> pcManagerExistsMap = this.isEnrolledParticipantExistsByDealerAndProgramGoupId(d, 6);
		Map<String,Boolean> mvpApprovalMap = this.mvpApprovalByDealerAndSID(d, sid);
		//}
		/*Set<String> p = new LinkedHashSet<>(positionCode);
		Set<String> d = new LinkedHashSet<>(dealerCode);
		positionCode.clear();
		dealerCode.clear();

		positionCode.addAll(p);
		dealerCode.addAll(d);*/

		for(String dc: dealerCode){
			dealerName.add(DealerInfoDAO.getDealershipName(dc));
			if(dc.length() == 5){
				/*String district = DealerInfoDAO.getDealerDistrict(dc);
				bcs.add(district);
				mserEnrollment.add(ProgramEnrollmentsDAO.isDealershipEnrolled(dc));
				elManager.add(GroupSIDEnrollmentsDAO.isELManager(dc, user.getUserId()));
				pcManager.add(GroupSIDEnrollmentsDAO.isPCManager(dc, user.getUserId()));
				uvmManager.add(GroupSIDEnrollmentsDAO.isUVMManager(dc, user.getUserId()));
				elEnrolled.add(this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dc, 1));
				elValidated.add(this.DealerInfoDAO.isELValidated(dc));
				pcEnrolled.add(this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dc, 6));
				dealerManager.add(GroupSIDEnrollmentsDAO.isDealerPricipal(dc, user.getUserId()));
				serviceManagerOfRecord.add(GroupSIDEnrollmentsDAO.isServiceManagerOfRecord(dc, user.getUserId()));
				partsManagerOfRecord.add(GroupSIDEnrollmentsDAO.isPartsManagerOfRecord(dc, user.getUserId()));*/
				bcs.add(StringUtils.defaultString(districtsMap.get(dc)));
				mserEnrollment.add(BooleanUtils.isTrue(mserEnrollmentMap.get(dc)));
				elEnrolled.add(BooleanUtils.isTrue(elEnrolledMap.get(dc)));
				elValidated.add(BooleanUtils.isTrue(elValidatedMap.get(dc)));
				pcEnrolled.add(BooleanUtils.isTrue(pcEnrolledMap.get(dc)));
				if(BooleanUtils.isTrue(currentDealershipMap.get(dc))){
					elManagerExists.add(BooleanUtils.isTrue(elManagerExistsMap.get(dc)));
					uvmManagerExists.add(BooleanUtils.isTrue(uvmManagerExistsMap.get(dc)));
					pcManagerExists.add(BooleanUtils.isTrue(pcManagerExistsMap.get(dc)));
					elManager.add(BooleanUtils.isTrue(elManagerMap.get(dc)));
					pcManager.add(BooleanUtils.isTrue(pcManagerMap.get(dc)));
					uvmManager.add(BooleanUtils.isTrue(uvmManagerMap.get(dc)));
					dealerManager.add(BooleanUtils.isTrue(dealerManagerMap.get(dc)));
					serviceManagerOfRecord.add(BooleanUtils.isTrue(serviceManagerOfRecordMap.get(dc)));
					partsManagerOfRecord.add(BooleanUtils.isTrue(partsManagerOfRecordMap.get(dc)));
					mvpApproval.add(BooleanUtils.isTrue(mvpApprovalMap.get(dc)));
				}else{
					elManager.add(false);
					pcManager.add(false);
					uvmManager.add(false);
					dealerManager.add(false);
					serviceManagerOfRecord.add(false);
					partsManagerOfRecord.add(false);
					elManagerExists.add(false);
					uvmManagerExists.add(false);
					pcManagerExists.add(false);
					mvpApproval.add(false);
				}				
			}

		}

		List<TwoStringItems> pcdesc = DealerPersonnelPositionsDAO.getAllPositionCodesWithNames();
		for(String pc: positionCode){
			userRoles.add(DealerPersonnelPositionsDAO.getRoleByPositionCode(pc));
			for(TwoStringItems temp: pcdesc){
				if(temp.getItem1().equalsIgnoreCase(pc)){
					pcdescs.add("("+ temp.getItem1() + ") - " + temp.getItem2());
				}
			}
		}

		JwtAuthenticationResponse response =new JwtAuthenticationResponse(token);
		response.setPositionCode(positionCode);
		response.setRoles(userRoles);
		response.setDealerCode(dealerCode);
		response.setDealerName(dealerName);
		response.setDealerManager(dealerManager);
		response.setServiceManagerOfRecord(serviceManagerOfRecord);
		response.setPartsManagerOfRecord(partsManagerOfRecord);
		response.setElManager(elManager);
		response.setPcManager(pcManager);
		response.setUvmManager(uvmManager);
		response.setElEnrolled(elEnrolled);
		response.setElValidated(elValidated);
		response.setPcEnrolled(pcEnrolled);
		response.setPositionCodeDesc(pcdescs);
		response.setBcs(bcs);
		response.setUvmManagerExists(uvmManagerExists);
		response.setPcManagerExists(pcManagerExists);
		response.setElManagerExists(elManagerExists);
		response.setMvpApproval(mvpApproval);


		List<UsersDTO> userProfile = UserDAOImpl.getPasswordChange(user.getUserId());
		if(userProfile.size()>0){
			if(userProfile.get(0).getChangePassword() != null && userProfile.get(0).getChangePassword().equalsIgnoreCase("Y")){
				response.setPasswordReset(true);
			}
		}


		if(mserEnrollment.contains(true)){
			response.setMserEnrollment(true);
		}
		response.setName(user.getUsername());
		response.setUserId(jwtTokenUtil.getUsernameFromToken(token));
		if(UserProgramRolesDAO.isAdmin(user.getUserId().trim())){
			response.setAdmin(true);
		}

		if(!response.isAdmin()){
			/*if(UserProgramRolesDAO.isHalfAdmin(user.getUserId().trim())){
				response.setHalfAdmin(true);
			}*/
			response.setHalfAdmin(isHalfAdmin);
		}

		return ResponseEntity.ok(response);
	}

	public String get_SHA_512_SecurePassword(String passwordToHash, String   salt){
		String generatedPassword = null;
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			passwordToHash= passwordToHash + salt;
			md.update(passwordToHash.getBytes("UTF-8"));
			byte[] bytes = md.digest();
			StringBuilder sb = new StringBuilder();
			for(int i=0; i< bytes.length ;i++){
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}
			generatedPassword = sb.toString();
		} 
		catch (Exception e){
			return null;
		}
		return generatedPassword;
	}


	public Map<String, Boolean> getDealerPrecipal(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, GroupSIDEnrollmentsDAO.isDealerPricipal(dealer, sid));
		}
		return result;
	}

	public Map<String, Boolean> getelManager(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, GroupSIDEnrollmentsDAO.isELManager(dealer, sid));
		}
		return result;
	}

	public Map<String, Boolean> getpcManager(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, GroupSIDEnrollmentsDAO.isPCManager(dealer, sid));
		}
		return result;
	}

	public Map<String, Boolean> getisServiceManagerOfRecord(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, GroupSIDEnrollmentsDAO.isServiceManagerOfRecord(dealer, sid));
		}
		return result;
	}

	public Map<String, Boolean> getisPartsManagerOfRecord(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, GroupSIDEnrollmentsDAO.isPartsManagerOfRecord(dealer, sid));
		}
		return result;
	}

	public Map<String, Boolean> getelValidated(Set<String> dealers){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, this.DealerInfoDAO.isELValidated(dealer));
		}
		return result;
	}

	public Map<String, Boolean> getUVMManager(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, GroupSIDEnrollmentsDAO.isUVMManager(dealer, sid));
		}
		return result;
	}
	
	
	public Map<String, Boolean> mvpApprovalByDealerAndSID(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, DealerPersonnelDAOImpl.mvpApprovalByDealerAndSID(dealer, sid));
		}
		return result;
	}

	public Map<String, String> getDealerDistrict(Set<String> dealers){
		Map<String,String> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, DealerInfoDAO.getDealerDistrict(dealer));
		}
		return result;
	}

	public Map<String, Boolean> getmserEnrollment(Set<String> dealers){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, ProgramEnrollmentsDAO.isDealershipEnrolled(dealer));
		}
		return result;
	}

	public Map<String, Boolean> getisDealershipEnrolledByProgramGroup(Set<String> dealers, int programId){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dealer, programId));
		}
		return result;
	}

	public Map<String, Boolean> isEnrolledParticipantExistsByDealerAndProgramGoupId(Set<String> dealers, int programId){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			result.put(dealer, this.GroupSIDEnrollmentsDAO.isEnrolledParticipantExistsByDealerAndProgramGoupId(dealer, programId));
		}
		return result;
	}

	public Map<String, Boolean> currentDealership(Set<String> dealers, String sid){
		Map<String,Boolean> result = new HashMap<>();
		for(String dealer: dealers){
			List<DealerPersonnelDTO> list = DealerPersonnelDAOImpl.getSIDInfoBySIDAndDealerCode(sid, dealer);
			result.put(dealer, list.size() > 0);
		}
		return result;
	}



}
