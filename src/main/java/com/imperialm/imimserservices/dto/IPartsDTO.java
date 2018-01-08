package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class IPartsDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8710338967947081203L;
	
	@Id private Integer IncentiveSubCodeID;
	@Id private String PartNumber;

}
