package com.imperialm.imimserservices.model;

import java.util.List;

import com.imperialm.imimserservices.dto.GroupSIDEnrollmentsDTO;
import com.imperialm.imimserservices.dto.GroupSIDEnrollmentswProgramDTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserMaintenance {

	private String userId;
	private String name;
	private List<GroupSIDEnrollmentswProgramDTO> enrollment;
	
}
