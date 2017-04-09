package com.imperialm.imimserservices.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.UserPositionCodeRoleDAO;
import com.imperialm.imimserservices.dao.UserProgramRolesDAO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.dto.UserPositionCodeRoleDTO;
import com.imperialm.imimserservices.entities.User;
import com.imperialm.imimserservices.security.JwtAuthenticationRequest;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.security.service.JwtAuthenticationResponse;
import com.imperialm.imimserservices.services.UserService;
import com.imperialm.imimserservices.services.UserServiceImpl;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.crypto.Mac;
import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthenticationRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserPositionCodeRoleDAO userPositionCodeRoleDAO;
    
    @Autowired
    private DealerPersonnelPositionsDAO dealerPersonnelPositionsDAO;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserServiceImpl userDetailsService;

    @RequestMapping(value = "/login/token", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {
        // Reload password post-security so we can generate token
    	final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    	
        final UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        /*
        if(!(this.get_SHA_512_SecurePassword(authenticationRequest.getPassword(), user.getSalt()).toUpperCase().equals(user.getPassword()))){
        	throw new AuthenticationException("Failed to login");
        }*/
        final String token = jwtTokenUtil.generateToken(user);
        List<UserPositionCodeRoleDTO> userCodes = userPositionCodeRoleDAO.getDealerCodePCRoleBySid(user.getUserId());
        
        
        List<String> positionCode = new ArrayList<String>();
        List<String> dealerCode = new ArrayList<String>();
        
        for(UserPositionCodeRoleDTO item: userCodes){
        	positionCode.add(item.getPositionCode());
        	dealerCode.add(item.getDealerCode());
        }
        
        if(userCodes.size() == 0){
        	List<String> territoryCheck = this.userPositionCodeRoleDAO.getUserTerritoyById(user.getUserId());
        	if(territoryCheck.size() > 0){
        		if(territoryCheck.get(0).equalsIgnoreCase("nat")){
        			positionCode.add("90");
        		}else if(territoryCheck.get(0).contains("-")){
        			positionCode.add("97");
        		}else if(territoryCheck.get(0).trim().length() == 2){
        			positionCode.add("8D");
        		}/*else{
        			positionCode.add("01");
        			dealerCode.add(user.getUserId());
        		}*/
        	}
        }
        
        Set<String> p = new LinkedHashSet<>(positionCode);
        Set<String> d = new LinkedHashSet<>(dealerCode);
        positionCode.clear();
        dealerCode.clear();
        
        positionCode.addAll(p);
        dealerCode.addAll(d);
        
        List<Integer> roles = new ArrayList<Integer>();
        for(String pc: positionCode){
        	roles.add(dealerPersonnelPositionsDAO.getRoleByPositionCode(pc));
        }
        
        JwtAuthenticationResponse response =new JwtAuthenticationResponse(token);
        response.setPositionCode(positionCode);
        response.setDealerCode(dealerCode);
        response.setRoles(roles);
        response.setName(user.getUsername());
        if(user.getUserId().toLowerCase().equals("dave")){
        	response.setAdmin(true);
        }
        // Return the token
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/login/tokenrefresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
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
