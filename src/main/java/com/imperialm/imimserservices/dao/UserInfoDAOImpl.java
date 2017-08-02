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

import com.imperialm.imimserservices.dto.UserInfoDTO;

@Repository
public class UserInfoDAOImpl implements UserInfoDAO {

	private static Logger logger = LoggerFactory.getLogger(UserInfoDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<UserInfoDTO> getUserInfo(String userId) {
		List<UserInfoDTO> result = new ArrayList<UserInfoDTO>();
		try {
			final Query query = this.em.createNativeQuery(GET_USERINFO, UserInfoDTO.class);
			query.setParameter(1, userId);
			query.setParameter(2, userId);
			List<UserInfoDTO> rows = query.getResultList();
			result = rows;
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getUserInfo", ex);
		}
		return result;
	}
	
	@Transactional
	public boolean addUser(String userId, String email, String password, String salt){
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("INSERT INTO dbo.Users (UserId, Email, HashPass, Salt, CreatedDate, DelFlag, UpdatedBy , UpdatedDate, SendEmail, SendText, Name, CreatedBy) values (?0, ?1, HASHBYTES('SHA2_512', cast(?2  as varchar(64))) , ?3, GetDate(), 'N', ?0, GetDate(),'N','N','','WEB')");
			query.setParameter(0, userId);
			query.setParameter(1, email);
			query.setParameter(2, password);
			query.setParameter(3, salt);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in addUser", ex);
		}
		return result;
	}

	
	
}
