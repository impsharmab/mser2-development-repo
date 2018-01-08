package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class PCPartDetailsDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2129894712259950502L;
	@Id private int LoadID;
	@Id private String DealerCode;
	@Id private String InvoiceNumber;
	@Id private Date InvoiceDate;
	private String ShopCounterFlag;
	@Id private String TransactionType;
	@Id private String D2DIndicator;
	@Id private String InvoiceLineNumber;
	@Id private String PartNumber;
	private String PartDescription;
	@Id private int SaleQuantity;
	@Id private String PaymentType;
	@Id private String ExceptionCode;
	@Id private String StatusCode;
	@Id private String Description;
	private String UnitCost;
	private String UnitSalePrice;
	private String UnitCoreCost;
	private String UnitCorePrice;
	private String Notes;
	@Id private String RONumber;
	private String VIN;
	@Id private String SaleType;
	private String CustomerID;
	private String CustomerName;
	private Date LoadDate;
	@Id private int PCPartDetailsID;
}
