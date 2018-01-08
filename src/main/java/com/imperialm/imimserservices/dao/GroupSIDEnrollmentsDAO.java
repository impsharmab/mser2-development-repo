package com.imperialm.imimserservices.dao;

import java.util.List;
import java.util.Map;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentswProgramDTO;
import com.imperialm.imimserservices.dto.ParticipantEnrollmentList;
import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.EnrollmentMaintenance;
import java.util.Date;

public interface GroupSIDEnrollmentsDAO {
	
	public final String GET_ENROLLMENT_BY_SID = "select * from GroupSIDEnrollments where sid = ?0 and dealerCode = ?1 and DelFlag = 'N'";
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsBySID(String sid, String dealerCode);
	
	public List<GroupSIDEnrollmentswProgramDTO> getGroupSidEnrollmentsBySIDEnrolled(String sid);
	public List<GroupSIDEnrollmentsDTO> getGroupSidEnrollmentsByDealerCode(String dealerCode);
	public List<GroupSIDEnrollmentsDTO> getGroupSidNonEnrollmentsByDealerCode(String dealerCode);
	public List<GroupSIDEnrollmentsDTO> getAllGroupSidEnrollmentsByDealerCode(String dealerCode);
	
	public List<String> getEnrolledPositionCodesBySIDAndProgramGoupId(String sid, String dealerCode, int programGroupId);
	public List<String> getEnrolledSIDsByDealerCode(String dealerCode);
	public List<String> getAllSIDsByDealerCode(String dealerCode);
	public String getDMSIDBySID(String sid, String dealerCode);
	
	public boolean addOverrideCode(String dealerCode, String sid, String positionCode, String dmsid, UserDetailsImpl user);
	public boolean updateSIDEnrollment(String dealerCode, String sid, List<String> positionCode, int programGroupId, List<String> eleigibleCodes, UserDetailsImpl user);
	public boolean updateSIDEnrollment(String dealerCode, String sid, List<String> positionCode, int programGroupId, List<String> eleigibleCodes, UserDetailsImpl user, List<String> currentData);
	public boolean updateSIDEnrollmentSpecialwithMapping(String dealerCode, String sid, String positionCode, int programGroupID, List<String> eligibleCodes, EnrollmentMaintenance em, UserDetailsImpl user);
	public boolean updateDMSID(String dealerCode, String sid, String dmsid, UserDetailsImpl user);
	public boolean checkDealershipELEnrollmentStatus(String dealerCode);
	public boolean enrollUserDefault(String dealerCode, String sid, List<String> userPositionCodes, Map<String, List<String>> eligablePositionCodes);
	public boolean enrollServiceManger(String dealerCode, String sid);
	public boolean enrollPartsManger(String dealerCode, String sid);
	public boolean enrollInExpressLaneProgram(String dealerCode, String user);
	public List<ParticipantEnrollmentList> getParticipantEnrollementList(String sid);
	public List<ParticipantEnrollmentList> getParticipantEnrollementListIgnoreStatus(String sid);
	public boolean isServiceManagerOfRecord(String dealerCode, String sid);
	public boolean isPartsManagerOfRecord(String dealerCode, String sid);
	public boolean isDealerPricipal(String dealerCode, String sid);
	public boolean isELManager(String dealerCode, String sid);
	public boolean isPCManager(String dealerCode, String sid);
	public boolean isUVMManager(String dealerCode, String sid);
	public boolean removeOverrideCode(String dealerCode, String sid, String positionCode, String dmsid, UserDetailsImpl user);
	public boolean insertEnrollInExpressLaneProgram(String dealerCode, String user);
	public boolean isExpressLaneRecordExists(String dealerCode);
	public boolean isEnrolledParticipantExistsByDealerAndProgramGoupId(String dealerCode,int programGroupId);
	public boolean enrollUserDefault(String dealerCode, String sid, List<String> userPositionCodes, Map<String, List<String>> eligablePositionCodes, String user);
        public boolean updateEnrollmentDate(GroupSIDEnrollmentswProgramDTO sid);
        public boolean disEnroll(String dealerCode, String updatedBy);
        public boolean addOverride(String dealerCode, String sid, String userPositionCodes,
    			Map<String, List<String>> eligablePositionCodes, String user);
	/*public List<String> getMoparPartsEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getMagnetiMarelliEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getMVPEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getwiAdvisorMVPEnrollmentPositionCodesBySID(String sid, String dealerCode);
	public List<String> getwiAdvisorTiresEnrollmentPositionCodesBySID(String sid, String dealerCode);*/

}
