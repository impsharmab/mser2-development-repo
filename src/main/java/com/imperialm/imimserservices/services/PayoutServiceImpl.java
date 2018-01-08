package com.imperialm.imimserservices.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dto.IPartsDTO;
import com.imperialm.imimserservices.dto.PayoutChartMainModel;
import com.imperialm.imimserservices.model.PayoutElement;
import com.imperialm.imimserservices.model.PayoutMainTab;
import com.imperialm.imimserservices.model.PayoutProgram;
import com.imperialm.imimserservices.util.IMIServicesUtil;

@Service
public class PayoutServiceImpl {

	@Autowired IMIServicesUtil IMIServicesUtil;
	
	@Autowired
	private com.imperialm.imimserservices.dao.PayoutChartImpl PayoutChartImpl;
	
	public @ResponseBody Object getPayout(HttpServletRequest request, Date date) {
		List<Object> list = new ArrayList<>();
		PayoutMainTab serviceAdvisor = makePayout("SERVICE ADVISOR", "13", date);
		PayoutMainTab serviceTechnician = makePayout("SERVICE TECHNICIAN", "23", date);
		PayoutMainTab partsPersonnel = makePayoutByProgramId("PARTS PERSONNEL", "PCP", 6, date);
		PayoutMainTab uvm = makePayoutByProgramId("USED VEHICLE MANAGER", "13", 15, date);

		this.makePayoutOverride("08", serviceAdvisor, date);
		this.makePayoutOverride("09", serviceAdvisor, date);

		this.makePayoutOverride("08", serviceTechnician, date);
		this.makePayoutOverride("09", serviceTechnician, date);


		this.makePayoutOverrideByProgramId("08", partsPersonnel, 6, date);
		this.makePayoutOverrideByProgramId("09", partsPersonnel, 6, date);

		this.makePayoutOverrideByProgramId("08", uvm, 15, date);
		//this.makePayoutOverrideByProgramId("09", uvm, 15);
		this.makePayoutOverrideByProgramId("23", uvm, 15, date);
		
		this.makeLabels(serviceAdvisor);
		this.makeLabels(serviceTechnician);
		this.makeLabels(partsPersonnel);
		this.makeLabels(uvm);
		
		list.add(serviceAdvisor);
		list.add(serviceTechnician);
		list.add(partsPersonnel);
		list.add(uvm);

		return list;

	}


	
	private void makeLabels(PayoutMainTab tab){
		//LinkedHashSet
		for(PayoutProgram item: tab.getPrograms()){
			LinkedHashMap<String, LinkedHashSet<Integer>> legends = new LinkedHashMap<>();
			for(String leg: item.getLegends()){
				legends.put(leg, new LinkedHashSet<Integer>());
			}
			for(int i = 0; i< item.getLegendsCodes().size(); i++){
				for(PayoutElement element: item.getPayouts()){
					if(item.getLegendsCodes().get(i).equals(element.getIncentiveSubCodeId())){
						legends.get(item.getLegends().get(i)).add(item.getLegendsCodes().get(i));
						String[] stringArray = Arrays.copyOf(legends.keySet().toArray(), legends.keySet().toArray().length, String[].class);
						List<String> keys = Arrays.asList(stringArray);
						int j = keys.indexOf(item.getLegends().get(i));
						element.addLabels("*" + (j+1));
						Set<String> hs = new LinkedHashSet<>();
						hs.addAll(element.getLabels());
						element.getLabels().clear();
						element.getLabels().addAll(hs);
					}
				}
			}
		}
		
		
		for(PayoutProgram item: tab.getPrograms()){
			LinkedHashMap<String, LinkedHashSet<Integer>> legends = new LinkedHashMap<>();
			for(String leg: item.getLegends()){
				legends.put(leg, new LinkedHashSet<Integer>());
			}
			String[] stringArray = Arrays.copyOf(legends.keySet().toArray(), legends.keySet().toArray().length, String[].class);
			List<String> keys = Arrays.asList(stringArray);
			
			item.getLegends().clear();
			for(int i = 0; i< keys.size(); i++){
				String label = "*" + (i+1) + " " + keys.get(i);
				//item.getLegends().remove(i);
				item.getLegends().add(label);				
			}
			
		}
		
	}

	private PayoutMainTab makePayout(String Name, String positionCode, Date date) {

		List<PayoutChartMainModel> serviceAdvisor = this.PayoutChartImpl.getPayoutByPositionCode(positionCode, date);


		List<PayoutProgram> pp = new ArrayList<>();

		List<String> payoutPrograms = new ArrayList<>();
		List<Integer> incentiveSubCodeIds = new ArrayList<>();


		for(PayoutChartMainModel item: serviceAdvisor){
			payoutPrograms.add(item.getName().toUpperCase());
			incentiveSubCodeIds.add(item.getIncentiveSubCodeID());
		}

		Set<String> hs = new LinkedHashSet<>();
		hs.addAll(payoutPrograms);
		payoutPrograms.clear();
		payoutPrograms.addAll(hs);

		Set<Integer> hsi = new LinkedHashSet<>();
		hsi.addAll(incentiveSubCodeIds);
		incentiveSubCodeIds.clear();
		incentiveSubCodeIds.addAll(hsi);

		List<IPartsDTO> partsList = this.PayoutChartImpl.getParts(incentiveSubCodeIds, date);

		Map<Integer, List<String>> partsGrouped = new HashMap<>();

		for(IPartsDTO item: partsList){
			if(partsGrouped.containsKey(item.getIncentiveSubCodeID())){
				List<String> temp = partsGrouped.get(item.getIncentiveSubCodeID());
				temp.add(item.getPartNumber());
				partsGrouped.put(item.getIncentiveSubCodeID(), temp);
			}else{
				List<String> temp = new ArrayList<>();
				temp.add(item.getPartNumber());
				partsGrouped.put(item.getIncentiveSubCodeID(), temp);
			}
		}

		for(String item: payoutPrograms){
			pp.add(new PayoutProgram(item.replaceAll(".*-", "")));
			for(PayoutChartMainModel temp: serviceAdvisor){
				//No check for roriginal position
				/*if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y")){
					pp.get(pp.size()-1).setManagerLabel("Parts and Service Manager Override is " + temp.getOverridePercentage() + "% of all above items");
				}*/

				if(temp.getName().toUpperCase().contains(item)){
					if(partsGrouped.containsKey(temp.getIncentiveSubCodeID())){
						List<String> parts = partsGrouped.get(temp.getIncentiveSubCodeID());
						pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue(), parts, temp.getIncentiveSubCodeID()));
					}else{
						pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue(), temp.getIncentiveSubCodeID()));
					}
				}
			}

		}

		return new PayoutMainTab(Name, positionCode, pp);

	}



	private PayoutMainTab makePayoutByProgramId(String Name, String positionCode, int programId, Date date) {

		List<PayoutChartMainModel> serviceAdvisor = this.PayoutChartImpl.getPayoutByPositionCodeAndProgramId(positionCode, programId, date);


		List<PayoutProgram> pp = new ArrayList<>();

		List<String> payoutPrograms = new ArrayList<>();
		List<Integer> incentiveSubCodeIds = new ArrayList<>();


		for(PayoutChartMainModel item: serviceAdvisor){
			payoutPrograms.add(item.getName().toUpperCase());
			incentiveSubCodeIds.add(item.getIncentiveSubCodeID());
		}

		Set<String> hs = new LinkedHashSet<>();
		hs.addAll(payoutPrograms);
		payoutPrograms.clear();
		payoutPrograms.addAll(hs);

		Set<Integer> hsi = new LinkedHashSet<>();
		hsi.addAll(incentiveSubCodeIds);
		incentiveSubCodeIds.clear();
		incentiveSubCodeIds.addAll(hsi);

		List<IPartsDTO> partsList = this.PayoutChartImpl.getParts(incentiveSubCodeIds, date);

		Map<Integer, List<String>> partsGrouped = new HashMap<>();

		for(IPartsDTO item: partsList){
			if(partsGrouped.containsKey(item.getIncentiveSubCodeID())){
				List<String> temp = partsGrouped.get(item.getIncentiveSubCodeID());
				temp.add(item.getPartNumber());
				partsGrouped.put(item.getIncentiveSubCodeID(), temp);
			}else{
				List<String> temp = new ArrayList<>();
				temp.add(item.getPartNumber());
				partsGrouped.put(item.getIncentiveSubCodeID(), temp);
			}
		}

		for(String item: payoutPrograms){
			pp.add(new PayoutProgram(item.replaceAll(".*-", "")));
			for(PayoutChartMainModel temp: serviceAdvisor){
				/*if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y")){
					pp.get(pp.size()-1).setManagerLabel("Parts and Service Manager Override is " + temp.getOverridePercentage() + "% of all above items");
				}*/

				if(temp.getName().toUpperCase().contains(item)){
					if(partsGrouped.containsKey(temp.getIncentiveSubCodeID())){
						List<String> parts = partsGrouped.get(temp.getIncentiveSubCodeID());
						pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue(), parts, temp.getIncentiveSubCodeID()));
					}else{
						pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue(), temp.getIncentiveSubCodeID()));
					}
				}
			}

		}

		return new PayoutMainTab(Name, positionCode, pp);

	}

	private void makePayoutOverride(String positionCode,PayoutMainTab originalChart, Date date) {

		List<PayoutChartMainModel> serviceAdvisor = this.PayoutChartImpl.getPayoutOverrideByPositionCode(positionCode, date);


		List<PayoutProgram> pp = new ArrayList<>();

		List<String> payoutPrograms = new ArrayList<>();
		List<Integer> incentiveSubCodeIds = new ArrayList<>();
		List<Integer> incentiveIds = new ArrayList<>();


		for(PayoutChartMainModel item: serviceAdvisor){
			payoutPrograms.add(item.getName().toUpperCase());
			incentiveSubCodeIds.add(item.getIncentiveSubCodeID());
			incentiveIds.add(item.getIncentiveID());
		}

		Set<String> hs = new LinkedHashSet<>();
		hs.addAll(payoutPrograms);
		payoutPrograms.clear();
		payoutPrograms.addAll(hs);

		Set<Integer> hsis = new LinkedHashSet<>();
		hsis.addAll(incentiveSubCodeIds);
		incentiveSubCodeIds.clear();
		incentiveSubCodeIds.addAll(hsis);

		Set<Integer> hsi = new LinkedHashSet<>();
		hsi.addAll(incentiveIds);
		incentiveIds.clear();
		incentiveIds.addAll(hsi);

		for(int i =0; i<payoutPrograms.size(); i++){
			pp.add(new PayoutProgram(payoutPrograms.get(i).replaceAll(".*-", "")));

			for(PayoutChartMainModel temp: serviceAdvisor){
				if(temp.getIncentiveID().equals(incentiveIds.get(i))){
					if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y") && temp.getRewardTypeID() == 2 && temp.getOverridePercentage() > 0){
						pp.get(pp.size()-1).setManagerLabel("Parts And Service Manager Override is " + temp.getOverridePercentage() + "% on all above items");
						pp.get(pp.size()-1).addToLabels(temp.getPCName() + " Override is " + temp.getOverridePercentage() + "% on all above items");
					}

					if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y") && temp.getRewardTypeID() == 1 && temp.getRewardValue() > 0){
						pp.get(pp.size()-1).setFirstLegend("Service Manager override is " + IMIServicesUtil.formatCurrency(temp.getRewardValue()));
						pp.get(pp.size()-1).addToLegends(temp.getPCName() + " Override is " + IMIServicesUtil.formatCurrency(temp.getRewardValue()));
						pp.get(pp.size()-1).addTolegendsCodes(temp.getIncentiveSubCodeID());
					}

					if(temp.getName().toUpperCase().contains(payoutPrograms.get(i))){
						pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue()));
					}

				}
			}

		}


		for(PayoutProgram item: originalChart.getPrograms()){
			for(PayoutProgram temp: pp){
				if(!temp.getManagerLabel().isEmpty()){
					if(item.getName().equals(temp.getName())){
						item.setManagerLabel(temp.getManagerLabel());
						//item.getLabels().addAll(temp.getLabels());
					}
				}

				if(!temp.getFirstLegend().isEmpty()){
					if(item.getName().equals(temp.getName())){
						item.setFirstLegend(temp.getFirstLegend());
						//item.getLegends().addAll(temp.getLabels());
					}
				}
				
				if(item.equals(temp)){
					for(String label: temp.getLabels()){
						item.addToLabels(label);
					}
				}

				/*for(String label: temp.getLabels()){
					item.addToLabels(label);
				}

				for(String label: temp.getLegends()){
					item.addToLegends(label);
				}

				for(Integer label: temp.getLegendsCodes()){
					item.addTolegendsCodes(label);
				}*/


				for(int i =0; i< temp.getLegends().size(); i++){
					if(item.equals(temp)){
						/*for(String label: temp.getLabels()){
							item.addToLabels(label);
						}*/
						for(String label: temp.getLegends()){
							item.addToLegends(label);
						}

						for(Integer label: temp.getLegendsCodes()){
							item.addTolegendsCodes(label);
						}

					}
				}


			}
		}

	}



	private void makePayoutOverrideByProgramId(String positionCode,PayoutMainTab originalChart, int programId, Date date) {

		List<PayoutChartMainModel> serviceAdvisor = this.PayoutChartImpl.getPayoutOverrideByPositionCodeAndProgramId(positionCode, programId, date);

		List<PayoutProgram> pp = new ArrayList<>();

		List<String> payoutPrograms = new ArrayList<>();
		List<Integer> incentiveSubCodeIds = new ArrayList<>();
		List<Integer> incentiveIds = new ArrayList<>();

		for(PayoutChartMainModel item: serviceAdvisor){
			payoutPrograms.add(item.getName().toUpperCase());
			incentiveSubCodeIds.add(item.getIncentiveSubCodeID());
			incentiveIds.add(item.getIncentiveID());
		}

		Set<String> hs = new LinkedHashSet<>();
		hs.addAll(payoutPrograms);
		payoutPrograms.clear();
		payoutPrograms.addAll(hs);

		Set<Integer> hsis = new LinkedHashSet<>();
		hsis.addAll(incentiveSubCodeIds);
		incentiveSubCodeIds.clear();
		incentiveSubCodeIds.addAll(hsis);

		Set<Integer> hsi = new LinkedHashSet<>();
		hsi.addAll(incentiveIds);
		incentiveIds.clear();
		incentiveIds.addAll(hsi);

		/*for(String item: payoutPrograms){
			pp.add(new PayoutProgram(item.replaceAll(".*-", "")));
			for(PayoutChartMainModel temp: serviceAdvisor){

				if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y") && temp.getRewardTypeID() == 2 && temp.getOverridePercentage() > 0){
					pp.get(pp.size()-1).setManagerLabel("Parts And Service Manager Override is " + temp.getOverridePercentage() + "% on all above items");
					pp.get(pp.size()-1).addToLabels(temp.getPCName() + " Override is " + temp.getOverridePercentage() + "% on all above items");
				}

				if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y") && temp.getRewardTypeID() == 1 && temp.getRewardValue() > 0){
					pp.get(pp.size()-1).setFirstLegend("Service Manager override is $" + IMIServicesUtil.formatCurrency(temp.getRewardValue()));
					pp.get(pp.size()-1).addToLegends(temp.getPCName() + " Override is $" + IMIServicesUtil.formatCurrency(temp.getRewardValue()));
					pp.get(pp.size()-1).addTolegendsCodes(temp.getIncentiveSubCodeID());
				}

				if(temp.getName().toUpperCase().contains(item)){
					pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue()));
				}
			}

		}*/
		
		
		for(int i =0; i<payoutPrograms.size(); i++){
			pp.add(new PayoutProgram(payoutPrograms.get(i).replaceAll(".*-", "")));

			for(PayoutChartMainModel temp: serviceAdvisor){
				if(temp.getIncentiveID().equals(incentiveIds.get(i))){
					if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y") && temp.getRewardTypeID() == 2 && temp.getOverridePercentage() > 0){
						pp.get(pp.size()-1).setManagerLabel("Parts And Service Manager Override is " + temp.getOverridePercentage() + "% on all above items");
						pp.get(pp.size()-1).addToLabels(temp.getPCName() + " Override is " + temp.getOverridePercentage() + "% on all above items");
					}

					if(temp.getIsOverrideReward().trim().equalsIgnoreCase("Y") && temp.getRewardTypeID() == 1 && temp.getRewardValue() > 0){
						pp.get(pp.size()-1).setFirstLegend("Service Manager override is $" + IMIServicesUtil.formatCurrency(temp.getRewardValue()));
						pp.get(pp.size()-1).addToLegends(temp.getPCName() + " Override is $" + IMIServicesUtil.formatCurrency(temp.getRewardValue()));
						pp.get(pp.size()-1).addTolegendsCodes(temp.getIncentiveSubCodeID());
					}

					if(temp.getName().toUpperCase().contains(payoutPrograms.get(i))){
						pp.get(pp.size()-1).addPayout(new PayoutElement(temp.getDescription(), temp.getRewardValue()));
					}

				}
			}

		}
		

		/*for(PayoutProgram item: originalChart.getPrograms()){
			for(PayoutProgram temp: pp){
				if(!temp.getManagerLabel().isEmpty()){
					if(item.getName().equals(temp.getName())){
						item.setManagerLabel(temp.getManagerLabel());
					}
				}

				if(!temp.getFirstLegend().isEmpty()){
					if(item.getName().equals(temp.getName())){
						item.setFirstLegend(temp.getFirstLegend());
					}
				}

				/*for(String label: temp.getLabels()){
					item.addToLabels(label);
				}

				for(String label: temp.getLegends()){
					item.addToLegends(label);
				}

				for(Integer label: temp.getLegendsCodes()){
					item.addTolegendsCodes(label);
				}*/

/*
				for(int i =0; i< temp.getLegends().size(); i++){
					if(item.equals(temp)){
						for(String label: temp.getLabels()){
							item.addToLabels(label);
						}
						for(String label: temp.getLegends()){
							item.addToLegends(label);
						}

						for(Integer label: temp.getLegendsCodes()){
							item.addTolegendsCodes(label);
						}

					}
				}



			}
		}*/
		
		
		
		
		for(PayoutProgram item: originalChart.getPrograms()){
			for(PayoutProgram temp: pp){
				if(!temp.getManagerLabel().isEmpty()){
					if(item.getName().equals(temp.getName())){
						item.setManagerLabel(temp.getManagerLabel());
						//item.getLabels().addAll(temp.getLabels());
					}
				}

				if(!temp.getFirstLegend().isEmpty()){
					if(item.getName().equals(temp.getName())){
						item.setFirstLegend(temp.getFirstLegend());
						//item.getLegends().addAll(temp.getLabels());
					}
				}
				
				if(item.equals(temp)){
					for(String label: temp.getLabels()){
						item.addToLabels(label);
					}
				}

				/*for(String label: temp.getLabels()){
					item.addToLabels(label);
				}

				for(String label: temp.getLegends()){
					item.addToLegends(label);
				}

				for(Integer label: temp.getLegendsCodes()){
					item.addTolegendsCodes(label);
				}*/


				for(int i =0; i< temp.getLegends().size(); i++){
					if(item.equals(temp)){
						/*for(String label: temp.getLabels()){
							item.addToLabels(label);
						}*/
						for(String label: temp.getLegends()){
							item.addToLegends(label);
						}

						for(Integer label: temp.getLegendsCodes()){
							item.addTolegendsCodes(label);
						}

					}
				}


			}
		}
		

	}
	
}
