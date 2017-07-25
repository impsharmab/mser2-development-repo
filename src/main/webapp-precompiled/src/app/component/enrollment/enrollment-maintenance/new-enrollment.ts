import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/primeng';

import { EnrollmentInterface } from './enrollment.interface';
@Component({
    selector: 'app-enrollment',
    templateUrl: './new-enrollment.html'
    //   styleUrls: ['./enrollment-maintenance.component.css']
})
export class EnrollmentComponent implements OnInit {

    private displayEnrollmentDialog: boolean;
    private enableEditable: boolean = false;
    private showEditButton: boolean = true;;
    private showCancelButton: boolean = false;
    private showSaveButton: boolean = false;
    private selectedRowSid: string = "";
    private moparPartsData: any = [{ "pc1": "Service Advisor (13)" }, { "pc2": "Service Advisor (13)" }];
    private enrollmentData: EnrollmentInterface = {
        "sid": "",
        "name": "",
        "dmsId": "",
        "myPersonnelDmsId": "",
        "myPersonnelPositions": [],
        "moparPartsData": [],
        "magnetiMarelliData": [],
        "mvpData": [],
        "wiAdvisorMVPData": [],
        "wiAdvisorTiresData": [],
        "posCodeOverrides": [],
        "pcManager": "",
        "elManager": "",
        "urManager": "",
        "urParticipant": ""
    };

    private enrollmentDataResponse: any;
    // [
    //     {
    //         "sid": "S1234", "name": "James Watt", "dmsId": "2547", "myPersonnelDmsId": "145", "myPersonnelPositions": ["45", "2", "2"],
    //         "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"],
    //         "wiAdvisorTiresData": ["11", "65"],
    //         "posCodeOverrides": ["4", "5", "1"], "pcManager": "23", "elManager": "13", "urManager": "11", "urParticipant": "13"
    //     },
    //     {
    //         "sid": "S2452", "name": "Holiday Steff", "dmsId": "879", "myPersonnelDmsId": "214", "myPersonnelPositions": ["11", "87", "25"],
    //         "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"],
    //         "wiAdvisorTiresData": ["11", "65"],
    //         "posCodeOverrides": ["10", "20", "21"], "pcManager": "23", "elManager": "23", "urManager": "8", "urParticipant": "13"
    //     },
    //     {
    //         "sid": "S3895", "name": "John Voight", "dmsId": "489", "myPersonnelDmsId": "802", "myPersonnelPositions": ["23", "24", "5"],
    //         "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"],
    //         "wiAdvisorTiresData": ["11", "65"],
    //         "posCodeOverrides": ["40", "50", "41"], "pcManager": "23", "elManager": "13", "urManager": "18", "urParticipant": "15"
    //     },
    //     {
    //         "sid": "S9851", "name": "Logan Wright", "dmsId": "89", "myPersonnelDmsId": "142", "myPersonnelPositions": ["68", "7", "11"],
    //         "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"],
    //         "wiAdvisorTiresData": ["11", "65"],
    //         "posCodeOverrides": ["4", "15", "1"], "pcManager": "23", "elManager": "19", "urManager": "11", "urParticipant": "13"
    //     },

    // ];

    cities: any = [{ label: 'New York', value: 'New York' }, { label: 'Rome', value: 'Rome' }];

    constructor(private enrollmentService: EnrollmentMaintenanceService) { }

    ngOnInit() {
        this.getEnrollmentData();
    }

    private getEnrollmentData() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.enrollmentService.getEnrollmentData(dealerCode).subscribe(
            (enrollmentDataResponse) => {
                this.enrollmentDataResponse = (enrollmentDataResponse)
                //alert("success");
                // this.opcodesetup();
                // this.getInactiveOpcodesetupData();
                // this.switchstatusmessage = "Successfully Activated Op Code.";
            },
            (error) => {
                //alert("error");
            }
        )
    }

    private onRowSelect(event) {
        this.enableEditable = false;
        this.selectedRowSid = event.data.sid;
        console.log(event);

    }
    private edit(sid, editButton, cancelButton, saveButton) {
        editButton.style["display"] = "none";
        cancelButton.style["display"] = "block";
        saveButton.style["display"] = "block";
        this.enableEditable = true;
    }

    private cancel(sid, editButton, cancelButton, saveButton) {
        editButton.style["display"] = "block";
        cancelButton.style["display"] = "none";
        saveButton.style["display"] = "none";
        this.enableEditable = false;
    }

    private save(sid, editButton, cancelButton, saveButton) {
        editButton.style["display"] = "block";
        cancelButton.style["display"] = "none";
        saveButton.style["display"] = "none";
        this.enableEditable = false;
    }

    private getSelectedDealerCode() {
        return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    }

    private getSelectedDealerName() {
        return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
    }
    private test(data, d) {
        console.log(data);
    }
} 