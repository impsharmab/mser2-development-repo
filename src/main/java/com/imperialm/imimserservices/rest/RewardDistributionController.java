package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

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
import com.imperialm.imimserservices.model.DistributionInfo;
import com.imperialm.imimserservices.model.MVPDistribution;
import com.imperialm.imimserservices.model.MVPDistributionList;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.NameValueList;
import com.imperialm.imimserservices.model.PayoutRedistribution;
import com.imperialm.imimserservices.model.PayoutRedistributionList;
import com.imperialm.imimserservices.model.RedistributionHistory;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.services.UserServiceImpl;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@Controller
public class RewardDistributionController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private UserServiceImpl userDetailsService;

	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;

	@Autowired
	private com.imperialm.imimserservices.dao.RewardsDistributionDAOImpl RewardsDistributionDAOImpl;
	
	@Autowired
	private com.imperialm.imimserservices.util.EmailHandler EmailHandler;
	
	@Autowired
	private GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;


	@RequestMapping(value = "/Rewards/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getRewards(@PathVariable(value="dealerCode") String dealerCode,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		Map<String,Double> rewards = new HashMap<>();

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


	@RequestMapping(value = "/Rewards/Distribution/{program}/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object setRewards(@RequestBody final NameValueList list, @PathVariable(value="dealerCode") final String dealerCode, @PathVariable(value="program") String program, HttpServletRequest request) {

		final UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		Double programValue =  this.RewardsDistributionDAOImpl.getRewardsByDealer(dealerCode, program);

		int programId = 0;
		if(program.equalsIgnoreCase("ur")){
			programId = -15;
		}else if(program.equalsIgnoreCase("el")){
			programId = -1;
		}else if(program.equalsIgnoreCase("pc")){
			programId = -6;
		}else{
			return ResponseEntity.status(500).body("Unexpected Program");
		}

		Double total = 0.0;
		for(NameValue item: list.getList()){

			if(item.getValue().getClass().equals(Integer.class)){
				total += (Integer) item.getValue();
			}else{
				total += (Double) item.getValue();
			}
		}

		if(total == 0){
			return ResponseEntity.status(500).body("No Rewards");
		}

		if(programValue.doubleValue() != total.doubleValue()){
			return ResponseEntity.status(500).body("Must distribute the whole amount");
		}

		Integer AllocationIds = null;
		AllocationIds = this.RewardsDistributionDAOImpl.addToAllocationTable(dealerCode, user.getUserId(), programId);

		final List<String> sids = new ArrayList<>();
		
		if(AllocationIds != null){
			for(NameValue item: list.getList())
			{
				if(item.getValue().getClass().equals(Integer.class)){
					Double value = 0.0 + (Integer) item.getValue();
					this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), (Double) value, user.getUserId(), AllocationIds);
				}else{
					this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), (Double) item.getValue(), user.getUserId(), AllocationIds);
				}
				sids.add(item.getName());
			}

			new Thread(new Runnable() {

			    @Override
			    public void run() {
			    	List<DealerPersonnelDTO> names = DealerPersonnelDAO.getSIDInfoBySIDAndDealerCode(sids, dealerCode);
			    	List<NameValue> emailList = list.getList();
			    	for(NameValue item: emailList){
			    		for(DealerPersonnelDTO user: names){
			    			if(item.getName().trim().equalsIgnoreCase(user.getSID().trim())){
			    				item.setName(user.getFirstName() + " " + user.getLastName());
			    			}
			    		}
			    	}
			    	EmailHandler.sendMailConfirmation(user, "distributedReward", emailList);
			    }
			    
			}).start();
			
			if(programId == -1 || programId == -15){
				int incentiveId = this.RewardsDistributionDAOImpl.getIncentiveId(Math.abs(programId));
				return this.RewardsDistributionDAOImpl.updateEligibleROPartsWhereAllocationIdIsNull(dealerCode, AllocationIds, incentiveId);
			}else if(programId == -6){
				return this.RewardsDistributionDAOImpl.updatePCEligibleROPartsWhereAllocationIdIsNull(dealerCode, AllocationIds);
			}
			
		}

		return ResponseEntity.status(500).body("Error while updating");
	}


	@RequestMapping(value = "/Rewards/MVPApproval/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object approveMVP(@RequestBody MVPDistributionList list, @PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {

		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		IMIServicesUtil.checkToken(request);


		for(MVPDistribution item: list.getList()){
			if(item.getApproveDate() != null && (item.getSID() == null || item.getSID().trim().isEmpty())){
				return ResponseEntity.status(500).body("Can't approved without selecting a valid SID");	
			}
		}


		try{
			for(MVPDistribution item: list.getList()){
				if(item.getApproveDate() != null && item.getSID() != null && !item.getSID().trim().isEmpty()){
					this.RewardsDistributionDAOImpl.setMVPRewards(item);
				}
			}
		}catch(Exception e){
			return ResponseEntity.status(500).body("Error while updating");	
		}

		return true;
	}


	@RequestMapping(value = "/Rewards/MVPApproval/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getMVPRecords(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {

		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		IMIServicesUtil.checkToken(request);

		List<MVPDistribution> result = this.RewardsDistributionDAOImpl.getMVPRewards(dealerCode);

		List<DealerPersonnelDTO> dpUser = new ArrayList<>();

		//List<DealerPersonnelDTO> dpUserEligible = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("09","13","ES"));
		List<GroupSIDEnrollmentsDTO> enrollmentStatus = GroupSIDEnrollmentsDAO.getGroupSidEnrollmentsByDealerCode(dealerCode);
		//List<DealerPersonnelDTO> dpUserEnrolled = DealerPersonnelDAO.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, 5);


		//List<MVPDistribution> finalResult = new ArrayList<>();
		List<String> eligibale = Arrays.asList("09","13","ES");
		for(GroupSIDEnrollmentsDTO user: enrollmentStatus){
			for(MVPDistribution item: result){
				if(user.getSID().trim().equalsIgnoreCase(item.getOriginalSID().trim()) && user.getProgramGroupID() == 5 && user.getStatus().equalsIgnoreCase("E") && eligibale.contains(user.getPositionCode())){
					//finalResult.add(item);
					item.setOriginalSID("");
				}
			}
		}
		
			/*for(int i = result.size()-1; i >=0; i--){
				if(!finalResult.contains(result.get(i))){
					result.remove(i);
				}
			}*/

		for(DealerPersonnelDTO item: dpUser){
			for(int i =0; i< result.size(); i++){
				if(result.get(i).getOriginalSID().equalsIgnoreCase(item.getSID())){
					result.get(i).setOriginalName(new NameValue(item.getFirstName() + " " + item.getLastName(), item.getSID()));
				}
			}
		}
		return result;
	}


	@RequestMapping(value = "/General/ParticipantsByDealer/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getParticipantsByDealerCode(@PathVariable(value="dealerCode") String dealerCode, @PathVariable(value="program") String program, HttpServletRequest request) {


		List<DealerPersonnelDTO> dpUser = new ArrayList<>();
		//int programId = 0;
		if(program.equalsIgnoreCase("pc")){
			//programId = 6;
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("08","14","40","19"));
			//dpUser = DealerPersonnelDAO.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, programId);
		}else if(program.equalsIgnoreCase("el")){
			//programId = 1;
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("13", "23", "20", "2A"));
			//dpUser = DealerPersonnelDAO.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, programId);
		}else if(program.equalsIgnoreCase("ur")){
			//programId = 15;
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("12","07","34"));
			//dpUser = DealerPersonnelDAO.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, programId);
		}else if(program.equalsIgnoreCase("mvp")){
			List<DealerPersonnelDTO> dpUserEligible = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("09","13","ES"));
			List<DealerPersonnelDTO> dpUserEnrolled = DealerPersonnelDAO.getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(dealerCode, 5);

			for(DealerPersonnelDTO user: dpUserEnrolled){
				if(dpUserEligible.contains(user)){
					dpUser.add(user);
				}
			}
		}else if(program.equalsIgnoreCase("payout")){
			dpUser = DealerPersonnelDAO.getSIDByDealerCodeAndPositionCode(dealerCode, Arrays.asList("13", "23", "01", "2A","ES","ET"));
		}else{
			return ResponseEntity.status(500).body("Invalid program");	
		}

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


	@RequestMapping(value = "/Rewards/ReHistory/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getRedistributionHistory(@PathVariable(value="dealerCode") String dealerCode, @PathVariable(value="program") String program,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		int programId = 0;
		if(program.equalsIgnoreCase("pc")){
			programId = -6;
		}else if(program.equalsIgnoreCase("el")){
			programId = -1;
		}else if(program.equalsIgnoreCase("ur")){
			programId = -15;
		}else if(program.equalsIgnoreCase("mvp")){
			return this.RewardsDistributionDAOImpl.getMVPRewardsHistory(dealerCode);
		}else if (program.equalsIgnoreCase("payout")){
			return this.getPayoutRedistribtion(dealerCode, request);
		}else{
			return ResponseEntity.status(500).body("Invalid program"); 
		}

		return this.RewardsDistributionDAOImpl.getRedistribtionInfo(dealerCode, programId);

	}


	/*@RequestMapping(value = "/Rewards/History/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getDistribtionHistory(@PathVariable(value="dealerCode") String dealerCode, @PathVariable(value="program") String program,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		int programId = 0;

		if(program.equalsIgnoreCase("pc")){
			programId = -6;
		}else if(program.equalsIgnoreCase("el")){
			programId = -1;
		}else if(program.equalsIgnoreCase("ur")){
			programId = -15;
		}else if(program.equalsIgnoreCase("mvp")){
			return this.RewardsDistributionDAOImpl.getMVPRewardsHistory(dealerCode);
		}else{
			return ResponseEntity.status(500).body("Invalid program"); 
		}

		return this.RewardsDistributionDAOImpl.getDistribtionHistory(dealerCode, programId);

	}*/

	@RequestMapping(value = "/Rewards/Redistribute/{dealerCode}/{allocationId}", method = RequestMethod.POST)
	public @ResponseBody Object redistributeRewards(@RequestBody NameValueList list, @PathVariable(value="allocationId") Integer allocationId, @PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		Integer programId = this.RewardsDistributionDAOImpl.getProgramIdByAllocationId(allocationId);


		List<RedistributionHistory> allHistory = this.RewardsDistributionDAOImpl.getRedistribtionInfo(dealerCode, programId);

		List<RedistributionHistory> history = new ArrayList<>();
		Double historyTotal = 0.0;
		for(RedistributionHistory item: allHistory){
			if(item.getAllocationID() == allocationId){
				history.add(item);
				historyTotal += item.getAmount();
			}
		}


		Double total = 0.0;
		for(NameValue item: list.getList()){

			if(item.getValue().getClass().equals(Integer.class)){
				total += (Integer) item.getValue();
			}else{
				total += (Double) item.getValue();
			}
		}

		if(total == 0){
			return ResponseEntity.status(500).body("No Rewards");
		}

		if(historyTotal.doubleValue() != total.doubleValue()){
			return ResponseEntity.status(500).body("Must distribute the whole amount");
		}

		//Invalidate all records then add the new numbers
		this.RewardsDistributionDAOImpl.invalidateForRedistribution(allocationId, "REDIST");
		for(NameValue item: list.getList())
		{
			if(item.getValue().getClass().equals(Integer.class)){
				Double value = 0.0 + (Integer) item.getValue();
				this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), (Double) value, user.getUserId(), allocationId);
			}else{
				this.RewardsDistributionDAOImpl.addToAllocationDetailsTable(item.getName(), (Double) item.getValue(), user.getUserId(), allocationId);
			}
		}

		return true;
	}



	@RequestMapping(value = "/Rewards/RedistributeReturnToDealer/{dealerCode}/{allocationId}", method = RequestMethod.GET)
	public @ResponseBody Object redistributeReturnToDealer(@PathVariable(value="allocationId") Integer allocationId, @PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		Integer programId = this.RewardsDistributionDAOImpl.getProgramIdByAllocationId(allocationId);

		if(programId == null){
			return ResponseEntity.status(500).body("Not Found to redistribute");
		}

		//return the rewards for dealer to redistribute
		this.RewardsDistributionDAOImpl.invalidateForDealerRedistribution(allocationId, user.getUserId().trim() , programId);

		return true;
	}


	@RequestMapping(value = "/Rewards/PayoutRedistribution/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getPayoutRedistribtion(@PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		//return the rewards for dealer to redistribute
		List<PayoutRedistribution> result = new ArrayList<>();
		result.addAll(this.RewardsDistributionDAOImpl.getPayoutRedistibution(dealerCode));
		//result.addAll(this.RewardsDistributionDAOImpl.getPCPayoutRedistibution(dealerCode));
		return result;
	}

	@RequestMapping(value = "/Rewards/PayoutRedistribution/{dealerCode}", method = RequestMethod.POST)
	public @ResponseBody Object setPayoutRedistribtion(@RequestBody PayoutRedistributionList list, @PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		//return the rewards for dealer to redistribute

		for(PayoutRedistribution item: list.getList()){
			if(item.getStatusCode().equalsIgnoreCase("APRV") && (item.getSID() == null || item.getSID().trim().isEmpty())){
				return ResponseEntity.status(500).body("Can't approved without selecting a valid SID");	
			}
		}

		boolean result = true;
		try{
			for(PayoutRedistribution item: list.getList()){
				if(item.getStatusCode().equalsIgnoreCase("APRV") && item.getSID() != null && !item.getSID().trim().isEmpty()){
					if(!this.RewardsDistributionDAOImpl.setPayoutRewards(item)){
						result = false;
					}
				}
			}
		}catch(Exception e){
			return ResponseEntity.status(500).body("Error while updating");	
		}

		if(result){
			return result;
		}else{
			return ResponseEntity.status(500).body("Error while updating");
		}
	}
	
	
	
	@RequestMapping(value = "/Rewards/DistributionInfo/{program}/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getPayoutRedistribtionByProgram(@PathVariable(value="program") String program,@PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		
		int programid = 0;
		if(program.equalsIgnoreCase("el")){
			programid = 1;
		}else if(program.equalsIgnoreCase("ur")){
			programid = 15;
		}else if(program.equalsIgnoreCase("pc")){
			programid = 6;
		}else{
			return ResponseEntity.status(500).body("Not a valid program");
		}
		
		//UserDetailsImpl user = IMIServicesUtil.checkToken(request);
				List<DistributionInfo> result = new ArrayList<>();
				if(programid == 6){
					result.addAll(this.RewardsDistributionDAOImpl.getPCDistributionInfo(dealerCode));
				}else{
					result.addAll(this.RewardsDistributionDAOImpl.getDistributionInfo(programid, dealerCode));
				}

		return result;
	}




}
