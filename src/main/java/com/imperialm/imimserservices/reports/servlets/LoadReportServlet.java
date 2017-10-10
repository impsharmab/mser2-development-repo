/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.imperialm.imimserservices.reports.servlets;

import com.imperialm.imimserservices.reports.util.IMIUtils;
import com.imperialm.imimserservices.reports.util.ReportUtil;
import com.imperialm.imimserservices.reports.ParameterValue;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Dheerajr
 */
public class LoadReportServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String key;
        String reportName = "";
        String reportPath = "";

        List<ParameterValue> params = new ArrayList<ParameterValue>();
        ParameterValue param = null;

        try {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Imperial Report Loader...</title>");
            out.println("</head>");
            out.println("<body>");
            for (Object keyObject : request.getParameterMap().keySet()) {
                key = keyObject.toString();
                if (key.toString().startsWith("/")) {
                    String[] keys = key.split("/");
                    reportPath = keys[1];
                    reportName = keys[2];
                } else if (!key.contains(":")) {
                    param = new ParameterValue();
                    param.setName(key);
                    param.setValue(request.getParameter(key).toString());
                    params.add(param);
                }
            }
            ParameterValue[] paramArray = params.toArray(new ParameterValue[params.size()]);

            StringBuilder sb = ReportUtil.getReport(paramArray, reportPath, reportName, "");
            out.println(sb.toString().replace("http://826909-sql-imst/ReportServer", IMIUtils.getBaseUrl(request)+"LoadReports"));
            out.println("</body>");
            out.println("</html>");
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
