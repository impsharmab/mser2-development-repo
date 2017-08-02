package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class ProgramGroupDTO implements Serializable {
	@Id private Integer ProgramGroupID;
	private Integer ProgramID;
	private Integer GroupID;
	private String Name;
	private String ProgramGroupCode;
	private Date CreatedDate;
	private String CreatedBy;
	private Date UpdatedDate;
	private String UpdatedBy;
	private String DelFlag;
	
}
