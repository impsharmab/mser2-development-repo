package com.imperialm.imimserservices.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;

import com.imperialm.imimserservices.dto.PayoutCategoryByIncentiveView;
import com.imperialm.imimserservices.dto.PayoutProgramGroupsView;

@Entity
@Table(name="Users", indexes = {@Index(columnList = "userId", unique=true), @Index(columnList = "email", unique=true)})
@SqlResultSetMappings({
    @SqlResultSetMapping(name = "PayoutProgramGroupsMapping", classes = @ConstructorResult(targetClass = PayoutProgramGroupsView.class, columns = {
                 @ColumnResult(name = "incentiveId", type = Long.class),
                 @ColumnResult(name = "rewardTypeId", type = Long.class),
                 @ColumnResult(name = "incentiveName", type = String.class),
                 @ColumnResult(name = "programGroupId", type = Long.class),
                 @ColumnResult(name = "programGroupCode", type = String.class),
                 @ColumnResult(name = "programGroup", type = String.class) })),
    @SqlResultSetMapping(name = "PayoutCategoryByIncentiveMapping", classes = @ConstructorResult(targetClass = PayoutCategoryByIncentiveView.class, columns = {
                 @ColumnResult(name = "incentiveSubCodeId", type = Long.class),
                 @ColumnResult(name = "programGroup", type = String.class),
                 @ColumnResult(name = "programGroupId", type = Long.class),
                 @ColumnResult(name = "incentiveId", type = Long.class),
                 @ColumnResult(name = "incentiveSubCode", type = String.class),
                 @ColumnResult(name = "description", type = String.class),
                 @ColumnResult(name = "notes", type = String.class),
                 @ColumnResult(name = "quantityId", type = Long.class) }))})

public class User {
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getHashPass() {
		return HashPass;
	}
	public void setHashPass(String hashPass) {
		HashPass = hashPass;
	}
	public String getSalt() {
		return Salt;
	}
	public void setSalt(String salt) {
		Salt = salt;
	}
	
	public String getDelFlag() {
		return Salt;
	}
	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}
	
	@Id
	@Column(nullable = false, name="UserId")
	private String userId;
	
	@Column(nullable = false, name="Name")
	private String name;
	@Column(nullable = false, name="Email")
	private String email;
	
	private Date CreatedDate;
	private String CreatedBy;
	private String UpdatedDate;
	private String UpdatedBy;
	
	@Column(nullable = false, name="DelFlag")
	private String delFlag;
	
	@Column(nullable = false)
	private String HashPass;
	@Column(nullable = false)
	private String Salt;
}