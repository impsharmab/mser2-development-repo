package com.imperialm.imimserservices.reports;

public class ReportExecutionServiceSoapProxy implements com.imperialm.imimserservices.reports.ReportExecutionServiceSoap {
  private String _endpoint = null;
  private com.imperialm.imimserservices.reports.ReportExecutionServiceSoap reportExecutionServiceSoap = null;
  
  public ReportExecutionServiceSoapProxy() {
    _initReportExecutionServiceSoapProxy();
  }
  
  public ReportExecutionServiceSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initReportExecutionServiceSoapProxy();
  }
  
  private void _initReportExecutionServiceSoapProxy() {
    try {
      reportExecutionServiceSoap = (new com.imperialm.imimserservices.reports.ReportExecutionServiceLocator()).getReportExecutionServiceSoap();
      if (reportExecutionServiceSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)reportExecutionServiceSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)reportExecutionServiceSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (reportExecutionServiceSoap != null)
      ((javax.xml.rpc.Stub)reportExecutionServiceSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public com.imperialm.imimserservices.reports.ReportExecutionServiceSoap getReportExecutionServiceSoap() {
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap;
  }
  
  public java.lang.String[] listSecureMethods() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.listSecureMethods();
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo loadReport(java.lang.String report, java.lang.String historyID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.loadReport(report, historyID);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo3 loadReport3(java.lang.String report, java.lang.String historyID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.loadReport3(report, historyID);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo2 loadReport2(java.lang.String report, java.lang.String historyID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.loadReport2(report, historyID);
  }
  
  public void loadReportDefinition(byte[] definition, com.imperialm.imimserservices.reports.holders.ExecutionInfoHolder executionInfo, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.loadReportDefinition(definition, executionInfo, warnings);
  }
  
  public void loadReportDefinition2(byte[] definition, com.imperialm.imimserservices.reports.holders.ExecutionInfo2Holder executionInfo, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.loadReportDefinition2(definition, executionInfo, warnings);
  }
  
  public void loadReportDefinition3(byte[] definition, com.imperialm.imimserservices.reports.holders.ExecutionInfo3Holder executionInfo, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.loadReportDefinition3(definition, executionInfo, warnings);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo setExecutionCredentials(com.imperialm.imimserservices.reports.DataSourceCredentials[] credentials) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.setExecutionCredentials(credentials);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo2 setExecutionCredentials2(com.imperialm.imimserservices.reports.DataSourceCredentials[] credentials) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.setExecutionCredentials2(credentials);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo3 setExecutionCredentials3(com.imperialm.imimserservices.reports.DataSourceCredentials[] credentials) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.setExecutionCredentials3(credentials);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo setExecutionParameters(com.imperialm.imimserservices.reports.ParameterValue[] parameters, java.lang.String parameterLanguage) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.setExecutionParameters(parameters, parameterLanguage);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo2 setExecutionParameters2(com.imperialm.imimserservices.reports.ParameterValue[] parameters, java.lang.String parameterLanguage) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.setExecutionParameters2(parameters, parameterLanguage);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo3 setExecutionParameters3(com.imperialm.imimserservices.reports.ParameterValue[] parameters, java.lang.String parameterLanguage) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.setExecutionParameters3(parameters, parameterLanguage);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo resetExecution() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.resetExecution();
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo2 resetExecution2() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.resetExecution2();
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo3 resetExecution3() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.resetExecution3();
  }
  
  public void render(java.lang.String format, java.lang.String deviceInfo, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder extension, javax.xml.rpc.holders.StringHolder mimeType, javax.xml.rpc.holders.StringHolder encoding, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings, com.imperialm.imimserservices.reports.holders.ArrayOfStringHolder streamIds) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.render(format, deviceInfo, result, extension, mimeType, encoding, warnings, streamIds);
  }
  
  public void render2(java.lang.String format, java.lang.String deviceInfo, com.imperialm.imimserservices.reports.PageCountMode paginationMode, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder extension, javax.xml.rpc.holders.StringHolder mimeType, javax.xml.rpc.holders.StringHolder encoding, com.imperialm.imimserservices.reports.holders.ArrayOfWarningHolder warnings, com.imperialm.imimserservices.reports.holders.ArrayOfStringHolder streamIds) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.render2(format, deviceInfo, paginationMode, result, extension, mimeType, encoding, warnings, streamIds);
  }
  
  public void deliverReportItem(java.lang.String format, java.lang.String deviceInfo, com.imperialm.imimserservices.reports.ExtensionSettings extensionSettings, java.lang.String description, java.lang.String eventType, java.lang.String matchData) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.deliverReportItem(format, deviceInfo, extensionSettings, description, eventType, matchData);
  }
  
  public void renderStream(java.lang.String format, java.lang.String streamID, java.lang.String deviceInfo, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder encoding, javax.xml.rpc.holders.StringHolder mimeType) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.renderStream(format, streamID, deviceInfo, result, encoding, mimeType);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo getExecutionInfo() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.getExecutionInfo();
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo2 getExecutionInfo2() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.getExecutionInfo2();
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo3 getExecutionInfo3() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.getExecutionInfo3();
  }
  
  public com.imperialm.imimserservices.reports.DocumentMapNode getDocumentMap() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.getDocumentMap();
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo loadDrillthroughTarget(java.lang.String drillthroughID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.loadDrillthroughTarget(drillthroughID);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo2 loadDrillthroughTarget2(java.lang.String drillthroughID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.loadDrillthroughTarget2(drillthroughID);
  }
  
  public com.imperialm.imimserservices.reports.ExecutionInfo3 loadDrillthroughTarget3(java.lang.String drillthroughID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.loadDrillthroughTarget3(drillthroughID);
  }
  
  public boolean toggleItem(java.lang.String toggleID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.toggleItem(toggleID);
  }
  
  public int navigateDocumentMap(java.lang.String docMapID) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.navigateDocumentMap(docMapID);
  }
  
  public void navigateBookmark(java.lang.String bookmarkID, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder uniqueName) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.navigateBookmark(bookmarkID, pageNumber, uniqueName);
  }
  
  public int findString(int startPage, int endPage, java.lang.String findValue) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.findString(startPage, endPage, findValue);
  }
  
  public void sort(java.lang.String sortItem, com.imperialm.imimserservices.reports.SortDirectionEnum direction, boolean clear, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder reportItem, javax.xml.rpc.holders.IntHolder numPages) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.sort(sortItem, direction, clear, pageNumber, reportItem, numPages);
  }
  
  public void sort2(java.lang.String sortItem, com.imperialm.imimserservices.reports.SortDirectionEnum direction, boolean clear, com.imperialm.imimserservices.reports.PageCountMode paginationMode, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder reportItem, com.imperialm.imimserservices.reports.holders.ExecutionInfo2Holder executionInfo) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.sort2(sortItem, direction, clear, paginationMode, pageNumber, reportItem, executionInfo);
  }
  
  public void sort3(java.lang.String sortItem, com.imperialm.imimserservices.reports.SortDirectionEnum direction, boolean clear, com.imperialm.imimserservices.reports.PageCountMode paginationMode, javax.xml.rpc.holders.IntHolder pageNumber, javax.xml.rpc.holders.StringHolder reportItem, com.imperialm.imimserservices.reports.holders.ExecutionInfo3Holder executionInfo) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.sort3(sortItem, direction, clear, paginationMode, pageNumber, reportItem, executionInfo);
  }
  
  public void getRenderResource(java.lang.String format, java.lang.String deviceInfo, javax.xml.rpc.holders.ByteArrayHolder result, javax.xml.rpc.holders.StringHolder mimeType) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.getRenderResource(format, deviceInfo, result, mimeType);
  }
  
  public com.imperialm.imimserservices.reports.Extension[] listRenderingExtensions() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    return reportExecutionServiceSoap.listRenderingExtensions();
  }
  
  public void logonUser(java.lang.String userName, java.lang.String password, java.lang.String authority) throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.logonUser(userName, password, authority);
  }
  
  public void logoff() throws java.rmi.RemoteException{
    if (reportExecutionServiceSoap == null)
      _initReportExecutionServiceSoapProxy();
    reportExecutionServiceSoap.logoff();
  }
  
  
}