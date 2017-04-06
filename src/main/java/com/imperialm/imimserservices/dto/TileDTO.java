package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class TileDTO implements Serializable {

	@Id private String parent;
	@Id private String child;
	@Id private String toggle;
	@Id private int parts;
	@Id private double earnings;
}
