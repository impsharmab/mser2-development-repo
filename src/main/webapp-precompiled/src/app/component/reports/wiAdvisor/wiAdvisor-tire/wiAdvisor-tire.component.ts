import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";


import { SelectItem } from 'primeng/primeng';

import { WiAdvisorTiresInterface } from './wiAdvisor-tire.interface';

declare var $: any;

@Component({
    selector: 'wiAdvisor-tire-report',
    templateUrl: './wiAdvisor-tire.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    // styleUrls: ['./reward-deposit-report.css'] 
})
export class WiAdvisorTireReportComponent implements OnInit {

    public showExecutiveWiAdvisorTireReportIframe: boolean = false;
    public showBCWiAdvisorTireReportIframe: boolean = false;
    public showDistrictWiAdvisorTireReportIframe: boolean = false;
    public showDealerWiAdvisorTireReportIframe: boolean = false;
    public showParticipantWiAdvisorTireReportIframe: boolean = false;
    public showDetailWiAdvisorTireReportIframe: boolean = false;
    public programName: string = "";
    public src: any;
    public selectedProgramList: any;
    public viewParticipantWiAdvisorTireReport: any;
    public rewardDepositProgramIDOptions: any;

    public isAdmin: boolean = false;
    public isExecutive: boolean = false;
    public isDealer: boolean = false;
    public isBC: boolean = false;
    public isDistrict: boolean = false;
    public isManager: boolean = false;
    public isParticipant: boolean = false;
    public tabNumber: any = "tab1";
    public fromDate: any = "";
    public toDate: any = "";

    public wiAdvisorTireInterface: WiAdvisorTiresInterface = {
        from: this.fromDate,
        to: this.toDate,
        bc: "",
        district: "",
        dealerCode: "",
        sid: ""
    }

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        this.squarify();
        /* jQuery activation and setting options for parent tabs with id selector*/
        this.identifyRoles();
        this.renderTab();
        this.viewEXTabOnly();
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

    public viewEXTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            district: "",
            dealerCode: "",
            sid: ""
        }

        this.showExDepositReport();
    }
    public viewBCTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            district: "",
            dealerCode: "",
            sid: ""
        }
    }

    public viewDistrictTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            district: "",
            dealerCode: "",
            sid: ""
        }

        this.viewDistrictWiAdvisorTireReport();
    }

    public viewDealerTabOnly() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: this.fromDate,
            to: this.toDate, bc: "", district: "", dealerCode: "", sid: "",

        }

        // this.viewDealerWiAdvisorTireReport();
    }

    public viewParticipantTabOnly() {
        //  this.createBCProgramOptions();
        var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: this.fromDate,
            to: this.toDate, bc: "", district: "", dealerCode: "", sid: ""



        }


        // this.viewParticipantWiAdvisorTireReport();
    }
    public showExDepositReport() {
        this.showExecutiveWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_Executive";
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewBCWiAdvisorTireReport() {
        this.showBCWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_BC";
        var BusinessCenter = this.wiAdvisorTireInterface.bc;
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;
        var RDBCPG = "";

        //https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=RewardDepositReward-BusinessCenter&RDBC=CA&RDBCFromDate=2017-07-19&RDBCToDate=2017-09-19&RDBCPG=Mopar%20Service%20Excellence%20Rewards%20-%20Used%20Vehicle%20Manager
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&BusinessCenter=${BusinessCenter}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictWiAdvisorTireReport() {
        this.showDistrictWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_DIST";
        var District = this.wiAdvisorTireInterface.district;
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;

        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&District=${District}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDealerWiAdvisorTireReport() {
        this.showDealerWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_Dealer";
        var DealerCode = this.wiAdvisorTireInterface.dealerCode;
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;

        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DealerCode}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}