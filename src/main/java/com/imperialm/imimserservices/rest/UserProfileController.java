/**
 *
 */
package com.imperialm.imimserservices.rest;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.UserDAOImpl;
import com.imperialm.imimserservices.dao.UserPositionCodeRoleDAO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.dto.UsersDTO;
import com.imperialm.imimserservices.dto.request.InputRequest;
import com.imperialm.imimserservices.model.NoTile;
import com.imperialm.imimserservices.model.Password;
import com.imperialm.imimserservices.model.UserProfile;
import com.imperialm.imimserservices.security.JwtAuthenticationRequest;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.services.UserProfileServiceImpl;
import com.imperialm.imimserservices.services.UserService;
import com.imperialm.imimserservices.services.UserServiceImpl;

/**
 * @author Dheerajr
 *
 */
@RestController
public class UserProfileController {
	
	@Value("${jwt.header}")
    private String tokenHeader;
	
	@Autowired
	private UserDAOImpl userDAOImpl;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserServiceImpl userDetailsService;
	    
	@Autowired
	private UserPositionCodeRoleDAO userPositionCodeRoleDAO;
	    
	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositionsDAO;

	
	private static Logger logger = LoggerFactory.getLogger(UserProfileController.class);
	@Autowired
	private UserProfileServiceImpl userprofileService;
	
	
	
	@RequestMapping(value = "/UserProfile/Profile", method = RequestMethod.POST)
	public @ResponseBody Object getProfile(@RequestBody UserProfile userProfile ,HttpServletRequest request) {
		
		
		UserDetailsImpl user = null;
		//get token extract user info and use for the calls
		try{
		 String token = request.getHeader(tokenHeader);
	     String username = jwtTokenUtil.getUsernameFromToken(token);
	     user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
	     if(!jwtTokenUtil.validateToken(token, user)){
	    	 //token is expired/invalid token
	    	 return "Invalid Token";
	     }
		}catch(Exception e){
			//token is expired/invalid token
	    	 return "Failed to check Token";
		}
		
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
		
		
		UserDetailsImpl user = null;
		//get token extract user info and use for the calls
		try{
		 String token = request.getHeader(tokenHeader);
	     String username = jwtTokenUtil.getUsernameFromToken(token);
	     user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
	     if(!jwtTokenUtil.validateToken(token, user)){
	    	 //token is expired/invalid token
	    	 
	    	 return "Invalid Token";
	     }
		}catch(Exception e){
			//token is expired/invalid token
	    	 return "Failed to check Token";
		}
		
		List<UsersDTO> temp = userDAOImpl.getProfile(user.getUserId());
		
		if(temp.size() > 0){
			UserProfile profile = new UserProfile();
			profile.setEmail(temp.get(0).getEmail());
			profile.setName(temp.get(0).getName());
			profile.setSendMail(temp.get(0).getSendEmail());
			return profile;
		}
		
		return "No profile Found";
		
	}
	
	
	@RequestMapping(value = "/UserProfile/Password", method = RequestMethod.POST)
	public @ResponseBody Object setPassword(@RequestBody Password password ,HttpServletRequest request) {
		
		
		UserDetailsImpl user = null;
		//get token extract user info and use for the calls
		try{
		 String token = request.getHeader(tokenHeader);
	     String username = jwtTokenUtil.getUsernameFromToken(token);
	     user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
	     if(!jwtTokenUtil.validateToken(token, user)){
	    	 //token is expired/invalid token
	    	 return "Invalid Token";
	     }
		}catch(Exception e){
			//token is expired/invalid token
	    	 return "Failed to check Token";
		}
		
		if(password.getPassword().isEmpty() || password.getPassword().contains(" ")){
			return false;
		}
	
		byte[] salt = generateSalt();
		String stringSalt = new String(salt);
		String hashedPassword = this.get_SHA_512_SecurePassword(password.getPassword(), stringSalt);
		//return false;
		return userDAOImpl.setPassword(user.getUserId(), hashedPassword, salt);
		
	}
	
	
	public byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[20];
        random.nextBytes(bytes);
        return bytes;
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
	

}
