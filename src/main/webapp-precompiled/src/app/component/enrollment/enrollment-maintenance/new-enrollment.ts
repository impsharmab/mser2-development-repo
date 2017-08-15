import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef, OnDestroy } from '@angular/core';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/primeng';

import { state, trigger, style, animate, transition, } from '@angular/animations';
import { DataTable } from 'primeng/primeng';

import { EnrollmentInterface } from './enrollment.interface';
@Component({
    selector: 'app-enrollment',
    templateUrl: './freeze.html'
    //   styleUrls: ['./enrollment-maintenance.component.css']
})
export class EnrollmentComponent implements OnInit {
    isCollapsed = true;
    @ViewChild("datatable") dataTable: DataTable;
    selectedCars;
    selectedCity;

    private expressLaneDealerData: any;
    private isExpresslaneDealer: boolean = false;
    private selectedpc: string = "";
    private notenrolledDataResponse: any = [];
    private notenrolledsidOptions: SelectItem[] = [];
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
    private uconSalesElligpc: any = ["01", "02", "03", "04", "05", "06 ", "07", "11", "12", "15", "22", "25", "26", "30", "31", "34", "36", "37", "38", "39", "41", "42", "46", "47", "49", "50", "52", "74", "4T", "IM"];
    private uconServiceElligpc: any = ["08", "09", "10", "13", "14", "16", "17", "18", "19", "20", "23", "24", "27", "28", "29", "32", "33", "35", "40", "48", "56", "79", "85", "1F", "2S", "3S", "4S", "7L", "7M", "7N", "7P", "7Q", "ES", "ET"];
    private pcPartElligpc = ["8", "14", "40", "19"];
    private pcMElligpc = ["01", "02", "08", "09", "32", "33", "35", "40", "37"];
    private elMElligpc: any = ["09", "17", "33", "35"];
    private elPElligpc: any = ["01", "13", "23", "2A", "ES", "ET"];
    private uvmEnrElligpc: any = ["08", "09", "07"];
    private uvmPartElligpc: any = ["07", "34"];
    private warrantyAdmElligpc: any = ["29"];

    private mserElligiblepcItem2: any = [];
    private mmElligiblepcItem2: any = [];
    private upFitsElligpcItem2: any = [];
    private tiresElligpcItem2: any = [];
    private mvpElligpcItem2: any = [];
    private wiAdvMVPElligpcItem2: any = [];
    private wiAdvTirElligepcItem2: any = [];
    private uconSalesElligpcItem2: any = [];
    private uconServiceElligpcItem2: any = [];
    private pcPartElligpcItem2 = [];
    private pcMElligpcItem2 = [];
    private elMElligpcItem2: any = [];
    private elPElligpcItem2: any = [];
    private uvmEnrElligpcItem2: any = [];
    private uvmPartElligpcItem2: any = [];
    private warrantyAdmElligpcItem2: any = [];

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
    private option = [{ label: "S26126I", value: "S26126I" }, { label: "S26126T", value: "S26126T" }, { label: "S26126A", value: "S26126A" }]
    private cars = [{ "vin": "45645", "year": "2014", "brand": "Toyota", "color": "white" }, { "vin": "45645", "year": "2014", "brand": "Toyota", "color": "white" }]


    private moparPartsData: any = [{ "pc1": "Service Advisor (13)" }, { "pc2": "Service Advisor (13)" }];
    private enrollmentData: EnrollmentInterface = {
        "sid": "", "name": "", "dmsId": "", "myPersonnelDmsId": "", "myPersonnelPositions": [],
        "moparPartsData": [], "magnetiMarelliData": [], "mvpData": [], "wiAdvisorMVPData": [],
        "wiAdvisorTiresData": [], "posCodeOverrides": [], "pcManager": "", "elManager": "",
        "urManager": "", "urParticipant": ""
    };

    private enrollmentDataResponse: any = [];
    private enrollmentDataReq: any = [{
        "dealerCode": "", "myPersonalDMSID": "", "name": "", "email": "", "positionCodes": [""], "overriddenpositionCodes": [],
        "mser": [""], "mas": [" "], "mm": [""], "mvp": [], "wiMvp": [], "wiTires": [], "pc": "", "el": "", "usedRecon": "",
        "usedReconP": [], "sid": "", "dmsid": "", "ucon": []
    }];
    cities: any = [{ label: 'New York', value: 'New York' }, { label: 'Rome', value: 'Rome' }];

    constructor(private enrollmentService: EnrollmentMaintenanceService, private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.getSelectedDealerCode();
        this.getSelectedDealerName();
        this.getPositionCodes();
        this.getEnrollmentData();
        this.getExpresslaneDealer();


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
                this.assignElligiblePCItem2();
            },
            (error) => {
            }
        )
    }
    private assignElligiblePCItem2() {
        var mserElligiblepcItem2: any = [];
        var mmElligiblepcItem2: any = [];
        var upFitsElligpcItem2: any = [];
        var tiresElligpcItem2: any = [];
        var mvpElligpcItem2: any = [];
        var wiAdvMVPElligpcItem2: any = [];
        var wiAdvTirElligepcItem2: any = [];
        var uconSalesElligpcItem2: any = [];
        var uconServiceElligpcItem2: any = [];
        var pcPartElligpcItem2 = [];
        var pcMElligpcItem2 = [];
        var elMElligpcItem2: any = [];
        var elPElligpcItem2: any = [];
        var uvmEnrElligpcItem2: any = [];
        var uvmPartElligpcItem2: any = [];
        var warrantyAdmElligpcItem2: any = [];

        for (var i = 0; i < this.positionCodesResponse.length; i++) {
            for (var j = 0; j < this.mserElligiblepc.length; j++) {
                if (this.mserElligiblepc[j] === this.positionCodesResponse[i].item1) {
                    mserElligiblepcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.mmElligiblepc.length; j++) {
                if (this.mmElligiblepc[j] === this.positionCodesResponse[i].item1) {
                    mmElligiblepcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.upFitsElligpc.length; j++) {
                if (this.upFitsElligpc[j] === this.positionCodesResponse[i].item1) {
                    upFitsElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.tiresElligpc.length; j++) {
                if (this.tiresElligpc[j] === this.positionCodesResponse[i].item1) {
                    tiresElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.mvpElligpc.length; j++) {
                if (this.mvpElligpc[j] === this.positionCodesResponse[i].item1) {
                    mvpElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.wiAdvMVPElligpc.length; j++) {
                if (this.wiAdvMVPElligpc[j] === this.positionCodesResponse[i].item1) {
                    wiAdvMVPElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.wiAdvTirElligepc.length; j++) {
                if (this.wiAdvTirElligepc[j] === this.positionCodesResponse[i].item1) {
                    wiAdvTirElligepcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uconSalesElligpc.length; j++) {
                if (this.uconSalesElligpc[j] === this.positionCodesResponse[i].item1) {
                    uconSalesElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uconServiceElligpc.length; j++) {
                if (this.uconServiceElligpc[j] === this.positionCodesResponse[i].item1) {
                    uconServiceElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.pcPartElligpc.length; j++) {
                if (this.pcPartElligpc[j] === this.positionCodesResponse[i].item1) {
                    pcPartElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.pcMElligpc.length; j++) {
                if (this.pcMElligpc[j] === this.positionCodesResponse[i].item1) {
                    pcMElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.elMElligpc.length; j++) {
                if (this.elMElligpc[j] === this.positionCodesResponse[i].item1) {
                    elMElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.elPElligpc.length; j++) {
                if (this.elPElligpc[j] === this.positionCodesResponse[i].item1) {
                    elPElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uvmEnrElligpc.length; j++) {
                if (this.uvmEnrElligpc[j] === this.positionCodesResponse[i].item1) {
                    uvmEnrElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uvmPartElligpc.length; j++) {
                if (this.uvmPartElligpc[j] === this.positionCodesResponse[i].item1) {
                    uvmPartElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.warrantyAdmElligpc.length; j++) {
                if (this.warrantyAdmElligpc[j] === this.positionCodesResponse[i].item1) {
                    warrantyAdmElligpcItem2.push(this.positionCodesResponse[i].item2)
                }
            }


        }
        this.mserElligiblepcItem2 = mserElligiblepcItem2;
        this.mmElligiblepcItem2 = mmElligiblepcItem2;
        this.upFitsElligpcItem2 = upFitsElligpcItem2;
        this.tiresElligpcItem2 = tiresElligpcItem2;
        this.mvpElligpcItem2 = mvpElligpcItem2;
        this.wiAdvMVPElligpcItem2 = wiAdvMVPElligpcItem2;
        this.wiAdvTirElligepcItem2 = wiAdvTirElligepcItem2;
        this.uconSalesElligpcItem2 = uconSalesElligpcItem2;
        this.uconServiceElligpcItem2 = uconServiceElligpcItem2;
        this.pcPartElligpcItem2 = pcPartElligpcItem2;
        this.pcMElligpcItem2 = pcMElligpcItem2;
        this.elMElligpcItem2 = elMElligpcItem2;
        this.elPElligpcItem2 = elPElligpcItem2;
        this.uvmEnrElligpcItem2 = uvmEnrElligpcItem2;
        this.uvmPartElligpcItem2 = uvmPartElligpcItem2;
        this.warrantyAdmElligpcItem2 = warrantyAdmElligpcItem2;

        // console.log(this.mserElligiblepcItem2);
        // console.log(this.mmElligiblepcItem2);
        // console.log(this.uvmPartElligpcItem2);


    }
    private enrollmentDataCount: string = "";
    private getEnrollmentData() {
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.enrollmentService.getEnrollmentData(dealerCode).subscribe(
            (enrollmentDataResponse) => {
                this.enrollmentDataResponse = (enrollmentDataResponse)
                if (this.enrollmentDataResponse !== undefined) {
                    this.enrollmentDataCount = "Total Number of Employee:" + this.enrollmentDataResponse.length;
                }
                // this.somthing();
                for (var a11 = 0; a11 < this.enrollmentDataResponse.length; a11++) {
                    this.readItem1ReturnItem2(this.enrollmentDataResponse[a11], a11);
                }
                for (var a111 = 0; a111 < this.enrollmentDataResponse.length; a111++) {
                    this.constructSelectItem(this.enrollmentDataResponse[a111], a111);
                }
            },
            (error) => {
            }
        )
    }

    private readItem1ReturnItem2(data, index) {
        var positionCodes: any = [];
        var overriddenpositionCodes: any = [];
        var mser: any = [];
        var mas: any = [];
        var mm: any = [];
        var mvp: any = [];
        var wiMvp: any = [];
        var wiTires: any = [];
        var tires: any = [];
        var usedReconP: any = [];
        var ucon: any = [];
        var pc: any = "";
        var el: any = "";
        var usedRecon = "";


        for (var a2 = 0; a2 < this.positionCodesResponse.length; a2++) {
            for (var a3 = 0; a3 < data.positionCodes.length; a3++) {
                if (data.positionCodes[a3] === this.positionCodesResponse[a2].item1) {
                    positionCodes.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.overriddenpositionCodes.length; a3++) {
                if (data.overriddenpositionCodes[a3] === this.positionCodesResponse[a2].item1) {
                    overriddenpositionCodes.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mser.length; a3++) {
                if (data.mser[a3] === this.positionCodesResponse[a2].item1) {
                    mser.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mas.length; a3++) {
                if (data.mas[a3] === this.positionCodesResponse[a2].item1) {
                    mas.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mm.length; a3++) {
                if (data.mm[a3] === this.positionCodesResponse[a2].item1) {
                    mm.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mvp.length; a3++) {
                if (data.mvp[a3] === this.positionCodesResponse[a2].item1) {
                    mvp.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.wiMvp.length; a3++) {
                if (data.wiMvp[a3] === this.positionCodesResponse[a2].item1) {
                    wiMvp.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.wiTires.length; a3++) {
                if (data.wiTires[a3] === this.positionCodesResponse[a2].item1) {
                    wiTires.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.tires.length; a3++) {
                if (data.tires[a3] === this.positionCodesResponse[a2].item1) {
                    tires.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.usedReconP.length; a3++) {
                if (data.usedReconP[a3] === this.positionCodesResponse[a2].item1) {
                    usedReconP.push(this.positionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.ucon.length; a3++) {
                if (data.ucon[a3] === this.positionCodesResponse[a2].item1) {
                    ucon.push(this.positionCodesResponse[a2].item2)
                }
            }

            if (data.pc == this.positionCodesResponse[a2].item1) {
                pc = this.positionCodesResponse[a2].item2;
            }
            if (data.el == this.positionCodesResponse[a2].item1) {
                el = this.positionCodesResponse[a2].item2;
            }
            if (data.usedRecon == this.positionCodesResponse[a2].item1) {
                usedRecon = this.positionCodesResponse[a2].item2;
            }
        }

        this.enrollmentDataResponse[index].positionCodes = positionCodes;
        this.enrollmentDataResponse[index].overriddenpositionCodes = overriddenpositionCodes;
        this.enrollmentDataResponse[index].mser = mser;
        this.enrollmentDataResponse[index].mas = mas;
        this.enrollmentDataResponse[index].mm = mm;
        this.enrollmentDataResponse[index].mvp = mvp;
        this.enrollmentDataResponse[index].wiMvp = wiMvp;
        this.enrollmentDataResponse[index].wiTires = wiTires;
        this.enrollmentDataResponse[index].tires = tires;
        this.enrollmentDataResponse[index].usedReconP = usedReconP;
        this.enrollmentDataResponse[index].ucon = ucon;
        this.enrollmentDataResponse[index].pc = pc;
        this.enrollmentDataResponse[index].el = el;
        this.enrollmentDataResponse[index].usedRecon = usedRecon;
    }
    private constructSelectItem(data, index) {
        var overrideOptionArray: SelectItem[] = [];
        var mserOptions: SelectItem[] = [];
        var masOptions: SelectItem[] = [];
        var mmOptions: SelectItem[] = [];
        var mvpOptions: SelectItem[] = [];
        var wiAdvMVPOptions: SelectItem[] = [];
        var wiAdvTireOptions: SelectItem[] = [];
        var uconSalesOptions: SelectItem[] = [];
        var uconServiceOptions: SelectItem[] = [];
        var warrantyAdmOptions: SelectItem[] = [];
        var pcOptions: SelectItem[] = [];
        var elOptions: SelectItem[] = [];
        var usedReconManagerOptions: SelectItem[] = [];
        var usedReconParticipantOptions: SelectItem[] = [];

        var mserData = [];
        var masData = [];
        var mmData = [];
        var mvpData = [];
        var wiAdvMVPData = [];
        var wiAdvTireData = [];
        var uconSalesData = [];
        var uconServiceData = [];
        var warrantyAdmData = [];
        var pcData = [];
        var elData = [];
        var usedReconManagerData = [];
        var usedReconParticipantData = [];

        for (var i = 0; i < this.positionCodesResponse.length; i++) {
            overrideOptionArray.push({ label: this.positionCodesResponse[i].item2, value: (this.positionCodesResponse[i].item2) });
        }

        for (var i = 0; i < this.mserElligiblepcItem2.length; i++) {
            // for (var j = 0; j < this.enrollmentDataResponse[index].mser.length; j++) {
            //     if (this.mserElligiblepcItem2[i] === this.enrollmentDataResponse[index].mser[j]) {
            //         mserData.push(this.mserElligiblepcItem2[i]);
            //     }
            // }

            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.mserElligiblepcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    mserData.push(this.mserElligiblepcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.mserElligiblepcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    mserData.push(this.mserElligiblepcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.upFitsElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.upFitsElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    masData.push(this.upFitsElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.upFitsElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    masData.push(this.upFitsElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.mmElligiblepcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.mmElligiblepcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    mmData.push(this.mmElligiblepcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.mmElligiblepcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    mmData.push(this.mmElligiblepcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.mvpElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.mvpElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    mvpData.push(this.mvpElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.mvpElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    mvpData.push(this.mvpElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.wiAdvMVPElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.wiAdvMVPElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    wiAdvMVPData.push(this.wiAdvMVPElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.wiAdvMVPElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    wiAdvMVPData.push(this.wiAdvMVPElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.wiAdvTirElligepcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.wiAdvTirElligepcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    wiAdvTireData.push(this.wiAdvTirElligepcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.wiAdvTirElligepcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    wiAdvTireData.push(this.wiAdvTirElligepcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.uconSalesElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.uconSalesElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    uconSalesData.push(this.uconSalesElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.uconSalesElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    uconSalesData.push(this.uconSalesElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.uconServiceElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.uconServiceElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    uconServiceData.push(this.uconServiceElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.uconServiceElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    uconServiceData.push(this.uconServiceElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.warrantyAdmElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.warrantyAdmElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    warrantyAdmData.push(this.warrantyAdmElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.warrantyAdmElligpcItem2.length; l++) {
                if (this.warrantyAdmElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    warrantyAdmData.push(this.warrantyAdmElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.uvmPartElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.uvmPartElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    usedReconParticipantData.push(this.uvmPartElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.uvmPartElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    usedReconParticipantData.push(this.uvmPartElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.elMElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.elMElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    elData.push(this.elMElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.elMElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    elData.push(this.elMElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.pcMElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.pcMElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    pcData.push(this.pcMElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.pcMElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    pcData.push(this.pcMElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.uvmEnrElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.uvmEnrElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    usedReconManagerData.push(this.uvmEnrElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.uvmEnrElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    usedReconManagerData.push(this.uvmEnrElligpcItem2[i]);
                }
            }
        }




        // for (var j = 0; j < this.enrollmentDataResponse[index].mas.length; j++) {
        //     masOptions.push({ label: this.enrollmentDataResponse[index].mas[j], value: this.enrollmentDataResponse[index].mas[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].mm.length; j++) {
        //     mmOptions.push({ label: this.enrollmentDataResponse[index].mm[j], value: this.enrollmentDataResponse[index].mm[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].mvp.length; j++) {
        //     mvpOptions.push({ label: this.enrollmentDataResponse[index].mvp[j], value: this.enrollmentDataResponse[index].mvp[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].wiMvp.length; j++) {
        //     wiAdvMVPOptions.push({ label: this.enrollmentDataResponse[index].wiMvp[j], value: this.enrollmentDataResponse[index].wiMvp[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].wiTires.length; j++) {
        //     wiAdvTireOptions.push({ label: this.enrollmentDataResponse[index].wiTires[j], value: this.enrollmentDataResponse[index].wiTires[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].ucon.length; j++) {
        //     uconSalesOptions.push({ label: this.enrollmentDataResponse[index].ucon[j], value: this.enrollmentDataResponse[index].ucon[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].ucon.length; j++) {
        //     uconServiceOptions.push({ label: this.enrollmentDataResponse[index].ucon[j], value: this.enrollmentDataResponse[index].ucon[j] });
        // }
        // for (var j = 0; j < this.enrollmentDataResponse[index].usedReconP.length; j++) {
        //     usedReconParticipantOptions.push({ label: this.enrollmentDataResponse[index].usedReconP[j], value: this.enrollmentDataResponse[index].usedReconP[j] });
        // }

        // pcOptions.push({ label: this.enrollmentDataResponse[index].pc, value: this.enrollmentDataResponse[index].pc });
        // elOptions.push({ label: this.enrollmentDataResponse[index].el, value: this.enrollmentDataResponse[index].el });
        // usedReconManagerOptions.push({ label: this.enrollmentDataResponse[index].usedRecon, value: this.enrollmentDataResponse[index].usedRecon });

        for (var m = 0; m < mserData.length; m++) {
            mserOptions.push({ label: mserData[m], value: mserData[m] });
        }
        for (var m = 0; m < masData.length; m++) {
            masOptions.push({ label: masData[m], value: masData[m] });
        }
        for (var m = 0; m < mmData.length; m++) {
            mmOptions.push({ label: mmData[m], value: mmData[m] });
        }
        for (var m = 0; m < mvpData.length; m++) {
            mvpOptions.push({ label: mvpData[m], value: mvpData[m] });
        }
        for (var m = 0; m < wiAdvMVPData.length; m++) {
            wiAdvMVPOptions.push({ label: wiAdvMVPData[m], value: wiAdvMVPData[m] });
        }
        for (var m = 0; m < wiAdvTireData.length; m++) {
            wiAdvTireOptions.push({ label: wiAdvTireData[m], value: wiAdvTireData[m] });
        }
        for (var m = 0; m < uconSalesData.length; m++) {
            uconSalesOptions.push({ label: uconSalesData[m], value: uconSalesData[m] });
        }
        for (var m = 0; m < uconServiceData.length; m++) {
            uconServiceOptions.push({ label: uconServiceData[m], value: uconServiceData[m] });
        }
        for (var m = 0; m < warrantyAdmData.length; m++) {
            warrantyAdmOptions.push({ label: warrantyAdmData[m], value: warrantyAdmData[m] });
        }
        for (var m = 0; m < pcData.length; m++) {
            pcOptions.push({ label: pcData[m], value: pcData[m] });
        }
        for (var m = 0; m < elData.length; m++) {
            elOptions.push({ label: elData[m], value: elData[m] });
        }
        for (var m = 0; m < usedReconManagerData.length; m++) {
            usedReconManagerOptions.push({ label: usedReconManagerData[m], value: usedReconManagerData[m] });
        }
        for (var m = 0; m < usedReconParticipantData.length; m++) {
            usedReconParticipantOptions.push({ label: usedReconParticipantData[m], value: usedReconParticipantData[m] });
        }

        this.enrollmentDataResponse[index].optionsOverrides = overrideOptionArray;
        this.enrollmentDataResponse[index].mserOptions = mserOptions;
        this.enrollmentDataResponse[index].masOptions = masOptions;
        this.enrollmentDataResponse[index].mmOptions = mmOptions;
        this.enrollmentDataResponse[index].mvpOptions = mvpOptions;
        this.enrollmentDataResponse[index].wiAdvMVPOptions = wiAdvMVPOptions;
        this.enrollmentDataResponse[index].wiAdvTireOptions = wiAdvTireOptions;
        this.enrollmentDataResponse[index].uconSalesOptions = uconSalesOptions;
        this.enrollmentDataResponse[index].uconServiceOptions = uconServiceOptions;
        this.enrollmentDataResponse[index].pcOptions = pcOptions;
        this.enrollmentDataResponse[index].elOptions = elOptions;
        this.enrollmentDataResponse[index].usedReconParticipantOptions = usedReconParticipantOptions;
        this.enrollmentDataResponse[index].warrantyAdmOptions = warrantyAdmOptions;
        this.enrollmentDataResponse[index].usedReconManagerOptions = usedReconManagerOptions;

    }
    private removeDuplicates(duplicateArray) {
        var cleanArray: SelectItem[] = [];
        for (var i = 0; i < duplicateArray.length; i++) {
            var push = true;
            for (var j = 0; j < cleanArray.length; j++) {
                if (cleanArray[j].value === duplicateArray[i].value) {
                    push = false;
                }
            }
            if (push == true) {
                cleanArray.push(duplicateArray[i]);
            }
        }
        return cleanArray;
    }
    private selectedPCOverrides(data, index) {
        var mserSelectedData = [];
        var masSelectedData = [];
        var mmSelectedData = [];
        var mvpSelectedData = [];
        var wiAdvMVPSelectedData = [];
        var wiAdvTireSelectedData = [];
        var uconSalesSelectedData = [];
        var uconServiceSelectedData = [];
        var warrantyAdmSelectedData = [];
        var pcSelectedData = [];
        var elSelectedData = [];
        var usedReconManagerSelectedData = [];
        var usedReconParticipantSelectedData = [];

        var mserOptions: SelectItem[] = [];
        var masOptions: SelectItem[] = [];
        var mmOptions: SelectItem[] = [];
        var mvpOptions: SelectItem[] = [];
        var wiAdvMVPOptions: SelectItem[] = [];
        var wiAdvTireOptions: SelectItem[] = [];
        var uconSalesOptions: SelectItem[] = [];
        var uconServiceOptions: SelectItem[] = [];
        var warrantyAdmOptions: SelectItem[] = [];
        var pcOptions: SelectItem[] = [];
        var elOptions: SelectItem[] = [];
        var usedReconManagerOptions: SelectItem[] = [];
        var usedReconParticipantOptions: SelectItem[] = [];

        for (var i = 0; i < this.mserElligiblepcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.mserElligiblepcItem2[i] === data[j]) {
                    mserSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.upFitsElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.upFitsElligpcItem2[i] === data[j]) {
                    masSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.mmElligiblepcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.mmElligiblepcItem2[i] === data[j]) {
                    mmSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.mvpElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.mvpElligpcItem2[i] === data[j]) {
                    mvpSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.wiAdvMVPElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.wiAdvMVPElligpcItem2[i] === data[j]) {
                    wiAdvMVPSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.wiAdvTirElligepcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.wiAdvTirElligepcItem2[i] === data[j]) {
                    wiAdvTireSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.uconSalesElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.uconSalesElligpcItem2[i] === data[j]) {
                    uconSalesSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.uconServiceElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.uconServiceElligpcItem2[i] === data[j]) {
                    uconServiceSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.warrantyAdmElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.warrantyAdmElligpcItem2[i] === data[j]) {
                    warrantyAdmSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.pcMElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.pcMElligpcItem2[i] === data[j]) {
                    pcSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.elMElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.elMElligpcItem2[i] === data[j]) {
                    elSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.uvmEnrElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.uvmEnrElligpcItem2[i] === data[j]) {
                    usedReconManagerSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.uvmPartElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.uvmPartElligpcItem2[i] === data[j]) {
                    usedReconManagerSelectedData.push(data[j]);
                }
            }
        }


        for (var j = 0; j < mserSelectedData.length; j++) {
            this.enrollmentDataResponse[index].mserOptions.push({ label: mserSelectedData[j], value: mserSelectedData[j] });
        }
        for (var j = 0; j < masSelectedData.length; j++) {
            this.enrollmentDataResponse[index].masOptions.push({ label: masSelectedData[j], value: masSelectedData[j] });
        }
        for (var j = 0; j < mvpSelectedData.length; j++) {
            this.enrollmentDataResponse[index].mvpOptions.push({ label: mvpSelectedData[j], value: mvpSelectedData[j] });
        }
        for (var j = 0; j < mmSelectedData.length; j++) {
            this.enrollmentDataResponse[index].mmOptions.push({ label: mmSelectedData[j], value: mmSelectedData[j] });
        }
        for (var j = 0; j < wiAdvMVPSelectedData.length; j++) {
            this.enrollmentDataResponse[index].wiAdvMVPOptions.push({ label: wiAdvMVPSelectedData[j], value: wiAdvMVPSelectedData[j] });
        }
        for (var j = 0; j < wiAdvTireSelectedData.length; j++) {
            this.enrollmentDataResponse[index].wiAdvTireOptions.push({ label: wiAdvTireSelectedData[j], value: wiAdvTireSelectedData[j] });
        }
        for (var j = 0; j < uconSalesSelectedData.length; j++) {
            this.enrollmentDataResponse[index].uconSalesOptions.push({ label: uconSalesSelectedData[j], value: uconSalesSelectedData[j] });
        }
        for (var j = 0; j < uconServiceSelectedData.length; j++) {
            this.enrollmentDataResponse[index].uconServiceOptions.push({ label: uconServiceSelectedData[j], value: uconServiceSelectedData[j] });
        }
        for (var j = 0; j < warrantyAdmSelectedData.length; j++) {
            this.enrollmentDataResponse[index].warrantyAdmOptions.push({ label: warrantyAdmSelectedData[j], value: warrantyAdmSelectedData[j] });
        }
        for (var j = 0; j < pcSelectedData.length; j++) {
            this.enrollmentDataResponse[index].pcOptions.push({ label: pcSelectedData[j], value: pcSelectedData[j] });
        }
        for (var j = 0; j < elSelectedData.length; j++) {
            this.enrollmentDataResponse[index].elOptions.push({ label: elSelectedData[j], value: elSelectedData[j] });
        }
        for (var j = 0; j < usedReconManagerSelectedData.length; j++) {
            this.enrollmentDataResponse[index].usedReconManagerOptions.push({ label: usedReconManagerSelectedData[j], value: usedReconManagerSelectedData[j] });
        }
        for (var j = 0; j < usedReconParticipantSelectedData.length; j++) {
            this.enrollmentDataResponse[index].usedReconParticipantOptions.push({ label: usedReconParticipantSelectedData[j], value: usedReconParticipantSelectedData[j] });
        }

        var mserOptionss = this.enrollmentDataResponse[index].mserOptions;
        var masOptionss = this.enrollmentDataResponse[index].masOptions;
        var mmOptionss = this.enrollmentDataResponse[index].mmOptions;
        var mvpOptionss = this.enrollmentDataResponse[index].mvpOptions;
        var wiAdvMVPOptionss = this.enrollmentDataResponse[index].wiAdvMVPOptions;
        var wiAdvTireOptionss = this.enrollmentDataResponse[index].wiAdvTireOptions;
        var uconSalesOptionss = this.enrollmentDataResponse[index].uconSalesOptions;
        var uconServiceOptionss = this.enrollmentDataResponse[index].uconServiceOptions;
        var warrantyAdmOptionss = this.enrollmentDataResponse[index].warrantyAdmOptions;
        var pcOptionss = this.enrollmentDataResponse[index].pcOptions;
        var elOptionss = this.enrollmentDataResponse[index].elOptions;
        var usedReconManagerOptionss = this.enrollmentDataResponse[index].usedReconManagerOptions;
        var usedReconParticipantOptionss = this.enrollmentDataResponse[index].usedReconParticipantOptions;

        this.enrollmentDataResponse[index].mserOptions = this.removeDuplicates(mserOptionss);
        this.enrollmentDataResponse[index].masOptions = this.removeDuplicates(masOptionss);
        this.enrollmentDataResponse[index].mmOptions = this.removeDuplicates(mmOptionss);
        this.enrollmentDataResponse[index].mvpOptions = this.removeDuplicates(mvpOptionss);
        this.enrollmentDataResponse[index].wiAdvMVPOptions = this.removeDuplicates(wiAdvMVPOptionss);
        this.enrollmentDataResponse[index].wiAdvTireOptions = this.removeDuplicates(wiAdvTireOptionss);
        this.enrollmentDataResponse[index].uconSalesOptions = this.removeDuplicates(uconSalesOptionss);
        this.enrollmentDataResponse[index].uconServiceOptions = this.removeDuplicates(uconServiceOptionss);
        //   this.enrollmentDataResponse[index].warrantyAdmOptions = this.removeDuplicates(warrantyAdmOptionss);
        this.enrollmentDataResponse[index].pcOptions = this.removeDuplicates(pcOptionss);
        this.enrollmentDataResponse[index].elOptions = this.removeDuplicates(elOptionss);
        this.enrollmentDataResponse[index].usedReconManagerOptions = this.removeDuplicates(usedReconManagerOptionss);
        this.enrollmentDataResponse[index].usedReconParticipantOptions = this.removeDuplicates(usedReconParticipantOptionss);

    }

    private onEditInitE(event: any) {
        if (!event.data.isEditableR) {
            setTimeout(() => {
                this.dataTable.closeCell();
            }, 1);
        }
    }
    private activeUser: string = "";
    private edit(rowData, editButton, cancelButton, saveButton) {
        editButton.style["display"] = "none";
        cancelButton.style["display"] = "block";
        saveButton.style["display"] = "block";
        this.activeUser = rowData.sid + "-" + rowData.name;
        rowData.isEditableR = true;
        this.enableEditable = true;
    }

    private confirmCancel: boolean = false;
    private confirmSave: boolean = false;
    private editButton: any;
    private cancelButton: any;
    private saveButton: any;
    private rowData: any;
    private cancel(rowData, editButton, cancelButton, saveButton) {
        this.confirmCancel = true;
        this.editButton = editButton;
        this.cancelButton = cancelButton;
        this.saveButton = saveButton;
        this.rowData = rowData;
        debugger
        //editButton.style["display"] = "block";
        // cancelButton.style["display"] = "none";
        // saveButton.style["display"] = "none";
        // this.enableEditable = false;
        // rowData.isEditableR = false;
        // this.getEnrollmentData();
    }
    private continueCancel() {
        this.confirmCancel = false;
        this.editButton.style["display"] = "block";
        this.cancelButton.style["display"] = "none";
        this.saveButton.style["display"] = "none";
        this.enableEditable = false;
        this.rowData.isEditableR = false;
       // this.getEnrollmentData();

    }
    private discontinueCancel() {
        this.confirmCancel = false;
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
    }
    private saveEnrollmentMaintenanceData(rowData, editButton, cancelButton, saveButton) {
        this.confirmSave = true;
        this.editButton = editButton;
        this.cancelButton = cancelButton;
        this.saveButton = saveButton;
        this.rowData = rowData;
        //editButton.style["display"] = "block";
        // cancelButton.style["display"] = "none";
        // saveButton.style["display"] = "none";
        // this.enableEditable = false;
        // rowData.isEditableR = false;
        // this.getEnrollmentData();
    }
    // private continueSave() {
    //     this.confirmCancel = false;
    //     this.editButton.style["display"] = "block";
    //     this.cancelButton.style["display"] = "none";
    //     this.saveButton.style["display"] = "none";
    //     this.enableEditable = false;
    //     this.rowData.isEditableR = false;
    //     this.getEnrollmentData();

    // }
    private discontinueSave() {
        this.confirmSave = false;
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
    }

    private msg: string = "";
    private returnItem1(data) {
        var myPersonal
    }
    private continueSave() {
        var rowData = this.rowData;
        var editButton = this.editButton;
        var cancelButton = this.cancelButton;
        var saveButton = this.saveButton;
        this.confirmSave = false;

        editButton.style["display"] = "block";
        cancelButton.style["display"] = "none";
        saveButton.style["display"] = "none";
        this.enableEditable = false;
        rowData.isEditableR = false;
        var myPersonalPositionCode: any = [];
        var overriddenpositionCodes: any = [];
        var mserData: any = [];
        var masData = [];
        var mmData = [];
        var mvpData = [];
        var wiAdvMVPData = [];
        var wiAdvTireData = [];
        var uconSalesData = [];
        var uconServiceData = [];
        var warrantyAdmData = [];
        var pcData = "";
        var elData = "";
        var usedReconManagerData = "";
        var usedReconParticipantData = [];

        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.positionCodes.length; a2++) {
                if (rowData.positionCodes[a2] === this.positionCodesResponse[a1].item2) {
                    myPersonalPositionCode.push(this.positionCodesResponse[a1].item1)
                }
            }

        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.overriddenpositionCodes.length; a2++) {
                if (rowData.overriddenpositionCodes[a2] === this.positionCodesResponse[a1].item2) {
                    overriddenpositionCodes.push(this.positionCodesResponse[a1].item1)
                }
            }

        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mser.length; a2++) {
                if (rowData.mser[a2] === this.positionCodesResponse[a1].item2) {
                    mserData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mas.length; a2++) {
                if (rowData.mas[a2] === this.positionCodesResponse[a1].item2) {
                    masData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mm.length; a2++) {
                if (rowData.mm[a2] === this.positionCodesResponse[a1].item2) {
                    mmData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mvp.length; a2++) {
                if (rowData.mvp[a2] === this.positionCodesResponse[a1].item2) {
                    mvpData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.wiMvp.length; a2++) {
                if (rowData.wiMvp[a2] === this.positionCodesResponse[a1].item2) {
                    wiAdvMVPData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.wiTires.length; a2++) {
                if (rowData.wiTires[a2] === this.positionCodesResponse[a1].item2) {
                    wiAdvTireData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.ucon.length; a2++) {
                if (rowData.ucon[a2] === this.positionCodesResponse[a1].item2) {
                    uconSalesData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.ucon.length; a2++) {
                if (rowData.ucon[a2] === this.positionCodesResponse[a1].item2) {
                    uconServiceData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.ucon.length; a2++) {
                if (rowData.ucon[a2] === this.positionCodesResponse[a1].item2) {
                    warrantyAdmData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.positionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.usedReconP.length; a2++) {
                if (rowData.usedReconP[a2] === this.positionCodesResponse[a1].item2) {
                    usedReconParticipantData.push(this.positionCodesResponse[a1].item1)
                }
            }
        }
        for (var a2 = 0; a2 < this.positionCodesResponse.length; a2++) {
            if (rowData.pc == this.positionCodesResponse[a2].item2) {
                pcData = this.positionCodesResponse[a2].item1;
            }
            if (rowData.el == this.positionCodesResponse[a2].item2) {
                elData = this.positionCodesResponse[a2].item1;
            }
            if (rowData.usedRecon == this.positionCodesResponse[a2].item2) {
                usedReconManagerData = this.positionCodesResponse[a2].item1;
            }
        }
        this.enrollmentService.saveEnrollmentMaintenanceData(rowData, myPersonalPositionCode, overriddenpositionCodes, mserData,
            masData, mmData, mvpData, wiAdvMVPData, wiAdvTireData, uconSalesData, uconServiceData, pcData, elData,
            usedReconManagerData, usedReconParticipantData).subscribe(
            (saveEnrollmentMaintenanceDataResponse) => {
                this.saveEnrollmentMaintenanceDataResponse = (saveEnrollmentMaintenanceDataResponse)
                this.msg = "Participant Information has been updated Successfully.";
               // this.getEnrollmentData();
            },
            (error) => {
                setTimeout(() => {
                    if (error !== undefined && error.length < 250) {
                        this.msg = error;
                    }else{
                        this.msg = "Error in Updating Participant Information.";
                    }

                }, 1000)

                // alert(error)
            }
            )
    }

    private cancelNewUserDataDialogue(data) {
        this.displayAddNewUserDialog = false;
    }

    private getExpresslaneDealer() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.enrollmentService.getExpresslaneDealer(dealerCode).subscribe(
            (expressLaneDealerData) => {
                this.expressLaneDealerData = (expressLaneDealerData)
                this.isExpresslaneDealer = true;
            },
            (error) => {
                this.isExpresslaneDealer = false;
            }
        )
    }
    private openDealerTeamTable: boolean = false;
    private dealerTeamButton: string = "YES";
    private openDealerTeam() {
        if (this.dealerTeamButton === 'YES') {
            this.openDealerTeamTable = true;
            this.dealerTeamButton = "NO";
        } else {
            this.openDealerTeamTable = false;
            this.dealerTeamButton = "YES";
        }

    }

} 
