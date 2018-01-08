package com.imperialm.imimserservices.dto;

public class PayoutCategoryByIncentiveView {
	private Long incentiveSubCodeId;
	private String programGroup;
	Long programGroupId;
	private Long incentiveId;
	private String incentiveSubCode;
	private String description;
	private String notes;
	private Long quantityId;
	private boolean selected = false;

	public Long getIncentiveSubCodeId() {
		return incentiveSubCodeId;
	}

	public void setIncentiveSubCodeId(Long incentiveSubCodeId) {
		this.incentiveSubCodeId = incentiveSubCodeId;
	}

	public String getProgramGroup() {
		return programGroup;
	}

	public void setProgramGroup(String programGroup) {
		this.programGroup = programGroup;
	}

	public Long getProgramGroupId() {
		return programGroupId;
	}

	public void setProgramGroupId(Long programGroupId) {
		this.programGroupId = programGroupId;
	}

	public Long getIncentiveId() {
		return incentiveId;
	}

	public void setIncentiveId(Long incentiveId) {
		this.incentiveId = incentiveId;
	}

	public String getIncentiveSubCode() {
		return incentiveSubCode;
	}

	public void setIncentiveSubCode(String incentiveSubCode) {
		this.incentiveSubCode = incentiveSubCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Long getQuantityId() {
		return quantityId;
	}

	public void setQuantityId(Long quantityId) {
		this.quantityId = quantityId;
	}
	
	public boolean getSelected(){
		return this.selected;
	}
	
	public void setSelected(boolean selected){
		this.selected = selected;
	}

	public PayoutCategoryByIncentiveView(Long incentiveSubCodeId, String programGroup, Long programGroupId,
			Long incentiveId, String incentiveSubCode, String description, String notes, Long quantityId) {
		super();
		this.incentiveSubCodeId = incentiveSubCodeId;
		this.programGroup = programGroup;
		this.programGroupId = programGroupId;
		this.incentiveId = incentiveId;
		this.incentiveSubCode = incentiveSubCode;
		this.description = description;
		this.notes = notes;
		this.quantityId = quantityId;
	}
	
	@Override
	public boolean equals(Object object){
		boolean sameSame = false;

		if (object != null && object instanceof PayoutCategoryByIncentiveView)
		{
			//this.incentiveSubCodeId.equals(((PayoutCategoryByIncentiveView) object).getIncentiveSubCodeId())
			if(  this.programGroupId.equals(((PayoutCategoryByIncentiveView) object).getProgramGroupId())
					&& this.incentiveId.equals(((PayoutCategoryByIncentiveView) object).getIncentiveId())
					&& this.incentiveSubCode.equals(((PayoutCategoryByIncentiveView) object).getIncentiveSubCode())){
				sameSame = true;
			}
		}

		return sameSame;
	}

}
