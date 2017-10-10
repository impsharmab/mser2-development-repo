/**
 * ReportExecutionServiceSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.imperialm.imimserservices.reports;

public interface ReportExecutionServiceSoap extends java.rmi.Remote {
    public java.lang.String[] listSecureMethods() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo loadReport(java.lang.String report, java.lang.String historyID) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo3 loadReport3(java.lang.String report, java.lang.String historyID) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo2 loadReport2(java.lang.String report, java.lang.String historyID) throws java.rmi.RemoteException;
    public void loadReportDefinition(byte[] definition, com.imperialm.imimserservices.reports.holders.ExecutionInfoHolder executionInfo, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings) throws java.rmi.RemoteException;
    public void loadReportDefinition2(byte[] definition, com.imperialm.imimserservices.reports.holders.ExecutionInfo2Holder executionInfo, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings) throws java.rmi.RemoteException;
    public void loadReportDefinition3(byte[] definition, com.imperialm.imimserservices.reports.holders.ExecutionInfo3Holder executionInfo, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo setExecutionCredentials(com.imperialm.imimserservices.reports.DataSourceCredentials[] credentials) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo2 setExecutionCredentials2(com.imperialm.imimserservices.reports.DataSourceCredentials[] credentials) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo3 setExecutionCredentials3(com.imperialm.imimserservices.reports.DataSourceCredentials[] credentials) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo setExecutionParameters(com.imperialm.imimserservices.reports.ParameterValue[] parameters, java.lang.String parameterLanguage) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo2 setExecutionParameters2(com.imperialm.imimserservices.reports.ParameterValue[] parameters, java.lang.String parameterLanguage) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo3 setExecutionParameters3(com.imperialm.imimserservices.reports.ParameterValue[] parameters, java.lang.String parameterLanguage) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo resetExecution() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo2 resetExecution2() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo3 resetExecution3() throws java.rmi.RemoteException;
    public void render(java.lang.String format, java.lang.String deviceInfo, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder extension, javax.xml.rpc.holders.StringHolder mimeType, javax.xml.rpc.holders.StringHolder encoding, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings, com.imperialm.imimserservices.reports.holders.ArrayOfStringHolder streamIds) throws java.rmi.RemoteException;
    public void render2(java.lang.String format, java.lang.String deviceInfo, com.imperialm.imimserservices.reports.PageCountMode paginationMode, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder extension, javax.xml.rpc.holders.StringHolder mimeType, javax.xml.rpc.holders.StringHolder encoding, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings, com.imperialm.imimserservices.reports.holders.ArrayOfStringHolder streamIds) throws java.rmi.RemoteException;
    public void deliverReportItem(java.lang.String format, java.lang.String deviceInfo, com.imperialm.imimserservices.reports.ExtensionSettings extensionSettings, java.lang.String description, java.lang.String eventType, java.lang.String matchData) throws java.rmi.RemoteException;
    public void renderStream(java.lang.String format, java.lang.String streamID, java.lang.String deviceInfo, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder encoding, javax.xml.rpc.holders.StringHolder mimeType) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo getExecutionInfo() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo2 getExecutionInfo2() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo3 getExecutionInfo3() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.DocumentMapNode getDocumentMap() throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo loadDrillthroughTarget(java.lang.String drillthroughID) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo2 loadDrillthroughTarget2(java.lang.String drillthroughID) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.ExecutionInfo3 loadDrillthroughTarget3(java.lang.String drillthroughID) throws java.rmi.RemoteException;
    public boolean toggleItem(java.lang.String toggleID) throws java.rmi.RemoteException;
    public int navigateDocumentMap(java.lang.String docMapID) throws java.rmi.RemoteException;
    public void navigateBookmark(java.lang.String bookmarkID, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder uniqueName) throws java.rmi.RemoteException;
    public int findString(int startPage, int endPage, java.lang.String findValue) throws java.rmi.RemoteException;
    public void sort(java.lang.String sortItem, com.imperialm.imimserservices.reports.SortDirectionEnum direction, boolean clear, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder reportItem, javax.xml.rpc.holders.IntHolder numPages) throws java.rmi.RemoteException;
    public void sort2(java.lang.String sortItem, com.imperialm.imimserservices.reports.SortDirectionEnum direction, boolean clear, com.imperialm.imimserservices.reports.PageCountMode paginationMode, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder reportItem, com.imperialm.imimserservices.reports.holders.ExecutionInfo2Holder executionInfo) throws java.rmi.RemoteException;
    public void sort3(java.lang.String sortItem, com.imperialm.imimserservices.reports.SortDirectionEnum direction, boolean clear, com.imperialm.imimserservices.reports.PageCountMode paginationMode, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder reportItem, com.imperialm.imimserservices.reports.holders.ExecutionInfo3Holder executionInfo) throws java.rmi.RemoteException;
    public void getRenderResource(java.lang.String format, java.lang.String deviceInfo, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder mimeType) throws java.rmi.RemoteException;
    public com.imperialm.imimserservices.reports.Extension[] listRenderingExtensions() throws java.rmi.RemoteException;
    public void logonUser(java.lang.String userName, java.lang.String password, java.lang.String authority) throws java.rmi.RemoteException;
    public void logoff() throws java.rmi.RemoteException;
}
