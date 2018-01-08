package com.imperialm.imimserservices.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class EligiblePositionsView {
	@Id
	private String positionCode;
	@Column(name = "descirption")
	@Getter(value = AccessLevel.NONE)
	private String description;

	public String getDescription() {
		return description.concat(" (").concat(positionCode).concat(")");
	}
}
