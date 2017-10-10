package com.imperialm.imimserservices.rest;

import java.io.OutputStreamWriter;
import java.net.Authenticator;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Enumeration;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.lang.NotImplementedException;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class ProxyController {


	private String server = "826909-sql-imst";
	private int port = 80;

	@RequestMapping(value="/ReportServer/**", method = RequestMethod.GET)
	@ResponseBody
	public Object mirrorRest(HttpMethod method, HttpServletRequest request,
			HttpServletResponse response1) throws URISyntaxException
	{

		NTLMAuthenticator.install("imperialm.com", "aljishia", "ImTemp2016");
		//URL url;
		Authenticator.setDefault(new NTLMAuthenticator("imperialm.com", "aljishia", "ImTemp2016"));

		String a = request.getRequestURI();
		String b = request.getQueryString();

		ResponseEntity<String> responseEntity = null;
		try{
			URI uri = new URI("http://"+server + a + "?" + b);
			// URI uri = new URI("http", null, server, port, request.getRequestURI(), request.getQueryString(), null);
			RestTemplate restTemplate = new RestTemplate();
			restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
			responseEntity =
					restTemplate.exchange(uri, method, new HttpEntity<String>(""), String.class);
		}catch(Exception e){
			e.printStackTrace();
		}

		return responseEntity;
		/*URL yahoo;
		try {

		yahoo = new URL(server + a + "?" + b);

		//yahoo = new URL("http://826909-sql-imst/ReportServer/Pages/ReportViewer.aspx?%2FTest");
        URLConnection yc = yahoo.openConnection();
        BufferedReader in = new BufferedReader(
                                new InputStreamReader(
                                yc.getInputStream()));
        String inputLine;

        String response = "";
        while ((inputLine = in.readLine()) != null){ 
            System.out.println(inputLine);
            response = response + inputLine;
        }
        in.close();

        return response;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


        return null;*/


	}

	@RequestMapping(value="/ReportServer/**", method = RequestMethod.POST)
	@ResponseBody
	public Object mirrorRestPost(@RequestBody String body,HttpMethod method, HttpServletRequest request,
			HttpServletResponse response1) throws URISyntaxException
	{
		String c = request.getHeaderNames().toString();

		NTLMAuthenticator.install("imperialm.com", "aljishia", "ImTemp2016");

		String a = request.getRequestURI();
		String b = request.getQueryString();
		// URI uri = new URI(server + a + "?" + b);
		if(body==null){
			body ="";
		}

		ResponseEntity<String> responseEntity = null;
		try{
			Authenticator.setDefault(new NTLMAuthenticator("imperialm", "aljishia", "ImTemp2016"));
			URI uri = new URI("http", null, server, port, a, b, null);
			//URI uri = new URI("http://"+server + a + "?" + b);




			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

			MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
			String[] data = body.split("&");
			for(String item: data){
				List<String> innerList = Arrays.asList(item.split("="));
				ArrayList<String> inner = new ArrayList<>(innerList);
				if(inner.size() < 2){
					inner.add("");
				}
				map.add(inner.get(0), inner.get(1));
			}

			HttpEntity<MultiValueMap<String, String>> request1 = new HttpEntity<MultiValueMap<String, String>>(map, headers);




			RestTemplate restTemplate = new RestTemplate();
			restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
			//ResponseEntity<String> response = restTemplate.postForEntity( url, request1 , String.class );
			responseEntity =
					restTemplate.exchange(uri, method, request1, String.class);
		}catch(Exception e){
			e.printStackTrace();
		}

		if(responseEntity == null ){
			return "OK";
		}
		return responseEntity;
	}

	/*	HttpHeaders createHeaders(String username, String password){
		   return new HttpHeaders() {{
		         String auth = username + ":" + password;
		         byte[] encodedAuth = Base64.encodeBase64( 
		            auth.getBytes(Charset.forName("US-ASCII")) );
		         String authHeader = "Basic " + new String( encodedAuth );
		         set( "Authorization", authHeader );
		      }};
	}	
	 */



	/*@SuppressWarnings("unchecked")
	@RequestMapping(value="/ReportServer/**", method = RequestMethod.POST)
	@ResponseBody
	public Object proxyAjaxCall(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// URL needs to be url decoded 
		
		
		try {
			
			String a = request.getRequestURI();
			String b = request.getQueryString();
		
			URI uri = new URI("http", null, server, port, a, b, null);
		
		NTLMAuthenticator.install("imperialm.com", "aljishia", "ImTemp2016");
		//URL url;
		
		Authenticator.setDefault(new NTLMAuthenticator("imperialm.com", "aljishia", "ImTemp2016"));
		// = URLDecoder.decode(uri.toString(), "utf-8");
	

		OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream()); 
		HttpClient client = new HttpClient();
		

			org.apache.commons.httpclient.HttpMethod method = null;

			// Split this according to the type of request 
			if (request.getMethod().equals("GET")) {

				method = new GetMethod(uri.toString());

			} else if (request.getMethod().equals("POST")) {

				method = new PostMethod(uri.toString());
				
				method.getResponseBodyAsString(body);
				Enumeration<String> headerNames = request.getHeaderNames();
				while (headerNames.hasMoreElements()) {
					String temp = headerNames.nextElement();
					method.setRequestHeader(temp, request.getHeader(temp));
				}
				
				// Set any eventual parameters that came with our original // request (POST params, for instance) 
				Enumeration paramNames = request.getParameterNames(); while (paramNames.hasMoreElements()) {

					String paramName = (String) paramNames.nextElement();
					((PostMethod) method).setParameter(paramName, request .getParameter(paramName));
				}

			} else {

				throw new NotImplementedException( "This proxy only supports GET and POST methods."); }

			// Execute the method 
			client.executeMethod(method);

			// Set the content type, as it comes from the server 
			Header[] headers = method.getResponseHeaders();
			for (Header header : headers) {

				if ("Content-Type".equalsIgnoreCase(header.getName())) {

					response.setContentType(header.getValue()); } }

			// Write the body, flush and close
			String ab = method.getResponseBodyAsString();
			writer.write(method.getResponseBodyAsString());
			writer.flush(); 
			writer.close();
			return method.getResponseBodyAsString();

		} catch (Exception e) {

			//log.error("Oops, something went wrong in the HTTP proxy", null, e); 
			e.printStackTrace();

		}
		
		return "error";

	}*/
}
