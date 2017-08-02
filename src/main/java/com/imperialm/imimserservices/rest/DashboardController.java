package com.imperialm.imimserservices.rest;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dao.UserPositionCodeRoleDAO;
import com.imperialm.imimserservices.dto.MSERGraphDetailsSummaryDTO;
import com.imperialm.imimserservices.dto.TileDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.TileAttribute;
import com.imperialm.imimserservices.model.TopTenChart;
import com.imperialm.imimserservices.util.IMIServicesUtil;
import com.imperialm.imimserservices.dao.MSERTilesDAOImpl;

@RestController
public class DashboardController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private UserPositionCodeRoleDAO userPositionCodeRoleDAO;

	@Autowired
	private MSERTilesDAOImpl MSERTilesDAOImpl;

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositionsDAO;

	@RequestMapping(value = "/mserHomePage", method = RequestMethod.GET)
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
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		int testa = dealerPersonnelPositionsDAO.getRoleByPositionCode(positionCode);
		String type = "";
		String territory = "";
		if(user.getUserId().equals("Dave")){
			type = "Executive";
			// we don't really need it for nat
			territory="NAT";
		}else{
			if( testa == 1 || testa == 3 || testa == 13){
				type = "Executive";
				// we don't really need it for nat
				territory="NAT";
			}else if( testa == 12){
				type = "BC";
				List<String> bcSet = this.userPositionCodeRoleDAO.getUserTerritoyById(user.getUserId());
				if(bcSet.size() > 0){
					territory = bcSet.get(0);
				}
			}else if( testa == 11){
				type = "District";
				List<String> bcSet = this.userPositionCodeRoleDAO.getUserTerritoyById(user.getUserId());
				if(bcSet.size() > 0){
					territory = bcSet.get(0);
				}
			}else if( testa == 10){
				type = "Dealer";
				territory= dealerCode;
			}else if( testa == 9){
				type = "Participant";
				territory = user.getUserId();
			}else if( testa == 5){
				type = "Manager";
				// this could be dealercode check with tom
				territory = user.getUserId();
			}
		}
		//divide the switch statement to functions

		switch(id){
		case"1":
		{

			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			TileAttribute mserParticipants = new TileAttribute("Participants Enrolled in MSER", 0, "number");
			TileAttribute expressLaneEnrolled = new TileAttribute("Express Lane Enrolled", 0, "number");
			TileAttribute partsCounterEnrolled = new TileAttribute("Parts Counter Enrolled", 0, "number");
			TileAttribute usedCarManagerEnrolled = new TileAttribute("Used Car Manager Enrolled", 0, "number");

			List<MSERGraphDetailsSummaryDTO> mparPartsInfo = new ArrayList<MSERGraphDetailsSummaryDTO>();
			List<MSERGraphDetailsSummaryDTO> expressLaneInfo = new ArrayList<MSERGraphDetailsSummaryDTO>();
			List<MSERGraphDetailsSummaryDTO> partsCounterInfo = new ArrayList<MSERGraphDetailsSummaryDTO>();
			List<MSERGraphDetailsSummaryDTO> usedCarManagerInfo = new ArrayList<MSERGraphDetailsSummaryDTO>();

			if(type.equalsIgnoreCase("Executive")){
				//mserParticipants.setValue(MSERTilesDAOImpl.getMSERCountNATByType("participants"));

				mparPartsInfo = MSERTilesDAOImpl.getGraphDetailsSummarySUMByParentAndProgram("NAT", "Mopar Parts");
				expressLaneInfo = MSERTilesDAOImpl.getGraphDetailsSummarySUMByParentAndProgram("NAT", "Express Lane");
				partsCounterInfo = MSERTilesDAOImpl.getGraphDetailsSummarySUMByParentAndProgram("NAT", "Parts Counter");
				usedCarManagerInfo = MSERTilesDAOImpl.getGraphDetailsSummarySUMByParentAndProgram("NAT", "Used Car Manager");
			}else if(!type.equalsIgnoreCase("participant")){
				mparPartsInfo = MSERTilesDAOImpl.getGraphDetailsSummaryByChildAndProgram(territory, "Mopar Parts");
				expressLaneInfo = MSERTilesDAOImpl.getGraphDetailsSummaryByChildAndProgram(territory, "Express Lane");
				partsCounterInfo = MSERTilesDAOImpl.getGraphDetailsSummaryByChildAndProgram(territory, "Parts Counter");
				usedCarManagerInfo = MSERTilesDAOImpl.getGraphDetailsSummaryByChildAndProgram(territory, "Used Car Manager");

			}

			if(mparPartsInfo.size()>0){
				mserParticipants.setValue(mparPartsInfo.get(0).getParticipantsEnrolled());
			}

			if(expressLaneInfo.size()>0){
				expressLaneEnrolled.setValue(expressLaneInfo.get(0).getParticipantsEnrolled());
			}

			if(partsCounterInfo.size()>0){
				partsCounterEnrolled.setValue(partsCounterInfo.get(0).getParticipantsEnrolled());
			}

			if(usedCarManagerInfo.size()>0){
				usedCarManagerEnrolled.setValue(usedCarManagerInfo.get(0).getParticipantsEnrolled());
			}

			list.add(mserParticipants);
			list.add(expressLaneEnrolled);
			list.add(partsCounterEnrolled);
			list.add(usedCarManagerEnrolled);

			tile.addAttributes(list);
			return tile;

		}
		case"2":
		{
			// MOPAR PARTS
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();

			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERMOPartsSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMOPartsSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERMOPartsSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMOPartsSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERMOPartsSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMOPartsSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);

			tile.addAttributes(list);
			return tile;
		}
		case"3":
		{
			// MVP
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();

			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERMVPPlansSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMVPPlansSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERMVPPlansSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMVPPlansSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERMVPPlansSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMVPPlansSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);

			tile.addAttributes(list);
			return tile;
		}
		case"4":
		{
			//MAGNATI MOR
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();

			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERMagnettiMarelliSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMagnettiMarelliSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERMagnettiMarelliSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMagnettiMarelliSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERMagnettiMarelliSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERMagnettiMarelliSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);


			tile.addAttributes(list);
			return tile;
		}
		case"5":
		{
			//parts counter
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			if(type.equals("Dealer") || type.equals("Manager") || type.equals("Participant")){
				List<String> status = MSERTilesDAOImpl.checkEnrollment(user.getUserId(), 6, type, dealerCode, positionCode);
				if(status.size() == 0){
					TileAttribute enrollment = new TileAttribute("You are not currently enrolled in this program.  The numbers shown reflect your awards if you were enrolled.", "  Click here for more information regarding enrollment.", "");
					enrollment.setLink("");
					list.add(enrollment);
				}
			}

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();


			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERPartsCounterSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERPartsCounterSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERPartsCounterSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERPartsCounterSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERPartsCounterSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERPartsCounterSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);


			tile.addAttributes(list);
			return tile;
		}
		case"6":
		{
			//Express lane
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			if(type.equals("Dealer") || type.equals("Manager") || type.equals("Participant")){
				List<String> status = MSERTilesDAOImpl.checkEnrollment(user.getUserId(), 1, type, dealerCode, positionCode);
				if(status.size() == 0){
					TileAttribute enrollment = new TileAttribute("You are not currently enrolled in this program.  The numbers shown reflect your awards if you were enrolled.", "  Click here for more information regarding enrollment.", "");
					enrollment.setLink("");
					list.add(enrollment);
				}
			}

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();

			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERExpressLaneSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERExpressLaneSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERExpressLaneSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERExpressLaneSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERExpressLaneSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERExpressLaneSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);

			tile.addAttributes(list);
			return tile;
		}
		case"7":
		{
			//wi advisor
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			if(type.equals("Dealer") || type.equals("Manager") || type.equals("Participant")){
				List<String> status = MSERTilesDAOImpl.checkEnrollment(user.getUserId(), 7, type, dealerCode, positionCode);
				if(status.size() == 0){
					TileAttribute enrollment = new TileAttribute("You are not currently enrolled in this program.  The numbers shown reflect your awards if you were enrolled.", "  Click here for more information regarding enrollment.", "");
					enrollment.setLink("");
					list.add(enrollment);
				}
			}

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();

			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERWiAdvisorSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERWiAdvisorSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERWiAdvisorSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERWiAdvisorSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERWiAdvisorSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERWiAdvisorSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);

			tile.addAttributes(list);
			return tile;
		}
		case"8":
		{
			//uconnect
			TopTenChart tile = new TopTenChart();
			List<TileAttribute> list = new ArrayList<TileAttribute>();

			if(type.equals("Dealer") || type.equals("Manager") || type.equals("Participant")){
				List<String> status = MSERTilesDAOImpl.checkEnrollment(user.getUserId(), 9, type, dealerCode, positionCode);
				if(status.size() == 0){
					TileAttribute enrollment = new TileAttribute("You are not currently enrolled in this program.  The numbers shown reflect your awards if you were enrolled.", "  Click here for more information regarding enrollment.", "");
					enrollment.setLink("");
					list.add(enrollment);
				}
			}

			TileAttribute totalqualifiedMTD = new TileAttribute("Parts Month to Date", 0, "number");
			TileAttribute totalqualifiedYTD = new TileAttribute("Parts Year to Date", 0, "currency");
			TileAttribute rewardsMTD = new TileAttribute("Rewards Month to Date", 0, "number");
			TileAttribute rewardsYTD = new TileAttribute("Rewards Year to Date", 0, "currency");


			List<TileDTO> mtdTile = new ArrayList<TileDTO>();
			List<TileDTO> ytdTile = new ArrayList<TileDTO>();

			if(type.equals("Executive")){
				mtdTile = MSERTilesDAOImpl.getMSERUConnectSummaryTileSUMByParentAndToggle("NAT", "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERUConnectSummaryTileSUMByParentAndToggle("NAT", "YTD");
			}else if (type.equals("Participant")){
				//DO Participant
				mtdTile = MSERTilesDAOImpl.getMSERUConnectSummaryTileBySIDAndToggle(user.getUserId(), "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERUConnectSummaryTileBySIDAndToggle(user.getUserId(), "YTD");
			}else{
				mtdTile = MSERTilesDAOImpl.getMSERUConnectSummaryTileByChildAndToggle(territory, "MTD");
				ytdTile = MSERTilesDAOImpl.getMSERUConnectSummaryTileByChildAndToggle(territory, "YTD");
			}


			if(mtdTile.size() > 0){
				totalqualifiedMTD.setValue(mtdTile.get(0).getParts());
				rewardsMTD.setValue(mtdTile.get(0).getEarnings());
			}

			if(ytdTile.size() > 0){
				totalqualifiedYTD.setValue(ytdTile.get(0).getParts());
				rewardsYTD.setValue(ytdTile.get(0).getEarnings());
			}


			list.add(totalqualifiedMTD);
			list.add(totalqualifiedYTD);
			list.add(rewardsMTD);
			list.add(rewardsYTD);


			tile.addAttributes(list);
			return tile;
		}
		}


		return ResponseEntity.notFound();
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