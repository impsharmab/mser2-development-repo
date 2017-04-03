package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.UserPositionCodeRoleDTO;

public interface DealerPersonnelDAO {

	public final String GET_INFO_BY_SID = "";
	public List<UserPositionCodeRoleDTO> getUserPositionCodeRoleDTO();
}
