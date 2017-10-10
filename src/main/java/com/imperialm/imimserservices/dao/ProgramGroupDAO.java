package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;

public interface ProgramGroupDAO {
		
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode);
	public boolean isDealerELEnrolled(String dealerCode);
	public boolean isDealerMVPEnrolled(String dealerCode);
	public boolean isDealerPCEnrolled(String dealerCode);
	

}
