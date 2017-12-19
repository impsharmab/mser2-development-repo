import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef, OnDestroy } from '@angular/core';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/primeng';

import { state, trigger, style, animate, transition, } from '@angular/animations';
import { DataTable } from 'primeng/primeng';

import { EnrollmentInterface } from './enrollment.interface';
@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment-maintenance.html',
    styleUrls: ['./enrollment-maintenance.component.css']
})
export class EnrollmentComponent implements OnInit {
    isCollapsed = true;
    @ViewChild("datatable") dataTable: DataTable;
    tabContentLoaded: boolean = false;

    addTeamData: any;
    addNewUserData: any;
    data: any;
    editSingleRow: boolean = false;
    disableGlobalFilter: boolean = false;
    expressLaneDealerData: any;
    isExpresslaneDealer: boolean = false;
    selectedpc: string = "";
    notenrolledDataResponse: any = [];
    notenrolledsidOptions: SelectItem[] = [];
    displayAddNewUserDialog: boolean = false;
    displayEnrollmentDialog: boolean;
    enableEditable: boolean = false;
    showEditButton: boolean = true;;
    showCancelButton: boolean = false;
    showSaveButton: boolean = false;
    positionCodesResponse: any = [];
    selectedRowSid: string = "";
    dat: any = "";
    saveEnrollmentMaintenanceDataResponse: any;

    selectedPMRecordsPCindex: any = 0
    selectedPMRecordsPCData: any = "";
    selectedSMRecordsPCindex: any = 0
    selectedSMRecordsPCData: any = "";

    enrollmentDataCount: string = "";
    activeUser: string = "";
    confirmCancel: boolean = false;
    confirmSave: boolean = false;
    editButton: any;
    cancelButton: any;
    saveButton: any;
    rowData: any;
    rowIndex: any = 0;
    msg: string = "";
    openDealerTeamTable: boolean = false;
    dealerTeamButton: string = "YES";

    pmRecordsElligiblepc: any = ["08"];
    smRecordsElligiblepc: any = ["09"];
    mserElligiblepc: any = ["01", "13", "23", "2A", "ES", "ET"];
    mmElligiblepc: any = ["01", "13", "23", "2A", "ES", "ET"];
    upFitsElligpc: any = ["01", "13", "23", "2A", "ES", "ET"];
    fiatElligpc: any = ["01", "13", "23", "2A"]
    tiresElligpc: any = ["01", "13", "23", "2A"];
    mvpElligpc: any = ["01", "13", "ES"];
    wiAdvMVPElligpc: any = ["13"];
    wiAdvTirElligepc: any = ["13"];
    uconSalesElligpc: any = ["01", "02", "03", "04", "05", "06 ", "07", "11", "12", "15", "22", "25", "26", "30", "31", "34", "36", "37", "38", "39", "41", "42", "46", "47", "49", "50", "52", "74", "4T", "IM"];
    uconServiceElligpc: any = ["08", "09", "10", "13", "14", "16", "17", "18", "19", "20", "23", "24", "27", "28", "29", "32", "33", "35", "40", "48", "56", "79", "85", "1F", "2S", "3S", "4S", "7L", "7M", "7N", "7P", "7Q", "ES", "ET"];
    pcPartElligpc = ["08", "14", "40", "19", "32", "33"];
    pcMElligpc = ["01", "02", "08", "09", "32", "33", "35", "37", "40"];
    elMElligpc: any = ["09", "17", "33", "35"];
    elPElligpc: any = ["01", "13", "23", "2A", "ES", "ET"];
    uvmEnrElligpc: any = ["08", "09", "07"];
    uvmPartElligpc: any = ["07", "12", "34"];
    warrantyAdmElligpc: any = ["29"];


    pmRecordsElligiblepcItem2: any = ["Parts Manager(08) "];
    smRecordsElligiblepcItem2: any = ["Service Manager(09) "];
    mserElligiblepcItem2: any = [];
    mmElligiblepcItem2: any = [];
    upFitsElligpcItem2: any = [];
    fiatElligpcItem2: any = [];
    tiresElligpcItem2: any = [];
    mvpElligpcItem2: any = [];
    wiAdvMVPElligpcItem2: any = [];
    wiAdvTirElligepcItem2: any = [];
    uconSalesElligpcItem2: any = [];
    uconServiceElligpcItem2: any = [];
    pcPartElligpcItem2 = [];
    pcMElligpcItem2 = [];
    elMElligpcItem2: any = [];
    elPElligpcItem2: any = [];
    uvmEnrElligpcItem2: any = [];
    uvmPartElligpcItem2: any = [];
    warrantyAdmElligpcItem2: any = [];

    pmRecordsOptions: SelectItem[] = [];
    smRecordsOptions: SelectItem[] = [];
    mserOptions: SelectItem[] = [];
    mmOptions: SelectItem[] = [];
    upFitsOptions: SelectItem[] = [];
    fiatOptions: SelectItem[] = [];
    tiresOptions: SelectItem[] = [];
    mvpOptions: SelectItem[] = [];
    wiAdvMVPOptions: SelectItem[] = [];
    wiAdvTireOptions: SelectItem[] = [];
    uconSalesOptions: SelectItem[] = [];
    uconServiceOptions: SelectItem[] = [];
    pcPartOptions: SelectItem[] = [];
    pcMOptions: SelectItem[] = [];
    elMOptions: SelectItem[] = [];
    elPOptions: SelectItem[] = [];
    uvmEnrOptions: SelectItem[] = [];
    uvmPartOptions: SelectItem[] = [];
    warrantyAdmOptions: SelectItem[] = [];

    enrollmentDataResponse: any = [];

    constructor(private enrollmentService: EnrollmentMaintenanceService, private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.getSelectedDealerCode();
        this.getSelectedDealerName();
        this.getElligiblePositionCodes();
        this.getAllPositionCodes();
        this.getEnrollmentData();
        // this.getExpresslaneDealer();
        this.isEnrolled();
    }
    getSelectedDealerCode() {
        return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    }
    getSelectedDealerName() {
        return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
    }

    showInfoModal: boolean = false;
    openInfoModal() {
        this.showInfoModal = true;
    }
    showELColumn: boolean = true;
    showPCColumn: boolean = true;
    showUVMColumn: boolean = true;
    isEnrolled() {
        var isElEnrolled = JSON.parse(sessionStorage.getItem("selectedCodeData")).elValidated;
        var isPCEnrolled = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPCEnrolled;

        // var isUVMmanager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isUVMManager;isELEnrolled":false,"isPCEnrolled

        if (isElEnrolled) {
            this.showELColumn = true;
        }
        else {
            this.showELColumn = false;
        }
        if (isPCEnrolled) {
            this.showPCColumn = true;
        } else {
            this.showPCColumn = false;
        }
        // if (isUVMmanager) {
        //     this.showUVMColumn = true;
        // } else {
        //     this.showUVMColumn = false;
        // }
    }
    getElligiblePositionCodes() {
        this.enrollmentService.getElligiblePositionCodes().subscribe(
            (positionCodesResponse) => {
                this.positionCodesResponse = (positionCodesResponse)
                // console.log(this.positionCodesResponse)
                // this.assignElligiblePCItem2();
            },
            (error) => {
            }
        )
    }
    allPositionCodesResponse: any = [];
    getAllPositionCodes() {
        this.enrollmentService.getAllPositionCodes().subscribe(
            (allPositionCodesResponse) => {
                this.allPositionCodesResponse = (allPositionCodesResponse)
                this.assignElligiblePCItem2();
            },
            (error) => {
            }
        )
    }
    assignElligiblePCItem2() {
        var mserElligiblepcItem2: any = [];
        var mmElligiblepcItem2: any = [];
        var upFitsElligpcItem2: any = [];
        var tiresElligpcItem2: any = [];
        var fiatElligpcItem2: any = [];
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

        for (var i = 0; i < this.allPositionCodesResponse.length; i++) {
            for (var j = 0; j < this.mserElligiblepc.length; j++) {
                if (this.mserElligiblepc[j] === this.allPositionCodesResponse[i].item1) {
                    mserElligiblepcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.mmElligiblepc.length; j++) {
                if (this.mmElligiblepc[j] === this.allPositionCodesResponse[i].item1) {
                    mmElligiblepcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.upFitsElligpc.length; j++) {
                if (this.upFitsElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    upFitsElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.tiresElligpc.length; j++) {
                if (this.tiresElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    tiresElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.fiatElligpc.length; j++) {
                if (this.fiatElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    fiatElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.mvpElligpc.length; j++) {
                if (this.mvpElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    mvpElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.wiAdvMVPElligpc.length; j++) {
                if (this.wiAdvMVPElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    wiAdvMVPElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.wiAdvTirElligepc.length; j++) {
                if (this.wiAdvTirElligepc[j] === this.allPositionCodesResponse[i].item1) {
                    wiAdvTirElligepcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uconSalesElligpc.length; j++) {
                if (this.uconSalesElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    uconSalesElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uconServiceElligpc.length; j++) {
                if (this.uconServiceElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    uconServiceElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.pcPartElligpc.length; j++) {
                if (this.pcPartElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    pcPartElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.pcMElligpc.length; j++) {
                if (this.pcMElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    pcMElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.elMElligpc.length; j++) {
                if (this.elMElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    elMElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.elPElligpc.length; j++) {
                if (this.elPElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    elPElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uvmEnrElligpc.length; j++) {
                if (this.uvmEnrElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    uvmEnrElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.uvmPartElligpc.length; j++) {
                if (this.uvmPartElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    uvmPartElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }
            for (var j = 0; j < this.warrantyAdmElligpc.length; j++) {
                if (this.warrantyAdmElligpc[j] === this.allPositionCodesResponse[i].item1) {
                    warrantyAdmElligpcItem2.push(this.allPositionCodesResponse[i].item2)
                }
            }


        }
        this.mserElligiblepcItem2 = mserElligiblepcItem2;
        this.mmElligiblepcItem2 = mmElligiblepcItem2;
        this.upFitsElligpcItem2 = upFitsElligpcItem2;
        this.tiresElligpcItem2 = tiresElligpcItem2;
        this.fiatElligpcItem2 = fiatElligpcItem2;
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

    getEnrollmentData() {
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.enrollmentService.getEnrollmentData(dealerCode).subscribe(
            (enrollmentDataResponse) => {
                this.enrollmentDataResponse = (enrollmentDataResponse)
                console.log(this.enrollmentDataResponse);
                this.tabContentLoaded = true;
                if (this.enrollmentDataResponse !== undefined) {
                    this.enrollmentDataCount = "Total number of employees:" + this.enrollmentDataResponse.length;
                }
                // this.somthing();
                for (var a11 = 0; a11 < this.enrollmentDataResponse.length; a11++) {
                    this.readItem1ReturnItem2(this.enrollmentDataResponse[a11], a11);
                }
                for (var a111 = 0; a111 < this.enrollmentDataResponse.length; a111++) {
                    this.constructSelectItem(this.enrollmentDataResponse[a111], a111);
                }
                for (var index = 0; index < this.enrollmentDataResponse.length; index++) {
                    this.enrollmentDataResponse[index].pmPositionCode = [];
                    this.enrollmentDataResponse[index].smPositionCode = [];
                    this.checkPMPositionCodes(index);
                    this.checkSMPositionCodes(index);
                    this.removePMPositionCodesFromMsers(index);
                    this.removeSMPositionCodesFromMsers(index);
                }
            },
            (error) => {
                this.tabContentLoaded = true;
            }
        )
    }
    readItem1ReturnItem2(data, index) {
        var positionCodes: any = [];
        var overriddenpositionCodes: any = [];
        var mser: any = [];
        var mas: any = [];
        var mm: any = [];
        var mvp: any = [];
        var wiMvp: any = [];
        var wiTires: any = [];
        var fiat: any = [];
        var tires: any = [];
        var usedReconP: any = [];
        var ucon: any = [];
        var pc: any = "";
        var el: any = "";
        var usedRecon = "";


        for (var a2 = 0; a2 < this.allPositionCodesResponse.length; a2++) {
            for (var a3 = 0; a3 < data.positionCodes.length; a3++) {
                if (data.positionCodes[a3] === this.allPositionCodesResponse[a2].item1) {
                    positionCodes.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.overriddenpositionCodes.length; a3++) {
                if (data.overriddenpositionCodes[a3] === this.allPositionCodesResponse[a2].item1) {
                    overriddenpositionCodes.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mser.length; a3++) {
                if (data.mser[a3] === this.allPositionCodesResponse[a2].item1) {
                    mser.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mas.length; a3++) {
                if (data.mas[a3] === this.allPositionCodesResponse[a2].item1) {
                    mas.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mm.length; a3++) {
                if (data.mm[a3] === this.allPositionCodesResponse[a2].item1) {
                    mm.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.mvp.length; a3++) {
                if (data.mvp[a3] === this.allPositionCodesResponse[a2].item1) {
                    mvp.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.wiMvp.length; a3++) {
                if (data.wiMvp[a3] === this.allPositionCodesResponse[a2].item1) {
                    wiMvp.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.wiTires.length; a3++) {
                if (data.wiTires[a3] === this.allPositionCodesResponse[a2].item1) {
                    wiTires.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.fiat.length; a3++) {
                if (data.fiat[a3] === this.allPositionCodesResponse[a2].item1) {
                    fiat.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.tires.length; a3++) {
                if (data.tires[a3] === this.allPositionCodesResponse[a2].item1) {
                    tires.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.usedReconP.length; a3++) {
                if (data.usedReconP[a3] === this.allPositionCodesResponse[a2].item1) {
                    usedReconP.push(this.allPositionCodesResponse[a2].item2)
                }
            }
            for (var a3 = 0; a3 < data.ucon.length; a3++) {
                if (data.ucon[a3] === this.allPositionCodesResponse[a2].item1) {
                    ucon.push(this.allPositionCodesResponse[a2].item2)
                }
            }

            if (data.pc == this.allPositionCodesResponse[a2].item1) {
                pc = this.allPositionCodesResponse[a2].item2;
            }
            if (data.el == this.allPositionCodesResponse[a2].item1) {
                el = this.allPositionCodesResponse[a2].item2;
            }
            if (data.usedRecon == this.allPositionCodesResponse[a2].item1) {
                usedRecon = this.allPositionCodesResponse[a2].item2;
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
        this.enrollmentDataResponse[index].fiat = fiat;
        this.enrollmentDataResponse[index].tires = tires;
        this.enrollmentDataResponse[index].usedReconP = usedReconP;
        this.enrollmentDataResponse[index].ucon = ucon;
        this.enrollmentDataResponse[index].pc = pc;
        this.enrollmentDataResponse[index].el = el;
        this.enrollmentDataResponse[index].usedRecon = usedRecon;
    }
    constructSelectItem(data, index) {
        var overrideOptionArray: SelectItem[] = [];
        var pmRecordsOptions: SelectItem[] = [];
        var smRecordsOptions: SelectItem[] = [];
        var mserOptions: SelectItem[] = [];
        var masOptions: SelectItem[] = [];
        var mmOptions: SelectItem[] = [];
        var tiresOptions: SelectItem[] = [];
        var fiatOptions: SelectItem[] = [];
        var mvpOptions: SelectItem[] = [];
        var wiAdvMVPOptions: SelectItem[] = [];
        var wiAdvTireOptions: SelectItem[] = [];
        var uconSalesOptions: SelectItem[] = [];
        var uconServiceOptions: SelectItem[] = [];
        var warrantyAdmOptions: SelectItem[] = [];
        var pcOptions: SelectItem[] = [{ label: "", value: "" }];
        var elOptions: SelectItem[] = [{ label: "", value: "" }];
        var usedReconManagerOptions: SelectItem[] = [{ label: "", value: "" }];
        var usedReconParticipantOptions: SelectItem[] = [];

        var pmRecordsData = [];
        var smRecordsData = [];
        var mserData = [];
        var masData = [];
        var mmData = [];
        var fiatData = [];
        var tiresData = [];
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

        for (var i = 0; i < this.pmRecordsElligiblepcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.pmRecordsElligiblepcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    pmRecordsData.push(this.pmRecordsElligiblepcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.pmRecordsElligiblepcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    pmRecordsData.push(this.pmRecordsElligiblepcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.smRecordsElligiblepcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.smRecordsElligiblepcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    smRecordsData.push(this.smRecordsElligiblepcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.smRecordsElligiblepcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    smRecordsData.push(this.smRecordsElligiblepcItem2[i]);
                }
            }
        }

        for (var i = 0; i < this.mserElligiblepcItem2.length; i++) {
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
        for (var i = 0; i < this.tiresElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.tiresElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    tiresData.push(this.tiresElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.tiresElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    tiresData.push(this.tiresElligpcItem2[i]);
                }
            }
        }
        for (var i = 0; i < this.fiatElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.fiatElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    fiatData.push(this.fiatElligpcItem2[i]);
                }
            }
            for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
                if (this.fiatElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
                    fiatData.push(this.fiatElligpcItem2[i]);
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
            // for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
            //     if (this.elMElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
            //         elData.push(this.elMElligpcItem2[i]);
            //     }
            // }
        }
        for (var i = 0; i < this.pcMElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.pcMElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    pcData.push(this.pcMElligpcItem2[i]);
                }
            }
            // for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
            //     if (this.pcMElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
            //         pcData.push(this.pcMElligpcItem2[i]);
            //     }
            // }
        }
        for (var i = 0; i < this.uvmEnrElligpcItem2.length; i++) {
            for (var k = 0; k < this.enrollmentDataResponse[index].positionCodes.length; k++) {
                if (this.uvmEnrElligpcItem2[i] === this.enrollmentDataResponse[index].positionCodes[k]) {
                    usedReconManagerData.push(this.uvmEnrElligpcItem2[i]);
                }
            }
            // for (var l = 0; l < this.enrollmentDataResponse[index].overriddenpositionCodes.length; l++) {
            //     if (this.uvmEnrElligpcItem2[i] === this.enrollmentDataResponse[index].overriddenpositionCodes[l]) {
            //         usedReconManagerData.push(this.uvmEnrElligpcItem2[i]);
            //     }
            // }

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

        for (var m = 0; m < pmRecordsData.length; m++) {
            pmRecordsOptions.push({ label: pmRecordsData[m], value: pmRecordsData[m] });
        }
        for (var m = 0; m < smRecordsData.length; m++) {
            smRecordsOptions.push({ label: smRecordsData[m], value: smRecordsData[m] });
        }
        for (var m = 0; m < mserData.length; m++) {
            mserOptions.push({ label: mserData[m], value: mserData[m] });
        }
        for (var m = 0; m < masData.length; m++) {
            masOptions.push({ label: masData[m], value: masData[m] });
        }
        for (var m = 0; m < mmData.length; m++) {
            mmOptions.push({ label: mmData[m], value: mmData[m] });
        }
        for (var m = 0; m < fiatData.length; m++) {
            fiatOptions.push({ label: fiatData[m], value: fiatData[m] });
        }
        for (var m = 0; m < tiresData.length; m++) {
            tiresOptions.push({ label: tiresData[m], value: tiresData[m] });
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
            // if (pcData[m] == "Parts Manager(08) ") {
            //     var inpcData = pcData.indexOf("Parts Manager(08) ");
            //     if (inpcData != -1) {
            //         pcData.splice(inpcData, 1);

            //     }
            // }
            // if (pcData[m] == "Service Manager(09) ") {
            //     var inPCData09 = pcData.indexOf("Service Manager(09) ");
            //     if (inPCData09 != -1) {
            //         pcData.splice(inPCData09, 1);
            //     }
            // }
            pcOptions.push({ label: pcData[m], value: pcData[m] });
        }
        for (var m = 0; m < elData.length; m++) {
            // if (elData[m] == "Service Manager(09) ") {
            //     var inElData = elData.indexOf("Service Manager(09) ");
            //     if (inElData != -1) {
            //         elData.splice(inElData, 1);
            //     }
            // }

            elOptions.push({ label: elData[m], value: elData[m] });
        }
        for (var m = 0; m < usedReconManagerData.length; m++) {
            // if (usedReconManagerData[m] == "Parts Manager(08) ") {
            //     var inusedReconManagerData = usedReconManagerData.indexOf("Parts Manager(08) ");
            //     if (inusedReconManagerData != -1) {
            //         usedReconManagerData.splice(inusedReconManagerData, 1);
            //     }
            // }
            // if (usedReconManagerData[m] == "Service Manager(09) ") {
            //     var inusedReconManagerData09 = usedReconManagerData.indexOf("Service Manager(09) ");
            //     if (inusedReconManagerData09 != -1) {
            //         usedReconManagerData.splice(inusedReconManagerData09, 1);
            //     }
            // }
            usedReconManagerOptions.push({ label: usedReconManagerData[m], value: usedReconManagerData[m] });
        }
        for (var m = 0; m < usedReconParticipantData.length; m++) {
            usedReconParticipantOptions.push({ label: usedReconParticipantData[m], value: usedReconParticipantData[m] });
        }

        this.enrollmentDataResponse[index].pmRecordsOptions = pmRecordsOptions;
        this.enrollmentDataResponse[index].smRecordsOptions = smRecordsOptions;
        this.enrollmentDataResponse[index].optionsOverrides = overrideOptionArray;
        this.enrollmentDataResponse[index].mserOptions = mserOptions;
        this.enrollmentDataResponse[index].masOptions = masOptions;
        this.enrollmentDataResponse[index].mmOptions = mmOptions;
        this.enrollmentDataResponse[index].tiresOptions = tiresOptions;
        this.enrollmentDataResponse[index].fiatOptions = fiatOptions;
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
        // if (this.enrollmentDataResponse[index].pmRecordsOptions.length > 0) {
        // console.log(this.enrollmentDataResponse[index].name + ":     pm");
        // console.log(this.enrollmentDataResponse[index].pmRecordsOptions);


        // }
        // if (this.enrollmentDataResponse[index].smRecordsOptions.length > 0) {
        // console.log(this.enrollmentDataResponse[index].name + ":       sm");
        // console.log(this.enrollmentDataResponse[index].smRecordsOptions);

        //  }
    }
    removeDuplicates(duplicateArray) {
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
    getRowIndex(sid) {
        for (var i = 0; i < this.enrollmentDataResponse.length; i++) {
            if (this.enrollmentDataResponse[i].sid == sid) {
                return i;
            }
        }
    }
    selectedPCOverrides(data, rowData) {
        var index = this.getRowIndex(rowData.sid);
        var pmRecordsSelectedData = [];
        var smRecordsSelectedData = [];
        var mserSelectedData = [];
        var masSelectedData = [];
        var mmSelectedData = [];
        var fiatSelectedData = [];
        var tiresSelectedData = [];
        var mvpSelectedData = [];
        var wiAdvMVPSelectedData = [];
        var wiAdvTireSelectedData = [];
        var uconSalesSelectedData = [];
        var uconServiceSelectedData = [];
        var warrantyAdmSelectedData = [];
        // var pcSelectedData = [];
        // var elSelectedData = [];
        // var usedReconManagerSelectedData = [];
        var usedReconParticipantSelectedData = [];

        var pmRecordsOptions: SelectItem[] = [];
        var smRecordsOptions: SelectItem[] = [];
        var mserOptions: SelectItem[] = [];
        var masOptions: SelectItem[] = [];
        var mmOptions: SelectItem[] = [];
        var fiatOptions: SelectItem[] = [];
        var tiresOptions: SelectItem[] = [];
        var mvpOptions: SelectItem[] = [];
        var wiAdvMVPOptions: SelectItem[] = [];
        var wiAdvTireOptions: SelectItem[] = [];
        var uconSalesOptions: SelectItem[] = [];
        var uconServiceOptions: SelectItem[] = [];
        var warrantyAdmOptions: SelectItem[] = [];
        // var pcOptions: SelectItem[] = [];
        // var elOptions: SelectItem[] = [];
        // var usedReconManagerOptions: SelectItem[] = [];
        var usedReconParticipantOptions: SelectItem[] = [];

        for (var i = 0; i < this.pmRecordsElligiblepcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.pmRecordsElligiblepcItem2[i] === data[j]) {
                    pmRecordsSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.smRecordsElligiblepcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.smRecordsElligiblepcItem2[i] === data[j]) {
                    smRecordsSelectedData.push(data[j]);
                }
            }
        }
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
        for (var i = 0; i < this.fiatElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.fiatElligpcItem2[i] === data[j]) {
                    fiatSelectedData.push(data[j]);
                }
            }
        }
        for (var i = 0; i < this.tiresElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.tiresElligpcItem2[i] === data[j]) {
                    tiresSelectedData.push(data[j]);
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
        // for (var i = 0; i < this.pcMElligpcItem2.length; i++) {
        //     for (var j = 0; j < data.length; j++) {
        //         if (this.pcMElligpcItem2[i] === data[j]) {
        //             pcSelectedData.push(data[j]);
        //         }
        //     }
        // }
        // for (var i = 0; i < this.elMElligpcItem2.length; i++) {
        //     for (var j = 0; j < data.length; j++) {
        //         if (this.elMElligpcItem2[i] === data[j]) {
        //             elSelectedData.push(data[j]);
        //         }
        //     }
        // }
        // for (var i = 0; i < this.uvmEnrElligpcItem2.length; i++) {
        //     for (var j = 0; j < data.length; j++) {
        //         if (this.uvmEnrElligpcItem2[i] === data[j]) {
        //             usedReconManagerSelectedData.push(data[j]);
        //         }
        //     }
        // }
        for (var i = 0; i < this.uvmPartElligpcItem2.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (this.uvmPartElligpcItem2[i] === data[j]) {
                    usedReconParticipantSelectedData.push(data[j]);
                }
            }
        }

        for (var j = 0; j < pmRecordsSelectedData.length; j++) {
            this.enrollmentDataResponse[index].pmRecordsOptions.push({ label: pmRecordsSelectedData[j], value: pmRecordsSelectedData[j] });
        }
        for (var j = 0; j < smRecordsSelectedData.length; j++) {
            this.enrollmentDataResponse[index].smRecordsOptions.push({ label: smRecordsSelectedData[j], value: smRecordsSelectedData[j] });
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
        for (var j = 0; j < fiatSelectedData.length; j++) {
            this.enrollmentDataResponse[index].fiatOptions.push({ label: fiatSelectedData[j], value: fiatSelectedData[j] });
        }
        for (var j = 0; j < tiresSelectedData.length; j++) {
            this.enrollmentDataResponse[index].tiresOptions.push({ label: tiresSelectedData[j], value: tiresSelectedData[j] });
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
        // for (var j = 0; j < pcSelectedData.length; j++) {
        //     this.enrollmentDataResponse[index].pcOptions.push({ label: pcSelectedData[j], value: pcSelectedData[j] });
        // }
        // for (var j = 0; j < elSelectedData.length; j++) {
        //     this.enrollmentDataResponse[index].elOptions.push({ label: elSelectedData[j], value: elSelectedData[j] });
        // }
        // for (var j = 0; j < usedReconManagerSelectedData.length; j++) {
        //     this.enrollmentDataResponse[index].usedReconManagerOptions.push({ label: usedReconManagerSelectedData[j], value: usedReconManagerSelectedData[j] });
        // }
        for (var j = 0; j < usedReconParticipantSelectedData.length; j++) {
            this.enrollmentDataResponse[index].usedReconParticipantOptions.push({ label: usedReconParticipantSelectedData[j], value: usedReconParticipantSelectedData[j] });
        }
        var pmRecordsOptionss = this.enrollmentDataResponse[index].pmRecordsOptions;
        var smRecordsOptionss = this.enrollmentDataResponse[index].smRecordsOptions;
        var mserOptionss = this.enrollmentDataResponse[index].mserOptions;
        var masOptionss = this.enrollmentDataResponse[index].masOptions;
        var mmOptionss = this.enrollmentDataResponse[index].mmOptions;
        var tiresOptionss = this.enrollmentDataResponse[index].tiresOptions;
        var fiatOptionss = this.enrollmentDataResponse[index].fiatOptions;
        var mvpOptionss = this.enrollmentDataResponse[index].mvpOptions;
        var wiAdvMVPOptionss = this.enrollmentDataResponse[index].wiAdvMVPOptions;
        var wiAdvTireOptionss = this.enrollmentDataResponse[index].wiAdvTireOptions;
        var uconSalesOptionss = this.enrollmentDataResponse[index].uconSalesOptions;
        var uconServiceOptionss = this.enrollmentDataResponse[index].uconServiceOptions;
        var warrantyAdmOptionss = this.enrollmentDataResponse[index].warrantyAdmOptions;
        // var pcOptionss = this.enrollmentDataResponse[index].pcOptions;
        // var elOptionss = this.enrollmentDataResponse[index].elOptions;
        // var usedReconManagerOptionss = this.enrollmentDataResponse[index].usedReconManagerOptions;
        var usedReconParticipantOptionss = this.enrollmentDataResponse[index].usedReconParticipantOptions;

        this.enrollmentDataResponse[index].pmRecordsOptions = this.removeDuplicates(pmRecordsOptionss);
        this.enrollmentDataResponse[index].smRecordsOptions = this.removeDuplicates(smRecordsOptionss);
        this.enrollmentDataResponse[index].mserOptions = this.removeDuplicates(mserOptionss);
        this.enrollmentDataResponse[index].masOptions = this.removeDuplicates(masOptionss);
        this.enrollmentDataResponse[index].mmOptions = this.removeDuplicates(mmOptionss);
        this.enrollmentDataResponse[index].fiatOptions = this.removeDuplicates(fiatOptionss);
        this.enrollmentDataResponse[index].tiresOptions = this.removeDuplicates(tiresOptionss);
        this.enrollmentDataResponse[index].mvpOptions = this.removeDuplicates(mvpOptionss);
        this.enrollmentDataResponse[index].wiAdvMVPOptions = this.removeDuplicates(wiAdvMVPOptionss);
        this.enrollmentDataResponse[index].wiAdvTireOptions = this.removeDuplicates(wiAdvTireOptionss);
        this.enrollmentDataResponse[index].uconSalesOptions = this.removeDuplicates(uconSalesOptionss);
        this.enrollmentDataResponse[index].uconServiceOptions = this.removeDuplicates(uconServiceOptionss);
        //   this.enrollmentDataResponse[index].warrantyAdmOptions = this.removeDuplicates(warrantyAdmOptionss);
        // this.enrollmentDataResponse[index].pcOptions = this.removeDuplicates(pcOptionss);
        // this.enrollmentDataResponse[index].elOptions = this.removeDuplicates(elOptionss);
        // this.enrollmentDataResponse[index].usedReconManagerOptions = this.removeDuplicates(usedReconManagerOptionss);
        this.enrollmentDataResponse[index].usedReconParticipantOptions = this.removeDuplicates(usedReconParticipantOptionss);

    }
    checkPMPositionCodes(index) {
        var mserPositionCode = [];
        var mmPositionCode = [];
        var masPositionCode = [];
        var mvpPositionCode = [];
        var wiMvpPositionCode = [];
        var wiTiresPositionCode = [];
        var fiatPositionCode = [];
        var tiresPositionCode = [];

        for (var i = 0; i < this.enrollmentDataResponse[index].mser.length; i++) {
            if (this.enrollmentDataResponse[index].mser[i] == "Parts Manager(08) ") {
                mserPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mm.length; i++) {
            if (this.enrollmentDataResponse[index].mm[i] == "Parts Manager(08) ") {
                mmPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mas.length; i++) {
            if (this.enrollmentDataResponse[index].mas[i] == "Parts Manager(08) ") {
                masPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mvp.length; i++) {
            if (this.enrollmentDataResponse[index].mvp[i] == "Parts Manager(08) ") {
                mvpPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiMvp.length; i++) {
            if (this.enrollmentDataResponse[index].wiMvp[i] == "Parts Manager(08) ") {
                wiMvpPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiTires.length; i++) {
            if (this.enrollmentDataResponse[index].wiTires[i] == "Parts Manager(08) ") {
                wiTiresPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].tires.length; i++) {
            if (this.enrollmentDataResponse[index].tires[i] == "Parts Manager(08) ") {
                tiresPositionCode.push("Parts Manager(08) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].fiat.length; i++) {
            if (this.enrollmentDataResponse[index].fiat[i] == "08") {
                fiatPositionCode.push("08");
            }
        }
        if (mserPositionCode.length > 0
            && mmPositionCode.length > 0
            && masPositionCode.length > 0
            //&& mvpPositionCode.length > 0
            //&& wiMvpPositionCode.length > 0
            && wiTiresPositionCode.length > 0
            && tiresPositionCode.length > 0
            //&& fiatPositionCode.length > 0
        ) {

            this.enrollmentDataResponse[index].pmPositionCode.push("Parts Manager(08) ");

        }
    }
    checkSMPositionCodes(index) {
        var mserPositionCode = [];
        var mmPositionCode = [];
        var masPositionCode = [];
        var mvpPositionCode = [];
        var wiMvpPositionCode = [];
        var wiTiresPositionCode = [];
        var fiatPositionCode = [];
        var tiresPositionCode = [];

        for (var i = 0; i < this.enrollmentDataResponse[index].mser.length; i++) {
            if (this.enrollmentDataResponse[index].mser[i] == "Service Manager(09) ") {
                mserPositionCode.push("Service Manager(09) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mm.length; i++) {
            if (this.enrollmentDataResponse[index].mm[i] == "Service Manager(09) ") {
                mmPositionCode.push("Service Manager(09) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mas.length; i++) {
            if (this.enrollmentDataResponse[index].mas[i] == "Service Manager(09) ") {
                masPositionCode.push("Service Manager(09) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mvp.length; i++) {
            if (this.enrollmentDataResponse[index].mvp[i] == "Service Manager(09) ") {
                mvpPositionCode.push("Service Manager(09) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiMvp.length; i++) {
            if (this.enrollmentDataResponse[index].wiMvp[i] == "Service Manager(09) ") {
                wiMvpPositionCode.push("Service Manager(09) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiTires.length; i++) {
            if (this.enrollmentDataResponse[index].wiTires[i] == "Service Manager(09) ") {
                wiTiresPositionCode.push("Service Manager(09) ");
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].tires.length; i++) {
            if (this.enrollmentDataResponse[index].tires[i] == "Service Manager(09) ") {
                tiresPositionCode.push("Service Manager(09) ");
            }
        }
        // for (var i = 0; i < this.enrollmentDataResponse[index].fiat.length; i++) {
        //     if (this.enrollmentDataResponse[index].fiat[i] == "08") {
        //         fiatPositionCode.push("08");
        //     }
        // }
        if (mserPositionCode.length > 0
            && mmPositionCode.length > 0
            && masPositionCode.length > 0
            && mvpPositionCode.length > 0
            && wiMvpPositionCode.length > 0
            && wiTiresPositionCode.length > 0
            && tiresPositionCode.length > 0
        ) {

            this.enrollmentDataResponse[index].smPositionCode.push("Service Manager(09) ");
        }
    }
    removePMPositionCodesFromMsers(index) {
        var mserPositionCode = this.enrollmentDataResponse[index].mser;
        var mmPositionCode = this.enrollmentDataResponse[index].mm;
        var masPositionCode = this.enrollmentDataResponse[index].mas;
        var mvpPositionCode = this.enrollmentDataResponse[index].mvp;
        var wiMvpPositionCode = this.enrollmentDataResponse[index].wiMvp;
        var wiTiresPositionCode = this.enrollmentDataResponse[index].wiTires;
        // var fiatPositionCode = this.enrollmentDataResponse[index].mm;
        var tiresPositionCode = this.enrollmentDataResponse[index].tires;

        // if (this.enrollmentDataResponse[index].pmPositionCode[0] == "Parts Manager(08) ") {
        for (var i = 0; i < this.enrollmentDataResponse[index].mser.length; i++) {
            if (this.enrollmentDataResponse[index].mser[i] == "Parts Manager(08) ") {
                // mserPositionCode.push(this.enrollmentDataResponse[index].mser[i]);
                var indmser = mserPositionCode.indexOf("Parts Manager(08) ");
                if (indmser != -1) {
                    mserPositionCode.splice(indmser, 1);
                    // delete mserPositionCode[indmser];
                    // console.log(mserPositionCode)
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mm.length; i++) {
            if (this.enrollmentDataResponse[index].mm[i] == "Parts Manager(08) ") {
                // mmPositionCode.push(this.enrollmentDataResponse[index].mm[i]);
                var indmm = mmPositionCode.indexOf("Parts Manager(08) ");
                if (indmm != -1) {
                    mmPositionCode.splice(indmm, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mas.length; i++) {
            if (this.enrollmentDataResponse[index].mas[i] == "Parts Manager(08) ") {
                // masPositionCode.push(this.enrollmentDataResponse[index].mas[i]);
                var indmas = masPositionCode.indexOf("Parts Manager(08) ");
                if (indmas != -1) {
                    masPositionCode.splice(indmas, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mvp.length; i++) {
            if (this.enrollmentDataResponse[index].mvp[i] == "Parts Manager(08) ") {
                // mvpPositionCode.push(this.enrollmentDataResponse[index].mvp[i]);
                var indmvp = mvpPositionCode.indexOf("Parts Manager(08) ");
                if (indmvp != -1) {
                    mvpPositionCode.splice(indmvp, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiMvp.length; i++) {
            if (this.enrollmentDataResponse[index].wiMvp[i] == "Parts Manager(08) ") {
                // wiMvpPositionCode.push(this.enrollmentDataResponse[index].wiMvp[i]);
                var indwiMvp = wiMvpPositionCode.indexOf("Parts Manager(08) ");
                if (indwiMvp != -1) {
                    wiMvpPositionCode.splice(indwiMvp, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiTires.length; i++) {
            if (this.enrollmentDataResponse[index].wiTires[i] == "Parts Manager(08) ") {
                // wiTiresPositionCode.push(this.enrollmentDataResponse[index].wiTires[i]);
                var indwiTires = wiTiresPositionCode.indexOf("Parts Manager(08) ");
                if (indwiTires != -1) {
                    wiTiresPositionCode.splice(indwiTires, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].tires.length; i++) {
            if (this.enrollmentDataResponse[index].tires[i] == "Parts Manager(08) ") {
                // tiresPositionCode.push(this.enrollmentDataResponse[index].tires[i]);
                var indtires = tiresPositionCode.indexOf("Parts Manager(08) ");
                if (indtires != -1) {
                    tiresPositionCode.splice(indtires, 1);
                }
            }
        }
        // for (var i = 0; i < this.enrollmentDataResponse[index].fiat.length; i++) {
        //     if (this.enrollmentDataResponse[index].fiat[i] == "Parts Manager(08) ") {
        //         var indfiat = fiatPositionCode.indexOf("Parts Manager(08) ");
        //         if (indfiat != -1) {
        //             fiatPositionCode.splice(indfiat, 1);
        //         }
        //     }
        // }





        // }

        this.enrollmentDataResponse[index].mser = mserPositionCode;
        this.enrollmentDataResponse[index].mm = mmPositionCode;
        this.enrollmentDataResponse[index].mas = masPositionCode;
        this.enrollmentDataResponse[index].mvp = mvpPositionCode;
        this.enrollmentDataResponse[index].wiMvp = wiMvpPositionCode;
        this.enrollmentDataResponse[index].wiTires = wiTiresPositionCode;
        // this.enrollmentDataResponse[index].fiat = fiatPositionCode;
        this.enrollmentDataResponse[index].tires = tiresPositionCode;

    }
    removeSMPositionCodesFromMsers(index) {
        var mserPositionCode = this.enrollmentDataResponse[index].mser;
        var mmPositionCode = this.enrollmentDataResponse[index].mm;
        var masPositionCode = this.enrollmentDataResponse[index].mas;
        var mvpPositionCode = this.enrollmentDataResponse[index].mvp;
        var wiMvpPositionCode = this.enrollmentDataResponse[index].wiMvp;
        var wiTiresPositionCode = this.enrollmentDataResponse[index].wiTires;
        // var fiatPositionCode = this.enrollmentDataResponse[index].mm;
        var tiresPositionCode = this.enrollmentDataResponse[index].tires;

        // if (this.enrollmentDataResponse[index].pmPositionCode[0] == "Parts Manager(08) ") {
        for (var i = 0; i < this.enrollmentDataResponse[index].mser.length; i++) {
            if (this.enrollmentDataResponse[index].mser[i] == "Service Manager(09) ") {
                var indmser = mserPositionCode.indexOf("Service Manager(09) ");
                if (indmser != -1) {
                    mserPositionCode.splice(indmser, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mm.length; i++) {
            if (this.enrollmentDataResponse[index].mm[i] == "Service Manager(09) ") {
                var indmm = mmPositionCode.indexOf("Service Manager(09) ");
                if (indmm != -1) {
                    mmPositionCode.splice(indmm, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].mas.length; i++) {
            if (this.enrollmentDataResponse[index].mas[i] == "Service Manager(09) ") {
                var indmas = masPositionCode.indexOf("Service Manager(09) ");
                if (indmas != -1) {
                    masPositionCode.splice(indmas, 1);
                }
            }
        }
        //For mvp they want to see in the 09
        for (var i = 0; i < this.enrollmentDataResponse[index].mvp.length; i++) {
            if (this.enrollmentDataResponse[index].mvp[i] == "Service Manager(09) ") {
                var indmvp = mvpPositionCode.indexOf("Service Manager(09) ");
                if (indmvp != -1) {
                    mvpPositionCode.splice(indmvp, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiMvp.length; i++) {
            if (this.enrollmentDataResponse[index].wiMvp[i] == "Service Manager(09) ") {
                var indwiMvp = wiMvpPositionCode.indexOf("Service Manager(09) ");
                if (indwiMvp != -1) {
                    wiMvpPositionCode.splice(indwiMvp, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].wiTires.length; i++) {
            if (this.enrollmentDataResponse[index].wiTires[i] == "Service Manager(09) ") {
                var indwiTires = wiTiresPositionCode.indexOf("Service Manager(09) ");
                if (indwiTires != -1) {
                    wiTiresPositionCode.splice(indwiTires, 1);
                }
            }
        }
        for (var i = 0; i < this.enrollmentDataResponse[index].tires.length; i++) {
            if (this.enrollmentDataResponse[index].tires[i] == "Service Manager(09) ") {
                var indtires = tiresPositionCode.indexOf("Service Manager(09) ");
                if (indtires != -1) {
                    tiresPositionCode.splice(indtires, 1);
                }
            }
        }
        // for (var i = 0; i < this.enrollmentDataResponse[index].fiat.length; i++) {
        //     if (this.enrollmentDataResponse[index].fiat[i] == "Parts Manager(08) ") {
        //         var indfiat = fiatPositionCode.indexOf("Parts Manager(08) ");
        //         if (indfiat != -1) {
        //             fiatPositionCode.splice(indfiat, 1);
        //         }
        //     }
        // }





        // }

        this.enrollmentDataResponse[index].mser = mserPositionCode;
        this.enrollmentDataResponse[index].mm = mmPositionCode;
        this.enrollmentDataResponse[index].mas = masPositionCode;
        this.enrollmentDataResponse[index].mvp = mvpPositionCode;
        this.enrollmentDataResponse[index].wiMvp = wiMvpPositionCode;
        this.enrollmentDataResponse[index].wiTires = wiTiresPositionCode;
        // this.enrollmentDataResponse[index].fiat = fiatPositionCode;
        this.enrollmentDataResponse[index].tires = tiresPositionCode;

        // if (this.enrollmentDataResponse[index].sid == "S42400C") {
        //     console.log(this.enrollmentDataResponse[index].name);
        //     console.log(this.enrollmentDataResponse[index].mvp);
        // }

    }

    selectedPMRecordsPC(data, sid) {
        var enrollmentDataResponse = this.enrollmentDataResponse;
        var selectedPMRecordsPCindex: any = 0;
        for (var i = 0; i < enrollmentDataResponse.length; i++) {
            if (sid == enrollmentDataResponse[i].sid) {
                selectedPMRecordsPCindex = i;
            }
        }
        this.selectedPMRecordsPCData = data;
    }
    selectedSMRecordsPC(data, sid) {
        var enrollmentDataResponse = this.enrollmentDataResponse;
        var selectedSMRecordsPCindex: any = 0;
        for (var i = 0; i < enrollmentDataResponse.length; i++) {
            if (sid == enrollmentDataResponse[i].sid) {
                selectedSMRecordsPCindex = i;
            }
        }
        this.selectedSMRecordsPCData = data;
    }
    onEditInitE(event: any) {
        if (!event.data.isEditableR) {
            setTimeout(() => {
                this.dataTable.closeCell();
            }, 1);
        }
    }

    edit(rowData, editButton, cancelButton, saveButton) {
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
        this.activeUser = rowData.sid + "-" + rowData.name;
        rowData.isEditableR = true;
        this.enableEditable = true;
    }

    applyRowStyle(rowData: any): string {
        // console.log("applyrow");
        return ".rowSelectionColor";
    }

    cancel(rowData, editButton, cancelButton, saveButton) {
        //  this.editSingleRow = false;
        this.confirmCancel = true;
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
    continueCancel() {
        this.disableGlobalFilter = false;
        this.editSingleRow = false;
        this.confirmCancel = false;
        this.editButton.style["display"] = "block";
        this.cancelButton.style["display"] = "none";
        this.saveButton.style["display"] = "none";
        this.enableEditable = false;
        this.rowData.isEditableR = false;
        // this.getEnrollmentData();

    }
    discontinueCancel() {
        this.editSingleRow = true;
        this.confirmCancel = false;
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
    }
    saveEnrollmentMaintenanceData(rowData, editButton, cancelButton, saveButton, index) {
        // this.editSingleRow = false;
        this.confirmSave = true;
        this.editButton = editButton;
        this.cancelButton = cancelButton;
        this.saveButton = saveButton;
        this.rowData = rowData;
        this.rowIndex = index;
        //editButton.style["display"] = "block";
        // cancelButton.style["display"] = "none";
        // saveButton.style["display"] = "none";
        // this.enableEditable = false;
        // rowData.isEditableR = false;
        // this.getEnrollmentData();
    }
    //  continueSave() {
    //     this.confirmCancel = false;
    //     this.editButton.style["display"] = "block";
    //     this.cancelButton.style["display"] = "none";
    //     this.saveButton.style["display"] = "none";
    //     this.enableEditable = false;
    //     this.rowData.isEditableR = false;
    //     this.getEnrollmentData();

    // }
    discontinueSave() {
        this.editSingleRow = true;
        this.confirmSave = false;
        this.editButton = {};
        this.cancelButton = {};
        this.saveButton = {};
    }


    returnItem1(data) {
        var myPersonal
    }
    continueSave() {
        this.disableGlobalFilter = false;
        this.editSingleRow = false;
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
        var tiresData = [];
        var fiatData = [];
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

        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.positionCodes.length; a2++) {
                if (rowData.positionCodes[a2] === this.allPositionCodesResponse[a1].item2) {
                    myPersonalPositionCode.push(this.allPositionCodesResponse[a1].item1)
                }
            }

        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.overriddenpositionCodes.length; a2++) {
                if (rowData.overriddenpositionCodes[a2] === this.allPositionCodesResponse[a1].item2) {
                    overriddenpositionCodes.push(this.allPositionCodesResponse[a1].item1)
                }
            }

        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mser.length; a2++) {
                if (rowData.mser[a2] === this.allPositionCodesResponse[a1].item2) {
                    mserData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mas.length; a2++) {
                if (rowData.mas[a2] === this.allPositionCodesResponse[a1].item2) {
                    masData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mm.length; a2++) {
                if (rowData.mm[a2] === this.allPositionCodesResponse[a1].item2) {
                    mmData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.fiat.length; a2++) {
                if (rowData.fiat[a2] === this.allPositionCodesResponse[a1].item2) {
                    fiatData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.tires.length; a2++) {
                if (rowData.tires[a2] === this.allPositionCodesResponse[a1].item2) {
                    tiresData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.mvp.length; a2++) {
                if (rowData.mvp[a2] === this.allPositionCodesResponse[a1].item2) {
                    mvpData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.wiMvp.length; a2++) {
                if (rowData.wiMvp[a2] === this.allPositionCodesResponse[a1].item2) {
                    wiAdvMVPData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.wiTires.length; a2++) {
                if (rowData.wiTires[a2] === this.allPositionCodesResponse[a1].item2) {
                    wiAdvTireData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.ucon.length; a2++) {
                if (rowData.ucon[a2] === this.allPositionCodesResponse[a1].item2) {
                    uconSalesData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.ucon.length; a2++) {
                if (rowData.ucon[a2] === this.allPositionCodesResponse[a1].item2) {
                    uconServiceData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.ucon.length; a2++) {
                if (rowData.ucon[a2] === this.allPositionCodesResponse[a1].item2) {
                    warrantyAdmData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a1 = 0; a1 < this.allPositionCodesResponse.length; a1++) {
            for (var a2 = 0; a2 < rowData.usedReconP.length; a2++) {
                if (rowData.usedReconP[a2] === this.allPositionCodesResponse[a1].item2) {
                    usedReconParticipantData.push(this.allPositionCodesResponse[a1].item1)
                }
            }
        }
        for (var a2 = 0; a2 < this.allPositionCodesResponse.length; a2++) {
            if (rowData.pc == this.allPositionCodesResponse[a2].item2) {
                pcData = this.allPositionCodesResponse[a2].item1;
            }
            if (rowData.el == this.allPositionCodesResponse[a2].item2) {
                elData = this.allPositionCodesResponse[a2].item1;
            }
            if (rowData.usedRecon == this.allPositionCodesResponse[a2].item2) {
                usedReconManagerData = this.allPositionCodesResponse[a2].item1;
            }
        }

        if ((rowData.pmPositionCode != undefined && rowData.pmPositionCode.length > 0) ||
            (this.selectedPMRecordsPCData != undefined && this.selectedPMRecordsPCData.length > 0)) {
            mserData.push("08");
            mmData.push("08");
            masData.push("08");
            // mvpData.push("08");
            // wiAdvMVPData.push("08");
            wiAdvTireData.push("08");
            tiresData.push("08");
        }
        if ((rowData.smPositionCode != undefined && rowData.smPositionCode.length > 0) ||
            (this.selectedSMRecordsPCData != undefined && this.selectedSMRecordsPCData.length > 0)) {
            mserData.push("09");
            mmData.push("09");
            masData.push("09");
            mvpData.push("09");
            wiAdvMVPData.push("09");
            wiAdvTireData.push("09");
            tiresData.push("09");

        }
        this.enrollmentService.saveEnrollmentMaintenanceData(rowData, myPersonalPositionCode, overriddenpositionCodes, mserData,
            masData, mmData, mvpData, fiatData, tiresData, wiAdvMVPData, wiAdvTireData, uconSalesData, uconServiceData, pcData, elData,
            usedReconManagerData, usedReconParticipantData).subscribe(
            (saveEnrollmentMaintenanceDataResponse) => {
                this.saveEnrollmentMaintenanceDataResponse = (saveEnrollmentMaintenanceDataResponse)
                this.msg = "Participant information has been updated successfully.";
                this.clearMessage();
                this.getEnrollmentData();
            },
            (error) => {
                if (error !== undefined && error.length < 250) {
                    this.msg = error;
                } else {
                    this.msg = "Error in updating participant information.";
                }
                this.clearMessage();
                this.getEnrollmentData();
                // alert(error)
            }
            )
    }

    private clearMessage() {
        setTimeout(() => {
            this.msg = "";
        }, 10000)

    }
    cancelNewUserDataDialogue(data) {
        this.displayAddNewUserDialog = false;
    }
    //  getExpresslaneDealer() {
    //     var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    //     this.enrollmentService.getExpresslaneDealer(dealerCode).subscribe(
    //         (expressLaneDealerData) => {
    //             this.expressLaneDealerData = (expressLaneDealerData)
    //             this.isExpresslaneDealer = true;
    //         },f
    //         (error) => {
    //             this.isExpresslaneDealer = false;
    //         }
    //     )
    // }

    openDealerTeam() {
        if (this.dealerTeamButton === 'YES') {
            this.openDealerTeamTable = true;
            this.dealerTeamButton = "NO";
        } else {
            this.openDealerTeamTable = false;
            this.dealerTeamButton = "YES";
        }

    }

    onRowSelect(event) {
        // console.log(event);
        event.data.isEditableR = true;
        this.enableEditable = true;
    }
} 
