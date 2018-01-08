package com.imperialm.imimserservices.dao;

import java.util.Date;
import java.util.List;

import com.imperialm.imimserservices.dto.PayoutCategoryByIncentiveView;
import com.imperialm.imimserservices.dto.PayoutProgramGroupsView;
import com.imperialm.imimserservices.entities.IncentiveRewardEntity;
import com.imperialm.imimserservices.entities.IncentiveSubCodeEntity;
import com.imperialm.imimserservices.entities.Quantities;
import com.imperialm.imimserservices.entities.RewardTypes;
import com.imperialm.imimserservices.model.EligiblePositionsView;

public interface AdminPayoutDao {

	public List<PayoutProgramGroupsView> getProgramGroups(String startDate, String endDate);

	public List<PayoutCategoryByIncentiveView> getCategoryByIncentive(List<String> incentives, String startDate,
			String endDate);

	public List<Quantities> getQuantities();

	public List<RewardTypes> getRewardTypes();

	public List<EligiblePositionsView> getEligiblePositions(Long programGroupId, String statusCode);

	public <T extends Object> T saveEntity(T postdata);
	
	public <T extends Object> T removeEntity(T entity);
	
	public boolean deletePeriod(Date start, Date end);
	
	public List<IncentiveSubCodeEntity> getCategoriesByIncentiveSubCodes(List<Long> incentiveSubCodeIds, String startDate, String endDate);
	public List<IncentiveRewardEntity> getRewardsByIncentiveSubCodes(List<Long> incentiveSubCodeIds);
}
