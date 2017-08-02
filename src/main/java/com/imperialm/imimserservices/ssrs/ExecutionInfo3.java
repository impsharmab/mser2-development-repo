
package com.imperialm.imimserservices.ssrs;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ExecutionInfo3 complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ExecutionInfo3"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices}ExecutionInfo2"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ParametersLayout" type="{http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices}ParametersGridLayoutDefinition" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ExecutionInfo3", propOrder = {
    "parametersLayout"
})
public class ExecutionInfo3
    extends ExecutionInfo2
{

    @XmlElement(name = "ParametersLayout")
    protected ParametersGridLayoutDefinition parametersLayout;

    /**
     * Gets the value of the parametersLayout property.
     * 
     * @return
     *     possible object is
     *     {@link ParametersGridLayoutDefinition }
     *     
     */
    public ParametersGridLayoutDefinition getParametersLayout() {
        return parametersLayout;
    }

    /**
     * Sets the value of the parametersLayout property.
     * 
     * @param value
     *     allowed object is
     *     {@link ParametersGridLayoutDefinition }
     *     
     */
    public void setParametersLayout(ParametersGridLayoutDefinition value) {
        this.parametersLayout = value;
    }

}
