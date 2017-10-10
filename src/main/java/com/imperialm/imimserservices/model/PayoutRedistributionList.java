package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PayoutRedistributionList {

	private List<PayoutRedistribution> list = new ArrayList<>();
}
