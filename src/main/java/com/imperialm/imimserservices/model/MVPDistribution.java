package com.imperialm.imimserservices.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class MVPDistribution {

	@Id private Integer ContractID;
	private Date ApproveDate;
	private String ContractNumber;
	private String VIN;
	private String PlanCode;
	private String SID;
	private Double RewardValue;
	private Date LoadDate;
	private String OriginalSID;
	@Transient
	private NameValue OriginalName;
	
	

	@Override
	public boolean equals(Object object)
	{
		boolean sameSame = false;

		if (object != null && object instanceof MVPDistribution)
		{
			if( this.ContractID == ((MVPDistribution) object).ContractID ){
				sameSame = true;
			}
		}

		return sameSame;
	}
	
}
