package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.ProgramGroupEnrollmentsDTO;
import com.imperialm.imimserservices.dto.UserDetailsImpl;

public interface ProgramGroupEnrollmentsDAO {
	public final String GET_ENROLLMENT_BY_CODE_BASEPROGRAM = "select * from ProgramGroupEnrollments where dealerCode = ?0 AND ProgramGroupID = 5";
	public List<ProgramGroupEnrollmentsDTO> getProgramGroupEnrollmentsByDealerCode(String dealerCode);
	public boolean enrollDealership(String dealerCode, int programId, String user);
	public boolean isDealershipEnrolledByProgramGroup(String dealerCode, int programgroup);
	public boolean isAutoApprovalMVP(String dealerCode);
	public boolean setAutoApprovalMVP(String dealerCode, boolean enroll, String user);
        public boolean updateEnrollmentDate(ProgramGroupEnrollmentsDTO enrollment);
        public boolean disEnroll(String dealerCode, String updatedBy);
	//public boolean enrollDealership(String dealerCode, List<Integer> programIds);

}
