package com.imperialm.imimserservices.dao;

import java.util.List;

import com.imperialm.imimserservices.dto.UserInfoDTO;

public interface UserInfoDAO {
	public static String GET_USERINFO = "select u.UserId, u.Name, u.Email, upr.ProgramCode, upr.RoleId, ut.Territory from users u inner join UserProgramRoles upr ON u.UserId = upr.UserId AND u.UserId = ? AND u.DelFlag = 'N' left join mser2.dbo.UserTerritory ut on ut.UserID = ?";
	public List<UserInfoDTO> getUserInfo(String userId);
}
