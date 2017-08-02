package com.imperialm.imimserservices.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.imperialm.imimserservices.dto.VideoLinksDTO;

@Repository
public class VideoLinksDAOImpl implements VideoLinksDAO{

	private static Logger logger = LoggerFactory.getLogger(VideoLinksDAOImpl.class);

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<VideoLinksDTO> getAllVideos() {
		List<VideoLinksDTO> result = new ArrayList<VideoLinksDTO>();
		try {
			final Query query = this.em.createNativeQuery(GET_VIDEOS, VideoLinksDTO.class);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getAllVideos", ex);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<VideoLinksDTO> getVideosByProgram(String program) {
		List<VideoLinksDTO> result = new ArrayList<VideoLinksDTO>();
		try {
			final Query query = this.em.createNativeQuery(GET_VIDEO_BY_PROGRAM, VideoLinksDTO.class);
			query.setParameter(0, program);
			result = query.getResultList();
		} catch (final Exception ex) {
			logger.error("error occured in getVideosByProgram", ex);
		}
		return result;
	}
	
	
	
}
