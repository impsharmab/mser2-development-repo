package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;

public interface GroupSIDEnrollmentsDAO {
	
	public final String GET_ENROLLMENT_BY_SID = "select * from GroupSIDEnrollments where sid = ?0 and dealerCode = ?1 and DelFlag = 'N'";
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode);
	
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsByDealerCode(String dealerCode);
	
	public List<String> getEnrolledPositionCodesBySIDAndProgramGoupId(String sid, String dealerCode, int programGroupId);
	public List<String> getEnrolledSIDsByDealerCode(String dealerCode);
	public String getDMSIDBySID(String sid, String dealerCode);
	
	public boolean addOverrideCode(String dealerCode, String sid, String positionCode, String dmsid);
	public boolean updateSIDEnrollment(String dealerCode, String sid, List<String> positionCode, int programGroupId, List<String> eleigibleCodes);
	public boolean updateDMSID(String dealerCode, String sid, String dmsid);
	/*public List<String> getMoparPartsEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getMagnetiMarelliEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getMVPEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getwiAdvisorMVPEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getwiAdvisorTiresEnrollmentPositionCodesBySID(String sid, String dealerCode);*/

}
