package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class IncentiveSubCodesDTO implements Serializable{

	@Id private int IncentiveSubCodeID;
	@Id private Integer IncentiveID;
	private String IncentiveSubCode;
	private String Description;
	private Integer QuantityID;
	private Date StartDate;
	private Date EndDate;
	private String active;
	@Lob private String notes;
	private String imageurl;
	private Integer combo;
	private String IsDescVisible;
	
}
