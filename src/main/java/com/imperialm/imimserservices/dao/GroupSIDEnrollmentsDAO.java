package com.imperialm.imimserservices.dao;

import java.util.List;
import java.util.Map;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.ParticipantEnrollmentList;

public interface GroupSIDEnrollmentsDAO {
	
	public final String GET_ENROLLMENT_BY_SID = "select * from GroupSIDEnrollments where sid = ?0 and dealerCode = ?1 and DelFlag = 'N'";
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode);
	
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsByDealerCode(String dealerCode);
	public List<GroupSIDEnrollmentsDTO> getGroupSidNonEnrollmentsByDealerCode(String dealerCode);
	public List<GroupSIDEnrollmentsDTO> getAllGroupSidEnrollmentsByDealerCode(String dealerCode);
	
	public List<String> getEnrolledPositionCodesBySIDAndProgramGoupId(String sid, String dealerCode, int programGroupId);
	public List<String> getEnrolledSIDsByDealerCode(String dealerCode);
	public List<String> getAllSIDsByDealerCode(String dealerCode);
	public String getDMSIDBySID(String sid, String dealerCode);
	
	public boolean addOverrideCode(String dealerCode, String sid, String positionCode, String dmsid);
	public boolean updateSIDEnrollment(String dealerCode, String sid, List<String> positionCode, int programGroupId, List<String> eleigibleCodes);
	public boolean updateSIDEnrollmentSpecialwithMapping(String dealerCode, String sid, String positionCode, int programGroupID, List<String> eligibleCodes);
	public boolean updateDMSID(String dealerCode, String sid, String dmsid);
	public boolean checkDealershipELEnrollmentStatus(String dealerCode);
	public boolean enrollUserDefault(String dealerCode, String sid, List<String> userPositionCodes, Map<String, List<String>> eligablePositionCodes);
	public boolean enrollServiceManger(String dealerCode, String sid);
	public boolean enrollPartsManger(String dealerCode, String sid);
	public List<ParticipantEnrollmentList> getParticipantEnrollementList(String sid);
	public boolean isServiceManagerOfRecord(String dealerCode, String sid);
	public boolean isPartsManagerOfRecord(String dealerCode, String sid);
	public boolean isDealerPricipal(String dealerCode, String sid);
	public boolean isELManager(String dealerCode, String sid);
	public boolean isPCManager(String dealerCode, String sid);
	public boolean isUVMManager(String dealerCode, String sid);
	/*public List<String> getMoparPartsEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getMagnetiMarelliEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getMVPEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getwiAdvisorMVPEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getwiAdvisorTiresEnrollmentPositionCodesBySID(String sid, String dealerCode);*/

}
