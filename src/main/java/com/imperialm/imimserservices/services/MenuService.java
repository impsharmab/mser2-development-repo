/**
 *
 */
package com.imperialm.imimserservices.services;

import java.util.List;

import com.imperialm.imimserservices.dto.MenuDTO;
import com.imperialm.imimserservices.dto.request.InputRequest;

/**
 * @author Dheerajr
 *
 */
public interface MenuService {

	/**
	 * @param userRoleReq
	 * @return
	 */
	List<MenuDTO> findMenuByRole(InputRequest userRoleReq);

}
