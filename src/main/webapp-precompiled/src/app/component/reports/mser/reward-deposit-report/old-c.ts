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
    private bcrewardDeposit: BCRewardDepositInterface = {
        from: "",
        to: "",
        program: "",
        dealerCode: "",
        sid: ""
    }
    private bcProgramName: any = [
        "Mopar Service Excellence Rewards - Used Vehicle Manager",
        "Mopar Service Excellence Rewards- Express Lane",
        "Mopar Service Excellence Rewards- Magneti Marelli",
        "Mopar Service Excellence Rewards- Mopar Accessories",
        "Mopar Service Excellence Rewards- Mopar Parts & Engines",
        "Mopar Service Excellence Rewards- Mopar Vehicle Protection",
        "Mopar Service Excellence Rewards- Parts Counter",
        "Mopar Service Excellence Rewards- UConnect",
        "Mopar Service Excellence Rewards- wiAdvisor",
        "Mopar Service Excellence Rewards- wiAdvisor Tire"
    ];
    private programOptions: SelectItem[] = [];
    private showInputField: boolean = false;

    private showDealerCodeInput: boolean = false;
    private showFromInput: boolean = false;
    private showToInput: boolean = false;
    private showProgramOptionInput: boolean = false;

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
                effects: "slideH",
                easing: "easeInOutCirc",
                type: "jquery"
            },
            defaultTab: "tab1",
            orientation: "horizontal"
        });
        this.viewExecutiveRewardDepositReport();
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

    private createBCProgramOptions() {
        var programOptions: SelectItem[] = []
        for (var i = 0; i < this.bcProgramName.length; i++) {
            programOptions.push({ label: this.bcProgramName[i], value: (this.bcProgramName[i]) });
        }
        this.programOptions = programOptions;
    }

    private showExecutiveRewardDepositReportIframe: boolean = true;
    private showBCRewardDepositReportIframe: boolean = false;
    private showDistrictRewardDepositReportIframe: boolean = false;
    private showDealerRewardDepositReportIframe: boolean = false;
    private showParticicpantRewardDepositReportIframe: boolean = false;
    private showDetailRewardDepositReportIframe: boolean = false;
    private programName: string = "";
    private src: any;
    private bc: string = "";
    private district: string = "";

    private viewExecutiveRewardDepositReport() {
        this.programName = "RewardDepositReward-Executive";
        this.src = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}`;
        this.showExecutiveRewardDepositReportIframe = true;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        console.log(this.src);
    }
    private viewBCRewardDepositReport(from, to, program) {
        console.log(this.bcrewardDeposit.from + " " + this.bcrewardDeposit.to + " " + this.bcrewardDeposit.program);
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = true;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.programName = "RewardDepositReward-BusinessCenter";
        var rdbc = "CA";
        var RDBCFromDate = from;
        var RDBCToDate = to;
        var RDBCPG = program;
        //http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=RewardDepositReward-BusinessCenter&RDBC=CA&RDBCFromDate=2017-07-19&RDBCToDate=2017-09-19&RDBCPG=Mopar%20Service%20Excellence%20Rewards%20-%20Used%20Vehicle%20Manager
        this.src = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDBC=${rdbc}&RDBCFromDate=${RDBCFromDate}&RDBCToDate=${RDBCToDate}&RDBCPG=${RDBCPG}`;
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        console.log(this.src);
    }
    private viewDistrictRewardDepositReport() {
        this.programName = "RewardDepositReport-District";
        var RDD = "CA";
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDPG = this.bcrewardDeposit.program;
        this.src = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDD=${RDD}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}&RDDPG=${RDDPG}`;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = true;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.src)
    }
    private viewDealerRewardDepositReport() {
        this.programName = "RewardDepositreward-Dealer";
        var RDDL = this.bcrewardDeposit.dealerCode;
        var RDDFromDate = this.bcrewardDeposit.from;
        var RDDToDate = this.bcrewardDeposit.to;
        var RDDLPG = this.bcrewardDeposit.program;
        this.src = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}&RDDLPG=${RDDLPG}`;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = true;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewParticicpantRewardDepositReport() {
        var selectedDealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.programName = "RewardDepositReport-Participant";
        this.src = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&rs:Command=Render&DealerCode=${selectedDealerCode}`;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = true;
        this.showDetailRewardDepositReportIframe = false;
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDetailRewardDepositReport() {
        this.programName = "SIDReport";
        this.src = ""
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = true;
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewBCTabOnly() {
        this.createBCProgramOptions();
        this.bcrewardDeposit = {
            from: "",
            to: "",
            program: "",
            dealerCode: "",
            sid: ""


        }
        this.showInputField = true;
        this.showDealerCodeInput = false;
        this.showFromInput = true;
        this.showToInput = true;
        this.showProgramOptionInput = true;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = true;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
    }

    private viewDistrictTabOnly() {
        this.createBCProgramOptions();
        this.bcrewardDeposit = {
            from: "",
            to: "",
            program: "",
            dealerCode: "",
            sid: ""
        }
        this.showInputField = false;
        this.showDealerCodeInput = true;
        this.showFromInput = true;
        this.showToInput = true;
        this.showProgramOptionInput = true;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
    }

    private viewDealerTabOnly() {
        this.createBCProgramOptions();
        this.bcrewardDeposit = {
            from: "",
            to: "",
            program: "",
            dealerCode: "",
            sid: ""
        }
        this.showInputField = true;
        this.showDealerCodeInput = true;
        this.showFromInput = true;
        this.showToInput = true;
        this.showProgramOptionInput = true;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showBCRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showParticicpantRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
    }



    private count = 0;
    private openExecutiveRewardDepositReport() {
        this.count++;
        console.log("EX " + this.count + this.src);
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    private openBCRewardDepositReport() {
        this.count++;
        console.log("BC " + this.count + this.src);
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    private openDistrictRewardDepositReport() {
        this.count++;
        console.log("District " + this.count + this.src);
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    private openDealerRewardDepositReport() {
        this.count++;
        console.log(this.count + this.src);
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    private openParticipantRewardDepositReport() {
        this.count++;
        console.log(this.count + this.src);
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }
    private openDetailRewardDepositReport() {
        this.count++;
        console.log(this.count + this.src);
        return this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);

    }

    private handleChange(event) {
        console.log(event);
    }
}