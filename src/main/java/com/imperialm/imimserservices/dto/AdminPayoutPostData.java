package com.imperialm.imimserservices.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.imperialm.imimserservices.entities.IncentiveSubCodeEntity;
import com.imperialm.imimserservices.util.CustomDateDeserializer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPayoutPostData {
	@JsonDeserialize(using = CustomDateDeserializer.class)
	private Date startDate;
	@JsonDeserialize(using = CustomDateDeserializer.class)
	private Date endDate;
	private List<IncentiveSubCodeEntity> incentiveSubCodes;
}
