package com.imperialm.imimserservices.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class VideoPlayerInfoDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4007882499581520412L;
	@Id private String ipaddress;
	@Id private String dealercode;
	@Id private String dealerName;
	@Id private String videoName;
	@Id private String playedDate;
	@Id private String Starttime;
	@Id private String endtime;
	@Id private String LastPausedTime;
	@Id private String ClipViewedDuration;
	@Id private String ClosedTime;
	@Id private String UserViewedDuration;
}
