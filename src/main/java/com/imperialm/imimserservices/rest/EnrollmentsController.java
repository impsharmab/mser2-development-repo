package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dao.GroupSIDEnrollmentsDAO;
import com.imperialm.imimserservices.dao.LaborOpsDAO;
import com.imperialm.imimserservices.dto.GroupTeamsDTO;
import com.imperialm.imimserservices.dto.LaborOpsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.EnrollmentMaintenance;
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
	private com.imperialm.imimserservices.dao.GroupTeamsDAO GroupTeamsDAO;
	
	@Autowired
	private com.imperialm.imimserservices.services.EnrollmentsService EnrollmentsService;

	@RequestMapping(value ="/enrollments/getopcode/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getOpCode(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		return laborOpsDAO.getOpCodeByDealer(dealerCode, user.getUserId());

	}

	@RequestMapping(value ="/enrollments/ELenrolled/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object checkELEnrollment(@PathVariable(value="dealerCode") String dealerCode, HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		return this.GroupSIDEnrollmentsDAO.checkDealershipELEnrollmentStatus(dealerCode);

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

		UserDetailsImpl user = IMIServicesUtil.checkToken(request);

		GroupTeamsDTO.setCreatedBy(user.getUserId().trim());
		
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

	@RequestMapping(value ="/enrollments/getEligiblePositions/{program}", method = RequestMethod.GET)
	public @ResponseBody Object getEligiblePositions(@PathVariable(value="program")String program,HttpServletRequest request) {

		//IMIServicesUtil.checkToken(request);

		return new ArrayList<String>(Arrays.asList("09","13","14"));
	}


	@RequestMapping(value ="/enrollments/getDealerNonEnrolledParticipants/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getDealerNonEnrolled(@PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);

		return EnrollmentsService.getDealerNonEnrolled(dealerCode);
	}


	@RequestMapping(value ="/enrollments/DealerEnrollements/SET/", method = RequestMethod.POST)
	public @ResponseBody Object setDealerEnrollements(@RequestBody EnrollmentMaintenance EnrollmentMaintenance, HttpServletRequest request) {

		UserDetailsImpl user =  IMIServicesUtil.checkToken(request);
		
		return this.EnrollmentsService.setDealerEnrollements(EnrollmentMaintenance, user);
	}


	@RequestMapping(value ="/enrollments/getDealerEnrollements/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getDealerEnrollements(@PathVariable(value="dealerCode") String dealerCode ,HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		
		return this.EnrollmentsService.getDealerEnrollements(dealerCode);
	}



}
