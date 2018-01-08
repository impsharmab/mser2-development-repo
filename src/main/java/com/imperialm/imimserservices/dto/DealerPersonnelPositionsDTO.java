package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class DealerPersonnelPositionsDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8346137841964608957L;
	@Id private String code;
	@Id private String name;
	@Id private String role;
	@Id private boolean isPrimary;
	@Id private boolean isSecondary;
	@Id private String delFlag;
	@Id private String roleID;
	@Id private String InternalPosition;
}
