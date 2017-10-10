package com.imperialm.imimserservices.reports.servlets;

import com.imperialm.imimserservices.reports.util.ReportUtil;
import com.imperialm.imimserservices.reports.ParameterValue;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Dheerajr
 */
public class ExcelServlet extends HttpServlet {

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
        PrintWriter out = response.getWriter();
        List<ParameterValue> params = new ArrayList<ParameterValue>();
        ParameterValue param = null;
        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyyMMddHHmmss");

        try {
            String reportPath = request.getParameter("reportPath");
            String reportName = request.getParameter("reportName");
            request.removeAttribute("reportPath");
            request.removeAttribute("reportName");
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Pragma", "public");
            response.setHeader("Cache-Control", "no-store");
            response.addHeader("Cache-Control", "max-age=0");
            response.setHeader("Content-Disposition", "attachment; filename=" + reportName + "_" + dateFormatter.format(new Date()) + ".xls");


            for (Object keys : request.getParameterMap().keySet()) {
                String key = keys.toString();
                if ("reportPath".equals(key) || "reportName".equals(key)) {
                    continue;
                }
                param = new ParameterValue();
                param.setName(key);
                param.setValue(request.getParameter(key).toString());
                params.add(param);
            }
            String responseString = ReportUtil.processExcelReport(request, reportPath, reportName, params);

            response.setContentLength(responseString.length());
            OutputStream outputStream = response.getOutputStream();
            outputStream.write(responseString.getBytes());
            
            outputStream.flush();
            outputStream.close();
        } catch (final IOException e) {
            e.printStackTrace();
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
