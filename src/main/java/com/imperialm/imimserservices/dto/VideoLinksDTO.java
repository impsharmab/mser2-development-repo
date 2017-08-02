package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class VideoLinksDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1719498730434905117L;
	@Id private String videoName;
	@Id private String filePath;
	@Id private Date createdDate;
	@Id private String Status;
	@Id private String videoImageName;
	@Id private String videoTitle;
	@Id private Integer seqno;
	@Id private String ipadFilePath;
	@Id private String program;
}
