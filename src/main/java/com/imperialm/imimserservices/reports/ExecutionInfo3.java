/**
 * ExecutionInfo3.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.imperialm.imimserservices.reports;

public class ExecutionInfo3  extends com.imperialm.imimserservices.reports.ExecutionInfo2  implements java.io.Serializable {
    private com.imperialm.imimserservices.reports.ParametersGridLayoutDefinition parametersLayout;

    public ExecutionInfo3() {
    }

    public ExecutionInfo3(
           boolean hasSnapshot,
           boolean needsProcessing,
           boolean allowQueryExecution,
           boolean credentialsRequired,
           boolean parametersRequired,
           java.util.Calendar expirationDateTime,
           java.util.Calendar executionDateTime,
           int numPages,
           com.imperialm.imimserservices.reports.ReportParameter[] parameters,
           com.imperialm.imimserservices.reports.DataSourcePrompt[] dataSourcePrompts,
           boolean hasDocumentMap,
           java.lang.String executionID,
           java.lang.String reportPath,
           java.lang.String historyID,
           com.imperialm.imimserservices.reports.PageSettings reportPageSettings,
           int autoRefreshInterval,
           com.imperialm.imimserservices.reports.PageCountMode pageCountMode,
           com.imperialm.imimserservices.reports.ParametersGridLayoutDefinition parametersLayout) {
        super(
            hasSnapshot,
            needsProcessing,
            allowQueryExecution,
            credentialsRequired,
            parametersRequired,
            expirationDateTime,
            executionDateTime,
            numPages,
            parameters,
            dataSourcePrompts,
            hasDocumentMap,
            executionID,
            reportPath,
            historyID,
            reportPageSettings,
            autoRefreshInterval,
            pageCountMode);
        this.parametersLayout = parametersLayout;
    }


    /**
     * Gets the parametersLayout value for this ExecutionInfo3.
     * 
     * @return parametersLayout
     */
    public com.imperialm.imimserservices.reports.ParametersGridLayoutDefinition getParametersLayout() {
        return parametersLayout;
    }


    /**
     * Sets the parametersLayout value for this ExecutionInfo3.
     * 
     * @param parametersLayout
     */
    public void setParametersLayout(com.imperialm.imimserservices.reports.ParametersGridLayoutDefinition parametersLayout) {
        this.parametersLayout = parametersLayout;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ExecutionInfo3)) return false;
        ExecutionInfo3 other = (ExecutionInfo3) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.parametersLayout==null && other.getParametersLayout()==null) || 
             (this.parametersLayout!=null &&
              this.parametersLayout.equals(other.getParametersLayout())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = super.hashCode();
        if (getParametersLayout() != null) {
            _hashCode += getParametersLayout().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ExecutionInfo3.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ExecutionInfo3"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("parametersLayout");
        elemField.setXmlName(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParametersLayout"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://schemas.microsoft.com/sqlserver/2005/06/30/reporting/reportingservices", "ParametersGridLayoutDefinition"));
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
