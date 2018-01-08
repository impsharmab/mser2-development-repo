package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter @Table(name = "GroupSIDEnrollments")
public class GroupSIDEnrollmentsDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6367812783457802839L;
	@Id private Integer GroupSIDEnrollmentID;
	@Id private Integer ProgramGroupID;
	@Id private String DealerCode;
	@Id private String SID;
	@Id private String PositionCode;
	@Id private String Status;
	@Id private String DMSID;
	@Id private Date CreatedDate;
	@Id private String CreatedBy;
	@Id private Date UpdateDate;
	@Id private String UpdatedBy;
	@Id private String DelFlag;
	@Id private String OriginalPostionCode;
        // private String DealerName = "";

}
