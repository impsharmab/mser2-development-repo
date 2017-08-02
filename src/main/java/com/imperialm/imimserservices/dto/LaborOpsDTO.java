package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class LaborOpsDTO implements Serializable{

	@Id private int iD;
	private String dealerCode;
	private String opCode;
	private String source;
	private Date createdDate;
	private String createdBy;
	private Date updatedDate;
	private String updatedBy;
	//private String delFlag;
}
