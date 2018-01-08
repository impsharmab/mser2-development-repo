package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ExpressLaneDistribution {

	private String name;
	private Object value;
	private String teamId;
	
	
	public ExpressLaneDistribution(){
	}
	
	public ExpressLaneDistribution(String name, Object value, String teamId){
		this.name = name;
		this.value = value;
		this.teamId = teamId;
	}
	
}
