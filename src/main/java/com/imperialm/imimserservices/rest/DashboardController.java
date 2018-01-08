package com.imperialm.imimserservices.rest;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dto.EnrollmentSummaryDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.MserRankingDTO;
import com.imperialm.imimserservices.dto.MserRankingDetailsDTO;
import com.imperialm.imimserservices.dto.MyFCAMserRankingDTO;
import com.imperialm.imimserservices.dto.MyFCAMserRankingDetailsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.MSERTile;
import com.imperialm.imimserservices.util.IMIServicesUtil;
import com.imperialm.imimserservices.dao.MSERTilesDAOImpl;

@RestController
public class DashboardController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private MSERTilesDAOImpl MSERTilesDAOImpl;

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositionsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.ProgramGroupEnrollmentsDAO ProgramGroupEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.MyFCAMserRankingDetailsDAO MyFCAMserRankingDetailsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.MyFCAMserRankingDAO MyFCAMserRankingDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.RewardSummaryDAOImpl RewardSummaryDAOImpl;
	
	@Autowired com.imperialm.imimserservices.dao.RewardSummaryDetailsDAOImpl RewardSummaryDetailsDAOImpl;
	
	@Autowired com.imperialm.imimserservices.dao.MserRankingDetailsDAOImpl MserRankingDetailsDAOImpl;
	
	@Autowired com.imperialm.imimserservices.dao.MserRankingDAO MserRankingDAOImpl;

	@RequestMapping(value ="/services/tile/{chartId}/{positionCode}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object findTilesListByRole(@PathVariable(value="chartId") String id, @PathVariable(value="positionCode") String positionCode, @PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		int testa = dealerPersonnelPositionsDAO.getRoleByPositionCode(positionCode);
		String type = "";
		String territory = "";
		if( testa == 1 || testa == 3 || testa == 13){
			type = "Executive";
			// we don't really need it for nat
			territory="NAT";
		}else if( testa == 12){
			type = "BC";
			//List<String> bcSet = this.userPositionCodeRoleDAO.getUserTerritoyById(user.getUserId());
			//if(bcSet.size() > 0){
			//	territory = bcSet.get(0);
			//}
			territory = dealerCode;
		}else if( testa == 11){
			type = "District";
			/*List<String> bcSet = this.userPositionCodeRoleDAO.getUserTerritoyById(user.getUserId());
				if(bcSet.size() > 0){
					territory = bcSet.get(0);
				}*/
			territory = dealerCode;
		}else if( testa == 10){
			type = "Dealer";
			territory= dealerCode;
		}else if( testa == 9 || testa == 6){
			type = "Participant";
			territory = user.getUserId();
		}else if( testa == 5){
			type = "Manager";
			// this could be dealercode check with tom
			territory = user.getUserId();
		}
		//divide the switch statement to functions

		switch(id){
		case"en":
		{	
			List<MSERTile> tileAtt = new ArrayList<>();


			if(type.equals("Dealer") || type.equals("Manager")){
				//EnrollmentSummaryDTO mserEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(dealerCode, 4);
				List<GroupSIDEnrollmentsDTO> participants = GroupSIDEnrollmentsDAO.getGroupSidEnrollmentsByDealerCode(dealerCode);

				Integer totalParticipantsEnrolled = null;
				List<String> temp = new ArrayList<>();
				for(GroupSIDEnrollmentsDTO item: participants){
					if(item.getProgramGroupID() == 4 && item.getStatus().equalsIgnoreCase("E")){
						temp.add(item.getSID().toLowerCase().trim());
					}

					if(item.getProgramGroupID() == 1 && item.getStatus().equalsIgnoreCase("E")){
						temp.add(item.getSID().toLowerCase().trim());
					}

					if(item.getProgramGroupID() == 6 && item.getStatus().equalsIgnoreCase("E")){
						temp.add(item.getSID().toLowerCase().trim());
					}

					if(item.getProgramGroupID() == 9 && item.getStatus().equalsIgnoreCase("E")){
						temp.add(item.getSID().toLowerCase().trim());
					}

					if(item.getProgramGroupID() == 15 && item.getStatus().equalsIgnoreCase("E")){
						temp.add(item.getSID().toLowerCase().trim());
					}

					if(item.getProgramGroupID() == 16 && item.getStatus().equalsIgnoreCase("E")){
						temp.add(item.getSID().toLowerCase().trim());
					}
				}

				Set<String> temp2 = new HashSet<>();
				temp2.addAll(temp);
				if(temp2.size()>0){
					totalParticipantsEnrolled = temp2.size();
				}

				//EnrollmentSummaryDTO pcEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(territory, 6);
				//EnrollmentSummaryDTO elEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(territory, 1);
				//EnrollmentSummaryDTO urEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(territory, 15);


				if(totalParticipantsEnrolled != null){
					MSERTile mserEnrollmentAtt = new MSERTile("Total Number of Participants Enrolled in MSER", totalParticipantsEnrolled, "number", "Enrollments Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Total Number of Participants Enrolled in MSER", "-", "number", "Enrollments Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

				if(type.equals("Dealer")){
					boolean elenrolled = ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dealerCode, 1);
					if(elenrolled){
						tileAtt.add(new MSERTile("Dealership Express Lane Enrolled ", "Yes", "text", "Enrollments Tile", ""));
					}else{
						tileAtt.add(new MSERTile("Dealership Express Lane Enrolled ", "No", "text", "Enrollments Tile", ""));
					}

					boolean pcenrolled = ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dealerCode, 6);
					if(pcenrolled){
						tileAtt.add(new MSERTile("Dealership Parts Counter Enrolled ", "Yes", "text", "Enrollments Tile", ""));
					}else{
						tileAtt.add(new MSERTile("Dealership Parts Counter Enrolled ", "No", "text", "Enrollments Tile", ""));
					}

					boolean urenrolled = ProgramGroupEnrollmentsDAO.isDealershipEnrolledByProgramGroup(dealerCode, 15);
					if(urenrolled){
						tileAtt.add(new MSERTile("Dealership Used Car Manager Enrolled ", "Yes", "text", "Enrollments Tile", ""));
					}else{
						tileAtt.add(new MSERTile("Dealership Used Car Manager Enrolled ", "No", "text", "Enrollments Tile", ""));
					}

				}

				if(type.equalsIgnoreCase("Manager")){

					List<String> el = GroupSIDEnrollmentsDAO.getEnrolledPositionCodesBySIDAndProgramGoupId(user.getUserId(), dealerCode, 1);
					boolean elenrolled = el.size()>0;
					if(elenrolled){
						tileAtt.add(new MSERTile("Express Lane Enrolled Manager of Record ", "Yes", "text", "Enrollments Tile", ""));
					}else{
						tileAtt.add(new MSERTile("Express Lane Enrolled Manager of Record ", "No", "text", "Enrollments Tile", ""));
					}

					List<String> pc = GroupSIDEnrollmentsDAO.getEnrolledPositionCodesBySIDAndProgramGoupId(user.getUserId(), dealerCode, 6);
					boolean pcenrolled = pc.size()>0;
					if(pcenrolled){
						tileAtt.add(new MSERTile("Parts Counter Enrolled Manager of Record ", "Yes", "text", "Enrollments Tile", ""));
					}else{
						tileAtt.add(new MSERTile("Parts Counter Enrolled Manager of Record ", "No", "text", "Enrollments Tile", ""));
					}

					List<String> ur = GroupSIDEnrollmentsDAO.getEnrolledPositionCodesBySIDAndProgramGoupId(user.getUserId(), dealerCode, 15);
					boolean urenrolled = ur.size()>0;
					if(urenrolled){
						tileAtt.add(new MSERTile("Used Car Manager Enrolled Manager of Record ", "Yes", "text", "Enrollments Tile", ""));
					}else{
						tileAtt.add(new MSERTile("Used Car Manager Enrolled Manager of Record ", "No", "text", "Enrollments Tile", ""));
					}


				}

			}


			if(type.equals("Executive") || type.equalsIgnoreCase("bc") || type.equalsIgnoreCase("district")){
				EnrollmentSummaryDTO mserEnrollement = null;
				EnrollmentSummaryDTO pcEnrollement = null;
				EnrollmentSummaryDTO elEnrollement = null;
				EnrollmentSummaryDTO urEnrollement = null;

				if(type.equals("Executive")){
					mserEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndParentTerritory(dealerCode, 4);
					pcEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndParentTerritory(dealerCode, 6);
					elEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndParentTerritory(dealerCode, 1);
					urEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndParentTerritory(dealerCode, 15);
				}else{
					mserEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(dealerCode, 4);
					pcEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(dealerCode, 6);
					elEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(dealerCode, 1);
					urEnrollement = MSERTilesDAOImpl.getEnrollementSummaryByProgramGroupAndTerritory(dealerCode, 15);
				}

				if(mserEnrollement != null){
					/*String text = "-";
					if( mserEnrollement.getExpressLaneValidated() != null){
						text =  mserEnrollement.getExpressLaneValidated() + "";
					}*/
					MSERTile mserEnrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in MSER", mserEnrollement.getTotalEnrolled(), "number", "Enrollments Tile", "");
					//MSERTile elEnrollmentAtt = new MSERTile("Total Express Lane Dealers Enrolled", text, "number", "Enrollments Tile", "");
					tileAtt.add(mserEnrollmentAtt);
					//tileAtt.add(elEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in MSER", "-", "number", "Enrollments Tile", "");
					//MSERTile elEnrollmentAtt = new MSERTile("Total Express Lane Dealers Enrolled", "-", "text", "Enrollments Tile", "");
					tileAtt.add(mserEnrollmentAtt);
					//tileAtt.add(elEnrollmentAtt);

				}

				if(pcEnrollement != null){
					MSERTile enrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in Parts Counter", pcEnrollement.getTotalEnrolled(), "number", "Enrollments Tile", "");
					tileAtt.add(enrollmentAtt);
				}else{
					MSERTile enrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in Parts Counter", "-", "text", "Enrollments Tile", "");
					tileAtt.add(enrollmentAtt);
				}

				if(elEnrollement != null){
					MSERTile enrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in Express Lane", elEnrollement.getTotalEnrolled(), "number", "Enrollments Tile", "");
					tileAtt.add(enrollmentAtt);
				}else{
					MSERTile enrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in Express Lane", "-", "text", "Enrollments Tile", "");
					tileAtt.add(enrollmentAtt);
				}

				if(urEnrollement != null){
					MSERTile enrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in Used Car Manager", urEnrollement.getTotalEnrolled(), "number", "Enrollments Tile", "");
					tileAtt.add(enrollmentAtt);
				}else{
					MSERTile enrollmentAtt = new MSERTile("Total Number of Dealers Enrolled in Used Car Manager", "-", "text", "Enrollments Tile", "");
					tileAtt.add(enrollmentAtt);
				}

			}

			return tileAtt;
		}
		case"re":
		{	
			List<MSERTile> tileAtt = new ArrayList<>();

			if(type.equals("Dealer") || type.equals("Manager")){

				Date mstart = IMIServicesUtil.getCurrentMonthStartDate();
				Date ystart = IMIServicesUtil.getCurrentYearStartDate();
				Date mend = IMIServicesUtil.getCurrentMonthEndDate();
				Date yend = IMIServicesUtil.getCurrentMonthEndDate();
				List<BigDecimal> mtd = RewardSummaryDAOImpl.getRewardSummaryByChildTerritoryAndToggle(dealerCode, mstart, mend);
				List<BigDecimal> ytd = RewardSummaryDAOImpl.getRewardSummaryByChildTerritoryAndToggle(dealerCode, ystart, yend);
				//List<MyfcaMSERTotalEarningsDTO> mtd = MyfcaMSERTotalEarningsDAO.getMSERGraphByChildTerritoryAndToggle(dealerCode, "mtd");
				//List<MyfcaMSERTotalEarningsDTO> ytd = MyfcaMSERTotalEarningsDAO.getMSERGraphByChildTerritoryAndToggle(dealerCode, "ytd");

				Double mtdtotal = 0.0;
				Double ytdtotal = 0.0;

				/*for(MyfcaMSERTotalEarningsDTO item: mtd){
					mtdtotal = mtdtotal + item.getAmount();
				}

				for(MyfcaMSERTotalEarningsDTO item: ytd){
					ytdtotal = ytdtotal + item.getAmount();
				}*/

				for(BigDecimal item: mtd){
					mtdtotal = mtdtotal.doubleValue() + item.doubleValue();
				}

				for(BigDecimal item: ytd){
					ytdtotal = ytdtotal.doubleValue() + item.doubleValue();
				}

				if(ytd.size() > 0){
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD ", ytdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

				if(mtd.size() > 0){
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD ", mtdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

			}


			if(type.equals("Dealer") || type.equals("Manager")){
				//List<MyFCAMserRankingDTO> ytd = MyFCAMserRankingDAO.getMSERDetailsGraphByChild(dealerCode);
				List<MserRankingDTO> ytd = MserRankingDAOImpl.getMserRankingByChild(dealerCode);

				if(ytd.size() > 0){
					MSERTile mserEnrollmentAtt = new MSERTile("Dealership Ranking within District by Rewarding Excellence&reg; Card Awards YTD", ytd.get(0).getDistRankYTD(), "number", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Dealership Ranking within District by Rewarding Excellence&reg; Card Awards YTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

			}


			if(type.equalsIgnoreCase("participant")){
				//List<MyFCAMserRankingDetailsDTO> rank = MyFCAMserRankingDetailsDAO.getMSERDetailsBySID(user.getUserId().trim(), dealerCode);
				List<MserRankingDetailsDTO> rank = MserRankingDetailsDAOImpl.getMserRankingDetailsBySID(user.getUserId().trim(), dealerCode);
				//List<MyfcaMSERTotalEarningsDetailsDTO> rewards = MyfcaMSERTotalEarningsDetailsDAO.getMSERGraphDetailsSUMBySID(user.getUserId().trim(), dealerCode);
				
				Date mstart = IMIServicesUtil.getCurrentMonthStartDate();
				Date ystart = IMIServicesUtil.getCurrentYearStartDate();
				Date mend = IMIServicesUtil.getCurrentMonthEndDate();
				Date yend = IMIServicesUtil.getCurrentMonthEndDate();
				List<BigDecimal> rewards = RewardSummaryDetailsDAOImpl.getRewardSummaryBySIDAndToggle(user.getUserId(), dealerCode, mstart, mend);
				List<BigDecimal> ytd = RewardSummaryDetailsDAOImpl.getRewardSummaryBySIDAndToggle(user.getUserId(), dealerCode, ystart, yend);
				
				Double mtdtotal = 0.0;
				Double ytdtotal = 0.0;

				/*for(MyfcaMSERTotalEarningsDTO item: mtd){
					mtdtotal = mtdtotal + item.getAmount();
				}

				for(MyfcaMSERTotalEarningsDTO item: ytd){
					ytdtotal = ytdtotal + item.getAmount();
				}*/

				for(BigDecimal item: rewards){
					mtdtotal = mtdtotal + item.doubleValue();
				}

				for(BigDecimal item: ytd){
					ytdtotal = ytdtotal + item.doubleValue();
				}

				if(ytd.size() > 0){
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD ", ytdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

				if(rewards.size() > 0){
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD ", mtdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

				if(ytd.size() > 0){
					MSERTile mserEnrollmentAtt = new MSERTile("Personal Ranking within District by Rewarding Excellence&reg; Card Awards YTD", rank.get(0).getDistRankYTD(), "number", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Personal Ranking within District by Rewarding Excellence&reg; Card Awards YTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}


			}


			if(type.equalsIgnoreCase("bc") || type.equalsIgnoreCase("district")){


				/*List<MyfcaMSERTotalEarningsDTO> mtd = MyfcaMSERTotalEarningsDAO.getMSERGraphProgramsSUMByParentTerritoryAndToggle(territory, "mtd");
				List<MyfcaMSERTotalEarningsDTO> ytd = MyfcaMSERTotalEarningsDAO.getMSERGraphProgramsSUMByParentTerritoryAndToggle(territory, "ytd");*/

				Date mstart = IMIServicesUtil.getCurrentMonthStartDate();
				Date ystart = IMIServicesUtil.getCurrentYearStartDate();
				Date mend = IMIServicesUtil.getCurrentMonthEndDate();
				Date yend = IMIServicesUtil.getCurrentYearEndDate();
				List<BigDecimal> mtd = RewardSummaryDAOImpl.getRewardSummaryByChildTerritoryAndToggle(dealerCode, mstart, mend);
				List<BigDecimal> ytd = RewardSummaryDAOImpl.getRewardSummaryByChildTerritoryAndToggle(dealerCode, ystart, yend);


				Double mtdtotal = 0.0;
				Double ytdtotal = 0.0;

				/*for(MyfcaMSERTotalEarningsDTO item: mtd){
					mtdtotal = mtdtotal + item.getAmount();
				}

				for(MyfcaMSERTotalEarningsDTO item: ytd){
					ytdtotal = ytdtotal + item.getAmount();
				}*/

				for(BigDecimal item: mtd){
					mtdtotal = mtdtotal.doubleValue() + item.doubleValue();
				}

				for(BigDecimal item: ytd){
					ytdtotal = ytdtotal.doubleValue() + item.doubleValue();
				}

				if(ytd.size() > 0){
					//MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD ", ytd.get(0).getAmount(), "currency", "Reward Tile", "");
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD ", ytdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

				if(mtd.size() > 0){
					//MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD ", mtd.get(0).getAmount(), "currency", "Reward Tile", "");
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD ", mtdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

			}

			if(type.equals("Executive")){
				Date mstart = IMIServicesUtil.getCurrentMonthStartDate();
				Date ystart = IMIServicesUtil.getCurrentYearStartDate();
				Date mend = IMIServicesUtil.getCurrentMonthEndDate();
				Date yend = IMIServicesUtil.getCurrentMonthEndDate();
				List<BigDecimal> mtd = RewardSummaryDAOImpl.getRewardSummaryByParentTerritoryAndToggle(dealerCode, mstart, mend);
				List<BigDecimal> ytd = RewardSummaryDAOImpl.getRewardSummaryByParentTerritoryAndToggle(dealerCode, ystart, yend);
				
				
				Double mtdtotal = 0.0;
				Double ytdtotal = 0.0;

				/*for(MyfcaMSERTotalEarningsDTO item: mtd){
					mtdtotal = mtdtotal + item.getAmount();
				}

				for(MyfcaMSERTotalEarningsDTO item: ytd){
					ytdtotal = ytdtotal + item.getAmount();
				}*/

				for(BigDecimal item: mtd){
					mtdtotal = mtdtotal.doubleValue() + item.doubleValue();
				}

				for(BigDecimal item: ytd){
					ytdtotal = ytdtotal.doubleValue() + item.doubleValue();
				}

				if(ytd.size() > 0){
					//MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD ", ytd.get(0).getAmount(), "currency", "Reward Tile", "");
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD ", ytdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards YTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

				if(mtd.size() > 0){
					//MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD ", mtd.get(0).getAmount(), "currency", "Reward Tile", "");
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD ", mtdtotal, "currency", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}else{
					MSERTile mserEnrollmentAtt = new MSERTile("Rewarding Excellence&reg; Card Awards MTD", "-", "text", "Reward Tile", "");
					tileAtt.add(mserEnrollmentAtt);
				}

			}


			return tileAtt;
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