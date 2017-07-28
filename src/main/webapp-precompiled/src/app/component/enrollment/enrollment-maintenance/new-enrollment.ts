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
    private saveEnrollmentMaintenanceDataResponse: any;
    // private mserElligiblepc: SelectItem[] = [{ label: "01", value: "01" }, { label: "13", value: "13" }, { label: "23", value: "23" }, { label: "2A", value: "2A" }, { label: "08", value: "08" }, { label: "20", value: "20" }];
    private mserElligiblepc: any = ["01", "13", "23", "2A", "08", "09", "ES", "ET", "20"];
    private mmElligiblepc: any = ["01", "13", "23", "2A", "08", "09", "ES", "ET"];
    private upFitsElligpc: any = ["01", "13", "23", "2A", "08", "09", "ES", "ET"];
    private tiresElligpc: any = ["13", "23", "2A", "08", "09"];
    private mvpElligpc: any = ["13", "es", "09"];
    private wiAdvMVPElligpc: any = ["13", "09"];
    private wiAdvTirElligepc: any = ["13", "08", "09"];
    private uconSalesElligpc: any = [""];
    private uconServiceElligpc: any = [];
    private pcPartElligpc = ["8", "14", "40", "19"];
    private pcMElligpc = ["01", "02", "08", "09", "32", "33", "35", "40", "37"];
    private elMElligpc: any = ["09", "17", "33", "35"];
    private elPElligpc: any = ["01", "13", "23", "2A", "ES", "ET"];
    private uvmEnrElligpc: any = ["08", "09", "07"];
    private uvmPartElligpc: any = ["07", "34"];
    private warrantyAdmElligpc: any = ["29"];

    private mserOptions: SelectItem[] = [];
    private mmOptions: SelectItem[] = [];
    private upFitsOptions: SelectItem[] = [];
    private tiresOptions: SelectItem[] = [];
    private mvpOptions: SelectItem[] = [];
    private wiAdvMVPOptions: SelectItem[] = [];
    private wiAdvTireOptions: SelectItem[] = [];
    private uconSalesOptions: SelectItem[] = [];
    private uconServiceOptions: SelectItem[] = [];
    private pcPartOptions: SelectItem[] = [];
    private pcMOptions: SelectItem[] = [];
    private elMOptions: SelectItem[] = [];
    private elPOptions: SelectItem[] = [];
    private uvmEnrOptions: SelectItem[] = [];
    private uvmPartOptions: SelectItem[] = [];
    private warrantyAdmOptions: SelectItem[] = [];
    private cars = [{ "vin": "45645", "year": "2014", "brand": "Toyota", "color": "white" }, { "vin": "45645", "year": "2014", "brand": "Toyota", "color": "white" }]


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
    private getMatch(optionArrayData, index) {
        // var optionArray = [];

        // var mserMatches = [];
        // var mmMatches = [];
        // var upFitsMatches = [];
        // var tiresMatches = [];
        // var mvpMatches = [];
        // var wiAdvMVPMatches = [];
        // var wiAdvTireMatches = [];
        // var uconSalesMatches = [];
        // var uconServiceMatches = [];
        // var pcPartMatches = [];
        // var pcMMatches = [];
        // var elMMatches = [];
        // var elPMatches = [];
        // var uvmEnrMatches = [];
        // var uvmPartMatches = [];
        // var warrantyAdmMatches = [];

        var mserOptions: SelectItem[] = [];
        var mmOptions: SelectItem[] = [];
        var upFitsOptions: SelectItem[] = [];
        var tiresOptions: SelectItem[] = [];
        var mvpOptions: SelectItem[] = [];
        var wiAdvMVPOptions: SelectItem[] = [];
        var wiAdvTireOptions: SelectItem[] = [];
        var uconSalesOptions: SelectItem[] = [];
        var uconServiceOptions: SelectItem[] = [];
        var pcPartOptions: SelectItem[] = [];
        var pcMOptions: SelectItem[] = [];
        var elMOptions: SelectItem[] = [];
        var elPOptions: SelectItem[] = [];
        var uvmEnrOptions: SelectItem[] = [];
        var uvmPartOptions: SelectItem[] = [];
        var warrantyAdmOptions: SelectItem[] = [];


        // for (var j = 0; j < optionArrayData.length; j++) {
        //     optionArray.push(optionArrayData[j].value);
        // }

        for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.mserElligiblepc.length; e++) {
                if (optionArrayData[i].value === this.mserElligiblepc[e]) {
                    // mserMatches.push(optionArrayData[i]);
                    mserOptions.push(optionArrayData[i]);

                }
            }
        }
        for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.mmElligiblepc.length; e++) {
                if (optionArrayData[i].value === this.mmElligiblepc[e]) {
                    mmOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.upFitsElligpc.length; e++) {
                if (optionArrayData[i].value === this.upFitsElligpc[e]) {
                    upFitsOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.tiresElligpc.length; e++) {
                if (optionArrayData[i].value === this.tiresElligpc[e]) {
                    tiresOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.mvpElligpc.length; e++) {
                if (optionArrayData[i].value === this.mvpElligpc[e]) {
                    mvpOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.wiAdvMVPElligpc.length; e++) {
                if (optionArrayData[i].value === this.wiAdvMVPElligpc[e]) {
                    wiAdvMVPOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.wiAdvTirElligepc.length; e++) {
                if (optionArrayData[i].value === this.wiAdvTirElligepc[e]) {
                    wiAdvTireOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.uconSalesElligpc.length; e++) {
                if (optionArrayData[i].value === this.uconSalesElligpc[e]) {
                    uconSalesOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.uconServiceElligpc.length; e++) {
                if (optionArrayData[i].value === this.uconServiceElligpc[e]) {
                    uconServiceOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.pcPartElligpc.length; e++) {
                if (optionArrayData[i].value === this.pcPartElligpc[e]) {
                    pcPartOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.pcMElligpc.length; e++) {
                if (optionArrayData[i].value === this.pcMElligpc[e]) {
                    pcMOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.elMElligpc.length; e++) {
                if (optionArrayData[i].value === this.elMElligpc[e]) {
                    elMOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.elPElligpc.length; e++) {
                if (optionArrayData[i].value === this.elPElligpc[e]) {
                    elPOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.uvmEnrElligpc.length; e++) {
                if (optionArrayData[i].value === this.uvmEnrElligpc[e]) {
                    uvmEnrOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.uvmPartElligpc.length; e++) {
                if (optionArrayData[i].value === this.uvmPartElligpc[e]) {
                    uvmPartOptions.push(optionArrayData[i]);
                }
            }
        } for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.warrantyAdmElligpc.length; e++) {
                if (optionArrayData[i].value === this.warrantyAdmElligpc[e]) {
                    warrantyAdmOptions.push(optionArrayData[i]);
                }
            }
        }

       

        this.enrollmentDataResponse[index].mserOptions = mserOptions;
        // console.log(index + "=" + " " + this.mserOptions);
        this.enrollmentDataResponse[index].mmOptions = this.mmOptions;
        this.enrollmentDataResponse[index].upFitsOptions = this.upFitsOptions;
        this.enrollmentDataResponse[index].tiresOptions = this.tiresOptions;
        this.enrollmentDataResponse[index].mvpOptions = this.mvpOptions;
        this.enrollmentDataResponse[index].wiAdvMVPOptions = this.wiAdvMVPOptions;
        this.enrollmentDataResponse[index].wiAdvTireOptions = this.wiAdvTireOptions;
        this.enrollmentDataResponse[index].uconSalesOptions = this.uconSalesOptions;
        this.enrollmentDataResponse[index].uconServiceOptions = this.uconServiceOptions;
        this.enrollmentDataResponse[index].pcPartOptions = this.pcPartOptions;
        this.enrollmentDataResponse[index].pcMOptions = this.pcMOptions;
        this.enrollmentDataResponse[index].elMOptions = this.elMOptions;
        this.enrollmentDataResponse[index].elPOptions = this.elPOptions;
        this.enrollmentDataResponse[index].uvmEnrOptions = this.uvmEnrOptions;
        this.enrollmentDataResponse[index].uvmPartOptions = this.uvmPartOptions;
        this.enrollmentDataResponse[index].warrantyAdmOptions = this.warrantyAdmOptions;


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
            overrideOptionArray.push({ label: this.positionCodesResponse[i].item2, value: (this.positionCodesResponse[i].item2) });
        }

        this.getMatch(optionArray, index);

        // this.getMatch(optionArray, this.mserElligiblepc);
        // this.getMatch(optionArray, this.mmElligiblepc );
        // this.getMatch(optionArray, this.upFitsElligpc);
        // this.getMatch(optionArray, this.tiresElligpc);
        // this.getMatch(optionArray, this.mvpElligpc);
        // this.getMatch(optionArray, this.wiAdvMVPElligpc);
        // this.getMatch(optionArray, this.wiAdvTirepc);
        // this.getMatch(optionArray, this.uconSalesElligpc);
        // this.getMatch(optionArray, this.uconServiceElligpc);
        // this.getMatch(optionArray, this.pcPartElligpc);
        // this.getMatch(optionArray, this.pcMElligpc);
        // this.getMatch(optionArray, this.elMElligpc);
        // this.getMatch(optionArray, this.elPElligpc);
        // this.getMatch(optionArray, this.uvmEnrElligpc);
        // this.getMatch(optionArray, this.uvmPartElligpc);
        // this.getMatch(optionArray, this.warrantyAdmElligpc);

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

    private selectedPCOverrides(data, ri) {
        // alert( ri)
    }

    private saveEnrollmentMaintenanceData(sid, editButton, cancelButton, saveButton, index) {
        editButton.style["display"] = "block";
        cancelButton.style["display"] = "none";
        saveButton.style["display"] = "none";
        this.enableEditable = false;
        console.log(this.enrollmentDataResponse[index]);
        this.enrollmentService.saveEnrollmentMaintenanceData(this.enrollmentDataResponse[index]).subscribe(
            (saveEnrollmentMaintenanceDataResponse) => {
                this.saveEnrollmentMaintenanceDataResponse = (saveEnrollmentMaintenanceDataResponse)
            },
            (error) => {

            }
        )
    }
} 
