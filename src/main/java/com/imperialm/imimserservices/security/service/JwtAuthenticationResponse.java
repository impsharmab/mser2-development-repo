package com.imperialm.imimserservices.security.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.BooleanUtils;

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
    private boolean isHalfAdmin = false;
    
    @Getter @Setter
    private List<String> positionCode;
    
    @Getter @Setter
    private List<String> positionCodeDesc;
    
    @Getter @Setter
    private List<String> dealerCode;
    
    @Getter @Setter
    private List<String> dealerName;
    
    @Getter @Setter
    private List<String> bcs;
    
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
    
    @Getter @Setter
    private List<Boolean> elEnrolled;
    
    @Getter @Setter
    private List<Boolean> pcEnrolled;
    
    @Getter @Setter
    private List<Boolean> elValidated;
    
    @Getter @Setter
    private boolean passwordReset = false;
    
    @Getter @Setter
    private List<Boolean> elManagerExists;
    
    @Getter @Setter
    private List<Boolean> uvmManagerExists;
    
    @Getter @Setter
    private List<Boolean> pcManagerExists;
    
    @Getter @Setter
    private List<Boolean> mvpApproval;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
        this.positionCode = new ArrayList<String>();
        this.positionCodeDesc = new ArrayList<String>();
        this.dealerCode = new ArrayList<String>();
        this.bcs = new ArrayList<String>();
        this.roles = new ArrayList<Integer>();
        this.dealerName = new ArrayList<String>();
        //this.mserEnrollment = new ArrayList<Boolean>();
        this.dealerManager = new ArrayList<Boolean>();
        this.serviceManagerOfRecord = new ArrayList<Boolean>();
        this.partsManagerOfRecord = new ArrayList<Boolean>();
        
        this.elEnrolled = new ArrayList<Boolean>();
        this.pcEnrolled = new ArrayList<Boolean>();
        this.elValidated = new ArrayList<Boolean>();
        
        this.elManager = new ArrayList<Boolean>();
        this.pcManager = new ArrayList<Boolean>();
        this.uvmManager = new ArrayList<Boolean>();
        
        this.elManagerExists = new ArrayList<Boolean>();
        this.pcManagerExists = new ArrayList<Boolean>();
        this.uvmManagerExists = new ArrayList<Boolean>();
        
        this.mvpApproval = new ArrayList<Boolean>();
    }
}
