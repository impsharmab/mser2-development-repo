package com.imperialm.imimserservices.services;

import java.util.List;

import com.imperialm.imimserservices.dto.AdminPayoutPostData;
import com.imperialm.imimserservices.dto.PayoutCategoriesByPrograms;
import com.imperialm.imimserservices.dto.PayoutEligiblePositionsView;
import com.imperialm.imimserservices.dto.PayoutProgramGroupsView;
import com.imperialm.imimserservices.entities.IncentiveSubCodeEntity;
import com.imperialm.imimserservices.entities.Quantities;
import com.imperialm.imimserservices.entities.RewardTypes;
import com.imperialm.imimserservices.model.NameValue;

public interface AdminPayoutService {
	public List<PayoutCategoriesByPrograms> getCategoryByIncentive(List<String> incentives, String month);

	public List<PayoutProgramGroupsView> getProgramGroupsBySelectedMonth(String month);
	
	public List<IncentiveSubCodeEntity> getRewardsByIncentiveSubCodes(List<Long> incentiveSubCodeIds, String month);

	public List<Quantities> getQuantities();

	public List<RewardTypes> getRewardTypes();

	public List<PayoutEligiblePositionsView> getEligiblePositions(List<Long> programGroupIds);

	public boolean saveNewAdminPayout(AdminPayoutPostData postData) throws Exception;
	
	public boolean removePayout(AdminPayoutPostData postData) throws Exception;
	
	public List<NameValue> getPayoutDates();
	
	public List<NameValue> getNewPayoutDates();
	
	public boolean deletePayout(String month);
}
