package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.LaborOpsDTO;

public interface LaborOpsDAO {

	public static final String SELECT_BY_DEALERCODE_AND_USERID = "SELECT [LaborOpsID] 'id' ,[DealerCode] 'dealerCode' ,[OpCode] 'opCode', [Source] 'source', [CreatedDate] 'createdDate', [CreatedBy] 'createdBy', [UpdatedDate] 'updatedDate', [UpdatedBy] 'updatedBy' FROM [dbo].[LaborOps] where DealerCode = ?0 AND DelFlag = 'N' AND Source = 'USER'";
	public static final String SELECT_INACTIVE_BY_DEALERCODE_AND_USERID = "SELECT [LaborOpsID] 'id' ,[DealerCode] 'dealerCode' ,[OpCode] 'opCode', [Source] 'source', [CreatedDate] 'createdDate', [CreatedBy] 'createdBy', [UpdatedDate] 'updatedDate', [UpdatedBy] 'updatedBy' FROM [dbo].[LaborOps] where DealerCode = ?0 AND DelFlag = 'Y' AND Source = 'USER'";
	
	public List<LaborOpsDTO> getOpCodeByDealer(String dealerCode, String userId);
	public List<LaborOpsDTO> getInactiveOpCodeByDealer(String dealerCode, String userId);
	public boolean updateOpCodeById(LaborOpsDTO row);
	public boolean deleteOpCodeById(int id, String user);
	public boolean undeleteOpCodeById(int id, String user);
	public boolean addOpCodeByDealerCode(LaborOpsDTO row);
}
