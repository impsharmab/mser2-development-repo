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
	
	
	@Override
	@Transactional
	public boolean enrollDealership(String dealerCode, int programId){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(
					//"IF EXISTS (SELECT * FROM [ProgramGroupEnrollments] WHERE [DealerCode] = ?0 and [ProgramGroupID] = (?1) )"
					"update ProgramGroupEnrollments set Status = 'E' , DelFlag = 'N', UpdateDate = GetDate(), UpdatedBy = 'SYSTEM' where ProgramGroupID = (?1) and DealerCode = ?0"
					//+ " ELSE"
					//+ " INSERT INTO [ProgramGroupEnrollments] ([ProgramGroupID],[DealerCode],[Status],[defaultApproval],[CreatedDate],[CreatedBy],[UpdateDate],[UpdatedBy],[DelFlag]) values (?0, ?1, 'E', 'SYSTEM', GetDate(), 'N', 'SYSTEM', GetDate())"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, programId);

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
	}
	

}
