package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class PartsLookupDTO implements Serializable {

	@Id private String partNumber;
	@Id private String catagoryCode;
	@Id private String catagoryName;
	@Id private Date startDate;
	@Id private Date endDate;
	@Id private double rewardAmount;
	
}
