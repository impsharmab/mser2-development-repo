/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.imperialm.imimserservices.dto;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author Venkatachalamm
 */
@Entity @Getter @Setter @Table(name = "GroupSIDEnrollments")
public class GroupSIDEnrollmentswProgramDTO implements Serializable {
    @Id private Integer GroupSIDEnrollmentID;
    @Id private Integer ProgramGroupID;
    @Id private String DealerCode;
    @Id private String SID;
    @Id private String PositionCode;
    @Id private String Status;
    @Id private String DMSID;
    @Id private Date CreatedDate;
    @Id private String CreatedBy;
    @Id private Date UpdateDate;
    @Id private String UpdatedBy;
    @Id private String DelFlag;
    @Id private String OriginalPostionCode;
    @Id private String DealerName = "";
}
