package com.imperialm.imimserservices.rest;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.services.CMSService;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@RestController
public class CMSController {

	//private static Logger logger = LoggerFactory.getLogger(CMSController.class);
	
	@Value("${jwt.header}")
    private String tokenHeader;

   /* @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserServiceImpl userDetailsService;*/
	
	@Autowired
	CMSService cmsService;
	
	 String pathName = "/MSER/Primary";
	 
	 @RequestMapping(value ="/content/{page}", method = RequestMethod.GET)
		public @ResponseBody Object getContenct(@PathVariable(value="page") String page, HttpServletRequest request) {
		 
		 //IMIServicesUtil.checkToken(request);
	
			return cmsService.getContent(pathName, page);
			
	    }
	 
	
}
