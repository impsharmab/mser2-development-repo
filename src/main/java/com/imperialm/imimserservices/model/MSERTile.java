package com.imperialm.imimserservices.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MSERTile {

	private String name ="";
	private Object value;
	private String type = "";
	private String tileName = "";
	private String tileHeaderImage = "";
	
	public MSERTile(String name, Object value, String type){
		this.name = name;
		this.value = value;
		this.type = type;
	}
	
	public MSERTile(String name, Object value, String type, String tileName, String tileHeaderImage){
		this.name = name;
		this.value = value;
		this.type = type;
		this.tileName = tileName;
		this.tileHeaderImage = tileHeaderImage;
	}
}
