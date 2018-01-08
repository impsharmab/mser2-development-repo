package com.imperialm.imimserservices.util;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomDateDeserializer extends JsonDeserializer<Date> {

	Log logger = LogFactory.getLog(CustomDateDeserializer.class);

	@Override
	public Date deserialize(JsonParser arg0, DeserializationContext arg1) throws IOException, JsonProcessingException {
		String dateStr = arg0.getText().trim();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		if (dateStr.length() > 0)
			try {
				Date date = sdf.parse(dateStr);
				return date;
			} catch (ParseException e) {
				logger.error(e);
				try{
					return new Date(Long.parseLong(arg0.getText().trim()));
				}catch(Exception ex){
					logger.error(ex);
				}
			}
		return null;
	}

}
