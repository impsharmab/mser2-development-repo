package com.imperialm.imimserservices.entities;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * The persistent class for the "IncentiveRewards" database table.
 * 
 */
@Entity
@Table(name = "\"IncentiveRewards\"")
@NamedQuery(name = "IncentiveRewardEntity.findAll", query = "SELECT i FROM IncentiveRewardEntity i")
@Getter
@Setter
public class IncentiveRewardEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "\"IncentiveRewardID\"")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long incentiveRewardID;

	@Column(name = "\"IncentiveID\"")
	private Long incentiveID;

	@Column(name = "\"IncentiveSubCodeID\"")
	private Long incentiveSubCodeID;

	@Column(name = "\"IsOverrideReward\"")
	private String isOverrideReward;

	@Column(name = "\"laborType\"")
	private String laborType;

	@Column(name = "\"OverridePercentage\"")
	private Long overridePercentage;

	@Column(name = "\"PositionCode\"")
	private String positionCode;

	@Column(name = "\"RewardTypeID\"")
	private Long rewardTypeID;

	@Column(name = "\"RewardValue\"")
	private BigDecimal rewardValue;

	public IncentiveRewardEntity() {
	}
}