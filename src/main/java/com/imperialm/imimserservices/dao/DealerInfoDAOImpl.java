package com.imperialm.imimserservices.dao;

import java.util.List;

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
		String result = "";
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


	@Override
	public boolean isELValidated(String dealerCode) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(isELValidated);
			query.setParameter(0, dealerCode);
			String qResult = (String) query.getResultList().get(0);
			if(qResult.trim().equalsIgnoreCase("Y")){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in isELValidated", ex);
		}
		return result;
	}
	
	@Override
	public String getDealerSize(String dealerCode){
		String result = "";
		try {
			final Query query = this.em.createNativeQuery("Select BillingSizeCode from DealerInfo where dealerCode = ?0 TerminatedDate is null  and LEN(BillingSizeCode) > 0");
			query.setParameter(0, dealerCode);
			List<String> qresult = (List<String>) query.getResultList();
			
			if(qresult.size() > 0){
				result = qresult.get(0);
			}
			
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getDealerSize", ex);
		}
		return result;
	}

}
