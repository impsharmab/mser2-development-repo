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

import com.imperialm.imimserservices.dto.LaborOpsDTO;

@Repository
public class LaborOpsDTOImpl implements LaborOpsDAO {

	private static Logger logger = LoggerFactory.getLogger(LaborOpsDTOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<LaborOpsDTO> getOpCodeByDealer(List<String> dealerCode) {
		List<LaborOpsDTO> result = new ArrayList<LaborOpsDTO>();
		try {
			final Query query = this.em.createNativeQuery(SELECT_BY_DEALERCODE, LaborOpsDTO.class);
			query.setParameter(0, dealerCode);
			List<LaborOpsDTO> rows = query.getResultList();
			result = rows;
		
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getOpCodeByDealer", ex);
		}
		return result;
	}
	
	
	@Transactional
	public boolean updateOpCodeById(LaborOpsDTO row){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("update LaborOps set [DealerCode] = ?3 , [OpCode] = ?1, [Source] = ?2, [UpdatedDate] = GetDate(), [UpdatedBy] = ?4  where [ID] = ?0");
			query.setParameter(0, row.getID());
			query.setParameter(1, row.getOpCode());
			query.setParameter(2, row.getSource());
			query.setParameter(3, row.getDealerCode());
			query.setParameter(4, row.getCreatedBy());
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in updateOpCodeById", ex);
		}
		return result;
	}
	
	@Transactional
	public boolean addOpCodeByDealerCode(LaborOpsDTO row){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("INSERT INTO dbo.LaborOps (OpCode, DealerCode, Source, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdatedDate) values (?0, ?1, ?2, ?3, GetDate(), 'N', ?2, GetDate())");
			query.setParameter(0, row.getOpCode());
			query.setParameter(2, row.getSource());
			query.setParameter(3, row.getCreatedBy());
			query.setParameter(1, row.getDealerCode());
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in updateOpCodeById", ex);
		}
		return result;
	}


	@Override
	@Transactional
	public boolean deleteOpCodeById(int id) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("update LaborOps set [DelFlag] = 'Y'  LaborOps where [ID] = ?0");
			query.setParameter(0, id);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in deleteOpCodeById", ex);
		}
		return result;
	}
	

}
