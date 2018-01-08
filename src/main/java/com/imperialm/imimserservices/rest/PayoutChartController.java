package com.imperialm.imimserservices.rest;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.util.IMIServicesUtil;

@RestController
public class PayoutChartController {

	@Autowired IMIServicesUtil IMIServicesUtil;
	
	@Autowired com.imperialm.imimserservices.services.PayoutServiceImpl PayoutServiceImpl;


	@RequestMapping(value ="/payout/getpayout/", method = RequestMethod.GET)
	public @ResponseBody Object getPayout(HttpServletRequest request) {
		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		Date date = IMIServicesUtil.getPayoutDate();
		return PayoutServiceImpl.getPayout(request, date);
	}

	@RequestMapping(value ="/payout/getpayout/{idate}", method = RequestMethod.GET)
	public @ResponseBody Object getPayout(HttpServletRequest request, @PathVariable String idate) {
		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		Date date = new Date(Long.parseLong(idate));
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		DateTime d = new DateTime(date).toDateTime(DateTimeZone.UTC);
		date = d.toDate();
		cal.add(Calendar.HOUR_OF_DAY, 8);
		return PayoutServiceImpl.getPayout(request, cal.getTime());
	}
	
	
	


}
