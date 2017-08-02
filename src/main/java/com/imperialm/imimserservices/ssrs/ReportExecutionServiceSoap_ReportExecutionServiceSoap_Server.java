
package com.imperialm.imimserservices.ssrs;

import javax.xml.ws.Endpoint;

/**
 * This class was generated by Apache CXF 3.1.12
 * 2017-08-02T01:29:56.519-04:00
 * Generated source version: 3.1.12
 * 
 */
 
public class ReportExecutionServiceSoap_ReportExecutionServiceSoap_Server{

    protected ReportExecutionServiceSoap_ReportExecutionServiceSoap_Server() throws java.lang.Exception {
        System.out.println("Starting Server");
        Object implementor = new ReportExecutionServiceSoapImpl();
        String address = "http://826909-sql-imst:80/ReportServer/ReportExecution2005.asmx";
        Endpoint.publish(address, implementor);
    }
    
    public static void main(String args[]) throws java.lang.Exception { 
        new ReportExecutionServiceSoap_ReportExecutionServiceSoap_Server();
        System.out.println("Server ready..."); 
        
        Thread.sleep(5 * 60 * 1000); 
        System.out.println("Server exiting");
        System.exit(0);
    }
}
