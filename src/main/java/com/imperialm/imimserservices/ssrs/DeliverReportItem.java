
package com.imperialm.imimserservices.ssrs;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Format" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="DeviceInfo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="ExtensionSettings" type="{http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices}ExtensionSettings" minOccurs="0"/&gt;
 *         &lt;element name="Description" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="EventType" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="MatchData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "format",
    "deviceInfo",
    "extensionSettings",
    "description",
    "eventType",
    "matchData"
})
@XmlRootElement(name = "DeliverReportItem")
public class DeliverReportItem {

    @XmlElement(name = "Format")
    protected String format;
    @XmlElement(name = "DeviceInfo")
    protected String deviceInfo;
    @XmlElement(name = "ExtensionSettings")
    protected ExtensionSettings extensionSettings;
    @XmlElement(name = "Description")
    protected String description;
    @XmlElement(name = "EventType")
    protected String eventType;
    @XmlElement(name = "MatchData")
    protected String matchData;

    /**
     * Gets the value of the format property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFormat() {
        return format;
    }

    /**
     * Sets the value of the format property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFormat(String value) {
        this.format = value;
    }

    /**
     * Gets the value of the deviceInfo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDeviceInfo() {
        return deviceInfo;
    }

    /**
     * Sets the value of the deviceInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDeviceInfo(String value) {
        this.deviceInfo = value;
    }

    /**
     * Gets the value of the extensionSettings property.
     * 
     * @return
     *     possible object is
     *     {@link ExtensionSettings }
     *     
     */
    public ExtensionSettings getExtensionSettings() {
        return extensionSettings;
    }

    /**
     * Sets the value of the extensionSettings property.
     * 
     * @param value
     *     allowed object is
     *     {@link ExtensionSettings }
     *     
     */
    public void setExtensionSettings(ExtensionSettings value) {
        this.extensionSettings = value;
    }

    /**
     * Gets the value of the description property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the value of the description property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescription(String value) {
        this.description = value;
    }

    /**
     * Gets the value of the eventType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEventType() {
        return eventType;
    }

    /**
     * Sets the value of the eventType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEventType(String value) {
        this.eventType = value;
    }

    /**
     * Gets the value of the matchData property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMatchData() {
        return matchData;
    }

    /**
     * Sets the value of the matchData property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMatchData(String value) {
        this.matchData = value;
    }

}
