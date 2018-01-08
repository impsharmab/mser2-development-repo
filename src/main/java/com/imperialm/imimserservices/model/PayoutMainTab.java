package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PayoutMainTab {
	private String tap;
	private String positionCode;
	private List<PayoutProgram> programs = new ArrayList<>();
	
	public PayoutMainTab(String tap, String positionCode, List<PayoutProgram> programs){
		this.tap = tap;
		this.positionCode = positionCode;
		this.programs = programs;
	}
	

}
