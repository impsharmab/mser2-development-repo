package com.imperialm.imimserservices.dao;

public interface DealerInfoDAO {
	public final String GET_DEALERSHIP_NAME = "select DealerName from dealerInfo where dealerCode =?0";
	public String getDealershipName(String dealerCode);

}
