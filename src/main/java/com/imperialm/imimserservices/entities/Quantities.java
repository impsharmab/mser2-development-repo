package com.imperialm.imimserservices.entities;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Quantities")
@Getter
@Setter
@NamedQueries({ @NamedQuery(name = "Quantities.findAll", query = "SELECT c FROM Quantities c") })
public class Quantities extends Audit {
	@Id
	private String quantityID;
	private String description;
	private BigDecimal value;
	@Transient
	private String quantityVal;
}
