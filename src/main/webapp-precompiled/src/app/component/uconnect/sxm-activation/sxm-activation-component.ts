import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import * as userMatrix from '../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../global-variable/service-url';

import { SelectItem } from 'primeng/primeng';

import { BCRewardDepositInterface } from '../../reports/mser/reward-deposit-report/bc-reward-deposit.interface';

import { ReportService } from "../../../services/report/report-service";
declare var $: any;

@Component({
    selector: 'reward-deposit-report',
    templateUrl: './sxm-activation-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    // styleUrls: ['./reward-deposit-report.css'] 
})
export class SxmActivationReportComponent implements OnInit {

    showExecutiveIframe: boolean = false;
    showBCIframe: boolean = false;
    showDistrictIframe: boolean = false;
    showDealerIframe: boolean = false;
    showParticipantIframe: boolean = false;
    showDetailIframe: boolean = false;
    isAdminByPC: boolean = false;
    programName: string = "";
    src: any;
    selectedProgramList: any = [];

    minDate: Date;
    maxDate: Date;

    isAdmin: boolean = false;
    isExecutive: boolean = false;
    isNational: boolean = false;
    isDealer: boolean = false;
    isBC: boolean = false;
    isDistrict: boolean = false;
    isManager: boolean = false;
    isParticipant: boolean = false;
    tabNumber: any = "tab1";
    fromDate: any = "";
    toDate: any = "";

    bc: BCRewardDepositInterface = {
        from: this.fromDate,
        to: this.toDate,
        program: [],
        dealerCode: "",
        sid: ""
    }
    ProgramIDOptions: SelectItem[] = [
        { label: "Used Vehicle Manager", value: "15" },
        { label: "Express Lane", value: "1" },
        { label: "Magneti Marelli", value: "2" },
        { label: "Mopar Upfits", value: "3" },
        { label: "Mopar Parts & Engines", value: "4" },
        { label: "Mopar Vehicle Protection", value: "5" },
        { label: "Parts Counter", value: "6" },
        { label: "UConnect", value: "9" },
        { label: "wiAdvisor", value: "7" },
        { label: "wiAdvisor FRM", value: "17" },
        { label: "wiAdvisor Tire", value: "11" }
    ]

    programOptions: SelectItem[] = [];
    selectedPositionCode: any = "";

    disableDealerCodeInput: boolean = false;
    disableSIDInput: boolean = false;
    constructor(
        private domSanitizer: DomSanitizer,
        private reportService: ReportService
    ) { }


    ngOnInit() {
        // this.squarify();
        // this.renderTab();
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();

        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(today.getFullYear() - 1);
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        this.checkRoles();

    }

    squarify() {
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
    renderTab() {
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

    selectedRole: any;
    isExecutiveUser: boolean = false;
    isBCUser: boolean = false;
    isDistrictUser: boolean = false;
    isDealerUser: boolean = false;
    isManagerUser: boolean = false;
    isParticipantUser: boolean = false;

    checkRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (this.isAdmin || role == 1) {
            this.isExecutiveUser = true;
            this.tabNumber = "tab1";
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewEXTabOnly();
        } else if (role == 12) {
            this.isBCUser = true;
            this.tabNumber = "tab2";
            this.isExecutive = false;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewBCTabOnly();
        } else if (role == 11) {
            this.isDistrictUser = true;
            this.tabNumber = "tab3";
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDistrictTabOnly();
        } else if (role == 5 || role == 10) {
            var DEALERCODE = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.disableDealerCodeInput = true;
            this.bc.dealerCode = DEALERCODE;
            this.isManagerUser = true;
            this.isDealerUser = true;
            this.tabNumber = "tab4";
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDealerTabOnly();
        } else if (role == 6 || role == 9) {
            this.bc.sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.disableSIDInput = true;
            this.isParticipantUser = true;
            this.tabNumber = "tab5";
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = false;
            this.isParticipant = true;
            this.viewParticipantTabOnly();
        }
        this.squarify();
        this.renderTab();
    }

    displayDealerReportWODealerCode: boolean = false;
    dealerCodesBelongsToThisBCOrDist: boolean = false;

    getDealerCodeValidation() {
        if (this.isDealerUser) {
            this.viewDealerReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            if (this.bc.dealerCode == "") {
                this.displayDealerReportWODealerCode = true;
                this.msg = "";
                this.viewDealerReport();
            } else {
                this.displayDealerReportWODealerCode = false;
                this.reportService.getDealerCodeValidation(TERRITORY, this.bc.dealerCode).subscribe(
                    (dealerCodesBelongsToThisBCOrDist) => {
                        this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                        if (!this.dealerCodesBelongsToThisBCOrDist) {
                            this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                            this.showDealerIframe = false;
                            return;
                        } else {
                            this.msg = "";
                            this.viewDealerReport();
                        }
                    },
                    (error) => {

                    }
                )
            }

        }
    }
    sidBelongsToThisBCOrDist: boolean = false;
    getSIDValidation() {
        if (this.isParticipantUser) {
            this.viewParticipantReport();
        } else {
            if (this.bc.sid == "") {
                this.msg = "Please enter SID  to view the report "
                this.showParticipantIframe = false;
                return;
            }
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.reportService.getSIDValidation(TERRITORY, this.bc.sid).subscribe(
                (sidBelongsToThisBCOrDist) => {
                    this.sidBelongsToThisBCOrDist = (sidBelongsToThisBCOrDist)
                    if (!this.sidBelongsToThisBCOrDist) {
                        this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                        this.showParticipantIframe = false;
                        return;
                    } else {
                        this.msg = "";
                        this.viewParticipantReport();
                    }

                },
                (error) => {

                }
            )
        }
    }
    viewEXTabOnly() {
        this.showExecutiveIframe = false;
        this.bc.from = this.fromDate;
        this.bc.to = this.toDate
    }
    viewBCTabOnly() {
        this.showBCIframe = false;
        this.bc.from = this.fromDate;
        this.bc.to = this.toDate
    }
    viewDistrictTabOnly() {
        this.showDistrictIframe = false;
        this.bc.from = this.fromDate;
        this.bc.to = this.toDate
    }
    viewDealerTabOnly() {
        this.msg = "";
        this.showParticipantIframe = false;
        this.bc.from = this.fromDate;
        this.bc.to = this.toDate
    }
    viewParticipantTabOnly() {
        this.msg = "";
        this.showDetailIframe = false;
        this.bc.from = this.fromDate;
        this.bc.to = this.toDate
    }
    showExDepositReport() {
        this.showExecutiveIframe = true;
        this.programName = "SXM-Executive";
        var SXMFD = this.bc.from;
        var SXMTD = this.bc.to;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    viewBCReport() {
        this.showBCIframe = true;
        this.programName = "SXM_BusinessCenter";
        var SXMFD = this.bc.from;
        var SXMTD = this.bc.to;
        var BC = "NAT";
        if (!this.isExecutiveUser) {
            BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        }
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&BC=${BC}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    viewDistrictReport() {
        this.showDistrictIframe = true;
        this.programName = "SXM-District";
        var District = "NAT";
        if (this.isExecutiveUser) {
            District = "NAT";
        } else if (this.isBCUser) {
            District = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (this.isDistrictUser) {
            District = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        }
        var SXMFD = this.bc.from;
        var SXMTD = this.bc.to;

        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&District=${District}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    dealerCodeNotBelongsToThisBCOrDist: string = "";
    msg: string = "";
    viewDealerReport() {
        var SXMFD = this.bc.from;
        var SXMTD = this.bc.to;
        var programName = "SXM-Dealer";
        if (this.displayDealerReportWODealerCode) {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
                this.showDealerIframe = true;
                // this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&DealerCode=${TERRITORY}`;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&Dealercode=${TERRITORY}`;
            }
            console.log(this.src);
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        } else {
            if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
                this.showDealerIframe = true;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&Dealercode=${this.bc.dealerCode}`;
            } else if (this.isDealerUser) {
                this.msg = "";
                this.showDealerIframe = true;
                var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&Dealercode=${DEALERCODE123}`;
            }
            console.log(this.src);
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        }

    }
    sidNotBelongsToThisBC: string = "";
    viewParticipantReport() {
        this.showParticipantIframe = true;
        this.programName = "SXm-participant";
        // var RDP = this.bc.sid;
        var SXMFD = this.bc.from;
        var SXMTD = this.bc.to;
        var sid = this.bc.sid;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&SID=${sid}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}