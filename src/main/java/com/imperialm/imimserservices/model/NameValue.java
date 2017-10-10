package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class NameValue{
	
	private String name;
	private Object value;
	
	public NameValue(){
	}
	
	public NameValue(String name, Object value){
		this.name = name;
		this.value = value;
	}
	
}