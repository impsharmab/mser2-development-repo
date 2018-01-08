package com.imperialm.imimserservices.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.imperialm.imimserservices.dao.UserProgramRolesDAO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.security.JwtTokenUtil;
import com.imperialm.imimserservices.services.UserServiceImpl;

@Component
public class IMIServicesUtil {

	@Value("${jwt.header}")
	private String tokenHeader;

	@Value("${jwt.adminheader}")
	private String adminHeader;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserServiceImpl userDetailsService;

	@Autowired
	private UserProgramRolesDAO userProgramRolesDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.PropertiesDAOImpl PropertiesDAOImpl;

	private static Logger logger = LoggerFactory.getLogger(IMIServicesUtil.class);

	public static String prepareJson(final String key, final String value) {
		final ObjectMapper json = new ObjectMapper();
		String toReturn ="";
		final Properties props = new Properties();
		props.put(key, value);
		try {
			toReturn = json.writeValueAsString(props);
		} catch (JsonProcessingException e) {
			logger.error(e.getMessage());
		}
		return toReturn;
	}

	public String formatCurrency(int number){
		NumberFormat formatter = NumberFormat.getCurrencyInstance();
		String moneyString = formatter.format(number);
		return moneyString;
	}

	public String formatCurrency(double number){
		number =  Math.round(number);
		NumberFormat formatter = NumberFormat.getCurrencyInstance();
		String moneyString = formatter.format(number);
		return moneyString;
	}
	
	public String formatCurrencyNoRounding(double number){;
		NumberFormat formatter = NumberFormat.getCurrencyInstance();
		String moneyString = formatter.format(number);
		return moneyString;
	}

	public String formatNumbers(double number){
		number = Math.round(number);
		DecimalFormat formatter = new DecimalFormat("#,###");
		return formatter.format(number);
	}

	public String formatNumbers(int number){
		DecimalFormat formatter = new DecimalFormat("#,###");
		return formatter.format(number);
	}


	public String getCurrentQuarter(){
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return (cal.get(Calendar.YEAR)) + "Q" + ((cal.get(Calendar.MONTH) / 3) + 1);
	}

	public String getCurrentYear(){
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return (cal.get(Calendar.YEAR))+"";
	}

	public UserDetailsImpl checkToken(HttpServletRequest request){
		UserDetailsImpl user = null;
		try{
			String adminToken = request.getHeader(adminHeader);
			String token = request.getHeader(tokenHeader);
			if(adminToken != null && !adminToken.trim().isEmpty()){
				token = adminToken;
			}
			String username = jwtTokenUtil.getUsernameFromToken(token);
			user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
			if(!jwtTokenUtil.validateToken(token, user)){
				throw new BadCredentialsException("Invalid Token");
			}
		}catch(BadCredentialsException e){
			throw new BadCredentialsException(e.getMessage());
		}catch(Exception e){
			throw new AuthenticationCredentialsNotFoundException("No credentials found in header");
		}
		return user;
	}
	
	
	public UserDetailsImpl checkTokenOriginal(HttpServletRequest request){
		UserDetailsImpl user = null;
		try{
			String token = request.getHeader(tokenHeader);
			String username = jwtTokenUtil.getUsernameFromToken(token);
			user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
			if(!jwtTokenUtil.validateToken(token, user)){
				throw new BadCredentialsException("Invalid Token");
			}
		}catch(BadCredentialsException e){
			throw new BadCredentialsException(e.getMessage());
		}catch(Exception e){
			throw new AuthenticationCredentialsNotFoundException("No credentials found in header");
		}
		return user;
	}


	public UserDetailsImpl checkAdminToken(HttpServletRequest request){
		UserDetailsImpl user = null;
		try{
			String token = request.getHeader(tokenHeader);
			String username = jwtTokenUtil.getUsernameFromToken(token);
			user = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
			if(!jwtTokenUtil.validateToken(token, user)){
				throw new BadCredentialsException("Invalid Token");
			}
			if(!userProgramRolesDAO.isAdmin(username)){
				throw new BadCredentialsException("User is not an Admin");
			}
		}
		catch(BadCredentialsException e){
			throw new BadCredentialsException(e.getMessage());
		}catch(Exception e){
			throw new AuthenticationCredentialsNotFoundException("No credentials found in header");
		}
		return user;
	}

	public static boolean isValidEmail(String input)
	{

		if(input == null){
			return false;
		}

		int atIndex = input.indexOf('@');
		int dotIndex = input.lastIndexOf('.');
		if ((atIndex == -1) || (dotIndex == -1) || (atIndex >= dotIndex))
			return false;
		// now check for content of the string
		byte[] s = input.getBytes();
		int length = s.length;
		byte b = 0;

		for (int i = 0; i < length; i++)
		{
			b = s[i];
			if ((b >= 'a') && (b <= 'z')) {}  // lower char
			else if ((b >= 'A') && (b <= 'Z')) {}  // upper char
			else if ((b >= '0') && (b <= '9') && (i != 0)) {} // numeric char
			else if ( ( (b=='_') || (b=='-') || (b=='.') || (b=='@') ) && (i != 0) ) {}// _ char
			else 
			{
				return false;
			}
		}

		try 
		{
			new javax.mail.internet.InternetAddress(input);
		} 
		catch (Exception ex) 
		{
			return false;
		}

		return true;
	}

	public Date getPayoutDate(){
		Date compareDate = PropertiesDAOImpl.getPayoutDisplayDate();
		/*Date now = new Date();
		if(now.before(compareDate)){
			return this.getCurrentMonthStartDate();
		}else if(now.getMonth() == compareDate.getMonth() && now.getYear() == compareDate.getYear()){
			return this.getNextMonthStartDate();
		}else{
			return this.getCurrentMonthStartDate();
		}*/
		return compareDate;
		
	}

	public Date getCurrentMonthStartDate(){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		Date today = calendar.getTime();
		return today;
	}

	public Date getCurrentMonthEndDate(){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date today = calendar.getTime();
		return today;
	}

	public Date getCurrentYearStartDate(){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.MONTH, Calendar.JANUARY);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

		Date today = calendar.getTime();
		return today;
	}

	public Date getCurrentYearEndDate(){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.MONTH, Calendar.DECEMBER);
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

		Date today = calendar.getTime();
		return today;
	}


	public Date getNextMonthStartDate(){
		Calendar calendar = Calendar.getInstance();         
		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		Date nextMonthFirstDay = calendar.getTime();
		return nextMonthFirstDay;
	}

	public Date getMonthStartDate(Date date){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		Date today = calendar.getTime();
		return today;
	}
	
	public Date getMonthEndDate(Date date){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date today = calendar.getTime();
		return today;
	}
	
	public String getDateString(Date date){
		Calendar cal = Calendar.getInstance();
		Locale locale = Locale.getDefault();
		cal.setTime(date);
		int day = cal.get(Calendar.DAY_OF_MONTH);
		String dayString = day + "";
		if(dayString.length() < 2){
			dayString = "0" + dayString;
		}
		return cal.get(Calendar.YEAR) + "-" + cal.getDisplayName(Calendar.MONTH, Calendar.SHORT, locale) + "-" + dayString;
	}
}
