package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dao.DealerPersonnelDAO;
import com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.entities.EmailProperties;
import com.imperialm.imimserservices.model.DistributionInfo;
import com.imperialm.imimserservices.model.MVPDistribution;
import com.imperialm.imimserservices.model.MVPDistributionList;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.NameValueList;
import com.imperialm.imimserservices.model.NameValueWithTeamId;
import com.imperialm.imimserservices.model.NameValueWithTeamIdList;
import com.imperialm.imimserservices.model.PayoutRedistribution;
import com.imperialm.imimserservices.model.PayoutRedistributionList;
import com.imperialm.imimserservices.model.RedistributionHistory;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.repositories.EmailPropetiesRepo;
import com.imperialm.imimserservices.services.EmailService;
import com.imperialm.imimserservices.util.IMIServicesConstants;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@Controller
public class RewardDistributionController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.RewardsDistributionDAOImpl RewardsDistributionDAOImpl;

	@Autowired
	private com.imperialm.imimserservices.util.EmailHandler EmailHandler;

	@Autowired
	private GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.ProgramGroupEnrollmentsDAO ProgramGroupEnrollmentsDAO;

	@Autowired
	private EmailService mailService;

	@Autowired
	private EmailPropetiesRepo mailPropertiesRepo;

	@RequestMapping(value = "/Rewards/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getRewards(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		Map<String, Double> rewards = new HashMap<>();

		Double pc = this.RewardsDistributionDAOImpl.getRewardsByDealer(dealerCode, "pc");
		Double el = this.RewardsDistributionDAOImpl.getRewardsByDealer(dealerCode, "el");
		Double ur = this.RewardsDistributionDAOImpl.getRewardsByDealer(dealerCode, "ur");
		Double mvp = this.RewardsDistributionDAOImpl.getRewardsByDealer(dealerCode, "mvp");

		rewards.put("MVP", mvp);
		rewards.put("pc", pc);
		rewards.put("el", el);
		rewards.put("ur", ur);

		return rewards;
	}

	@RequestMapping(value = "/Rewards/Distribution/el/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getelRewards(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		// USE CONTANSTS
		List<RedistributionHistory> list = this.RewardsDistributionDAOImpl.getRedistribtionInfoEL(dealerCode);
		List<DealerPersonnelDTO> names = this.DealerPersonnelDAO.getSIDInfoByDealerCode(dealerCode);

		for (RedistributionHistory item : list) {
			for (DealerPersonnelDTO name : names) {
				if (item.getSID().equalsIgnoreCase(name.getSID())) {
					item.setFirstName(name.getFirstName());
					item.setLastName(name.getLastName());
				}
			}
		}

		return list;
	}

	@RequestMapping(value = "/Rewards/Distribution/{program}/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object setRewards(@RequestBody final NameValueWithTeamIdList list,
			@PathVariable(value = "dealerCode") final String dealerCode,
			@PathVariable(value = "program") String program, HttpServletRequest request) {

		final UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		if (program.equalsIgnoreCase("el")) {
			return this.setELRewards(list, dealerCode, user);
		}

		Double programValue = this.RewardsDistributionDAOImpl.getRewardsByDealer(dealerCode, program);

		int programId = 0;
		if (program.equalsIgnoreCase("ur")) {
			programId = -15;
		} else if (program.equalsIgnoreCase("pc")) {
			programId = -6;
		} else {
			return ResponseEntity.status(500).body("Unexpected Program");
		}

		Double total = 0.0;
		for (NameValueWithTeamId item : list.getList()) {

			if (item.getValue().getClass().equals(Integer.class)) {
				total += (Integer) item.getValue();
			} else {
				total += (Double) item.getValue();
			}
		}

		if (total == 0) {
			return ResponseEntity.status(500).body("No Rewards");
		}

		if (programValue.doubleValue() != total.doubleValue()) {
			return ResponseEntity.status(500).body("Must distribute the whole amount");
		}

		int incentiveId = this.RewardsDistributionDAOImpl.getIncentiveId(Math.abs(programId));
		Integer AllocationIds = null;
		// String teamId = null;
		AllocationIds = this.RewardsDistributionDAOImpl.addToAllocationTable(dealerCode, user.getUserId(), programId,
				null);

		final List<String> sids = new ArrayList<>();

		Date date = new Date();
		if (AllocationIds != null) {
			for (NameValueWithTeamId item : list.getList()) {
				if (item.getValue().getClass().equals(Integer.class)) {
					Double value = 0.0 + (Integer) item.getValue();
					this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), value, user.getUserId(),
							AllocationIds, date);
				} else {
					this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(),
							(Double) item.getValue(), user.getUserId(), AllocationIds, date);
				}
				sids.add(item.getName());
			}

			this.sendConfirmationEmail(sids, dealerCode, list, user);

			if (programId == -15) {
				String statusCode = "UM-D";
				return this.RewardsDistributionDAOImpl.updateEligibleROPartsWhereAllocationIdIsNull(dealerCode,
						AllocationIds, incentiveId, statusCode, programId);
			} else if (programId == -6) {
				return this.RewardsDistributionDAOImpl.updatePCEligibleROPartsWhereAllocationIdIsNull(dealerCode,
						AllocationIds);
			}

		}

		return ResponseEntity.status(500).body("Error while updating");
	}

	public @ResponseBody Object setELRewards(final NameValueWithTeamIdList list, final String dealerCode,
			final UserDetailsImpl user) {

		// USE CONSTATNT
		int programId = -1;
		String teamId = "";
		if (list.getList().size() > 0) {
			teamId = list.getList().get(0).getTeamId();
		} else {
			return ResponseEntity.status(500).body("No Team ID Found");
		}
		List<RedistributionHistory> programValueList = this.RewardsDistributionDAOImpl
				.getRedistribtionInfoELByTeamId(dealerCode, teamId);

		Double programValue = 0.0;
		for (RedistributionHistory item : programValueList) {
			programValue += item.getAmount();
		}

		Double total = 0.0;
		for (NameValueWithTeamId item : list.getList()) {

			if (item.getValue().getClass().equals(Integer.class)) {
				total += (Integer) item.getValue();
			} else {
				total += (Double) item.getValue();
			}
		}

		if (total == 0) {
			return ResponseEntity.status(500).body("No Rewards");
		}

		if (programValue.doubleValue() != total.doubleValue()) {
			if (programValue.doubleValue() < total.doubleValue()) {
				return ResponseEntity.status(500).body("Must distribute the whole amount");
			} else {
				return ResponseEntity.status(500).body("Reward amount exceeded");
			}
		}

		// TODO: USER CONSTANTS
		int incentiveId = this.RewardsDistributionDAOImpl.getIncentiveId(1);
		Integer AllocationIds = null;
		AllocationIds = this.RewardsDistributionDAOImpl.addToAllocationTable(dealerCode, user.getUserId(), programId,
				teamId);

		final List<String> sids = new ArrayList<>();

		Date date = new Date();
		if (AllocationIds != null) {
			for (NameValueWithTeamId item : list.getList()) {
				if (item.getValue().getClass().equals(Integer.class)) {
					Double value = 0.0 + (Integer) item.getValue();
					this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), value, user.getUserId(),
							AllocationIds, date);
				} else {
					this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(),
							(Double) item.getValue(), user.getUserId(), AllocationIds, date);
				}
				sids.add(item.getName());
			}

			this.sendConfirmationEmail(sids, dealerCode, list, user);

			String statusCode = "EL-D";
			return this.RewardsDistributionDAOImpl.updateEligibleROPartsWhereAllocationIdIsNullForEL(dealerCode,
					AllocationIds, incentiveId, statusCode, programId, teamId);
		}

		return ResponseEntity.status(500).body("Error while updating");
	}

	private void sendConfirmationEmail(final List<String> sids, final String dealerCode,
			final NameValueWithTeamIdList list, final UserDetailsImpl user) {
		new Thread(new Runnable() {

			@Override
			public void run() {
				List<DealerPersonnelDTO> names = DealerPersonnelDAO.getSIDInfoBySIDAndDealerCode(sids, dealerCode);
				List<NameValueWithTeamId> emailList = list.getList();
				for (NameValueWithTeamId item : emailList) {
					for (DealerPersonnelDTO user : names) {
						if (item.getName().trim().equalsIgnoreCase(user.getSID().trim())) {
							item.setName(user.getFirstName() + " " + user.getLastName());
						}
					}
				}
				List<Object> parameters = new ArrayList<>();

				parameters.add(user.getUser().getName());
				StringBuilder builder = new StringBuilder(
						"<table style='border:1px solid rgb(225, 230, 239);width:400px;'><thead><tr style='background-color: rgb(179,223,255); border-bottom:1px solid rgb(225, 230, 239);''><th style='padding: 7px; width: 50%;'>User Name</th><th style='padding: 7px; text-align: right; width: 50%;'>Amount Distributed</th></tr></thead>");
				double total = 0.0;
				for (NameValueWithTeamId item : emailList) {
					if (item.getValue().getClass().equals(Integer.class)) {
						total = total + (Integer) item.getValue();
						builder.append(
								"<tr style='background-color: rgb(250,250,250); border-bottom: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); padding: 7px;'>");
						builder.append(item.getName()).append("</td><td style='padding: 7px; text-align: right;'>");
						builder.append(IMIServicesUtil.formatCurrency((Integer) item.getValue())).append("</td></tr>");
					} else {
						total = total + ((Double) item.getValue());
						builder.append(
								"<tr style='background-color: rgb(250,250,250); border-bottom: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); padding: 7px;'>");
						builder.append(item.getName()).append("</td><td style='padding: 7px; text-align: right;'>");
						builder.append(IMIServicesUtil.formatCurrencyNoRounding((Double) item.getValue()))
								.append("</td></tr>");
					}
				}
				builder.append(
						"<tr style='background-color: rgb(240, 240, 240); border-top: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); font-weight: bold; padding: 7px;'>Total</td><td style='font-weight: bold; padding: 7px; text-align: right;'>");
				builder.append(IMIServicesUtil.formatCurrencyNoRounding(total) + "</td></tr></table>");
				parameters.add(builder.toString());

				EmailProperties mailProperties = mailPropertiesRepo.findByEmailNameAndProgramProgramId(
						IMIServicesConstants.MSER_REWARD_DISTRIBUTION, IMIServicesConstants.FCA_PROGRAM_MSER);
				mailProperties.setParameters(parameters);
				mailProperties.setEmailTo(user.getUser().getEmail());

				mailService.sendMailWithHeader(mailProperties);

				// EmailHandler.sendMailConfirmation(user, "distributedReward", emailList);
			}

		}).start();
	}

	@RequestMapping(value = "/Rewards/MVPApproval/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object approveMVP(@RequestBody MVPDistributionList list,
			@PathVariable(value = "dealerCode") String dealerCode, HttpServletRequest request) {

		// UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		IMIServicesUtil.checkToken(request);

		for (MVPDistribution item : list.getList()) {
			if (item.getApproveDate() != null && (item.getSID() == null || item.getSID().trim().isEmpty())) {
				return ResponseEntity.status(500).body("Can't approved without selecting a valid SID");
			}
		}

		try {
			Date date = new Date();
			for (MVPDistribution item : list.getList()) {
				if (item.getApproveDate() != null && item.getSID() != null && !item.getSID().trim().isEmpty()) {
					this.RewardsDistributionDAOImpl.setMVPRewards(item, date);
				}
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error while updating");
		}

		return true;
	}

	@RequestMapping(value = "/Rewards/MVPApproval/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getMVPRecords(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {
		IMIServicesUtil.checkToken(request);

		List<MVPDistribution> result = this.RewardsDistributionDAOImpl.getMVPRewards(dealerCode);

		List<DealerPersonnelDTO> dpUser = new ArrayList<>();

		List<GroupSIDEnrollmentsDTO> enrollmentStatus = GroupSIDEnrollmentsDAO
				.getGroupSidEnrollmentsByDealerCode(dealerCode);

		List<String> eligibale = Arrays.asList("09", "13", "ES");
		for (GroupSIDEnrollmentsDTO user : enrollmentStatus) {
			for (MVPDistribution item : result) {
				if (user.getSID().trim().equalsIgnoreCase(item.getOriginalSID().trim()) && user.getProgramGroupID() == 5
						&& user.getStatus().equalsIgnoreCase("E") && eligibale.contains(user.getPositionCode())) {
					item.setOriginalSID("");
				}
			}
		}

		for (DealerPersonnelDTO item : dpUser) {
			for (int i = 0; i < result.size(); i++) {
				if (result.get(i).getOriginalSID().equalsIgnoreCase(item.getSID())) {
					result.get(i).setOriginalName(
							new NameValue(item.getFirstName() + " " + item.getLastName(), item.getSID()));
				}
			}
		}
		return result;
	}

	@RequestMapping(value = "/General/ParticipantsByDealer/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getParticipantsByDealerCode(@PathVariable(value = "dealerCode") String dealerCode,
			@PathVariable(value = "program") String program, HttpServletRequest request) {

		List<DealerPersonnelDTO> dpUser = new ArrayList<>();
		if (program.equalsIgnoreCase("pc")) {
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode,
					Arrays.asList("08", "14", "40", "19", "32", "33"));
			/*
			 * //dpUser =
			 * DealerPersonnelDAO.getParticipantsEnrolledByDealerCodeForDistributions(
			 * dealerCode); List<DealerPersonnelDTO> dpUserEnrolled =
			 * DealerPersonnelDAO.getParticipantsEnrolledByDealerCodeForDistributions(
			 * dealerCode); //List<GroupSIDEnrollmentsDTO> dpUserEligible =
			 * GroupSIDEnrollmentsDAO.getAllGroupSidEnrollmentsByDealerCode(dealerCode);
			 * List<String> elpc = new
			 * ArrayList<>(Arrays.asList("08","14","40","19","32","33"));
			 * for(DealerPersonnelDTO user: dpUserEnrolled){
			 * if(elpc.contains(user.getPositionCode())){ dpUser.add(user); } }
			 */
		} else if (program.equalsIgnoreCase("el")) {
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode,
					Arrays.asList("13", "23", "20", "2A", "09"));
			/*
			 * List<DealerPersonnelDTO> dpUserEnrolled =
			 * DealerPersonnelDAO.getParticipantsEnrolledByDealerCodeForDistributions(
			 * dealerCode); //List<GroupSIDEnrollmentsDTO> dpUserEligible =
			 * GroupSIDEnrollmentsDAO.getAllGroupSidEnrollmentsByDealerCode(dealerCode);
			 * List<String> elpc = new ArrayList<>(Arrays.asList("13", "23", "20",
			 * "2A","09")); for(DealerPersonnelDTO user: dpUserEnrolled){
			 * if(elpc.contains(user.getPositionCode())){ dpUser.add(user); } }
			 */
		} else if (program.equalsIgnoreCase("ur")) {
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("12", "07", "34"));
			/*
			 * List<DealerPersonnelDTO> dpUserEnrolled =
			 * DealerPersonnelDAO.getParticipantsEnrolledByDealerCodeForDistributions(
			 * dealerCode); //List<GroupSIDEnrollmentsDTO> dpUserEligible =
			 * GroupSIDEnrollmentsDAO.getAllGroupSidEnrollmentsByDealerCode(dealerCode);
			 * List<String> elpc = new ArrayList<>(Arrays.asList("12","07","34"));
			 * for(DealerPersonnelDTO user: dpUserEnrolled){
			 * if(elpc.contains(user.getPositionCode())){ dpUser.add(user); } }
			 */
		} else if (program.equalsIgnoreCase("mvp")) {
			// List<DealerPersonnelDTO> dpUserEligible =
			// DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode,
			// Arrays.asList("09","13","ES"));
			List<GroupSIDEnrollmentsDTO> dpUserEligible = GroupSIDEnrollmentsDAO
					.getAllGroupSidEnrollmentsByDealerCode(dealerCode);
			List<DealerPersonnelDTO> dpUserEnrolled = DealerPersonnelDAO
					.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, 5);
			List<String> mvppc = new ArrayList<>(Arrays.asList("09", "13", "ES"));
			for (DealerPersonnelDTO user : dpUserEnrolled) {
				for (GroupSIDEnrollmentsDTO item : dpUserEligible) {
					if (mvppc.contains(user.getPositionCode())
							&& user.getSID().trim().equalsIgnoreCase(item.getSID())) {
						dpUser.add(user);
					}
				}
			}
		} else if (program.equalsIgnoreCase("payout")) {
			List<GroupSIDEnrollmentsDTO> dpUserEligible = GroupSIDEnrollmentsDAO
					.getAllGroupSidEnrollmentsByDealerCode(dealerCode);
			List<DealerPersonnelDTO> dpUserEnrolled = DealerPersonnelDAO
					.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, 4);
			List<String> eligiblepc = new ArrayList<>(Arrays.asList("13", "23", "01", "2A", "ES", "ET", "08", "09"));
			for (DealerPersonnelDTO user : dpUserEnrolled) {
				for (GroupSIDEnrollmentsDTO item : dpUserEligible) {
					if (eligiblepc.contains(user.getPositionCode())
							&& user.getSID().trim().equalsIgnoreCase(item.getSID())) {
						dpUser.add(user);
					}
				}
			}
			// dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode,
			// Arrays.asList("13", "23", "01", "2A","ES","ET","08","09"));
		} else {
			return ResponseEntity.status(500).body("Invalid program");
		}

		List<String> tempSids = new ArrayList<>();
		List<TwoStringItems> sids = new ArrayList<>();
		for (DealerPersonnelDTO item : dpUser) {
			if (!tempSids.contains(item.getSID())) {
				tempSids.add(item.getSID());
				sids.add(new TwoStringItems(item.getFirstName() + " " + item.getLastName(), item.getSID()));
			}
		}

		return sids;
	}

	@RequestMapping(value = "/Rewards/ReHistory/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getRedistributionHistory(@PathVariable(value = "dealerCode") String dealerCode,
			@PathVariable(value = "program") String program, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		int programId = 0;
		if (program.equalsIgnoreCase("pc")) {
			programId = -6;
		} else if (program.equalsIgnoreCase("el")) {
			programId = -1;
		} else if (program.equalsIgnoreCase("ur")) {
			programId = -15;
		} else if (program.equalsIgnoreCase("mvp")) {
			return this.RewardsDistributionDAOImpl.getMVPRewardsHistory(dealerCode);
		} else if (program.equalsIgnoreCase("payout")) {
			return this.getPayoutRedistribtion(dealerCode, request);
		} else {
			return ResponseEntity.status(500).body("Invalid program");
		}

		return this.RewardsDistributionDAOImpl.getRedistribtionInfo(dealerCode, programId);

	}

	/*
	 * @RequestMapping(value = "/Rewards/ReHistory/el/{dealerCode}/{teamId}", method
	 * = RequestMethod.GET) public @ResponseBody Object
	 * getELRedistributionHistory(@PathVariable(value="dealerCode") String
	 * dealerCode, @PathVariable(value="program") String
	 * program,@PathVariable(value="teamId") String teamId, HttpServletRequest
	 * request) {
	 * 
	 * IMIServicesUtil.checkToken(request); return
	 * this.RewardsDistributionDAOImpl.getELRedistribtionInfo(dealerCode, teamId); }
	 */

	@RequestMapping(value = "/Rewards/Redistribute/{dealerCode}/{allocationId}", method = RequestMethod.POST)
	public @ResponseBody Object redistributeRewards(@RequestBody NameValueList list,
			@PathVariable(value = "allocationId") Integer allocationId,
			@PathVariable(value = "dealerCode") String dealerCode, HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		Integer programId = this.RewardsDistributionDAOImpl.getProgramIdByAllocationId(allocationId);

		List<RedistributionHistory> allHistory = new ArrayList<>();

		if (programId == 1) {
			int incentiveId = this.RewardsDistributionDAOImpl.getIncentiveId(programId);
			String teamId = this.RewardsDistributionDAOImpl.getTeamId(dealerCode, incentiveId, allocationId);
			allHistory = this.RewardsDistributionDAOImpl.getELRedistribtionInfo(dealerCode, teamId);
		} else {
			allHistory = this.RewardsDistributionDAOImpl.getRedistribtionInfo(dealerCode, programId);
		}

		List<RedistributionHistory> history = new ArrayList<>();
		Double historyTotal = 0.0;
		for (RedistributionHistory item : allHistory) {
			if (item.getAllocationID().equals(allocationId)) {
				history.add(item);
				historyTotal += item.getAmount();
			}
		}

		Double total = 0.0;
		for (NameValue item : list.getList()) {

			if (item.getValue().getClass().equals(Integer.class)) {
				total += (Integer) item.getValue();
			} else {
				total += (Double) item.getValue();
			}
		}

		if (total == 0) {
			return ResponseEntity.status(500).body("No Rewards");
		}

		if (historyTotal.doubleValue() != total.doubleValue()) {
			return ResponseEntity.status(500).body("Must distribute the whole amount");
		}

		/*
		 * String status = "APRD"; if(programId !=null){ if(programId == 1){
		 * status = "EL-C"; }
		 * 
		 * if(programId == 15){ status = "UM-C"; } }
		 */

		Date date = new Date();
		// Invalidate all records then add the new numbers
		this.RewardsDistributionDAOImpl.invalidateForRedistribution(allocationId, "REDIST");
		for (NameValue item : list.getList()) {
			if (item.getValue().getClass().equals(Integer.class)) {
				Double value = 0.0 + (Integer) item.getValue();
				this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), value, user.getUserId(),
						allocationId, date);
			} else {
				this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), (Double) item.getValue(),
						user.getUserId(), allocationId, date);
			}
		}

		return true;
	}

	@RequestMapping(value = "/Rewards/RedistributeReturnToDealer/{dealerCode}/{allocationId}", method = RequestMethod.GET)
	public @ResponseBody Object redistributeReturnToDealer(@PathVariable(value = "allocationId") Integer allocationId,
			@PathVariable(value = "dealerCode") String dealerCode, HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		Integer programId = this.RewardsDistributionDAOImpl.getProgramIdByAllocationId(allocationId);

		if (programId == null) {
			return ResponseEntity.status(500).body("Not Found to redistribute");
		}

		// return the rewards for dealer to redistribute
		this.RewardsDistributionDAOImpl.invalidateForDealerRedistribution(allocationId, user.getUserId().trim(),
				programId);

		return true;
	}

	@RequestMapping(value = "/Rewards/PayoutRedistribution/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getPayoutRedistribtion(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		// return the rewards for dealer to redistribute
		List<PayoutRedistribution> result = new ArrayList<>();
		// result.addAll(this.RewardsDistributionDAOImpl.getPayoutRedistibution(dealerCode));
		result.addAll(this.RewardsDistributionDAOImpl.getPayoutRedistibutionRJCT(dealerCode));
		List<Integer> allocheaderIds = new ArrayList<>();
		Set<Integer> uniqueallocheaderIds = new HashSet<>();
		for (PayoutRedistribution item : result) {
			uniqueallocheaderIds.add(item.getRewardAllocHeaderId());
		}
		allocheaderIds.addAll(uniqueallocheaderIds);

		List<PayoutRedistribution> rejected = this.RewardsDistributionDAOImpl.getPayoutRedistibutionCLSE(dealerCode,
				allocheaderIds);

		Map<String, String> names = new HashMap<>();
		List<String> sids = new ArrayList<>();
		for (PayoutRedistribution item : rejected) {
			sids.add(item.getSID());
		}

		List<DealerPersonnelDTO> sidinfo = this.DealerPersonnelDAO.getSIDInfoBySIDAndDealerCode(sids, dealerCode);

		for (String sid : sids) {
			for (DealerPersonnelDTO item : sidinfo) {
				if (sid.trim().equalsIgnoreCase(item.getSID().trim())) {
					names.put(sid.trim(), item.getFirstName() + " " + item.getLastName());
				}
			}
		}

		for (PayoutRedistribution item : rejected) {
			String temp = item.getSID();
			item.setSID(temp + " - " + StringUtils.defaultString(names.get(temp.trim()), "Not Available"));
		}

		result.addAll(rejected);

		// result.addAll(this.RewardsDistributionDAOImpl.getPCPayoutRedistibution(dealerCode));
		return result;
	}

	@RequestMapping(value = "/Rewards/PayoutRedistribution/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object setPayoutRedistribtion(@RequestBody PayoutRedistributionList list,
			@PathVariable(value = "dealerCode") String dealerCode, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		// return the rewards for dealer to redistribute

		Map<String, String> names = new HashMap<>();
		List<String> sids = new ArrayList<>();
		for (PayoutRedistribution item : list.getList()) {

			if (!(item.getITAStatus().equalsIgnoreCase("CLSE") || item.getITAStatus().equalsIgnoreCase("APRV"))) {
				return ResponseEntity.status(500).body("You must approve all records");
			}
			if (item.getITAStatus().equalsIgnoreCase("APRV")
					&& (item.getSID() == null || item.getSID().trim().isEmpty())) {
				return ResponseEntity.status(500).body("Can't approved without selecting a valid SID");
			}

			sids.add(item.getSID());
		}

		List<DealerPersonnelDTO> sidinfo = this.DealerPersonnelDAO.getSIDInfoBySIDAndDealerCode(sids, dealerCode);

		for (String sid : sids) {
			for (DealerPersonnelDTO item : sidinfo) {
				if (sid.trim().equalsIgnoreCase(item.getSID().trim())) {
					names.put(sid.trim(), item.getFirstName() + " " + item.getLastName());
				}
			}
		}

		boolean result = true;
		try {
			for (PayoutRedistribution item : list.getList()) {
				if (item.getITAStatus().equalsIgnoreCase("APRV") && item.getSID() != null
						&& !item.getSID().trim().isEmpty()) {
					// FETCHNAME
					if (!this.RewardsDistributionDAOImpl.setPayoutRewards(item, names.get(item.getSID().trim()))) {
						result = false;
					}
				}
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error while updating");
		}

		if (result) {
			return result;
		} else {
			return ResponseEntity.status(500).body("Could not update");
		}
	}

	// ADD TEAMS
	@RequestMapping(value = "/Rewards/DistributionInfo/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getPayoutRedistribtionByProgram(@PathVariable(value = "program") String program,
			@PathVariable(value = "dealerCode") String dealerCode, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		int programid = 0;
		if (program.equalsIgnoreCase("el")) {
			programid = 1;
		} else if (program.equalsIgnoreCase("ur")) {
			programid = 15;
		} else if (program.equalsIgnoreCase("pc")) {
			programid = 6;
		} else {
			return ResponseEntity.status(500).body("Not a valid program");
		}

		List<DistributionInfo> result = new ArrayList<>();
		if (programid == 6) {
			result.addAll(this.RewardsDistributionDAOImpl.getPCDistributionInfo(dealerCode));
		} else {
			result.addAll(this.RewardsDistributionDAOImpl.getDistributionInfo(programid, dealerCode, null));
		}

		return result;
	}

	// ADD TEAMS
	@RequestMapping(value = "/Rewards/DistributionInfo/el/{dealerCode}/{teamId}", method = RequestMethod.GET)
	public @ResponseBody Object getELPayoutRedistribtionByProgram(@PathVariable(value = "dealerCode") String dealerCode,
			@PathVariable(value = "teamId") String teamId, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		int programid = 1;

		List<DistributionInfo> result = new ArrayList<>();
		result.addAll(this.RewardsDistributionDAOImpl.getDistributionInfo(programid, dealerCode, teamId));

		return result;
	}

	@RequestMapping(value = "/Rewards/MVP/Auto/{dealerCode}/{auto}", method = RequestMethod.GET)
	public @ResponseBody Object setAutoApproval(@PathVariable(value = "dealerCode") String dealerCode,
			@PathVariable(value = "auto") String auto, HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		if (auto.equalsIgnoreCase("true")) {
			if (ProgramGroupEnrollmentsDAO.setAutoApprovalMVP(dealerCode, true, user.getUserId())) {
				return true;
			} else {
				return ResponseEntity.status(500).body("failed to update");
			}
		} else if (auto.equalsIgnoreCase("false")) {
			if (ProgramGroupEnrollmentsDAO.setAutoApprovalMVP(dealerCode, false, user.getUserId())) {
				return true;
			} else {
				return ResponseEntity.status(500).body("failed to update");
			}
		}
		return ResponseEntity.status(500).body("not a valid value");
	}

	@RequestMapping(value = "/Rewards/MVP/getAutoApproval/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getAutoApproval(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		return ProgramGroupEnrollmentsDAO.isAutoApprovalMVP(dealerCode);

	}

	@RequestMapping(value = "/Rewards/MVP/getAutoApprovalCount/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getAutoApprovalCount(@PathVariable(value = "dealerCode") String dealerCode,
			HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		return this.RewardsDistributionDAOImpl.getMVPRewards(dealerCode).size();

	}

}
