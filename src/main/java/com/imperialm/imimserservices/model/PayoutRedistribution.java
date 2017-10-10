package com.imperialm.imimserservices.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class PayoutRedistribution implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7367182469337442102L;
	@Id private String SID;
	@Id private Integer RewardAllocHeaderId;
	@Id private String RONumber ="";
	@Id private String PartNumber ="";
	@Id private Integer LaborSeq;
	@Id private Integer PartSeq;
	@Id private Integer Quantity;
	@Id private String StatusCode;
	@Id private Date RewardDate;
	@Id private Double RewardAmount;
	@Id private Integer AllocationId;
	@Id private String Description;
	@Id private Integer IncentiveID;

}
