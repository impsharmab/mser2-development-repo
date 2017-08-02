package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;

public interface ProgramGroupDAO {
	
	public final String GET_ENROLLMENT_BY_SID = "select * from GroupSIDEnrollments where sid = ?0 and dealerCode = ?1";
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode);

}
