package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class EnrollmentMaintenance {
	
	private String dealerCode = "";
	private String sID ="";
	private String dMSID ="";
	private String myPersonalDMSID ="";
	private String name = "";
	private String email ="";
	
	private List<String> positionCodes = new ArrayList<>();
	private List<String> overriddenpositionCodes = new ArrayList<>();
	private List<String> mser = new ArrayList<>();
	private List<String> mas = new ArrayList<>();
	private List<String> mm = new ArrayList<>();
	private List<String> mvp = new ArrayList<>();
	private List<String> wiMvp = new ArrayList<>();
	private List<String> wiTires = new ArrayList<>();
	private List<String> uCon = new ArrayList<>();
	private List<String> tires = new ArrayList<>();
	
	private String pc = "";
	private String el = "";
	private String usedRecon = "";
	private List<String> usedReconP = new ArrayList<>();
	
	public EnrollmentMaintenance(){
		
	}
	
	public EnrollmentMaintenance(String dealerCode, String sid){
		this.dealerCode = dealerCode;
		this.sID = sid;
	}
	
	
	

}
