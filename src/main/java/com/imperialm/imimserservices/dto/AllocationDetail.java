package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class AllocationDetail implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1085075071896567652L;
	
	@Id private int AllocationDetailID;
	private String SID;
	private Integer AllocationID;
	private Double Amount;
	private String StatusCode;
	private Date CreatedDate;
	private String CreatedBy;
	private Date UpdatedDate;
	private String UpdatedBy;
	private String DelFlag;

}
