package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class ProgramGroupEnrollmentsDTO implements Serializable {
	@Id private Integer ProgramGroupEnrollmentsID;
	private Integer ProgramGroupID;
	private String DealerCode;
	private String Status;
	private String defaultApproval;
	private Date CreatedDate;
	private String CreatedBy;
	private Date UpdateDate;
	private String UpdatedBy;
	private String DelFlag;
}
