package com.imperialm.imimserservices.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "EligiblePositions")
@Getter
@Setter
@NamedQueries({ @NamedQuery(name = "EligiblePositions.findAll", query = "SELECT c FROM EligiblePositions c"),
		@NamedQuery(name = "EligiblePositions.findByProgramGroupAndStatusCode", query = "SELECT c FROM EligiblePositions c WHERE programGroupID=:programGroupID AND statusCode=:statusCode ORDER BY programGroupID") })
public class EligiblePositions {
	@Id
	private Long eligiblePositionsID;
	private Long programGroupID;
	private String positionCode;
	private String statusCode;
}
