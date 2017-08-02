package com.imperialm.imimserservices.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imperialm.imimserservices.dto.UserDetailsImpl;

import lombok.Getter;
import lombok.Setter;

@Service @Setter @Getter
public class EmailHandler {

	private static Logger logger = LoggerFactory.getLogger(EmailHandler.class);

	@Autowired
	private MailUtil mailUtil;

	public void sendMailConfirmation(Object object, String emailType, Object other) {
		String ccEmailIds = null;
		String subject = "";
		String message = "";
		UserDetailsImpl user = null;
		try {
			if (emailType.equalsIgnoreCase("ResetPassword")) {
				user = (UserDetailsImpl) object;

				subject = "Your MSER/MyFCADashboard password has been reset";

				message = "Hello, " +  user.getUser().getName() + "<br>"
						+ "Your password has been reset for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
						+ "User Id: " + user.getUserId() + "<br>"
						+ "Password: " + (String) other + "<br>"
						+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737)."; 
				// sendMail(from, to, cc, bcc, subject, message)
				mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, null, subject, message);
			}else if (emailType.equalsIgnoreCase("MSERNewUser")) {
				user = (UserDetailsImpl) object;

				subject = "Welcome to MSER!";

				message = "Hello, " +  user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
						+ "User Id: " + user.getUserId() + "<br>"
						+ "Password: " + (String) other + "<br>"
						+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737)."; 
				// sendMail(from, to, cc, bcc, subject, message)
				mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, null, subject, message);
			}else if(emailType.equalsIgnoreCase("ExistingDashboardUser")){
				user = (UserDetailsImpl) object;

				subject = "Welcome to MSER!";

				message = "Hello, " +  user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
						+ "User Id: " + user.getUserId() + "<br>"
						+ "The password is the same password you have in MyFCA Portal<br>"
						+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737)."; 
				// sendMail(from, to, cc, bcc, subject, message)
				mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, null, subject, message);
			}else if(emailType.equalsIgnoreCase("enrollmentform")){
				//user = (UserDetailsImpl) object;

				subject = "Enrollment From from MSER";

				/*message = "Hello, " +  user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
						+ "User Id: " + user.getUserId() + "<br>"
						+ "The password is the same password you have in MyFCA Portal<br>"
						+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";*/ 
				// sendMail(from, to, cc, bcc, subject, message)
				mailUtil.sendMail("info@moparser.com", "info@moparser.com", ccEmailIds, null, subject, message);
			}
		} catch (Exception e) {
			logger.error("Email Handler class error in--"+emailType +"-->" + e);
		}
	}
}
