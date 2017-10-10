/**
 * ReportExecutionService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.imperialm.imimserservices.reports;

public interface ReportExecutionService extends javax.xml.rpc.Service {

/**
 * The Reporting Services Execution Service enables report execution
 */
    public java.lang.String getReportExecutionServiceSoapAddress();

    public com.imperialm.imimserservices.reports.ReportExecutionServiceSoap getReportExecutionServiceSoap() throws javax.xml.rpc.ServiceException;

    public com.imperialm.imimserservices.reports.ReportExecutionServiceSoap getReportExecutionServiceSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
