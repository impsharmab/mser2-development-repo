package com.imperialm.imimserservices.dao;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.sql.DataSource;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.model.DistributionInfo;
import com.imperialm.imimserservices.model.MVPDistribution;
import com.imperialm.imimserservices.model.PayoutRedistribution;
import com.imperialm.imimserservices.model.RedistributionHistory;

@Repository
public class RewardsDistributionDAOImpl {

	private static Logger logger = LoggerFactory.getLogger(RewardsDistributionDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private DataSource dc;

	@SuppressWarnings("unchecked")
	public double getRewardsByDealer(String dealerCode, String program) {
		double result = 0;
		List<BigDecimal> resultList = new ArrayList<>();

		if(program.equalsIgnoreCase("pc")){
			try {
				final Query query = this.em.createNativeQuery("select ISNULL(sum(RewardAmount),0) from PCEligibleROParts where DealerCode = ?0 and BatchId is null and AllocationId is null and StatusCode = 'aprd'");
				query.setParameter(0, dealerCode);
				resultList = (List<BigDecimal>) query.getResultList();
				if(resultList.size() > 0){
					result = resultList.get(0).doubleValue();
				}
			} catch (final Exception ex) {
				logger.error("error occured in getRewardsByDealer, PC", ex);
			}
		}else if(program.equalsIgnoreCase("el")){
			try {
				final Query query = this.em.createNativeQuery("select ISNULL(sum(RewardAmount),0) from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and e.teamid is not null and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'aprd'");
				query.setParameter(0, dealerCode);
				resultList = (List<BigDecimal>) query.getResultList();
				if(resultList.size() > 0){
					result = resultList.get(0).doubleValue();
				}
			} catch (final Exception ex) {
				logger.error("error occured in getRewardsByDealer, EL", ex);
			}
		}else if(program.equalsIgnoreCase("ur")){
			try {
				final Query query = this.em.createNativeQuery("select ISNULL(sum(RewardAmount),0) from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and i.programgroupid = 15 and e.AllocationId is null and e.StatusCode = 'aprd' and e.PositionCode = '13'");
				query.setParameter(0, dealerCode);
				resultList = (List<BigDecimal>) query.getResultList();
				if(resultList.size() > 0){
					result = resultList.get(0).doubleValue();
				}
			} catch (final Exception ex) {
				logger.error("error occured in getRewardsByDealer, UR", ex);
			}
		}else if(program.equalsIgnoreCase("mvp")){
			try {
				String q = "declare @days int = cast( (select value from properties where name = 'MVP_RewardCutOffDays') as int)"
						+ " select SUM(al.RewardValue) from ("
						+ " select ISNULL(SUM(ir.RewardValue),0) as RewardValue from" 
						+ " ( select ContractID, ContractNumber, VIN, PlanCode, LoadDate, SID, OriginalSID, ApproveDate from contractsales cs where LoadDate >= GETDATE() - @days and ApproveDate is null and statuscode = 'CNEW' and dealercode = ?0) cs" 
						+ " join IncentiveParts ip on ip.partnumber = cs.plancode"
						+ " join incentivesubcodes isc on isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
						+ " join Incentives i on i.incentiveid = isc.incentiveid"
						+ " join IncentiveRewards ir on ir.IncentiveID= isc.IncentiveID"
						+ " and ir.IncentiveSubCodeID = isc.IncentiveSubCodeID"
						+ " where cs.LoadDate between ip.StartDate and ip.EndDate"
						+ " and cs.LoadDate between isc.StartDate and isc.EndDate"
						+ " and cs.LoadDate between i.startdate and i.enddate"
						+ " and ir.positioncode = '13'"
						+ " group by ContractID) as al";
				
				final Query query = this.em.createNativeQuery(q);
				query.setParameter(0, dealerCode);
				resultList = (List<BigDecimal>) query.getResultList();
				if(resultList.size() > 0){
					result = resultList.get(0).doubleValue();
				}
			} catch (final Exception ex) {
				logger.error("error occured in getRewardsByDealer, MVP", ex);
			}
		}
		return result;
	}


	@Transactional
	public Integer addToAllocationTable(String dealerCode, String user, int program) {
		Integer result = null;

		try (
				Connection connection = dc.getConnection();
				PreparedStatement statement = connection.prepareStatement("INSERT INTO [AllocationHeader] "
						+"([TeamId],[DealerCode],[StatusCode],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[DelFlag],[IncentiveID],[IncentiveSubCodeID]) "
						+"VALUES(NULL,?,'APRD',GetDate(),?,GetDate(),?,'N',?,?)",
						Statement.RETURN_GENERATED_KEYS);
				) {
			statement.setString(1, dealerCode);
			statement.setString(2, user);
			statement.setString(3, user);
			statement.setInt(4, program);
			statement.setInt(5, program);

			int affectedRows = statement.executeUpdate();


			if (affectedRows == 0) {
				throw new SQLException("Inserting failed, no rows affected.");
			}

			try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					result = (generatedKeys.getInt(1));
				}
				else {
					throw new SQLException("Creating failed, no ID obtained.");
				}
			}
		}catch(Exception e){
			return result;
		}
		return result;
	}


	@Transactional
	public boolean addToAllocationDetailsTable(String sid, double amount, String user, int allocationId) {
		boolean result = false;

		try {
			
			/*for history
			 * 
			 * "IF EXISTS (SELECT * FROM AllocationDetail WHERE [SID] = ?0 AND [AllocationID] = (?1)) "
							+ "UPDATE AllocationDetail SET [DelFlag] = 'N', [Amount] = (?2) , [UpdatedDate] = GetDate() where [SID] = ?1 AND [AllocationID] = (?1)"
							+" ELSE " +
			 * 
			 */
			final Query query = this.em.createNativeQuery(
							"INSERT INTO [AllocationDetail] "
							+"([SID],[AllocationID],[Amount],[StatusCode],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[DelFlag]) "
							+"VALUES(?0,(?1),(?2),'APRD',GetDate(),?3,GetDate(),?3,'N')");

			query.setParameter(0,sid);
			query.setParameter(1,allocationId);
			query.setParameter(2,amount);
			query.setParameter(3,user);

			return query.executeUpdate() > 0;

		}catch(Exception e){
			return result;
		}
	}

	@Transactional
	public boolean updatePCEligibleROPartsWhereAllocationIdIsNull(String dealerCode, int allocationId) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("update [PCEligibleROParts] set [AllocationId] = (?1) , [StatusCode] = 'APRD' where [DealerCode] = ?0 and [BatchId] is null and [AllocationId] is null");
			query.setParameter(0, dealerCode);
			query.setParameter(1, allocationId);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updatePCEligibleROPartsWhereAllocationIdIsNull", ex);
		}
		return result;
	}

	@Transactional
	public boolean updateEligibleROPartsWhereAllocationIdIsNull(String dealerCode, int allocationId, int incentiveId) {
		boolean result = false;
		try {
			
			final Query query = this.em.createNativeQuery("update [EligibleROParts] set [AllocationId] = (?1) , [StatusCode] = 'APRD' where [DealerCode] = ?0 and [BatchId] is null and [AllocationId] is null and [IncentiveID] = (?2)");
			query.setParameter(0, dealerCode);
			query.setParameter(1, allocationId);
			query.setParameter(2, incentiveId);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updateEligibleROPartsWhereAllocationIdIsNull", ex);
		}
		return result;
	}
	
	
	public int getIncentiveId(int program) {
		Integer id = 0;
		try {
			final Query prequery = this.em.createNativeQuery("select incentiveid from Incentives where programgroupid = (?0) and active = 'Y'");
			prequery.setParameter(0, program);
			id = (Integer) prequery.getSingleResult();
			if(id == null){
				id = 0;
			}
		} catch (final Exception ex) {
			logger.error("error occured in getIncentiveId", ex);
		}
		return id;
	}
	

	@SuppressWarnings("unchecked")
	public List<RedistributionHistory> getRedistribtionInfo(String dealerCode, int program) {
		List<RedistributionHistory> result = new ArrayList<>();
		try {
			final Query query = this.em.createNativeQuery("select distinct a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy from AllocationDetail a join DealerPersonnel d on d.SID = a.SID join AllocationHeader h on h.AllocationID = a.AllocationID and h.DealerCode = ?0 and h.DelFlag = 'N' and d.DealerCode = h.DealerCode where h.StatusCode = 'APRD' and a.StatusCode = 'APRD' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1) and a.DelFlag = 'N'", RedistributionHistory.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, program);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRedistribtionInfo", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<RedistributionHistory> getDistribtionHistory(String dealerCode, int programId) {
		List<RedistributionHistory> result = new ArrayList<>();
		try {
			//"select a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy from AllocationDetail a, AllocationHeader h, DealerPersonnel d where h.DealerCode = ?0 and h.DelFlag = 'N' and a.DelFlag = 'N' and d.SID = a.SID and d.DealerCode = h.DealerCode and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1)"
			final Query query = this.em.createNativeQuery(""
					+ "select distinct a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy"
					+ " from AllocationDetail a"
					+" left join DealerPersonnel d"
					+" on d.SID = a.SID"
					+" left join AllocationHeader h"
					+" on d.DealerCode = h.DealerCode"
					+" where h.DealerCode = ?0 and h.DelFlag = 'N' and a.DelFlag = 'N' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1)", RedistributionHistory.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, programId);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getDistribtionHistory", ex);
		}
		return result;
	}

	

	public Integer getProgramIdByAllocationId(int allocationId) {
		Integer result = null;
		try {
			final Query query = this.em.createNativeQuery("select [IncentiveID] from [AllocationHeader] where [AllocationID] = (?0) and DelFlag = 'N'");
			query.setParameter(0, allocationId);
			result = (Integer)(query.getResultList()).get(0);
		} catch (final Exception ex) {
			logger.error("error occured in getProgramIdByAllocationId", ex);
		}
		return result;
	}


	@Transactional
	public boolean invalidateForRedistribution(int allocationId, String user) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "update [AllocationHeader] set [UpdatedDate] = GetDate() , [UpdatedBy] = ?1 where [AllocationID] = ?0 ;"
					+ "update [AllocationDetail] set [UpdatedDate] = GetDate() , [UpdatedBy] = ?1, [DelFlag] = 'Y', [StatusCode]='DELT' where [AllocationID] = ?0 ;");
			query.setParameter(0, allocationId);
			query.setParameter(1, user);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in invalidateForRedistribution", ex);
		}
		return result;
	}
	
	@Transactional
	public boolean invalidateForDealerRedistribution(int allocationId, String user, int programId) {
		boolean result = false;
		String q = "";
		if(programId == -15 || programId == -1){
			q = "update [EligibleROParts] set [AllocationId] = null where [BatchID] is null and [AllocationId] =(?0) ;";
		}else if(programId == -6){
			q = "update [PCEligibleROParts] set [AllocationId] = null where [BatchID] is null and [AllocationId] =(?0) ;";
		}else{
			logger.error("error occured in invalidateForDealerRedistribution", "Invalid Program");
			return false;
		}
		
		
		try {
			final Query query = this.em.createNativeQuery(
					q
					+ "update [AllocationHeader] set [UpdatedDate] = GetDate() , [UpdatedBy] = ?1, [DelFlag] = 'Y', [StatusCode] = 'DELT' where [AllocationID] = (?0) ;"
					+ "update [AllocationDetail] set [UpdatedDate] = GetDate() , [UpdatedBy] = ?1, [DelFlag] = 'Y', [StatusCode] = 'DELT' where [AllocationID] = (?0) ;");
			query.setParameter(0, allocationId);
			query.setParameter(1, user);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in invalidateForDealerRedistribution", ex);
		}
		return result;
	}
	

	@SuppressWarnings("unchecked")
	public List<MVPDistribution> getMVPRewards(String dealerCode) {
		List<MVPDistribution> result = new ArrayList<>();
		
		String q = "declare @days int = cast( (select value from properties where name = 'MVP_RewardCutOffDays') as int)"
		+ " select distinct cs.ContractID, cs.ContractNumber, cs.VIN, cs.PlanCode, cs.LoadDate, cs.SID, cs.OriginalSID, cs.ApproveDate, ir.RewardValue from" 
		+ " ( select ContractID, ContractNumber, VIN, PlanCode, LoadDate, SID, OriginalSID, ApproveDate from contractsales cs where LoadDate >= GETDATE() - @days and ApproveDate is null and statuscode ='CNEW' and dealercode = ?0" 
		+ " ) cs join IncentiveParts ip on ip.partnumber = cs.plancode"
		+ " join incentivesubcodes isc on isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
		+ " join Incentives i on i.incentiveid = isc.incentiveid" 
		+ " join IncentiveRewards ir on ir.IncentiveID= isc.IncentiveID"
		+ " and ir.IncentiveSubCodeID = isc.IncentiveSubCodeID"
		+ " where cs.LoadDate between ip.StartDate and ip.EndDate"
		+ " and cs.LoadDate between isc.StartDate and isc.EndDate"
		+ " and cs.LoadDate between i.startdate and i.enddate"
		+ " and ir.positioncode = '13'";
		//+ " order by cs.PlanCode";
		
		try {
			
			final Query query = this.em.createNativeQuery(
					q , MVPDistribution.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getMVPRewards", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<MVPDistribution> getMVPRewardsHistory(String dealerCode) {
		List<MVPDistribution> result = new ArrayList<>();
		
		String q = "declare @days int = cast( (select value from properties where name = 'MVP_RewardCutOffDays') as int)"
		+ " select distinct cs.ContractID, cs.ContractNumber, cs.VIN, cs.PlanCode, cs.LoadDate, cs.SID, cs.OriginalSID, cs.ApproveDate, ir.RewardValue from" 
		+ " ( select ContractID, ContractNumber, VIN, PlanCode, LoadDate, SID, OriginalSID, ApproveDate from contractsales cs where LoadDate >= GETDATE() - @days and statuscode IN ('CPND','APRV') and dealercode = ?0" 
		+ " ) cs join IncentiveParts ip on ip.partnumber = cs.plancode"
		+ " join incentivesubcodes isc on isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
		+ " join Incentives i on i.incentiveid = isc.incentiveid" 
		+ " join IncentiveRewards ir on ir.IncentiveID= isc.IncentiveID"
		+ " and ir.IncentiveSubCodeID = isc.IncentiveSubCodeID"
		+ " where cs.LoadDate between ip.StartDate and ip.EndDate"
		+ " and cs.LoadDate between isc.StartDate and isc.EndDate"
		+ " and cs.LoadDate between i.startdate and i.enddate"
		+ " and ir.positioncode = '13'";
		//+ " order by cs.PlanCode";
		
		String oldQ = "declare @days int = cast( (select value from properties where name = 'MVP_RewardCutOffDays') as int)"
				+ " SELECT CS.[ContractID], CS.[ContractNumber], CS.[VIN], CS.[PlanCode], CS.[SID], CS.[OriginalSID], CS.[ApproveDate], IR.RewardValue"
				+ " FROM [ContractSales] CS"
				+ " left JOIN  [IncentiveParts] IP"
				+ " on IP.PartNumber = CS.PlanCode"
				+ " LEFT JOIN [IncentiveRewards] IR"
				+ " on IP.IncentiveSubCodeID = IR.IncentiveSubCodeID and IR.PositionCode = '13'"
				+ " where CS.ApproveDate is null and CS.DealerCode = ?0 and CS.StatusCode = 'CNEW' and (CS.LoadDate >= GETDATE() - @days)"; 
		
		try {
			
			final Query query = this.em.createNativeQuery(
					q , MVPDistribution.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getMVPRewards", ex);
		}
		return result;
	}
	
	
	@Transactional
	public boolean setMVPRewards(MVPDistribution record) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "update [ContractSales] set [ApproveDate] = GetDate() , [SID] = ?1, [StatusCode] = 'CPND' where [ContractID] = (?0)");
			query.setParameter(0, record.getContractID());
			query.setParameter(1, record.getSID());
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in setMVPRewards", ex);
		}
		return result;
	}
	
	
	@Transactional
	public boolean setPayoutRewards(PayoutRedistribution record) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "update [EligibleROParts] set [SID] = ?0, [StatusCode] = 'APRD', [BatchID] = null where [RewardAllocHeaderID]=(?1);"
					+ " update [PCEligibleROParts] set [SID] = ?0, [StatusCode] = 'APRD', [BatchID] = null where [RewardAllocHeaderID]=(?1);"
					+ " update [RewardAllocDetail] set [DelFlag] = 'Y' where [RewardAllocHeaderID] = (?1);"
					+ " update [AllocationDetail] set [DelFlag] = 'Y' where [AllocationId] = (?2);"
					+ " INSERT INTO [AllocationDetail] ([SID],[AllocationID],[Amount],[StatusCode],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[DelFlag])"
					+ " VALUES (?0, (?2), (?3),'APRD', GETDATE(),'REDIST',GETDATE(),'REDIST','N');");
			query.setParameter(0, record.getSID());
			query.setParameter(1, record.getRewardAllocHeaderId());
			query.setParameter(2, record.getAllocationId());
			query.setParameter(3, record.getRewardAmount());
			if(query.executeUpdate() > 2){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in setPayoutRewards", ex);
		}
		return result;
	}
	
	
	
	@SuppressWarnings("unchecked")
	public List<PayoutRedistribution> getPayoutRedistibution(String dealerCode) {
		List<PayoutRedistribution> result = new ArrayList<>();
		try {
			//String q = "select erop.SID, erop.RewardAllocHeaderID, erop.RONumber, erop.PartNumber, erop.LaborSeq, erop.PartSeq, erop.Quantity, erop.ApprovedDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId from EligibleROParts erop join RewardAllocHeader rah on erop.RewardAllocHeaderID = rah.RewardAllocHeaderID and rah.StatusCode = 'OPEN' join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID and rad.ITAStatus = 'RJCT' and rad.DelFlag is null or rad.DelFlag = 'N' where erop.DealerCode = ?0";
			//String q = "select erop.SID, erop.RewardAllocHeaderID, erop.RONumber, erop.PartNumber, erop.LaborSeq, erop.PartSeq, erop.Quantity, rah.RewardDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId, isc.Description, erop.IncentiveID from EligibleROParts erop join RewardAllocHeader rah on erop.RewardAllocHeaderID = rah.RewardAllocHeaderID and rah.StatusCode = 'OPEN' join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID and (rad.DelFlag is null or rad.DelFlag = 'N')"
			//			+ " left join IncentiveSubCodes isc on erop.IncentiveID = isc.IncentiveID and erop.IncentiveSubCodeID = isc.IncentiveSubCodeID where erop.DealerCode = ?0";
			
			/*String q = "select erop.SID, erop.RewardAllocHeaderID, erop.RONumber, erop.PartNumber, erop.LaborSeq, erop.PartSeq, erop.Quantity, rah.RewardDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId, isc.Description, erop.IncentiveID" 
					+" from EligibleROParts erop join RewardAllocHeader rah on erop.RewardAllocHeaderID = rah.RewardAllocHeaderID"
					+" and erop.dealercode = rah.dealercode and erop.incentiveid = rah.IncentiveID and erop.IncentiveSubCodeID  = rah.IncentiveSubCodeID" 
					+" join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID and erop.sid = rad.SID"
					+" left join IncentiveSubCodes isc on erop.IncentiveID = isc.IncentiveID and erop.IncentiveSubCodeID = isc.IncentiveSubCodeID where erop.DealerCode = ?0"
					+" and rah.StatusCode = 'OPEN'" 
					+" and (rad.DelFlag is null or rad.DelFlag = 'N')";*/
			String q = "select RD.SID, RH.RewardAllocHeaderID, RD.RewardAmount, RH.RewardDate,RD.ITAStatus,isc.Description,AH.AllocationID, rh.IncentiveID from AllocationHeader AH"
					+ " Join AllocationDetail AD on AH.AllocationID = AD.AllocationID"
					+" join RewardAllocHeader RH on RH.RewardAllocHeaderID = AH.RewardAllocHeaderID" 
					+" join RewardAllocDetail RD on RD.RewardAllocHeaderID = AH.RewardAllocHeaderID"
					+" join IncentiveSubCodes isc on isc.IncentiveSubCodeID = rh.IncentiveSubCodeID"
					+" where (rd.ITAStatus = 'RJCT' OR rd.ITAStatus = 'CLSE') and (rd.DelFlag is null or rd.DelFlag = 'N') and RH.StatusCode = 'OPEN' and AH.DealerCode = ?0";
			
			final Query query = this.em.createNativeQuery(q, PayoutRedistribution.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutRedistibution", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<PayoutRedistribution> getPCPayoutRedistibution(String dealerCode) {
		List<PayoutRedistribution> result = new ArrayList<>();
		try {
			//String q = "select erop.SID, erop.RewardAllocHeaderID, erop.RONumber, erop.PartNumber, erop.LaborSeq, erop.PartSeq, erop.Quantity, erop.ApprovedDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId from EligibleROParts erop join RewardAllocHeader rah on erop.RewardAllocHeaderID = rah.RewardAllocHeaderID and rah.StatusCode = 'OPEN' join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID and rad.ITAStatus = 'RJCT' and rad.DelFlag is null or rad.DelFlag = 'N' where erop.DealerCode = ?0";
			//String q = "select erop.SID, erop.RewardAllocHeaderID, erop.RONumber, erop.PartNumber, erop.LaborSeq, erop.PartSeq, erop.Quantity, rah.RewardDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId, isc.Description, erop.IncentiveID from PCEligibleROParts erop join RewardAllocHeader rah on erop.RewardAllocHeaderID = rah.RewardAllocHeaderID and rah.StatusCode = 'OPEN' join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID and (rad.DelFlag is null or rad.DelFlag = 'N')"
			//			+ " left join IncentiveSubCodes isc on erop.IncentiveID = isc.IncentiveID and erop.IncentiveSubCodeID = isc.IncentiveSubCodeID where erop.DealerCode = ?0";
			//String q = "select '', erop.AllocationId, erop.InvoiceNumber, erop.PartNumber, 0, 0, erop.Quantity, rah.RewardDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId, isc.Description, erop.IncentiveID from PCEligibleROParts erop join RewardAllocHeader rah on erop.AllocationId = rah.RewardAllocHeaderID and rah.StatusCode = 'OPEN' join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID and (rad.DelFlag is null or rad.DelFlag = 'N')"
			//		+ " left join IncentiveSubCodes isc on erop.IncentiveID = isc.IncentiveID and erop.IncentiveSubCodeID = isc.IncentiveSubCodeID where erop.DealerCode = 0?";
			String q = "select '' as 'SID', erop.AllocationId, erop.InvoiceNumber, erop.PartNumber, 0 'LaborSeq', 0 'PartSeq', erop.Quantity, rah.RewardDate, rad.ITAStatus 'StatusCode', erop.RewardAmount, erop.AllocationId, isc.Description, erop.IncentiveID"
					+ " from PCEligibleROParts erop join RewardAllocHeader rah on erop.AllocationId = rah.RewardAllocHeaderID"
					+ " and erop.DealerCode= rah.DealerCode and erop.IncentiveID = rah.IncentiveID and erop.IncentiveSubCodeID = rah.IncentiveSubCodeID"
					+ " join RewardAllocDetail rad on rah.RewardAllocHeaderID = rad.RewardAllocHeaderID"
					+ " left join IncentiveSubCodes isc on erop.IncentiveID = isc.IncentiveID and erop.IncentiveSubCodeID = isc.IncentiveSubCodeID where erop.DealerCode = ?0"
					+ " and rah.StatusCode = 'OPEN'"
					+ " and (rad.DelFlag is null or rad.DelFlag = 'N')";
			
			final Query query = this.em.createNativeQuery(q, PayoutRedistribution.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPCPayoutRedistibution", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<DistributionInfo> getPCDistributionInfo(String dealerCode) {
		List<DistributionInfo> result = new ArrayList<>();
		try {
			String q = "select InvoiceNumber, InvoiceDate, RewardAmount, DealerCode, PartNumber from PCEligibleROParts where DealerCode = ?0 and BatchId is null and AllocationId is null and StatusCode = 'aprd'";
			final Query query = this.em.createNativeQuery(q, DistributionInfo.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPCDistributionInfo", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<DistributionInfo> getDistributionInfo(int program, String dealerCode) {
		List<DistributionInfo> result = new ArrayList<>();
		try {
			String q = "";
			if(program == 1){
				q = "select e.RONumber 'InvoiceNumber', e.RepairDate'InvoiceDate', e.RewardAmount, e.DealerCode, e.PartNumber from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and e.teamid is not null and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'aprd'";
			}else if(program == 15){
				q = "select e.RONumber 'InvoiceNumber', e.RepairDate'InvoiceDate', e.RewardAmount, e.DealerCode, e.PartNumber from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and i.programgroupid = 15 and e.AllocationId is null and e.StatusCode = 'aprd'";
			}
			final Query query = this.em.createNativeQuery(q, DistributionInfo.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getDistributionInfo", ex);
		}
		return result;
	}
	



}
