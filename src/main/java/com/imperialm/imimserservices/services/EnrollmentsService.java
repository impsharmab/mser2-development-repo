package com.imperialm.imimserservices.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dao.DealerPersonnelDAO;
import com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO;
import com.imperialm.imimserservices.dao.LaborOpsDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTOWithEmail;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.EnrollmentMaintenance;
import com.imperialm.imimserservices.util.IMIServicesConstants;

@Service
public class EnrollmentsService {
	@Autowired
	private GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;

	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;
	
	@Autowired
	private com.imperialm.imimserservices.dao.UserDAOImpl UserDAOImpl;

	private final int MAS = 3;
	private final int MM = 2;
	private final int MSER = 4;
	private final int UCON = 9;
	
	
	public List<EnrollmentMaintenance> getDealerNonEnrolled(String dealerCode) {

		//distinct sids
		List<String> allsids = GroupSIDEnrollmentsDAO.getAllSIDsByDealerCode(dealerCode);
		List<String> enrolledsids = GroupSIDEnrollmentsDAO.getEnrolledSIDsByDealerCode(dealerCode);
		List<String> sids = new ArrayList<>();

		for(String item: allsids){
			if(!enrolledsids.contains(item))
				sids.add(item);
		}

		//all sids enrollements for that dealership
		List<GroupSIDEnrollmentsDTO> sidsWithData = GroupSIDEnrollmentsDAO.getGroupSidNonEnrollmentsByDealerCode(dealerCode);

		//all sids info for that dealership
		List<DealerPersonnelDTOWithEmail> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCodeWithEmail(dealerCode);

		List<EnrollmentMaintenance> result = new ArrayList<EnrollmentMaintenance>(); 

		for(String sid: sids){
			EnrollmentMaintenance em = new EnrollmentMaintenance(dealerCode, sid.trim());

			List<String> mypersonnelPc = new ArrayList<>();
			String mypersonnelDM = "";
			List<String> overridenUserPc = new ArrayList<>();

			for(DealerPersonnelDTOWithEmail item: dpUser){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					mypersonnelDM = item.getDMS_ID();
					mypersonnelPc.add(item.getPositionCode().trim());
				}
			}

			for(GroupSIDEnrollmentsDTO item:sidsWithData){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setDMSID(item.getDMSID().trim());
					//adding original positioncode
					if(!item.getPositionCode().trim().equalsIgnoreCase("ZZ")){
						overridenUserPc.add(item.getPositionCode().trim());
					}else{
						overridenUserPc.add(item.getOriginalPostionCode());
					}
				}
			}


			Set<String> hs = new HashSet<>();
			hs.addAll(mypersonnelPc);
			mypersonnelPc.clear();
			mypersonnelPc.addAll(hs);
			hs.clear();

			hs.addAll(overridenUserPc);
			overridenUserPc.clear();
			overridenUserPc.addAll(hs);
			hs.clear();

			for(String pc: mypersonnelPc){
				overridenUserPc.remove(pc);
			}

			em.setPositionCodes(mypersonnelPc);
			em.setOverriddenpositionCodes(overridenUserPc);

			em.setMyPersonalDMSID(mypersonnelDM);

			
			for(DealerPersonnelDTOWithEmail user: dpUser){
				if(user.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setName(user.getFirstName().trim() + " " + user.getLastName().trim());
					em.setEmail(user.getEmail());
				}
			}

			result.add(em);

		}		

		return result;
	}
	
	public @ResponseBody Object setDealerEnrollements(EnrollmentMaintenance EnrollmentMaintenance, UserDetailsImpl user) {

		List<EnrollmentMaintenance> result = (ArrayList<EnrollmentMaintenance>)this.getDealerEnrollements(EnrollmentMaintenance.getDealerCode());
		Boolean mserCheck = true;
		Boolean mmCheck = true;
		Boolean masCheck = true;
		Boolean mvpCheck = true;
		Boolean wiMvpCheck = true;
		Boolean wiTiresCheck = true;
		Boolean uConCheck = true;
		Boolean elCheck = true;
		Boolean pcCheck = true;
		Boolean tiresCheck = true;
		Boolean usedReconCheck = true;

		EnrollmentMaintenance currentData = null;
		for(EnrollmentMaintenance item: result){
			if(!EnrollmentMaintenance.getSID().trim().equalsIgnoreCase(item.getSID().trim())){

				if((EnrollmentMaintenance.getMser().contains("09") && item.getMser().contains("09"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for MSER");
				}

				if((EnrollmentMaintenance.getMser().contains("08") && item.getMser().contains("08"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Parts Manager for MSER");
				}

				if((EnrollmentMaintenance.getMas().contains("09") && item.getMas().contains("09"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for Accessories");
				}

				if((EnrollmentMaintenance.getMas().contains("08") && item.getMas().contains("08"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for Accessories");
				}

				if((EnrollmentMaintenance.getMm().contains("09") && item.getMm().contains("09"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for Magneti Marelli");
				}

				if((EnrollmentMaintenance.getMm().contains("08") && item.getMm().contains("08"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for Magneti Marelli");
				}

				if((EnrollmentMaintenance.getWiTires().contains("09") && item.getWiTires().contains("09"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for wiAdvisor Tires");
				}

				if((EnrollmentMaintenance.getWiTires().contains("08") && item.getWiTires().contains("08"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for wiAdvisor Tires");
				}

				if((EnrollmentMaintenance.getTires().contains("09") && item.getTires().contains("09"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for MSER Tires");
				}

				if((EnrollmentMaintenance.getTires().contains("08") && item.getTires().contains("08"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for MSER Tires");
				}

				if(item.getWiMvp().contains("09") && EnrollmentMaintenance.getWiMvp().contains("09")){
					wiMvpCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for wiAdvisor MVP");
				}

				/*if(item.getUCon().contains("09") && EnrollmentMaintenance.getUCon().contains("09")){
					uConCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for UConnect");
				}*/

				if(item.getMvp().contains("09") && EnrollmentMaintenance.getMvp().contains("09")){
					mvpCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for MVP");
				}

				if(!EnrollmentMaintenance.getEl().isEmpty()){
					if(!item.getEl().isEmpty() || !IMIServicesConstants.elMElligpc.contains(EnrollmentMaintenance.getEl())){
						elCheck = false;
						return ResponseEntity.status(500).body("Can only have 1 Service Manager for Express Lane");
					}
				}

				if(!EnrollmentMaintenance.getPc().isEmpty()){
					if(!item.getPc().isEmpty() || !IMIServicesConstants.pcMElligpc.contains(EnrollmentMaintenance.getPc())){
						pcCheck = false;
						return ResponseEntity.status(500).body("Can only have 1 Parts Manager for Parts Counter");
					}
				}

				if(!EnrollmentMaintenance.getUsedRecon().isEmpty()){
					if(!item.getUsedRecon().isEmpty() || !IMIServicesConstants.uvmEnrElligpc.contains(EnrollmentMaintenance.getUsedRecon())){
						usedReconCheck = false;
						return ResponseEntity.status(500).body("Can only have 1 Used Vehicle Manager for Used Recon");
					}
				}

			}else{
				currentData = item;
			}
		}

		if(currentData ==null){
			List<EnrollmentMaintenance> notEnrolled = this.getDealerNonEnrolled(EnrollmentMaintenance.getDealerCode());
			for(EnrollmentMaintenance item: notEnrolled){
				if(EnrollmentMaintenance.getSID().trim().equalsIgnoreCase(item.getSID().trim())){
					currentData = item;
				}
			}
		}

		if(uConCheck && mserCheck && wiMvpCheck && mvpCheck && pcCheck && elCheck && wiTiresCheck && mmCheck && masCheck && tiresCheck && usedReconCheck && currentData != null){

			List<String> autoEnroll = new ArrayList<>();
			
			Map<String, List<String>> overrideEligableCodes = new HashMap<>();
			
			//overrideEligableCodes.put("1", IMIServicesConstants.elMElligpc);
			overrideEligableCodes.put("2", IMIServicesConstants.mmElligiblepc);
			overrideEligableCodes.put("3", IMIServicesConstants.upFitsElligpc);
			overrideEligableCodes.put("4", IMIServicesConstants.mserElligiblepc);
			overrideEligableCodes.put("5", IMIServicesConstants.mvpElligpc);
			//overrideEligableCodes.put("6", IMIServicesConstants.pcMElligpc);
			overrideEligableCodes.put("7", IMIServicesConstants.wiAdvMVPElligpc);
			overrideEligableCodes.put("10", IMIServicesConstants.tiresElligpc);
			overrideEligableCodes.put("11", IMIServicesConstants.wiAdvTirElligepc);
			overrideEligableCodes.put("14", IMIServicesConstants.uvmPartElligpc);
			//overrideEligableCodes.put("15", IMIServicesConstants.uvmEnrElligpc);
			
			
			for(String pc: EnrollmentMaintenance.getOverriddenpositionCodes()){
				//TODO: Check ZZ might not be needed if we don't send it
				if(!currentData.getOverriddenpositionCodes().contains(pc) && !pc.equalsIgnoreCase("ZZ")){
					autoEnroll.add(pc.trim());
					GroupSIDEnrollmentsDAO.addOverride(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), pc.trim(), overrideEligableCodes, user.getUserId());
					/*if(!GroupSIDEnrollmentsDAO.addOverrideCode(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), pc, EnrollmentMaintenance.getDMSID(), user)){
						return ResponseEntity.status(500).body("Failed to save override position codes");
					}*/
				}
			}
			
			//if(EnrollmentMaintenance.getOverriddenpositionCodes().size() == 0){
			for(String pc: currentData.getOverriddenpositionCodes()){
				if(!EnrollmentMaintenance.getOverriddenpositionCodes().contains(pc) && !pc.equalsIgnoreCase("ZZ")){
					if(!GroupSIDEnrollmentsDAO.removeOverrideCode(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), pc, EnrollmentMaintenance.getDMSID(), user)){
						return ResponseEntity.status(500).body("Failed to remove override position codes");
					}
				}
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollmentSpecialwithMapping(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getEl() , 1, IMIServicesConstants.elMElligpc, EnrollmentMaintenance, user)){
				return ResponseEntity.status(500).body("Error on Saving ExpressLane Data...");
			}else if (EnrollmentMaintenance.getEl().trim().length() > 0){
				if(GroupSIDEnrollmentsDAO.isExpressLaneRecordExists(EnrollmentMaintenance.getDealerCode().trim())){
					GroupSIDEnrollmentsDAO.enrollInExpressLaneProgram(EnrollmentMaintenance.getDealerCode().trim(), user.getUserId());
				} else {
					GroupSIDEnrollmentsDAO.insertEnrollInExpressLaneProgram(EnrollmentMaintenance.getDealerCode().trim(), user.getUserId());
				}
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMm(), 2, IMIServicesConstants.mmElligiblepc, user, currentData.getMm())){
				return ResponseEntity.status(500).body("Error on Saving Magnati Marelli Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMas(), 3, IMIServicesConstants.upFitsElligpc, user, currentData.getMas())){
				return ResponseEntity.status(500).body("Error on Saving MAS Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMser(), 4, IMIServicesConstants.mserElligiblepc, user, currentData.getMser())){
				return ResponseEntity.status(500).body("Error on Saving MSER Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMvp(), 5, IMIServicesConstants.mvpElligpc, user, currentData.getMvp())){
				return ResponseEntity.status(500).body("Error on Saving MVP Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollmentSpecialwithMapping(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getPc(), 6, IMIServicesConstants.pcMElligpc, EnrollmentMaintenance, user)){
				return ResponseEntity.status(500).body("Error on Saving Parts Counter Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getWiMvp(), 7, IMIServicesConstants.wiAdvMVPElligpc, user, currentData.getWiMvp())){
				return ResponseEntity.status(500).body("Error on Saving WiAdvisor MVP Data...");
			}

			/*if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getUCon(), 9, this.uconSalesElligpc)){
				return ResponseEntity.status(500).body("Error on Saving UConnect Data...");
			}*/

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getTires(), 10, IMIServicesConstants.tiresElligpc, user, currentData.getTires())){
				return ResponseEntity.status(500).body("Error on Saving MSER Tires Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getWiTires(), 11, IMIServicesConstants.wiAdvTirElligepc, user, currentData.getWiTires())){
				return ResponseEntity.status(500).body("Error on Saving WiAdvisor Tires Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getUsedReconP(), 14, IMIServicesConstants.uvmPartElligpc, user, currentData.getUsedReconP())){
				return ResponseEntity.status(500).body("Error on Saving UsedRecon Participant Data...");
			}

			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollmentSpecialwithMapping(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getUsedRecon() , 15, IMIServicesConstants.uvmEnrElligpc, EnrollmentMaintenance, user)){
				return ResponseEntity.status(500).body("Error on Saving UsedRecon Data...");
			}
			
			/*
			if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getUConSer(), 16, this.uconServiceElligpc)){
					return ResponseEntity.status(500).body("Error on Saving UConnect Service Data...");
			}*/

			if(!GroupSIDEnrollmentsDAO.updateDMSID(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getDMSID(), user)){
				return ResponseEntity.status(500).body("Error on Saving DMSID Data...");
			}
			
			if(!currentData.getEmail().trim().equalsIgnoreCase(EnrollmentMaintenance.getEmail().trim())){
				//not checking if successful because the user might not have an account, don't want to send an error because of that
				this.UserDAOImpl.setEmail(EnrollmentMaintenance.getEmail().trim(), EnrollmentMaintenance.getSID().trim(), user.getUserId());
			}
			//this is here so it won't unenroll after auto enrolling
			Set<String> hs = new HashSet<>();
			hs.addAll(autoEnroll);
			autoEnroll.clear();
			autoEnroll.addAll(hs);


			//AUTOENROLL KEEP AT THE END
			
			Map<String, List<String>> eligableCodes = new HashMap<>();

			eligableCodes.put("2", Arrays.asList("01","13","23","2A","ES","ET"));
			eligableCodes.put("3", Arrays.asList("01","13","23","2A","ES","ET"));
			eligableCodes.put("4", Arrays.asList("01","13","23","2A","ES","ET"));
			eligableCodes.put("5", Arrays.asList("01","13","ES"));
			eligableCodes.put("7", Arrays.asList("13"));
			eligableCodes.put("10", Arrays.asList("13","01","23","2A"));
			eligableCodes.put("11", Arrays.asList("13"));
			
			GroupSIDEnrollmentsDAO.enrollUserDefault(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), autoEnroll, eligableCodes, user.getUserId());

		}else{
			return ResponseEntity.status(500).body("Failed to save participant update...");
		}

		return true;
	}
	
	public List<EnrollmentMaintenance> getDealerEnrollements(String dealerCode) {
		//distinct sids
		//List<String> sids = GroupSIDEnrollmentsDAO.getEnrolledSIDsByDealerCode(dealerCode);

		//List<String> sids = GroupSIDEnrollmentsDAO.getAllSIDsByDealerCode(dealerCode);
		List<String> sids = DealerPersonnelDAO.getParticipantsByDealerList(Arrays.asList(dealerCode));

		//all sids enrollements for that dealership
		//List<GroupSIDEnrollmentsDTO> sidsWithData = GroupSIDEnrollmentsDAO.getGroupSidEnrollmentsByDealerCode(dealerCode);
		List<GroupSIDEnrollmentsDTO> sidsWithData = GroupSIDEnrollmentsDAO.getAllGroupSidEnrollmentsByDealerCode(dealerCode);

		//all sids info for that dealership
		List<DealerPersonnelDTOWithEmail> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCodeWithEmail(dealerCode);

		List<EnrollmentMaintenance> result = new ArrayList<EnrollmentMaintenance>(); 

		for(String sid: sids){
			EnrollmentMaintenance em = new EnrollmentMaintenance(dealerCode, sid.trim());

			List<String> mserPc = new ArrayList<>();
			List<String> mmPc = new ArrayList<>();
			List<String> masPc = new ArrayList<>();
			List<String> mvpPc = new ArrayList<>();
			List<String> wiMvpPc = new ArrayList<>();
			List<String> wiTiresPc = new ArrayList<>();
			List<String> uConPc = new ArrayList<>();
			List<String> mypersonnelPc = new ArrayList<>();
			List<String> tiresPc = new ArrayList<>();
			List<String> uvmPPc = new ArrayList<>();
			List<String> fiatPc = new ArrayList<>();
			String mypersonnelDM = "";
			List<String> overridenUserPc = new ArrayList<>();
			String elPc = "";
			String pcPc = "";
			String uvmMPc = "";

			for(DealerPersonnelDTOWithEmail item: dpUser){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					mypersonnelDM = item.getDMS_ID();
					mypersonnelPc.add(item.getPositionCode().trim());
				}
			}

			for(GroupSIDEnrollmentsDTO item:sidsWithData){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setDMSID(item.getDMSID());
					if(item.getPositionCode().trim().equalsIgnoreCase("ZZ")){
						//TODO: this is wrong did this becuase the data is corrupt and we had to do this for demo, remove this line later,
						//we should always have an original PositionCode where the Code is ZZ
						if(item.getOriginalPostionCode() != null && !item.getOriginalPostionCode().trim().isEmpty()){
							overridenUserPc.add(item.getOriginalPostionCode().trim());
							item.setPositionCode(item.getOriginalPostionCode());
						}
					}else{
						overridenUserPc.add(item.getPositionCode().trim());
					}
					if(item.getStatus().equalsIgnoreCase("E")){
						if(item.getProgramGroupID() == 1){
							if(IMIServicesConstants.elMElligpc.contains(item.getPositionCode().trim()))
								elPc = item.getPositionCode().trim();
						}else if(item.getProgramGroupID() == 2){
							if(IMIServicesConstants.mmElligiblepc.contains(item.getPositionCode().trim()))
								mmPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 3){
							if(IMIServicesConstants.upFitsElligpc.contains(item.getPositionCode().trim()))
								masPc.add(item.getPositionCode());
						}else if(item.getProgramGroupID() == 4){
							if(IMIServicesConstants.mserElligiblepc.contains(item.getPositionCode().trim()))
								mserPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 5){
							if(IMIServicesConstants.mvpElligpc.contains(item.getPositionCode().trim()))
								mvpPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 6){
							if(IMIServicesConstants.pcMElligpc.contains(item.getPositionCode().trim()))
								pcPc = item.getPositionCode().trim();
						}else if(item.getProgramGroupID() == 7){
							if(IMIServicesConstants.wiAdvMVPElligpc.contains(item.getPositionCode().trim()))
								wiMvpPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 8){//FIAT
							if(IMIServicesConstants.tiresElligpc.contains(item.getPositionCode().trim()))
								fiatPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 9){
							uConPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 10){
							if(IMIServicesConstants.tiresElligpc.contains(item.getPositionCode().trim()))
								tiresPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 11){
							if(IMIServicesConstants.wiAdvTirElligepc.contains(item.getPositionCode().trim()))
								wiTiresPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 14){
							if(IMIServicesConstants.uvmPartElligpc.contains(item.getPositionCode().trim()))
								uvmPPc.add(item.getPositionCode().trim());
						}else if(item.getProgramGroupID() == 15){
							if(IMIServicesConstants.uvmEnrElligpc.contains(item.getPositionCode().trim()))
								uvmMPc = item.getPositionCode().trim();

						}
					}
				}
			}


			Set<String> hs = new HashSet<>();
			hs.addAll(mypersonnelPc);
			mypersonnelPc.clear();
			mypersonnelPc.addAll(hs);
			hs.clear();

			hs.addAll(overridenUserPc);
			overridenUserPc.clear();
			overridenUserPc.addAll(hs);
			hs.clear();

			for(String pc: mypersonnelPc){
				overridenUserPc.remove(pc);
			}

			em.setPositionCodes(mypersonnelPc);
			em.setOverriddenpositionCodes(overridenUserPc);

			em.setMyPersonalDMSID(mypersonnelDM);

			em.setMser(mserPc);
			em.setMm(mmPc);
			em.setMas(masPc);
			em.setMvp(mvpPc);
			em.setWiMvp(wiMvpPc);
			em.setWiTires(wiTiresPc);
			em.setUCon(uConPc);
			em.setEl(elPc);
			em.setPc(pcPc);
			em.setUsedRecon(uvmMPc);
			em.setUsedReconP(uvmPPc);
			em.setTires(tiresPc);

			for(DealerPersonnelDTOWithEmail user: dpUser){
				if(user.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setName(user.getFirstName().trim() + " " + user.getLastName().trim());
					em.setEmail(user.getEmail());
				}
			}

			result.add(em);

		}		

		return result;
	}
	
	
}
