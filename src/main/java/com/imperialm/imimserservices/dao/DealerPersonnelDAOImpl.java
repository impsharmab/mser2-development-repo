package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.DealerPersonnelDTO;

@Repository
public class DealerPersonnelDAOImpl implements DealerPersonnelDAO{
	
	private static Logger logger = LoggerFactory.getLogger(GroupSIDEnrollmentsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getSIDInfoBySID(String sid) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_INFO_BY_SID,DealerPersonnelDTO.class);
			query.setParameter(0, sid);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDInfoBySID", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getSIDInfoBySIDAndDealerCode(String sid, String dealerCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_INFO_BY_SID_AND_DEALERCODE,DealerPersonnelDTO.class);
			query.setParameter(0, sid);
			query.setParameter(1, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDInfoBySIDAndDealerCode", ex);
		}
		return result;
	}

	@Override
	public List<DealerPersonnelDTO> getSIDInfoByDealerCode(String dealerCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_SID_INFO_BY_DEALERCODE,DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDInfoByDealerCode", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getManagersByDealerCode(String dealerCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_MANAGERS_BY_DEALERCODE,DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getManagersByDealerCode", ex);
		}
		return result;
	}
	
	
}
