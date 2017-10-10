package com.imperialm.imimserservices.rest;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.ProgramEnrollmentsDAO;
import com.imperialm.imimserservices.dao.UserDAOImpl;
import com.imperialm.imimserservices.dao.UserInfoDAO;
import com.imperialm.imimserservices.dto.UsersDTO;
import com.imperialm.imimserservices.model.MSERRegistrationForm;
import com.imperialm.imimserservices.model.UserProfile;
import com.imperialm.imimserservices.services.UserServiceImpl;
import com.imperialm.imimserservices.util.EmailHandler;

@RestController
public class RegistrationController {

	@Autowired
	private EmailHandler emailHandler;

	@Autowired
	private UserServiceImpl userDetailsService;

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositions;

	@Autowired
	private ProgramEnrollmentsDAO programEnrollments;

	@Autowired
	private UserInfoDAO userInfo;

	@Autowired
	private UserDAOImpl userDAOImpl;


	//@RequestMapping(value = "/Registration/dealerRegistration", method = RequestMethod.POST)
	public @ResponseBody Object dealerRegistration(@RequestBody Map<String, Object> input, HttpServletRequest request) {
		String dealerCode = (String)input.get("dealerCode");
		String sid = (String)input.get("sid");
		String email = (String)input.get("email");
		UserDetails user = null;
		boolean registered = false;

		boolean result = false;

		if(!dealerPersonnelPositions.isRegistrationEligiable(sid, dealerCode)){
			return ResponseEntity.status(500).body("Thank you for your interest in the Mopar Service Excellence Rewards program.  However, your SID is not authorized to approve enrollment into MSER.  Please contact your dealer principal or authorized representative.");
		}
		try{
			user = userDetailsService.loadUserByUsername(sid);
			registered = programEnrollments.isDealershipEnrolled(dealerCode);
		}catch (Exception ex){
			//user not found good to continue
		}

		if(registered){
			return ResponseEntity.status(500).body("Dealership is already registered");
		}else if(user == null){

			UsersDTO newUser = new UsersDTO();
			newUser.setEmail(email);
			newUser.setUserId(sid);
			String newPassword = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
			String salt = UUID.randomUUID().toString().toUpperCase();
			if(userInfo.addUser(sid,email,newPassword,salt)){
				if(programEnrollments.isDealershipRecordExists(dealerCode)){
					result = programEnrollments.updateDealershipEnrollment(dealerCode);
				}else{
					result = programEnrollments.enrollDealership(dealerCode);
				}
				user = userDetailsService.loadUserByUsername(sid);
				emailHandler.sendMailConfirmation(user, "MSERNewUser", newPassword);
			}else{
				return ResponseEntity.status(500).body("Error creating a new User, please contact customer service");
			}

			return result;
		}else{
			//user exists, update the email
			List<UsersDTO> temp = userDAOImpl.getProfile(sid);
			UsersDTO profile = temp.get(0);
			profile.setEmail(email);
			userDAOImpl.setProfile(profile);

			//enroll
			if(programEnrollments.isDealershipRecordExists(dealerCode)){
				result = programEnrollments.updateDealershipEnrollment(dealerCode);
			}else{
				result = programEnrollments.enrollDealership(dealerCode);
			}
			emailHandler.sendMailConfirmation(user, "ExistingDashboardUser", null);
			return result;
		}

	}
	
	/*@RequestMapping(value = "/Registration/dealerMSERRegistration", method = RequestMethod.POST)
	public @ResponseBody Object dealerMSERRegistration(@RequestBody MSERRegistrationForm input, HttpServletRequest request) {
		UserDetails user = null;
		boolean registered = false;

		boolean result = false;

		if(!dealerPersonnelPositions.isRegistrationEligiable(input.getSid(), input.getDealerCode())){
			return ResponseEntity.status(500).body("Thank you for your interest in the Mopar Service Excellence Rewards program.  However, your SID is not authorized to approve enrollment into MSER.  Please contact your dealer principal or authorized representative.");
		}
		try{
			user = userDetailsService.loadUserByUsername(sid);
			registered = programEnrollments.isDealershipEnrolled(dealerCode);
		}catch (Exception ex){
			//user not found good to continue
		}

		if(registered){
			return ResponseEntity.status(500).body("Dealership is already registered");
		}else if(user == null){

			UsersDTO newUser = new UsersDTO();
			newUser.setEmail(email);
			newUser.setUserId(sid);
			String newPassword = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
			String salt = UUID.randomUUID().toString().toUpperCase();
			if(userInfo.addUser(sid,email,newPassword,salt)){
				if(programEnrollments.isDealershipRecordExists(dealerCode)){
					result = programEnrollments.updateDealershipEnrollment(dealerCode);
				}else{
					result = programEnrollments.enrollDealership(dealerCode);
				}
				user = userDetailsService.loadUserByUsername(sid);
				emailHandler.sendMailConfirmation(user, "MSERNewUser", newPassword);
			}else{
				return ResponseEntity.status(500).body("Error creating a new User, please contact customer service");
			}

			return result;
		}else{
			//user exists, update the email
			List<UsersDTO> temp = userDAOImpl.getProfile(sid);
			UsersDTO profile = temp.get(0);
			profile.setEmail(email);
			userDAOImpl.setProfile(profile);

			//enroll
			if(programEnrollments.isDealershipRecordExists(dealerCode)){
				result = programEnrollments.updateDealershipEnrollment(dealerCode);
			}else{
				result = programEnrollments.enrollDealership(dealerCode);
			}
			emailHandler.sendMailConfirmation(user, "ExistingDashboardUser", null);
			return result;
		}
		
		return null;

	}*/
	
	


}
