package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Setter @Getter
public class PCEligibleROPartsDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 8040316120112977856L;
	private String DealerCode; //@Id
	private String InvoiceNumber; //@Id
	private Date InvoiceDate; //@Id
	private String PartNumber; //@Id
	private String InvoiceLineNumber; //@id
	private double RewardAmount;
	private String StatusCode;
	private Integer AllocationId;
	private String BatchId;
	private Date PaidDate;
	private String RewardID;
	private String CategoryCode;
	@Id private int ID;
	private int Quantity; //@Id
	private double RewardPerUnit;
	private String ReprocessedFlag;
	private Date LoadDate;
	private String ApprovedDate;
	private Integer IncentiveID;
	private Integer IncentiveSubCodeID;
}
