package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentswProgramDTO;
import com.imperialm.imimserservices.dto.ParticipantEnrollmentList;
import com.imperialm.imimserservices.dto.ProgramGroupEnrollmentsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.DealerMaintenance;
import com.imperialm.imimserservices.model.OneItem;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.model.UserMaintenance;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.security.service.JwtAuthenticationResponse;
import com.imperialm.imimserservices.services.UserServiceImpl;
import com.imperialm.imimserservices.util.IMIServicesUtil;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AdminController {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserServiceImpl userDetailsService;

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositionsDAO;

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.DealerInfoDAO DealerInfoDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.ProgramEnrollmentsDAO ProgramEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.ProgramGroupEnrollmentsDAO ProgramGroupEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.DealerPersonnelDAO DealerPersonnelDAO;

	@RequestMapping(value = "/services/admin/emulate/{id}", method = RequestMethod.GET)
	public @ResponseBody Object getNoTile(@PathVariable(value = "id") String id, HttpServletRequest request) {

		OneItem tokenToPass = new OneItem();
		@SuppressWarnings("unused")
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		UserDetailsImpl emulatedUser = null;
		try {
			emulatedUser = (UserDetailsImpl) userDetailsService.loadUserByUsername(id);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("User with ID: " + id + " was not found");
		}
		if (emulatedUser != null) {
			tokenToPass.setItem(jwtTokenUtil.generateToken(emulatedUser));
		} else {
			return ResponseEntity.status(500).body("User with ID: " + id + " was not found");
		}
		return tokenToPass;
	}

	/*
	 * @RequestMapping(value = "/services/admin/resetcache", method =
	 * RequestMethod.GET) public @ResponseBody Object
	 * resetcache(HttpServletRequest request) {
	 * IMIServiceSecutiryConfig.resetCache(); return "Cache reset"; }
	 */

	@RequestMapping(value = "/services/admin/getAllPositionCodes/", method = RequestMethod.GET)
	public @ResponseBody Object getAllPositionCodes(HttpServletRequest request) {
		try {
			return dealerPersonnelPositionsDAO.getAllPositionCodes();
		} catch (Exception e) {
			return ResponseEntity.status(500).body("error fetching all positioncodes");
		}
	}

	@RequestMapping(value = "/services/admin/checkDealerCode/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object isValidDealer(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {
		try {
			if (dealerPersonnelPositionsDAO.isValidDealer(dealerCode)) {
				return true;
			} else {
				return ResponseEntity.status(500).body("Not a valid dealer code");
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("error in checking dealer code");
		}
	}

	@RequestMapping(value = "/services/admin/dealerEmulation/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object dealerEmulation(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		try {
			if (!dealerPersonnelPositionsDAO.isValidDealer(dealerCode)) {
				return ResponseEntity.status(500).body("Not a valid Dealer Code");
			} else {
				List<String> dealerpricipals = this.dealerPersonnelPositionsDAO.getDealerPricipal(dealerCode);
				if (dealerpricipals.size() > 0) {
					// user = (UserDetailsImpl)
					// userDetailsService.loadUserByUsername(dealerpricipals.get(0));
					final String token = jwtTokenUtil.generateToken(user);
					// TEST then use finalizeTokenForDealerEmulation pass the
					// admin token, remove the line two rows above too
					return finalizeTokenForDealerEmulation(token, user, "01", dealerCode);
				} else {
					return ResponseEntity.badRequest().body("Could not find a Dealer Principal");
				}
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("error in checking dealer code");
		}
	}

	@RequestMapping(value = "/services/admin/districts/{bc}", method = RequestMethod.GET)
	public @ResponseBody Object getDistrictsByBC(@PathVariable(value = "bc") String bc, HttpServletRequest request) {
		try {
			if (!bc.equalsIgnoreCase("NAT")) {
				return dealerPersonnelPositionsDAO.getDistrictsByBC(bc);
			} else {
				List<String> bcs = dealerPersonnelPositionsDAO.getDistrictsByBC(bc);
				List<String> districts = new ArrayList<>();
				for (String district : bcs) {
					districts.addAll(dealerPersonnelPositionsDAO.getDistrictsByBC(district));
				}
				return districts;
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("could not fetch districts at this time");
		}
	}

	public ResponseEntity<?> finalizeToken(String token, UserDetailsImpl user, String tokenPositionCode,
			String tokenDealerCode) {

		List<ParticipantEnrollmentList> userCodes = GroupSIDEnrollmentsDAO
				.getParticipantEnrollementListIgnoreStatus(user.getUserId());

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
		List<Boolean> mvpApproval = new ArrayList<Boolean>();

		for (ParticipantEnrollmentList item : userCodes) {
			if (item.getPositionCode().equals(tokenPositionCode) && item.getDealerCode().equals(tokenDealerCode)) {
				positionCode.add(item.getPositionCode());
				dealerCode.add(item.getDealerCode());
			}
		}

		for (String dc : dealerCode) {
			dealerName.add(DealerInfoDAO.getDealershipName(dc));
			mserEnrollment.add(ProgramEnrollmentsDAO.isDealershipEnrolled(dc));

			elManager.add(GroupSIDEnrollmentsDAO.isELManager(dc, user.getUserId()));
			pcManager.add(GroupSIDEnrollmentsDAO.isPCManager(dc, user.getUserId()));
			uvmManager.add(GroupSIDEnrollmentsDAO.isPCManager(dc, user.getUserId()));

			elEnrolled.add(this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dc, 1));
			pcEnrolled.add(this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dc, 6));

			dealerManager.add(GroupSIDEnrollmentsDAO.isDealerPricipal(dc, user.getUserId()));
			serviceManagerOfRecord.add(GroupSIDEnrollmentsDAO.isServiceManagerOfRecord(dc, user.getUserId()));
			partsManagerOfRecord.add(GroupSIDEnrollmentsDAO.isPartsManagerOfRecord(dc, user.getUserId()));

			String district = DealerInfoDAO.getDealerDistrict(dc);
			bcs.add(district);
			elValidated.add(this.DealerInfoDAO.isELValidated(dc));
			mvpApproval.add(DealerPersonnelDAO.mvpApprovalByDealerAndSID(dc, user.getUserId()));

		}

		for (String pc : positionCode) {
			userRoles.add(dealerPersonnelPositionsDAO.getRoleByPositionCode(pc));
		}

		JwtAuthenticationResponse response = new JwtAuthenticationResponse(token);
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
		response.setMvpApproval(mvpApproval);
		response.setBcs(bcs);

		if (mserEnrollment.contains(true)) {
			response.setMserEnrollment(true);
		}
		response.setName(user.getUsername());
		response.setUserId(jwtTokenUtil.getUsernameFromToken(token));
		return ResponseEntity.ok(response);
	}

	public ResponseEntity<?> finalizeTokenForDealerEmulation(String token, UserDetailsImpl user,
			String tokenPositionCode, String tokenDealerCode) {

		/*List<ParticipantEnrollmentList> userCodes = GroupSIDEnrollmentsDAO
				.getParticipantEnrollementListIgnoreStatus(user.getUserId());*/

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
		
		positionCode.add(tokenPositionCode);
		dealerCode.add(tokenDealerCode);

		for (String dc : dealerCode) {
			dealerName.add(DealerInfoDAO.getDealershipName(dc));
			mserEnrollment.add(ProgramEnrollmentsDAO.isDealershipEnrolled(dc));

			// elManager.add(true);
			// pcManager.add(true);
			// uvmManager.add(true);

			elEnrolled.add(this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dc, 1));
			pcEnrolled.add(this.ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dc, 6));

			dealerManager.add(true);
			serviceManagerOfRecord.add(true);
			partsManagerOfRecord.add(true);

			String district = DealerInfoDAO.getDealerDistrict(dc);
			bcs.add(district);
			elValidated.add(this.DealerInfoDAO.isELValidated(dc));

			elManagerExists.add(this.GroupSIDEnrollmentsDAO.isEnrolledParticipantExistsByDealerAndProgramGoupId(dc, 1));
			uvmManagerExists
					.add(this.GroupSIDEnrollmentsDAO.isEnrolledParticipantExistsByDealerAndProgramGoupId(dc, 15));
			pcManagerExists.add(this.GroupSIDEnrollmentsDAO.isEnrolledParticipantExistsByDealerAndProgramGoupId(dc, 6));
			elManager.add(elManagerExists.get(0));
			pcManager.add(pcManagerExists.get(0));
			uvmManager.add(uvmManagerExists.get(0));			
			mvpApproval.add(true);
		}

		List<TwoStringItems> pcdesc = dealerPersonnelPositionsDAO.getAllPositionCodesWithNames();
		for (String pc : positionCode) {
			userRoles.add(dealerPersonnelPositionsDAO.getRoleByPositionCode(pc));
			for (TwoStringItems temp : pcdesc) {
				if (temp.getItem1().equalsIgnoreCase(pc)) {
					pcdescs.add("(" + temp.getItem1() + ") - " + temp.getItem2());
				}
			}
		}

		JwtAuthenticationResponse response = new JwtAuthenticationResponse(token);
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
		
		
		if (mserEnrollment.contains(true)) {
			response.setMserEnrollment(true);
		}
		response.setName(user.getUsername());
		response.setUserId(jwtTokenUtil.getUsernameFromToken(token));
		return ResponseEntity.ok(response);
	}

	@RequestMapping(value = "/services/admin/dealerMaintenance/{code}", method = RequestMethod.GET)
	public @ResponseBody Object getDealerMaintenance(@PathVariable(value = "code") String code,
			HttpServletRequest request) {
		IMIServicesUtil.checkAdminToken(request);
		try {
			String name = DealerInfoDAO.getDealershipName(code);
			if (name.isEmpty()) {
				return ResponseEntity.status(500).body("No dealership with dealer code: " + code + " was found");
			}

			List<ProgramGroupEnrollmentsDTO> enrollments = ProgramGroupEnrollmentsDAO
					.getProgramGroupEnrollmentsByDealerCode(code);
			for (ProgramGroupEnrollmentsDTO enrollment : enrollments) {
				if (enrollment.getUpdateDate() == null) {
					enrollment.setUpdateDate(enrollment.getCreatedDate());
				}
			}

			DealerMaintenance result = new DealerMaintenance();
			result.setDealerCode(code);
			result.setName(name);
			result.setDistrict(DealerInfoDAO.getDealerDistrict(code));
			result.setEnrollment(enrollments);
			return result;
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error in getDealerMaintenance!");
		}
	}

	@RequestMapping(value = "/services/admin/userMaintenance/{id}", method = RequestMethod.GET)
	public @ResponseBody Object getUserMaintenance(@PathVariable(value = "id") String id, HttpServletRequest request) {
		IMIServicesUtil.checkAdminToken(request);
		try {
			UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(id);
			if (user == null || user.getUserId().isEmpty()) {
				return ResponseEntity.status(500).body("User with SID: " + id + " doesn't exists !");
			}

			List<DealerPersonnelDTO> infoList = DealerPersonnelDAO.getSIDInfoBySID(id);
			List<GroupSIDEnrollmentswProgramDTO> status = GroupSIDEnrollmentsDAO.getGroupSidEnrollmentsBySIDEnrolled(id);

			if (infoList.size() > 0) {
				UserMaintenance result = new UserMaintenance();
				result.setName(infoList.get(0).getFirstName() + " " + infoList.get(0).getLastName());
				result.setUserId(id);
				result.setEnrollment(status);
				return result;
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("could not get maintenance info");
		}

		return ResponseEntity.status(500).body("could not get maintenance info");
	}

	@RequestMapping(value = "/services/admin/saveUserMaintenance", method = RequestMethod.POST)
	public @ResponseBody Object saveUserMaintenance(@RequestBody final UserMaintenance user,
			HttpServletRequest request) {
		IMIServicesUtil.checkAdminToken(request);
		try {
			for (GroupSIDEnrollmentswProgramDTO enrollment : user.getEnrollment()) {
                            GroupSIDEnrollmentsDAO.updateEnrollmentDate(enrollment);
			}

			return ResponseEntity.status(200).body("Enrollment date saved successfully !");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("could not update user maintenance info");
		}
	}

	@RequestMapping(value = "/services/admin/saveUserMaintenanceByEnrollment", method = RequestMethod.POST)
	public @ResponseBody Object saveUserMaintenanceByEnrollment(@RequestBody final GroupSIDEnrollmentswProgramDTO enrollment,
			HttpServletRequest request) {
            IMIServicesUtil.checkAdminToken(request);
            try {
                GroupSIDEnrollmentsDAO.updateEnrollmentDate(enrollment);
                return ResponseEntity.status(200).body("Enrollment date saved successfully !");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("could not update user maintenance info");
            }
	}

	@RequestMapping(value = "/services/admin/saveDealerMaintenance", method = RequestMethod.POST)
	public @ResponseBody Object saveDealerMaintenance(@RequestBody final DealerMaintenance dealer,
			HttpServletRequest request) {
		IMIServicesUtil.checkAdminToken(request);
		try {
			for (ProgramGroupEnrollmentsDTO enrollment : dealer.getEnrollment()) {
				if (ProgramEnrollmentsDAO.isDealershipEnrolled(enrollment.getDealerCode())) {
					if (!enrollment.getStatus().equals("E")) { // de-enroll
																// dealership
						ProgramEnrollmentsDAO.disEnroll(enrollment.getDealerCode(), enrollment.getUpdatedBy());
						ProgramGroupEnrollmentsDAO.disEnroll(enrollment.getDealerCode(), enrollment.getUpdatedBy());
						GroupSIDEnrollmentsDAO.disEnroll(enrollment.getDealerCode(), enrollment.getUpdatedBy());
					} else {
						ProgramGroupEnrollmentsDAO.updateEnrollmentDate(enrollment);
						ProgramEnrollmentsDAO.updateEnrollmentDateByProgramId(enrollment.getDealerCode(), "1",
								enrollment.getUpdatedBy(), enrollment.getUpdateDate());
					}
				}
			}
			return ResponseEntity.status(200).body("Enrollment date saved successfully !");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("could not update maintenance info" + e.getMessage());
		}
	}
}