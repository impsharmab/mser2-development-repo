package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.ProgramGroupEnrollmentsDTO;

public interface ProgramGroupEnrollmentsDAO {
	public final String GET_ENROLLMENT_BY_SID = "select * from ProgramGroupEnrollments where dealerCode = ?0";
	public List<ProgramGroupEnrollmentsDTO> getProgramGroupEnrollmentsByDealerCode(String dealerCode);
	public boolean enrollDealership(String dealerCode, int programId);
	public boolean isDealershipEnrolledByProgramGroup(String dealerCode, int programgroup);
	public boolean isAutoApprovalMVP(String dealerCode);
	public boolean setAutoApprovalMVP(String dealerCode, boolean enroll);
	//public boolean enrollDealership(String dealerCode, List<Integer> programIds);

}
