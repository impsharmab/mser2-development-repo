package com.imperialm.imimserservices.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class BaseDao {

	Log logger = LogFactory.getLog(BaseDao.class);

	@PersistenceContext
	protected EntityManager em;

	public <T extends Object> T saveEntity(T entity) {
		try {
			em.persist(entity);
		} catch (Exception e) {
			logger.error(e);
			return null;
		}
		return entity;
	}
	
	public <T extends Object> T removeEntity(T entity) {
		try {
			em.remove(entity);
		} catch (Exception e) {
			logger.error(e);
			return null;
		}
		return entity;
	}
	
}
