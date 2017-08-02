package com.imperialm.imimserservices.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class ProgramEnrollmentsDAOImpl implements ProgramEnrollmentsDAO {

	private static Logger logger = LoggerFactory.getLogger(ProgramEnrollmentsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	private final String MSER_PROGRAM_ID = "1";

	@SuppressWarnings("unchecked")
	public boolean isDealershipEnrolled(String dealerCode){
		try {
			final Query query = this.em.createNativeQuery("select DealerCode from ProgramEnrollments where DealerCode = ?0 and Status = 'E' and programId = (?1) and DelFlag = 'N'");
			query.setParameter(0, dealerCode);
			query.setParameter(1, MSER_PROGRAM_ID);
			List<String> rows = (List<String>) query.getResultList();
			if(rows.size() > 0){
				return true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in totalDealersEnrolledByProgramID", ex);
		}
		return false;
	}
	
	
	@SuppressWarnings("unchecked")
	public boolean isDealershipRecordExists(String dealerCode){
		try {
			final Query query = this.em.createNativeQuery("select DealerCode from ProgramEnrollments where DealerCode = ?0 and programId = (?1)");
			query.setParameter(0, dealerCode);
			query.setParameter(1, MSER_PROGRAM_ID);
			List<String> rows = (List<String>) query.getResultList();
			if(rows.size() > 0){
				return true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isDealershipRecordExists", ex);
		}
		return false;
	}

	@Override
	@Transactional
	public boolean enrollDealership(String dealerCode){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("INSERT INTO dbo.[ProgramEnrollments] ([ProgramId], [DealerCode], [Status], CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdatedDate) values (?0, ?1, 'E', 'SYSTEM', GetDate(), 'N', 'SYSTEM', GetDate())");
			query.setParameter(0, MSER_PROGRAM_ID);
			query.setParameter(1, dealerCode);

			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (Exception ex) {
				logger.error("error occured in enrollDealership", ex);
		}
		return result;
	}
	
	
	@Override
	@Transactional
	public boolean updateDealershipEnrollment(String dealerCode){
		boolean result = false;
			try{
				final Query query = this.em.createNativeQuery("update ProgramEnrollments set Status = 'E' , DelFlag = 'N' where ProgramId = (?0) and DealerCode = ?1");
				query.setParameter(0, MSER_PROGRAM_ID);
				query.setParameter(1, dealerCode);
				if(query.executeUpdate() > 0){
					result = true;
				}
			}catch (Exception e) {
				logger.error("error occured in updateDealershipEnrollment", e);
			}
		return result;
	}


}
