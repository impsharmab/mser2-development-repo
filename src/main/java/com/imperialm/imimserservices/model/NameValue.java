package com.imperialm.imimserservices.model;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class NameValue implements Serializable{
	
	private static final long serialVersionUID = 3993766908572239647L;
	private String name;
	private Object value;
	
	public NameValue(){
	}
	
	public NameValue(String name, Object value){
		this.name = name;
		this.value = value;
	}
	
}