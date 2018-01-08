package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.MyFCAMserRankingDTO;

public interface MyFCAMserRankingDAO {
	public static String SELECT_BY_PARENT = "SELECT [Parent] 'parent' ,[Child] 'child' ,[EarningsMTD] 'earningsMTD' ,[BCRank] 'bCRank', [DistRank] 'distRank', [EarningsYTD] 'earningsYTD' ,[BCRankYTD] 'bCRankYTD', [DistRankYTD] 'distRankYTD' FROM [MyFCAMserRanking] where [Parent] = ?0 order by [Parent], [Child]";
	public static String SELECT_BY_CHILD = "SELECT [Parent] 'parent' ,[Child] 'child' ,[EarningsMTD] 'earningsMTD' ,[BCRank] 'bCRank', [DistRank] 'distRank', [EarningsYTD] 'earningsYTD' ,[BCRankYTD] 'bCRankYTD', [DistRankYTD] 'distRankYTD' FROM [MyFCAMserRanking] where [Child] = ?0 order by [Parent], [Child]";
	
	public List<MyFCAMserRankingDTO> getMSERDetailsGraphByParent(String territory);
	public List<MyFCAMserRankingDTO> getMSERDetailsGraphByChild(String territory);
	
}
