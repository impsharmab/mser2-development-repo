import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import * as userMatrix from '../../../../global-variable/user-matrix';

import { SelectItem } from 'primeng/primeng';

import { BCRewardDepositInterface } from './bc-reward-deposit.interface';

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

    private showExecutiveRewardDepositReportIframe: boolean = false;
    private showBCRewardDepositReportIframe: boolean = false;
    private showDistrictRewardDepositReportIframe: boolean = false;
    private showDealerRewardDepositReportIframe: boolean = false;
    private showParticipantRewardDepositReportIframe: boolean = false;
    private showDetailRewardDepositReportIframe: boolean = false;
    private isAdminByPC: boolean = false;
    private programName: string = "";
    private src: any;
    private selectedProgramList: any = [];

    private minDate: Date;
    private maxDate: Date;

    private isAdmin: boolean = false;
    private isExecutive: boolean = false;
    private isNational: boolean = false;
    private isDealer: boolean = false;
    private isBC: boolean = false;
    private isDistrict: boolean = false;
    private isManager: boolean = false;
    private isParticipant: boolean = false;
    private tabNumber: any = "tab1";
    private fromDate: any = "";
    private toDate: any = "";

    private bcrewardDeposit: BCRewardDepositInterface = {
        from: this.fromDate,
        to: this.toDate,
        program: [],
        dealerCode: "",
        sid: ""
    }
    private rewardDepositProgramIDOptions: SelectItem[] = [
        { label: "Used Vehicle Manager", value: "15" },
        { label: "Express Lane", value: "1" },
        { label: "Magneti Marelli", value: "2" },
        { label: "Mopar Accessories", value: "3" },
        { label: "Mopar Parts & Engines", value: "4" },
        { label: "Mopar Vehicle Protection", value: "5" },
        { label: "Parts Counter", value: "6" },
        { label: "UConnect", value: "9" },
        { label: "wiAdvisor", value: "7" },
        { label: "wiAdvisor FRM", value: "17" },
        { label: "wiAdvisor Tire", value: "11" }
    ]

    private programOptions: SelectItem[] = [];
    private selectedPositionCode: any = "";

    private disableDealerCodeInput: boolean = false;
    private disableSIDInput: boolean = false;
    constructor(private domSanitizer: DomSanitizer) { }


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

    private squarify() {
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
    private renderTab() {
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

    private selectedRole: any;
    private isExecutiveUser: boolean = false;
    private isBCUser: boolean = false;
    private isDistrictUser: boolean = false;
    private isDealerUser: boolean = false;
    private isManagerUser: boolean = false;
    private isParticipantUser: boolean = false;

    private checkRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
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

    private showRewardDepositMatrix: boolean = false;
    private rewardDepositMatrix() {
        if (userMatrix.enrollmentFormMatrix.indexOf(this.selectedPositionCode) > -1) {
            this.showRewardDepositMatrix = true;
        } else {
            this.showRewardDepositMatrix = false;
        }
    }
    private viewEXTabOnly() {
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
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.showExDepositReport();
    }
    private viewBCTabOnly() {
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
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.viewBCRewardDepositReport();
    }

    private viewDistrictTabOnly() {
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
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.viewDistrictRewardDepositReport();
    }

    private viewDealerTabOnly() {
        //   this.createBCProgramOptions();
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
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.viewDealerRewardDepositReport();
    }

    private viewParticipantTabOnly() {
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

        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11", "1", "17"];
        this.viewParticipantRewardDepositReport();
    }
    private showExDepositReport() {
        this.showExecutiveRewardDepositReportIframe = true;
        this.programName = "RewardDepositReward-Executive";
        var RDE = "NAT";
        var RDEFromDate = this.bcrewardDeposit.from;
        var RDEToDate = this.bcrewardDeposit.to;
        var RDEPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDEPG = RDEPG + "&RDEPG=" + this.selectedProgramList[i];
        }
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDEFromDate=${RDEFromDate}&RDEToDate=${RDEToDate}${RDEPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewBCRewardDepositReport() {
        this.showBCRewardDepositReportIframe = true;
        this.programName = "RewardDepositReward-BusinessCenter";
        // var RDBC = "CA&RDBC=DN&RDBC=GL&RDBC=MA&RDBC=MW&RDBC=NE&RDBC=SE&RDBC=SW&RDBC=WE";
        var RDBCFromDate = this.bcrewardDeposit.from;
        var RDBCToDate = this.bcrewardDeposit.to;
        var RDBCPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDBCPG = RDBCPG + "&RDBCPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDBC_EX = "NAT";
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDBC=${RDBC_EX}&RDBCFromDate=${RDBCFromDate}&RDBCToDate=${RDBCToDate}${RDBCPG}`;
        } else {
            var RDBC1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDBC=${RDBC1}&RDBCFromDate=${RDBCFromDate}&RDBCToDate=${RDBCToDate}${RDBCPG}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDistrictRewardDepositReport() {
        this.showDistrictRewardDepositReportIframe = true;
        this.programName = "RewardDepositReport-District";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDPG = RDDPG + "&RDDPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDD_EX = "NAT";
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD_EX}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;
        } else if (this.isBCUser) {
            var RDD1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD1}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;

        } else if (this.isDistrictUser) {
            var RDD1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD1}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDealerRewardDepositReport() {
        this.showDealerRewardDepositReportIframe = true;
        this.programName = "RewardDepositreward-Dealer";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDLPG = this.bcrewardDeposit.program;
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDLPG = RDDLPG + "&RDDLPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDDL_EX = "NAT";
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_EX}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isBCUser) {
            var RDDL_BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_BC}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isDistrictUser) {
            var RDDL_DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_DIST}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isDealerUser) {
            this.disableDealerCodeInput = true;
            var RDDL_DEALER = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_DEALER}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewParticipantRewardDepositReport() {
        this.showParticipantRewardDepositReportIframe = true;
        this.programName = "RewardDepositReport-Participant";
        // var RDP = this.bcrewardDeposit.sid;
        var RDPFromDate = this.bcrewardDeposit.from;
        var RDPToDate = this.bcrewardDeposit.to;
        var RDPPG = this.bcrewardDeposit.program;
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDPPG = RDPPG + "&RDPPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDP_EX = "NAT";
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_EX}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isBCUser) {
            var RDP_BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_BC}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isDistrictUser) {
            var RDP_DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_DIST}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isDealerUser) {
            this.disableDealerCodeInput = true;
            var RDP_DEALER = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_DEALER}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        
        } else if (this.isParticipantUser) {
            this.disableSIDInput = true;
            this.bcrewardDeposit.sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            var RDP_PARTICIPANT = this.bcrewardDeposit.sid;
            this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_PARTICIPANT}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }


}