package com.imperialm.imimserservices.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Setter @Getter
public class TwoStringItems implements Serializable {
	public TwoStringItems(){
		
	}
	
	public TwoStringItems(String item1, String item2) {
		this.item1 = item1;
		this.item2 = item2;
	}
	@Id private String item1;
	@Id private String item2;
}
