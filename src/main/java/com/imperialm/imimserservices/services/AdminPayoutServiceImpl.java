package com.imperialm.imimserservices.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.imperialm.imimserservices.dao.AdminPayoutDao;
import com.imperialm.imimserservices.dto.AdminPayoutPostData;
import com.imperialm.imimserservices.dto.PayoutCategoriesByPrograms;
import com.imperialm.imimserservices.dto.PayoutCategoryByIncentiveView;
import com.imperialm.imimserservices.dto.PayoutEligiblePositionsView;
import com.imperialm.imimserservices.dto.PayoutProgramGroupsView;
import com.imperialm.imimserservices.entities.IncentiveRewardEntity;
import com.imperialm.imimserservices.entities.IncentiveSubCodeEntity;
import com.imperialm.imimserservices.entities.Quantities;
import com.imperialm.imimserservices.entities.RewardTypes;
import com.imperialm.imimserservices.model.EligiblePositionsView;
import com.imperialm.imimserservices.model.NameValue;

@Service
public class AdminPayoutServiceImpl implements AdminPayoutService {

	Log logger = LogFactory.getLog(AdminPayoutService.class);

	@Autowired
	private AdminPayoutDao adminPayoutDao;

	@Autowired com.imperialm.imimserservices.util.IMIServicesUtil IMIServicesUtil;

	@Autowired
	private com.imperialm.imimserservices.dao.IncentiveSubCodesDAOImpl IncentiveSubCodesDAOImpl;

	@Override
	public List<PayoutCategoriesByPrograms> getCategoryByIncentive(List<String> incentives, String month) {
		List<PayoutCategoriesByPrograms> categoriesByPrograms = new ArrayList<>();
		List<PayoutCategoryByIncentiveView> allCategories = new ArrayList<>();
		List<PayoutCategoryByIncentiveView> selectedCategories = new ArrayList<>();
		if (StringUtils.isNotEmpty(month) && !month.equals("NOMONTH")) {
			Date date = new Date(Long.parseLong(month));
			Date start = IMIServicesUtil.getMonthStartDate(date);
			Date end = IMIServicesUtil.getMonthEndDate(date);
			String startDate = IMIServicesUtil.getDateString(start);
			String endDate = IMIServicesUtil.getDateString(end);
			//List<String> dates = getFirstAndLast(month);
			//allCategories = adminPayoutDao.getCategoryByIncentive(incentives, dates.get(0), dates.get(1));
			allCategories = adminPayoutDao.getCategoryByIncentive(incentives, startDate, endDate);
			selectedCategories = adminPayoutDao.getCategoryByIncentive(incentives, null, null);
		} else
			allCategories = adminPayoutDao.getCategoryByIncentive(incentives, null, null);

		if(!CollectionUtils.isEmpty(allCategories) && !CollectionUtils.isEmpty(selectedCategories)){
			for(PayoutCategoryByIncentiveView item: selectedCategories){
				for(int i = 0; i < allCategories.size(); i++){
					if(item.getIncentiveId().equals(allCategories.get(i).getIncentiveId())
							&& item.getIncentiveSubCode().equals(allCategories.get(i).getIncentiveSubCode())
							&& item.getProgramGroupId().equals(allCategories.get(i).getProgramGroupId())){
						allCategories.get(i).setSelected(true);
					}
				}
			}
		}

		if (!CollectionUtils.isEmpty(allCategories)) {
			for (String incentiveId : incentives) {
				PayoutCategoriesByPrograms categoriesByProgram = new PayoutCategoriesByPrograms();
				List<PayoutCategoryByIncentiveView> listByIncentive = new ArrayList<>();
				for (PayoutCategoryByIncentiveView categoryView : allCategories) {
					if (categoryView.getIncentiveId().toString().equals(incentiveId)) {
						listByIncentive.add(categoryView);
						if (StringUtils.isEmpty(categoriesByProgram.getProgramGroup()))
							categoriesByProgram.setProgramGroup(categoryView.getProgramGroup());
					}
				}
				List<PayoutCategoryByIncentiveView> finalListByIncentive = new ArrayList<>();
				for(PayoutCategoryByIncentiveView item: listByIncentive){
					if(!finalListByIncentive.contains(item)){
						finalListByIncentive.add(item);
					}
				}
				//categoriesByProgram.setCategories(listByIncentive);
				categoriesByProgram.setCategories(finalListByIncentive);
				if (StringUtils.isNotEmpty(categoriesByProgram.getProgramGroup()))
					categoriesByPrograms.add(categoriesByProgram);
			}
		}
		return categoriesByPrograms;
	}


	@Override
	public List<IncentiveSubCodeEntity> getRewardsByIncentiveSubCodes(List<Long> incentiveSubCodeIds, String month) {
		List<IncentiveSubCodeEntity> rewardsByIncentiveSubCodes = new ArrayList<>();
		if (StringUtils.isNotEmpty(month) && !month.equals("NOMONTH")) {
			Date date = new Date(Long.parseLong(month));
			Date start = IMIServicesUtil.getMonthStartDate(date);
			Date end = IMIServicesUtil.getMonthEndDate(date);
			String startDate = IMIServicesUtil.getDateString(start);
			String endDate = IMIServicesUtil.getDateString(end);
			rewardsByIncentiveSubCodes = adminPayoutDao.getCategoriesByIncentiveSubCodes(incentiveSubCodeIds, startDate, endDate);
		}

		if(!CollectionUtils.isEmpty(rewardsByIncentiveSubCodes)){
			List<IncentiveRewardEntity> incentiveRewards = adminPayoutDao.getRewardsByIncentiveSubCodes(incentiveSubCodeIds);
			for(IncentiveSubCodeEntity item: rewardsByIncentiveSubCodes){
				for(IncentiveRewardEntity temp: incentiveRewards){
					if(temp.getLaborType() != null){
						temp.setLaborType(temp.getLaborType().trim());
					}
					if(temp.getIncentiveSubCodeID().equals(item.getIncentiveSubCodeID())){
						item.getIncentiveRewards().add(temp);
					}
				}
			}
		}

		return rewardsByIncentiveSubCodes;
	}

	/*private List<String> getFirstAndLast(String month) {
		List<String> dates = new ArrayList<>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd");
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		String startDate = year + "-" + month + "-01";
		logger.info(startDate);
		dates.add(startDate);
		String endDate = year + "-" + month + "-";
		try {
			Date dt = sdf.parse(startDate);
			cal.setTime(dt);
			int lastDayInMonth = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
			endDate = endDate + lastDayInMonth;
			logger.info(endDate);
			dates.add(endDate);
		} catch (ParseException e) {
			logger.error(e);
		}
		return dates;
	}*/

	@Override
	public List<PayoutProgramGroupsView> getProgramGroupsBySelectedMonth(String month) {
		List<PayoutProgramGroupsView> allProgramGroups = adminPayoutDao.getProgramGroups(null, null);
		long jsdate = Long.parseLong(month);
		Date date = new Date(jsdate);
		Date start = IMIServicesUtil.getMonthStartDate(date);
		Date end = IMIServicesUtil.getMonthEndDate(date);
		String startDate = IMIServicesUtil.getDateString(start);
		String endDate = IMIServicesUtil.getDateString(end);
		List<PayoutProgramGroupsView> programGroupsByMonth = adminPayoutDao.getProgramGroups(startDate,endDate);
		//List<String> dates = this.getFirstAndLast(month);
		//List<PayoutProgramGroupsView> programGroupsByMonth = adminPayoutDao.getProgramGroups(dates.get(0),
		//		dates.get(1));
		for (PayoutProgramGroupsView programGroupByMonth : programGroupsByMonth) {
			if (allProgramGroups.contains(programGroupByMonth))
				allProgramGroups.get(allProgramGroups.indexOf(programGroupByMonth)).setSelected(true);
		}
		return allProgramGroups;
	}

	@Override
	public List<PayoutEligiblePositionsView> getEligiblePositions(List<Long> programGroupIds) {
		List<PayoutEligiblePositionsView> positions = new ArrayList<>();
		if (!CollectionUtils.isEmpty(programGroupIds)) {
			for (Long programGroupId : programGroupIds) {
				PayoutEligiblePositionsView positionView = new PayoutEligiblePositionsView();
				positionView.setProgramGroupId(programGroupId);
				List<EligiblePositionsView> eligiblePositions = adminPayoutDao.getEligiblePositions(programGroupId,
						"ICT");
				positionView.setPositions(eligiblePositions);
				positions.add(positionView);
			}
		}
		return positions;
	}

	@Override
	public List<Quantities> getQuantities() {
		List<Quantities> quantities = adminPayoutDao.getQuantities();
		if (!CollectionUtils.isEmpty(quantities)) {
			for (Quantities quantity : quantities) {
				if (quantity.getDescription().equalsIgnoreCase("IND"))
					quantity.setQuantityVal(quantity.getDescription());
				else
					quantity.setQuantityVal(quantity.getDescription().concat(" of ")
							.concat(String.valueOf(quantity.getValue().longValue())));
			}
		}
		return adminPayoutDao.getQuantities();
	}

	@Override
	public List<RewardTypes> getRewardTypes() {
		return adminPayoutDao.getRewardTypes();
	}

	@Override
	@Transactional
	public boolean saveNewAdminPayout(AdminPayoutPostData postData) throws Exception {
		for (IncentiveSubCodeEntity incentiveSubCode : postData.getIncentiveSubCodes()) {
			incentiveSubCode.setIncentiveSubCodeID(null);
			incentiveSubCode.setStartDate(postData.getStartDate());
			incentiveSubCode.setEndDate(postData.getEndDate());
			incentiveSubCode.setActive("Y");
			incentiveSubCode.setIsDescVisible("Y");
			incentiveSubCode = adminPayoutDao.saveEntity(incentiveSubCode);
			if (incentiveSubCode != null && incentiveSubCode.getIncentiveSubCodeID() != 0) {
				for (IncentiveRewardEntity incentiveReward : incentiveSubCode.getIncentiveRewards()) {
					incentiveReward.setIncentiveSubCodeID(incentiveSubCode.getIncentiveSubCodeID());
					adminPayoutDao.saveEntity(incentiveReward);
				}
			}
		}
		return true;
	}


	@Override
	@Transactional
	public boolean removePayout(AdminPayoutPostData postData) throws Exception {
		for (IncentiveSubCodeEntity incentiveSubCode : postData.getIncentiveSubCodes()) {
			if (incentiveSubCode != null && incentiveSubCode.getIncentiveSubCodeID() != 0) {
				for (IncentiveRewardEntity incentiveReward : incentiveSubCode.getIncentiveRewards()) {
					adminPayoutDao.removeEntity(incentiveReward);
				}
			}
			adminPayoutDao.removeEntity(incentiveSubCode);
		}
		return true;
	}

	public List<NameValue> getPayoutDates(){
		List<NameValue> result = new ArrayList<>();
		List<Date> dates = IncentiveSubCodesDAOImpl.getPayoutDates();

		Calendar cal = Calendar.getInstance();
		Locale locale = Locale.getDefault();
		for(Date item: dates){
			cal.setTime(item);
			result.add(new NameValue(cal.getDisplayName(Calendar.MONTH, Calendar.SHORT, locale) + " " +  cal.get(Calendar.YEAR), item));
		}

		return result;
	}


	public List<NameValue> getNewPayoutDates(){
		List<NameValue> result = new ArrayList<>();
		Calendar cal = Calendar.getInstance();
		List<Date> dates = new ArrayList<>();

		for(int i = 0; i <12; i++){
			Date today = new Date();
			cal.setTime(today);
			cal.add(Calendar.MONTH, i);
			dates.add(IMIServicesUtil.getMonthStartDate(cal.getTime()));
		}

		Locale locale = Locale.getDefault();
		for(Date item: dates){
			cal.setTime(item);
			result.add(new NameValue(cal.getDisplayName(Calendar.MONTH, Calendar.SHORT, locale) + " " +  cal.get(Calendar.YEAR), item));
		}

		return result;
	}


	@Override
	public boolean deletePayout(String month) {
		long jsdate = Long.parseLong(month);
		Date date = new Date(jsdate);
		Date start = IMIServicesUtil.getMonthStartDate(date);
		Date end = IMIServicesUtil.getMonthEndDate(date);
		return adminPayoutDao.deletePeriod(start, end);
	}

}
