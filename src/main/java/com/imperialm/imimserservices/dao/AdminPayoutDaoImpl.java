package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;
import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.PayoutCategoryByIncentiveView;
import com.imperialm.imimserservices.dto.PayoutProgramGroupsView;
import com.imperialm.imimserservices.entities.IncentiveRewardEntity;
import com.imperialm.imimserservices.entities.IncentiveSubCodeEntity;
import com.imperialm.imimserservices.entities.Quantities;
import com.imperialm.imimserservices.entities.RewardTypes;
import com.imperialm.imimserservices.model.EligiblePositionsView;

@Repository
public class AdminPayoutDaoImpl extends BaseDao implements AdminPayoutDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<PayoutProgramGroupsView> getProgramGroups(String startDate, String endDate) {
		List<PayoutProgramGroupsView> programsGroups = new ArrayList<>();
		Query query = em.createNamedQuery("getProgramsGroups", PayoutProgramGroupsView.class);
		StringBuilder queryStr = new StringBuilder(query.unwrap(SQLQuery.class).getQueryString());
		if (StringUtils.isNotEmpty(startDate) && StringUtils.isNotEmpty(endDate)) {
			queryStr.append(" AND inc.StartDate<=:startDate AND inc.EndDate>=:endDate");
			programsGroups = em.createNativeQuery(queryStr.toString(), "PayoutProgramGroupsMapping")
					.setParameter("startDate", startDate).setParameter("endDate", endDate).getResultList();
		} else
			programsGroups = query.getResultList();

		return programsGroups;
	}

	@Override
	public List<PayoutCategoryByIncentiveView> getCategoryByIncentive(List<String> incentives, String startDate,
			String endDate) {
		List<PayoutCategoryByIncentiveView> categories = new ArrayList<>();
		if (StringUtils.isNotEmpty(startDate) && StringUtils.isNotEmpty(endDate)) {
			categories = em.createNamedQuery("getCategoryByIncentiveCopyPayout", PayoutCategoryByIncentiveView.class)
					.setParameter("incentiveIDs", incentives).setParameter("startDate", startDate)
					.setParameter("endDate", endDate).getResultList();
		} else
			categories = em.createNamedQuery("getCategoryByIncentiveNewPayout", PayoutCategoryByIncentiveView.class)
			.setParameter("incentiveIDs", incentives).getResultList();

		return categories;
	}

	@Override
	public List<Quantities> getQuantities() {
		return em.createNamedQuery("Quantities.findAll", Quantities.class).getResultList();
	}

	@Override
	public List<RewardTypes> getRewardTypes() {
		return em.createNamedQuery("RewardTypes.findAll", RewardTypes.class).getResultList();
	}

	@Override
	public List<EligiblePositionsView> getEligiblePositions(Long programGroupId, String statusCode) {
		return em.createNamedQuery("getEligiblePositionsByProgramGroup", EligiblePositionsView.class)
				.setParameter("programGroupID", programGroupId).getResultList();
	}


	private String DELETE_PERIOD = "delete ir from IncentiveRewards ir"
			+ " WHERE ir.IncentiveRewardID IN (select irt.IncentiveRewardID from IncentiveRewards irt"
			+ " join IncentiveSubCodes isc on (isc.StartDate<= ?0 AND isc.EndDate>= ?1) and isc.IncentiveSubCodeID = irt.IncentiveSubCodeID"
			+ " join incentives i on irt.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " where isc.IncentiveSubCode <> '1');"
			+ " delete isc from IncentiveSubCodes isc"
			+ " where isc.IncentiveSubCodeID IN (select isct.IncentiveSubCodeID from IncentiveSubCodes isct"
			+ " join incentives i on isct.IncentiveID = i.IncentiveID"
			+ " where (isc.StartDate<= ?0 AND isc.EndDate>= ?1) and isct.IncentiveSubCode <> '1' and i.IncentiveID > 0)";
	
	@Override
	@Transactional
	public boolean deletePeriod(Date start, Date end) {
		try{
			Query query = em.createQuery(DELETE_PERIOD);
			query.setParameter(0, start);
			query.setParameter(1, end);
			query.executeUpdate();
			return true;
		}catch (Exception e){
			return false;
		}
	}


	private String CATEGORIES_BY_INCETIVES_AND_SUBCODES = "select * from IncentiveSubCodes where IncentiveSubCodeID IN (?0) and (StartDate<= ?1 AND EndDate>= ?2 ) and IncentiveID > 0";

	@SuppressWarnings("unchecked")
	@Override
	public List<IncentiveSubCodeEntity> getCategoriesByIncentiveSubCodes(List<Long> incentiveSubCodeIds, String startDate,
			String endDate) {
		List<IncentiveSubCodeEntity> result = new ArrayList<>();
		try{
			if (StringUtils.isNotEmpty(startDate) && StringUtils.isNotEmpty(endDate)) {
				Query query = em.createNativeQuery(CATEGORIES_BY_INCETIVES_AND_SUBCODES, IncentiveSubCodeEntity.class);
				query.setParameter(0, incentiveSubCodeIds);
				query.setParameter(1, startDate);
				query.setParameter(2, endDate);
				result = query.getResultList();
			}
		} catch (final Exception ex) {
			logger.error("error occured in getCategoriesByIncentiveSubCodes", ex);
		}

		return result;
	}


	private String REWARDS_BY_INCETIVES_AND_SUBCODES = "select * from IncentiveRewards where IncentiveSubCodeID in (?0)";

	@SuppressWarnings("unchecked")
	@Override
	public List<IncentiveRewardEntity> getRewardsByIncentiveSubCodes(List<Long> incentiveSubCodeIds) {
		List<IncentiveRewardEntity> result = new ArrayList<>();
		try{
			if(incentiveSubCodeIds.size()>0){
				Query query = em.createNativeQuery(REWARDS_BY_INCETIVES_AND_SUBCODES, IncentiveRewardEntity.class);
				query.setParameter(0, incentiveSubCodeIds);
				result = query.getResultList();
			}
		} catch (final Exception ex) {
			logger.error("error occured in getRewardsByIncentiveSubCodes", ex);
		}

		return result;
	}

}
