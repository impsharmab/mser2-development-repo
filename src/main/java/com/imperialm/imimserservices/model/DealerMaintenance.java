package com.imperialm.imimserservices.model;

import java.util.List;

import com.imperialm.imimserservices.dto.ProgramGroupEnrollmentsDTO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DealerMaintenance {
	
	private String dealerCode;
	private String name;
        private String district;
	private List<ProgramGroupEnrollmentsDTO> enrollment;
}
