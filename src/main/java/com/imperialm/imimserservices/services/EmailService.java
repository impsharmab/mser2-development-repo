/**
 * 
 */
package com.imperialm.imimserservices.services;

import com.imperialm.imimserservices.entities.EmailProperties;

/**
 * @author Dheerajr
 *
 */
public interface EmailService {
	public void sendMailWithHeader(EmailProperties email);
}
