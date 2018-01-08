package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dao.PartsLookupDAO;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@Controller
public class PartsLookupController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;
	
	@Autowired
	private PartsLookupDAO PartsLookupDAO;
	
	@RequestMapping(value = "/Partslookup/Category", method = RequestMethod.GET)
	public @ResponseBody Object getCategoriesList(HttpServletRequest request) {

		//IMIServicesUtil.checkToken(request);
		
		Date date = IMIServicesUtil.getPayoutDate();
		/*List<TwoStringItems> list = PartsLookupDAO.getCategoryList(date);
		List<NameValue> dropdown = new ArrayList<>();
		for(TwoStringItems item: list){
			dropdown.add(new NameValue(item.getItem1(), item.getItem2()));
		}*/
		
		return PartsLookupDAO.getCategoryList(date);
	}
	
	@RequestMapping(value = "/Partslookup/NewCategory/", method = RequestMethod.GET)
	public @ResponseBody Object getCategoriesListNew(HttpServletRequest request) {

		//IMIServicesUtil.checkToken(request);
		
		Date date = IMIServicesUtil.getPayoutDate();
		/*List<TwoStringItems> list = PartsLookupDAO.getCategoryList(date);
		List<NameValue> dropdown = new ArrayList<>();
		for(TwoStringItems item: list){
			dropdown.add(new NameValue(item.getItem1(), item.getItem2()));
		}*/
		
		return PartsLookupDAO.getCategoryList(date);
	}
	
	@RequestMapping(value = "/Partslookup/CatagoryCode/{category}", method = RequestMethod.GET)
	public @ResponseBody Object getPartsByCategory(@PathVariable(value="category") String category, HttpServletRequest request) {

		//IMIServicesUtil.checkToken(request);
		Date date = IMIServicesUtil.getPayoutDate();
		return PartsLookupDAO.getPartsByCategory(category, date);
	}
	
	@RequestMapping(value = "/Partslookup/PartNumber/{part}", method = RequestMethod.GET)
	public @ResponseBody Object getPartsInfo(@PathVariable(value="part") String part, HttpServletRequest request) {

		//IMIServicesUtil.checkToken(request);
		
		return PartsLookupDAO.getPartsInfo(part);
	}
	
	@RequestMapping(value = "/Partslookup/PartNumber/{part}/{category}", method = RequestMethod.GET)
	public @ResponseBody Object getPartsInfo(@PathVariable(value="part") String part, @PathVariable(value="category") String category, HttpServletRequest request) {

		//IMIServicesUtil.checkToken(request);
		
		return PartsLookupDAO.getPartsInfo(part, category);
	}
	
	
}
