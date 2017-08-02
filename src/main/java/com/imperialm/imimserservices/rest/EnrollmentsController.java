package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.DealerPersonnelDAO;
import com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO;
import com.imperialm.imimserservices.dao.LaborOpsDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.GroupTeamsDTO;
import com.imperialm.imimserservices.dto.LaborOpsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.EnrollmentMaintenance;
import com.imperialm.imimserservices.services.UserServiceImpl;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@RestController
public class EnrollmentsController {

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Autowired
	private LaborOpsDAO laborOpsDAO;
	
	@Autowired
	private GroupSIDEnrollmentsDAO GroupSIDEnrollmentsDAO;
	
	@Autowired
	private UserServiceImpl userDetailsService;
	
	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;
	
	
	@Autowired
	private com.imperialm.imimserservices.dao.GroupTeamsDAO GroupTeamsDAO;
	
	private final int MAS = 3;
	private final int MM = 2;
	private final int MSER = 4;
	private final int UCON = 9;
	
	
	
	
	
	private List<String> mserElligiblepc = Arrays.asList("01", "13", "23", "2A", "08", "09", "ES", "ET");
    private List<String> mmElligiblepc = Arrays.asList("01", "13", "23", "2A", "08", "09", "ES", "ET");
    private List<String> upFitsElligpc = Arrays.asList("01", "13", "23", "2A", "08", "09", "ES", "ET");
    private List<String> tiresElligpc = Arrays.asList("13", "23", "2A", "08", "09");
    private List<String> mvpElligpc = Arrays.asList("13", "es", "09");
    private List<String> wiAdvMVPElligpc = Arrays.asList("13", "09");
    private List<String> wiAdvTirElligepc = Arrays.asList("13", "08", "09");
    private List<String> uconSalesElligpc = Arrays.asList();
    private List<String> uconServiceElligpc = Arrays.asList();
    private List<String> pcPartElligpc = Arrays.asList("8", "14", "40", "19");
    private List<String> pcMElligpc = Arrays.asList("01", "02", "08", "09", "32", "33", "35", "40", "37");
    private List<String> elMElligpc = Arrays.asList("09", "17", "33", "35");
    private List<String> elPElligpc = Arrays.asList("01", "13", "23", "2A", "ES", "ET");
    private List<String> uvmEnrElligpc = Arrays.asList("08", "09", "07");
    private List<String> uvmPartElligpc = Arrays.asList("07", "34");
    private List<String> warrantyAdmElligpc = Arrays.asList("29");

	
	


	@RequestMapping(value ="/enrollments/getopcode/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getOpCode(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return laborOpsDAO.getOpCodeByDealer(dealerCode, user.getUserId());

	}
	
	@RequestMapping(value ="/enrollments/getopcode/inactive/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getInactiveOpCode(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return laborOpsDAO.getInactiveOpCodeByDealer(dealerCode, user.getUserId());

	}

	@RequestMapping(value ="/enrollments/addopcode", method = RequestMethod.POST)
	public @ResponseBody Object getOpCode(@RequestBody LaborOpsDTO LaborOpsDTO, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		LaborOpsDTO.setCreatedBy(user.getUserId().trim());
		LaborOpsDTO.setUpdatedBy(user.getUserId().trim());
		return laborOpsDAO.addOpCodeByDealerCode(LaborOpsDTO);

	}


	@RequestMapping(value ="/enrollments/deleteopcode/{id}", method = RequestMethod.GET)
	public @ResponseBody Object getOpCode(@PathVariable(value="id") int id, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return laborOpsDAO.deleteOpCodeById(id, user.getUserId());

	}
	
	@RequestMapping(value ="/enrollments/activateopcode/{id}", method = RequestMethod.GET)
	public @ResponseBody Object undeleteOpCode(@PathVariable(value="id") int id, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return laborOpsDAO.undeleteOpCodeById(id, user.getUserId());

	}
	
	
	@RequestMapping(value ="/enrollments/groupteams/getteams/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getTeams(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {
		
		IMIServicesUtil.checkToken(request);

		return GroupTeamsDAO.getGroupTeamsByDealerCode(dealerCode);

	}
	
	@RequestMapping(value ="/enrollments/groupteams/addteam", method = RequestMethod.POST)
	public @ResponseBody Object addTeam(@RequestBody GroupTeamsDTO GroupTeamsDTO, HttpServletRequest request) {
		
		IMIServicesUtil.checkToken(request);

		return GroupTeamsDAO.addGroupTeamsByDealerCode(GroupTeamsDTO);

	}
	
	@RequestMapping(value ="/enrollments/groupteams/deleteteam/{id}", method = RequestMethod.DELETE)
	public @ResponseBody Object deleteTeam(@PathVariable(value="id") int id, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return GroupTeamsDAO.deleteGroupTeamsById(id, user.getUserId());
	}
	
	
	@RequestMapping(value ="/enrollments/groupteams/updateteam", method = RequestMethod.POST)
	public @ResponseBody Object deleteTeam(@RequestBody GroupTeamsDTO GroupTeamsDTO, HttpServletRequest request) {
		
		UserDetailsImpl user = IMIServicesUtil.checkToken(request);
		GroupTeamsDTO.setUpdatedBy(user.getUserId());

		return GroupTeamsDAO.updateGroupTeamsById(GroupTeamsDTO);
	}
	
	@RequestMapping(value ="/enrollments/getEligiblePositions/program1", method = RequestMethod.GET)
	public @ResponseBody Object getEligiblePositions(HttpServletRequest request) {
		
		IMIServicesUtil.checkToken(request);

		return new ArrayList<String>(Arrays.asList("09","13","14"));
	}
	
	
	@RequestMapping(value ="/enrollments/getDealerEnrollements/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getDealerEnrollements(@PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {
		
		IMIServicesUtil.checkToken(request);
		 
		
		//distinct sids
		List<String> sids = GroupSIDEnrollmentsDAO.getEnrolledSIDsByDealerCode(dealerCode);
		
		//all sids enrollements for that dealership
		List<GroupSIDEnrollmentsDTO> sidsWithData = GroupSIDEnrollmentsDAO.getGroupSidEnrollmentsByDealerCode(dealerCode);
		
		//all sids info for that dealership
		List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCode(dealerCode);
		
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
			String mypersonnelDM = "";
			List<String> overridenUserPc = new ArrayList<>();
			String elPc = "";
			String pcPc = "";
			
			for(DealerPersonnelDTO item: dpUser){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					mypersonnelDM = item.getDMS_ID();
					mypersonnelPc.add(item.getPositionCode().trim());
				}
			}
			
			for(GroupSIDEnrollmentsDTO item:sidsWithData){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setDMSID(item.getDMSID().trim());
					overridenUserPc.add(item.getPositionCode().trim());
					if(item.getProgramGroupID() == 1){
						elPc = item.getPositionCode().trim();
					}else if(item.getProgramGroupID() == 2){
						if(this.mmElligiblepc.contains(item.getPositionCode().trim()))
							mmPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 3){
						if(this.upFitsElligpc.contains(item.getPositionCode().trim()))
							masPc.add(item.getPositionCode());
					}else if(item.getProgramGroupID() == 4){
						if(this.mserElligiblepc.contains(item.getPositionCode().trim()))
							mserPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 5){
						if(this.mvpElligpc.contains(item.getPositionCode().trim()))
							mvpPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 6){
						pcPc = item.getPositionCode().trim();
					}else if(item.getProgramGroupID() == 7){
						if(this.wiAdvMVPElligpc.contains(item.getPositionCode().trim()))
							wiMvpPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 9){
						uConPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 11){
						if(this.wiAdvTirElligepc.contains(item.getPositionCode().trim()))
							wiTiresPc.add(item.getPositionCode().trim());
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
			em.setWiMvp(mvpPc);
			em.setWiTires(wiTiresPc);
			em.setUCon(uConPc);
			em.setEl(elPc);
			em.setPc(pcPc);
			
			
			/*try{
				UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(sid.trim());
				em.setEmail(user.getEmail());
			}catch(Exception e){
				//
			}*/
			
			for(DealerPersonnelDTO user: dpUser){
				if(user.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setName(user.getFirstName().trim() + " " + user.getLastName().trim());
				}
			}
			
			result.add(em);
			
		}		
		
		return result;
	}
	
	
	@RequestMapping(value ="/enrollments/DealerEnrollements/SET/", method = RequestMethod.POST)
	public @ResponseBody Object setDealerEnrollements(@RequestBody EnrollmentMaintenance EnrollmentMaintenance, HttpServletRequest request) {
		
		IMIServicesUtil.checkToken(request);
		 
		
		//distinct sids
		List<String> sids = GroupSIDEnrollmentsDAO.getEnrolledSIDsByDealerCode(EnrollmentMaintenance.getDealerCode());
		
		//all sids enrollements for that dealership
		List<GroupSIDEnrollmentsDTO> sidsWithData = GroupSIDEnrollmentsDAO.getGroupSidEnrollmentsByDealerCode(EnrollmentMaintenance.getDealerCode());
		
		//all sids info for that dealership
		List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCode(EnrollmentMaintenance.getDealerCode());
		
		List<EnrollmentMaintenance> result = new ArrayList<EnrollmentMaintenance>(); 
		
		for(String sid: sids){
			EnrollmentMaintenance em = new EnrollmentMaintenance(EnrollmentMaintenance.getDealerCode(), sid.trim());
			
			List<String> mserPc = new ArrayList<>();
			List<String> mmPc = new ArrayList<>();
			List<String> masPc = new ArrayList<>();
			List<String> mvpPc = new ArrayList<>();
			List<String> wiMvpPc = new ArrayList<>();
			List<String> wiTiresPc = new ArrayList<>();
			List<String> uConPc = new ArrayList<>();
			List<String> mypersonnelPc = new ArrayList<>();
			String mypersonnelDM = "";
			List<String> overridenUserPc = new ArrayList<>();
			String elPc = "";
			String pcPc = "";
			
			for(DealerPersonnelDTO item: dpUser){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					mypersonnelDM = item.getDMS_ID();
					mypersonnelPc.add(item.getPositionCode().trim());
				}
			}
			
			for(GroupSIDEnrollmentsDTO item:sidsWithData){
				if(item.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setDMSID(item.getDMSID().trim());
					overridenUserPc.add(item.getPositionCode().trim());
					if(item.getProgramGroupID() == 1){
						elPc = item.getPositionCode().trim();
					}else if(item.getProgramGroupID() == 2){
						mmPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 3){
						masPc.add(item.getPositionCode());
					}else if(item.getProgramGroupID() == 4){
						mserPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 5){
						mvpPc.add(item.getPositionCode());
					}else if(item.getProgramGroupID() == 6){
						pcPc = item.getPositionCode().trim();
					}else if(item.getProgramGroupID() == 7){
						wiMvpPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 9){
						uConPc.add(item.getPositionCode().trim());
					}else if(item.getProgramGroupID() == 11){
						wiTiresPc.add(item.getPositionCode().trim());
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
			em.setWiMvp(mvpPc);
			em.setWiTires(wiTiresPc);
			em.setUCon(uConPc);
			em.setEl(elPc);
			em.setPc(pcPc);
			
			for(DealerPersonnelDTO user: dpUser){
				if(user.getSID().trim().equalsIgnoreCase(sid.trim())){
					em.setName(user.getFirstName().trim() + " " + user.getLastName().trim());
				}
			}
			
			result.add(em);
			
		}	
		
		Boolean mserCheck = true;
		Boolean mmCheck = true;
		Boolean masCheck = true;
		Boolean mvpCheck = true;
		Boolean wiMvpCheck = true;
		Boolean wiTiresCheck = true;
		Boolean uConCheck = true;
		Boolean elCheck = true;
		Boolean pcCheck = true;
		
		EnrollmentMaintenance currentData = null;
		for(EnrollmentMaintenance item: result){
			if(!EnrollmentMaintenance.getSID().trim().equalsIgnoreCase(item.getSID().trim())){
				if((item.getMser().contains("09") || item.getMser().contains("08")) && (EnrollmentMaintenance.getMser().contains("09") || EnrollmentMaintenance.getMser().contains("08"))){
					mserCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for MSER");
				}
				
				if((item.getMas().contains("09") || item.getMas().contains("08")) && (EnrollmentMaintenance.getMas().contains("09") || EnrollmentMaintenance.getMas().contains("08"))){
					masCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for Accessories");
				}
				
				if((item.getMm().contains("09") || item.getMm().contains("08")) && (EnrollmentMaintenance.getMm().contains("09") || EnrollmentMaintenance.getMm().contains("08"))){
					mmCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for Magneti Marelli");
				}
				
				if((item.getWiTires().contains("09") || item.getWiTires().contains("08")) && (EnrollmentMaintenance.getWiTires().contains("09") || EnrollmentMaintenance.getWiTires().contains("08"))){
					wiTiresCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager or Parts Manager for wiAdvisor Tires");
				}
				
			/*	if(!item.getEl().isEmpty()){
					elCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Parts Manager for Express Lane");
				}
				
				if(!item.getPc().isEmpty()){
					pcCheck = false;
					return ResponseEntity.status(500).body("Can only have 1 Parts Manager for Parts Counter");
				}
				*/
				if(item.getWiMvp().contains("09") && EnrollmentMaintenance.getWiMvp().contains("09")){
					wiMvpCheck = true;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for wiAdvisor MVP");
				}
				
				if(item.getUCon().contains("09") && EnrollmentMaintenance.getUCon().contains("09")){
					uConCheck = true;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for UConnect");
				}
				
				if(item.getMvp().contains("09") && EnrollmentMaintenance.getMvp().contains("09")){
					mvpCheck = true;
					return ResponseEntity.status(500).body("Can only have 1 Service Manager for MVP");
				}
				
			}else{
				currentData = item;
			}
		}
		
		if(uConCheck && mserCheck && wiMvpCheck && mvpCheck && pcCheck && elCheck && wiTiresCheck && mmCheck && masCheck && currentData != null){
			
			for(String pc: EnrollmentMaintenance.getOverriddenpositionCodes()){
				if(!currentData.getOverriddenpositionCodes().contains(pc)){
					if(!GroupSIDEnrollmentsDAO.addOverrideCode(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), pc, EnrollmentMaintenance.getDMSID())){
						return ResponseEntity.status(500).body("Failed to save ovveride position codes");
					}
				}
			}
			
				/*if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), Arrays.asList(EnrollmentMaintenance.getEl()) , 1)){
					return ResponseEntity.status(500).body("Error on Saving ExpressLane Data...");
				}*/
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMm(), 2, this.mmElligiblepc)){
					return ResponseEntity.status(500).body("Error on Saving Magnati Marelli Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMas(), 3, this.upFitsElligpc)){
					return ResponseEntity.status(500).body("Error on Saving MAS Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMser(), 4, this.mserElligiblepc)){
					return ResponseEntity.status(500).body("Error on Saving MSER Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getMvp(), 5, this.mvpElligpc)){
					return ResponseEntity.status(500).body("Error on Saving MVP Data...");
				}
				
			/*	if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), Arrays.asList(EnrollmentMaintenance.getPc()), 6)){
					return ResponseEntity.status(500).body("Error on Saving Parts Counter Data...");
				}*/
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getWiMvp(), 7, this.wiAdvMVPElligpc)){
					return ResponseEntity.status(500).body("Error on Saving WiAdvisor MVP Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getUCon(), 9, this.uconSalesElligpc)){
					return ResponseEntity.status(500).body("Error on Saving UConnect Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getUCon(), 9, this.uconServiceElligpc)){
					return ResponseEntity.status(500).body("Error on Saving UConnect Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateSIDEnrollment(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getWiTires(), 11, this.wiAdvTirElligepc)){
					return ResponseEntity.status(500).body("Error on Saving WiAdvisor Tires Data...");
				}
				
				if(!GroupSIDEnrollmentsDAO.updateDMSID(EnrollmentMaintenance.getDealerCode().trim(), EnrollmentMaintenance.getSID().trim(), EnrollmentMaintenance.getDMSID())){
					return ResponseEntity.status(500).body("Error on Saving DMSID Data...");
				}
				
				
		}else{
			return ResponseEntity.status(500).body("Failed to save participant update...");
		}
		
		return true;
	}
	
	
	


}
