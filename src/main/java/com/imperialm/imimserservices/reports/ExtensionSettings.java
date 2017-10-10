/**
 * ExtensionSettings.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.imperialm.imimserservices.reports;

public class ExtensionSettings  implements java.io.Serializable {
    private java.lang.String extension;

    private com.imperialm.imimserservices.reports.ArrayOfChoice1 parameterValues;

    public ExtensionSettings() {
    }

    public ExtensionSettings(
           java.lang.String extension,
           com.imperialm.imimserservices.reports.ArrayOfChoice1 parameterValues) {
           this.extension = extension;
           this.parameterValues = parameterValues;
    }


    /**
     * Gets the extension value for this ExtensionSettings.
     * 
     * @return extension
     */
    public java.lang.String getExtension() {
        return extension;
    }


    /**
     * Sets the extension value for this ExtensionSettings.
     * 
     * @param extension
     */
    public void setExtension(java.lang.String extension) {
        this.extension = extension;
    }


    /**
     * Gets the parameterValues value for this ExtensionSettings.
     * 
     * @return parameterValues
     */
    public com.imperialm.imimserservices.reports.ArrayOfChoice1 getParameterValues() {
        return parameterValues;
    }


    /**
     * Sets the parameterValues value for this ExtensionSettings.
     * 
     * @param parameterValues
     */
    public void setParameterValues(com.imperialm.imimserservices.reports.ArrayOfChoice1 parameterValues) {
        this.parameterValues = parameterValues;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ExtensionSettings)) return false;
        ExtensionSettings other = (ExtensionSettings) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.extension==null && other.getExtension()==null) || 
             (this.extension!=null &&
              this.extension.equals(other.getExtension()))) &&
            ((this.parameterValues==null && other.getParameterValues()==null) || 
             (this.parameterValues!=null &&
              this.parameterValues.equals(other.getParameterValues())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getExtension() != null) {
            _hashCode += getExtension().hashCode();
        }
        if (getParameterValues() != null) {
            _hashCode += getParameterValues().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ExtensionSettings.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ExtensionSettings"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("extension");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "Extension"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("parameterValues");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParameterValues"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ArrayOfChoice1"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
