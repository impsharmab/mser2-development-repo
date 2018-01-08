package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter @Entity
public class DealerPersonnelDTOWithEmail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 288595985079764694L;
	@Id private String DealerCode;
	@Id private String SID;
	@Id private String PositionCode;
	private String isPrimaryPosition;
	private String IsPrimaryDealer;
	private String FirstName;
	private String LastName;
	private String MiddleName;
	private String Suffix;
	private String Address;
	private String City;
	private String STATE;
	private String ZipCode;
	private String Last4;
	private String DMS_ID;
	private Date DealerHireDate;
	private Date CorpHireDate;
	private String Email;



	@Override
	public boolean equals(Object object)
	{
		boolean sameSame = false;

		if (object != null && object instanceof DealerPersonnelDTOWithEmail)
		{
			if(this.SID == ((DealerPersonnelDTOWithEmail) object).SID  
					&& this.PositionCode == ((DealerPersonnelDTOWithEmail) object).PositionCode 
					&& this.DealerCode == ((DealerPersonnelDTOWithEmail) object).DealerCode){
				sameSame = true;
			}
		}

		return sameSame;
	}

	
}
