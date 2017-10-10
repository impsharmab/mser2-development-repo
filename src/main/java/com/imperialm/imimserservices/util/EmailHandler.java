package com.imperialm.imimserservices.util;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.model.NameValue;

import lombok.Getter;
import lombok.Setter;

@Service @Setter @Getter
public class EmailHandler {

	private static Logger logger = LoggerFactory.getLogger(EmailHandler.class);

	@Autowired
	private MailUtil mailUtil;
	
	@Autowired
	private IMIServicesUtil IMIServicesUtil;

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
				user = (UserDetailsImpl) object;

				subject = "You are Enrolled in MSER!";

				message = "Hello, " +  user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
						+ "User Id: " + user.getUserId() + "<br>"
						+ "Password: " + (String) other + "<br>"
						+ "This will be the same password for MyFCA Portal<br>"
						+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				mailUtil.sendMail("info@moparser.com", "sharmab@imperialm.com", ccEmailIds, null, subject, message);
			}else if(emailType.equalsIgnoreCase("enrollmentformpartsmanager")){
				user = (UserDetailsImpl) object;

				subject = "You are Enrolled in MSER as a Parts Manager";

				message = "Hello, " +  user.getUser().getName() + "<br>"
						+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
						+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
						+ "User Id: " + user.getUserId() + "<br>"
						+ "Password: " + (String) other + "<br>"
						+ "This will be the same password for MyFCA Portal<br>"
						+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
						+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";
				mailUtil.sendMail("info@moparser.com", "sharmab@imperialm.com", ccEmailIds, null, subject, message);
			}else if(emailType.equalsIgnoreCase("distributedReward")){
				user = (UserDetailsImpl) object;
				if(user != null && other !=null){
					subject = ": Rewards Distribution Recap Email";
					/*message = "Hello, " +  user.getUser().getName() + "<br>"
							+ "An Account has been created on your behalf for the Mopar Service Excellence Rewards Program website.<br>"
							+ "Please log in at www.moparser.com using your user ID and the password below.<br>" 
							+ "User Id: " + user.getUserId() + "<br>"
							+ "Password: " + (String) other + "<br>"
							+ "this will be the same password you can use for MyFCA Portal<br>"
							+ "<br>Once you are logged in you can change your password by selecting the “Profile” link located in the top left of the homepage."
							+ "<br>If you have any questions please contact the Mopar Service Excellence Rewards Team at (866) 909-MSER(6737).";*/
					message = "Hello, " +  user.getUser().getName() + "<br>";
					String table = "<table style='border:1px solid rgb(225, 230, 239);width:400px;'><thead><tr style='background-color: rgb(179,223,255); border-bottom:1px solid rgb(225, 230, 239);''><th style='padding: 7px; width: 50%;'>User Name</th><th style='padding: 7px; text-align: right; width: 50%;'>Amount Distributed</th></tr></thead>";
					
					Double total = 0.0;
					
					for(NameValue item: (List<NameValue>)other){
						if(item.getValue().getClass().equals(Integer.class)){
							total += (Integer) item.getValue();
							table = table + "<tr style='background-color: rgb(250,250,250); border-bottom: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); padding: 7px;'>" + item.getName() + "</td><td style='padding: 7px; text-align: right;'>$" + IMIServicesUtil.formatCurrency((Integer) item.getValue()) +"</td></tr>";
						}else{
							total += (Double) item.getValue();
							table = table + "<tr style='background-color: rgb(250,250,250); border-bottom: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); padding: 7px;'>" + item.getName() + "</td><td style='padding: 7px; text-align: right;'>$" + IMIServicesUtil.formatCurrency((Double) item.getValue()) +"</td></tr>";
						}
					}
					table = table + "<tr style='background-color: rgb(240, 240, 240); border-top: 1px solid rgb(225, 230, 239);'><td style='border-right: 1px solid rgb(225, 230, 239); font-weight: bold; padding: 7px;'>Total</td><td style='font-weight: bold; padding: 7px; text-align: right;'>$" + IMIServicesUtil.formatCurrency(total) + "</td></tr>";
					table = table + "</table>";
					//change the sent email address
					mailUtil.sendMail("info@moparser.com", "perkits@imperialm.com", ccEmailIds, null, subject, message + table);
				}
			}
		} catch (Exception e) {
			logger.error("Email Handler class error in--"+emailType +"-->" + e);
		}
	}
}
