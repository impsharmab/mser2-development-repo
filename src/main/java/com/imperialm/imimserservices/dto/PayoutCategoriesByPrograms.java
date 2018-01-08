package com.imperialm.imimserservices.dto;

import java.util.List;

public class PayoutCategoriesByPrograms {
	private String programGroup;
	private List<PayoutCategoryByIncentiveView> categories;

	public String getProgramGroup() {
		return programGroup;
	}

	public void setProgramGroup(String programGroup) {
		this.programGroup = programGroup;
	}

	public List<PayoutCategoryByIncentiveView> getCategories() {
		return categories;
	}

	public void setCategories(List<PayoutCategoryByIncentiveView> categories) {
		this.categories = categories;
	}
}
