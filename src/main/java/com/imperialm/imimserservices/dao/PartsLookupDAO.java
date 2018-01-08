package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.PartsLookupDTO;
import com.imperialm.imimserservices.dto.RejectedInvoicesDTO;
import com.imperialm.imimserservices.model.TwoStringItems;



@Repository
public class PartsLookupDAO {

	private static Logger logger = LoggerFactory.getLogger(LaborOpsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public List<PartsLookupDTO> getPartsInfo(String partNumber) {
		List<PartsLookupDTO> result = new ArrayList<PartsLookupDTO>();
		try {
			
			String q = "Select Distinct IP.PartNumber , ISC.IncentiveSubCode , ISC.Description , IP.StartDate , IP.EndDate , IR.RewardValue, IP.Manufacturer from IncentiveSubCodes ISC"
					+ " Inner join IncentiveParts IP on ISC.IncentiveSubCodeID = IP.IncentiveSubCodeID"
					+ " Inner join IncentiveRewards IR on ISC.IncentiveSubCodeID = IR.IncentiveSubCodeID" 
					+ " Where IR.IsOverrideReward ='N'  and RewardValue <>0.00 and IncentiveSubCode <>'1' and IP.PartNumber like ?0"
					+ " order by ip.StartDate DESC";
			
			final Query query = this.em.createNativeQuery(q, PartsLookupDTO.class);
			query.setParameter(0, "%" + partNumber + "%");
			List<PartsLookupDTO> rows = query.getResultList();
			result = rows;

		} catch (final Exception ex) {
			logger.error("error occured in getPartsInfo", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<PartsLookupDTO> getPartsInfo(String partNumber, String category) {
		List<PartsLookupDTO> result = new ArrayList<PartsLookupDTO>();
		try {
			
			String q = "Select Distinct IP.PartNumber , ISC.IncentiveSubCode , ISC.Description , IP.StartDate , IP.EndDate , IR.RewardValue, IP.Manufacturer from IncentiveSubCodes ISC"
					+ " Inner join IncentiveParts IP on ISC.IncentiveSubCodeID = IP.IncentiveSubCodeID"
					+ " Inner join IncentiveRewards IR on ISC.IncentiveSubCodeID = IR.IncentiveSubCodeID" 
					+ " Where IR.IsOverrideReward ='N'  and RewardValue <> 0.00 and IncentiveSubCode <> '1' and IP.PartNumber like ?0 and ISC.IncentiveSubCode = ?1 and IP.IsPartVisible = 'Y'"
					+ " order by ip.StartDate DESC";
			
			final Query query = this.em.createNativeQuery(q, PartsLookupDTO.class);
			query.setParameter(0, "%" + partNumber + "%");
			query.setParameter(1, category);
			List<PartsLookupDTO> rows = query.getResultList();
			result = rows;

		} catch (final Exception ex) {
			logger.error("error occured in getPartsInfo", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<PartsLookupDTO> getPartsByCategory(String category, Date date) {
		List<PartsLookupDTO> result = new ArrayList<PartsLookupDTO>();
		try {
			
			String q = "Select Distinct IP.PartNumber , ISC.IncentiveSubCode , ISC.Description , IP.StartDate , IP.EndDate , IR.RewardValue, IP.Manufacturer from IncentiveSubCodes ISC"
					+ " Inner join IncentiveParts IP on ISC.IncentiveSubCodeID = IP.IncentiveSubCodeID"
					+ " Inner join IncentiveRewards IR on ISC.IncentiveSubCodeID = IR.IncentiveSubCodeID" 
					//+ " Where IR.IsOverrideReward ='N'  and RewardValue <> 0.00 and IncentiveSubCode <>'1' and ISC.IncentiveSubCode = ?0";
					+ " Where IR.IsOverrideReward ='N'  and RewardValue <>0.00 and IncentiveSubCode <>'1' and ISC.IncentiveSubCode = ?0 and IP.IsPartVisible = 'Y' and (?1 between isc.StartDate  and isc.EndDate)";
			
			final Query query = this.em.createNativeQuery(q, PartsLookupDTO.class);
			query.setParameter(0, category);
			query.setParameter(1, date);
			List<PartsLookupDTO> rows = query.getResultList();
			result = rows;

		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getParts", ex);
		}
		return result;
	}
	


	public List<TwoStringItems> getCategoryList(Date date){
		List<TwoStringItems> result = new ArrayList<>();
		try {
			String q = "Select Distinct ISC.Description 'item1', ISC.IncentiveSubCode 'item2' from IncentiveSubCodes ISC"
					+ " Inner join IncentiveParts IP on ISC.IncentiveSubCodeID = IP.IncentiveSubCodeID"
					+ " Inner join IncentiveRewards IR on ISC.IncentiveSubCodeID = IR.IncentiveSubCodeID"
					+ " Where IR.IsOverrideReward ='N'  and RewardValue <>0.00 and IncentiveSubCode <>'1' and (?0 between isc.StartDate  and isc.EndDate)";
					//+ " Where IR.IsOverrideReward ='N'  and RewardValue <>0.00 and IncentiveSubCode <>'1' and (getdate() between isc.StartDate  and isc.EndDate)";
			final Query query = this.em.createNativeQuery(q, TwoStringItems.class);
			query.setParameter(0, date);
			result = query.getResultList();
		}catch (final Exception ex) {
			logger.error("error occured in getCategoryList", ex);
		}

		return result;
	}


}
