package com.imperialm.imimserservices.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;

@Repository
public class ProgramGroupDAOImpl implements ProgramGroupDAO {

	private static Logger logger = LoggerFactory.getLogger(ProgramGroupDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isDealerELEnrolled(String dealerCode) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isDealerMVPEnrolled(String dealerCode) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isDealerPCEnrolled(String dealerCode) {
		// TODO Auto-generated method stub
		return false;
	}

}
