package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class MserRankingDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7892679874999349819L;
	@Id private String Parent;
	@Id private String Child;
	private Double EarningsMTD;
	private Integer BCRank;
	private Date UpdatedDate;
	private Integer DistRank;
	private Integer DistRankYTD;
	private Double EarningsYTD;
	private Integer BCRankYTD;
	
}
