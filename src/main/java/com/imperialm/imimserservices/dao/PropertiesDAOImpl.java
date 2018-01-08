package com.imperialm.imimserservices.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PropertiesDAOImpl {

	private static Logger logger = LoggerFactory.getLogger(GroupSIDEnrollmentsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public Date getPayoutDisplayDate() {
		Date result = new Date();
		try {
			final Query query = this.em.createNativeQuery("select value from properties where name = 'Payout_effective_from'");
			String date = ((List<String>)query.getResultList()).get(0);
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			result = df.parse(date);
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutDisplayDate", ex);
		}
		return result;
	}

	
}
