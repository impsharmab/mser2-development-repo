package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.model.TwoStringItems;

public interface DealerPersonnelPositionsDAO {

	public final String GET_ROLE_BY_POSITIONCODE = "SELECT [RoleID] FROM [DealerPersonnelPositions] where [PositionCode] = ?0 AND DelFlag = 'N'";
	public final String CHECK_POSITIONCODE = "SELECT [PositionCode] FROM [DealerPersonnelPositions] where [PositionCode] = ?0 AND DelFlag = 'N' order by [PositionCode]";
	public final String POSITIONCODES = "SELECT [PositionCode] FROM [DealerPersonnelPositions] where DelFlag = 'N' order by [PositionCode]";
	public final String POSITIONCODES_WITH_NAMES = "SELECT [PositionCode] 'item1', [Name] 'item2' FROM [DealerPersonnelPositions] where DelFlag = 'N' order by [PositionCode]";
	//THIS IS FROM DEALERINFO
	public final String CHECK_DEALERCODE = "SELECT [DealerCode] FROM [DealerInfo] where [DealerCode] = ?0 and DelFlag = 'N'";
	public final String GET_DEALER_PRINCIPAL = "SELECT [SID] FROM [DealerPersonnel] where [DealerCode] = ?0 and [PositionCode] = '01'";
	public final String REGISTRATION_DEALER_CHECK = "SELECT [SID] FROM [DealerPersonnel] where [SID] = ?0 and [DealerCode] = ?1 and [PositionCode] IN ('01','08','09','17','32','33','35')";
	public final String GET_DISTRICTS_BY_BC = "select Child from Hierarchy where Parent = ?0 and Programid = 1";
	public boolean isRegistrationEligiable(String sid, String dealerCode);
	public int getRoleByPositionCode(String positionCode);
	public boolean checkPositionCode(String positionCode);
	public List<String> getAllPositionCodes();
	public boolean isValidDealer(String dealerCode);
	public List<String> getDealerPricipal(String dealerCode);
	public List<TwoStringItems> getAllPositionCodesWithNames();
	public List<String> getDistrictsByBC(String bc);
	public List<String> getEnrollmentPCs();
}
