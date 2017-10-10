package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class GroupSIDEnrollmentsDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6367812783457802839L;
	@Id private Integer GroupSIDEnrollmentID;
	private Integer ProgramGroupID;
	private String DealerCode;
	private String SID;
	private String PositionCode;
	private String Status;
	private String DMSID;
	private Date CreatedDate;
	private String CreatedBy;
	private Date UpdateDate;
	private String UpdatedBy;
	private String DelFlag;
	private String OriginalPostionCode;

}
