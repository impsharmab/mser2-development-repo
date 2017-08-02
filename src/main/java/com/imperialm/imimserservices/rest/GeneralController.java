package com.imperialm.imimserservices.rest;

import java.net.Authenticator;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
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
			item.setItem2(item.getItem2() + " (" + item.getItem1() + ")");
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
			URL url = new URL("http://826878-sqlimpro/reportserver/ReportExecution2005.asmx?wsdl");
			
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


			// Sessions erlauben
			bp.getRequestContext().put(BindingProvider.SESSION_MAINTAIN_PROPERTY, true);


			ExecutionInfo execInfo = new ExecutionInfo();
			            

			// Parameterliste erzeugen
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
			// Report vorbereiten
				int fasd = 0;
			execInfo = ress.loadReport(reportPath, historyID);
			}catch(Exception ex){
				System.out.println(ex);
			}
			// ExecutionID für den nächsten Aufruf merken
			
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


			// ExecutionHeader Element erzeugen und es für den nächsten Aufruf
			// and den WSBindingProvider übergeben
			ExecutionHeader eh = new ExecutionHeader();
			eh.setExecutionID(executionID);
			
			wsbp.setOutboundHeaders(eh);
			      

			// Parameter an den Report übergeben
			//ress.setExecutionCredentials(c);
			ress.setExecutionParameters(apv, "en-us");

			// Report anfordern
			ress.render(format, devInfo, result, extension, mimeType, encoding, warnings, streamIDs);
			// Ergebnis des Aufrufs ausgeben
			String resultString = new String(result.value);     
			
			return resultString;
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

	
	
}