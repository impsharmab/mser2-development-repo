package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.MyFCAMserRankingDetailsDTO;

public interface MyFCAMserRankingDetailsDAO {

public static String SELECT_BY_SID = "SELECT [Dealercode] 'dealerCode' ,[DealerName] 'dealername' ,[Sid] 'sid' ,[Name] 'name' ,[EarningsMTD] 'earningsMTD' ,[BCRank] 'bCRank', [DistRank] 'distRank',[EarningsYTD] 'earningsYTD' ,[BCRankYTD] 'bCRankYTD', [DistRankYTD] 'distRankYTD' FROM [MyFCAMserRankingDetails] where [Sid] = ?0 AND [DealerCode]= ?1";
public static String SELECT_SUM_BY_SID = "SELECT [Dealercode] 'dealerCode' ,'' as 'dealername' ,[Sid] 'sid' ,'' as 'name' , SUM([EarningsMTD]) 'earningsMTD' ,''as 'bCRank', [DistRank] 'distRank' ,[EarningsYTD] 'earningsYTD' ,[BCRankYTD] 'bCRankYTD', [DistRankYTD] 'distRankYTD' FROM [MyFCAMserRankingDetails] where [Sid] = ?0 AND [DealerCode]= ?1 group by [Sid], [DealerCode]";
	
	public List<MyFCAMserRankingDetailsDTO> getMSERDetailsBySID(String territory, String dealerCode);
	public List<MyFCAMserRankingDetailsDTO> getMSERDetailsSUMBySID(String territory, String dealerCode);
	
}
