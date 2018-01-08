package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MSERRegistrationForm {
	
	private String dealerCode;
	private String sid;
	private String email;
	private String phone;
	private String managerP;
	private String managerPEmail;
	private String managerS;
	private String managerSEmail;
	private boolean enrollPartsCounter;
	private boolean enrollUsedRecon;
	private boolean enrollExpressLane;
	private boolean mvpAuto;
	private String extension;
}
