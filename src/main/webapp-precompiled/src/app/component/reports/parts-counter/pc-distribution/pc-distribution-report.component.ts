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

    public showExecutivePCDistributionReportIframe: boolean = false;
    public showBCDistributionReportIframe: boolean = false;
    public showDistrictPCDistributionReportIframe: boolean = false;
    public showDealerPCDistributionReportIframe: boolean = false;
    public showParticipantPCDistributionReportIframe: boolean = false;
    public showDetailPCDistributionReportIframe: boolean = false;
    public programName: string = "";
    public src: any;
    public selectedProgramList: any = [];

    public isAdmin: boolean = false;
    public isExecutive: boolean = false;
    public isDealer: boolean = false;
    public isBC: boolean = false;
    public isDistrict: boolean = false;
    public isManager: boolean = false;
    public isParticipant: boolean = false;
    public tabNumber: any = "tab1";

    public fromDate: string = "";
    public toDate: string = "";
    public pCDistributionReportInterface: PCDistributionReportInterface = {
        from: this.fromDate,
        to: this.toDate,
        bc: "",
        district: ""
    }


    public programOptions: SelectItem[] = [];
    public pCDistributionBCOptions: SelectItem[] = [
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
    public pCDistributionDistrictOptions: SelectItem[] = [
        { label: "SE-K", value: "SE-K" },
        { label: "NE-S", value: "NE-S" },
        { label: "SE-A", value: "SE-A" },
        { label: "MW-E", value: "MW-E" }
    ]
    public pCDistributionDealeCodeOptions: SelectItem[] = [
        { label: "05239", value: "05239" },
        { label: "05551", value: "05551" },
        { label: "07203", value: "07203" },
        { label: "07595", value: "07595" }
    ]
    public selectedBCList: any = [];
    public selectedDistrictList: any = [];
    public selectedDealerCodeList: any = [];
    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        this.squarify();
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        /* jQuery activation and setting options for parent tabs with id selector*/
        this.identifyRoles();
        this.renderTab();
        this.viewEXTabOnly();
        //   this.createBCProgramOptions();
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
    public identifyRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
            this.tabNumber = "tab1";
            this.isAdmin = false;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
        } else if (role == 3) {
            this.tabNumber = "tab1";
            this.isAdmin = false;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
        } else if (role == 12) {
            this.tabNumber = "tab2";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
        } else if (role == 11) {
            this.tabNumber = "tab3";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
        } else if (role == 5) {
            this.tabNumber = "tab4";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
        } else if (role == 10) {
            this.tabNumber = "tab4";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = true;
            this.isParticipant = true;
        } else if (role == 6 || role == 9) {
            this.tabNumber = "tab5";
            this.isAdmin = false;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = false;
            this.isParticipant = true;
        }
    }

    public viewEXTabOnly() {
        // this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = true;
        this.showBCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: this.fromDate,
            to: this.toDate,
            district: "",
            bc: ""
        }
        this.showExDepositReport();
    }
    public viewBCTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = true;
        this.showDealerPCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: this.fromDate,
            to: this.toDate,
            district: "",
            bc: ""
        }
        this.selectedBCList = ["MA", "DN", "SE", "WE", "SW", "MW", "GL", "CA", "NE"];
        this.viewBCPCDistributionReport();
    }

    public viewDistrictTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = true;
        this.showDealerPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: this.fromDate,
            to: this.toDate,
            district: "",
            bc: ""
        }
        this.selectedDistrictList = ["SE-K", "NE-S", "SE-A", "MW-E"];
        this.viewDistrictPCDistributionReport();
    }

    public viewDealerTabOnly() {
        //   this.createBCProgramOptions();
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = true;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: this.fromDate,
            to: this.toDate,
            district: "",
            bc: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.viewDealerPCDistributionReport();
    }

    public viewParticipantTabOnly() {
        //  this.createBCProgramOptions();
        var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = true;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface = {
            from: this.fromDate,
            to: this.toDate,
            district: "",
            bc: ""
        }

        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.viewParticipantPCDistributionReport();
    }
    public showExDepositReport() {
        this.showExecutivePCDistributionReportIframe = true;
        this.programName = "PCDistribution_Executive";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewBCPCDistributionReport() {
        this.showBCDistributionReportIframe = true;
        this.programName = "PCDistribution_BusinessCenter";
        var PCDBC = "";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedBCList.length; i++) {
            PCDBC = PCDBC + "&PCDBC=" + this.selectedBCList[i];
        }
        //https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=PCDistributionReward-BusinessCenter&RDBC=CA&RDBCFromDate=2017-07-19&RDBCToDate=2017-09-19&RDBCPG=Mopar%20Service%20Excellence%20Rewards%20-%20Used%20Vehicle%20Manager
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDBC=${PCDBC}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictPCDistributionReport() {
        this.showDistrictPCDistributionReportIframe = true;
        this.programName = "PCDistribution_District";
        var PCDD = "";
        var PCDDFD = this.pCDistributionReportInterface.from;
        var PCDDTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedDistrictList.length; i++) {
            PCDD = PCDD + "&PCDD=" + this.selectedDistrictList[i];
        }
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDD}&PCDDFD=${PCDDFD}&PCDDTD=${PCDDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDealerPCDistributionReport() {
        this.showDealerPCDistributionReportIframe = true;
        this.programName = "PCDistribution_Dealer";
        var PCDDL = "";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedDealerCodeList.length; i++) {
            PCDDL = PCDDL + "&PCDDL=" + this.selectedDealerCodeList[i];
        }
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDDL}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewParticipantPCDistributionReport() {
        this.showParticipantPCDistributionReportIframe = true;
        this.programName = "PCDistribution_DistributionDetails";
        var PCDDLDD = "";
        var PCDDLFD = this.pCDistributionReportInterface.from;
        var PCDDLTD = this.pCDistributionReportInterface.to;

        for (var i = 0; i < this.selectedDealerCodeList.length; i++) {
            PCDDLDD = PCDDLDD + "&PCDDLDD=" + this.selectedDealerCodeList[i];
        }
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDDLDD}&PCDDLFD=${PCDDLFD}&PCDDLTD=${PCDDLTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }


}