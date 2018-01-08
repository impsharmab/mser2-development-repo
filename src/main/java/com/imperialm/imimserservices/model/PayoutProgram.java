package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PayoutProgram {
	private int id = 0;
	private String image = "";
	private String name;
	private String managerLabel = "";
	private String firstLegend ="";
	private Integer incentiveId;
	private ArrayList<String> labels = new ArrayList<>();
	private ArrayList<Integer> legendsCodes = new ArrayList<>();
	private ArrayList<String> legends = new ArrayList<>();
	private List<PayoutElement> payouts = new ArrayList<>();

	public PayoutProgram(int id, String image, String name, String managerLabel, String firstLegend, List<PayoutElement> payouts){
		this.id = id;
		this.image = image;
		this.name = name;
		this.managerLabel = managerLabel;
		this.firstLegend = firstLegend;
		this.payouts = payouts;
	}

	public PayoutProgram(String image, String name, String managerLabel, String firstLegend, List<PayoutElement> payouts){
		this.image = image;
		this.name = name;
		this.managerLabel = managerLabel;
		this.firstLegend = firstLegend;
		this.payouts = payouts;
	}

	public PayoutProgram(String name, String managerLabel, String firstLegend, List<PayoutElement> payouts){
		this.name = name;
		this.managerLabel = managerLabel;
		this.firstLegend = firstLegend;
		this.payouts = payouts;
	}

	public PayoutProgram(String name, String managerLabel, String firstLegend){
		this.name = name;
		this.managerLabel = managerLabel;
		this.firstLegend = firstLegend;
	}

	public PayoutProgram(String name){
		this.name = name;
	}

	public void addPayout(PayoutElement element){
		this.payouts.add(element);
	}

	public void addToLabels(String label){
		if(!this.labels.contains(label)){
			this.labels.add(label);
		}
	}

	public void addTolegendsCodes(Integer label){
		//if(!this.legendsCodes.contains(label)){
			this.legendsCodes.add(label);
		//}
	}

	public void addToLegends(String label){
		//if(!this.legends.contains(label)){
			this.legends.add(label);
		//}
	}

	@Override
	public boolean equals(Object object)
	{
		boolean sameSame = false;

		if (object != null && object instanceof PayoutProgram)
		{
			if(this.name.equals(((PayoutProgram) object).name)){
				if(this.incentiveId == null && ((PayoutProgram) object).incentiveId == null){
					sameSame = true;
				}else if(this.incentiveId != null && ((PayoutProgram) object).incentiveId != null){
					if(this.incentiveId.equals(((PayoutProgram) object).incentiveId)){
						sameSame = true;
					}
				}
			}
		}

		return sameSame;
	}


}
