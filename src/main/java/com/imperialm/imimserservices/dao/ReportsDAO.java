package com.imperialm.imimserservices.dao;

import java.sql.Date;
import java.util.List;

import com.imperialm.imimserservices.dto.NameLabelDTO;
import com.imperialm.imimserservices.dto.RejectedInvoicesDTO;

public interface ReportsDAO {
	
	public List<NameLabelDTO> getSWRepotPeriod();
	
	public List<RejectedInvoicesDTO> getRejectedInvoices(String dealerCode, Date start, Date end);
	
	public boolean updateRejectedInvoices(String dealerCode, RejectedInvoicesDTO invoice);

}
