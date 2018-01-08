package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProgramCategory {

	private String programGroup = "";
	private String incentiveSubCode = "";
	
	public ProgramCategory(){};
	
	public ProgramCategory(String programGroup, String incentiveSubCode){
		this.programGroup = programGroup;
		this.incentiveSubCode = incentiveSubCode;
	};
	
}
