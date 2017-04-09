package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.LaborOpsDAO;
import com.imperialm.imimserservices.dao.UserPositionCodeRoleDAO;
import com.imperialm.imimserservices.dto.LaborOpsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.dto.UserPositionCodeRoleDTO;
import com.imperialm.imimserservices.model.OneItem;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.services.UserServiceImpl;

@RestController
public class EnrollmentsController {

	private static Logger logger = LoggerFactory.getLogger(EnrollmentsController.class);
	
	  @Value("${jwt.header}")
	    private String tokenHeader;

	    @Autowired
	    private JwtTokenUtil jwtTokenUtil;

	    @Autowired
	    private UserServiceImpl userDetailsService;
	    
	    @Autowired
	    private UserPositionCodeRoleDAO userPositionCodeRoleDAO;
	    
	    @Autowired
	    private LaborOpsDAO laborOpsDAO;
	    
	    
	    @RequestMapping(value ="/enrollments/getopcode/{dealerCode}", method = RequestMethod.GET)
		public @ResponseBody Object getOpCode(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {
			UserDetailsImpl user = null;
			
		     List<UserPositionCodeRoleDTO> userCodes = null;
		    
		     //List<String> dealerCode = new ArrayList<String>();
			//get token extract user info and use for the calls
			try{
			 String token = request.getHeader(tokenHeader);
		     String username = jwtTokenUtil.getUsernameFromToken(token);
		     user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
		     
		     
		   /*  userCodes = userPositionCodeRoleDAO.getDealerCodePCRoleBySid(user.getUserId());
		        for(UserPositionCodeRoleDTO item: userCodes){
		        	dealerCode.add(item.getDealerCode());
		        }
		     */
		     
		     if(!jwtTokenUtil.validateToken(token, user)){
		    	 //token is expired/invalid token
		    	 return ResponseEntity.status(500).body("Invalid Token");
		     }
			}catch(Exception e){
				//token is expired/invalid token
		    	 return ResponseEntity.status(500).body("Failed to check Token");
			}
			
			/*if(dealerCode.size() > 0){
				return laborOpsDAO.getOpCodeByDealer(dealerCode);
			}else{
				return "user has no dealercode";
			}*/
			
			return laborOpsDAO.getOpCodeByDealer(Arrays.asList(dealerCode));
			
	    }
	    
	    @RequestMapping(value ="/enrollments/addopcode", method = RequestMethod.POST)
		public @ResponseBody Object getOpCode(@RequestBody LaborOpsDTO LaborOpsDTO, HttpServletRequest request) {
			UserDetailsImpl user = null;
		    
		     List<String> dealerCode = new ArrayList<String>();
			//get token extract user info and use for the calls
			try{
			 String token = request.getHeader(tokenHeader);
		     String username = jwtTokenUtil.getUsernameFromToken(token);
		     user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
		     
		     if(!jwtTokenUtil.validateToken(token, user)){
		    	 //token is expired/invalid token
		    	 //return "Invalid Token";
		    	 return ResponseEntity.status(500).body("Invalid Token");
		     }
			}catch(Exception e){
				//token is expired/invalid token
		    	 return ResponseEntity.status(500).body("Failed to check Token");
			}
			
			return laborOpsDAO.updateOpCodeById(LaborOpsDTO);
			
	    }
	    
	    
	    @RequestMapping(value ="/enrollments/deleteopcode", method = RequestMethod.POST)
		public @ResponseBody Object getOpCode(@RequestBody OneItem id, HttpServletRequest request) {
			UserDetailsImpl user = null;
		    
		     List<String> dealerCode = new ArrayList<String>();
			//get token extract user info and use for the calls
			try{
			 String token = request.getHeader(tokenHeader);
		     String username = jwtTokenUtil.getUsernameFromToken(token);
		     user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
		     
		     if(!jwtTokenUtil.validateToken(token, user)){
		    	 //token is expired/invalid token
		    	 //return "Invalid Token";
		    	 return ResponseEntity.status(500).body("Invalid Token");
		     }
			}catch(Exception e){
				//token is expired/invalid token
		    	 return ResponseEntity.status(500).body("Failed to check Token");
			}
			
			return laborOpsDAO.deleteOpCodeById(Integer.parseInt(id.getItem()));
			
	    }
	    
	    
}
