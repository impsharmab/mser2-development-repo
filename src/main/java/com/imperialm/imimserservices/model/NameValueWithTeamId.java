package com.imperialm.imimserservices.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NameValueWithTeamId implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3718286031590621625L;
	private String name;
	private Object value;
	private String teamId = null;
	
	public NameValueWithTeamId(){
	}
	
	public NameValueWithTeamId(String name, Object value){
		this.name = name;
		this.value = value;
	}
	
	public NameValueWithTeamId(String name, Object value, String teamId){
		this.name = name;
		this.value = value;
		this.teamId = teamId;
	}

}
