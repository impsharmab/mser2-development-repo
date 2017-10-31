import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import * as userMatrix from '../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../global-variable/service-url';

import { SelectItem } from 'primeng/primeng';

import { ReportService } from "../../../services/report/report-service";
declare var $: any;

@Component({
    selector: 'sxm-activation-report',
    templateUrl: './sxm-activation-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class SxmActivationReportComponent implements OnInit {
    public showExecutiveReport: boolean = false;
    public showBCRewardDepositReportIframe: boolean = false;
    public showDistrictRewardDepositReportIframe: boolean = false;
    public showDealerRewardDepositReportIframe: boolean = false;
    public showParticipantRewardDepositReportIframe: boolean = false;
    public showDetailRewardDepositReportIframe: boolean = false;
    public isAdminByPC: boolean = false;
    public programName: string = "";
    public src: any;
    public selectedProgramList: any = [];

    public minDate: Date;
    public maxDate: Date;

    public isAdmin: boolean = false;
    public isExecutive: boolean = false;
    public isNational: boolean = false;
    public isDealer: boolean = false;
    public isBC: boolean = false;
    public isDistrict: boolean = false;
    public isManager: boolean = false;
    public isParticipant: boolean = false;
    public tabNumber: any = "tab1";
    public fromDate: any = "";
    public toDate: any = "";

    public rewardDepositProgramIDOptions: SelectItem[] = [
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

    public programOptions: SelectItem[] = [];
    public selectedPositionCode: any = "";

    public disableDealerCodeInput: boolean = false;
    public disableSIDInput: boolean = false;
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
        this.minDate.setFullYear(today.getFullYear());
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        if (this.isAdmin) {
            this.getDealerCodesBelongsToBCAndDIST("NAT");
            this.getParticipantsByDealer("NAT");
            this.tabNumber = "tab1";
            this.isAdminByPC = true;
            this.isExecutiveUser = true;
            this.isNational = true;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isDealer = true;
            this.isManager = true;
            this.isParticipant = true;
            this.viewEXTabOnly();
        } else {
            this.checkRoles();
        }
        this.squarify();
        this.renderTab();
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

    public selectedRole: any;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public checkRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
            this.getDealerCodesBelongsToBCAndDIST("NAT");
            this.getParticipantsByDealer("NAT");
            this.isExecutiveUser = true;
            this.tabNumber = "tab1";
            this.isAdmin = false;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewEXTabOnly();
        } else if (role == 12) {
            var RDDL_BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getDealerCodesBelongsToBCAndDIST(RDDL_BC);
            this.getParticipantsByDealer(RDDL_BC);
            this.isBCUser = true;
            this.tabNumber = "tab2";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewBCTabOnly();
        } else if (role == 11) {
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getDealerCodesBelongsToBCAndDIST(DIST);
            this.getParticipantsByDealer(DIST);
            this.isDistrictUser = true;
            this.tabNumber = "tab3";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDistrictTabOnly();
        } else if (role == 5) {
            var DEALERCODE = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getParticipantsByDealer(DEALERCODE);
            this.isManagerUser = true;
            this.tabNumber = "tab4";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDealerTabOnly();
        } else if (role == 10) {
            var DEALERCODE1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getParticipantsByDealer(DEALERCODE1);
            this.isDealerUser = true;
            this.tabNumber = "tab4";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDealerTabOnly();
        } else if (role == 6 || role == 9) {
            this.isParticipantUser = true;
            this.tabNumber = "tab5";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = false;
            this.isParticipant = true;
            this.viewParticipantTabOnly();
        }
    }
    public dealerCodesBelongsToThisBCOrDist: any = [];
    private getDealerCodesBelongsToBCAndDIST(bcOrDist) {
        this.reportService.getDealerCodesBelongsToBCAndDIST(bcOrDist).subscribe(
            (dealerCodesBelongsToThisBCOrDist) => {
                this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                console.log(this.dealerCodesBelongsToThisBCOrDist);
            },
            (error) => {
            }
        )
    }

    public sidsBelongsToThisDealer: any = [];
    private getParticipantsByDealer(sid) {
        this.reportService.getParticipantsByDealer(sid).subscribe(
            (sidsBelongsToThisDealer) => {
                this.sidsBelongsToThisDealer = (sidsBelongsToThisDealer)
                console.log(this.sidsBelongsToThisDealer);
            },
            (error) => {
            }
        )
    }
    public viewEXTabOnly() {
        // this.createBCProgramOptions();
        this.showExecutiveReport = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.pullExReport();
        //this.showExDepositReport();
    }
    public viewBCTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutiveReport = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        //this.viewBCRewardDepositReport();
    }
    public viewDistrictTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutiveReport = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        //this.viewDistrictRewardDepositReport();
    }
    public viewDealerTabOnly() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutiveReport = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        if (this.isDealerUser || this.isManagerUser) {
            //this.viewDealerRewardDepositReport();
        }

    }
    public viewParticipantTabOnly() {
        this.showExecutiveReport = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        if (this.isParticipantUser) {
            //this.viewParticipantRewardDepositReport();
        }

    }

    public reportFrom: string;
    public reportTo: string;
    public pullExReport() {
        this.showExecutiveReport = true;
        this.programName = "SXMSummary";
        var RDE = "NAT";
        var RDEFromDate = this.reportFrom != undefined ? this.reportFrom : this.fromDate;
        var RDEToDate = this.reportTo != undefined ? this.reportFrom : this.toDate;
        var RDEPG = "";

        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDEPG = RDEPG + "&RDEPG=" + this.selectedProgramList[i];
        }
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&StartDate=${RDEFromDate}&EndDate=${RDEToDate}&Parent=NAT&IncentiveID=1016&IncentiveSubCodeID=876`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public showExDepositReport() {
        this.showExecutiveReport = true;
        this.programName = "RewardDeposit_Executive";
        var RDE = "NAT";
        var RDEFromDate = this.reportFrom != undefined ? this.reportFrom : this.fromDate;
        var RDEToDate = this.reportTo != undefined ? this.reportFrom : this.toDate;
        var RDEPG = "";

        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDEPG = RDEPG + "&RDEPG=" + this.selectedProgramList[i];
        }
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDEFromDate=${RDEFromDate}&RDEToDate=${RDEToDate}${RDEPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public iframeLoaded: boolean = false;
    public funcIframeLoaded(evt) {
        if (evt.target.src != '') {
            this.iframeLoaded = true;
        }
    }

}