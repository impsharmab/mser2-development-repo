package com.imperialm.imimserservices.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @ Setter
public class TileAttribute1 {
	private String name;
	private String value;
	private String type;
	private String badgeUrl = "";
	private String badgeTitle = "";
	
	@JsonProperty("Order")
	private String Order;
}
