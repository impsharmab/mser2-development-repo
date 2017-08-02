package com.imperialm.imimserservices.dao;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

@Repository
public class DealerInfoDAOImpl implements DealerInfoDAO {

	private static Logger logger = LoggerFactory.getLogger(DealerInfoDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	
	@Override
	@Cacheable("getDealershipName")
	public String getDealershipName(String dealerCode) {
		String result = null;
		try {
			final Query query = this.em.createNativeQuery(GET_DEALERSHIP_NAME);
			query.setParameter(0, dealerCode);
			result = (String) query.getResultList().get(0);
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getDealershipName", ex);
		}
		return result;
	}

}
