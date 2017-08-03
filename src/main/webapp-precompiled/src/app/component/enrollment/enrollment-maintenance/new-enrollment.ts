import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/primeng';

import { state, trigger, style, animate, transition, } from '@angular/animations';
import { DataTable } from 'primeng/primeng';

import { EnrollmentInterface } from './enrollment.interface';
@Component({
    selector: 'app-enrollment',
    templateUrl: './new-enrollment.html',
    animations: [trigger('slideInOut', [
        state('true', style({ width: '0px', })),
        state('false', style({ width: '*', display: "block" })),
        transition('1 => 0', animate('500ms ease-in')),
        transition('0 => 1', animate('400ms ease-out'))
    ])]
    //   styleUrls: ['./enrollment-maintenance.component.css']
})
export class EnrollmentComponent implements OnInit {
    selectedCars;
    selectedCity;
    private displayAddNewUserDialog: boolean = false;
    private displayEnrollmentDialog: boolean;
    private enableEditable: boolean = false;
    private showEditButton: boolean = true;;
    private showCancelButton: boolean = false;
    private showSaveButton: boolean = false;
    private positionCodesResponse: any = [];
    private selectedRowSid: string = "";
    private dat: any = "";
    private saveEnrollmentMaintenanceDataResponse: any;
    // private mserElligiblepc: SelectItem[] = [{ label: "01", value: "01" }, { label: "13", value: "13" }, { label: "23", value: "23" }, { label: "2A", value: "2A" }, { label: "08", value: "08" }, { label: "20", value: "20" }];
    private mserElligiblepc: any = ["01", "13", "23", "2A", "08", "09", "ES", "ET"];
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
    private enrollmentDataReq: any = [{
        "dealerCode": "", "myPersonalDMSID": "", "name": "", "email": "", "positionCodes": [""], "overriddenpositionCodes": [],
        "mser": [""], "mas": [" "], "mm": [""], "mvp": [], "wiMvp": [], "wiTires": [], "pc": "", "el": "", "usedRecon": "",
        "usedReconP": [], "sid": "", "dmsid": "", "ucon": []
    }];
    cities: any = [{ label: 'New York', value: 'New York' }, { label: 'Rome', value: 'Rome' }];

    constructor(private enrollmentService: EnrollmentMaintenanceService) { }

    ngOnInit() {
        this.getSelectedDealerCode();
        this.getSelectedDealerName();
        this.getPositionCodes();
        this.getEnrollmentData();

    }
    private getSelectedDealerCode() {
        return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    }

    private getSelectedDealerName() {
        return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
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
    private getEnrollmentData() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.enrollmentService.getEnrollmentData(dealerCode).subscribe(
            (enrollmentDataResponse) => {
                this.enrollmentDataResponse = (enrollmentDataResponse)
                for (var i = 0; i < this.enrollmentDataResponse.length; i++) {
                    this.constructSelectItem(i);
                    // this.enrollmentDataResponse[i].preselectedMserOptions = this.preselectedSelectItem(this.enrollmentDataResponse[i].mser, i);
                    // console.log(this.preselectedSelectItem(this.enrollmentDataResponse[i].mser, i));
                    // console.log(this.enrollmentDataResponse[i].preselectedMserOptions);
                    this.enrollmentDataResponse[i].selectedMserOptions = [];
                }
            },
            (error) => {
            }
        )
    }

    private constructSelectItem(index): any {
        var dataArray: SelectItem[];
        var optionArray: SelectItem[];
        var overrideOptionArray: SelectItem[];
        var cleanOverrideOptionArray: SelectItem[];
        var pcMOptions: SelectItem[];
        var elMOptions: SelectItem[];
        var uvmEnrOptions: SelectItem[];
        var uvmPartOptions: SelectItem[];

        dataArray = [];
        optionArray = [];
        overrideOptionArray = [];
        cleanOverrideOptionArray = [];
        pcMOptions = [];
        elMOptions = [];
        uvmEnrOptions = [];
        uvmPartOptions = [];
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
            cleanOverrideOptionArray.push({ label: this.positionCodesResponse[i].item1, value: (this.positionCodesResponse[i].item1) });
            overrideOptionArray.push({ label: this.positionCodesResponse[i].item2, value: (this.positionCodesResponse[i].item1) });
        }
        for (var i = 0; i < this.pcMElligpc.length; i++) {
            pcMOptions.push({ label: this.pcMElligpc[i], value: this.pcMElligpc[i] });
        }
        for (var i = 0; i < this.elMElligpc.length; i++) {
            elMOptions.push({ label: this.elMElligpc[i], value: this.elMElligpc[i] });
        }
        for (var i = 0; i < this.uvmEnrElligpc.length; i++) {
            uvmEnrOptions.push({ label: this.uvmEnrElligpc[i], value: this.uvmEnrElligpc[i] });
        }
        for (var i = 0; i < this.uvmPartElligpc.length; i++) {
            uvmPartOptions.push({ label: this.uvmPartElligpc[i], value: this.uvmPartElligpc[i] });
        }

        this.getMatch(optionArray, index);


        this.enrollmentDataResponse[index].options = optionArray;
        this.enrollmentDataResponse[index].optionsOverrides = overrideOptionArray;
        this.enrollmentDataResponse[index].pcMOptions = pcMOptions;
        this.enrollmentDataResponse[index].elMOptions = elMOptions;
        this.enrollmentDataResponse[index].uvmEnrOptions = uvmEnrOptions;
        this.enrollmentDataResponse[index].uvmPartOptions = uvmPartOptions;

        // return this.mserData.push(dataArray);

    }
    private getMatch(optionArrayData, index) {
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
        // var pcMOptions: SelectItem[] = [];
        //var elMOptions: SelectItem[] = [];
        var elPOptions: SelectItem[] = [];
        // var uvmEnrOptions: SelectItem[] = [];
        // var uvmPartOptions: SelectItem[] = [];
        var warrantyAdmOptions: SelectItem[] = [];
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
        }
        // for (var i = 0; i < optionArrayData.length; i++) {
        //     for (var e = 0; e < this.pcMElligpc.length; e++) {
        //         if (optionArrayData[i].value === this.pcMElligpc[e]) {
        //             pcMOptions.push(optionArrayData[i]);
        //         }
        //     }
        // } 
        // for (var i = 0; i < optionArrayData.length; i++) {
        //     for (var e = 0; e < this.elMElligpc.length; e++) {
        //         if (optionArrayData[i].value === this.elMElligpc[e]) {
        //             elMOptions.push(optionArrayData[i]);
        //         }
        //     }
        // } 
        for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.elPElligpc.length; e++) {
                if (optionArrayData[i].value === this.elPElligpc[e]) {
                    elPOptions.push(optionArrayData[i]);
                }
            }
        }
        // for (var i = 0; i < optionArrayData.length; i++) {
        //     for (var e = 0; e < this.uvmEnrElligpc.length; e++) {
        //         if (optionArrayData[i].value === this.uvmEnrElligpc[e]) {
        //             uvmEnrOptions.push(optionArrayData[i]);
        //         }
        //     }
        // }
        // for (var i = 0; i < optionArrayData.length; i++) {
        //     for (var e = 0; e < this.uvmPartElligpc.length; e++) {
        //         if (optionArrayData[i].value === this.uvmPartElligpc[e]) {
        //             uvmPartOptions.push(optionArrayData[i]);
        //         }
        //     }
        // } 
        for (var i = 0; i < optionArrayData.length; i++) {
            for (var e = 0; e < this.warrantyAdmElligpc.length; e++) {
                if (optionArrayData[i].value === this.warrantyAdmElligpc[e]) {
                    warrantyAdmOptions.push(optionArrayData[i]);
                }
            }

        }


        this.enrollmentDataResponse[index].mserOptions = mserOptions;
        this.enrollmentDataResponse[index].mmOptions = mmOptions;
        this.enrollmentDataResponse[index].upFitsOptions = upFitsOptions;
        this.enrollmentDataResponse[index].tiresOptions = tiresOptions;
        this.enrollmentDataResponse[index].mvpOptions = mvpOptions;
        this.enrollmentDataResponse[index].wiAdvMVPOptions = wiAdvMVPOptions;
        this.enrollmentDataResponse[index].wiAdvTireOptions = wiAdvTireOptions;
        this.enrollmentDataResponse[index].uconSalesOptions = uconSalesOptions;
        this.enrollmentDataResponse[index].uconServiceOptions = uconServiceOptions;
        this.enrollmentDataResponse[index].pcPartOptions = pcPartOptions;
        //this.enrollmentDataResponse[index].pcMOptions = pcMOptions;
        //this.enrollmentDataResponse[index].elMOptions = elMOptions;
        this.enrollmentDataResponse[index].elPOptions = elPOptions;
        // this.enrollmentDataResponse[index].uvmEnrOptions = uvmEnrOptions;
        //this.enrollmentDataResponse[index].uvmPartOptions = uvmPartOptions;
        this.enrollmentDataResponse[index].warrantyAdmOptions = warrantyAdmOptions;

    }

    private namingPositionCode(data, index) {
        var assignedData: SelectItem[] = [];
        for (var i = 0; i < data.length; i++) {
            for (var e = 0; e < this.positionCodesResponse.length; e++) {
                if (data[i].value === this.positionCodesResponse[e].item1) {
                    assignedData.push({ label: this.positionCodesResponse[e].item2, value: this.positionCodesResponse[e].item2 });
                }
            }
        }
        // console.log(assignedData);
        return assignedData;
    }

    private preselectedSelectItem(data, index): any {
        var dataArray: SelectItem[];
        dataArray = [];
        for (var i = 0; i < data.length; i++) {
            dataArray.push({ label: data[i], value: data[i] });
        }

        return this.namingPositionCode(dataArray, index);
    }
    private removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }


    private selectedPCOverrides(data: any, index) {
        var mserOptions = this.enrollmentDataResponse[index].mserOptions;
        var mmOptions = this.enrollmentDataResponse[index].mmOptions;
        var upFitsOptions = this.enrollmentDataResponse[index].upFitsOptions;
        var tiresOptions = this.enrollmentDataResponse[index].tiresOptions;
        var mvpOptions = this.enrollmentDataResponse[index].mvpOptions;
        var wiAdvMVPOptions = this.enrollmentDataResponse[index].wiAdvMVPOptions;
        var wiAdvTireOptions = this.enrollmentDataResponse[index].wiAdvTireOptions;
        var uconSalesOptions = this.enrollmentDataResponse[index].uconSalesOptions;
        var uconServiceOptions = this.enrollmentDataResponse[index].uconServiceOptions;
        var pcPartOptions = this.enrollmentDataResponse[index].pcPartOptions;
        // var pcMOptions = this.enrollmentDataResponse[index].pcMOptions;
        //var elMOptions = this.enrollmentDataResponse[index].elMOptions;
        var elPOptions = this.enrollmentDataResponse[index].mvpOptions;
        // var uvmEnrOptions = this.enrollmentDataResponse[index].uvmEnrOptions;
        // var uvmPartOptions = this.enrollmentDataResponse[index].uvmPartOptions;
        var warrantyAdmOptions = this.enrollmentDataResponse[index].warrantyAdmOptions;
        if (data.length == 0) {
            this.enrollmentDataResponse[index].mserOptions = this.removeDuplicates(mserOptions, "label");
            this.enrollmentDataResponse[index].mmOptions = this.removeDuplicates(mmOptions, "label");
            this.enrollmentDataResponse[index].upFitsOptions = this.removeDuplicates(upFitsOptions, "label");
            this.enrollmentDataResponse[index].tiresOptions = this.removeDuplicates(tiresOptions, "label");
            this.enrollmentDataResponse[index].mvpOptions = this.removeDuplicates(mvpOptions, "label");
            this.enrollmentDataResponse[index].wiAdvMVPOptions = this.removeDuplicates(wiAdvMVPOptions, "label");
            this.enrollmentDataResponse[index].wiAdvTireOptions = this.removeDuplicates(wiAdvTireOptions, "label");
            this.enrollmentDataResponse[index].uconSalesOptions = this.removeDuplicates(uconSalesOptions, "label");
            this.enrollmentDataResponse[index].uconServiceOptions = this.removeDuplicates(uconServiceOptions, "label");
            this.enrollmentDataResponse[index].pcPartOptions = this.removeDuplicates(pcPartOptions, "label");
            // this.enrollmentDataResponse[index].pcMOptions = this.removeDuplicates(pcMOptions, "label");
            //this.enrollmentDataResponse[index].elMOptions = this.removeDuplicates(elMOptions, "label");
            this.enrollmentDataResponse[index].elPOptions = this.removeDuplicates(elPOptions, "label");
            // this.enrollmentDataResponse[index].uvmEnrOptions = this.removeDuplicates(uvmEnrOptions, "label");
            // this.enrollmentDataResponse[index].uvmPartOptions = this.removeDuplicates(uvmPartOptions, "label");
            this.enrollmentDataResponse[index].warrantyAdmOptions = this.removeDuplicates(warrantyAdmOptions, "label");
        } else if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                mserOptions.push({ label: data[i], value: data[i] });
                mmOptions.push({ label: data[i], value: data[i] });
                upFitsOptions.push({ label: data[i], value: data[i] });
                tiresOptions.push({ label: data[i], value: data[i] });
                mvpOptions.push({ label: data[i], value: data[i] });
                wiAdvMVPOptions.push({ label: data[i], value: data[i] });
                wiAdvTireOptions.push({ label: data[i], value: data[i] });
                uconSalesOptions.push({ label: data[i], value: data[i] });
                uconServiceOptions.push({ label: data[i], value: data[i] });
                pcPartOptions.push({ label: data[i], value: data[i] });
                //  pcMOptions.push({ label: data[i], value: data[i] });
                //elMOptions.push({ label: data[i], value: data[i] });
                elPOptions.push({ label: data[i], value: data[i] });
                // uvmEnrOptions.push({ label: data[i], value: data[i] });
                //   uvmPartOptions.push({ label: data[i], value: data[i] });
                warrantyAdmOptions.push({ label: data[i], value: data[i] });

            }
            this.enrollmentDataResponse[index].mserOptions = this.removeDuplicates(mserOptions, "label");
            this.enrollmentDataResponse[index].mmOptions = this.removeDuplicates(mmOptions, "label");
            this.enrollmentDataResponse[index].upFitsOptions = this.removeDuplicates(upFitsOptions, "label");
            this.enrollmentDataResponse[index].tiresOptions = this.removeDuplicates(tiresOptions, "label");
            this.enrollmentDataResponse[index].mvpOptions = this.removeDuplicates(mvpOptions, "label");
            this.enrollmentDataResponse[index].wiAdvMVPOptions = this.removeDuplicates(wiAdvMVPOptions, "label");
            this.enrollmentDataResponse[index].wiAdvTireOptions = this.removeDuplicates(wiAdvTireOptions, "label");
            this.enrollmentDataResponse[index].uconSalesOptions = this.removeDuplicates(uconSalesOptions, "label");
            this.enrollmentDataResponse[index].uconServiceOptions = this.removeDuplicates(uconServiceOptions, "label");
            this.enrollmentDataResponse[index].pcPartOptions = this.removeDuplicates(pcPartOptions, "label");
            // this.enrollmentDataResponse[index].pcMOptions = this.removeDuplicates(pcMOptions, "label");
            // this.enrollmentDataResponse[index].elMOptions = this.removeDuplicates(elMOptions, "label");
            this.enrollmentDataResponse[index].elPOptions = this.removeDuplicates(elPOptions, "label");
            // this.enrollmentDataResponse[index].uvmEnrOptions = this.removeDuplicates(uvmEnrOptions, "label");
            //  this.enrollmentDataResponse[index].uvmPartOptions = this.removeDuplicates(uvmPartOptions, "label");
            this.enrollmentDataResponse[index].warrantyAdmOptions = this.removeDuplicates(warrantyAdmOptions, "label");
        }


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
        this.getEnrollmentData();
    }
    private returnItem1(data, index): any {
        var item1 = [];
        for (var i = 0; i < data.length; i++) {
            for (var e = 0; e < this.enrollmentDataResponse.length; e++) {
                if (data[i].value === this.enrollmentDataResponse[e].value) {
                    item1.push(this.enrollmentDataResponse[e].label);
                }
            }
        }
        return item1;
    }
    private saveEnrollmentMaintenanceData(data, editButton, cancelButton, saveButton, index) {
        editButton.style["display"] = "block";
        cancelButton.style["display"] = "none";
        saveButton.style["display"] = "none";
        this.enableEditable = false;
        this.returnItem1(data.mserOptions, index);
        this.enrollmentService.saveEnrollmentMaintenanceData(data).subscribe(
            (saveEnrollmentMaintenanceDataResponse) => {
                this.saveEnrollmentMaintenanceDataResponse = (saveEnrollmentMaintenanceDataResponse)
                this.getEnrollmentData();
            },
            (error) => {

            }
        )
    }

    private addNewUserTeam(addTeamData: any) {

        this.displayAddNewUserDialog = true;
    }
    private cancelNewUserData(data) {

    }

    private saveNewUserData(data) {

    }

} 
