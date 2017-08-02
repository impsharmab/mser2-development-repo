package com.imperialm.imimserservices.rest;

import java.util.Arrays;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.LaborOpsDAO;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@RestController
public class EnrollmentFormController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;
	
	@Autowired
	private com.imperialm.imimserservices.util.EmailHandler EmailHandler;


	@RequestMapping(value ="/enrollments/forms/{type}", method = RequestMethod.POST)
	public @ResponseBody Object getOpCode(@PathVariable(value="type") String type, @RequestBody Map<String, Object> input, HttpServletRequest request) {
		
		String dealerCode = (String)input.get("dealerCode");
		String sid = (String)input.get("sid");
		String dealershipName = (String)input.get("dealershipName");
		String dealerPricipleName = (String)input.get("dealerPricipleName");
		String email = (String)input.get("email");
		String phone = (String)input.get("phone");
		String signeture = (String)input.get("signeture");
		String date = (String)input.get("date");
		String partsServiceManager = (String)input.get("partsServiceManager");
		String partsManageremail = (String)input.get("partsManageremail");
		
		
		
		if(type == null){
			return ResponseEntity.badRequest();
		}
		
		if(type.equalsIgnoreCase("enroll")){
			
		}else if(type.equalsIgnoreCase("fiat")){
			
		}else{
			return ResponseEntity.badRequest();
		}
		

		return null;

	}
}
