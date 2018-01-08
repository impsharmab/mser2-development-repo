package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class PayoutChartMainModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2763131497753402427L;
	
	@Id private Integer IncentiveID;
	@Id private String PositionCode;
	@Id private String IsOverrideReward;
	@Id private Integer OverridePercentage;
	@Id private Double RewardValue;
	@Id private String Description;
	@Id private String Name;
	@Id private Integer IncentiveSubCodeID;
	@Id private String ImageURL;
	@Id private Integer RewardTypeID;
	@Id private String PCName;
	
	@Transient @JsonIgnore
	List<PayoutChartMainModel> relatedRecords = new ArrayList<>();
	
	@Transient
	private String note;
	
	@Transient
	private String color;
	
	@Transient
	private String flag;
	
}
