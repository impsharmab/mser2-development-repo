package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.TwoStringItems;

public interface ProgramGroupDAO {
        public final String POSITIONGROUPS_WITH_NAMES = "SELECT [ProgramGroupID] 'item1', [Name] 'item2' FROM [ProgramGroups] where DelFlag = 'N' order by [ProgramGroupID]";
	public List<TwoStringItems> getRewardDepositReportProgramList();
	public List<TwoStringItems> getSummaryRepairOrdersReportProgramList();
        public List<TwoStringItems> getProgramGroups();

}
