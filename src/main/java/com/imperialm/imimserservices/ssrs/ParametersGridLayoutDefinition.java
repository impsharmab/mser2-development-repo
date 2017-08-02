
package com.imperialm.imimserservices.ssrs;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ParametersGridLayoutDefinition complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ParametersGridLayoutDefinition"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="NumberOfColumns" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="NumberOfRows" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="CellDefinitions" type="{http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices}ArrayOfParametersGridCellDefinition" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ParametersGridLayoutDefinition", propOrder = {
    "numberOfColumns",
    "numberOfRows",
    "cellDefinitions"
})
public class ParametersGridLayoutDefinition {

    @XmlElement(name = "NumberOfColumns")
    protected int numberOfColumns;
    @XmlElement(name = "NumberOfRows")
    protected int numberOfRows;
    @XmlElement(name = "CellDefinitions")
    protected ArrayOfParametersGridCellDefinition cellDefinitions;

    /**
     * Gets the value of the numberOfColumns property.
     * 
     */
    public int getNumberOfColumns() {
        return numberOfColumns;
    }

    /**
     * Sets the value of the numberOfColumns property.
     * 
     */
    public void setNumberOfColumns(int value) {
        this.numberOfColumns = value;
    }

    /**
     * Gets the value of the numberOfRows property.
     * 
     */
    public int getNumberOfRows() {
        return numberOfRows;
    }

    /**
     * Sets the value of the numberOfRows property.
     * 
     */
    public void setNumberOfRows(int value) {
        this.numberOfRows = value;
    }

    /**
     * Gets the value of the cellDefinitions property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfParametersGridCellDefinition }
     *     
     */
    public ArrayOfParametersGridCellDefinition getCellDefinitions() {
        return cellDefinitions;
    }

    /**
     * Sets the value of the cellDefinitions property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfParametersGridCellDefinition }
     *     
     */
    public void setCellDefinitions(ArrayOfParametersGridCellDefinition value) {
        this.cellDefinitions = value;
    }

}
