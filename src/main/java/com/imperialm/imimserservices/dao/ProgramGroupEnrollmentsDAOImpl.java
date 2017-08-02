package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.ProgramGroupEnrollmentsDTO;

@Repository
public class ProgramGroupEnrollmentsDAOImpl implements ProgramGroupEnrollmentsDAO  {
	
	private static Logger logger = LoggerFactory.getLogger(ProgramGroupDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<ProgramGroupEnrollmentsDTO> getProgramGroupEnrollmentsByDealerCode(String dealerCode) {
		List<ProgramGroupEnrollmentsDTO> result = new ArrayList<ProgramGroupEnrollmentsDTO>();
		try {
			final Query query = this.em.createNativeQuery(GET_ENROLLMENT_BY_SID, ProgramGroupEnrollmentsDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getProgramGroupEnrollmentsByDealerCode", ex);
		}
		return result;
	}

}
