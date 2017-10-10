package com.imperialm.imimserservices.rest;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Authenticator;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.BindingProvider;
import javax.xml.ws.Holder;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.imperialm.imimserservices.dao.DealerPersonnelDAO;
import com.imperialm.imimserservices.dao.DealerPersonnelPositionsDAO;
import com.imperialm.imimserservices.dto.DealerPersonnelDTO;
import com.imperialm.imimserservices.model.TwoStringItems;
import com.imperialm.imimserservices.reports.util.IMIUtils;
import com.imperialm.imimserservices.reports.util.ReportUtil;
import com.imperialm.imimserservices.ssrs.ArrayOfDataSourceCredentials;
import com.imperialm.imimserservices.ssrs.ArrayOfParameterValue;
import com.imperialm.imimserservices.ssrs.ArrayOfString;
import com.imperialm.imimserservices.ssrs.ArrayOfWarning;
import com.imperialm.imimserservices.ssrs.DataSourceCredentials;
import com.imperialm.imimserservices.ssrs.ExecutionHeader;
import com.imperialm.imimserservices.ssrs.ExecutionInfo;
import com.imperialm.imimserservices.ssrs.LoadReport;
import com.imperialm.imimserservices.ssrs.ParameterValue;
import com.imperialm.imimserservices.ssrs.ReportExecutionService;
import com.imperialm.imimserservices.ssrs.ReportExecutionServiceSoap;
import com.imperialm.imimserservices.ssrs.SetExecutionParameters;
import com.imperialm.imimserservices.util.IMIServicesUtil;
import com.sun.xml.ws.developer.WSBindingProvider;

@Controller
public class GeneralController {

	@Autowired
	private DealerPersonnelPositionsDAO dealerPersonnelPositions;
	
	@Autowired
	private DealerPersonnelDAO DealerPersonnelDAO;
	
	@Autowired
	private IMIServicesUtil IMIServicesUtil;
	
	NTLMAuthenticator NTLMAuthenticator;
	
	@RequestMapping(value = "/General/PositionCodeList", method = RequestMethod.GET)
	public @ResponseBody Object getPositionCodes(HttpServletRequest request) {

		IMIServicesUtil.checkToken(request);
		
		/*Map<String, String> a = new HashMap<>();
		List<TwoStringItems> pcList = dealerPersonnelPositions.getAllPositionCodesWithNames();
		
		for(TwoStringItems item: pcList){
			a.put(item.getItem1(), item.getItem2());
		}
		
		return a;*/
		
		List<TwoStringItems> pcList = dealerPersonnelPositions.getAllPositionCodesWithNames();
		for(TwoStringItems item: pcList){
			item.setItem2("(" + item.getItem1() + ")" + item.getItem2() + " ");
		}
		
		return pcList;
	}
	
	@RequestMapping(value = "/General/ManagersByDealer/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getManagersByDealerCode(@PathVariable(value="dealerCode") String dealerCode,HttpServletRequest request) {
		
		List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getManagersByDealerCode(dealerCode);
		
		List<TwoStringItems> sids = new ArrayList<>();
		for(DealerPersonnelDTO item: dpUser){
			sids.add(new TwoStringItems(item.getFirstName() + " " + item.getLastName(), item.getSID()));
		}
		return sids;
	}
	
	@RequestMapping(value = "/General/ParticipantsByDealer/{dealerCode}", method = RequestMethod.GET)
	public @ResponseBody Object getParticipantsByDealerCode(@PathVariable(value="dealerCode") String dealerCode,HttpServletRequest request) {
		
		List<DealerPersonnelDTO> dpUser = DealerPersonnelDAO.getSIDInfoByDealerCode(dealerCode);
		
		
		List<String> tempSids = new ArrayList<>();
		List<TwoStringItems> sids = new ArrayList<>();
		for(DealerPersonnelDTO item: dpUser){
			if(!tempSids.contains(item.getSID())){
				tempSids.add(item.getSID());
				sids.add(new TwoStringItems(item.getFirstName() + " " + item.getLastName(), item.getSID()));
			}
		}
		return sids;
	}
	
	
	@RequestMapping(value = "/General/con/{domain:.+}", method = RequestMethod.GET)
	public @ResponseBody Object testCon(@PathVariable(value="domain") String domain, HttpServletRequest request) {
		NTLMAuthenticator.install("imperialm.com", "aljishia", "ImTemp2016");
		//URL url;
		try {
			
			
			Authenticator.setDefault(new NTLMAuthenticator("imperialm.com", "aljishia", "ImTemp2016"));
		
			
			String reportPath = "/MSER/DistrictSummary";
			String format = "HTML4.0";
			String historyID = null;
			String devInfo = "<DeviceInfo><Toolbar>True</Toolbar><HTMLFragment>True</HTMLFragment></DeviceInfo>";
			String executionID = null;
			Holder<String> extension = null;
			Holder<String> mimeType = null;
			Holder<String> encoding = null;
			Holder<ArrayOfWarning> warnings = null;
			Holder<ArrayOfString> streamIDs = null;
			Holder<byte[]> result = new Holder<byte[]>();
			
			
			//http://826878-sqlimpro //http://826909-sql-imst
			URL url = new URL("http://ssrs.imperialm.com/reportserver/ReportExecution2005.asmx?wsdl");
			
			ReportExecutionService res = new ReportExecutionService(url);
			ReportExecutionServiceSoap ress = res.getReportExecutionServiceSoap();
			DataSourceCredentials a= new DataSourceCredentials();
			a.setDataSourceName("MSER");
			a.setPassword("ImTemp2016");
			a.setUserName("aljishia");
			List<DataSourceCredentials> b = new ArrayList<>();
			b.add(a);
			
			ArrayOfDataSourceCredentials c = new ArrayOfDataSourceCredentials();
			
			//c.dataSourceCredentials = b;
			c.getDataSourceCredentials().add(a);
			//ress.setExecutionCredentials(c);

			BindingProvider bp = (BindingProvider)ress;
			
			WSBindingProvider wsbp = (WSBindingProvider)ress;

			bp.getRequestContext().put(BindingProvider.SESSION_MAINTAIN_PROPERTY, true);


			ExecutionInfo execInfo = new ExecutionInfo();
			            
			ArrayOfParameterValue apv = new ArrayOfParameterValue();
			List<ParameterValue> apvList = apv.getParameterValue();     


			ParameterValue param0 = new ParameterValue();
			param0.setName("DealerEnrollment");//Dealer Enrollment
			param0.setValue("E");
			ParameterValue param1 = new ParameterValue();
			param1.setName("Program");
			param1.setValue("MVP");
			apvList.add(param0);
			apvList.add(param1);

			try{
				int fasd = 0;
			execInfo = ress.loadReport(reportPath, historyID);
			}catch(Exception ex){
				System.out.println(ex);
			}
			
			/*ParameterValue param3 = new ParameterValue();
			param3.setName("executionID");
			param3.setValue(executionID);
			apvList.add(param3);
			
			ParameterValue param4 = new ParameterValue();
			param4.setName("sessionID");
			param4.setValue(executionID);
			apvList.add(param4);*/
			
			executionID = execInfo.getExecutionID();       
			//bp.getRequestContext().put("sessionID", executionID);
			bp.getRequestContext().put("executionID", executionID);


			ExecutionHeader eh = new ExecutionHeader();
			eh.setExecutionID(executionID);
			
			wsbp.setOutboundHeaders(eh);
			      

			//ress.setExecutionCredentials(c);
			ress.setExecutionParameters(apv, "en-us");


			ress.render("EXCEL", devInfo, result, extension, mimeType, encoding, warnings, streamIDs);
			String resultString = new String(result.value);     
			return result.value;
			//return resultString;
			/*url = new URL("http://826878-sqlimpro/ReportServer/ReportService2005.asmx?wsdl");
			SSRS a = new SSRS(url, "");
			

		    final QName qName =
		      new QName( "http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices",
		                 "ReportingService2005" );
		    ArrayOfDataSourceCredentials b = new ArrayOfDataSourceCredentials();
		    DataSourceCredentials c = new DataSourceCredentials();
		    c.setDataSourceName(domain);
		    c.setUserName("aljishia");
		    c.setPassword("ImTemp2016");*/
		    //ReportExecutionService d = new ReportExecutionService();
		    //d.getReportExecutionServiceSoap().
		    /*d.getReportExecutionServiceSoap().setExecutionCredentials(credentials)
		    
		    d.setExecutionCredentials(b);
			
			String[]  mser = a.listReports("MSER");
			System.out.println(mser);
			String[]  fmser = a.listFolders("MSER");
			System.out.println(fmser);*/
	
	
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	
	@RequestMapping(value = "/General/report/{domain:.+}", method = RequestMethod.GET)
	public @ResponseBody void setContentType(@PathVariable(value="domain") String domain, HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setContentType("text/html;charset=UTF-8");
        
        PrintWriter out = response.getWriter();
        try {
        String key;
        String reportName = "";
        String reportPath = "";

        List<com.imperialm.imimserservices.reports.ParameterValue> params = new ArrayList<>();
        com.imperialm.imimserservices.reports.ParameterValue param = null;

        
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Imperial Report Loader...</title>");
            out.println("</head>");
            out.println("<body>");
            for (Object keyObject : request.getParameterMap().keySet()) {
                key = keyObject.toString();
                if (key.toString().startsWith("/")) {
                    String[] keys = key.split("/");
                    reportPath = keys[1];
                    reportName = keys[2];
                } else if (!key.contains(":")) {
                    param = new com.imperialm.imimserservices.reports.ParameterValue();
                    param.setName(key);
                    param.setValue(request.getParameter(key).toString());
                    params.add(param);
                }
            }
            com.imperialm.imimserservices.reports.ParameterValue[] paramArray = params.toArray(new com.imperialm.imimserservices.reports.ParameterValue[params.size()]);

            StringBuilder sb = ReportUtil.getReport(paramArray, reportPath, reportName, "");
            out.println(sb.toString().replace("http://826909-sql-imst/ReportServer", IMIUtils.getBaseUrl(request)+"LoadReports"));
            out.println("</body>");
            out.println("</html>");
        } finally {
            out.close();
        }
	}

	
	
}