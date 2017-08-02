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

import com.imperialm.imimserservices.dto.GroupTeamsDTO;

@Repository
public class GroupTeamsDAOImpl implements GroupTeamsDAO {
	
	private static Logger logger = LoggerFactory.getLogger(GroupTeamsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<GroupTeamsDTO> getGroupTeamsByDealerCode(String dealerCode) {
		List<GroupTeamsDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery(SELECT_BY_DEALERCODE, GroupTeamsDTO.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getGroupTeamsByDealerCode", ex);
		}
		return result;
	}

	@Override
	@Transactional
	public boolean updateGroupTeamsById(GroupTeamsDTO row) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("update GroupTeams set [TeamID] = ?1 , [TeamName] = ?4, [ProgramGroupID] = ?3 ,[UpdatedDate] = GetDate(), [UpdatedBy] = ?2  where [GroupTeamID] = ?0");
			query.setParameter(0, row.getGroupTeamID());
			query.setParameter(1, row.getTeamID());
			query.setParameter(2, row.getUpdatedBy());
			query.setParameter(3, row.getProgramGroupID());
			query.setParameter(4, row.getTeamName());
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in updateGroupTeamsById", ex);
		}
		return result;
	}

	@Override
	@Transactional
	public boolean deleteGroupTeamsById(int id, String user) {
		boolean result = false;
		//ADD UPDATE DATE AND USER
		try {
			final Query query = this.em.createNativeQuery("update GroupTeams set [DelFlag] = 'Y', [UpdatedBy] = ?1 , [UpdatedDate] = GetDate() where [GroupTeamID] = (?0)");
			query.setParameter(0, id);
			query.setParameter(1, user);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in deleteGroupTeamsById", ex);
		}
		return result;
	}

	@Override
	@Transactional
	public boolean addGroupTeamsByDealerCode(GroupTeamsDTO row) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("INSERT INTO GroupTeams (DealerCode, TeamID, TeamName, ProgramGroupID, CreatedBy, CreatedDate, DelFlag, UpdatedBy , UpdatedDate) values (?0, ?1, ?2, ?3, ?4, GetDate(), 'N', ?4, GetDate())");
			query.setParameter(0, row.getDealerCode());
			query.setParameter(1, row.getTeamID());
			query.setParameter(2, row.getTeamName());
			query.setParameter(3, row.getProgramGroupID());
			query.setParameter(4, row.getCreatedBy());
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in addGroupTeamsByDealerCode", ex);
		}
		return result;
	}
	
}
