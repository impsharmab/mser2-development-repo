package com.imperialm.imimserservices.rest;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dto.RejectedInvoicesDTO;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.util.IMIServicesUtil;
import com.imperialm.imimserservices.dao.PCPartDetailsDAOImpl;
import com.imperialm.imimserservices.dao.ReportsDAOImpl;

@Controller
public class RejectedInvoiceController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;
	
	@Autowired
	private ReportsDAOImpl ReportsDAOImpl;
	
	@Autowired
	private PCPartDetailsDAOImpl PCPartDetailsDAOImpl;
	
	
	@RequestMapping(value = "/service/RejectedInvoices/Get/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object getPositionCodes(@PathVariable(value="dealerCode") String dealerCode, @RequestBody final TwoStringItems input,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		
		
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		java.util.Date start, end;
		Date startSql, endSql;
		try {
			start = formatter.parse(input.getItem1());
			end = formatter.parse(input.getItem2());
			startSql =  new java.sql.Date(start.getTime());
			endSql = new java.sql.Date(end.getTime());
		} catch (ParseException e) {
			return ResponseEntity.status(500).body("Could not read the date");
		}
		
		return ReportsDAOImpl.getRejectedInvoices(dealerCode, startSql, endSql);
	}
	
	
	@RequestMapping(value = "/service/RejectedInvoices/Set/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object getPositionCodes(@PathVariable(value="dealerCode") String dealerCode, @RequestBody RejectedInvoicesDTO input,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		
		if(ReportsDAOImpl.updateRejectedInvoices(dealerCode, input)){
			return true;
		}else{
			return ResponseEntity.status(500).body("Couldn't not save invoice");
		}
	}
	
}
