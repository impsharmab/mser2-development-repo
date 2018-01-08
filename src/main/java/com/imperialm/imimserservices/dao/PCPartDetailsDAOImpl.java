package com.imperialm.imimserservices.dao;

import java.sql.Date;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.RejectedInvoicesDTO;

@Repository
public class PCPartDetailsDAOImpl {

	private static Logger logger = LoggerFactory.getLogger(PCPartDetailsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	

	@Transactional
	public boolean updateRejectedInvoices(String dealerCode, RejectedInvoicesDTO invoice) {
		boolean result = false;
		try {
			//final Query query = this.em.createNativeQuery("exec WEB_UpdatePCRejectedInvoices ?0, ?1, ?2, ?3, ?4, ?5, ?6, ?7,?8, ?9, ?10");
			

			StoredProcedureQuery storedProcedure = em.createStoredProcedureQuery("WEB_UpdatePCRejectedInvoices");
			// set parameters
			storedProcedure.registerStoredProcedureParameter("DealerCode", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("D2DIndicator", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("TransactionType", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("PartNumber", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("Notes", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("InvoiceDate", Date.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("InvoiceNumber", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("SaleQuantity", Integer.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("ExceptionCode", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("SaleType", String.class, ParameterMode.IN);
			storedProcedure.registerStoredProcedureParameter("StatusCode", String.class, ParameterMode.IN);
			
			
			storedProcedure.setParameter("DealerCode", dealerCode);
			storedProcedure.setParameter("D2DIndicator", invoice.getD2DIndicator());
			storedProcedure.setParameter("TransactionType", invoice.getTransactionType());
			storedProcedure.setParameter("PartNumber", invoice.getPartNumber());
			storedProcedure.setParameter("Notes", invoice.getNotes());
			storedProcedure.setParameter("InvoiceDate", invoice.getInvoiceDate());
			storedProcedure.setParameter("InvoiceNumber", invoice.getInvoiceNumber());
			storedProcedure.setParameter("SaleQuantity", invoice.getSaleQuantity());
			storedProcedure.setParameter("ExceptionCode", invoice.getExceptionCode());
			storedProcedure.setParameter("SaleType", invoice.getSaleType());
			storedProcedure.setParameter("StatusCode", "RPRO");
			
			
			// execute SP
			int a = storedProcedure.executeUpdate();
			/*final Query query = this.em.createNativeQuery(q);
			query.setParameter(0, dealerCode);
			query.setParameter(1, invoice.getD2DIndicator());
			query.setParameter(2, invoice.getTransactionType());
			query.setParameter(3, invoice.getPartNumber());
			query.setParameter(4, invoice.getNotes());
			query.setParameter(5, invoice.getInvoiceDate());
			query.setParameter(6, invoice.getInvoiceNumber());
			query.setParameter(7, invoice.getSaleQuantity());
			query.setParameter(8, invoice.getExceptionCode());
			query.setParameter(9, invoice.getSaleType());
			//query.setParameter(10, "RPRO");

			int a = query.executeUpdate();*/
			if(a > 0){
				result = true;
			}
		}  catch (final Exception ex) {
			logger.error("error occured in updateRejectedInvoices", ex);
		}
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
}
