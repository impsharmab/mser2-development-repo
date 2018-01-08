package com.imperialm.imimserservices.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NameValueWithTeamIdList {

	private List<NameValueWithTeamId> list = new ArrayList<>();
}
