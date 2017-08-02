package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.model.TwoStringItems;

@Repository
public class DealerPersonnelPositionsDAOImpl implements DealerPersonnelPositionsDAO{
	
	private static Logger logger = LoggerFactory.getLogger(DealerPersonnelPositionsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	@Cacheable(value="getRoleByPositionCode")
	public int getRoleByPositionCode(String positionCode) {
		int result = 0;
		try {
			final Query query = this.em.createNativeQuery(GET_ROLE_BY_POSITIONCODE);
			query.setParameter(0, positionCode);
			List<Integer> rows = (List<Integer>) query.getResultList();
			result = rows.get(0);
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getRoleByPositionCode", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	@Cacheable(value="checkPositionCode")
	public boolean checkPositionCode(String positionCode) {
		try {
			final Query query = this.em.createNativeQuery(CHECK_POSITIONCODE);
			query.setParameter(0, positionCode);
			List<String> rows = (List<String>) query.getResultList();
			if(rows.size() > 0){
				return true;
			}else{
				return false;
			}
		} catch (final Exception ex) {
			logger.error("error occured in checkPositionCode", ex);
			return false;
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	@Cacheable(value="getAllPositionCodes")
	public List<String> getAllPositionCodes() {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery(POSITIONCODES);
			result = (List<String>) query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getAllPositionCodes", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean isValidDealer(String dealerCode) {
		try {
			final Query query = this.em.createNativeQuery(CHECK_DEALERCODE);
			query.setParameter(0, dealerCode);
			List<String> rows = (List<String>) query.getResultList();
			if(rows.size() > 0){
				return true;
			}else{
				return false;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isValidDealer", ex);
			return false;
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<String> getDealerPricipal(String dealerCode) {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery(GET_DEALER_PRINCIPAL);
			query.setParameter(0, dealerCode);
			result = (List<String>) query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getDealerPricipal", ex);
		}
		return result;
	}


	@SuppressWarnings("unchecked")
	@Override
	public boolean isRegistrationEligiable(String sid, String dealerCode) {
		try {
			final Query query = this.em.createNativeQuery(REGISTRATION_DEALER_CHECK);
			query
			.setParameter(0, sid);
			query.setParameter(1, dealerCode);
			List<String> rows = (List<String>) query.getResultList();
			if(rows.size() > 0){
				return true;
			}else{
				return false;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isRegistrationEligiable", ex);
			return false;
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<TwoStringItems> getAllPositionCodesWithNames() {
		List<TwoStringItems> result = new ArrayList<TwoStringItems>();
		try {
			final Query query = this.em.createNativeQuery(POSITIONCODES_WITH_NAMES, TwoStringItems.class);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getAllPositionCodesWithNames", ex);
		}
		return result;
	}

}
