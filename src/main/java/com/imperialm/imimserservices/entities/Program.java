/**
 * 
 */
package com.imperialm.imimserservices.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * @author Dheerajr
 *
 */
@Data
@Entity
@Table(name = "Programs")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Program {
	@Id
	private int programId = 0;
	private String name = "";
	private String code = "";
	private Date createdDate = null;
	private String createdBy = "";
	private Date updateDate = null;
	private String updatedBy = "";
	private String delFlag = "";

	public Program() {
	}

	public Program(int programId, String name, String code, Date createdDate, String createdBy, Date updateDate,
			String updatedBy, String delFlag) {
		super();
		this.programId = programId;
		this.name = name;
		this.code = code;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updateDate = updateDate;
		this.updatedBy = updatedBy;
		this.delFlag = delFlag;
	}

}
