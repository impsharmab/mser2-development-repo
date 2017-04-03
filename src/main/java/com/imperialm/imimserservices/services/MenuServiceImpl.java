package com.imperialm.imimserservices.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imperialm.imimserservices.dao.MenuDAO;
import com.imperialm.imimserservices.dto.MenuDTO;
import com.imperialm.imimserservices.dto.request.InputRequest;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuDAO menuDAO;

	@Override
	public List<MenuDTO> findMenuByRole(final InputRequest userRoleReq) {
		return this.menuDAO.findMenuByRole(userRoleReq);
	}
}
