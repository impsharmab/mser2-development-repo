package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Getter @ Setter
public class TileAttribute {
	private String name ="";
	private Object value;
	private String type = "";
	private String image = "";
	private String link = "";
	private String error = "";
	
	public TileAttribute(String name, Object value, String type){
		this.name = name;
		this.value = value;
		this.type = type;
	}
	
}
