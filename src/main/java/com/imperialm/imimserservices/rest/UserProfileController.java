/**
 *
 */
package com.imperialm.imimserservices.rest;

import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.UserDAOImpl;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.dto.UsersDTO;
import com.imperialm.imimserservices.model.OneItem;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.model.UserIdEmail;
import com.imperialm.imimserservices.model.UserProfile;
import com.imperialm.imimserservices.util.EmailHandler;
import com.imperialm.imimserservices.util.IMIServicesUtil;


@RestController
public class UserProfileController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;
	
	@Autowired
	private UserDAOImpl userDAOImpl;

	@Autowired
	private EmailHandler emailHandler;

	@RequestMapping(value = "/UserProfile/Profile", method = RequestMethod.POST)
	public @ResponseBody Object getProfile(@RequestBody UserProfile userProfile ,HttpServletRequest request) {


		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		if(userProfile.getName().isEmpty() || userProfile.getEmail().isEmpty() || userProfile.getSendMail().isEmpty()){
			return false;
		}

		UsersDTO temp = new UsersDTO();
		temp.setUserId(user.getUserId());
		//temp.setPhoneNumber(userProfile.getPhoneNumber());
		temp.setEmail(userProfile.getEmail());
		temp.setName(userProfile.getName());
		temp.setSendEmail(userProfile.getSendMail());


		return userDAOImpl.setProfile(temp);

	}


	@RequestMapping(value = "/UserProfile/Profile", method = RequestMethod.GET)
	public @ResponseBody Object getProfile(HttpServletRequest request) {


		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		List<UsersDTO> temp = userDAOImpl.getProfile(user.getUserId());

		if(temp.size() > 0){
			UserProfile profile = new UserProfile();
			profile.setEmail(temp.get(0).getEmail());
			profile.setName(temp.get(0).getName());
			profile.setSendMail(temp.get(0).getSendEmail());
			return profile;
		}

		return ResponseEntity.status(500).body("No Profile Found");

	}


	@RequestMapping(value = "/UserProfile/Password", method = RequestMethod.POST)
	public @ResponseBody Object setPassword(@RequestBody OneItem password ,HttpServletRequest request) {


		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		if(password.getItem().isEmpty() || password.getItem().contains(" ")){
			return false;
		}

		String salt = UUID.randomUUID().toString().toUpperCase();
		return userDAOImpl.setPassword(user.getUserId(), password.getItem(), salt);

	}


	@RequestMapping(value = "/UserProfile/ResetPassword", method = RequestMethod.POST)
	public @ResponseBody Object resetPassword(@RequestBody UserIdEmail object ,HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		if(!user.getEmail().equalsIgnoreCase((object.getEmail()))){
			return ResponseEntity.status(500).body("Invalid Email");
		}


		String newPassword = RandomStringUtils.randomAlphanumeric(RandomUtils.nextInt(8,20));
		//send an email with the new password

		String salt = UUID.randomUUID().toString().toUpperCase();
		if(userDAOImpl.setPassword(user.getUserId(), newPassword, salt)){
			emailHandler.sendMailConfirmation(user, "ResetPassword", newPassword);
			return true;
		}else{
			return ResponseEntity.status(503).body("Could not reset password");
		}
	}

	@RequestMapping(value = "/UserProfile/TextAlerts", method = RequestMethod.POST)
	public @ResponseBody Object setTextAlerts(@RequestBody TwoStringItems object ,HttpServletRequest request) {


		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return userDAOImpl.setTextAlert(object, user.getUserId());

	}


}
