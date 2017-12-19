import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';


import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'swbc-tire-spin-report',
    templateUrl: './swbc-tire-spin-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class SWBCTireSpinsReportComponent implements OnInit {

    public showBCIFrame: boolean = false;
    public showDISTIFrame: boolean = false;
    public showDealerIFrame: boolean = false;
    public showParticipantIFrame: boolean = false;

    public selectedRole: any;
    public isAdminUser: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public viewBCTab: boolean = false;
    public viewDistrictTab: boolean = false;
    public viewDealerTab: boolean = false;
    public viewParticipantTab: boolean = false;

    public src: any;

    public selectedPositionCode: any = "";
    public msg: string = "";
    public minDate: Date;
    public maxDate: Date;

    public disableDealerInput: boolean = false;
    public disableParticipantInput: boolean = false;
    public selectedDC: string = "";
    public selectedSID: string = "";

    public selectedPeriod: string = "";
    public weekOptions: SelectItem[] = [];
        // { label: "Week1 (01 Oct to 06 Oct)", value: "1" },
        // { label: "Week2 (07 Oct to 13 Oct)", value: "2" },
        // { label: "Week3 (14 Oct to 20 Oct)", value: "3" },
        // { label: "Week4 (21 Oct to 27 Oct)", value: "4" },
        // { label: "Week5 (28 Oct to 03 Nov)", value: "5" },
        // { label: "Week6 (04 Nov to 10 Nov)", value: "6" },
        // { label: "Week7 (11 Nov to 17 Nov)", value: "7" }, 
        // { label: "Week8 (18 Nov to 24 Nov)", value: "8" },
        // { label: "Week9 (25 Nov to 30 Nov)", value: "9" }
    //]

    public tabNumber: any = "";

    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
        this.getPeriods();
        this.checkRole();
        this.renderTab();
        this.squarify();
    }

    public squarify() {
        var containerWidth = $("#report-center").find(".report-item-link").width();
        //adds two pixels to accommodate for the border
        containerWidth = containerWidth + 2;
        var iconSize = containerWidth * .6;
        var fontSize = containerWidth / 7;
        var headingHeight = containerWidth / 6;
        $("#report-center").find(".report").css("height", containerWidth + "px");
        $("#report-center").find(".report-icon").css("font-size", iconSize + "px");
        $("#report-center").find(".report-item-link").css("font-size", fontSize + "px");
        $("#report-center").find(".report-item-link span").css("height" + headingHeight + "px");
    }
    public renderTab() {
        /* jQuery activation and setting options for parent tabs with id selector*/
        $(".tabbed-nav").zozoTabs({
            rounded: false,
            multiline: true,
            theme: "white",
            size: "medium",
            responsive: true,
            animation: {
                effects: "slideH",
                easing: "easeInOutCirc",
                type: "jquery"
            },
            defaultTab: this.tabNumber,
            orientation: "horizontal"
        });
    }
    onResize(event) {
        this.squarify();
        //event.target.innerWidth; // window width
    }

    public getPeriods() {
        this.reportService.getPeriod().subscribe(
            (weekOptions) => {
                this.weekOptions = (weekOptions)
            },
            (error) => {

            }
        )
    }

    public checkRole() {
        this.isAdminUser = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        this.selectedRole = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (this.isAdminUser || this.selectedRole == 1) {
            this.isExecutiveUser = true;
            this.tabNumber = "tab1";
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewBCTabOnly();
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.tabNumber = "tab1";
            this.isBCUser = true;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewBCTabOnly();
        } else if (this.selectedRole == 11) {
            this.isDistrictUser = true;
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.tabNumber = "tab2";
            this.viewBCTab = false;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewDistrictTabOnly();
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.isDealerUser = true;
            this.tabNumber = "tab3";
            this.viewBCTab = false;
            this.viewDistrictTab = false;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.disableDealerInput = true;
            this.selectedDC = dealerCode;
            // this.viewDealerTabOnly();
        } else if (this.selectedRole == 6 || this.selectedRole == 9) {
            var SID = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.isParticipantUser = true;
            this.tabNumber = "tab4";
            this.viewBCTab = false;
            this.viewDistrictTab = false;
            this.viewDealerTab = false;
            this.viewParticipantTab = true;
            this.disableParticipantInput = true;
            this.selectedSID = SID;
            // this.viewParticipantTabOnly();
        }


        this.renderTab();
    }


    public viewBCTabOnly() {
        this.msg = "";
        this.selectedPeriod = "";
        this.showBCIFrame = false;
    }
    public viewDistrictTabOnly() {
        this.msg = "";
        this.selectedPeriod = "";
        this.showDISTIFrame = false;
    }
    public viewDealerTabOnly() {
        this.msg = "";
        this.selectedPeriod = "";
        this.selectedDC = "";
        this.showDealerIFrame = false;
        if (this.isDealerUser) {
            this.selectedDC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        }
    }
    public viewParticipantTabOnly() {
        this.msg = "";
        this.selectedPeriod = "";
        this.selectedSID = "";
        this.showParticipantIFrame = false;
        if (this.isParticipantUser) {
            this.selectedSID = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        }
    }

    private dealerCodesBelongsToThisBCOrDist: any = false;
    private sidBelongsToThisBCOrDist: any = false;
    public getDealerCodeValidation() {
        if (this.isDealerUser) {
            this.viewDealerReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.reportService.getDealerCodeValidation(TERRITORY, this.selectedDC).subscribe(
                (dealerCodesBelongsToThisBCOrDist) => {
                    this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                    this.viewDealerReport();
                },
                (error) => {

                }
            )
        }
    }

    public getSIDValidation() {
        if (this.isParticipantUser) {
            this.viewParticipantReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.reportService.getSIDValidation(TERRITORY, this.selectedSID).subscribe(
                (sidBelongsToThisBCOrDist) => {
                    this.sidBelongsToThisBCOrDist = (sidBelongsToThisBCOrDist)
                    this.viewParticipantReport();
                },
                (error) => {

                }
            )
        }
    }
    public viewBCReport() {
        if (this.selectedPeriod == "") {
            this.showBCIFrame = false;
            this.msg = "Please select week to view the report";
            return;
        }
        this.showBCIFrame = true;
        var programName = "SWBCSipns_BC";
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&Period=${this.selectedPeriod}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictReport() {
        if (this.selectedPeriod == "") {
            this.showDISTIFrame = false;
            this.msg = "Please select week to view the report";
            return;
        }
        if (this.isExecutiveUser) {
            this.showDISTIFrame = true;
            var programName = "SWBCSpins_District";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&District=SW&Period=${this.selectedPeriod}`;
        } else {
            var DISTRICT = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.showDISTIFrame = true;
            var programName = "SWBCSpins_District";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&District=${DISTRICT}&Period=${this.selectedPeriod}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public disableDealerButton: boolean = false;
    public disableParticipantButton: boolean = false;
    public viewDealerReport() {
        if (this.selectedPeriod == "" && this.selectedDC == "") {
            this.showDealerIFrame = false;
            this.msg = "Please select week and Dealer Code to view the report";
            return;
        } else if (this.selectedPeriod != "" && this.selectedDC == "") {
            this.showDealerIFrame = false;
            this.msg = "Please select Dealer Code to view the report";
            return;
        } else if (this.selectedPeriod == "" && this.selectedDC != "") {
            this.showDealerIFrame = false;
            this.msg = "Please select week to view the report";
            return;
        }
        if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
            if (!this.dealerCodesBelongsToThisBCOrDist) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showDealerIFrame = false;
                return;
            } else {
                this.showDealerIFrame = true;

                this.msg = "";
                var programName = "SWBCSpins_Dealer";
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${this.selectedDC}&Period=${this.selectedPeriod}`;
            }
        } else {
            this.msg = "";
            this.showDealerIFrame = true;
            var DEALERCODE980 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var programName = "SWBCSpins_Dealer";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE980}&Period=${this.selectedPeriod}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewParticipantReport() {
        if (this.selectedPeriod == "" && this.selectedSID == "") {
            this.showDealerIFrame = false;
            this.msg = "Please select week and SID to view the report";
            return;
        } else if (this.selectedPeriod != "" && this.selectedSID == "") {
            this.showDealerIFrame = false;
            this.msg = "Please select SID to view the report";
            return;
        } else if (this.selectedPeriod == "" && this.selectedSID != "") {
            this.showDealerIFrame = false;
            this.msg = "Please select week to view the report";
            return;

        } if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser || this.isDealerUser) {
            if (!this.sidBelongsToThisBCOrDist) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showDealerIFrame = false;
                return;
            } else {
                this.msg = "";
                this.showParticipantIFrame = true;
                var programName = "SWBCSpins_Participant";
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&SID=${this.selectedSID}&Period=${this.selectedPeriod}`;
            }
        } else {
            this.msg = "";
            this.showParticipantIFrame = true;
            var programName = "SWBCSpins_Participant";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&SID=${this.selectedSID}&Period=${this.selectedPeriod}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
