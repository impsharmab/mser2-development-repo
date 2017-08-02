package com.imperialm.imimserservices.dao;

public interface ProgramEnrollmentsDAO {
	public boolean isDealershipEnrolled(String dealerCode);
	public boolean enrollDealership(String dealerCode);
	public boolean isDealershipRecordExists(String dealerCode);
	public boolean updateDealershipEnrollment(String dealerCode);
}
