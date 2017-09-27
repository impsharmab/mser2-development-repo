import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";


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
    private programName: string = "";
    private src: any;
    private selectedProgramList: any = [];
    private bcrewardDeposit: BCRewardDepositInterface = {
        from: "9/1/2017",
        to: "9/30/2017",
        program: [],
        dealerCode: "",
        sid: ""
    }
    
    private rewardDepositProgramIDOptions: SelectItem[] = [
        { label: "Used Vehicle Manager", value: "15" },
        { label: "Magneti Marelli", value: "2" },
        { label: "Mopar Accessories", value: "3" },
        { label: "Mopar Parts & Engines", value: "4" },
        { label: "Mopar Vehicle Protection", value: "5" },
        { label: "Parts Counter", value: "6" },
        { label: "UConnect", value: "9" },
        { label: "wiAdvisor", value: "7" },
        { label: "wiAdvisor Tire", value: "11" }
    ]
    private programOptions: SelectItem[] = [];
    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        this.squarify();
        /* jQuery activation and setting options for parent tabs with id selector*/
        $(".tabbed-nav").zozoTabs({
            rounded: false,
            multiline: true,
            theme: "white",
            size: "medium",
            responsive: true,
            animation: {
                effects: "fade",
                easing: "easeInOutCirc",
                type: "jquery"
            },
            defaultTab: "tab1",
            orientation: "horizontal"
        });
        this.viewEXTabOnly();
        //  this.createBCProgramOptions();
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

    onResize(event) {
        this.squarify();
        //event.target.innerWidth; // window width
    }

    // private createBCProgramOptions() {
    //     var programOptions: SelectItem[] = []
    //     for (var i = 0; i < this.bcProgramName.length; i++) {
    //         programOptions.push({ label: this.bcProgramName[i], value: (this.bcProgramName[i]) });
    //     }
    //     this.programOptions = programOptions;
    // }

    private viewEXTabOnly() {
        // this.createBCProgramOptions();
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: "9/1/2017",
            to: "9/30/2017",
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
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
            from: "9/1/2017",
            to: "9/30/2017",
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
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
            from: "9/1/2017",
            to: "9/30/2017",
            program: [],
            dealerCode: "",
            sid: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
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
            from: "9/1/2017",
            to: "9/30/2017",
            program: [],
            dealerCode: dealerCode,
            sid: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.viewDealerRewardDepositReport();
    }

    private viewParticipantTabOnly() {
        //  this.createBCProgramOptions();
        var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticipantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.bcrewardDeposit = {
            from: "9/1/2017",
            to: "9/30/2017",
            program: [],
            dealerCode: "",
            sid: sid
        }

        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.viewParticipantRewardDepositReport();
    }
    private showExDepositReport() {
        this.showExecutiveRewardDepositReportIframe = true;
        this.programName = "RewardDepositReward-Executive";
        var RDE = "CA,DN,GL,MA,MW,NE,SE,SW,WE";
        var RDEFromDate = this.bcrewardDeposit.from;
        var RDEToDate = this.bcrewardDeposit.to;
        var RDEPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDEPG = RDEPG + "&RDEPG=" + this.selectedProgramList[i];
        }
        console.log(RDEPG);
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDEFromDate=${RDEFromDate}&RDEToDate=${RDEToDate}${RDEPG}`;
        console.log(this.selectedProgramList);
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewBCRewardDepositReport() {
        this.showBCRewardDepositReportIframe = true;
        this.programName = "RewardDepositReward-BusinessCenter";
        var rdbc = "CA&RDBC=DN&RDBC=GL&RDBC=MA&RDBC=MW&RDBC=NE&RDBC=SE&RDBC=SW&RDBC=WE";
        var RDBCFromDate = this.bcrewardDeposit.from;
        var RDBCToDate = this.bcrewardDeposit.to;
        var RDBCPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDBCPG = RDBCPG + "&RDBCPG=" + this.selectedProgramList[i];
        }
        //https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=RewardDepositReward-BusinessCenter&RDBC=CA&RDBCFromDate=2017-07-19&RDBCToDate=2017-09-19&RDBCPG=Mopar%20Service%20Excellence%20Rewards%20-%20Used%20Vehicle%20Manager
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDBC=${rdbc}&RDBCFromDate=${RDBCFromDate}&RDBCToDate=${RDBCToDate}${RDBCPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDistrictRewardDepositReport() {
        this.showDistrictRewardDepositReportIframe = true;
        this.programName = "RewardDepositReport-District";
        var RDD = "CA";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDPG = "";
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDPG = RDDPG + "&RDDPG=" + this.selectedProgramList[i];
        }
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDealerRewardDepositReport() {
        this.showDealerRewardDepositReportIframe = true;
        this.programName = "RewardDepositreward-Dealer";
        var RDDL = this.bcrewardDeposit.dealerCode;
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDLPG = this.bcrewardDeposit.program;
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDDLPG = RDDLPG + "&RDDLPG=" + this.selectedProgramList[i];
        }
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewParticipantRewardDepositReport() {
        this.showParticipantRewardDepositReportIframe = true;
        this.programName = "RewardDepositReport-Participant";
        var RDP = this.bcrewardDeposit.sid;
        var RDPFromDate = this.bcrewardDeposit.from;
        var RDPToDate = this.bcrewardDeposit.to;
        var RDPPG = this.bcrewardDeposit.program;
        for (var i = 0; i < this.selectedProgramList.length; i++) {
            RDPPG = RDPPG + "&RDPPG=" + this.selectedProgramList[i];
        }
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }


}