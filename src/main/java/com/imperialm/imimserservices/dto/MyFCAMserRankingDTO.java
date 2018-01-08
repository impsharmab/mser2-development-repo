package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class MyFCAMserRankingDTO implements Serializable {
	@Id private String parent;
	@Id private String child;
	@Id private double earningsMTD;
	@Id private int bCRank;
	@Id private int distRank;
	@Id private double earningsYTD;
	@Id private int bCRankYTD;
	@Id private int distRankYTD;
	
}
