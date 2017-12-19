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

    public showExecutiveRewardDepositReportIframe: boolean = false;
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

    public bcrewardDeposit: BCRewardDepositInterface = {
        from: this.fromDate,
        to: this.toDate,
        program: [],
        dealerCode: "",
        sid: ""
    }
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
            // this.getDealerCodesBelongsToBCAndDIST("NAT");
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
            // this.getDealerCodesBelongsToBCAndDIST(RDDL_BC);
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
            // this.getDealerCodesBelongsToBCAndDIST(DIST);
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
        } else if (role == 5 || role == 10) {
            var DEALERCODE = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getParticipantsByDealer(DEALERCODE);
            this.isManagerUser = true;
            this.isDealerUser = true;
            this.tabNumber = "tab4";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = true;
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
        this.showExecutiveRewardDepositReportIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate
    }
    public viewBCTabOnly() {
        this.showBCRewardDepositReportIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate
    }
    public viewDistrictTabOnly() {
        this.showDistrictRewardDepositReportIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate
    }
    public viewDealerTabOnly() {
        this.msg = "";
        this.showParticipantRewardDepositReportIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate    }
    public viewParticipantTabOnly() {
        this.msg = "";
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate
        if(this.isParticipantUser){
            this.disableSIDInput = true;
            this.bcrewardDeposit.sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        }
    }
    public showExDepositReport() {
        this.showExecutiveRewardDepositReportIframe = true;
        this.programName = "SXM-Executive";
        var SXMFD = this.bcrewardDeposit.from;
        var SXMTD = this.bcrewardDeposit.to;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    public viewBCRewardDepositReport() {
        this.showBCRewardDepositReportIframe = true;
        this.programName = "SXM_BusinessCenter";
        var SXMFD = this.bcrewardDeposit.from;
        var SXMTD = this.bcrewardDeposit.to;
        var BC = "NAT";
        if (!this.isExecutiveUser) {
            BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        }
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&BC=${BC}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictRewardDepositReport() {
        this.showDistrictRewardDepositReportIframe = true;
        this.programName = "SXM-District";
        var District = "NAT";
        if (this.isExecutiveUser) {
            District = "NAT";
        } else if (this.isBCUser) {
            District = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (this.isDistrictUser) {
            District = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        }
        var SXMFD = this.bcrewardDeposit.from;
        var SXMTD = this.bcrewardDeposit.to;

        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&District=${District}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public dealerCodeNotBelongsToThisBCOrDist: string = "";
    public msg: string = "";
    public viewDealerRewardDepositReport() {
        this.msg = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        this.showDealerRewardDepositReportIframe = true;
        this.programName = "SXM-Dealer";
        var SXMFD = this.bcrewardDeposit.from;
        var SXMTD = this.bcrewardDeposit.to;
        // var dealerCode = "";

        // if (this.isExecutiveUser) {
        //     if (this.bcrewardDeposit.dealerCode == "") {
        //         this.msg = "Please enter Dealer Code to view the report";
        //         this.showDealerRewardDepositReportIframe = false;
        //         return;
        //     } else if (this.bcrewardDeposit.dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(this.bcrewardDeposit.dealerCode) <= -1) {
        //         this.dealerCodeNotBelongsToThisBCOrDist = "The information entered is invalid.  Please change your search criteria and try again.";
        //         this.showDealerRewardDepositReportIframe = false;
        //     }
        //     dealerCode = this.bcrewardDeposit.dealerCode;
        // } else if (this.isBCUser) {
        //     // var RDDL_BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
        //     dealerCode = this.bcrewardDeposit.dealerCode;
        //     // this.getDealerCodesBelongsToBCAndDIST(RDDL_BC);
        //     if (dealerCode == "") {
        //         this.showDealerRewardDepositReportIframe = false;
        //         this.msg = "Please enter Dealer Code to view the report";
        //         return;
        //     }
        //     else if (dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dealerCode) <= -1) {
        //         this.dealerCodeNotBelongsToThisBCOrDist = "The information entered is invalid.  Please change your search criteria and try again.";
        //         this.showDealerRewardDepositReportIframe = false;
        //     } else {
        //         this.dealerCodeNotBelongsToThisBCOrDist = "";
        //     }
        // } else if (this.isDistrictUser) {
        //     // var RDDL_DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        //     dealerCode = this.bcrewardDeposit.dealerCode;
        //     // this.getDealerCodesBelongsToBCAndDIST(RDDL_DIST);
        //     if (dealerCode == "") {
        //         this.showDealerRewardDepositReportIframe = false;
        //         this.msg = "Please enter Dealer Code to view the report";
        //         return;
        //     } else if (dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dealerCode) <= -1) {
        //         this.dealerCodeNotBelongsToThisBCOrDist = "The information entered is invalid.  Please change your search criteria and try again.";
        //         this.showDealerRewardDepositReportIframe = false;
        //     } else {
        //         this.dealerCodeNotBelongsToThisBCOrDist = "";
        //         this.showDealerRewardDepositReportIframe = true;
        //     }
        // } else if (this.isDealerUser || this.isManagerUser) {
        //     this.disableDealerCodeInput = true;
        //     dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        //     this.bcrewardDeposit.dealerCode = dealerCode;
        // }
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&Dealercode=${dealerCode}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public sidNotBelongsToThisBC: string = "";
    public viewParticipantRewardDepositReport() {
        this.showParticipantRewardDepositReportIframe = true;
        this.programName = "SXm-participant";
        // var RDP = this.bcrewardDeposit.sid;
        var SXMFD = this.bcrewardDeposit.from;
        var SXMTD = this.bcrewardDeposit.to;
        var dealerCode = this.bcrewardDeposit.dealerCode;
        var sid = this.bcrewardDeposit.sid.toUpperCase();
        if (this.isExecutiveUser) {
            if (sid == "") {
                this.msg = "Please enter SID to view the report.";
                this.showParticipantRewardDepositReportIframe = false;
                return;
            }
        } else if (this.isBCUser) {
            if (sid == "") {
                this.msg = "Please enter SID to view the report."
                this.showParticipantRewardDepositReportIframe = false;
                return;
            } else if (sid != "" && this.sidsBelongsToThisDealer.indexOf(sid) <= -1) {
                this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showParticipantRewardDepositReportIframe = false;
            }
        } else if (this.isDistrictUser) {
            if (sid == "") {
                this.msg = "Please enter SID to view the report."
                this.showParticipantRewardDepositReportIframe = false;
                return;
            } else if (sid != "" && this.sidsBelongsToThisDealer.indexOf(sid) <= -1) {
                this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showParticipantRewardDepositReportIframe = false;
            }
        } else if (this.isDealerUser || this.isManagerUser) {
            if (sid == "") {
                this.msg = "Please enter SID to view the report."
                this.showParticipantRewardDepositReportIframe = false;
                return;
            } else if (sid != "" && this.sidsBelongsToThisDealer.indexOf(sid) <= -1) {
                this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showParticipantRewardDepositReportIframe = false;
            }
        } else if (this.isParticipantUser) {
            this.disableSIDInput = true;
            this.bcrewardDeposit.sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            sid = this.bcrewardDeposit.sid;
        }
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&SXMFD=${SXMFD}&SXMTD=${SXMTD}&SID=${sid}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }


}