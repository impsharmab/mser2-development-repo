package com.imperialm.imimserservices.dao;

import java.io.Serializable;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

@Entity @Setter @Getter
public class UserPositionCodeDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7565168516955116473L;
	private String dealerCode;
	private String sID;
	private String positionCode;
}
