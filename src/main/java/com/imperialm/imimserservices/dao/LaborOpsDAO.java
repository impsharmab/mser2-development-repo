package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.LaborOpsDTO;

public interface LaborOpsDAO {

	public static final String SELECT_BY_DEALERCODE = "SELECT [ID] 'id' ,[DealerCode] 'dealerCode' ,[OpCode] 'opCode', [Source] 'source', [CreatedDate] 'createdDate', [CreatedBy] 'createdBy' FROM [dbo].[LaborOps] where DealerCode IN (?0) AND DelFlag = 'N'";
	
	public List<LaborOpsDTO> getOpCodeByDealer(List<String> dealerCode);
	public boolean updateOpCodeById(LaborOpsDTO row);
	public boolean deleteOpCodeById(int id);
	public boolean addOpCodeByDealerCode(LaborOpsDTO row);
}
