package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class UsersDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 254877953895261154L;
	@Id private String userId;
	@Id private String name;
	@Id private String email;
	@Id private String createdBy;
	@Id private Date updatedDate;
	@Id private String updatedBy;
	@Id private String delFlag;
	@Id private String hashPass;
	@Id private String salt;
	@Id private String sendEmail;
	@Id private String phoneNumber;
	@Id private String changePassword;
}
