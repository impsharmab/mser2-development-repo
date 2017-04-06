package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class MSERGraphDetailsSummaryDTO implements Serializable {
	@Id private String parent;
	@Id private String child;
	@Id private String program;
	@Id private int dealersEnrolled;
	@Id private int participantsEnrolled;
}
