package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.VideoLinksDTO;

public interface VideoLinksDAO {
	
	public final String GET_VIDEO_BY_PROGRAM = "select * from VideoLinks where program = ?0 and status = 'A' order by seqno";
	public final String GET_VIDEOS = "select * from VideoLinks where program IS NULL and status = 'A' order by seqno";
	public List<VideoLinksDTO> getAllVideos();
	public List<VideoLinksDTO> getVideosByProgram(String program);

}
