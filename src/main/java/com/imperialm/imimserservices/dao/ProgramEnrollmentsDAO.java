package com.imperialm.imimserservices.dao;

import java.util.Date;

public interface ProgramEnrollmentsDAO {
	public boolean isDealershipEnrolled(String dealerCode);
	public boolean enrollDealership(String dealerCode, String user);
	public boolean isDealershipRecordExists(String dealerCode);
        public boolean updateEnrollmentDateByProgramId(String dealerCode, String programId, String updatedBy, Date updateDate);
        public boolean disEnroll(String dealerCode, String updatedBy);
	//public boolean updateDealershipEnrollment(String dealerCode);
	//public boolean isAutoApprovalMVP(String dealerCode);
	//public boolean setAutoApprovalMVP(String dealerCode, boolean enroll);
}
