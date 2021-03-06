package com.imperialm.imimserservices.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class RedistributionHistory implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2555682719846872035L;
	
	@Id private Integer AllocationID;
	@Id private String SID;
	@Id private String FirstName;
	@Id private String LastName;
	@Id private Double Amount;
	@Id private Date UpdatedDate;
	@Id private String UpdatedBy;
	@Id private Date ExpectedPayoutDate;
	@Id private String TeamId;
	@Id private String TeamName;

}
