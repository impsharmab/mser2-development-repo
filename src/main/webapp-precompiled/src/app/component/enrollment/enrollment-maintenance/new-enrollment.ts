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
    private positionCodesResponse: any = [];
    private selectedRowSid: string = "";
    private mserElligiblepc: SelectItem[] = [{ label: "01", value: "01" }, { label: "13", value: "13" }, { label: "23", value: "23" }, { label: "2A", value: "2A" }, { label: "08", value: "08" }, { label: "20", value: "20" }];
    private mmElligiblepc: any = ["01", "13", "23", "2A", "08", "09", "ES", "ET"];
    private mserOptions: any = [{ label: "", value: "" }]

    private moparPartsData: any = [{ "pc1": "Service Advisor (13)" }, { "pc2": "Service Advisor (13)" }];
    private enrollmentData: EnrollmentInterface = {
        "sid": "", "name": "", "dmsId": "", "myPersonnelDmsId": "", "myPersonnelPositions": [],
        "moparPartsData": [], "magnetiMarelliData": [], "mvpData": [], "wiAdvisorMVPData": [],
        "wiAdvisorTiresData": [], "posCodeOverrides": [], "pcManager": "", "elManager": "",
        "urManager": "", "urParticipant": ""
    };

    private enrollmentDataResponse: any;
    cities: any = [{ label: 'New York', value: 'New York' }, { label: 'Rome', value: 'Rome' }];

    constructor(private enrollmentService: EnrollmentMaintenanceService) { }

    ngOnInit() {
        this.getEnrollmentData();
        this.getPositionCodes();

        // for (var i = 0; i < this.mserElligiblepc.length; i++) {
        //     this.mserElligiblepc.push({ label: this.mserElligiblepc[i], value: this.mserElligiblepc[i] });
        // }
    }
    private getMatch(a, b) {
        var matches: SelectItem[];
        for (var i = 0; i < a.length; i++) {
            for (var e = 0; e < b.length; e++) {
                if (a[i] === b[e]) {
                    matches.push(a[i]);
                }
            }
        }

        this.mserOptions.push(matches);

    }
    private mserData: any = [];
    private constructSelectItem(index): any {
        var dataArray: SelectItem[];
        var optionArray: SelectItem[];
        var overrideOptionArray: SelectItem[];
        dataArray = [];
        optionArray = [];
        overrideOptionArray = [];
        for (var i = 0; i < this.enrollmentDataResponse[index].mser.length; i++) {
            dataArray.push({ label: this.enrollmentDataResponse[i].mser, value: this.enrollmentDataResponse[i].mser });
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].positionCodes.length; i++) {
            optionArray.push({ label: this.enrollmentDataResponse[index].positionCodes[i], value: this.enrollmentDataResponse[index].positionCodes[i] });
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].overriddenpositionCodes.length; i++) {
            optionArray.push({ label: this.enrollmentDataResponse[index].overriddenpositionCodes[i], value: this.enrollmentDataResponse[index].overriddenpositionCodes[i] });
        }
        for (var i = 0; i < this.positionCodesResponse.length; i++) {
            overrideOptionArray.push({ label: this.positionCodesResponse[i].item1, value: (this.positionCodesResponse[i].item1) });
        }

        this.getMatch(optionArray, this.mserElligiblepc);
        this.enrollmentDataResponse[index].mserOptions = this.mserOptions;
        this.enrollmentDataResponse[index].options = optionArray;
        this.enrollmentDataResponse[index].optionsOverrides = overrideOptionArray;
        // return this.mserData.push(dataArray);

    }
    private getEnrollmentData() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.enrollmentService.getEnrollmentData(dealerCode).subscribe(
            (enrollmentDataResponse) => {
                this.enrollmentDataResponse = (enrollmentDataResponse)
                this.constructEnrollmentData();
            },
            (error) => {

            }
        )
    }
    private getPositionCodes() {
        this.enrollmentService.getPositionCodes().subscribe(
            (positionCodesResponse) => {
                this.positionCodesResponse = (positionCodesResponse)

            },
            (error) => {

            }
        )
    }
    private newEnrollmentData: any = [];

    private constructEnrollmentData() {
        for (var i = 0; i < this.enrollmentDataResponse.length; i++) {
            this.constructSelectItem(i);
        }


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
