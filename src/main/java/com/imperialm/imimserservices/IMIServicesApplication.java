package com.imperialm.imimserservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EntityScan
@ComponentScan
@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class })
// @EnableAspectJAutoProxy
@EnableTransactionManagement
@EnableAsync
public class IMIServicesApplication {

	public static void main(final String[] args) {
		SpringApplication.run(IMIServicesApplication.class, args);
	}
}
