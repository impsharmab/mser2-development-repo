package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class MserRankingDetailsDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6534011593720617606L;
	@Id private String Dealercode;
	private String DealerName;
	@Id private String Sid;
	private String Name;
	private Double EarningsMTD;
	private Integer BCRank;
	private Date UpdatedDate;
	private Integer DistRank;
	private Double EarningsYTD;
	private Integer BCRankYTD;
	private Integer DistRankYTD;

}
