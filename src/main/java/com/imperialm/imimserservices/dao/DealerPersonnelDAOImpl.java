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
import com.imperialm.imimserservices.dto.DealerPersonnelDTOWithEmail;

@Repository
public class DealerPersonnelDAOImpl implements DealerPersonnelDAO{
	
	private static Logger logger = LoggerFactory.getLogger(DealerPersonnelDAOImpl.class);

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
	
	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getSIDInfoBySIDAndDealerCode(List<String> sids, String dealerCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_INFO_BY_LIST_SIDS_AND_DEALERCODE,DealerPersonnelDTO.class);
			query.setParameter(0, sids);
			query.setParameter(1, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDInfoBySIDAndDealerCode", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
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

	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getParticipantsEnrolledByProgramGroupByDealerCode(String dealerCode,
			int programGroupId) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_PARTICIPANTS_ENROLLED_IN_PROGRAM,DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, programGroupId);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getParticipantsEnrolledByProgramGroupByDealerCode", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<DealerPersonnelDTO> getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(String dealerCode,
			int programGroupId) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			//final Query query = this.em.createNativeQuery("Select dp.* from [DealerPersonnel] dp join GroupSIDEnrollments ep on ep.SID = dp.SID and dp.DealerCode = ep.DealerCode and ep.Status = 'E' and dp.DealerCode = ?0 and ep.ProgramGroupID = (?1)",DealerPersonnelDTO.class);
			//final Query query = this.em.createNativeQuery("Select dp.* from [DealerPersonnel] dp join GroupSIDEnrollments ep on ep.PositionCode = dp.PositionCode and ep.SID = dp.SID and dp.DealerCode = ep.DealerCode and ep.Status = 'E' and dp.DealerCode = ?0 and ep.ProgramGroupID = (?1)",DealerPersonnelDTO.class);
			//final Query query = this.em.createNativeQuery("Select distinct dp.* from GroupSIDEnrollments ep join [DealerPersonnel] dp on ep.SID = dp.SID and dp.DealerCode = ep.DealerCode where ep.Status = 'E' and dp.DealerCode = ?0 and ep.ProgramGroupID = (?1)",DealerPersonnelDTO.class);
			final Query query = this.em.createNativeQuery("Select distinct dp.Address, dp.City, dp.CorpHireDate, dp.DealerCode, dp.DealerHireDate, dp.DMS_ID, dp.FirstName, dp.IsPrimaryDealer, dp.isPrimaryPosition, dp.Last4, dp.LastName, dp.MiddleName, ep.PositionCode, dp.SID, dp.STATE, dp.Suffix, dp.ZipCode from GroupSIDEnrollments ep left join [DealerPersonnel] dp on ep.SID = dp.SID and dp.DealerCode = ep.DealerCode where ep.Status = 'E' and dp.DealerCode = ?0 and ep.ProgramGroupID = (?1)",DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, programGroupId);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions", ex);
		}
		return result;
	}
	

	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getSIDByDealerCodeAndPositionCode(String dealerCode, String positionCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_SID_BY_DEALERCODE_AND_POSITIONCODE,DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, positionCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDByDealerCodeAndPositionCode", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<DealerPersonnelDTO> getSIDByDealerCodeAndPositionCode(String dealerCode, List<String> positionCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_SID_BY_DEALERCODE_AND_POSITIONCODE_LIST,DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, positionCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDByDealerCodeAndPositionCode", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getDealerByTerritory(String territory) {
		List<String> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_DEALER_BY_TERRITORY);
			query.setParameter(0, territory);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getDealerByTerritory", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getParticipantsByDealerList(List<String> dealers) {
		List<String> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery("select distinct sid from DealerPersonnel where DealerCode IN (?0)");
			query.setParameter(0, dealers);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getParticipantsByDealerList", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getParticipantsNATList() {
		List<String> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery("select distinct sid from DealerPersonnel");
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getParticipantsNATList", ex);
		}
		return result;
	}

	@Override
	public List<DealerPersonnelDTOWithEmail> getSIDInfoByDealerCodeWithEmail(String dealerCode) {
		List<DealerPersonnelDTOWithEmail> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(GET_SID_INFO_BY_DEALERCODE_WITH_EMAIL,DealerPersonnelDTOWithEmail.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSIDInfoByDealerCodeWithEmail", ex);
		}
		return result;
	}

	@Override
	public List<DealerPersonnelDTO> getParticipantsEnrolledByDealerCodeForDistributions(String dealerCode) {
		List<DealerPersonnelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery("Select distinct ep.PositionCode, dp.Address, dp.City, dp.CorpHireDate, dp.DealerCode, dp.DealerHireDate, dp.DMS_ID, dp.FirstName, dp.IsPrimaryDealer, dp.isPrimaryPosition, dp.Last4, dp.LastName, dp.MiddleName, dp.SID, dp.STATE, dp.Suffix, dp.ZipCode from GroupSIDEnrollments ep left join [DealerPersonnel] dp on ep.SID = dp.SID and dp.DealerCode = ep.DealerCode join ProgramGroups pg on pg.ProgramID = 1 where ep.Status = 'E' and dp.DealerCode = ?0",DealerPersonnelDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getParticipantsEnrolledByDealerCodeForDistributions", ex);
		}
		return result;
	}
	
	@Override
	public boolean mvpApprovalByDealerAndSID(String dealerCode, String sid){
		boolean result = false;
		try {
			
			final Query query = this.em.createNativeQuery("select SID from DealerPersonnel where DealerCode = ?0 and SID = ?1 and PositionCode IN ('01','02','33','35','17')");
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<String> row = query.getResultList();
			if(row.size()>0){
				result= true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in mvpApprovalByDealerAndSID", ex);
		}
		return result;
	}
	
}
