package com.imperialm.imimserservices.dao;

public interface DealerInfoDAO {
	public final String GET_DEALERSHIP_NAME = "select DealerName from dealerInfo where dealerCode =?0 and TerminatedDate is null";
	public final String isELValidated = "select CAST(ISNULL(ELFlag,'N') AS VARCHAR(20)) from dealerInfo where dealerCode = ?0 and TerminatedDate is null";
	public String getDealershipName(String dealerCode);
	public boolean isELValidated(String dealerCode);
	public String getDealerSize(String dealerCode);
	public boolean isValidDealer(String dealerCode);
	public String getDealerDistrict(String dealerCode);

}
