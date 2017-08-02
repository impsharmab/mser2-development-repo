package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.DealerPersonnelDTO;

public interface DealerPersonnelDAO {

	public final String GET_INFO_BY_SID = "select * from DealerPersonnel where SID = ?0";
	public final String GET_INFO_BY_SID_AND_DEALERCODE = "select * from DealerPersonnel where SID = ?0 and dealerCode = ?1";
	public final String GET_SID_INFO_BY_DEALERCODE = "select * from DealerPersonnel where dealerCode = ?0";
	public final String GET_MANAGERS_BY_DEALERCODE = "select * from DealerPersonnel where dealerCode = ?0 and positionCode IN ('09','08')";
	
	public List<DealerPersonnelDTO> getSIDInfoBySID(String sid);
	public List<DealerPersonnelDTO> getSIDInfoBySIDAndDealerCode(String sid, String dealerCode);
	public List<DealerPersonnelDTO> getSIDInfoByDealerCode(String dealerCode);
	public List<DealerPersonnelDTO> getManagersByDealerCode(String dealerCode);
}
