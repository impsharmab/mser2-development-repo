package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import com.imperialm.imimserservices.dto.DealerPersonnelDTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PayoutElement {
	private String name;
	private Double value;
	private Integer incentiveSubCodeId;
	private List<String> labels = new ArrayList<>();
	private List<String> parts = new ArrayList<>();


	public PayoutElement(String name, Double value, List<String> parts, Integer incentiveSubCodeId){
		this.name = name;
		this.value = value;
		this.parts = parts;
		this.incentiveSubCodeId = incentiveSubCodeId;
	}

	public PayoutElement(String name, Double value, List<String> parts){
		this.name = name;
		this.value = value;
		this.parts = parts;
	}

	public PayoutElement(String name, Double value){
		this.name = name;
		this.value = value;
	}

	public PayoutElement(String name, Double value, Integer incentiveSubCodeId){
		this.name = name;
		this.value = value;
		this.incentiveSubCodeId = incentiveSubCodeId;
	}

	public void addParts(String name){
		this.parts.add(name);
	}

	public void addLabels(String label){
		this.labels.add(label);
	}


	@Override
	public boolean equals(Object object)
	{
		boolean sameSame = false;

		if (object != null && object instanceof PayoutElement)
		{
			if(this.name.equals(((PayoutElement) object).name)){
				if(this.name.equals(((PayoutElement) object).name)){
					if(this.incentiveSubCodeId == null && ((PayoutElement) object).incentiveSubCodeId == null){
						sameSame = true;
					}else if(this.incentiveSubCodeId != null && ((PayoutElement) object).incentiveSubCodeId != null){
						if(this.incentiveSubCodeId.equals(((PayoutElement) object).incentiveSubCodeId)){
							sameSame = true;
						}
					}
				}
			}
		}

		return sameSame;
	}

}
