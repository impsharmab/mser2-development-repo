package com.imperialm.imimserservices.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class DistributionInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1434178997185870242L;
	@Id private String InvoiceNumber;
	@Id private Date InvoiceDate;
	@Id private Double RewardAmount;
	@Id private String DealerCode;
	@Id private String PartNumber;
}
