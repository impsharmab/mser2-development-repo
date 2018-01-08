package com.imperialm.imimserservices.dto;

import java.util.List;

import com.imperialm.imimserservices.model.EligiblePositionsView;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayoutEligiblePositionsView {

	private Long programGroupId;
	private List<EligiblePositionsView> positions;

}
