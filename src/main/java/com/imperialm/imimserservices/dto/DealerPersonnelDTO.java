package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class DealerPersonnelDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4623749998292991270L;
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



	@Override
	public boolean equals(Object object)
	{
		boolean sameSame = false;

		if (object != null && object instanceof DealerPersonnelDTO)
		{
			if(this.SID == ((DealerPersonnelDTO) object).SID  
					&& this.PositionCode == ((DealerPersonnelDTO) object).PositionCode 
					&& this.DealerCode == ((DealerPersonnelDTO) object).DealerCode){
				sameSame = true;
			}
		}

		return sameSame;
	}


}
