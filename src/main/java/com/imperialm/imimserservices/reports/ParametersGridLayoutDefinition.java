/**
 * ParametersGridLayoutDefinition.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.imperialm.imimserservices.reports;

public class ParametersGridLayoutDefinition  implements java.io.Serializable {
    private int numberOfColumns;

    private int numberOfRows;

    private com.imperialm.imimserservices.reports.ParametersGridCellDefinition[] cellDefinitions;

    public ParametersGridLayoutDefinition() {
    }

    public ParametersGridLayoutDefinition(
           int numberOfColumns,
           int numberOfRows,
           com.imperialm.imimserservices.reports.ParametersGridCellDefinition[] cellDefinitions) {
           this.numberOfColumns = numberOfColumns;
           this.numberOfRows = numberOfRows;
           this.cellDefinitions = cellDefinitions;
    }


    /**
     * Gets the numberOfColumns value for this ParametersGridLayoutDefinition.
     * 
     * @return numberOfColumns
     */
    public int getNumberOfColumns() {
        return numberOfColumns;
    }


    /**
     * Sets the numberOfColumns value for this ParametersGridLayoutDefinition.
     * 
     * @param numberOfColumns
     */
    public void setNumberOfColumns(int numberOfColumns) {
        this.numberOfColumns = numberOfColumns;
    }


    /**
     * Gets the numberOfRows value for this ParametersGridLayoutDefinition.
     * 
     * @return numberOfRows
     */
    public int getNumberOfRows() {
        return numberOfRows;
    }


    /**
     * Sets the numberOfRows value for this ParametersGridLayoutDefinition.
     * 
     * @param numberOfRows
     */
    public void setNumberOfRows(int numberOfRows) {
        this.numberOfRows = numberOfRows;
    }


    /**
     * Gets the cellDefinitions value for this ParametersGridLayoutDefinition.
     * 
     * @return cellDefinitions
     */
    public com.imperialm.imimserservices.reports.ParametersGridCellDefinition[] getCellDefinitions() {
        return cellDefinitions;
    }


    /**
     * Sets the cellDefinitions value for this ParametersGridLayoutDefinition.
     * 
     * @param cellDefinitions
     */
    public void setCellDefinitions(com.imperialm.imimserservices.reports.ParametersGridCellDefinition[] cellDefinitions) {
        this.cellDefinitions = cellDefinitions;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ParametersGridLayoutDefinition)) return false;
        ParametersGridLayoutDefinition other = (ParametersGridLayoutDefinition) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.numberOfColumns == other.getNumberOfColumns() &&
            this.numberOfRows == other.getNumberOfRows() &&
            ((this.cellDefinitions==null && other.getCellDefinitions()==null) || 
             (this.cellDefinitions!=null &&
              java.util.Arrays.equals(this.cellDefinitions, other.getCellDefinitions())));
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
        _hashCode += getNumberOfColumns();
        _hashCode += getNumberOfRows();
        if (getCellDefinitions() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getCellDefinitions());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getCellDefinitions(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ParametersGridLayoutDefinition.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParametersGridLayoutDefinition"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("numberOfColumns");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "NumberOfColumns"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("numberOfRows");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "NumberOfRows"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cellDefinitions");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "CellDefinitions"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParametersGridCellDefinition"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParametersGridCellDefinition"));
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
