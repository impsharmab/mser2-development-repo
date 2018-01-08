package com.imperialm.imimserservices.dao;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
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
				final Query query = this.em.createNativeQuery("select ISNULL(sum(RewardAmount),0) from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid join GroupTeams gt on gt.TeamID = e.TeamID and e.DealerCode = gt.DealerCode where e.DealerCode = ?0 and e.BatchId is null and e.teamid is not null and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'EL-C' and gt.DelFlag = 'N'");
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
				final Query query = this.em.createNativeQuery("select ISNULL(sum(RewardAmount),0) from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and i.programgroupid = 15 and e.AllocationId is null and e.StatusCode = 'UM-C' and e.PositionCode = '13'");
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
						+ " select ISNULL(SUM(al.RewardValue),0) from ("
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
	public Integer addToAllocationTable(String dealerCode, String user, int program, String teamId) {
		Integer result = null;

		try (
				Connection connection = dc.getConnection();
				PreparedStatement statement = connection.prepareStatement("INSERT INTO [AllocationHeader] "
						+"([TeamId],[DealerCode],[StatusCode],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[DelFlag],[IncentiveID],[IncentiveSubCodeID]) "
						+"VALUES(?,?,'APRD',GetDate(),?,GetDate(),?,'N',?,?)",
						Statement.RETURN_GENERATED_KEYS);
				) {

			statement.setString(1, teamId);
			statement.setString(2, dealerCode);
			statement.setString(3, user);
			statement.setString(4, user);
			statement.setInt(5, program);
			statement.setInt(6, program);


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
	public boolean addToAllocationDetailsTable(String sid, double amount, String user, int allocationId, Date date) {
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
							+"VALUES(?0,(?1),(?2),'APRD',?4,?3,GetDate(),?3,'N')");

			query.setParameter(0,sid);
			query.setParameter(1,allocationId);
			query.setParameter(2,amount);
			query.setParameter(3,user);
			query.setParameter(4,date);


			return query.executeUpdate() > 0;

		}catch(Exception e){
			return result;
		}
	}

	@Transactional
	public boolean updatePCEligibleROPartsWhereAllocationIdIsNull(String dealerCode, int allocationId) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery("update [PCEligibleROParts] set [AllocationId] = (?1) where [DealerCode] = ?0 and [BatchId] is null and [AllocationId] is null and [StatusCode] = 'APRD'");
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
	public boolean updateEligibleROPartsWhereAllocationIdIsNull(String dealerCode, int allocationId, int incentiveId, String statusCode, int programId) {
		boolean result = false;
		try {
			Query query = this.em.createNativeQuery("update [EligibleROParts] set [AllocationId] = (?1) , [StatusCode] = ?3 where [DealerCode] = ?0 and [BatchId] is null and [AllocationId] is null and [IncentiveID] = (?2)");
			if(programId == -15){
				query = this.em.createNativeQuery("update [EligibleROParts] set [AllocationId] = (?1) , [StatusCode] = ?3 where [DealerCode] = ?0 and [BatchId] is null and [AllocationId] is null and [IncentiveID] = (?2) and [PositionCode] = 13");
			}
			query.setParameter(0, dealerCode);
			query.setParameter(1, allocationId);
			query.setParameter(2, incentiveId);
			query.setParameter(3, statusCode);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updateEligibleROPartsWhereAllocationIdIsNull", ex);
		}
		return result;
	}

	@Transactional
	public boolean updateEligibleROPartsWhereAllocationIdIsNullForEL(String dealerCode, int allocationId, int incentiveId, String statusCode, int programId, String teamId) {
		boolean result = false;
		try {
			Query query = this.em.createNativeQuery("update [EligibleROParts] set [AllocationId] = (?1) , [StatusCode] = ?3 where [DealerCode] = ?0 and [BatchId] is null and [TeamId] = ?4 and [AllocationId] is null and [IncentiveID] = (?2)");
			query.setParameter(0, dealerCode);
			query.setParameter(1, allocationId);
			query.setParameter(2, incentiveId);
			query.setParameter(3, statusCode);
			query.setParameter(4, teamId);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in updateEligibleROPartsWhereAllocationIdIsNullForEL", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public String getTeamId(String dealerCode, int incentiveId, Integer allocationId) {
		String id = "";
		List<String> resultList = new ArrayList<>();
		try {

			final Query query = this.em.createNativeQuery("Select TeamId from [EligibleROParts] where [DealerCode] = ?0 and [BatchId] is null and [AllocationId] = (?1) and [IncentiveID] = (?2) and TeamID is not null");
			query.setParameter(0, dealerCode);
			query.setParameter(2, incentiveId);
			query.setParameter(1, allocationId);
			resultList = (List<String>) query.getResultList();
			if(resultList.size() > 0){
				id = resultList.get(0);
			}
			if(id == null){
				id = "";
			}
		} catch (final Exception ex) {
			logger.error("error occured in getTeamId", ex);
		}
		return id;
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
			//final Query query = this.em.createNativeQuery("select distinct a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy, GetDate() 'ExpectedPayoutDate', h.TeamId from AllocationDetail a join DealerPersonnel d on d.SID = a.SID join AllocationHeader h on h.AllocationID = a.AllocationID and h.DealerCode = ?0 and h.DelFlag = 'N' and d.DealerCode = h.DealerCode where h.StatusCode = 'APRD' and a.StatusCode = 'APRD' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1) and a.DelFlag = 'N'", RedistributionHistory.class);
			/*String q = "select distinct ISNULL(gt.TeamName,'') 'TeamName', a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy, GetDate() 'ExpectedPayoutDate', h.TeamId from AllocationDetail a join DealerPersonnel d on d.SID = a.SID join AllocationHeader h on h.AllocationID = a.AllocationID and h.DealerCode = ?0 and h.DelFlag = 'N' and d.DealerCode = h.DealerCode"
						+ " left join GroupTeams gt on h.TeamID = gt.TeamID"
						+ " where h.StatusCode = 'APRD' and a.StatusCode = 'APRD' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1) and a.DelFlag = 'N'";*/
			String q = "select distinct ISNULL(gt.TeamName,'') 'TeamName', a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy, P.ExpectedPayoutDate, h.TeamId" 
					+ " from AllocationDetail a join DealerPersonnel d on d.SID = a.SID"
					+ " join AllocationHeader h on h.AllocationID = a.AllocationID and h.DealerCode = ?0 and h.DelFlag = 'N' and d.DealerCode = h.DealerCode"
					+ " left join GroupTeams gt on h.TeamID = gt.TeamID and gt.dealercode=h.dealercode"
					+ " left join PayoutSchedule P on Convert (Date,H.CreatedDate) between P.StartDate and P.EndDate"
					+ " where h.StatusCode = 'APRD' and a.StatusCode = 'APRD' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1) and a.DelFlag = 'N' ";
			final Query query = this.em.createNativeQuery(q, RedistributionHistory.class);

			//String q = "select ISNULL(sum(RewardAmount),0) from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and e.teamid is not null and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'EL-C'";

			//final Query query = this.em.createNativeQuery("select distinct a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy, ps.ExpectedPayoutDate from AllocationDetail a join DealerPersonnel d on d.SID = a.SID join AllocationHeader h on h.AllocationID = a.AllocationID and h.DealerCode = ?0 and h.DelFlag = 'N' and d.DealerCode = h.DealerCode join PayoutSchedule ps on h.createddate between ps.startdate and ps.enddate where h.StatusCode = 'APRD' and a.StatusCode = 'APRD' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1) and a.DelFlag = 'N'", RedistributionHistory.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, program);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRedistribtionInfo", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<RedistributionHistory> getELRedistribtionInfo(String dealerCode, String teamId) {
		List<RedistributionHistory> result = new ArrayList<>();
		try {
			String q = "select distinct ISNULL(gt.TeamName,'') 'TeamName', a.AllocationID, a.SID, d.FirstName, d.LastName,a.Amount, a.UpdatedDate, a.UpdatedBy, GetDate() 'ExpectedPayoutDate', h.TeamId from AllocationDetail a join DealerPersonnel d on d.SID = a.SID join AllocationHeader h on h.AllocationID = a.AllocationID and h.DealerCode = ?0 and h.DelFlag = 'N' and d.DealerCode = h.DealerCode"
					+ " left join GroupTeams gt on h.TeamID = gt.TeamID"
					+ " where h.StatusCode = 'APRD' and a.StatusCode = 'APRD' and h.IncentiveID = (?1) and h.IncentiveSubCodeID = (?1) and a.DelFlag = 'N' and h.TeamID = ?2";
			final Query query = this.em.createNativeQuery(q, RedistributionHistory.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, -1);
			query.setParameter(2, teamId);

			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getELRedistribtionInfo", ex);
		}
		return result;
	}


	@SuppressWarnings("unchecked")
	public List<RedistributionHistory> getRedistribtionInfoEL(String dealerCode) {
		List<RedistributionHistory> result = new ArrayList<>();
		try {


			//"select ISNULL(sum(RewardAmount),0) from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and e.teamid is not null and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'EL-C'"

			String q = "select ISNULL(gt.TeamName,'') 'TeamName', e.AllocationId, e.SID,  '' as 'FirstName' , '' as 'LastName', e.RewardAmount 'Amount', e.ApprovedDate 'UpdatedDate', e.SID 'UpdatedBy', GetDate() 'ExpectedPayoutDate', e.TeamId from EligibleROParts e" 
					+ " join Incentives i on i.incentiveid= e.incentiveid"
					+ " join GroupTeams gt on e.TeamID = gt.TeamID and e.DealerCode = gt.DealerCode"
					+ " where e.DealerCode = ?0 and e.BatchId is null and e.teamid is not null and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'EL-C' and gt.DelFlag = 'N'";
			final Query query = this.em.createNativeQuery(q, RedistributionHistory.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRedistribtionInfoEL", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<RedistributionHistory> getRedistribtionInfoELByTeamId(String dealerCode, String teamId) {
		List<RedistributionHistory> result = new ArrayList<>();
		try {
			String q = "select ISNULL(gt.TeamName,'') 'TeamName', e.AllocationId, e.SID, '' as 'FirstName', '' as 'LastName', e.RewardAmount 'Amount', e.ApprovedDate 'UpdatedDate', e.SID 'UpdatedBy', GetDate() 'ExpectedPayoutDate', e.TeamId from EligibleROParts e" 
					+ " join Incentives i on i.incentiveid= e.incentiveid"
					//+ " right join DealerPersonnel d on d.SID = e.SID"
					+ " join GroupTeams gt on e.TeamID = gt.TeamID and e.DealerCode = gt.DealerCode"
					+ " where e.DealerCode = ?0 and e.BatchId is null and e.teamid = ?1 and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'EL-C' and gt.DelFlag = 'N'";
			final Query query = this.em.createNativeQuery(q, RedistributionHistory.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, teamId);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getRedistribtionInfoELByTeamId", ex);
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
					+ "update [AllocationHeader] set [UpdatedDate] = GetDate() , [UpdatedBy] = ?1 where [AllocationID] = (?0) ;"
					+ "update [AllocationDetail] set [UpdatedDate] = GetDate() , [UpdatedBy] = ?1, [DelFlag] = 'Y', [StatusCode]='DELT' where [AllocationID] = (?0) ;");
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
			if(programId == -15){
				q = "update [EligibleROParts] set [AllocationId] = null, [StatusCode] = 'UM-C' where [BatchID] is null and [AllocationId] =(?0) ;";
			}
			if(programId == -1){
				q = "update [EligibleROParts] set [AllocationId] = null, [StatusCode] = 'EL-C' where [BatchID] is null and [AllocationId] =(?0) ;";
			}
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
	public boolean setMVPRewards(MVPDistribution record, Date date) {
		boolean result = false;
		try {
			final Query query = this.em.createNativeQuery(""
					+ "update [ContractSales] set [ApproveDate] = ?2 , [SID] = ?1, [StatusCode] = 'CPND' where [ContractID] = (?0)");
			query.setParameter(0, record.getContractID());
			query.setParameter(1, record.getSID());
			query.setParameter(2, date);
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in setMVPRewards", ex);
		}
		return result;
	}


	@Transactional
	public boolean setPayoutRewards(PayoutRedistribution record, String name) {
		boolean result = false;
		try {
			//FORMAT IF NOT ALOOCLIDK IS NULL // TALK TO SAI ABOUT REWARDALLOCHEADER INSERT
			//Grab the sid name

			String q = "if exists (select * from PCEligibleROParts where IncentiveID = 0)"
					+ " Begin"
					+ " update [PCEligibleROParts] set [StatusCode] = 'APRD', [BatchID] = null where [AllocationId]=(?2) ;"
					+ " update [AllocationDetail] set [DelFlag] = 'Y', [UpdatedDate] = GetDate(), [UpdatedBy] = ?13 where [AllocationId] = (?2);"
					+ " INSERT INTO [AllocationDetail] ([SID],[AllocationID],[Amount],[StatusCode],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[DelFlag])"
					+ " VALUES (?0, (?2), (?3),'APRD', GETDATE(), ?13 ,GETDATE(), ?13 ,'N');"
					+ " END"
					+ " ELSE"
					+ " BEGIN"
					+ " update [EligibleROParts] set [SID] = ?0, [StatusCode] = 'APRD', [BatchID] = null where [RewardAllocHeaderID]= (?1) and PositionCode = ?6 and RONumber = ?7 and PartNumber = ?8 and IncentiveID = (?9) and BatchID = (?10) and LaborSeq = (?11) and PartSeq = (?12) ;"
					+ " update [RewardAllocDetail] set [DelFlag] = 'Y' where [RewardAllocHeaderID] = (?1) ;"
					+ " update [AllocationDetail] set [DelFlag] = 'Y', [UpdatedDate] = GetDate(), [UpdatedBy] = ?13 where [AllocationId] = (?2);"
					//+ " INSERT INTO [dbo].[RewardAllocDetail]([RewardAllocHeaderID],[SID],[NAME],[RewardAmount],[BatchID],[ITAStatus],[Flag],[DelFlag])"
					//+ " VALUES((?1),?0,?5, (?4),null,'OPEN','OPEN','N');"
					+ " INSERT INTO [AllocationDetail] ([SID],[AllocationID],[Amount],[StatusCode],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[DelFlag])"
					+ " VALUES (?0, (?2), (?3),'APRD', GETDATE(), ?13 ,GETDATE(), ?13 ,'N');"
					+ " END";
			if(record.getAllocationId() == null){
				q = "update [EligibleROParts] set [SID] = ?0, [StatusCode] = 'APRD', [BatchID] = null where [RewardAllocHeaderID]= (?1) and PositionCode = ?6 and RONumber = ?7 and PartNumber = ?8 and IncentiveID = (?9) and BatchID = (?10) and LaborSeq = (?11) and PartSeq = (?12) ;"
						+ " update [RewardAllocDetail] set [DelFlag] = 'Y' where [RewardAllocHeaderID] = (?1) ;";
				//+ " INSERT INTO [dbo].[RewardAllocDetail]([RewardAllocHeaderID],[SID],[NAME],[RewardAmount],[BatchID],[ITAStatus],[Flag],[DelFlag])"
				//+ " VALUES((?1),?0,?5, (?4),null,'OPEN','OPEN','N');";
			}

			final Query query = this.em.createNativeQuery(q);
			query.setParameter(0, record.getSID());
			query.setParameter(1, record.getRewardAllocHeaderId());

			//
			query.setParameter(6, record.getPositionCode());
			query.setParameter(7, record.getRONumber());
			query.setParameter(8, record.getPartNumber());
			query.setParameter(9, record.getIncentiveID());
			query.setParameter(10, record.getBatchID());
			query.setParameter(11, record.getLaborSeq());
			query.setParameter(12, record.getPartSeq());
			if(record.getAllocationId() != null){
				query.setParameter(2, record.getAllocationId());
				query.setParameter(3, record.getRewardAmount());
				query.setParameter(13, name);
			}else{
				//query.setParameter(4, record.getRewardAmount());
				//query.setParameter(5, name);

			}
			//Check was 2 
			if(query.executeUpdate() > 0){
				result = true;
			}
		} catch (final Exception ex) {
			logger.error("error occured in setPayoutRewards", ex);
		}
		return result;
	}



	/*@SuppressWarnings("unchecked")
	public List<PayoutRedistribution> getPayoutRedistibution(String dealerCode) {		List<PayoutRedistribution> result = new ArrayList<>();
	try {

		String q = "select distinct ep.SID, ep.DealerCode,  Ep.RewardAllocHeaderID, ep.RewardAmount, rwds.RewardDate, RWDS.ITAStatus, isc.Description, ep.AllocationId, ep.IncentiveID , ep.RONumber, ep.PartNumber, ep.LaborSeq, ep.PartSeq, ep.quantity, ep.PositionCode, rwds.BatchID from Eligibleroparts ep" 
				+ " join ( select h.RewardDate, d.ITAStatus, h.dealercode, h.incentiveid, h.incentivesubcodeid, d.sid , d.rewardamount, d.batchid ,h.RewardAllocHeaderID from RewardAllocHeader H join RewardAllocDetail d on H.RewardAllocHeaderID = d.RewardAllocHeaderID"
				+ " where (d.ITAStatus = 'RJCT' OR d.ITAStatus = 'CLSE' ) ) RWDS  on" 
				+ " ep.batchid = RWDS.batchid"
				+ " and ep.IncentiveID = RWDS.IncentiveID"
				+ " and ep.IncentiveSubCodeID = RWDS.IncentiveSubCodeID"
				+ " and ep.DealerCode = RWDS.DealerCode"
				+ " and RWDS.DealerCode = ?0"
				+ " and ep.sid = RWDS.SID"
				+ " and ep.RewardAllocHeaderID = RWDS.RewardAllocHeaderID"
				+ " Join IncentiveSubCodes ISc on isc.IncentiveSubCodeID = ep.IncentiveSubCodeID"
				+ " order by rwds.BatchID desc, ep.sid";

		final Query query = this.em.createNativeQuery(q, PayoutRedistribution.class);
		query.setParameter(0, dealerCode);
		result = query.getResultList();
	} catch (final Exception ex) {
		logger.error("error occured in getPayoutRedistibution", ex);
	}
	return result;
	}*/


	@SuppressWarnings("unchecked")
	public List<PayoutRedistribution> getPayoutRedistibutionRJCT(String dealerCode) {
		List<PayoutRedistribution> result = new ArrayList<>();
		try {

			String q = "select distinct ep.SID, ep.DealerCode,  Ep.RewardAllocHeaderID, ep.RewardAmount, rwds.RewardDate, RWDS.ITAStatus, isc.Description, ep.AllocationId, ep.IncentiveID , ep.RONumber, ep.PartNumber, ep.LaborSeq, ep.PartSeq, ep.quantity, ep.PositionCode, rwds.BatchID from Eligibleroparts ep" 
					+ " join ( select h.RewardDate, d.ITAStatus, h.dealercode, h.incentiveid, h.incentivesubcodeid, d.sid , d.rewardamount, d.batchid ,h.RewardAllocHeaderID from RewardAllocHeader H join RewardAllocDetail d on H.RewardAllocHeaderID = d.RewardAllocHeaderID"
					+ " where (d.ITAStatus = 'RJCT' and d.flag = 'OPEN') ) RWDS  on" 
					+ " ep.batchid = RWDS.batchid"
					+ " and ep.IncentiveID = RWDS.IncentiveID"
					+ " and ep.IncentiveSubCodeID = RWDS.IncentiveSubCodeID"
					+ " and ep.DealerCode = RWDS.DealerCode"
					+ " and RWDS.DealerCode = ?0"
					+ " and ep.sid = RWDS.SID"
					+ " and ep.RewardAllocHeaderID = RWDS.RewardAllocHeaderID"
					+ " Join IncentiveSubCodes ISc on isc.IncentiveSubCodeID = ep.IncentiveSubCodeID"
					+ " order by rwds.BatchID desc, ep.sid";

			final Query query = this.em.createNativeQuery(q, PayoutRedistribution.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutRedistibutionRJCT", ex);
		}
		return result;
	}


	@SuppressWarnings("unchecked")
	public List<PayoutRedistribution> getPayoutRedistibutionCLSE(String dealerCode, List<Integer> rewardAllocHeaderID){
		List<PayoutRedistribution> result = new ArrayList<>();
		try {

			String q = "select distinct ep.SID, ep.DealerCode,  Ep.RewardAllocHeaderID, ep.RewardAmount, rwds.RewardDate, RWDS.ITAStatus, isc.Description, ep.AllocationId, ep.IncentiveID , ep.RONumber, ep.PartNumber, ep.LaborSeq, ep.PartSeq, ep.quantity, ep.PositionCode, rwds.BatchID from Eligibleroparts ep" 
					+ " join ( select h.RewardDate, d.ITAStatus, h.dealercode, h.incentiveid, h.incentivesubcodeid, d.sid , d.rewardamount, d.batchid ,h.RewardAllocHeaderID from RewardAllocHeader H join RewardAllocDetail d on H.RewardAllocHeaderID = d.RewardAllocHeaderID"
					+ " where (d.ITAStatus = 'CLSE' and h.RewardAllocHeaderID IN (?1) ) ) RWDS  on" 
					+ " ep.batchid = RWDS.batchid"
					+ " and ep.IncentiveID = RWDS.IncentiveID"
					+ " and ep.IncentiveSubCodeID = RWDS.IncentiveSubCodeID"
					+ " and ep.DealerCode = RWDS.DealerCode"
					+ " and RWDS.DealerCode = ?0"
					+ " and ep.sid = RWDS.SID"
					+ " and ep.RewardAllocHeaderID = RWDS.RewardAllocHeaderID"
					+ " Join IncentiveSubCodes ISc on isc.IncentiveSubCodeID = ep.IncentiveSubCodeID"
					+ " order by rwds.BatchID desc, ep.sid";

			final Query query = this.em.createNativeQuery(q, PayoutRedistribution.class);
			query.setParameter(0, dealerCode);
			query.setParameter(1, rewardAllocHeaderID);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutRedistibutionCLSE", ex);
		}
		return result;
	}













	@SuppressWarnings("unchecked")
	public List<PayoutRedistribution> getPCPayoutRedistibution(String dealerCode) {
		List<PayoutRedistribution> result = new ArrayList<>();
		try {

			String q = "select distinct ep.SID,ep.DealerCode, Ep.RewardAllocHeaderID, ep.RewardAmount, RWDS.RewardDate, RWDS.ITAStatus, isc.Description, ep.AllocationId, ep.IncentiveID , ep.RONumber, ep.PartNumber, ep.LaborSeq, ep.PartSeq, ep.quantity, '' as 'PositionCode', rwds.BatchID"
					+ " from (select h.AllocationID, DealerCode, IncentiveID, IncentiveSubCodeId, d.SID, h.RewardAllocHeaderID, d.Amount 'RewardAmount', '' RONumber, '' PartNumber , '' LaborSeq, '' PartSeq, '' Quantity, h.StatusCode from AllocationHeader h Join AllocationDetail d on h.allocationID = d.allocationID where d.DelFlag = 'n' and h.DelFlag = 'n' )   ep" 
					+ " join ( select d.ITAStatus, h.RewardDate, h.dealercode, h.incentiveid, h.incentivesubcodeid, d.sid , d.rewardamount, d.batchid ,h.RewardAllocHeaderID from RewardAllocHeader H join RewardAllocDetail d on H.RewardAllocHeaderID = d.RewardAllocHeaderID"
					+ " where d.DelFlag = 'n' and (d.ITAStatus = 'RJCT' OR d.ITAStatus = 'CLSE')) RWDS  on" 
					+ " ep.IncentiveID = RWDS.IncentiveID"
					+ " and ep.IncentiveSubCodeID = RWDS.IncentiveSubCodeID"
					+ " and ep.DealerCode = RWDS.DealerCode"
					+ " and RWDS.DealerCode = ?0"
					+ " and ep.sid = RWDS.SID"
					+ " and ep.RewardAllocHeaderID = RWDS.RewardAllocHeaderID"
					+ " Join IncentiveSubCodes ISc on isc.IncentiveSubCodeID = ep.IncentiveSubCodeID"
					+ " order by rwds.BatchID desc, ep.sid";

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
			//String q = "select InvoiceNumber, InvoiceDate, SUM(RewardAmount) 'RewardAmount', DealerCode, PartNumber from PCEligibleROParts where DealerCode = ?0 and BatchId is null and AllocationId is null and StatusCode = 'aprd' group by InvoiceNumber, InvoiceDate, DealerCode, PartNumber";
			String q = "select InvoiceNumber, InvoiceDate, SUM(RewardAmount) 'RewardAmount', DealerCode, PartNumber from PCEligibleROParts where DealerCode = ?0 and BatchId is null and AllocationId is null and StatusCode = 'aprd' and RewardAmount > 0 group by InvoiceNumber, InvoiceDate, DealerCode, PartNumber";
			final Query query = this.em.createNativeQuery(q, DistributionInfo.class);
			query.setParameter(0, dealerCode);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPCDistributionInfo", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<DistributionInfo> getDistributionInfo(int program, String dealerCode, String teamId) {
		List<DistributionInfo> result = new ArrayList<>();
		try {
			String q = "";
			if(program == 1){
				//q = "select e.RONumber 'InvoiceNumber', e.RepairDate'InvoiceDate', e.RewardAmount, e.DealerCode, e.PartNumber from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and e.teamid = ?1 and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'el-c'";
				q = "select e.RONumber 'InvoiceNumber', e.RepairDate'InvoiceDate', SUM(e.RewardAmount) 'RewardAmount', e.DealerCode, e.PartNumber from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and e.teamid = ?1 and i.programgroupid = 1 and e.AllocationId is null and e.StatusCode = 'el-c' group by e.RONumber, e.RepairDate, e.DealerCode, e.PartNumber";
			}else if(program == 15){
				//q = "select e.RONumber 'InvoiceNumber', e.RepairDate'InvoiceDate', e.RewardAmount, e.DealerCode, e.PartNumber from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and i.programgroupid = 15 and e.AllocationId is null and e.StatusCode = 'um-c'";
				q = "select e.RONumber 'InvoiceNumber', e.RepairDate'InvoiceDate', SUM(e.RewardAmount) 'RewardAmount', e.DealerCode, e.PartNumber from EligibleROParts e join Incentives i on i.incentiveid= e.incentiveid where e.DealerCode = ?0 and e.BatchId is null and i.programgroupid = 15 and e.AllocationId is null and e.StatusCode = 'um-c' group by e.RONumber, e.RepairDate, e.DealerCode, e.PartNumber";
			}
			final Query query = this.em.createNativeQuery(q, DistributionInfo.class);
			query.setParameter(0, dealerCode);
			if(program == 1){
				query.setParameter(1, teamId);
			}
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getDistributionInfo", ex);
		}
		return result;
	}




}
