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
public class RewardSummaryDetailsDAOImpl {

	private static Logger logger = LoggerFactory.getLogger(RewardSummaryDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	//SELECT [Parent] 'parent', [Child] 'child', SUM(RewardAmount) 'RewardAmount' FROM RewardSummary where Child = 'CA' and PaidDate between '2017-01-01' and '2017-01-31' group by parent, child order by parent, child
	//SELECT [Parent] 'parent', SUM(RewardAmount) 'RewardAmount' FROM RewardSummary where Parent = 'NAT' group by parent order by parent
	
	@SuppressWarnings("unchecked")
	public List<BigDecimal> getRewardSummaryBySIDAndToggle(String sid, String dealerCode , Date start, Date end){
		List<BigDecimal> result = new ArrayList<>();
		try {
			//String oldq = "SELECT SUM(RewardAmount) 'RewardAmount' FROM [RewardSummaryDetails] where SID = ?0 and DealerCode = ?3 and PaidDate between ?1 and ?2 group by SID, DealerCode order by SID";
			String q = ""
					+ "select SUM(rad.RewardAmount) from RewardAllocDetail rad join RewardAllocHeader rah on rad.RewardAllocHeaderID = rah.RewardAllocHeaderID"
					+ " where rah.DealerCode = ?3 and rad.SID = ?0 and rah.RewardDate between ?1 and ?2" 
					+ " group by sid";
			final Query query = this.em.createNativeQuery(""
					+ q );
			query.setParameter(0, sid);
			query.setParameter(3, dealerCode);
			query.setParameter(1, start);
			query.setParameter(2, end);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRewardSummaryBySIDAndToggle", ex);
		}
		return result;
	}
	
}
