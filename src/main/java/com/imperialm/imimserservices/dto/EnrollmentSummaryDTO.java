package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class EnrollmentSummaryDTO implements Serializable {

	@Id private int EnrollmentSummaryID;
	private String Parent;
	private String Child;
	private Integer ProgramGroupID;
	private Integer TotalDealers;
	private Integer TotalEnrolled;
	private Integer ExpressLaneValidated;
	
}
