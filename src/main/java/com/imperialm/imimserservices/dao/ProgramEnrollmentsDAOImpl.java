package com.imperialm.imimserservices.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
	public boolean enrollDealership(String dealerCode, String user){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(
					"IF EXISTS (SELECT * FROM ProgramEnrollments WHERE [DealerCode] = ?0 and ProgramId = (?1))"
					+ " update ProgramEnrollments set Status = 'E' , DelFlag = 'N', UpdatedBy = ?2 , UpdatedDate = GetDate() where ProgramId = (?1) and DealerCode = ?0"
					+ " ELSE"
					+ " INSERT INTO [ProgramEnrollments] ([ProgramId], [DealerCode], [Status], CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdatedDate) values (?1, ?0, 'E', ?2, GetDate(), 'N', ?2, GetDate())"
					);
			
			query.setParameter(0, dealerCode);
			query.setParameter(1, MSER_PROGRAM_ID);
			query.setParameter(2, user);

			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (Exception ex) {
				logger.error("error occured in enrollDealership", ex);
		}
		return result;
	}
        
        @Override
	@Transactional
	public boolean updateEnrollmentDateByProgramId(String dealerCode, String programId, String updatedBy, Date updateDate) {
            boolean result = false;
            try{
                    final Query query = this.em.createNativeQuery("update ProgramEnrollments set UpdatedDate = ?0, UpdatedBy = ?1 where ProgramId = ?2 AND DealerCode = ?3");   // 1, 6 and 15 are not base programs
                    query.setParameter(0, updateDate);
                    query.setParameter(1, updatedBy);
                    query.setParameter(2, programId);
                    query.setParameter(3, dealerCode);

                    if(query.executeUpdate() > 0){
                        result = true;
                    }
            }catch (Exception e) {
                    logger.error("error occured in updateEnrollmentDate", e);
            }
            return result;
	}
        
        @Override
        @Transactional
        public boolean disEnroll(String dealerCode, String updatedBy) {
             boolean result = false;
            try{
                    Date todayDate = new Date();
                    
                    final Query query = this.em.createNativeQuery("update ProgramEnrollments set Status=?0, UpdatedBy = ?1, UpdatedDate = ?2 where ProgramId = ?3 AND DealerCode = ?4");   // 1, 6 and 15 are not base programs
                    query.setParameter(0, "N");
                    query.setParameter(1, updatedBy);
                    query.setParameter(2, todayDate);
                    query.setParameter(3, MSER_PROGRAM_ID);
                    query.setParameter(4, dealerCode);

                    if(query.executeUpdate() > 0){
                        result = true;
                    }
            }catch (Exception e) {
                    logger.error("error occured in Dis-Enroll", e);
            }
            return result;           
        }
	
	
	/*@Override
	@Transactional
	public boolean updateDealershipEnrollment(String dealerCode){
		boolean result = false;
			try{
				
				String q = "IF EXISTS (SELECT * FROM [ProgramEnrollments] WHERE [DealerCode] = ?1 and [ProgramId] = (?0) )"
						+ " update ProgramEnrollments set Status = 'E' , DelFlag = 'N', UpdateDate = GetDate(), UpdatedBy = 'SYSTEM' where ProgramId = (?0) and DealerCode = ?1"
						+ " ELSE"
						+ " INSERT INTO [ProgramEnrollments] ([ProgramId],[DealerCode],[Status],[CreatedBy],[CreatedDate],[UpdateDate],[UpdatedBy],[DelFlag]) values ((?0), ?1, 'E', 'SYSTEM', GetDate(), GetDate(), 'SYSTEM','N')"
;
				final Query query = this.em.createNativeQuery(q);
				query.setParameter(0, MSER_PROGRAM_ID);
				query.setParameter(1, dealerCode);
				if(query.executeUpdate() > 0){
					result = true;
				}
			}catch (Exception e) {
				logger.error("error occured in updateDealershipEnrollment", e);
			}
		return result;
	}*/

	/*
	@Override
	public boolean isAutoApprovalMVP(String dealerCode) {
		boolean result = false;
		try{
			final Query query = this.em.createNativeQuery("select defaultApproval from ProgramGroupEnrollments where ProgramGroupID = 5 and DelFlag = 'N' and Status = 'E' and defaultApproval = 'Y' and DealerCode = ?0");
			query.setParameter(0, dealerCode);
			List<String> rows = query.getResultList();
			if(rows.size() > 0){
				result = true;
			}
		}catch (Exception e) {
			logger.error("error occured in isAutoApprovalMVP", e);
		}
		return result;
	}
	
	@Override
	@Transactional
	public boolean setAutoApprovalMVP(String dealerCode, boolean enroll){
		boolean result = false;
		try{
			final Query query = this.em.createNativeQuery("update ProgramGroupEnrollments set defaultApproval = ?0 , DelFlag = 'N' where ProgramGroupID = 5 and DealerCode = ?1");
			if(enroll){
				query.setParameter(0, "Y");
			}else{
				query.setParameter(0, "N");
			}
			query.setParameter(1, dealerCode);
			if(query.executeUpdate() > 0){
				result = true;
			}
		}catch (Exception e) {
			logger.error("error occured in setAutoApprovalMVP", e);
		}
		return result;
	}*/
	
	
}
