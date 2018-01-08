package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class IncentiveSubCodesDAOImpl {

	
	private static Logger logger = LoggerFactory.getLogger(IncentiveSubCodesDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	@SuppressWarnings("unchecked")
	public List<Date> getPayoutDates() {
		List<Date> result = new ArrayList<>();
		try {
			String q = "select distinct StartDate from IncentiveSubCodes where IsDescVisible = 'Y' and IncentiveSubCode <> '1' order by StartDate DESC";
			final Query query = this.em.createNativeQuery(q);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutDates", ex);
		}
		return result;
	}
	
}
