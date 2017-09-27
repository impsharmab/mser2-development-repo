import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";


import { SelectItem } from 'primeng/primeng';

import { PCDistributionReportInterface } from './pc-distribution-report.interface';

declare var $: any;

@Component({
    selector: 'pc-distribution-report',
    templateUrl: './pc-distribution-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    // styleUrls: ['./reward-deposit-report.css'] 
})
export class PCDistributionReportComponent implements OnInit {

    private showExecutivePCDistributionReportIframe: boolean = false;
    private showBCDistributionReportIframe: boolean = false;
    private showDistrictPCDistributionReportIframe: boolean = false;
    private showDealerPCDistributionReportIframe: boolean = false;
    private showParticipantPCDistributionReportIframe: boolean = false;
    private showDetailPCDistributionReportIframe: boolean = false;
    private programName: string = "";
    private src: any;
    private selectedProgramList: any = [];
    private pCDistributionReportInterface: PCDistributionReportInterface = {
        from: "9/1/2017",
        to: "9/30/2017",
        bc: "",
        district: ""
    }


    private programOptions: SelectItem[] = [];
    private pCDistributionBCOptions: SelectItem[] = [
        { label: "MA", value: "MA" },
        { label: "DN", value: "DN" },
        { label: "SE", value: "SE" },
        { label: "WE", value: "WE" },
        { label: "SW", value: "SW" },
        { label: "MW", value: "MW" },
        { label: "GL", value: "GL" },
        { label: "CA", value: "CA" },
        { label: "NE", value: "NE" },
    ]
    private pCDistributionDistrictOptions: SelectItem[] = [
        { label: "SE-K", value: "SE-K" },
        { label: "NE-S", value: "NE-S" },
        { label: "SE-A", value: "SE-A" },
        { label: "MW-E", value: "MW-E" }
    ]
    private pCDistributionDealeCodeOptions: SelectItem[] = [
        { label: "05239", value: "05239" },
        { label: "05551", value: "05551" },
        { label: "07203", value: "07203" },
        { label: "07595", value: "07595" }
    ]
    private selectedBCList: any = [];
    private selectedDistrictList: any = [];
    private selectedDealerCodeList: any = [];
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
        this.viewEXTabOnly();
        //   this.createBCProgramOptions();
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

    // // private createBCProgramOptions() {
    // //     var programOptions: SelectItem[] = []
    // //     for (var i = 0; i < this.bcProgramName.length; i++) {
    // //         programOptions.push({ label: this.bcProgramName[i], value: (this.bcProgramName[i]) });
    // //     }
    // //     this.programOptions = programOptions;
    // // }

    private viewEXTabOnly() {
        // this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            district: "",
            bc: ""
        }
    }
    private viewBCTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            district: "",
            bc: ""
        }
        this.selectedBCList = ["MA", "DN", "SE", "WE", "SW", "MW", "GL", "CA", "NE"];
        this.viewBCPCDistributionReport();
    }

    private viewDistrictTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            district: "",
            bc: ""
        }
        this.selectedDistrictList = ["SE-K", "NE-S", "SE-A", "MW-E"];
        this.viewDistrictPCDistributionReport();
    }

    private viewDealerTabOnly() {
        //   this.createBCProgramOptions();
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            district: "",
            bc: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.viewDealerPCDistributionReport();
    }

    private viewParticipantTabOnly() {
        //  this.createBCProgramOptions();
        var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            district: "",
            bc: ""
        }

        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.viewParticipantPCDistributionReport();
    }
    private showExDepositReport() {
        this.showExecutivePCDistributionReportIframe = true;
        this.programName = "PCDistribution_Executive";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewBCPCDistributionReport() {
        this.showBCDistributionReportIframe = true;
        this.programName = "PCDistribution_BusinessCenter";
        var PCDBC = "";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedBCList.length; i++) {
            PCDBC = PCDBC + "&PCDBC=" + this.selectedBCList[i];
        }
        //https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=PCDistributionReward-BusinessCenter&RDBC=CA&RDBCFromDate=2017-07-19&RDBCToDate=2017-09-19&RDBCPG=Mopar%20Service%20Excellence%20Rewards%20-%20Used%20Vehicle%20Manager
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDBC=${PCDBC}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDistrictPCDistributionReport() {
        this.showDistrictPCDistributionReportIframe = true;
        this.programName = "PCDistribution_District";
        var PCDD = "";
        var PCDDFD = this.pCDistributionReportInterface.from;
        var PCDDTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedDistrictList.length; i++) {
            PCDD = PCDD + "&PCDD=" + this.selectedDistrictList[i];
        }
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDD}&PCDDFD=${PCDDFD}&PCDDTD=${PCDDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDealerPCDistributionReport() {
        this.showDealerPCDistributionReportIframe = true;
        this.programName = "PCDistribution_Dealer";
        var PCDDL = "";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedDealerCodeList.length; i++) {
            PCDDL = PCDDL + "&PCDDL=" + this.selectedDealerCodeList[i];
        }
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDDL}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewParticipantPCDistributionReport() {
        this.showParticipantPCDistributionReportIframe = true;
        this.programName = "PCDistribution_DistributionDetails";
        var PCDDLDD = "";
        var PCDDLFD = this.pCDistributionReportInterface.from;
        var PCDDLTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedDealerCodeList.length; i++) {
            PCDDLDD = PCDDLDD + "&PCDDLDD=" + this.selectedDealerCodeList[i];
        }
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDDLDD}&PCDDLFD=${PCDDLFD}&PCDDLTD=${PCDDLTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }


}