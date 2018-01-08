package com.imperialm.imimserservices.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class RewardSummaryDAOImpl {

	private static Logger logger = LoggerFactory.getLogger(RewardSummaryDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	//SELECT [Parent] 'parent', [Child] 'child', SUM(RewardAmount) 'RewardAmount' FROM RewardSummary where Child = 'CA' and PaidDate between '2017-01-01' and '2017-01-31' group by parent, child order by parent, child
	//SELECT [Parent] 'parent', SUM(RewardAmount) 'RewardAmount' FROM RewardSummary where Parent = 'NAT' group by parent order by parent
	
	@SuppressWarnings("unchecked")
	public List<BigDecimal> getRewardSummaryByParentTerritoryAndToggle(String territory, Date start, Date end){
		List<BigDecimal> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(""
					+ "SELECT SUM(RewardAmount) 'RewardAmount' FROM RewardSummary where Parent = ?0 and PaidDate between ?1 and ?2 group by parent order by parent");
			query.setParameter(0, territory);
			query.setParameter(1, start);
			query.setParameter(2, end);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRewardSummaryByParentTerritoryAndToggle", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<BigDecimal> getRewardSummaryByChildTerritoryAndToggle(String territory, Date start, Date end){
		List<BigDecimal> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(""
					+ "SELECT SUM(RewardAmount) 'RewardAmount' FROM RewardSummary where Child = ?0 and PaidDate between ?1 and ?2 group by child order by child");
			query.setParameter(0, territory);
			query.setParameter(1, start);
			query.setParameter(2, end);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRewardSummaryByChildTerritoryAndToggle", ex);
		}
		return result;
	}
	
	
}
