package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.MserRankingDTO;

@Repository
public class MserRankingDAOImpl implements MserRankingDAO{

	private static Logger logger = LoggerFactory.getLogger(MserRankingDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	
	
	public List<MserRankingDTO> getMserRankingByParent(String territory){
		List<MserRankingDTO> result = new ArrayList<MserRankingDTO>();

		try {
			final Query query = this.em.createNativeQuery(SELECT_BY_PARENT, MserRankingDTO.class);
			query.setParameter(0, territory);
			result = query.getResultList();
			
		} catch (final Exception ex) {
			logger.error("error occured in getMserRankingByParent", ex);
		}
		return result;
	}
	
	public List<MserRankingDTO> getMserRankingByChild(String territory){
		List<MserRankingDTO> result = new ArrayList<MserRankingDTO>();

		try {
			final Query query = this.em.createNativeQuery(SELECT_BY_CHILD, MserRankingDTO.class);
			query.setParameter(0, territory);
			result = query.getResultList();
			
		} catch (final Exception ex) {
			logger.error("error occured in getMserRankingByChild", ex);
		}
		return result;
	}
	
}
