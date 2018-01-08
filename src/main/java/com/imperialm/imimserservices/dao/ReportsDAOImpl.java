package com.imperialm.imimserservices.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.sql.DataSource;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.NameLabelDTO;
import com.imperialm.imimserservices.dto.RejectedInvoicesDTO;

@Repository
public class ReportsDAOImpl  implements ReportsDAO{

	private static Logger logger = LoggerFactory.getLogger(ReportsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private DataSource dc;

	@SuppressWarnings("unchecked")
	public List<NameLabelDTO> getSWRepotPeriod() {
		List<NameLabelDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery("Select Period + '('+ Format(StartDate,'dd') +' '+ Format(StartDate,'MMM') + ' to ' + Format(EndDate,'dd') +' '+ Format(EndDate,'MMM') + ')'as label, IncentivePeriodID as value  from IncentivePeriods", NameLabelDTO.class);
			result = query.getResultList();
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getSWRepotPeriod", ex);
		}
		return result;
	}


	@SuppressWarnings("unchecked")
	public List<RejectedInvoicesDTO> getRejectedInvoices(String dealerCode, Date start, Date end) {
		List<RejectedInvoicesDTO> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery("exec WEB_GetPCRejectedInvoices ?0, ?1, ?2", RejectedInvoicesDTO.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, start);
			query.setParameter(2, end);
			result = query.getResultList();
		}  catch (final Exception ex) {
			logger.error("error occured in getRejectedInvoices", ex);
		}
		return result;
	}

	@Transactional
	public boolean updateRejectedInvoices2(String dealerCode, RejectedInvoicesDTO invoice) {
		boolean result = false;
		try {
			//final Query query = this.em.createNativeQuery("exec WEB_UpdatePCRejectedInvoices ?0, ?1, ?2, ?3, ?4, ?5, ?6, ?7,?8, ?9, ?10");
			
			String q = "update [PCPartDetails] set [D2DIndicator] = ?1 , [TransactionType] = ?2 , [PartNumber] = ?3 , [Notes] = ?4, [StatusCode] = 'RPRO'"
					+ " where [InvoiceDate] = ?5 and [InvoiceNumber] = ?6 and [SaleQuantity] = (?7)"
					+ " and ((?8 is null and [ExceptionCode] is null) or [ExceptionCode] = ?8)"
					+ " and ((?9 is null and [SaleType] is null) or [SaleType] = ?9)"
					+ " and [DealerCode] = ?0";
			
			/*String q = "update [PCPartDetails] set [D2DIndicator] = ?1 , [TransactionType] = ?2 , [PartNumber] = ?3 , [Notes] = ?4 and [StatusCode] = 'RPRO'"
						+ " where [InvoiceDate] = ?5 and [InvoiceNumber] = ?6 and [SaleQuantity] = (?7)"
						+ " and ((?8 is null and [ExceptionCode] is null) or [ExceptionCode] = ?8)"
						+ " and ((?9 is null and [SaleType] is null) or [SaleType] = ?9)"
						+ " and [DealerCode] = ?0";*/

			/*String q = "update [PCPartDetails] set [D2DIndicator] = ?1, [TransactionType] = ?2, [PartNumber] = ?3, [Description] = ?4"
						+ " where [InvoiceDate] = ?5 and [InvoiceNumber] = ?6 and [SaleQuantity] = (?7) and [ExceptionCode] = (?8)  and [SaleType] = ?9 and [DealerCode] = ?0";*/
			final Query query = this.em.createNativeQuery(q);
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

			int a = query.executeUpdate();
			if(a > 0){
				result = true;
			}
		}  catch (final Exception ex) {
			logger.error("error occured in updateRejectedInvoices", ex);
		}
		return result;
	}


	@Transactional
	public boolean updateRejectedInvoices(String dealerCode, RejectedInvoicesDTO invoice) {

		boolean result = false;

		try (				
				Connection connection = dc.getConnection();
				PreparedStatement statement = connection.prepareStatement("WEB_UpdatePCRejectedInvoices ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?");
				) {

			Calendar cal = Calendar.getInstance(); // creates calendar
		    cal.setTime(invoice.getInvoiceDate()); // sets calendar time/date
		    cal.add(Calendar.HOUR_OF_DAY, 6); // adds one hour
		    cal.getTime();
		    invoice.setInvoiceDate(new Date(cal.getTimeInMillis()));
			statement.setString(1, dealerCode);
			statement.setString(2, invoice.getD2DIndicator());
			statement.setString(3, invoice.getTransactionType());
			statement.setString(4, invoice.getPartNumber());
			statement.setString(5, invoice.getNotes());
			statement.setDate(6, invoice.getInvoiceDate());
			statement.setString(7, invoice.getInvoiceNumber());
			statement.setInt(8, invoice.getSaleQuantity());
			statement.setString(9, invoice.getExceptionCode());
			statement.setString(10, invoice.getSaleType());
			statement.setString(11, "RPRO");


			int affectedRows = statement.executeUpdate();


			if (affectedRows > 0) {
				result = true;
			}
		}catch(Exception e){
			logger.error("error occured in updateRejectedInvoices2", e);
		}
		return result;
	}


}
