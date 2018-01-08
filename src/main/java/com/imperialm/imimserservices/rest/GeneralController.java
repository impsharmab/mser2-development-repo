package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dao.DealerPersonnelDAO;
import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.ProgramGroupDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.NameLabelDTO;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@Controller
public class GeneralController {

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositions;

	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private ProgramGroupDAO ProgramGroupDAO;
	
	@Autowired
	private com.imperialm.imimserservices.dao.ReportsDAOImpl ReportsDAOImpl;

	@RequestMapping(value = "/General/PositionCodeList", method = RequestMethod.GET)
	public @ResponseBody Object getPositionCodes(HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<TwoStringItems> pcList = dealerPersonnelPositions.getAllPositionCodesWithNames();
		for(TwoStringItems item: pcList){
			item.setItem2(item.getItem2() + "(" + item.getItem1() + ")" +  " ");
		}

		return pcList;
	}

	@RequestMapping(value = "/General/PositionCodeListForEnrollments", method = RequestMethod.GET)
	public @ResponseBody Object getPositionCodesForEnrollments(HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<TwoStringItems> pcList = dealerPersonnelPositions.getAllPositionCodesWithNames();
		List<String> enrollmentList = dealerPersonnelPositions.getEnrollmentPCs();
		List<TwoStringItems> result = new ArrayList<>();
		for(TwoStringItems item: pcList){
			if(enrollmentList.contains(item.getItem1().trim())){
				item.setItem2(item.getItem2() + "(" + item.getItem1() + ")" +  " "); // we need the space in the end for UI
				result.add(new TwoStringItems(item.getItem1(), item.getItem2()));
			}
		}

		return result;
	}

	@RequestMapping(value = "/General/ManagersByDealer/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getManagersByDealerCode(@PathVariable(value="dealerCode") String dealerCode,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getManagersByDealerCode(dealerCode);

		List<TwoStringItems> sids = new ArrayList<>();
		for(DealerPersonnelDTO item: dpUser){
			sids.add(new TwoStringItems(item.getFirstName() + " " + item.getLastName(), item.getSID()));
		}
		return sids;
	}

	@RequestMapping(value = "/General/ParticipantsByDealer/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getParticipantsByDealerCode(@PathVariable(value="dealerCode") String dealerCode,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCode(dealerCode);

		List<String> tempSids = new ArrayList<>();
		List<TwoStringItems> sids = new ArrayList<>();
		for(DealerPersonnelDTO item: dpUser){
			if(!tempSids.contains(item.getSID())){
				tempSids.add(item.getSID());
				sids.add(new TwoStringItems(item.getFirstName() + " " + item.getLastName(), item.getSID()));
			}
		}
		return sids;
	}

	@RequestMapping(value = "/General/Report/RewardDepositPrograms", method = RequestMethod.GET)
	public @ResponseBody Object getReportPrograms(HttpServletRequest request) {
		List<TwoStringItems> list = ProgramGroupDAO.getRewardDepositReportProgramList();
		List<NameValue> result = new ArrayList<>();
		for(TwoStringItems item: list){
			result.add(new NameValue(item.getItem1(),item.getItem2()));
		}
		return result;
	}

	@RequestMapping(value = "/General/Report/RepairOrdersReportPrograms", method = RequestMethod.GET)
	public @ResponseBody Object getRewardDepositPrograms(HttpServletRequest request) {
		List<TwoStringItems> list = ProgramGroupDAO.getSummaryRepairOrdersReportProgramList();
		List<NameValue> result = new ArrayList<>();
		for(TwoStringItems item: list){
			result.add(new NameValue(item.getItem1(),item.getItem2()));
		}
		return result;
	}


	@RequestMapping(value = "/General/Report/Dealers/{territory}", method = RequestMethod.GET)
	public @ResponseBody Object getTerritory(@PathVariable(value="territory") String territory, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<String> list = new ArrayList<>();
		if(territory.length() == 5){
			return territory;
		}else if (territory.length() == 2 || territory.equalsIgnoreCase("nat") || (territory.contains("-") && territory.length()==4)){
			list = DealerPersonnelDAO.getDealerByTerritory(territory);
		}

		return list;
	}

	@RequestMapping(value = "/General/Report/Participants/{territory}", method = RequestMethod.GET)
	public @ResponseBody Object getParticipants(@PathVariable(value="territory") String territory, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<String> list = new ArrayList<>();
		if(territory.length() == 5){
			list = DealerPersonnelDAO.getParticipantsByDealerList(Arrays.asList(territory));
		}else if (territory.length() == 2 || (territory.contains("-") && territory.length()==4)){
			List<String> dealers = DealerPersonnelDAO.getDealerByTerritory(territory);
			list =  DealerPersonnelDAO.getParticipantsByDealerList(dealers);
		}else if (territory.equalsIgnoreCase("nat")){
			list = DealerPersonnelDAO.getParticipantsNATList();
		}

		return list;
	}
	
	
	@RequestMapping(value = "/General/Report/CheckDealer/{territory}/{dealer}", method = RequestMethod.GET)
	public @ResponseBody Object checkDealer(@PathVariable(value="territory") String territory, @PathVariable(value="dealer") String dealer, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<String> list = new ArrayList<>();
		list = DealerPersonnelDAO.getDealerByTerritory(territory);
		if(list.contains(dealer)){
			return true;
		}

		return false;
	}
	
	@RequestMapping(value = "/General/Report/SWReport/Period", method = RequestMethod.GET)
	public @ResponseBody Object getSWRepotPeriod(HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		//List<NameValueDTO> list = new ArrayList<>();
		return ReportsDAOImpl.getSWRepotPeriod();
	}

	@RequestMapping(value = "/General/Report/CheckParticipants/{territory}/{participant}", method = RequestMethod.GET)
	public @ResponseBody Object checkParticipants(@PathVariable(value="participant") String participant, @PathVariable(value="territory") String territory, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		List<String> list = new ArrayList<>();
		if(territory.length() == 5){
			list = DealerPersonnelDAO.getParticipantsByDealerList(Arrays.asList(territory));
		}else if (territory.length() == 2 || (territory.contains("-") && territory.length()==4)){
			List<String> dealers = DealerPersonnelDAO.getDealerByTerritory(territory);
			list =  DealerPersonnelDAO.getParticipantsByDealerList(dealers);
		}else if (territory.equalsIgnoreCase("nat")){
			list = DealerPersonnelDAO.getParticipantsNATList();
		}
		
		for(String item: list){
			if(item.equalsIgnoreCase(participant)){
				return true;
			}
		}
		/*if(list.contains(participant)){
			return true;
		}*/

		return false;
	}
	

	@RequestMapping(value = "/General/ProgramGroups", method = RequestMethod.GET)
	public @ResponseBody Object getProgramGroups(HttpServletRequest request) {
		IMIServicesUtil.checkToken(request);
                
		return ProgramGroupDAO.getProgramGroups();
	}




}