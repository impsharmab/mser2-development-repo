/**
 *
 */
package com.imperialm.imimserservices.services;

import java.io.File;
import java.util.Arrays;
import java.util.Formatter;
import java.util.List;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

import com.imperialm.imimserservices.entities.DBProperties;
import com.imperialm.imimserservices.entities.EmailProperties;
import com.imperialm.imimserservices.repositories.DBPropertiesRepo;
import com.imperialm.imimserservices.util.IMIServicesConstants;
import com.imperialm.imimserservices.util.IMIServicesUtil;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Dheerajr
 *
 */
@Builder
@Slf4j
@Component
@NoArgsConstructor
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${email.exchangeuser}")
	private String user;

	@Value("${spring.profiles.active}")
	private String mode;

	@Value("${images.shared.folder}")
	private String assetPath;


	private static InternetAddress[] getInternetAddressEmails(String email) throws Exception {
		String[] mails = email.split(";");
		if (mails.length == 0)
			return null;
		InternetAddress[] address = new InternetAddress[mails.length];
		for (int i = 0; i < mails.length; i++) {
			if (IMIServicesUtil.isValidEmail(mails[i])) {
				address[i] = new InternetAddress(mails[i]);
			}
		}
		return address;
	}

	@Autowired
	private DBPropertiesRepo dbPropsRepo;

	@Cacheable("dbpriperties")
	public List<DBProperties> checkDBProps() {
		return dbPropsRepo.findByNameInAndProgramProgramId(
				Arrays.asList( IMIServicesConstants.DEV_EMAIL_TO,
						IMIServicesConstants.DEV_EMAIL_CC,
						IMIServicesConstants.DEV_EMAIL_BCC), IMIServicesConstants.FCA_PROGRAM_MSER);
	}

	@Override
	public void sendMailWithHeader(final EmailProperties email) {

		MimeMessagePreparator preparator = new MimeMessagePreparator() {

			@Override
			public void prepare(MimeMessage mimeMessage) throws Exception {
				MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

				helper.setSubject(email.getEmailsubject());
				helper.setFrom(user);

				StringBuilder content = new StringBuilder("<html><body>");
				if(email.getHeaderImage()!=null) {
					content.append("<img src='cid:company-logo'>");
				}
				content.append("<p>");

				if (!IMIServicesConstants.ENV_PROD.equalsIgnoreCase(mode)) {
					List<DBProperties> properties = checkDBProps();
					content.append(
							"<br>************************************************************************************<br>");
					for (DBProperties prop : properties) {
						if (IMIServicesConstants.DEV_EMAIL_TO.equalsIgnoreCase(prop.getName())) {
							if (email.getEmailTo() != null) {
								content.append("<br> email to : ").append(email.getEmailTo());
							}
							email.setEmailTo(prop.getValue());
						}else if (IMIServicesConstants.DEV_EMAIL_CC.equalsIgnoreCase(prop.getName())) {
							if (email.getCcTo() != null) {
								content.append("<br> email CC : ").append(email.getCcTo());
							}
							email.setCcTo(prop.getValue());
						}if (IMIServicesConstants.DEV_EMAIL_BCC.equalsIgnoreCase(prop.getName())) {
							if (email.getBccTo() != null) {
								content.append("<br> email BCC : ").append(email.getBccTo());
							}
							email.setBccTo(prop.getValue());
						}
					}
					content.append(
							"<br>************************************************************************************<br>");
				}

				if (email.getEmailTo() != null) {
					helper.setTo(getInternetAddressEmails(email.getEmailTo()));
				}
				if (email.getCcTo() != null) {
					helper.setCc(getInternetAddressEmails(email.getCcTo()));
				}
				if (email.getBccTo() != null) {
					helper.setBcc(getInternetAddressEmails(email.getBccTo()));
				}

				if (email.getParameters() != null) {
					Formatter format = new Formatter().format(email.getBody(),
							email.getParameters().toArray(new String[email.getParameters().size()]));
					content.append(format.toString());
				} else {
					content.append(email.getBody());
				}
				content.append("</p></body></html>");
				helper.setText(content.toString(), true);
				if(email.getHeaderImage()!=null) {
					helper.addInline("company-logo", new File(assetPath + email.getHeaderImage()));
				}
			}
		};
		mailSender.send(preparator);
	}
}
