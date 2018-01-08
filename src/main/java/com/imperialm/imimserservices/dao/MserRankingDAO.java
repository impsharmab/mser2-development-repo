package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.MserRankingDTO;

public interface MserRankingDAO {

	public String SELECT_BY_PARENT = "SELECT * FROM [MserRanking] where [Parent] = ?0 order by [Parent], [Child]";
	public String SELECT_BY_CHILD = "SELECT * FROM [MserRanking] where [Child] = ?0 order by [Parent], [Child]";
	
	public List<MserRankingDTO> getMserRankingByParent(String territory);
	public List<MserRankingDTO> getMserRankingByChild(String territory);
	
}
