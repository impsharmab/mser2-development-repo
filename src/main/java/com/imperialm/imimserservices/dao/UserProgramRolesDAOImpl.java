package com.imperialm.imimserservices.dao;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

@Repository
public class UserProgramRolesDAOImpl implements UserProgramRolesDAO {

	private static Logger logger = LoggerFactory.getLogger(UserProgramRolesDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<String> getUserRoleById(String userId) {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery("select RoleID from UserProgramRoles where UserId = 't0019pn' and ProgramID = 1 and DelFlag = 'N'");
			query.setParameter(0, userId);
			List<String> rows = (List<String>) query.getResultList();
			result = rows;
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in isAdmin", ex);
		}
		return result;
	}
	
	@Override
	public String getUserRoleByIdAndPositionCode(String userId, String positionCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getUserProgramCodeById(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	@Cacheable("checkIfAdmin")
	public boolean isAdmin(String userId) {
		List<String> result = new ArrayList<String>();
		try {
			final Query query = this.em.createNativeQuery(CHECK_IF_ADMIN);
			query.setParameter(0, userId);
			query.setParameter(1, 1);
			query.setParameter(2, 3);
			List<String> rows = (List<String>) query.getResultList();
			result = rows;
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in isAdmin", ex);
		}
		if(result.size() > 0){
			return true;
		}
		return false;
	}

}
