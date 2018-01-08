package com.imperialm.imimserservices.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Dheerajr
 *
 */
@Data
@Entity
@Table(name = "EmailProperties")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class EmailProperties implements Serializable {

	public EmailProperties(){}

	/**
	 *
	 * @param emailId
	 * @param program
	 * @param emailName
	 * @param headerImage
	 * @param emailfrom
	 * @param ccTo
	 * @param bccTo
	 * @param emailsubject
	 * @param body
	 * @param emailTo
	 */
	public EmailProperties(int emailId, Program program, String emailName, String headerImage, String emailfrom, String ccTo, String bccTo, String emailsubject, String body, String emailTo) {
		this.emailId = emailId;
		this.program = program;
		this.emailName = emailName;
		this.headerImage = headerImage;
		this.emailfrom = emailfrom;
		this.ccTo = ccTo;
		this.bccTo = bccTo;
		this.emailsubject = emailsubject;
		this.body = body;
		this.emailTo = emailTo;
	}

	@Id
	@Column(name = "emailId")
	private int emailId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "programId")
	private Program program = new Program();

	@Column(name = "emailName")
	private String emailName;

	@Column(name = "headerImage")
	private String headerImage;

	@Column(name = "emailfrom")
	private String emailfrom;

	@Column(name = "ccTo")
	private String ccTo;

	@Column(name = "bccTo")
	private String bccTo;

	@Column(name = "emailsubject")
	private String emailsubject;

	@Column(name = "body")
	@Lob
	private String body;

	@Transient
	private String emailTo;

	@Transient
	private List<Object> parameters = new ArrayList<>();

	@Transient
	private String devTo;

	@Transient
	private String devCC;

	@Transient
	private String devBcc;

}
