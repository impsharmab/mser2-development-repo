package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class MyFCAMserRankingDetailsDTO implements Serializable {

	@Id private String dealerCode;
	@Id private String dealerName;
	@Id private String sID;
	@Id private double earningsMTD;
	@Id private int bCRank;
	@Id private int distRank;
	@Id private double earningsYTD;
	@Id private int bCRankYTD;
	@Id private int distRankYTD;
}
