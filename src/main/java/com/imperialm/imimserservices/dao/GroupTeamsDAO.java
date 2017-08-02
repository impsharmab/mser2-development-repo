package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.GroupTeamsDTO;
public interface GroupTeamsDAO {

	public static final String SELECT_BY_DEALERCODE = "SELECT * FROM [dbo].[GroupTeams] where DealerCode = ?0 AND DelFlag = 'N'";
	
	public List<GroupTeamsDTO> getGroupTeamsByDealerCode(String dealerCode);
	public boolean updateGroupTeamsById(GroupTeamsDTO row);
	public boolean deleteGroupTeamsById(int id, String user);
	public boolean addGroupTeamsByDealerCode(GroupTeamsDTO row);
	
}
