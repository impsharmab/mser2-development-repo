package com.imperialm.imimserservices.entities;

import java.util.Date;

import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class Audit {
	private Date createdDate;
	private String createdBy;
	private Date updateDate;
	private String updatedBy;
	private String delFlag;
}
