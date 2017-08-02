package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.MSERGraphDetailsSummaryDTO;
import com.imperialm.imimserservices.dto.TileDTO;

@Repository
public class MSERTilesDAOImpl {

	private static Logger logger = LoggerFactory.getLogger(LaborOpsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	public List<TileDTO> getMSERMVPPlansSummaryTileSUMByParentAndToggle(String parent, String toggle) {
			String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERMVPPlansSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
			return this.runQuery(parent, toggle, query, "getMSERMVPPlansSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERMVPPlansSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERMVPPlansSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERMVPPlansSummaryTileByChildAndToggle");
	}
	
	public List<TileDTO> getMSERMVPPlansSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERMVPPlansTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERMVPPlansSummaryTileBySIDAndToggle");
	}
	
	public List<TileDTO> getMSERMagnettiMarelliSummaryTileSUMByParentAndToggle(String parent, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERMagnettiMarelliSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
		return this.runQuery(parent, toggle, query, "getMSERMagnettiMarelliSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERMagnettiMarelliSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERMagnettiMarelliSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERMagnettiMarelliSummaryTileByChildAndToggle");
	}
	
	public List<TileDTO> getMSERMagnettiMarelliSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERMagnettiMarelliTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERMagnettiMarelliSummaryTileBySIDAndToggle");
	}

	public List<TileDTO> getMSERMOPartsSummaryTileSUMByParentAndToggle(String parent, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERMOPartsSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
		return this.runQuery(parent, toggle, query, "getMSERMOPartsSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERMOPartsSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERMOPartsSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERMOPartsSummaryTileByChildAndToggle");
	}
	
	public List<TileDTO> getMSERMOPartsSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERMOPartsTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERMOPartsSummaryTileBySIDAndToggle");
	}
	
	public List<TileDTO> getMSERPartsCounterSummaryTileSUMByParentAndToggle(String parent, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERPartsCounterSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
		return this.runQuery(parent, toggle, query, "getMSERPartsCounterSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERPartsCounterSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERPartsCounterSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERPartsCounterSummaryTileByChildAndToggle");
	}
	
	public List<TileDTO> getMSERPartsCounterSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERPartsCounterTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERPartsCounterSummaryTileBySIDAndToggle");
	}
	
	public List<TileDTO> getMSERUConnectSummaryTileSUMByParentAndToggle(String parent, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERUConnectSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
		return this.runQuery(parent, toggle, query, "getMSERUConnectSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERUConnectSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERUConnectSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERUConnectSummaryTileByChildAndToggle");
	}
	
	public List<TileDTO> getMSERUConnectSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERUConnectTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERUConnectSummaryTileBySIDAndToggle");
	}
	
	public List<TileDTO> getMSERWiAdvisorSummaryTileSUMByParentAndToggle(String parent, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERWiAdvisorSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
		return this.runQuery(parent, toggle, query, "getMSERWiAdvisorSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERWiAdvisorSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERWiAdvisorSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERWiAdvisorSummaryTileByChildAndToggle");
	}
	
	public List<TileDTO> getMSERWiAdvisorSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERWiAdvisorTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERWiAdvisorSummaryTileBySIDAndToggle");
	}
	
	public List<TileDTO> getMSERExpressLaneSummaryTileSUMByParentAndToggle(String parent, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Parent] 'child' , ?1 as 'toggle' , SUM([Parts]) 'parts' ,SUM([Earnings]) 'earnings' FROM [dbo].[MSERExpressLaneSummaryTile] where parent = ?0 and toggle = ?1 group by parent";
		return this.runQuery(parent, toggle, query, "getMSERExpressLaneSummaryTileSUMByParentAndToggle");
	}

	public List<TileDTO> getMSERExpressLaneSummaryTileByChildAndToggle(String child, String toggle) {
		String query = "SELECT [Parent] 'parent' ,[Child] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERExpressLaneSummaryTile] where child = ?0 and toggle = ?1";
		return this.runQuery(child, toggle, query, "getMSERExpressLaneSummaryTileByChildAndToggle");
	}

	public List<TileDTO> getMSERExpressLaneSummaryTileBySIDAndToggle(String sid, String toggle) {
		String query = "SELECT [DealerCode] 'parent' ,[SID] 'child' ,[Toggle] 'toggle' ,[Parts] 'parts' ,[Earnings] 'earnings' FROM [dbo].[MSERExpressLaneTile] where SID = ?0 and toggle = ?1";
		return this.runQuery(sid, toggle, query, "getMSERExpressLaneSummaryTileBySIDAndToggle");
	}
	
	@SuppressWarnings("unchecked")
	private List<TileDTO> runQuery(String territory, String toggle, String queryToRun, String function) {
		List<TileDTO> result = new ArrayList<TileDTO>();
		try {
			final Query query = this.em.createNativeQuery(queryToRun, TileDTO.class);
			query.setParameter(0, territory);
			query.setParameter(1, toggle);
			List<TileDTO> rows = query.getResultList();
			result = rows;
		
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in " + function, ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<String> checkEnrollment(String userId, int program, String type, String dealerCode, String positionCode) {
		List<String> result = new ArrayList<String>();
		try {
			
			if(type.equalsIgnoreCase("Participant")){
				final Query query = this.em.createNativeQuery("SELECT [Status] FROM [dbo].[groupsidenrollments] where sid = ?0 and programgroupid = ?1 and Status = 'E' and dealercode = ?2 and delflag = 'N' and positioncode = ?3");
				query.setParameter(0, userId);
				query.setParameter(1, program);
				query.setParameter(2, dealerCode);
				query.setParameter(3, positionCode);
				List<String> rows = (List<String>)query.getResultList();
				result = rows;
			}else if(type.equalsIgnoreCase("Dealer") || type.equalsIgnoreCase("manager")){
				final Query query = this.em.createNativeQuery("SELECT [Status] FROM [dbo].[ProgramGroupEnrollments] where dealerCode = ?0 and programGroupID = ?1 and status = 'E' and delflag = 'N'");
				query.setParameter(0, dealerCode);
				query.setParameter(1, program);
				List<String> rows = (List<String>)query.getResultList();
				result = rows;
			}
		
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in checkEnrollment", ex);
		}
		return result;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<MSERGraphDetailsSummaryDTO> getGraphDetailsSummaryByChildAndProgram(String territory, String program) {
		List<MSERGraphDetailsSummaryDTO> result = new ArrayList<MSERGraphDetailsSummaryDTO>();
		try {
			final Query query = this.em.createNativeQuery("SELECT [Parent] 'parent',[Child] 'child' ,[Program] 'program' ,[DealersEnrolled] 'dealersEnrolled' ,[ParticipantsEnrolled] 'participantsEnrolled' FROM [dbo].[MSERGraphDetailsSummary] where child = ?0 and program = ?1", MSERGraphDetailsSummaryDTO.class);
			query.setParameter(0, territory);
			query.setParameter(1, program);
			List<MSERGraphDetailsSummaryDTO> rows = query.getResultList();
			result = rows;
		
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getGraphDetailsSummaryByChildAndProgram", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public List<MSERGraphDetailsSummaryDTO> getGraphDetailsSummarySUMByParentAndProgram(String territory, String program) {
		List<MSERGraphDetailsSummaryDTO> result = new ArrayList<MSERGraphDetailsSummaryDTO>();
		try {
			final Query query = this.em.createNativeQuery("SELECT [Parent] 'parent', ?0 'child' ,[Program] 'program' ,SUM([DealersEnrolled]) 'dealersEnrolled' ,SUM([ParticipantsEnrolled]) 'participantsEnrolled' FROM [dbo].[MSERGraphDetailsSummary] where parent = ?0 and program = ?1 group by parent, program", MSERGraphDetailsSummaryDTO.class);
			query.setParameter(0, territory);
			query.setParameter(1, program);
			List<MSERGraphDetailsSummaryDTO> rows = query.getResultList();
			result = rows;
		
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getGraphDetailsSummarySUMByParentAndProgram", ex);
		}
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public int getMSERCountNATByType(String type) {
		int result = 0;
		try {
			
			if(type.equalsIgnoreCase("dealers")){
				Query query = this.em.createNativeQuery("SELECT ISNULL(count(Distinct(sid)), 0) FROM [dbo].[MSERGraphDetails]");
				List<Integer> rows = (List<Integer>)query.getResultList();
				result = rows.get(0);
			}else if(type.equalsIgnoreCase("participants")){
				Query query = this.em.createNativeQuery("SELECT ISNULL(count(Distinct(dealercode)), 0) FROM [dbo].[MSERGraphDetails]");
				List<Integer> rows = (List<Integer>)query.getResultList();
				result = rows.get(0);
			}
		} catch (final NoResultException ex) {
			logger.info("result in else " + result);
		} catch (final Exception ex) {
			logger.error("error occured in getMSERCountNATByType", ex);
		}
		return result;
	}
	
	
}
