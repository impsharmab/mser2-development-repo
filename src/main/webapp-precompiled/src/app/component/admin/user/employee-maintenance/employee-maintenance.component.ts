import { Component, ViewChild, OnInit ,ChangeDetectorRef} from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { DataTable } from 'primeng/primeng';
import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';

@Component({
    selector: 'user-emulation',
    templateUrl: './employee-lookup.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class EmployeeMaintenanceComponent implements OnInit {

    @ViewChild("datatable") dataTable: DataTable;

    public selectedSID: string = "";
    public showSIDErrorHiddenDiv: boolean = false;
    public postSIDInProgress: boolean = false;
    public showemployeeSearchResultDatatable: boolean = false;
    public displayEDITDialog: boolean = false;
    public displaycontinueSaveDialog: boolean = false;
    public postSaveInProgress: boolean = false;
    public saveErrorMsg: string = "";
    public saveSucessMsg: string = "";
    public visible: boolean = false;

    public employeeSearchResult: any = [
        {
            "sid": "S86013b", "dc": "26550", "eid": "786", "name": "Christopher Baker", "butype": "Service Manager", "status": "Enrolled", "date": "09/11/2017"
        },
        {
            "sid": "S86013b", "dc": "26308", "eid": "786", "name": "Christopher Baker", "butype": "Parts Manager", "status": "Enrolled", "date": "09/11/2017"
        }]

    public validProgramGroups: any = [4, 3, 2, 5, 11, 10, 6, 1, 15, 14 ]
    constructor(
        private router: Router,
        private adminService: AdminService,
        private changeDetector: ChangeDetectorRef
    ) {

    }
    
    ngOnInit() {
        this.getProgramGroupNameData();
        this.getPositionCodeListData();
        this.getProgramGroupPositions();
    }

    programGroupNameDatum: any
    getProgramGroupNameData() {
        this.adminService.getProgramGroupNameData().subscribe(
            (programGroupNameDatum) => {
                this.programGroupNameDatum = (programGroupNameDatum)
            },
            (error) => {
            }
        )
    }

    positionCodesList: any;
    getPositionCodeListData() {
        this.adminService.getPositionCodeListData().subscribe(
            (positionCodes) => {
                this.positionCodesList = (positionCodes)
            },
            (error) => {
            }
        )
    }

    programGroupPositions: any;
    getProgramGroupPositions() {
       let positions: any = [
        { programGroupID: '2',  positionCode:'08'},
        { programGroupID: '2',  positionCode:'09'},
        { programGroupID: '2',  positionCode:'13'},
        { programGroupID: '2',  positionCode:'23'},
        { programGroupID: '2',  positionCode:'2A'},
        { programGroupID: '2',  positionCode:'ES'},
        { programGroupID: '2',  positionCode:'ET'},
        { programGroupID: '3',  positionCode:'08'},
        { programGroupID: '3',  positionCode:'09'},
        { programGroupID: '3',  positionCode:'13'},
        { programGroupID: '3',  positionCode:'23'},
        { programGroupID: '3',  positionCode:'2A'},
        { programGroupID: '3',  positionCode:'ES'},
        { programGroupID: '3',  positionCode:'ET'},
        { programGroupID: '4',  positionCode:'08'},
        { programGroupID: '4',  positionCode:'09'},
        { programGroupID: '4',  positionCode:'13'},
        { programGroupID: '4',  positionCode:'23'},
        { programGroupID: '4',  positionCode:'2A'},
        { programGroupID: '4',  positionCode:'ES'},
        { programGroupID: '4',  positionCode:'ET'},
        { programGroupID: '5',  positionCode:'09'},
        { programGroupID: '5',  positionCode:'13'},
        { programGroupID: '5',  positionCode:'ES'},
        { programGroupID: '7',  positionCode:'09'},
        { programGroupID: '10',  positionCode:'08'},
        { programGroupID: '10',  positionCode:'09'},
        { programGroupID: '10',  positionCode:'13'},
        { programGroupID: '10',  positionCode:'23'},
        { programGroupID: '10',  positionCode:'2A'},
        { programGroupID: '11',  positionCode:'08'},
        { programGroupID: '11',  positionCode:'09'},
        { programGroupID: '11',  positionCode:'13'},
        { programGroupID: '14',  positionCode:'07'},
        { programGroupID: '14',  positionCode:'12'},
        { programGroupID: '14',  positionCode:'34'},
        { programGroupID: '1',  positionCode:'ZZ'},        
        { programGroupID: '6',  positionCode:'ZZ'},                
        { programGroupID: '15',  positionCode:'ZZ'}
       ]

       this.programGroupPositions = positions;
    }

    errorMessage: string;
    searchEmployeesDatum: any = [];
    searchEmployees: any;
    back90Date: string;

    public getSID() {
        this.errorMessage = ""        
        this.saveErrorMsg = "";
        this.showSIDErrorHiddenDiv = false;
        this.back90Date = "";

        var sidRegex = /^([A-Za-z0-9]{7})$/;
        if (this.selectedSID != undefined && this.selectedSID.trim() == "") {
            this.errorMessage = "Invalid SID!"
            this.showSIDErrorHiddenDiv = true;            
            return;
        } else if (!sidRegex.test(this.selectedSID.trim())) {
            this.errorMessage = "Invalid SID!"
            this.showSIDErrorHiddenDiv = true;
            return;
        }
        
        this.searchResults = [];
        this.adminService.getSearchEmployeeMaintenanceData(this.selectedSID).subscribe(
            (searchEmployeesDatum) => {
                this.searchEmployees = (searchEmployeesDatum);
                this.searchEmployeesDatum = (searchEmployeesDatum.enrollment);
                this.searchEmployeesDatum.sid = searchEmployeesDatum.userId;
                this.searchEmployeesDatum.name = searchEmployeesDatum.name;
                this.postSIDInProgress = true;
                this.showemployeeSearchResultDatatable = true;
                this.postSIDInProgress = false;
                console.log(this.searchEmployeesDatum);
                for (var i = 0; i < this.programGroupNameDatum.length; i++) {
                    for (var j = 0; j < this.searchEmployeesDatum.length; j++) {
                        if (this.searchEmployeesDatum[j].programGroupID == this.programGroupNameDatum[i].item1) {
                            let programName: String = this.programGroupNameDatum[i].item2;
                            this.searchEmployeesDatum[j].programGroupName = programName.substring(programName.indexOf("-") + 1, programName.length);
                        }
                    }
                }

                for (var i = 0; i < this.positionCodesList.length; i++) {
                    for (var j = 0; j < this.searchEmployeesDatum.length; j++) {
                        if (this.searchEmployeesDatum[j].positionCode == this.positionCodesList[i].item1) {
                            if (this.searchEmployeesDatum[j].positionCode == "ZZ") {
                                this.searchEmployeesDatum[j].positionCodeName = this.positionCodesList[i].item2.substring(0, this.positionCodesList[i].item2.indexOf("(")) + "(" + this.searchEmployeesDatum[j].originalPostionCode + ")";
                            } else {
                                this.searchEmployeesDatum[j].positionCodeName = this.positionCodesList[i].item2;
                            }
                        }
                    }
                }

                if (searchEmployeesDatum.enrollment.length == 0) {
                    this.errorMessage = "No Enrollments found !"
                    return;
                }

                for(let x of searchEmployeesDatum.enrollment) {
                    if (this.validProgramGroups.find(y => y == x.programGroupID)) {
                        let dealer = this.searchResults.find(s => s.dealerCode == x.dealerCode.trim());
                        if (dealer) {
                            let program = dealer.programGroups.find(p => p.programGroupID == x.programGroupID);
                            if (program) {
                                let enrollment = program.enrollments.find(e => e.positionCode == x.positionCode.trim());
                                if (enrollment) {
                                } else {
                                    enrollment = {
                                        status : x.status.trim() === "E" ? "Enrolled" : "Not Enrolled",
                                        createdBy : x.createdBy,
                                        sid : x.sid,
                                        updateDate : (x.updateDate)?x.updateDate:x.createdDate,
                                        positionCode : x.positionCode,
                                        positionCodeName : x.positionCodeName,
                                        dealerCode : x.dealerCode,
                                        dealerName : x.dealerName.trim(),
                                        createdDate : x.createdDate,
                                        updatedBy : x.updatedBy,
                                        dmsid : x.dmsid,
                                        delFlag : x.delFlag,
                                        originalPostionCode : x.originalPostionCode,
                                        groupSIDEnrollmentID : x.groupSIDEnrollmentID,
                                        programGroupName: x.programGroupName,
                                        programGroupID : x.programGroupID
                                    };
                                    program.enrollments.push(enrollment);
                                }
                            } else {
                                program = {
                                    programGroupID: x.programGroupID,
                                    programGroupName: x.programGroupName,
                                    enrollments: [{
                                        status : x.status.trim() === "E" ? "Enrolled" : "Not Enrolled",
                                        createdBy : x.createdBy,
                                        sid : x.sid,
                                        updateDate : (x.updateDate)?x.updateDate:x.createdDate,
                                        positionCode : x.positionCode,
                                        positionCodeName : x.positionCodeName,
                                        dealerCode : x.dealerCode,
                                        dealerName : x.dealerName.trim(),
                                        createdDate : x.createdDate,
                                        updatedBy : x.updatedBy,
                                        dmsid : x.dmsid,
                                        delFlag : x.delFlag,
                                        originalPostionCode : x.originalPostionCode,
                                        groupSIDEnrollmentID : x.groupSIDEnrollmentID,
                                        programGroupName: x.programGroupName,
                                        programGroupID : x.programGroupID
                                    }]
                                }
                                dealer.programGroups.push(program);
                            }
                        }
                        else {
                            dealer = {
                                dealerCode: x.dealerCode,
                                dealerName : x.dealerName.trim(),
                                programGroups: [{
                                    programGroupID: x.programGroupID,
                                    programGroupName: x.programGroupName,
                                    enrollments: [{
                                        status : x.status.trim() === "E" ? "Enrolled" : "Not Enrolled",
                                        createdBy : x.createdBy,
                                        sid : x.sid,
                                        updateDate : (x.updateDate)?x.updateDate:x.createdDate,
                                        positionCode : x.positionCode,
                                        positionCodeName : x.positionCodeName,
                                        dealerCode : x.dealerCode,
                                        dealerName : x.dealerName.trim(),
                                        createdDate : x.createdDate,
                                        updatedBy : x.updatedBy,
                                        dmsid : x.dmsid,
                                        delFlag : x.delFlag,
                                        originalPostionCode : x.originalPostionCode,
                                        groupSIDEnrollmentID : x.groupSIDEnrollmentID,
                                        programGroupName: x.programGroupName,
                                        programGroupID : x.programGroupID
                                    }]
                                }]
                            }
                            this.searchResults.push(dealer);
                            this.visible = true;
                        }
                    }
                }
            },
            (error) => {
                this.errorMessage = "SID doesn't exists !"
                this.showSIDErrorHiddenDiv = true;
            }
        )
    }

    public searchSID() {
        this.saveSucessMsg = "";
        this.getSID();
    }

    searchResults: any[] = []    
    public editEmployeeMaintenaceDatum: any = []
    onRowSelect(event) {
        event.data.isEditableR = false;
        this.enableEditable = false;
    }

    onEditInitE(event: any) {
        if (!event.data.isEditableR) {
            setTimeout(() => {
                this.dataTable.closeCell();
            }, 1);
        }
    }

    backDateChanged() {
        this.saveErrorMsg = "";
        var todayDate = new Date(this.rowData.updateDate);
        let newdate = new Date(this.back90Date);

        if (newdate > todayDate) {
            this.saveErrorMsg = "Invalid date selected.  Please choose a data within 90 days prior to current enrollment.";
            return;
        }
        
        var days = (todayDate.getTime() - newdate.getTime()) / (1000*60*60*24);
        if (days > 90) {
            this.saveErrorMsg = "Invalid date selected.  Please choose a data within 90 days prior to current enrollment.";
            return;
        }
    }

    editSingleRow: boolean = false;
    disableGlobalFilter: boolean = false;
    activeUser: string = "";
    confirmCancel: boolean = false;
    confirmSave: boolean = false;
    editButton: any;
    cancelButton: any;
    saveButton: any;
    rowData: any;
    rowIndex: any = 0;
    msg: string = "";    
    enableEditable: boolean = false;

    edit(rowData, editButton, cancelButton, saveButton) {
        
        if (rowData.status === "Enrolled") {
            this.msg = "";
            this.disableGlobalFilter = true;
            if (this.editSingleRow) {
                return;
            } else {
                this.editSingleRow = true;
            }
            this.msg = "";
            editButton.style["display"] = "none";
            cancelButton.style["display"] = "block";
            saveButton.style["display"] = "block";
            this.activeUser = rowData.dealerCode + "-" + rowData.programGroupName + "-" +  rowData.positionCode;
            this.rowData = rowData;
            this.saveErrorMsg = "";
            this.saveSucessMsg = "";
            rowData.isEditableR = true;
            this.enableEditable = true;

            let enrollDate = new Date(this.rowData.updateDate)
            this.back90Date = enrollDate.getMonth() + 1 + "/" + enrollDate.getDate() + "/" + enrollDate.getFullYear();
        } 
    }

    applyRowStyle(rowData: any): string {
        // console.log("applyrow");
        return ".rowSelectionColor";
    }

    cancel(rowData, editButton, cancelButton, saveButton) {
        this.saveErrorMsg = "";
        this.editSingleRow = false;
        this.editButton = editButton;
        this.cancelButton = cancelButton;
        this.saveButton = saveButton;
        this.rowData = rowData;
        editButton.style["display"] = "block";
        cancelButton.style["display"] = "none";
        saveButton.style["display"] = "none";
        this.enableEditable = false;
        rowData.isEditableR = false;
        this.saveErrorMsg = "";
        this.saveSucessMsg = "";
    }

    discontinueCancel() {
        this.editSingleRow = true;
        this.confirmCancel = false;
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
    }

    saveEnrollmentMaintenanceData(rowData, editButton, cancelButton, saveButton, index) {
        this.displaycontinueSaveDialog = true;
        this.editButton = editButton;
        this.cancelButton = cancelButton;
        this.saveButton = saveButton;
        this.rowData = rowData;
        this.rowIndex = index;
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public disContinueSave() {
        this.displaycontinueSaveDialog = false;
    }

    public continueSave() {
        this.displaycontinueSaveDialog = false;
        this.editButton.style["display"] = "block";
        this.cancelButton.style["display"] = "none";
        this.saveButton.style["display"] = "none";
        this.enableEditable = false;
        this.editSingleRow = false;
        this.rowData.isEditableR = false;

        this.saveErrorMsg = "";
        var todayDate = new Date(this.rowData.updateDate);
        let newdate = new Date(this.back90Date);

        if (newdate > todayDate) {
            this.saveErrorMsg = "Invalid date selected.  Please choose a data within 90 days prior to current enrollment.";
            return;
        }
        
        var days = (todayDate.getTime() - newdate.getTime()) / (1000*60*60*24);
        if (days > 90) {
            this.saveErrorMsg = "Invalid date selected.  Please choose a data within 90 days prior to current enrollment.";
            return;
        }

        var modifiedDate = new Date(this.back90Date).toJSON();
        this.rowData.updateDate =  modifiedDate;
        this.rowData.updatedBy = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.adminService.saveUserMaintenanceByEnrollment(this.rowData).subscribe(
            (error) => {
                this.saveErrorMsg = error;
            },
            (data) => {                
                this.saveSucessMsg = "Employee details updated successfully!";
                this.changeDetector.detectChanges();
                this.getSID();               
            }
        )

        this.displayEDITDialog = false;
        this.saveSucessMsg = "";
        this.saveErrorMsg = "";
    }
}
