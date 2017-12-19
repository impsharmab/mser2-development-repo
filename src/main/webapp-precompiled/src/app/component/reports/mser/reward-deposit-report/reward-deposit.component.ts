import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { SelectItem } from 'primeng/primeng';
import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';
import * as errorMessage from '../../../../global-variable/error-success-message';
import { BCRewardDepositInterface } from './bc-reward-deposit.interface';
import { ReportService } from "../../../../services/report/report-service";

declare var $: any;

@Component({
    selector: 'reward-deposit-report',
    templateUrl: './reward-deposit-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
})
export class RewardsDepositReportComponent implements OnInit {

    public showExecutiveIframe: boolean = false;
    public showBCIframe: boolean = false;
    public showDistrictIframe: boolean = false;
    public showDealerIframe: boolean = false;
    public showParticipantIframe: boolean = false;
    public showDetailIframe: boolean = false;

    public programName: string = "";
    public src: any;
    public selectedProgramList: any = [];

    public minDate: Date;
    public maxDate: Date;

    public isAdmin: boolean = false;
    public isExecutive: boolean = false;
    public isBC: boolean = false;
    public isDistrict: boolean = false;
    public isDealer: boolean = false;
    public isManager: boolean = false;
    public isParticipant: boolean = false;

    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

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
    public rewardDepositProgramIDOptions: SelectItem[] = []

    public programOptions: SelectItem[] = [];
    public selectedPositionCode: any = "";

    public disableDealerCodeInput: boolean = false;
    public disableSIDInput: boolean = false;

    public dealerCodesBelongsToThisBCOrDist: boolean = false;
    public sidBelongsToThisBCOrDist: boolean = false;

    public sidNotBelongsToThisBCOrDist: string = "";

    constructor(
        private domSanitizer: DomSanitizer,
        private reportService: ReportService,
        private chRef: ChangeDetectorRef
    ) { }


    ngOnInit() {
        this.getReportPrograms();
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
                for (var i = 0; i < this.rewardDepositPrograms.length; i++) {
                    this.selectedProgramList.push(this.rewardDepositPrograms[i].value);
                }
                this.checkRoles()
                this.chRef.detectChanges();
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
        this.chRef.detectChanges();
    }

    public checkRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        if (this.isAdmin) {
            this.tabNumber = "tab1";
            this.isExecutiveUser = true;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isDealer = true;
            this.isManager = true;
            this.isParticipant = true;
            this.viewEXTabOnly();
        }
        else if (role == 1) {
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
            this.bcrewardDeposit.dealerCode = DEALERCODE;
            this.disableDealerCodeInput = true;
            this.isDealerUser = true;
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
        } else if (role == 6 || role == 9) {
            var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.bcrewardDeposit.sid = sid;
            this.disableSIDInput = true;
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
        this.squarify();
        this.renderTab();
    }

    public validateDealerCode() {
        var territory = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        var dc = this.bcrewardDeposit.dealerCode;
        if (dc == "" && this.selectedProgramList.length == 0) {
            this.showDealerIframe=false;
            this.msg = errorMessage.selectProgramAndDealerCode;
            return;
        } else if (dc == "" && this.selectedProgramList.length > 0) {
            this.showDealerIframe=false;
            this.msg = errorMessage.selectDealerCode;
            return;
        } else if (dc != "" && this.selectedProgramList.length == 0) {
            this.msg = errorMessage.selectProgram;
            this.showDealerIframe=false;
            return;
        }
        if (this.isDealerUser || this.isManagerUser) {
            this.dealerCodesBelongsToThisBCOrDist = true;
            this.viewDealer();
        } else {
            this.reportService.getDealerCodeValidation(territory, dc).subscribe(
                (dealerCodesBelongsToThisBCOrDist) => {
                    this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                    this.viewDealer();
                },
                (error) => {
                }
            )
        }
    }

    public validateSID() {
        var territory = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        var sid = this.bcrewardDeposit.sid;
        if (sid == "" && this.selectedProgramList.length == 0) {
            this.msg = errorMessage.enterProgramAndSID;
            this.showParticipantIframe=false;
            return;
        } else if (sid == "" && this.selectedProgramList.length > 0) {
            this.msg = errorMessage.enterSID;
            this.showParticipantIframe=false;
            return;
        } else if (sid != "" && this.selectedProgramList.length == 0) {
            this.msg = errorMessage.selectProgram;
            this.showParticipantIframe=false;
            return;
        }
        if (this.isParticipantUser) {
            this.sidBelongsToThisBCOrDist = true;
            this.viewParticipant();
        } else {
            this.reportService.getSIDValidation(territory, sid).subscribe(
                (sidBelongsToThisBCOrDist) => {
                    this.sidBelongsToThisBCOrDist = (sidBelongsToThisBCOrDist)
                    this.viewParticipant();
                },
                (error) => {
                }
            )
        }
    }

    public viewEXTabOnly() {
        this.msg = "";
        this.sidNotBelongsToThisBCOrDist = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        this.showExecutiveIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate;
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
    }
    public viewBCTabOnly() {
        this.msg = "";
        this.sidNotBelongsToThisBCOrDist = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        this.showBCIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate;
        this.selectedProgramList = [];
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
    }
    public viewDistrictTabOnly() {
        this.msg = "";
        this.sidNotBelongsToThisBCOrDist = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        this.showDistrictIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate;
        this.selectedProgramList = [];
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
    }
    public viewDealerTabOnly() {
        this.msg = "";
        this.sidNotBelongsToThisBCOrDist = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        if (!this.isDealerUser || !this.isManagerUser) {
            this.bcrewardDeposit.dealerCode = "";
        }
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showDealerIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate;
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
    }
    public viewParticipantTabOnly() {
        this.msg = "";
        this.showParticipantIframe = false;
        this.bcrewardDeposit.from = this.fromDate;
        this.bcrewardDeposit.to = this.toDate;
        if (!this.isParticipantUser) {
            this.bcrewardDeposit.sid = "";
        }
        this.selectedProgramList = [];
        for (var i = 0; i < this.rewardDepositProgramIDOptions.length; i++) {
            this.selectedProgramList.push(this.rewardDepositProgramIDOptions[i].value);
        }
    }
    public showExDepositReport() {
        this.programName = "RewardDeposit_Executive";
        var RDE = "NAT";
        var RDEFromDate = this.bcrewardDeposit.from;
        var RDEToDate = this.bcrewardDeposit.to;
        var RDEPG = "";
        if (this.selectedProgramList.length == 0) {
            this.showExecutiveIframe = false;
            this.msg = errorMessage.selectProgram;
            return;
        }
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDEPG = RDEPG + "&RDEPG=" + this.selectedProgramList[i];
        }
        this.showExecutiveIframe = true;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDEFromDate=${RDEFromDate}&RDEToDate=${RDEToDate}${RDEPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewBC() {
        this.programName = "RewardDeposit_BC";
        var RDBCFromDate = this.bcrewardDeposit.from;
        var RDBCToDate = this.bcrewardDeposit.to;
        var RDBCPG = "";
        if (this.selectedProgramList.length == 0) {
            this.showBCIframe = false;
            this.msg = errorMessage.selectProgram;
            return;
        }
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDBCPG = RDBCPG + "&RDBCPG=" + this.selectedProgramList[i];
        }
        this.showBCIframe = true;
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
    public viewDistrict() {
        this.programName = "RewardDeposit_DIST";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDPG = "";
        if (this.selectedProgramList.length == 0) {
            this.showDistrictIframe = false;
            this.msg = errorMessage.selectProgram;
            return;
        }
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDPG = RDDPG + "&RDDPG=" + this.selectedProgramList[i];
        }
        this.showDistrictIframe = true;
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

    public viewDealer() {
        this.msg = "";
        this.dealerCodeNotBelongsToThisBCOrDist = "";
        this.programName = "RewardDeposit_Dealer";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDLPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDLPG = RDDLPG + "&RDDLPG=" + this.selectedProgramList[i];
        }
        // if (this.bcrewardDeposit.dealerCode == "" && this.selectedProgramList.length == 0) {
        //     this.msg = errorMessage.selectProgramAndDealerCode;
        //     this.showDealerIframe = false;
        //     return;
        // } else if (this.bcrewardDeposit.dealerCode == "" && this.selectedProgramList.length > 0) {
        //     this.msg = errorMessage.selectDealerCode;
        //     this.showDealerIframe = false;
        //     return;
        // } else if (this.bcrewardDeposit.dealerCode != "" && this.selectedProgramList.length == 0) {
        //     this.msg = errorMessage.selectProgram;
        //     this.showDealerIframe = false;
        //     return;
        // }
        if (!this.dealerCodesBelongsToThisBCOrDist) {
            this.dealerCodeNotBelongsToThisBCOrDist = errorMessage.dealerCodesNotBelongsToThisBCOrDist;
            this.showDealerIframe = false;
            return;
        }
        this.showDealerIframe = true;
        if (this.isExecutiveUser) {
            var RDDL_EX = this.bcrewardDeposit.dealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL_EX}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isBCUser) {
            var dc = this.bcrewardDeposit.dealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${dc}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        } else if (this.isDistrictUser) {
            var DEALER_CODE = this.bcrewardDeposit.dealerCode;
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
    sidsBelongsToThisDealer;
    public viewParticipant() {
        this.msg = "";
        this.sidNotBelongsToThisBCOrDist = "";
        this.programName = "RewardDeposit_Participant";
        var RDPFromDate = this.bcrewardDeposit.from;
        var RDPToDate = this.bcrewardDeposit.to;
        var RDPPG = "";
        if (!this.sidBelongsToThisBCOrDist) {
            this.sidNotBelongsToThisBCOrDist = errorMessage.dealerCodesNotBelongsToThisBCOrDist;
            this.showParticipantIframe = false;
            return;
        }
        this.showParticipantIframe = true;
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDPPG = RDPPG + "&RDPPG=" + this.selectedProgramList[i];
        }
        if (this.isExecutiveUser) {
            var RDP_EX = this.bcrewardDeposit.sid;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP_EX}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isBCUser) {
            var sid = this.bcrewardDeposit.sid.toUpperCase();
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${sid}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isDistrictUser) {
            var SID = this.bcrewardDeposit.sid.toUpperCase();
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${SID}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        } else if (this.isDealerUser || this.isManagerUser) {
            var SID1 = this.bcrewardDeposit.sid.toUpperCase();
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