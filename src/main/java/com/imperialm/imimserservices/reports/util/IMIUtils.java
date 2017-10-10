package com.imperialm.imimserservices.reports.util;

import javax.servlet.http.HttpServletRequest;

public class IMIUtils {
	public static String getBaseUrl(HttpServletRequest request) {
	    String scheme = request.getScheme() + "://";
	    String serverName = request.getServerName();
	    String serverPort = (request.getServerPort() == 80) ? "" : ":" + request.getServerPort();
	    String contextPath = request.getContextPath();
	    return scheme + serverName + serverPort + contextPath +"/";
	    }
}
