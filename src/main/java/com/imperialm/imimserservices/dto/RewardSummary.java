package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Setter @Getter
public class RewardSummary implements Serializable {

	@Id private Integer IncentiveID;
	@Id private Integer IncentiveSubCodeID;
	@Id private String Parent;
	@Id private String Child;
	@Id private Double RewardAmount;
	@Id private Date PaidDate;
	@Id private Integer Quantity;
}
