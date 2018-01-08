package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.TwoStringItems;

@Repository
public class ProgramGroupDAOImpl implements ProgramGroupDAO {

	private static Logger logger = LoggerFactory.getLogger(ProgramGroupDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	@SuppressWarnings("unchecked")
	public List<TwoStringItems> getSummaryRepairOrdersReportProgramList(){
		
		String q = "Select distinct Right(PG.Name, len(PG.Name) - charindex('-', PG.Name)) as 'item1',PG.programGroupID as 'item2' from ("
					+ " Select distinct IncentiveID from SummaryRepairOrders) RS"
					+ " inner join Incentives I"
					+ " ON RS.IncentiveID=I.IncentiveID"
					+ " Inner join ProgramGroups PG"
					+ " ON I.ProgramGroupID=Pg.ProgramGroupID";
		//String q = "select distinct pg.Name 'name', pg.ProgramGroupID 'value' from ProgramGroups pg join Incentives i on pg.ProgramGroupID = i.ProgramGroupID where pg.DelFlag = 'N'";
		List<TwoStringItems> result = new ArrayList<>();
		try {			
			final Query query = this.em.createNativeQuery(q, TwoStringItems.class);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getReportProgramList", ex);
		}
		return result;
		
	}
	
	
	@SuppressWarnings("unchecked")
	public List<TwoStringItems> getRewardDepositReportProgramList(){
		
		String q = "Select distinct Right(PG.Name, len(PG.Name) - charindex('-', PG.Name)) as 'item1',PG.programGroupID as 'item2' from ("
				+ " Select distinct IncentiveID from RewardSummary) RS"
				+ " inner join Incentives I"
				+ " ON RS.IncentiveID=I.IncentiveID"
				+ " Inner join ProgramGroups PG"
				+ " ON I.ProgramGroupID=Pg.ProgramGroupID";
		//String q = "select distinct pg.Name 'name', pg.ProgramGroupID 'value' from ProgramGroups pg join Incentives i on pg.ProgramGroupID = i.ProgramGroupID where pg.DelFlag = 'N'";
		List<TwoStringItems> result = new ArrayList<>();
		try {			
			final Query query = this.em.createNativeQuery(q, TwoStringItems.class);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getSummaryRepairOrdersReportProgramList", ex);
		}
		return result;
		
	}
	
        @SuppressWarnings("unchecked")
        public List<TwoStringItems> getProgramGroups() {
                List<TwoStringItems> result = new ArrayList<TwoStringItems>();
		try {
			final Query query = this.em.createNativeQuery(POSITIONGROUPS_WITH_NAMES, TwoStringItems.class);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getProgramGroups", ex);
		}
		return result;
        }
}
