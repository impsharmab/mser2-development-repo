package com.imperialm.imimserservices.reports.util;


import com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder;
import com.imperialm.imimserservices.reports.holders.ArrayOfStringHolder;
import com.imperialm.imimserservices.reports.ReportExecutionServiceLocator;
import com.imperialm.imimserservices.reports.ReportExecutionServiceSoapStub;
import com.imperialm.imimserservices.reports.ParameterValue;
import com.imperialm.imimserservices.reports.ExecutionInfo;
import java.net.URL;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.xml.rpc.holders.ByteArrayHolder;
import javax.xml.rpc.holders.StringHolder;
import javax.xml.soap.SOAPException;
import org.apache.axis.message.SOAPHeaderElement;

public class ReportUtil {

    public static StringBuilder getReport(ParameterValue[] values, String reportPath, String reportName, String fileType) {
        try {
            ReportExecutionServiceSoapStub service = getService();

            ExecutionInfo info = service.loadReport("/" + reportPath + "/" + reportName, null); //Load report
            setExecutionId(service, info.getExecutionID()); //You must set the session id before continuing
            service.setExecutionParameters(values, "en-us"); //Set report parameters

            String format = "HTML4.0"; //Valid options are HTML4.0, MHTML, EXCEL, CSV, PDF, etc
            String deviceInfo = "<DeviceInfo><Toolbar>True</Toolbar><HTMLFragment>True</HTMLFragment></DeviceInfo>"; //Only generate an HTML fragment


            if ("EXCEL".equalsIgnoreCase(fileType)) {
                format = fileType;
                deviceInfo = "<DeviceInfo><Toolbar>True</Toolbar></DeviceInfo>";
            } else if ("PDF".equalsIgnoreCase(fileType)) {
                format = fileType;
                deviceInfo = "<DeviceInfo><Toolbar>True</Toolbar></DeviceInfo>";
            }

            ByteArrayHolder result = new ByteArrayHolder();
            StringHolder extension = new StringHolder();
            StringHolder mimeType = new StringHolder();
            StringHolder encoding = new StringHolder();
            ArrayOfWarningHolder warnings = new ArrayOfWarningHolder();
            ArrayOfStringHolder streamIDs = new ArrayOfStringHolder();
            service.render(format, deviceInfo, result, extension, mimeType, encoding, warnings, streamIDs); //Render report to HTML

            return new StringBuilder(new String(result.value)); //Prints the report HTML; this could be embedded in a JSP
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new StringBuilder("");
    }

    public static void setExecutionId(ReportExecutionServiceSoapStub service, String id) throws SOAPException {
        SOAPHeaderElement sessionHeader = new SOAPHeaderElement("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ExecutionHeader");
        sessionHeader.addChildElement("ExecutionID").addTextNode(id);
        service.setHeader(sessionHeader);
    }

    public static ReportExecutionServiceSoapStub getService() {
        try {

            String endpoint = "http://826909-sql-imst/reportserver/ReportExecution2005.asmx";
            ReportExecutionServiceSoapStub service = (ReportExecutionServiceSoapStub) new ReportExecutionServiceLocator(getEngineConfiguration()).getReportExecutionServiceSoap(new URL(endpoint));
            service.setUsername("imperial\\dheerajr");
            service.setPassword("555dhee");
            return service;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static org.apache.axis.EngineConfiguration getEngineConfiguration() {
        java.lang.StringBuffer sb = new java.lang.StringBuffer();

        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n");
        sb.append("<deployment name=\"defaultClientConfig\"\r\n");
        sb.append("xmlns=\"http://xml.apache.org/axis/wsdd/\"\r\n");
        sb.append("xmlns:java=\"http://xml.apache.org/axis/wsdd/providers/java\">\r\n");
        sb.append("<globalConfiguration>\r\n");
        sb.append("<parameter name=\"disablePrettyXML\" value=\"true\"/>\r\n");
        sb.append("<parameter name=\"enableNamespacePrefixOptimization\" value=\"true\"/>\r\n");
        sb.append("</globalConfiguration>\r\n");
        sb.append("<transport name=\"http\" pivot=\"java:org.apache.axis.transport.http.CommonsHTTPSender\"/>\r\n");
        sb.append("<transport name=\"local\" pivot=\"java:org.apache.axis.transport.local.LocalSender\"/>\r\n");
        sb.append("<transport name=\"java\" pivot=\"java:org.apache.axis.transport.java.JavaSender\"/>\r\n");
        sb.append("</deployment>\r\n");

        return new org.apache.axis.configuration.XMLStringProvider(sb.toString());
    }
    
    public static String processHTMLReport(HttpServletRequest request, String reportPath, String reportName, List<ParameterValue> params) {


        ParameterValue[] values = null;
        values = params.toArray(new ParameterValue[params.size()]);
        if (params.size() == 0) {
            values = new ParameterValue[1];
        }
        try {
            StringBuilder sb = ReportUtil.getReport(values, reportPath, reportName, "");
            return sb.toString().replace("http://826909-sql-imst/ReportServer", IMIUtils.getBaseUrl(request)+"LoadReports");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
    
     public static String processExcelReport(HttpServletRequest request, String reportPath, String reportName, List<ParameterValue> params) {


        ParameterValue[] values = null;
        values = params.toArray(new ParameterValue[params.size()]);
        if (params.size() == 0) {
            values = new ParameterValue[1];
        }
        try {
            StringBuilder sb = ReportUtil.getReport(values, reportPath, reportName, "EXCEL");
            sb.toString().replace("http://826909-sql-imst/ReportServer", IMIUtils.getBaseUrl(request)+"LoadReports");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}

