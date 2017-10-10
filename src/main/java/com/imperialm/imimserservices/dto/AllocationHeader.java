package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class AllocationHeader implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4128765216941757897L;
	@Id private int AllocationID;
	private String TeamId;
	private String DealerCode;
	private String StatusCode;
	private Integer RewardAllocHeaderID;
	private Date CreatedDate;
	private String CreatedBy;
	private Date UpdatedDate;
	private String UpdatedBy;
	private String DelFlag;
	private Integer IncentiveID;
	private Integer IncentiveSubCodeID;
	
	
}
