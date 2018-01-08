package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class RejectedInvoicesDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8411631159257271303L;
	@Id private String InvoiceNumber;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="EST")
	@Id private Date InvoiceDate;
	@Id private String PartNumber;
	@Id private Integer SaleQuantity;
	@Id private String StatusCode;
	@Id private String Description;
	@Id private String SaleType;
	@Id private String ExceptionCode;
	@Id private String TransactionType;
	@Id private String D2DIndicator;
	@Id private String Notes;

}
