package com.imperialm.imimserservices.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.imperialm.imimserservices.dto.AdminPayoutPostData;
import com.imperialm.imimserservices.dto.PayoutCategoriesByPrograms;
import com.imperialm.imimserservices.dto.PayoutEligiblePositionsView;
import com.imperialm.imimserservices.dto.PayoutProgramGroupsView;
import com.imperialm.imimserservices.entities.Quantities;
import com.imperialm.imimserservices.entities.RewardTypes;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.services.AdminPayoutService;

import lombok.Getter;
import lombok.Setter;

@RestController
public class AdminPayoutController {

	Log logger = LogFactory.getLog(AdminPayoutController.class);

	@Autowired
	AdminPayoutService adminPayoutService;

	@GetMapping("/services/adminpayout/getPrograms/{month}")
	public List<PayoutProgramGroupsView> getPrograms(@PathVariable String month) {
		return adminPayoutService.getProgramGroupsBySelectedMonth(month);
	}

	@GetMapping("/services/adminpayout/deletePayout/{month}")
	public List<PayoutProgramGroupsView> deletePayout(@PathVariable String month) {
		return adminPayoutService.getProgramGroupsBySelectedMonth(month);
	}
	
	@PostMapping("services/adminpayout/getCategoryByIncentive/{date}")
	public List<PayoutCategoriesByPrograms> getCategories(@RequestBody List<String> incentives,
			@PathVariable String date) {
		return adminPayoutService.getCategoryByIncentive(incentives, date);
	}

	@PostMapping("services/adminpayout/getRewardsByCategory/{date}")
	public Object getRewards(@RequestBody List<Long> incentivesAndSubCodes,
			@PathVariable String date) {
		if(incentivesAndSubCodes != null){
			if(incentivesAndSubCodes.size() == 0){
				//nothing to return
				return new ArrayList<String>();
			}
			return adminPayoutService.getRewardsByIncentiveSubCodes(incentivesAndSubCodes, date);
		}else{
			return ResponseEntity.status(500).body("Arrays can't be null");
		}
	}

	@PostMapping("services/adminpayout/getEligiblePositions")
	public List<PayoutEligiblePositionsView> getEligiblePositions(@RequestBody List<Long> programGroupIds) {
		return adminPayoutService.getEligiblePositions(programGroupIds);
	}

	@GetMapping("services/adminpayout/getQuantities")
	public List<Quantities> getQuantities() {
		return adminPayoutService.getQuantities();
	}

	@GetMapping("services/adminpayout/getRewardTypes")
	public List<RewardTypes> getRewardTypes() {
		return adminPayoutService.getRewardTypes();
	}

	@PostMapping("services/adminpayout/saveNewAdminPayout")
	public ResponseEntity<AjaxResponse> saveNewAdminPayout(@RequestBody AdminPayoutPostData postData) throws Exception {
		AjaxResponse body = new AjaxResponse();
		ResponseEntity<AjaxResponse> response = null;
		adminPayoutService.saveNewAdminPayout(postData);
		body.setSuccess(true);
		response = new ResponseEntity<AdminPayoutController.AjaxResponse>(body, HttpStatus.OK);
		return response;
	}


	/*@GetMapping("services/adminpayout/removePayout/{date}")
	public boolean removePayout(@PathVariable String date) {
		AdminPayoutPostData postDate = new AdminPayoutPostData();
		List<PayoutProgramGroupsView> programs = adminPayoutService.getProgramGroupsBySelectedMonth(date);
		List<String> incentiveIds = new ArrayList<>();
		for(PayoutProgramGroupsView item: programs){
			incentiveIds.add(item.getIncentiveId() + "");
		}

		List<PayoutCategoriesByPrograms> categories = this.adminPayoutService.getCategoryByIncentive(incentiveIds, date);

		postDate.getIncentiveSubCodes().get(0).get

		postDate.setIncentiveSubCodes(incentiveSubCodes);
		adminPayoutService.get

		return adminPayoutService.
	}*/

	@GetMapping("services/adminpayout/getPayoutDates")
	public List<NameValue> getPayoutDates() {
		return adminPayoutService.getPayoutDates();
	}

	/*@PostMapping("services/adminpayout/setPayoutDates")
	public List<NameValue> setPayoutDates(@RequestBody Date postData) {
		return adminPayoutService.getPayoutDates();
	}*/

	@GetMapping("services/adminpayout/getNewPayoutDates")
	public List<NameValue> getNewPayoutDates() {
		List<NameValue> old = adminPayoutService.getPayoutDates();
		List<NameValue> result = adminPayoutService.getNewPayoutDates();
		List<NameValue> tempDates = new ArrayList<>();

		for(NameValue item: result){
			for(NameValue temp: old){
				if(item.getName().equals(temp.getName())){
					tempDates.add(item);
				}
			}
		}


		for(int i = 0; i<tempDates.size(); i++){
			for(int j = result.size()-1 ; j >=0; j--){
				if(tempDates.get(i).getName().equals(result.get(j).getName())){
					result.remove(j);
				}
			}
		}


		return result;
	}

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<AjaxResponse> handleException(HttpServletRequest req, Exception ex) {
		logger.error(ex);
		AjaxResponse body = new AjaxResponse();
		body.setSuccess(false);
		body.setMessage("There was an error processing your request at this time. Please try again later");
		return new ResponseEntity<AdminPayoutController.AjaxResponse>(body, HttpStatus.OK);
	}

	@Getter
	@Setter
	class AjaxResponse {
		private boolean success;
		private String message;
		private Object data;
		private List<Error> errors;
	}

	@Getter
	@Setter
	class Error {
		private String errorCode;
		private String errorDesc;
	}
}
