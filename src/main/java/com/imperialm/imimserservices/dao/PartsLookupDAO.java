package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.PartsLookupDTO;



@Repository
public class PartsLookupDAO {

	private static Logger logger = LoggerFactory.getLogger(LaborOpsDTOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	
	@SuppressWarnings("unchecked")
	public List<PartsLookupDTO> getPartsInfo(String partNumber) {
		List<PartsLookupDTO> result = new ArrayList<PartsLookupDTO>();
		try {
			final Query query = this.em.createNativeQuery("", PartsLookupDTO.class);
			query.setParameter(0, partNumber);
			List<PartsLookupDTO> rows = query.getResultList();
			result = rows;
		
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getPartsInfo", ex);
		}
		return result;
	}
	
}
