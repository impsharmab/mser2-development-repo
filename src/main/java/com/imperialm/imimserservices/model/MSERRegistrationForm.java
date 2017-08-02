package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MSERRegistrationForm {
	
	private String dealerCode;
	private String sID;
	private String dealershipName;
	private String dealerPrincipal;
	private String email;
	private String phone;
	private String managerPC;
	private String managerEmail;
	private boolean enrollPartsCounter;
	private boolean enrollUsedRecon;
	private boolean enrollExpressLane;
}
