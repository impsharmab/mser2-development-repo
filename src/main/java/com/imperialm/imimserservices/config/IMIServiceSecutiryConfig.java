/**
 *
 */
package com.imperialm.imimserservices.config;

import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.imperialm.imimserservices.security.JwtAuthenticationEntryPoint;
import com.imperialm.imimserservices.security.JwtAuthenticationTokenFilter;
import com.imperialm.imimserservices.security.JwtDaoAuthenticationProvider;
import com.imperialm.imimserservices.services.UserServiceImpl;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = "com.imperialm.imimserservices")
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class IMIServiceSecutiryConfig extends WebSecurityConfigurerAdapter {

	private static Logger logger = LoggerFactory.getLogger(IMIServiceSecutiryConfig.class);

	@Value("${spring.cache.defaultmaxcacheentries}")
	private int CACHEMAX;

	@Value("${spring.cache.defaultcachetime}")
	private int CACHETIME;

	@Autowired
	private UserServiceImpl userService;

	@Value("${email.smtphost}")
	private String smtpHost;

	@Value("${email.smtpport}")
	private String smtpPort;

	@Value("${email.exchangeuser}")
	private String user;

	@Value("${email.exchangepassword}")
	private String password;

	@Bean
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

		Properties mailProperties = new Properties();
		/* mailProperties.put("mail.smtp.auth", auth); */
		mailProperties.put("mail.smtp.starttls.enable", true);
		mailProperties.put("mail.smtp.auth", "true");
		mailProperties.put("mail.smtp.from", user);
		mailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		/*
		 * mailProperties.put("mail.smtp.debug", "true");
		 *
		 * mailProperties.put("mail.smtp.starttls.required", startlls_required);
		 * mailProperties.put("mail.smtp.socketFactory.port", socketPort);
		 *
		 * mailProperties.put("mail.smtp.socketFactory.class",
		 * "javax.net.ssl.SSLSocketFactory");
		 * mailProperties.put("mail.smtp.socketFactory.fallback", fallback);
		 */
		mailSender.setJavaMailProperties(mailProperties);
		mailSender.setHost(smtpHost);
		mailSender.setPort(Integer.valueOf(smtpPort));
		mailSender.setUsername(user);
		mailSender.setPassword(password);
		return mailSender;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Autowired
	private AuthenticationEntryPoint unauthorizedHandler = new JwtAuthenticationEntryPoint();

	@Bean
	@Qualifier("JwtAuthenticationTokenFilter")
	public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
		return new JwtAuthenticationTokenFilter();
	}

	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(this.userService).passwordEncoder(passwordEncoder());
		authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider());
	}

	@Bean
	public CommonsMultipartResolver multipartResolver() {

		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		Long maxFileSize = (long) 2097152;
		resolver.setMaxUploadSizePerFile(maxFileSize);
		return resolver;
	}

	@Bean
	public AuthenticationProvider customAuthenticationProvider() {
		JwtDaoAuthenticationProvider impl = new JwtDaoAuthenticationProvider();
		impl.setUserDetailsService(userService);
		impl.setPasswordEncoder(passwordEncoder());
		return impl;
	}
	/*
	 * @Override protected void configure(final HttpSecurity http) throws Exception
	 * { http.authorizeRequests().antMatchers("/", "/resources/**", "/login",
	 * "/services/**").permitAll().anyRequest()
	 * .authenticated().and().csrf().disable();
	 * http.formLogin().loginPage("/").permitAll().and()
	 * .rememberMe().key(rememberMeKey).rememberMeServices(rememberMeServices()).and
	 * () .logout().permitAll(); }
	 */

	/*
	 * @Override public void configure(WebSecurity web) throws Exception {
	 * web.ignoring().antMatchers("/*"); }
	 */

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				// we don't need CSRF because our token is invulnerable
				.csrf().disable()

				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

				// don't create session
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

				.authorizeRequests().antMatchers("/*").authenticated().and().authorizeRequests()
				// .antMatchers("/", "/login", "imiservices/login/token",
				// "imiservices/login/").permitAll()
				.anyRequest().authenticated().and()
				.addFilterBefore(authenticationTokenFilterBean(), BasicAuthenticationFilter.class);
		// .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

		// allow anonymous resource requests

		/*
		 * .antMatchers( HttpMethod.GET, "/*" ).authenticated().and()
		 */

		// disable page caching
		httpSecurity.headers().cacheControl();
	}

}