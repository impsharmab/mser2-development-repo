/**
 * ParametersGridCellDefinition.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.imperialm.imimserservices.reports;

public class ParametersGridCellDefinition  implements java.io.Serializable {
    private int rowIndex;

    private int columnsIndex;

    private java.lang.String parameterName;

    public ParametersGridCellDefinition() {
    }

    public ParametersGridCellDefinition(
           int rowIndex,
           int columnsIndex,
           java.lang.String parameterName) {
           this.rowIndex = rowIndex;
           this.columnsIndex = columnsIndex;
           this.parameterName = parameterName;
    }


    /**
     * Gets the rowIndex value for this ParametersGridCellDefinition.
     * 
     * @return rowIndex
     */
    public int getRowIndex() {
        return rowIndex;
    }


    /**
     * Sets the rowIndex value for this ParametersGridCellDefinition.
     * 
     * @param rowIndex
     */
    public void setRowIndex(int rowIndex) {
        this.rowIndex = rowIndex;
    }


    /**
     * Gets the columnsIndex value for this ParametersGridCellDefinition.
     * 
     * @return columnsIndex
     */
    public int getColumnsIndex() {
        return columnsIndex;
    }


    /**
     * Sets the columnsIndex value for this ParametersGridCellDefinition.
     * 
     * @param columnsIndex
     */
    public void setColumnsIndex(int columnsIndex) {
        this.columnsIndex = columnsIndex;
    }


    /**
     * Gets the parameterName value for this ParametersGridCellDefinition.
     * 
     * @return parameterName
     */
    public java.lang.String getParameterName() {
        return parameterName;
    }


    /**
     * Sets the parameterName value for this ParametersGridCellDefinition.
     * 
     * @param parameterName
     */
    public void setParameterName(java.lang.String parameterName) {
        this.parameterName = parameterName;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ParametersGridCellDefinition)) return false;
        ParametersGridCellDefinition other = (ParametersGridCellDefinition) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.rowIndex == other.getRowIndex() &&
            this.columnsIndex == other.getColumnsIndex() &&
            ((this.parameterName==null && other.getParameterName()==null) || 
             (this.parameterName!=null &&
              this.parameterName.equals(other.getParameterName())));
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
        _hashCode += getRowIndex();
        _hashCode += getColumnsIndex();
        if (getParameterName() != null) {
            _hashCode += getParameterName().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ParametersGridCellDefinition.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParametersGridCellDefinition"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("rowIndex");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "RowIndex"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("columnsIndex");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ColumnsIndex"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("parameterName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParameterName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
