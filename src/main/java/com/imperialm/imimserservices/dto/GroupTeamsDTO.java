package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class GroupTeamsDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2243429323160227565L;
	@JsonProperty("GroupTeamID") @Id private int GroupTeamID;
	@JsonProperty("ProgramGroupID") private int ProgramGroupID;
	@JsonProperty("DealerCode") private String DealerCode;
	@JsonProperty("TeamID") private String TeamID;
	@JsonProperty("TeamName") private String TeamName;
	@JsonProperty("CreatedDate") private Date CreatedDate;
	@JsonProperty("CreatedBy") private String CreatedBy;
	@JsonProperty("UpdatedDate") private Date UpdatedDate;
	@JsonProperty("UpdatedBy") private String UpdatedBy;
	@JsonProperty("DelFlag") private String DelFlag;
}
