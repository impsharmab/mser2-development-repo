package com.imperialm.imimserservices.rest;

import java.text.DecimalFormat;
import java.text.NumberFormat;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.UserPositionCodeRoleDAO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.dto.request.InputRequest;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.services.UserServiceImpl;

/**
 *
 * @author Dheerajr
 *
 */
@RestController
public class DashboardController {

	private static Logger logger = LoggerFactory.getLogger(DashboardController.class);
	
	  @Value("${jwt.header}")
	    private String tokenHeader;

	    @Autowired
	    private JwtTokenUtil jwtTokenUtil;

	    @Autowired
	    private UserServiceImpl userDetailsService;
	    
	    @Autowired
	    private UserPositionCodeRoleDAO userPositionCodeRoleDAO;
	    
	    @Autowired
	    private DealerPersonnelPositionsDAO dealerPersonnelPositionsDAO;
	
	@RequestMapping(value = "/myfcadashboard", method = RequestMethod.GET)
	public RedirectView myfcadashboard() {
		    RedirectView redirectView = new RedirectView("/", true);
		    return redirectView;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public RedirectView login() {
		    RedirectView redirectView = new RedirectView("/", true);
		    return redirectView;
	}
	
	@RequestMapping(value ="/services/tile/{chartId}/{positionCode}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object findTilesListByRole(@PathVariable(value="chartId") String id, @PathVariable(value="positionCode") String positionCode, @PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {
		final InputRequest userRoleReq = new InputRequest("", "");
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
		
		int testa = 0;// dashService.getRoleByPositionCode(positionCode);
		String type = "";
		String BC = "";
		if(user.getUserId().equals("Dave")){
			type = "Executive";
		}else{
		if( testa == 1 || testa == 3 || testa == 13){
			type = "Executive";
		}else if( testa == 12){
			/*type = "BC";
			List<String> bcSet = this.dashService.getUserTerritoyById(user.getUserId());
			if(bcSet.size() > 0){
				BC = bcSet.get(0);
			}*/
		}else if( testa == 11){
			type = "District";
			// return this.findTilesManager(id, positionCode, dealerCode, user, type);
		}else if( testa == 10){
			type = "Dealer";
			// this.findTilesManager(id, positionCode, dealerCode, user, type);
		}else if( testa == 9){
			type = "Participant";
			// return this.findTilesManager(id, positionCode, dealerCode, user, type);
		}else if( testa == 5){
			type = "Manager";
			 //return this.findTilesManager(id, positionCode, dealerCode, user, type);
		}
		}
		//divide the switch statement to functions
		return null;
	}
	
	
	public String formatCurrency(int number){
		NumberFormat formatter = NumberFormat.getCurrencyInstance();
		String moneyString = formatter.format(number);
		if (moneyString.endsWith(".00")) {
		    int centsIndex = moneyString.lastIndexOf(".00");
		    if (centsIndex != -1) {
		    	moneyString = moneyString.substring(1, centsIndex);
		    }
		}
		
		return moneyString;
	}
	
	public String formatCurrency(double number){
		NumberFormat formatter = NumberFormat.getCurrencyInstance();
		String moneyString = formatter.format(number);
		if (moneyString.endsWith(".00")) {
		    int centsIndex = moneyString.lastIndexOf(".00");
		    if (centsIndex != -1) {
		    	moneyString = moneyString.substring(1, centsIndex);
		    }
		}
		
		return moneyString;
	}
	
	public String formatNumbers(double number){
		DecimalFormat formatter = new DecimalFormat("#,###");

		return formatter.format(number);
	}
	
	public String formatNumbers(int number){
		DecimalFormat formatter = new DecimalFormat("#,###");
		
		return formatter.format(number);
	}
	
	
}