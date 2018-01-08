package com.imperialm.imimserservices.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

/**
 * The persistent class for the "IncentiveSubCodes" database table.
 * 
 */
@Entity
@Table(name = "\"IncentiveSubCodes\"")
@NamedQuery(name = "IncentiveSubCodeEntity.findAll", query = "SELECT i FROM IncentiveSubCodeEntity i")
@Getter
@Setter
public class IncentiveSubCodeEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "\"IncentiveSubCodeID\"")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long incentiveSubCodeID;

	@Column(name = "\"active\"")
	private String active;

	@Column(name = "\"combo\"")
	private Long combo;

	@Column(name = "\"Description\"")
	private String description;

	@Column(name = "\"EndDate\"")
	private Date endDate;

	@Column(name = "\"imageurl\"")
	private String imageurl;

	@Column(name = "\"IncentiveID\"")
	private Long incentiveID;

	@Column(name = "\"IncentiveSubCode\"")
	private String incentiveSubCode;

	@Column(name = "\"IsDescVisible\"")
	private String isDescVisible;

	@Lob
	@Column(name = "\"notes\"")
	private String notes;

	@Column(name = "\"QuantityID\"")
	private Long quantityID;

	@Column(name = "\"StartDate\"")
	private Date startDate;

	@Transient
	private List<IncentiveRewardEntity> incentiveRewards = new ArrayList<>();

	public IncentiveSubCodeEntity() {
	}
}