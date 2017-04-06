package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TopTenChart{
	List<TileAttribute> attribute;
	TopTenDataTable top10_advisors;
	TopTenDataTable top10_technicians;
	List<TopTenTableData> top3;
	
	
	public TopTenChart(){
		this.attribute = new ArrayList<TileAttribute>();
		this.top10_advisors = null;
		this.top10_technicians = null;
		this.top3 = new ArrayList<TopTenTableData>();
	}
	
	public Boolean addAttribute(TileAttribute attribute){
		try{
			this.attribute.add(attribute);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	
	public Boolean addAttributes(List<TileAttribute> attributes){
		try{
			this.attribute.addAll(attributes);
			return true;
		}catch(Exception e){
			return false;
		}
	}
	
}
