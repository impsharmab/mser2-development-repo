import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';

import { SelectItem } from 'primeng/primeng';

import { BCRewardDepositInterface } from './bc-reward-deposit.interface';

import { ReportService } from "../../../../services/report/report-service";
declare var $: any;

@Component({
    selector: 'reward-deposit-report',
    templateUrl: './reward-deposit-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    // styleUrls: ['./reward-deposit-report.css'] 
})
export class RewardsDepositReportComponent implements OnInit {

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
        // { label: "Used Vehicle Manager", value: "15" },
        // { label: "Express Lane", value: "1" },
        // { label: "Magneti Marelli", value: "2" },
        // { label: "Mopar Upfits", value: "3" },
        // { label: "Mopar Parts & Engines", value: "4" },
        // { label: "Mopar Vehicle Protection", value: "5" },
        // { label: "Parts Counter", value: "6" },
        // { label: "UConnect", value: "9" },
        // { label: "wiAdvisor", value: "7" },
        // { label: "wiAdvisor FRM", value: "17" },
        // { label: "wiAdvisor Tire", value: "11" }
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
        this.getReportPrograms();
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
    public rewardDepositPrograms: any = [];
    public getReportPrograms() {
        this.reportService.getReportPrograms("RewardDepositPrograms").subscribe(
            (rewardDepositPrograms) => {
                this.rewardDepositPrograms = (rewardDepositPrograms)
                this.createRewardDepositProgramOptions();
            },
            (error) => {
            }
        )
    }

    public createRewardDepositProgramOptions() {
        var rewardDepositProgramIDOptions: SelectItem[] = [];
        for (var i = 0; i < this.rewardDepositPrograms.length; i++) {
            rewardDepositProgramIDOptions.push({ label: this.rewardDepositPrograms[i].name, value: this.rewardDepositPrograms[i].value })
        }
        this.rewardDepositProgramIDOptions = rewardDepositProgramIDOptions;
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
       
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
    public showRewardDepositMatrix: boolean = false;
    public rewardDepositMatrix() {
        if (userMatrix.enrollmentFormMatrix.indexOf(this.selectedPositionCode) > -1) {
            this.showRewardDepositMatrix = true;
        } else {
            this.showRewardDepositMatrix = false;
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
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: this.fromDate,
            to: this.toDate,
            program: [],
            dealerCode: "",
            sid: ""
        }
        // this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
        this.showExDepositReport();
    }
    public viewBCTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: this.fromDate,
            to: this.toDate,
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
        // this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.viewBCRewardDepositReport();
    }
    public viewDistrictTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: this.fromDate,
            to: this.toDate,
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
        // this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.viewDistrictRewardDepositReport();
    }
    public viewDealerTabOnly() {
        this.msg = "";
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: this.fromDate,
            to: this.toDate,
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
        // this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        if (this.isDealerUser || this.isManagerUser) {
            this.viewDealerRewardDepositReport();
        }

    }
    public viewParticipantTabOnly() {
        this.msg = "";
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: this.fromDate,
            to: this.toDate,
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
        // this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];

        if (this.isParticipantUser) {
            this.viewParticipantRewardDepositReport();
        }

    }
    public showExDepositReport() {
        this.showExecutiveRewardDepositReportIframe = true;
        this.programName = "RewardDeposit_Executive";
        var RDE = "NAT";
        var RDEFromDate = this.bcrewardDeposit.from;
        var RDEToDate = this.bcrewardDeposit.to;
        var RDEPG = "";

        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDEPG = RDEPG + "&RDEPG=" + this.selectedProgramList[i];
        }
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDEFromDate=${RDEFromDate}&RDEToDate=${RDEToDate}${RDEPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewBCRewardDepositReport() {
        this.showBCRewardDepositReportIframe = true;
        this.programName = "RewardDeposit_BC";
        // var RDBC = "CA&RDBC=DN&RDBC=GL&RDBC=MA&RDBC=MW&RDBC=NE&RDBC=SE&RDBC=SW&RDBC=WE";
        var RDBCFromDate = this.bcrewardDeposit.from;
        var RDBCToDate = this.bcrewardDeposit.to;
        var RDBCPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDBCPG = RDBCPG + "&RDBCPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDBC_EX = "NAT";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDBC=${RDBC_EX}&RDBCFromDate=${RDBCFromDate}&RDBCToDate=${RDBCToDate}${RDBCPG}`;
        } else {
            var RDBC1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDBC=${RDBC1}&RDBCFromDate=${RDBCFromDate}&RDBCToDate=${RDBCToDate}${RDBCPG}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictRewardDepositReport() {
        this.showDistrictRewardDepositReportIframe = true;
        this.programName = "RewardDeposit_DIST";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDPG = RDDPG + "&RDDPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDD_EX = "NAT";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD_EX}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;
        } else if (this.isBCUser) {
            var RDD1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD1}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;

        } else if (this.isDistrictUser) {
            var RDD1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD1}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public dealerCodeNotBelongsToThisBCOrDist: string = "";
    public msg: string = "";
    public viewDealerRewardDepositReport() {
        this.msg = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        this.showDealerRewardDepositReportIframe = true;
        this.programName = "RewardDeposit_Dealer";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDLPG = this.bcrewardDeposit.program;

        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDLPG = RDDLPG + "&RDDLPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            if (this.bcrewardDeposit.dealerCode == "") {
                this.msg = "Please enter Dealer Code to view the report";
                this.showDealerRewardDepositReportIframe = false;
                return;
            } else if (this.bcrewardDeposit.dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(this.bcrewardDeposit.dealerCode) <= -1) {
                this.dealerCodeNotBelongsToThisBCOrDist = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showDealerRewardDepositReportIframe = false;
            }
            var RDDL_EX = this.bcrewardDeposit.dealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_EX}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isBCUser) {
            // var RDDL_BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
            var dc = this.bcrewardDeposit.dealerCode;
            // this.getDealerCodesBelongsToBCAndDIST(RDDL_BC);
            if (dc == "") {
                this.showDealerRewardDepositReportIframe = false;
                this.msg = "Please enter Dealer Code to view the report";
                return;
            }
            else if (dc != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dc) <= -1) {
                this.dealerCodeNotBelongsToThisBCOrDist = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showDealerRewardDepositReportIframe = false;
            } else {
                this.dealerCodeNotBelongsToThisBCOrDist = "";
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${dc}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isDistrictUser) {
            // var RDDL_DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var DEALER_CODE = this.bcrewardDeposit.dealerCode;
            // this.getDealerCodesBelongsToBCAndDIST(RDDL_DIST);
            if (DEALER_CODE == "") {
                this.showDealerRewardDepositReportIframe = false;
                this.msg = "Please enter Dealer Code to view the report";
                return;
            } else if (DEALER_CODE != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALER_CODE) <= -1) {
                this.dealerCodeNotBelongsToThisBCOrDist = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showDealerRewardDepositReportIframe = false;
            } else {
                this.dealerCodeNotBelongsToThisBCOrDist = "";
                this.showDealerRewardDepositReportIframe = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${DEALER_CODE}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isDealerUser || this.isManagerUser) {
            this.disableDealerCodeInput = true;
            var RDDL_DEALER = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.bcrewardDeposit.dealerCode = RDDL_DEALER;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_DEALER}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public sidNotBelongsToThisBC: string = "";
    public viewParticipantRewardDepositReport() {
        this.showParticipantRewardDepositReportIframe = true;
        this.programName = "RewardDeposit_Participant";
        // var RDP = this.bcrewardDeposit.sid;
        var RDPFromDate = this.bcrewardDeposit.from;
        var RDPToDate = this.bcrewardDeposit.to;
        var RDPPG = this.bcrewardDeposit.program;
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDPPG = RDPPG + "&RDPPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            if (this.bcrewardDeposit.sid == "") {
                this.msg = "Please enter SID to view the report.";
                this.showParticipantRewardDepositReportIframe = false;
                return;
                // } else if (sid != "" && this.sidsBelongsToThisDealer.indexOf(sid) <= -1) {
                //     this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                //     this.showParticipantRewardDepositReportIframe = false;
                // 
            }
            var RDP_EX = this.bcrewardDeposit.sid;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_EX}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isBCUser) {
            // var RDP_BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
            var sid = this.bcrewardDeposit.sid;
            // this.getParticipantsByDealer(RDP_BC);
            if (sid == "") {
                this.msg = "Please enter SID to view the report."
                this.showParticipantRewardDepositReportIframe = false;
                return;
            } else if (sid != "" && this.sidsBelongsToThisDealer.indexOf(sid) <= -1) {
                this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showParticipantRewardDepositReportIframe = false;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${sid}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isDistrictUser) {
            // var RDP_DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var SID = this.bcrewardDeposit.sid;
            // this.getParticipantsByDealer(RDP_DIST);
            if (SID == "") {
                this.msg = "Please enter SID to view the report."
                this.showParticipantRewardDepositReportIframe = false;
                return;
            } else if (SID != "" && this.sidsBelongsToThisDealer.indexOf(SID) <= -1) {
                this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showParticipantRewardDepositReportIframe = false;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${SID}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isDealerUser || this.isManagerUser) {
            // var RDP_DEALER = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var SID1 = this.bcrewardDeposit.sid;
            // this.getParticipantsByDealer(RDP_DEALER);
            if (SID1 == "") {
                this.msg = "Please enter SID to view the report."
                this.showParticipantRewardDepositReportIframe = false;
                return;
            } else if (SID1 != "" && this.sidsBelongsToThisDealer.indexOf(SID1) <= -1) {
                this.sidNotBelongsToThisBC = "The information entered is invalid.  Please change your search criteria and try again.";
                this.showParticipantRewardDepositReportIframe = false;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${SID1}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;

        } else if (this.isParticipantUser) {
            this.disableSIDInput = true;
            this.bcrewardDeposit.sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            var RDP_PARTICIPANT = this.bcrewardDeposit.sid;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_PARTICIPANT}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }


}