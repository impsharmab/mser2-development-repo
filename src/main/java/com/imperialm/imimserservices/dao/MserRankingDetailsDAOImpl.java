package com.imperialm.imimserservices.dao;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.MserRankingDetailsDTO;

@Repository
public class MserRankingDetailsDAOImpl {


	private static Logger logger = LoggerFactory.getLogger(MserRankingDetailsDAOImpl.class);

	@PersistenceContext
	private EntityManager em;
	
	
	public static String SELECT_BY_SID = "SELECT * FROM [MyFCAMserRankingDetails] where [Sid] = ?0 AND [DealerCode]= ?1";
	public static String SELECT_SUM_BY_SID = "SELECT * FROM [MyFCAMserRankingDetails] where [Sid] = ?0 AND [DealerCode]= ?1 group by [Sid], [DealerCode]";
		
		@SuppressWarnings("unchecked")
		public List<MserRankingDetailsDTO> getMserRankingDetailsBySID(String territory, String dealerCode){
			List<MserRankingDetailsDTO> result = new ArrayList<>();

			try {
				final Query query = this.em.createNativeQuery(SELECT_BY_SID, MserRankingDetailsDTO.class);
				query.setParameter(0, territory);
				query.setParameter(1, dealerCode);
				result = query.getResultList();
			} catch (final Exception ex) {
				logger.error("error occured in getMserRankingDetailsBySID", ex);
			}
			return result;
		}
		
		@SuppressWarnings("unchecked")
		public List<MserRankingDetailsDTO> getMserRankingDetailsSUMBySID(String territory, String dealerCode){
			List<MserRankingDetailsDTO> result = new ArrayList<>();

			try {
				final Query query = this.em.createNativeQuery(SELECT_SUM_BY_SID, MserRankingDetailsDTO.class);
				query.setParameter(0, territory);
				query.setParameter(1, dealerCode);
				result = query.getResultList();
			} catch (final Exception ex) {
				logger.error("error occured in getMserRankingDetailsSUMBySID", ex);
			}
			return result;
		}
}
