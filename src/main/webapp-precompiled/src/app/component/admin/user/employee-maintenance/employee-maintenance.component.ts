import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';

@Component({
    selector: 'user-emulation',
    templateUrl: './employee-lookup.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class EmployeeMaintenanceComponent implements OnInit {

    public selectedSID: string = "";
    public showSIDErrorHiddenDiv: boolean = false;
    public postSIDInProgress: boolean = false;
    public showemployeeSearchResultDatatable: boolean = false;
    public displayEDITDialog: boolean = false;
    public displaycontinueSaveDialog: boolean = false;
    public postSaveInProgress: boolean = false;
    public saveErrorMsg: string = "";

    public employeeSearchResult: any = [
        {
            "sid": "S86013b", "dc": "26550", "eid": "786", "name": "Christopher Baker", "butype": "Service Manager", "status": "Enrolled", "date": "09/11/2017"
        },
        {
            "sid": "S86013b", "dc": "26308", "eid": "786", "name": "Christopher Baker", "butype": "Parts Manager", "status": "Enrolled", "date": "09/11/2017"
        }]
    constructor(
        private router: Router,
        private adminService: AdminService
    ) {

    }
    
    ngOnInit() {
        this.getProgramGroupNameData();
        this.getPositionCodeListData();
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

    errorMessage: string;
    searchEmployeesDatum: any;
    searchEmployees: any;
    back90Date: string;
    public searchSID() {
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
                            this.searchEmployeesDatum[j].positionCodeName = this.positionCodesList[i].item2;
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

    public editEmployeeMaintenaceDatum: any = []
    public onRowSelect(event) {
        this.displayEDITDialog = true;
        this.editEmployeeMaintenaceDatum = event.data;
    }

    public displaycontinueCancelDialog: boolean = false;
    public cancelEdit() {
        this.saveErrorMsg = "";
        // this.displaycontinueCancelDialog = true;
        this.displayEDITDialog = false;
    }

    public continueCancel() {
        //this.displaycontinueCancelDialog = false;
        this.displayEDITDialog = false;
        //this.searchSID();
    }
    public disContinueCancel() {
        this.displaycontinueCancelDialog = false;
        this.displayEDITDialog = false;
    }
    public async save() {
        this.saveErrorMsg = "";
        if (!this.back90Date) {
            this.saveErrorMsg = "Invalid date, cannot be empty !";
            return;
        }
        
        let newdate = new Date(this.back90Date);
        if (newdate > new Date()) {
            this.saveErrorMsg = "Invalid date, cannot be future date !";
            return;
        }

        var todayDate = new Date();
        var days = (todayDate.getTime() - newdate.getTime()) / (1000*60*60*24);
        if (days > 90) {
            this.saveErrorMsg = "Invalid date, cannot be less than 90 days !";
            return;
        }

        this.displayEDITDialog = true;
        this.displaycontinueSaveDialog = true;

        var modifiedDate = new Date(this.back90Date);
        this.editEmployeeMaintenaceDatum.updateDate =  (modifiedDate.getMonth() + 1) + "/" + modifiedDate.getDate() + "/" + modifiedDate.getFullYear();
        this.adminService.saveUserMaintenanceByEnrollment(this.editEmployeeMaintenaceDatum).subscribe(
            (error) => {
                this.saveErrorMsg = error;
            },
            (data) => {                
      //          this.saveErrorMsg = "Enrollment updated successfully";
                this.searchSID();
            }
        )

        this.displayEDITDialog = false;
        this.saveErrorMsg = "";
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public disContinueSave() {
        this.displayEDITDialog = true;
        this.displaycontinueSaveDialog = false;
    }

    public continueSave() {
        this.postSaveInProgress = true;
    }
    public addEmployee() {
        let url = ["mserHomepage/add"];
        this.router.navigate(url);
    }

}
