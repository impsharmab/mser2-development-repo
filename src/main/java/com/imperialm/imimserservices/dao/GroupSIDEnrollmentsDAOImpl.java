package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.ParticipantEnrollmentList;

@Repository
public class GroupSIDEnrollmentsDAOImpl implements GroupSIDEnrollmentsDAO {

	private static Logger logger = LoggerFactory.getLogger(GroupSIDEnrollmentsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode) {
		List<GroupSIDEnrollmentsDTO> result = new ArrayList<GroupSIDEnrollmentsDTO>();
		try {
			final Query query = this.em.createNativeQuery(GET_ENROLLMENT_BY_SID, GroupSIDEnrollmentsDTO.class);
			query.setParameter(0, sid);
			query.setParameter(1, dealerCode);
			result = query.getResultList();			
		} catch (final Exception ex) {
			logger.error("error occured in getGroupSidEnrollmentsBySID", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getEnrolledSIDsByDealerCode(String dealerCode) {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery("select distinct SID from GroupSIDEnrollments where DealerCode = ?0 and Status = 'E' and ProgramGroupID IN (1,2,3,4,5,6,7,8,9,10,11,14,15) and DelFlag = 'N'");
			query.setParameter(0, dealerCode);
			result = (List<String>)query.getResultList();			
		} catch (final Exception ex) {
			logger.error("error occured in getEnrolledSIDsByDealerCode", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getAllSIDsByDealerCode(String dealerCode) {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery("select distinct SID from GroupSIDEnrollments where DealerCode = ?0 and ProgramGroupID IN (1,2,3,4,5,6,7,8,9,10,11,14,15) and DelFlag = 'N'");
			query.setParameter(0, dealerCode);
			result = (List<String>)query.getResultList();			
		} catch (final Exception ex) {
			logger.error("error occured in getAllSIDsByDealerCode", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getEnrolledPositionCodesBySIDAndProgramGoupId(String sid, String dealerCode,
			int programGroupId) {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery("select PositionCode from GroupSIDEnrollments where sid = ?0 and DealerCode = ?1 and Status = 'E' and ProgramGroupID = (?2) and DelFlag = 'N'");
			query.setParameter(0, sid);
			query.setParameter(1, dealerCode);
			query.setParameter(2, programGroupId);
			result = (List<String>)query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getEnrollmentPositionCodesBySIDAndProgramGoupId", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public String getDMSIDBySID(String sid, String dealerCode) {
		String result = "";
		try {
			final Query query = this.em.createNativeQuery("select top 1 DMSID from GroupSIDEnrollments where sid = ?0 and DealerCode = ?1 and Status = 'E' and DelFlag = 'N' and DMSID IS NOT NULL and DMSID <> '' and ProgramGroupID IN (1,2,3,4,5,6,7,8,9,10,11,14,15)");
			query.setParameter(0, sid);
			query.setParameter(1, dealerCode);
			if(query.getResultList().size() > 0){
				result = ((List<String>) query.getResultList()).get(0);
			}
		} catch (final Exception ex) {
			logger.error("error occured in getDMSIDBySID", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GroupSIDEnrollmentsDTO> getAllGroupSidEnrollmentsByDealerCode(String dealerCode) {
		List<GroupSIDEnrollmentsDTO> result = new ArrayList<GroupSIDEnrollmentsDTO>();
		try {
			final Query query = this.em.createNativeQuery("select * from GroupSIDEnrollments where dealerCode = ?0 and DelFlag = 'N' and ProgramGroupID IN (1,2,3,4,5,6,7,8,9,10,11,14,15)", GroupSIDEnrollmentsDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();			
		} catch (final Exception ex) {
			logger.error("error occured in getGroupSidEnrollmentsByDealerCode", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsByDealerCode(String dealerCode) {
		List<GroupSIDEnrollmentsDTO> result = new ArrayList<GroupSIDEnrollmentsDTO>();
		try {
			final Query query = this.em.createNativeQuery("select * from GroupSIDEnrollments where dealerCode = ?0 and DelFlag = 'N' and Status = 'E' and ProgramGroupID IN (1,2,3,4,5,6,7,8,9,10,11,14,15)", GroupSIDEnrollmentsDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();			
		} catch (final Exception ex) {
			logger.error("error occured in getGroupSidEnrollmentsByDealerCode", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GroupSIDEnrollmentsDTO> getGroupSidNonEnrollmentsByDealerCode(String dealerCode) {
		List<GroupSIDEnrollmentsDTO> result = new ArrayList<GroupSIDEnrollmentsDTO>();
		try {
			final Query query = this.em.createNativeQuery("select * from GroupSIDEnrollments where dealerCode = ?0 and DelFlag = 'N' and Status = 'N' and ProgramGroupID IN (1,2,3,4,5,6,7,8,9,10,11,14,15)", GroupSIDEnrollmentsDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();			
		} catch (final Exception ex) {
			logger.error("error occured in getGroupSidNonEnrollmentsByDealerCode", ex);
		}
		return result;
	}
	

	@Override
	@Transactional
	public boolean addOverrideCode(String dealerCode, String sid, String positionCode, String dmsid) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =1) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 1"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (1, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =2) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 2"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (2, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =3) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 3"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (3, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =4) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 4"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (4, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =5) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 5"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (5, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =6) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 6"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (6, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =7) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 7"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (7, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =8) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 8"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (8, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =9) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 9"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (9, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =10) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 10"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (10, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =11) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 11"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (11, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF NOT EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =12) "
					//+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 12"
					//+" ELSE " 
					+
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (12, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF NOT EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =13) "
					//+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 13"
					//+" ELSE " 
					+
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (13, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =14) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 14"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (14, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())"
					+ "; " +
					"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode=?2 AND ProgramGroupID =15) "
					+ "UPDATE GroupSIDEnrollments SET [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = ?2 AND [ProgramGroupID] = 15"
					+" ELSE " +
					"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (15, ?0, ?1, ?2, 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate())");
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			query.setParameter(2, positionCode);
			query.setParameter(3, dmsid);
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in addOverrideCode", ex);
		}
		return result;
	}

	@Override
	@Transactional
	public boolean updateSIDEnrollment(String dealerCode, String sid, List<String> positionCode, int programGroupID, List<String> eligibleCodes) {
		boolean result = false;
		//ADD UPDATE DATE AND USER
		List<String> unenrollList = new ArrayList<>();
		for(String item: eligibleCodes){
			if(!positionCode.contains(item.trim())){
				unenrollList.add(item);
			}
		}
		Query query = this.em.createNativeQuery("update GroupSIDEnrollments set [Status] = 'E', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] IN (?2) AND [ProgramGroupID] = (?3)"
						+ ";"+
						" update GroupSIDEnrollments set [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] IN (?4) AND [ProgramGroupID] = (?3)");
		try {
			if(positionCode.size() == 0 && unenrollList.size() == 0){
				return true;
			}
			if(positionCode.size() == 0 && unenrollList.size() > 0){
				query = this.em.createNativeQuery("update GroupSIDEnrollments set [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] IN (?4) AND [ProgramGroupID] = (?3)");
			}else if(unenrollList.size() == 0){
				query = this.em.createNativeQuery(
						"update GroupSIDEnrollments set [Status] = 'E', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] IN (?2) AND [ProgramGroupID] = (?3)");
				query.setParameter(2, positionCode);
			}else{
				query.setParameter(2, positionCode);
			}
			
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			query.setParameter(3, programGroupID);
			if(unenrollList.size() > 0){
				query.setParameter(4, unenrollList);
			}
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updateSIDEnrollment", ex);
		}
		return result;
	}
	
	
	@Override
	@Transactional
	public boolean updateSIDEnrollmentSpecialwithMapping(String dealerCode, String sid, String positionCode, int programGroupID, List<String> eligibleCodes) {
		boolean result = false;
		//ADD UPDATE DATE AND USER
		List<String> unenrollList = new ArrayList<>();
		for(String item: eligibleCodes){
			if(!positionCode.equalsIgnoreCase(item.trim())){
				unenrollList.add(item);
			}
		}
		Query query = this.em.createNativeQuery(
				"IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode='ZZ' AND ProgramGroupID =(?3) "
				+ " update GroupSIDEnrollments set [Status] = 'E', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate(), [OriginalPostionCode] = (?2) where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = 'ZZ' AND [ProgramGroupID] = (?3)"
						+ ";"+
						" update GroupSIDEnrollments set [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = 'ZZ' AND [OriginalPostionCode] IN (?4) AND [ProgramGroupID] = (?3)"
						+ " ELSE "
						+ " INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate, OriginalPostionCode) values (15, ?0, ?1, 'ZZ', 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate(), ?2)");
		
		try {
			if(positionCode.trim().isEmpty() && unenrollList.size() == 0){
				return true;
			}
			if(positionCode.trim().isEmpty() && unenrollList.size() > 0){
				query = this.em.createNativeQuery("update GroupSIDEnrollments set [Status] = 'N', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [OriginalPostionCode] IN (?4) AND [ProgramGroupID] = (?3) and PositionCode = 'ZZ'");
			}else if(unenrollList.size() == 0){
				query = this.em.createNativeQuery("IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode='ZZ' AND ProgramGroupID =(?3) "
								+ " update GroupSIDEnrollments set [Status] = 'E', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate(), [OriginalPostionCode] = ?2 where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = 'ZZ' AND [ProgramGroupID] = (?3)"
										+ ";"
										+ " ELSE "
										+ " INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate, OriginalPostionCode) values (15, ?0, ?1, 'ZZ', 'N', ?3, ?0, GetDate(), 'N', ?0, GetDate(), ?2)");
				query.setParameter(2, positionCode);
			}else{
				query.setParameter(2, positionCode);
			}
			
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			query.setParameter(3, programGroupID);
			if(unenrollList.size() > 0){
				query.setParameter(4, unenrollList);
			}
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updateSIDEnrollmentSpecialwithMapping", ex);
		}
		return result;
	}
	
	

	@Override
	@Transactional
	public boolean updateDMSID(String dealerCode, String sid, String dmsid) {
		boolean result = false;
		//ADD UPDATE DATE AND USER
		try {
			final Query query = this.em.createNativeQuery("update GroupSIDEnrollments set [DMSID] = ?2 , [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 and [SID] = ?1");
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			query.setParameter(2, dmsid);
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updateDMSID", ex);
		}
		return result;
	}

	@Override
	public boolean checkDealershipELEnrollmentStatus(String dealerCode) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("select DealerCode from ProgramGroupEnrollments where DealerCode = ?0 and DelFlag = 'N' and Status = 'E' and ProgramGroupID = 1");
			query.setParameter(0, dealerCode);			
			List<String> rows = (List<String>) query.getResultList();
			if(rows.size()>0){	
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in checkDealershipELEnrollmentStatus", ex);
		}
		return result;
	}
	
	@Override
	@Transactional
	public boolean enrollUserDefault(String dealerCode, String sid, List<String> userPositionCodes, Map<String, List<String>> eligablePositionCodes){
		boolean result = false;
		
		String q = "";
		
		Set<String> keys = eligablePositionCodes.keySet();
		for(String pc: userPositionCodes){
			for(String key: keys){
				if(eligablePositionCodes.get(key).contains(pc)){
					q = q + "IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode='" + pc + "' AND ProgramGroupID ="+ key + ") "
							+ "UPDATE GroupSIDEnrollments SET [Status] = 'Y', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = '" + pc + "' AND [ProgramGroupID] = " + key
							+" ELSE " +
							"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (1, ?0, ?1, '" + pc + "', 'N', '', ?0, GetDate(), 'N', ?0, GetDate())"
							+ "; ";
				}
			}
			
		}
		
		try {
			final Query query = this.em.createNativeQuery(q);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in enrollUserDefault", ex);
		}
		return result;
	}

	
	@Override
	@Transactional
	public boolean enrollServiceManger(String dealerCode, String sid){
		boolean result = false;
		String q = "";
		List<String> defaultPrograms = Arrays.asList("2","3","4","5","7","10","11");
		for(String key: defaultPrograms){
			q = q + "IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode='09' AND ProgramGroupID ="+ key +") "
				+ "UPDATE GroupSIDEnrollments SET [Status] = 'Y', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = '09' AND [ProgramGroupID] = " + key
				+" ELSE " +
				"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (1, ?0, ?1, '09', 'N', '', ?0, GetDate(), 'N', ?0, GetDate())"
				+ "; ";
		}
		
		try {
			final Query query = this.em.createNativeQuery(q);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in enrollServiceManger", ex);
		}
		return result;
	}
	
	@Override
	@Transactional
	public boolean enrollPartsManger(String dealerCode, String sid){
		boolean result = false;
		String q = "";
		List<String> defaultPrograms = Arrays.asList("2","3","4","10","11");
		for(String key: defaultPrograms){
			q = q + "IF EXISTS (SELECT * FROM GroupSIDEnrollments WHERE DealerCode=?0 AND SID=?1 AND PositionCode='08' AND ProgramGroupID ="+ key +") "
				+ "UPDATE GroupSIDEnrollments SET [Status] = 'Y', [DelFlag] = 'N', [UpdatedBy] = ?0 , [UpdateDate] = GetDate() where [DealerCode] = ?0 AND [SID] = ?1 AND [PositionCode] = '08' AND [ProgramGroupID] = " + key
				+" ELSE " +
				"INSERT INTO GroupSIDEnrollments (ProgramGroupID, DealerCode, SID, PositionCode, Status, DMSID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdateDate) values (1, ?0, ?1, '08', 'N', '', ?0, GetDate(), 'N', ?0, GetDate())"
				+ "; ";
		}
		
		try {
			final Query query = this.em.createNativeQuery(q);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			if(query.executeUpdate() >= 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in enrollPartsManger", ex);
		}
		return result;
	}

	@Override
	public List<ParticipantEnrollmentList> getParticipantEnrollementList(String sid) {
		List<ParticipantEnrollmentList> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " join ProgramGroups pg on pg.ProgramGroupID = gsie.ProgramGroupID" 
					+ " where gsie.SID = ?0 and gsie.Status = 'e' and gsie.DelFlag = 'n' and pg.ProgramID = 1 and pg.DelFlag = 'N'"
					+ " group by DealerCode, SID, PositionCode", ParticipantEnrollmentList.class
					);
			query.setParameter(0, sid);			
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getParticipantEnrollementList", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean isServiceManagerOfRecord(String dealerCode, String sid) {
		//List<ParticipantEnrollmentList> result = new ArrayList<>();
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " where gsie.Status = 'e' and gsie.DelFlag = 'n' and dealerCode= ?0 and ProgramGroupID IN (2,3,4,5,7,10,11) and gsie.PositionCode = '09' and gsie.SID = ?1"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<ParticipantEnrollmentList> rows = new ArrayList<>();
			rows = query.getResultList();
			if(rows != null && rows.size() == 7){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isServiceManagerOfRecord", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean isPartsManagerOfRecord(String dealerCode, String sid) {
		//List<ParticipantEnrollmentList> result = new ArrayList<>();
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " where gsie.Status = 'e' and gsie.DelFlag = 'n' and dealerCode= ?0 and ProgramGroupID IN (2,3,4,10,11) and gsie.PositionCode = '08' and gsie.SID = ?1"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<ParticipantEnrollmentList> rows = new ArrayList<>();
			rows = query.getResultList();
			if(rows != null && rows.size() == 5){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isPartsManagerOfRecord", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean isDealerPricipal(String dealerCode, String sid) {
		//List<ParticipantEnrollmentList> result = new ArrayList<>();
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " where gsie.Status = 'e' and gsie.DelFlag = 'n' and dealerCode= ?0 and ProgramGroupID IN (2,3,4,5,7,10,11) and gsie.PositionCode = '01' and gsie.SID = ?1"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<ParticipantEnrollmentList> rows = new ArrayList<>();
			rows = query.getResultList();
			if(rows != null && rows.size() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isDealerPricipal", ex);
		}
		return result;
	}

	@Override
	public boolean isELManager(String dealerCode, String sid) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " where gsie.Status = 'e' and gsie.DelFlag = 'n' and dealerCode= ?0 and ProgramGroupID = 1 and gsie.PositionCode = 'ZZ' and gsie.SID = ?1"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<ParticipantEnrollmentList> rows = new ArrayList<>();
			rows = query.getResultList();
			if(rows != null && rows.size() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isELManager", ex);
		}
		return result;
	}

	@Override
	public boolean isPCManager(String dealerCode, String sid) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " where gsie.Status = 'e' and gsie.DelFlag = 'n' and dealerCode= ?0 and ProgramGroupID = 6 and gsie.PositionCode = 'ZZ' and gsie.SID = ?1"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<ParticipantEnrollmentList> rows = new ArrayList<>();
			rows = query.getResultList();
			if(rows != null && rows.size() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isPCManager", ex);
		}
		return result;
	}
	
	@Override
	public boolean isUVMManager(String dealerCode, String sid) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "select gsie.DealerCode, gsie.SID, gsie.PositionCode from GroupSIDEnrollments gsie"
					+ " where gsie.Status = 'e' and gsie.DelFlag = 'n' and dealerCode= ?0 and ProgramGroupID = 15 and gsie.PositionCode = 'ZZ' and gsie.SID = ?1"
					);
			query.setParameter(0, dealerCode);
			query.setParameter(1, sid);
			List<ParticipantEnrollmentList> rows = new ArrayList<>();
			rows = query.getResultList();
			if(rows != null && rows.size() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in isUVMManager", ex);
		}
		return result;
	}
	

}
