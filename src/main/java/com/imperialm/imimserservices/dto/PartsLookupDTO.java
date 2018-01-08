package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class PartsLookupDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5715441430540695802L;
	@Id private String PartNumber;
	@Id private String IncentiveSubCode;
	@Id private String Description;
	@Id private Date StartDate;
	@Id private Date EndDate;
	@Id private double RewardValue;
	@Id private String Manufacturer;
	
}
