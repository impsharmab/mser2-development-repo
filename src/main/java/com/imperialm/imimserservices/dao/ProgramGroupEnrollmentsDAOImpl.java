package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.ProgramGroupEnrollmentsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import java.util.Date;

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
			final Query query = this.em.createNativeQuery(GET_ENROLLMENT_BY_CODE_BASEPROGRAM, ProgramGroupEnrollmentsDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getProgramGroupEnrollmentsByDealerCode", ex);
		}
		return result;
	}
	
	
	@Override
	@Transactional
	public boolean enrollDealership(String dealerCode, int programId, String user){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(
					"IF EXISTS (SELECT * FROM [ProgramGroupEnrollments] WHERE [DealerCode] = ?0 and [ProgramGroupID] = (?1) )"
					+ " update ProgramGroupEnrollments set Status = 'E' , DelFlag = 'N', UpdateDate = GetDate(), UpdatedBy = ?2 where ProgramGroupID = (?1) and DealerCode = ?0"
					+ " ELSE"
					+ " INSERT INTO [ProgramGroupEnrollments] ([ProgramGroupID],[DealerCode],[Status],[defaultApproval],[CreatedDate],[CreatedBy],[UpdateDate],[UpdatedBy],[DelFlag]) values ((?1), ?0, 'E','N', GetDate(), ?2 , GetDate(), ?2 , 'N')"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, programId);
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
	public boolean isDealershipEnrolledByProgramGroup(String dealerCode, int programgroup) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(
					"select * from ProgramGroupEnrollments where dealerCode = ?0 and Status = 'E' and DelFlag = 'N' and ProgramGroupID = (?1)",
					ProgramGroupEnrollmentsDTO.class
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, programgroup);

			List<ProgramGroupEnrollmentsDTO> rows = query.getResultList();
			if(rows.size() > 0){
				result = true;
			}
			
		} catch (Exception ex) {
				logger.error("error occured in isDealershipEnrolledByProgramGroup", ex);
		}
		return result;
	}
	
	
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
	public boolean setAutoApprovalMVP(String dealerCode, boolean enroll, String user){
		boolean result = false;
		try{
			final Query query = this.em.createNativeQuery("update ProgramGroupEnrollments set defaultApproval = ?0 , UpdatedBy = ?2, UpdateDate = GetDate() , DelFlag = 'N' where ProgramGroupID = 5 and DealerCode = ?1");
			if(enroll){
				query.setParameter(0, "Y");
			}else{
				query.setParameter(0, "N");
			}
			query.setParameter(1, dealerCode);
			query.setParameter(2, user);
			
			if(query.executeUpdate() > 0){
				result = true;
			}
		}catch (Exception e) {
			logger.error("error occured in setAutoApprovalMVP", e);
		}
		return result;
	}
	
        @Override
        @Transactional
        public boolean updateEnrollmentDate(ProgramGroupEnrollmentsDTO enrollment) {
            boolean result = false;
            try{
                    final Query query = this.em.createNativeQuery("update ProgramGroupEnrollments set UpdateDate = ?0, UpdatedBy = ?1 where ProgramGroupID NOT IN (1, 6, 15) AND DealerCode = ?2");   // 1, 6 and 15 are not base programs
                    query.setParameter(0, enrollment.getUpdateDate());
                    query.setParameter(1, enrollment.getUpdatedBy());
                    query.setParameter(2, enrollment.getDealerCode());

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
                
                final Query query = this.em.createNativeQuery("update ProgramGroupEnrollments set Status = ?0, UpdatedBy = ?1, UpdateDate = ?2 where DealerCode = ?3");   // 1, 6 and 15 are not base programs
                    query.setParameter(0, "N");
                    query.setParameter(1, updatedBy);
                    query.setParameter(2, todayDate);
                    query.setParameter(3, dealerCode);

                if(query.executeUpdate() > 0){
                    result = true;
                }
            }catch (Exception e) {
                    logger.error("error occured in dis-Enroll", e);
            }
            return result;
        }
}
