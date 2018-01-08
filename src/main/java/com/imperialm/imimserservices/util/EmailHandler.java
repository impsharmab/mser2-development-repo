package com.imperialm.imimserservices.util;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.NameValue;
import com.imperialm.imimserservices.model.NameValueWithTeamId;

import lombok.Getter;
import lombok.Setter;

@Service
@Setter
@Getter
public class EmailHandler {

	private static Logger logger = LoggerFactory.getLogger(EmailHandler.class);

	@Autowired
	private MailUtil mailUtil;

	@Autowired
	private IMIServicesUtil IMIServicesUtil;

	@Value("${spring.profiles.active}")
	private String mode;

	public void sendMailConfirmation(Object object, String emailType, Object other) {
		String ccEmailIds = null;
		String subject = "";
		String message = "";
		UserDetailsImpl user = null;

		// if(mode.equalsIgnoreCase("prod")){
		try {
			if (emailType.equalsIgnoreCase("ResetPassword")) {
				user = (UserDetailsImpl) object;

				subject = "Your MSER/MyFCADashboard password has been reset";

				message = "Hello, " + user.getUser().getName() + "<br>"
						+ "Your password has been reset for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>"
						+ "User Id: " + user.getUserId() + "<br>" + "Password: " + (String) other + "<br>"
						+ "<br>Once you are logged in you can change your MSER password on the MyFCARewards Dashboard under Profile."
						+ "<br>For ease of use, we encourage you to access MSER via DealerConnect going forward."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				// sendMail(from, to, cc, bcc, subject, message)
				if (mode.equalsIgnoreCase("prod")) {
					mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, null, subject, message);
				} else {
					mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject, message);
				}
			} else if (emailType.equalsIgnoreCase("MSERNewUser")) {
				user = (UserDetailsImpl) object;

				subject = "Welcome to MSER!";

				message = "Hello, " + user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>"
						+ "User Id: " + user.getUserId() + "<br>" + "Password: " + (String) other + "<br>"
						+ "<br>Once you are logged in you can change your MSER password on the MyFCARewards Dashboard under Profile."
						+ "<br>For ease of use, we encourage you to access MSER via DealerConnect going forward."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				// sendMail(from, to, cc, bcc, subject, message)
				if (mode.equalsIgnoreCase("prod")) {
					mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, "IT_Support@imperialm.com",
							subject, message);
				} else {
					mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject, message);
				}
			} else if (emailType.equalsIgnoreCase("ExistingDashboardUser")) {
				user = (UserDetailsImpl) object;

				subject = "Welcome to MSER!";

				message = "Hello, " + user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>"
						+ "User Id: " + user.getUserId() + "<br>"
						+ "The password is the same password you have in MyFCA Portal<br>"
						+ "<br>Once you are logged in you can change your MSER password on the MyFCARewards Dashboard under Profile."
						+ "<br>For ease of use, we encourage you to access MSER via DealerConnect going forward."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				// sendMail(from, to, cc, bcc, subject, message)
				if (mode.equalsIgnoreCase("prod")) {
					mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, "IT_Support@imperialm.com",
							subject, message);
				} else {
					mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject, message);
				}
			} else if (emailType.equalsIgnoreCase("enrollmentform")) {
				user = (UserDetailsImpl) object;

				subject = "You are Enrolled in MSER!";

				message = "Hello, " + user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>"
						+ "User Id: " + user.getUserId() + "<br>" + "Password: " + (String) other + "<br>"
						+ "<br>Once you are logged in you can change your MSER password on the MyFCARewards Dashboard under Profile."
						+ "<br>For ease of use, we encourage you to access MSER via DealerConnect going forward."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				if (mode.equalsIgnoreCase("prod")) {
					mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, "IT_Support@imperialm.com",
							subject, message);
				} else {
					mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject, message);
				}
			} else if (emailType.equalsIgnoreCase("enrollmentformpartsmanager")) {
				user = (UserDetailsImpl) object;

				subject = "You are Enrolled in MSER as a Parts Manager";

				message = "Hello, " + user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>"
						+ "User Id: " + user.getUserId() + "<br>" + "Password: " + (String) other + "<br>"
						+ "<br>Once you are logged in you can change your MSER password on the MyFCARewards Dashboard under Profile."
						+ "<br>For ease of use, we encourage you to access MSER via DealerConnect going forward."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				// mailUtil.sendMail("info@moparser.com",
				// "perkits@imperialm.com", ccEmailIds, null, subject, message);
				if (mode.equalsIgnoreCase("prod")) {
					mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, "IT_Support@imperialm.com",
							subject, message);
				} else {
					mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject, message);
				}
			} else if (emailType.equalsIgnoreCase("distributedReward")) {
				user = (UserDetailsImpl) object;
				if (user != null && other != null) {
					subject = ": Rewards Distribution Recap Email";
					/*
					 * message = "Hello, " + user.getUser().getName() + "<br>" +
					 * "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
					 * +
					 * "Please log in at www.moparser.com using your user ID and the password below.<br>"
					 * + "User Id: " + user.getUserId() + "<br>" + "Password: "
					 * + (String) other + "<br>" +
					 * "<br>Once you are logged in you can change your MSER password on the MyFCARewards Dashboard under Profile."
					 * +
					 * "<br>For ease of use, we encourage you to access MSER via DealerConnect going forward."
					 * +
					 * "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737)."
					 * ;
					 */
					message = "Hello, " + user.getUser().getName() + "<br>";
					String table = "<table style='border:1px solid rgb(225, 230, 239);width:400px;'><thead><tr style='background-color: rgb(179,223,255); border-bottom:1px solid rgb(225, 230, 239);''><th style='padding: 7px; width: 50%;'>User Name</th><th style='padding: 7px; text-align: right; width: 50%;'>Amount Distributed</th></tr></thead>";

					double total = 0.0;

					for (NameValueWithTeamId item : (List<NameValueWithTeamId>) other) {
						if (item.getValue().getClass().equals(Integer.class)) {
							total = total + (Integer) item.getValue();
							table = table
									+ "<tr style='background-color: rgb(250,250,250); border-bottom: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); padding: 7px;'>"
									+ item.getName() + "</td><td style='padding: 7px; text-align: right;'>"
									+ IMIServicesUtil.formatCurrency((Integer) item.getValue()) + "</td></tr>";
						} else {
							total = total +  ((Double) item.getValue());
							table = table
									+ "<tr style='background-color: rgb(250,250,250); border-bottom: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); padding: 7px;'>"
									+ item.getName() + "</td><td style='padding: 7px; text-align: right;'>"
									+ IMIServicesUtil.formatCurrencyNoRounding((Double) item.getValue()) + "</td></tr>";
						}
					}
					table = table
							+ "<tr style='background-color: rgb(240, 240, 240); border-top: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); font-weight: bold; padding: 7px;'>Total</td><td style='font-weight: bold; padding: 7px; text-align: right;'>"
							+ IMIServicesUtil.formatCurrencyNoRounding(total) + "</td></tr>";
					table = table + "</table>";
					// change the sent email address
					if (mode.equalsIgnoreCase("prod")) {
						mailUtil.sendMail("info@moparser.com", user.getEmail(), ccEmailIds, "IT_Support@imperialm.com",
								subject, message + table);
					} else {
						mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject,
								message + table);
					}
				}
			}
		} catch (Exception e) {
			logger.error("Email Handler class error in--" + emailType + "-->" + e);
		}
	}
	// }
}
