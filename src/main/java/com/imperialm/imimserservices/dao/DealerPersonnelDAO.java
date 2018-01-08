package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTOWithEmail;

public interface DealerPersonnelDAO {

	public final String GET_INFO_BY_SID = "select * from DealerPersonnel where SID = ?0";
	public final String GET_INFO_BY_SID_AND_DEALERCODE = "select * from DealerPersonnel where SID = ?0 and dealerCode = ?1";
	public final String GET_INFO_BY_LIST_SIDS_AND_DEALERCODE = "select * from DealerPersonnel where SID IN (?0) and dealerCode = ?1";
	public final String GET_SID_INFO_BY_DEALERCODE = "select * from DealerPersonnel where dealerCode = ?0";
	public final String GET_SID_INFO_BY_DEALERCODE_WITH_EMAIL = "select dp.*, u.Email from DealerPersonnel dp left join users u on dp.sid = u.userId where dp.dealerCode = ?0";
	public final String GET_MANAGERS_BY_DEALERCODE = "select * from DealerPersonnel where dealerCode = ?0 and positionCode IN ('09','08')";
	public final String GET_SID_BY_DEALERCODE_AND_POSITIONCODE = "select * from DealerPersonnel where dealerCode = ?0 and positionCode = ?1";
	public final String GET_SID_BY_DEALERCODE_AND_POSITIONCODE_LIST = "select * from DealerPersonnel where dealerCode = ?0 and positionCode IN (?1)";
	public final String GET_PARTICIPANTS_ENROLLED_IN_PROGRAM = "Select * from [DealerPersonnel] where SID in (SELECT m.SID FROM [DealerPersonnel] m, GroupSIDEnrollments h where m.SID = h.SID and m.DealerCode = h.DealerCode and h.ProgramGroupID = (?1) and h.Status = 'E' and m.DealerCode = ?0 and h.DelFlag = 'N') and DealerCode = ?0";
	public final String GET_DEALER_BY_TERRITORY = "select [CHILD] from [DealersByTerritory](?0)";
	
	public List<DealerPersonnelDTO> getSIDInfoBySID(String sid);
	public List<DealerPersonnelDTO> getSIDInfoBySIDAndDealerCode(String sid, String dealerCode);
	public List<DealerPersonnelDTO> getSIDInfoBySIDAndDealerCode(List<String> sids, String dealerCode);
	public List<DealerPersonnelDTO> getSIDInfoByDealerCode(String dealerCode);
	public List<DealerPersonnelDTOWithEmail> getSIDInfoByDealerCodeWithEmail(String dealerCode);
	public List<DealerPersonnelDTO> getManagersByDealerCode(String dealerCode);
	public List<DealerPersonnelDTO> getSIDByDealerCodeAndPositionCode(String dealerCode, String positionCode);
	public List<DealerPersonnelDTO> getSIDByDealerCodeAndPositionCode(String dealerCode, List<String> positionCode);
	public List<DealerPersonnelDTO> getParticipantsEnrolledByProgramGroupByDealerCode(String dealerCode, int programGroupId);
	public List<DealerPersonnelDTO> getParticipantsEnrolledByProgramGroupByDealerCodeForDistributions(String dealerCode, int programGroupId);
	public List<DealerPersonnelDTO> getParticipantsEnrolledByDealerCodeForDistributions(String dealerCode);
	public List<String> getDealerByTerritory(String territory);
	public List<String> getParticipantsByDealerList(List<String> dealers);
	public List<String> getParticipantsNATList();
	public boolean mvpApprovalByDealerAndSID(String dealerCode, String sid);
}
