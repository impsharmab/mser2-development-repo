package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class ParticipantEnrollmentList implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4213114788760887971L;
	@Id private String SID;
	@Id private String DealerCode;
	@Id private String PositionCode;
}
