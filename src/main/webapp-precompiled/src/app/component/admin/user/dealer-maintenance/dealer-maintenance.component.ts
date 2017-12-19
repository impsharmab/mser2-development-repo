import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';

@Component({
    selector: 'user-emulation',
    templateUrl: './dealer-maintenance.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class DealerMaintenanceComponent implements OnInit {

    selectedDC: string = "";
    showDCErrorHiddenDiv: boolean = false;
    showDCSuccessHiddenDiv: boolean = false;
    postDCInProgress: boolean = false;
    showdealerSearchResultDatatable: boolean = false;
    displayEDITDialog: boolean = false;
    displaycontinueSaveDialog: boolean = false;
    postSaveInProgress: boolean = false;
    saveErrorMsg: string = "";

    dealerSearchResult: any = [
        {
            "DC": "S86013b", "dc": "26550", "eid": "786", "name": "Christopher Baker", "butype": "Service Manager", "status": "Enrolled", "date": "09/11/2017"
        },
        {
            "DC": "S86013b", "dc": "26308", "eid": "786", "name": "Christopher Baker", "butype": "Parts Manager", "status": "Enrolled", "date": "09/11/2017"
        }]

    enrollmentOptions: SelectItem[] = [{ label: "Enrolled", value: "E" }, { label: "De Enrolled", value: "N" }]
    constructor(private router: Router, private adminService: AdminService) {

    }
    ngOnInit() {
        this.getProgramGroupNameData();
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

    searchDealersDatum: any = [];
    searchDealersData: any = [];
    searchDC() {
        this.reset();
        this.back90Date= "";
        this.unenrollflag = false;
        var DCRegex = /^([0-9]{5})$/;
        if (this.selectedDC != undefined && this.selectedDC.trim() == "") {
            this.errorUserMessage = "Please enter a Dealer Code";
            this.showDCErrorHiddenDiv = true;
            return;
        } else if (!DCRegex.test(this.selectedDC.trim())) {
            this.errorUserMessage = "Invalid Dealer Code";
            this.showDCErrorHiddenDiv = true;
            return;
        }
        this.adminService.getSearchDealerMaintenanceData(this.selectedDC).subscribe(
            (searchDealersDatum) => {
                this.searchDealersDatum = (searchDealersDatum.enrollment[0]);
                this.searchDealersData = (searchDealersDatum);
                this.postDCInProgress = true;
                this.showdealerSearchResultDatatable = true;
                this.postDCInProgress = false;
                console.log(this.searchDealersDatum);
                for (var i = 0; i < this.programGroupNameDatum.length; i++) {
                    for (var j = 0; j < this.searchDealersDatum.length; j++) {
                        if (this.searchDealersDatum[j].programGroupID == this.programGroupNameDatum[i].item1) {
                            this.searchDealersDatum[j].programGroupName = this.programGroupNameDatum[i].item2;
                        }
                    }
                }
                console.log(this.searchDealersDatum);
            },
            (error) => {
                this.errorUserMessage = "Dealer Code doesn't exist !";
                this.showDCErrorHiddenDiv = true;
            }
        );
    }

    editdealerMaintenaceDatum: any = []
    onRowSelect(event) {
        this.displayEDITDialog = true;
        this.editdealerMaintenaceDatum = event.data;
        // this.createBack90DaysCalender(this.editdealerMaintenaceDatum.updateDate);
    }

    minDate: Date;
    maxDate: Date;
    createBack90DaysCalender(currentDate) {
        var currentMonth: string = currentDate.getMonth;
        var currentDay: string = "";
        var currentYear: string = "";

        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(currentDate.getFullYear());
        this.maxDate = currentDate;
    }
    displaycontinueCancelDialog: boolean = false;
    cancelEdit() {
        this.saveErrorMsg = "";
        this.displaycontinueCancelDialog = true;
        this.displayEDITDialog = true;
    }

    continueCancel() {
        this.displaycontinueCancelDialog = false;
        this.displayEDITDialog = false;
        this.searchDC();
    }
    disContinueCancel() {
        this.displaycontinueCancelDialog = false;
        this.displayEDITDialog = true;
    }

    save() {
        this.displaycontinueSaveDialog = true;
    }

    disContinueSave() {
        this.displaycontinueSaveDialog = false;
    }

    back90Date: string = "";
    saveDealerDatum: any;
    errorUserMessage: string ="";
    successUserMessage: string ="";
    unenrollflag: boolean = false;

    continueSave() {
        this.reset();
        this.disContinueSave();

        if (!this.unenrollflag) {
            if (!this.back90Date) {
                this.saveErrorMsg = "Invalid date selected.  Please choose a data within 90 days prior to current enrollment.";
                return;
            }
            var todayDate = new Date(this.searchDealersDatum.updateDate);
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

        if (!this.showDCErrorHiddenDiv) {
            if (!this.unenrollflag) {
                this.searchDealersDatum.updateDate = new Date(this.back90Date).toJSON();
            } else {
                this.searchDealersDatum.status = "N";
            }
            this.searchDealersDatum.updatedBy = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.adminService.saveDealerMaintenanceData(this.searchDealersData).subscribe(
                (error) => {
                    this.errorUserMessage = error;
                    this.showDCErrorHiddenDiv = true;
                },
                (data) => {
                    if (this.unenrollflag){
                        this.successUserMessage = "Dealership unenrolled successfully !";    
                    } else {
                        this.successUserMessage = "Dealership enrollment date updated successfully !";
                    }
                    this.showdealerSearchResultDatatable = false;
                    this.showDCSuccessHiddenDiv = true;
                }
            )
        }
    }
    adddealer() {
        let url = ["mserHomepage/add"];
        this.router.navigate(url);
    }

    backDateChanged() {
        this.saveErrorMsg = "";
        if (!this.unenrollflag) {
            if (!this.back90Date) {
                this.saveErrorMsg = "Invalid date selected.  Please choose a data within 90 days prior to current enrollment.";
                return;
            }
            var todayDate = new Date(this.searchDealersDatum.updateDate);
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
    }

    reset() {
        //this.back90Date = "";
        this.errorUserMessage = "";
        this.saveErrorMsg = "";
        this.successUserMessage = "";
        this.showDCSuccessHiddenDiv = false;
        this.showDCErrorHiddenDiv = false;
    }
}
