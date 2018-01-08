package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class IncentivesAndSubCodes {

	private List<String> incentives = new ArrayList<>();
	private List<String> incentiveSubCodes = new ArrayList<>();
	
	public IncentivesAndSubCodes(){};
	
	public IncentivesAndSubCodes(List<String> incentives, List<String> incentiveSubCodes){
		this.incentives = incentives;
		this.incentiveSubCodes = incentiveSubCodes;
	}
	
}
