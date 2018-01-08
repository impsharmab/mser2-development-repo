package com.imperialm.imimserservices.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "RewardTypes")
@Getter
@Setter
@NamedQueries({ @NamedQuery(name = "RewardTypes.findAll", query = "SELECT c FROM RewardTypes c") })
public class RewardTypes extends Audit {
	@Id
	private Long rewardTypeID;
	private String description;
}
