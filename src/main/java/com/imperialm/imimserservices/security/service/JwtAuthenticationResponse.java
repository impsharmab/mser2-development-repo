package com.imperialm.imimserservices.security.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    @Getter
    private final String token;
    
    @Getter @Setter
    private String name = "";
    
    @Getter @Setter
    private boolean isAdmin = false;
    
    @Getter @Setter
    private List<String> positionCode;
    
    @Getter @Setter
    private List<String> dealerCode;
    
    @Getter @Setter
    private List<String> dealerName;
    
    @Getter @Setter
    //private List<Boolean> mserEnrollment;
    private Boolean mserEnrollment = false;
    
    @Getter @Setter
    private List<Integer> roles;
    
    @Getter @Setter
    private String userId;
    
    @Getter @Setter
    private List<Boolean> dealerManager;
    
    @Getter @Setter
    private List<Boolean> serviceManagerOfRecord;
    
    @Getter @Setter
    private List<Boolean> partsManagerOfRecord;
    
    @Getter @Setter
    private List<Boolean> elManager;
    
    @Getter @Setter
    private List<Boolean> pcManager;
    
    @Getter @Setter
    private List<Boolean> uvmManager;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
        this.positionCode = new ArrayList<String>();
        this.dealerCode = new ArrayList<String>();
        this.roles = new ArrayList<Integer>();
        this.dealerName = new ArrayList<String>();
        //this.mserEnrollment = new ArrayList<Boolean>();
        this.dealerManager = new ArrayList<Boolean>();
        this.serviceManagerOfRecord = new ArrayList<Boolean>();
        this.partsManagerOfRecord = new ArrayList<Boolean>();
        
        this.elManager = new ArrayList<Boolean>();
        this.pcManager = new ArrayList<Boolean>();
        this.uvmManager = new ArrayList<Boolean>();
    }
}
