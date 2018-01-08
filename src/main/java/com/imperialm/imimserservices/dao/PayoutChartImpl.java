package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.IPartsDTO;
import com.imperialm.imimserservices.dto.PayoutChartMainModel;
import com.imperialm.imimserservices.model.PayoutRedistribution;

@Repository
public class PayoutChartImpl {

	private static Logger logger = LoggerFactory.getLogger(DealerInfoDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	//getdate()
	
	String MAIN_QUERY = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			//+ " join incentives i on (?2 between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?0 and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";
	
	String MAIN_QUERY_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?0 and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";

	String MAIN_QUERY_NULL = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";
	
	String MAIN_QUERY_NULL_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";

	String PROGRAM_QUERY = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?1 and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";
	
	String PROGRAM_QUERY_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?1 and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";
	

	String PROGRAM_QUERY_NULL = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";

	String PROGRAM_QUERY_NULL_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on (?2 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1 and ir.RewardTypeID = 2"
			+ " order by ir.RewardValue DESC";

	
	String GET_PARTS = "select ip.PartNumber from IncentiveParts ip"
			+ " join IncentiveSubCodes isc on (?1 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
			+ " where ip.IncentiveSubCodeID = (?0)";

	String GET_PARTS_LIST = "select ip.IncentiveSubCodeID, ip.PartNumber from IncentiveParts ip"
			+ " join IncentiveSubCodes isc on (?1 between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
			+ " where ip.IncentiveSubCodeID IN (?0) and ip.IsPartVisible = 'Y'";
	
	
	/*String MAIN_QUERY = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?0 and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1 and ir.RewardValue > 0"
			+ " order by ir.RewardValue DESC";
	
	String MAIN_QUERY_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?0 and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";

	String MAIN_QUERY_NULL = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";
	
	String MAIN_QUERY_NULL_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID not in (select IncentiveID from incentives where ProgramGroupID in (6,15)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";

	String PROGRAM_QUERY = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?1 and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1 and ir.RewardValue > 0"
			+ " order by ir.RewardValue DESC";
	
	String PROGRAM_QUERY_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode = ?1 and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";
	

	String PROGRAM_QUERY_NULL = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1"
			+ " order by ir.RewardValue DESC";

	String PROGRAM_QUERY_NULL_OVERRIDE = "select distinct ir.IncentiveID, ir.RewardTypeID , ir.PositionCode, dpp.Name 'PCName', ir.IsOverrideReward, ir.OverridePercentage, ir.RewardValue, isc.Description, pg.Name, ir.IncentiveSubCodeID, i.ImageURL from IncentiveRewards ir"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ir.IncentiveSubCodeID"
			+ " join incentives i on ('11-1-2017' between i.StartDate  and i.EndDate) and ir.IncentiveID = i.IncentiveID and isc.IncentiveID = i.IncentiveID"
			+ " join ProgramGroups pg on i.ProgramGroupID = pg.ProgramGroupID"
			+ " join DealerPersonnelPositions dpp on ir.PositionCode = dpp.PositionCode"
			+ " where ir.PositionCode is null and isc.IsDescVisible = 'Y' and ir.IncentiveID in (select IncentiveID from incentives where ProgramGroupID in (?0)) and isc.IncentiveSubCode <> '1' and i.IncentiveTypeID = 1 and ir.RewardTypeID = 2"
			+ " order by ir.RewardValue DESC";

	
	String GET_PARTS = "select ip.PartNumber from IncentiveParts ip"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
			+ " where ip.IncentiveSubCodeID = (?0) and ip.Status = 'Y' and ip.IsPartVisible = 'Y'";

	String GET_PARTS_LIST = "select ip.IncentiveSubCodeID, ip.PartNumber from IncentiveParts ip"
			+ " join IncentiveSubCodes isc on ('11-1-2017' between isc.StartDate  and isc.EndDate) and isc.IncentiveSubCodeID = ip.IncentiveSubCodeID"
			+ " where ip.IncentiveSubCodeID IN (?0) and ip.Status = 'Y' and ip.IsPartVisible = 'Y'";*/

	@SuppressWarnings("unchecked")
	public List<PayoutChartMainModel> getPayoutByPositionCode(String positionCode, Date date) {
		List<PayoutChartMainModel> result = new ArrayList<>();
		try {
			String q = MAIN_QUERY;
			if(positionCode == null){
				q = this.MAIN_QUERY_NULL;
			}
			final Query query = this.em.createNativeQuery(q, PayoutChartMainModel.class);
			query.setParameter(0, positionCode);
			query.setParameter(2, date);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutByPositionCode", ex);
		}
		return result;
	}


	@SuppressWarnings("unchecked")
	public List<PayoutChartMainModel> getPayoutByPositionCodeAndProgramId(String positionCode, int programId, Date date) {
		List<PayoutChartMainModel> result = new ArrayList<>();
		try {
			String q = PROGRAM_QUERY;
			if(positionCode == null){
				q = this.PROGRAM_QUERY_NULL;
			}
			final Query query = this.em.createNativeQuery(q, PayoutChartMainModel.class);
			query.setParameter(0, programId);
			if(positionCode != null){
				query.setParameter(1, positionCode);
			}
			query.setParameter(2, date);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutByPositionCodeAndProgramId", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<PayoutChartMainModel> getPayoutOverrideByPositionCode(String positionCode, Date date) {
		List<PayoutChartMainModel> result = new ArrayList<>();
		try {
			String q = MAIN_QUERY_OVERRIDE;
			if(positionCode == null){
				q = this.MAIN_QUERY_NULL_OVERRIDE;
			}
			final Query query = this.em.createNativeQuery(q, PayoutChartMainModel.class);
			query.setParameter(0, positionCode);
			query.setParameter(2, date);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutOverrideByPositionCode", ex);
		}
		return result;
	}


	@SuppressWarnings("unchecked")
	public List<PayoutChartMainModel> getPayoutOverrideByPositionCodeAndProgramId(String positionCode, int programId, Date date) {
		List<PayoutChartMainModel> result = new ArrayList<>();
		try {
			String q = PROGRAM_QUERY_OVERRIDE;
			if(positionCode == null){
				q = this.PROGRAM_QUERY_NULL_OVERRIDE;
			}
			final Query query = this.em.createNativeQuery(q, PayoutChartMainModel.class);
			query.setParameter(0, programId);
			if(positionCode != null){
				query.setParameter(1, positionCode);
			}
			query.setParameter(2, date);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getPayoutOverrideByPositionCodeAndProgramId", ex);
		}
		return result;
	}
	

	@SuppressWarnings("unchecked")
	public List<IPartsDTO> getParts(List<Integer> incentiveSubCodeId, Date date) {
		List<IPartsDTO> result = new ArrayList<>();
		try {
			if(incentiveSubCodeId.size()>0){
				final Query query = this.em.createNativeQuery(GET_PARTS_LIST, IPartsDTO.class);
				query.setParameter(0, incentiveSubCodeId);
				query.setParameter(1, date);
				result = query.getResultList();
			}
		} catch (final Exception ex) {
			logger.error("error occured in getParts", ex);
		}
		return result;
	}



}
