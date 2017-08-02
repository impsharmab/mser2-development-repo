
package com.imperialm.imimserservices.ssrs;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ParametersGridCellDefinition complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ParametersGridCellDefinition"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="RowIndex" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="ColumnsIndex" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="ParameterName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ParametersGridCellDefinition", propOrder = {
    "rowIndex",
    "columnsIndex",
    "parameterName"
})
public class ParametersGridCellDefinition {

    @XmlElement(name = "RowIndex")
    protected int rowIndex;
    @XmlElement(name = "ColumnsIndex")
    protected int columnsIndex;
    @XmlElement(name = "ParameterName")
    protected String parameterName;

    /**
     * Gets the value of the rowIndex property.
     * 
     */
    public int getRowIndex() {
        return rowIndex;
    }

    /**
     * Sets the value of the rowIndex property.
     * 
     */
    public void setRowIndex(int value) {
        this.rowIndex = value;
    }

    /**
     * Gets the value of the columnsIndex property.
     * 
     */
    public int getColumnsIndex() {
        return columnsIndex;
    }

    /**
     * Sets the value of the columnsIndex property.
     * 
     */
    public void setColumnsIndex(int value) {
        this.columnsIndex = value;
    }

    /**
     * Gets the value of the parameterName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getParameterName() {
        return parameterName;
    }

    /**
     * Sets the value of the parameterName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setParameterName(String value) {
        this.parameterName = value;
    }

}
