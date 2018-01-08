package com.imperialm.imimserservices.dto;

import java.util.Objects;

public class PayoutProgramGroupsView {
	private Long incentiveId;
	private Long rewardTypeId;
	private String incentiveName;
	private Long programGroupId;
	private String programGroupCode;
	private String programGroup;
	private boolean selected;

	/**
	 * @param incentiveId
	 * @param rewardTypeId
	 * @param incentiveName
	 * @param programGroup
	 */
	public PayoutProgramGroupsView(Long incentiveId, Long rewardTypeId, String incentiveName, Long programGroupId,
			String programGroupCode, String programGroup) {
		super();
		this.incentiveId = incentiveId;
		this.rewardTypeId = rewardTypeId;
		this.incentiveName = incentiveName;
		this.programGroupId = programGroupId;
		this.programGroupCode = programGroupCode;
		this.programGroup = programGroup;
	}

	public Long getIncentiveId() {
		return incentiveId;
	}

	public void setIncentiveId(Long incentiveId) {
		this.incentiveId = incentiveId;
	}

	public Long getRewardTypeId() {
		return rewardTypeId;
	}

	public void setRewardTypeId(Long rewardTypeId) {
		this.rewardTypeId = rewardTypeId;
	}

	public String getIncentiveName() {
		return incentiveName;
	}

	public void setIncentiveName(String incentiveName) {
		this.incentiveName = incentiveName;
	}

	public Long getProgramGroupId() {
		return programGroupId;
	}

	public void setProgramGroupId(Long programGroupId) {
		this.programGroupId = programGroupId;
	}

	public String getProgramGroupCode() {
		return programGroupCode;
	}

	public void setProgramGroupCode(String programGroupCode) {
		this.programGroupCode = programGroupCode;
	}

	public String getProgramGroup() {
		return programGroup;
	}

	public void setProgramGroup(String programGroup) {
		this.programGroup = programGroup;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	@Override
	public int hashCode() {
		return Objects.hash(incentiveId);
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof PayoutProgramGroupsView)) {
			return false;
		}
		PayoutProgramGroupsView toCompare = (PayoutProgramGroupsView) o;
		return Objects.equals(incentiveId, toCompare.incentiveId);
	}

}
