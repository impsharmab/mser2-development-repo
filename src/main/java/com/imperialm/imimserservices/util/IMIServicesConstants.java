/**
 *
 */
package com.imperialm.imimserservices.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * @author Dheerajr
 *
 */

public interface IMIServicesConstants {

	public static final String INDEX_PAGE = "index";

	public final int UVM_NEGATIVE = -15;
	public final int EL_NEGATIVE = -1;
	public final int PC_NEGATIVE = -6;

	public final int UVMID = 15;
	public final int ELID = 1;
	public final int PCID = 6;

	public final List<Integer> partsManagerOfRecordDefaultPrograms = new ArrayList<>(Arrays.asList(2,3,4,10,11));
	public final List<Integer> serviceManagerOfRecordDefaultPrograms = new ArrayList<>(Arrays.asList(2,3,4,5,7,10,11));
	
	
	
	public final List<String> mserElligiblepc = Arrays.asList("01", "13", "23", "2A", "08", "09", "ES", "ET");
	public final List<String> mmElligiblepc = Arrays.asList("01", "13", "23", "2A", "08", "09", "ES", "ET");
	public final List<String> upFitsElligpc = Arrays.asList("01", "13", "23", "2A", "08", "09", "ES", "ET");
	public final List<String> tiresElligpc = Arrays.asList("13", "23", "2A", "08", "09", "01");
	public final List<String> mvpElligpc = Arrays.asList("13", "ES", "09");
	public final List<String> wiAdvMVPElligpc = Arrays.asList("13", "09");
	public final List<String> wiAdvTirElligepc = Arrays.asList("13", "08", "09");
	public final List<String> uconSalesElligpc = Arrays.asList("01","02","03","04","05","06","07","08","09","10");
	//public final List<String> uconServiceElligpc = Arrays.asList();
	//public final List<String> pcPartElligpc = Arrays.asList("08", "14", "40", "19");
	public final List<String> pcMElligpc = Arrays.asList("01", "02", "08", "09", "32", "33", "35", "40", "37");
	public final List<String> elMElligpc = Arrays.asList("09", "17", "33", "35");
	//public final List<String> elPElligpc = Arrays.asList("01", "13", "23", "2A", "ES", "ET");
	public List<String> uvmEnrElligpc = Arrays.asList("08", "09", "07");
	public List<String> uvmPartElligpc = Arrays.asList("07", "34","12");
	//public List<String> warrantyAdmElligpc = Arrays.asList("29");
	

	public static final String EMAIL_DASHBOARD_PASSWORD_RESET = "Dashboard_Password_reset";
	public static final String DASHBOARD_WELCOME = "DashBoard_Welcome";

	public static final String MSER_DASHBOARD_PASSWORD_RESET = "MSER_DASHBOARD_PASSWORD_RESET";
	public static final String MSER_NEW_ACCOUNT_CREATE_WELCOME = "MSER_NEW_ACCOUNT_CREATE_WELCOME";
	public static final String MSER_NEW_ACCOUNT_CREATE_NEW = "MSER_NEW_ACCOUNT_CREATE_NEW";
	public static final String MSER_MANAGER_ENROLLMENT = "MSER_MANAGER_ENROLLMENT";
	public static final String MSER_REWARD_DISTRIBUTION = "MSER_REWARD_DISTRIBUTION";
	public static final int FCA_PROGRAM_MSER = 1;
	public static final int FCA_PROGRAM_DASHBOARD = 9;


	public static final String DEV_EMAIL_BCC = "DEV_EMAIL_BCC";
	public static final String DEV_EMAIL_CC = "DEV_EMAIL_CC";
	public static final String DEV_EMAIL_TO = "DEV_EMAIL_TO";
	public static final String ENV_PROD = "prod";

	public static final int MAX_RANDOM_PASSWORD_LENGTH = 8;
}
