package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelDAO;
import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.ProgramEnrollmentsDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.MSERRegistrationForm;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.services.UserServiceImpl;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@RestController
public class EnrollmentFormController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private ProgramEnrollmentsDAO programEnrollments;

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositions;

	@Autowired
	private UserServiceImpl userDetailsService;

	@Autowired
	private com.imperialm.imimserservices.util.EmailHandler EmailHandler;

	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.DealerInfoDAO DealerInfoDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;
	
	@Autowired
	private com.imperialm.imimserservices.dao.UserInfoDAOImpl UserInfoDAO;
	
	@Autowired
	private com.imperialm.imimserservices.dao.UserDAOImpl UserDAOImpl;
	
	@Autowired
	private com.imperialm.imimserservices.dao.ProgramGroupEnrollmentsDAO ProgramGroupEnrollmentsDAO;


	@RequestMapping(value ="/enrollments/forms/mser", method = RequestMethod.POST)
	public @ResponseBody Object submitMserForm(@RequestBody final MSERRegistrationForm input, HttpServletRequest request) {

		//List<String> eligiblePC = new ArrayList<String>();
		Map<String,Object> map = new HashMap<>();
		map.put("dealerCode", input.getDealerCode());
		map.put("sid", input.getSid());

		boolean partsManager = false;
		boolean serviceManager = false;
		Object check = this.checkDealership(map, request);
		if(check.getClass().equals( HashMap.class)){
			
			if(!IMIServicesUtil.isValidEmail(input.getEmail().trim())){
				return ResponseEntity.status(500).body("Must provide a valid dealers email");
			}
			
			if(input.getManagerP() != null && !input.getManagerP().trim().isEmpty() && IMIServicesUtil.isValidEmail(input.getManagerPEmail().trim())){
				partsManager = true;
			}else if(input.getManagerS() != null && !input.getManagerS().trim().isEmpty() && !IMIServicesUtil.isValidEmail(input.getManagerS().trim())){
				return ResponseEntity.status(500).body("Must provide a valid managers email");
			}
			

			if(input.getManagerS() != null && !input.getManagerS().trim().isEmpty() && IMIServicesUtil.isValidEmail(input.getManagerSEmail().trim())){
				serviceManager = true;
			}else if(input.getManagerS() != null && !input.getManagerS().trim().isEmpty() && !IMIServicesUtil.isValidEmail(input.getManagerS().trim())){
				return ResponseEntity.status(500).body("Must provide a valid managers email");
			}
			
			if(!serviceManager && !partsManager){
				return ResponseEntity.status(500).body("Must select at 1 Service Manager and/or 1 Parts Manager");
			}
			
			List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCode(input.getDealerCode());
			
			Map<String, List<String>> eligableCodes = new HashMap<>();
			
			List<String> defaultPrograms = Arrays.asList("2","3","4","5","7","10","11");
			eligableCodes.put("2", Arrays.asList("01","13","23","2A","ES","ET"));
			eligableCodes.put("3", Arrays.asList("01","13","23","2A","ES","ET"));
			eligableCodes.put("4", Arrays.asList("01","13","23","2A","ES","ET"));
			eligableCodes.put("5", Arrays.asList("01","13","ES"));
			eligableCodes.put("7", Arrays.asList("13"));
			eligableCodes.put("10", Arrays.asList("13","01","23","2A"));
			eligableCodes.put("11", Arrays.asList("13"));
			
			Map<String, List<String>> userCodes = new HashMap<>();
			
			for(DealerPersonnelDTO user: dpUser){
				if(userCodes.containsKey(user.getSID().trim())){
					userCodes.get(user.getSID().trim()).add(user.getPositionCode().trim());
				}else{
					userCodes.put(user.getSID().trim(), Arrays.asList(user.getPositionCode().trim()));
				}
			}
			
			Set<String> users =  userCodes.keySet();
			
			programEnrollments.enrollDealership(input.getDealerCode().trim());
			
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 2);
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 3);
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 4);
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 5);
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 7);
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 10);
			ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 11);
			
			if(input.isEnrollExpressLane()){
				ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 1);
			}
			
			if(input.isEnrollPartsCounter()){
				ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 6);
			}
			
			if(input.isMvpAuto()){
				ProgramGroupEnrollmentsDAO.setAutoApprovalMVP(input.getDealerCode().trim(), true);
			}
			
			if(input.isEnrollUsedRecon()){
				ProgramGroupEnrollmentsDAO.enrollDealership(input.getDealerCode().trim(), 15);
			}
			
			for(String user: users){
				GroupSIDEnrollmentsDAO.enrollUserDefault(input.getDealerCode().trim(), user, userCodes.get(user), eligableCodes);
			}
			
			if(partsManager){
				GroupSIDEnrollmentsDAO.enrollPartsManger(input.getDealerCode(), input.getManagerP());
				
				new Thread(new Runnable(){

					@Override
					public void run() {
						UserDetailsImpl pManager = (UserDetailsImpl) userDetailsService.loadUserByUsername(input.getManagerP());
						
						if(pManager != null){
							
							String password = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
							String salt = UUID.randomUUID().toString().toUpperCase();
							
							if(UserDAOImpl.setPassword(input.getManagerP(), password, salt)){
								EmailHandler.sendMailConfirmation(pManager, "enrollmentform", password);
							}
							
						}else{
							//create new password send a password
							String password = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
							String salt = UUID.randomUUID().toString().toUpperCase();
							
							if(UserInfoDAO.addUser(input.getManagerP(), input.getManagerPEmail(), password, salt)){
								//send email to Parts Manager
								pManager = (UserDetailsImpl) userDetailsService.loadUserByUsername(input.getManagerP());
								if(pManager != null){
									EmailHandler.sendMailConfirmation(pManager, "enrollmentform", password);
								}
							}
						}
						
					}
					
				}).start();
				
			}
			
			if(serviceManager){
				GroupSIDEnrollmentsDAO.enrollServiceManger(input.getDealerCode(), input.getManagerS());
				
				new Thread(new Runnable(){

					@Override
					public void run() {
						UserDetailsImpl sManager = (UserDetailsImpl) userDetailsService.loadUserByUsername(input.getManagerS());
						
						if(sManager != null){
							
							String password = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
							String salt = UUID.randomUUID().toString().toUpperCase();
							
							if(UserDAOImpl.setPassword(input.getManagerS(), password, salt)){
								EmailHandler.sendMailConfirmation(sManager, "enrollmentform", password);
							}
							
						}else{
							//create new password send a password
							String password = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
							String salt = UUID.randomUUID().toString().toUpperCase();
							
							if(UserInfoDAO.addUser(input.getManagerS(), input.getManagerSEmail(), password, salt)){
								//send email to Parts Manager
								sManager = (UserDetailsImpl) userDetailsService.loadUserByUsername(input.getManagerP());
								if(sManager != null){
									EmailHandler.sendMailConfirmation(sManager, "enrollmentform", password);
								}
							}
						}
						
					}
					
				}).start();
				
				
			}
			
			return true;
			
		}else{
			return check;
		}

	}


	@RequestMapping(value ="/enrollments/forms/mser/check", method = RequestMethod.POST)
	public @ResponseBody Object checkDealership(@RequestBody Map<String, Object> input, HttpServletRequest request) {


		String dealerCode = (String)input.get("dealerCode");
		String sid = (String)input.get("sid");

		//UserDetails user = null;
		boolean registered = false;

		if(!dealerPersonnelPositions.isRegistrationEligiable(sid, dealerCode)){
			return ResponseEntity.status(500).body("Thank you for your interest in the Mopar Service Excellence Rewards program.  However, your SID is not authorized to approve enrollment into MSER.  Please contact your dealer principal or authorized representative.");
		}
		try{
			//user = userDetailsService.loadUserByUsername(sid);
			registered = programEnrollments.isDealershipEnrolled(dealerCode);
		}catch (Exception ex){
			//user not found good to continue
		}

		if(registered){
			return ResponseEntity.status(500).body("Dealership is already registered");
		}


		List<DealerPersonnelDTO> serviceManagers = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, "09");
		List<DealerPersonnelDTO> partsManagers = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, "08");

		List<NameValue> serviceManagersList = new ArrayList<>();
		List<NameValue> partsManagersList = new ArrayList<>();

		for(DealerPersonnelDTO item: serviceManagers){
			serviceManagersList.add(new NameValue(item.getSID(), item.getFirstName() + " " + item.getLastName()));
		}

		for(DealerPersonnelDTO item: partsManagers){
			partsManagersList.add(new NameValue(item.getSID(), item.getFirstName() + " " + item.getLastName()));
		}

		String dealershipName = DealerInfoDAO.getDealershipName(dealerCode);
		boolean elValidated = DealerInfoDAO.isELValidated(dealerCode);

		String dealerSize = DealerInfoDAO.getDealerSize(dealerCode);
		Map<String, Object> response = new HashMap<>();

		response.put("dealershipName", dealershipName);
		response.put("PartsManagers",partsManagersList);
		response.put("ServiceManagers",serviceManagersList);
		response.put("ELValidated",elValidated);
		response.put("mvpAuto",false);
		response.put("size", dealerSize);
		
		//EmailHandler.sendMailConfirmation(object, "", other);

		return response;
	}





}
