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

    public minDate: Date;
    public maxDate: Date;

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

    public selectedRole: any;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

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


        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(today.getFullYear() - 1);
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        if (this.isAdmin) {
            this.tabNumber = "tab1";
            this.wiAdvisorTireInterface.bc = "NAT";
            this.isExecutiveUser = true;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isDealer = true;
            this.isManager = true;
            this.isParticipant = true;
            this.viewEXTabOnly();
        } else {
            this.identifyRoles();
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
    public disableBCInputButton: boolean = false;
    public disableDISTInputButton: boolean = false;
    public identifyRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
            this.tabNumber = "tab1";
            this.wiAdvisorTireInterface.bc = "NAT";
            this.isExecutiveUser = true;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewEXTabOnly();
        } else if (role == 12) {
            this.tabNumber = "tab2";
            this.wiAdvisorTireInterface.bc = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.disableBCInputButton = true;
            this.isBCUser = true;
            this.isExecutive = false;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewBCTabOnly();
        } else if (role == 11) {
            this.tabNumber = "tab3";
            this.wiAdvisorTireInterface.district = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.disableDISTInputButton = true;
            this.isDistrictUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDistrictTabOnly();
        } else if (role == 5) {
            this.tabNumber = "tab4";
            this.isManagerUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDealerTabOnly();
        } else if (role == 10) {
            this.tabNumber = "tab4";
            this.isDealerUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = true;
            this.isParticipant = true;
            this.viewDealerTabOnly();
        } else if (role == 6 || role == 9) {
            this.tabNumber = "tab5";
            this.isParticipantUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = false;
            this.isParticipant = true;
            this.viewParticipantTabOnly();
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
        this.wiAdvisorTireInterface.from = this.fromDate;
        this.wiAdvisorTireInterface.to = this.toDate;

        if (this.isExecutiveUser) {
            this.wiAdvisorTireInterface.bc = "NAT";
        } else if (this.isBCUser) {
            this.wiAdvisorTireInterface.bc = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        }
        this.viewBCWiAdvisorTireReport();
    }

    public viewDistrictTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface.from = this.fromDate;
        this.wiAdvisorTireInterface.to = this.toDate;

        // if(this.isExecutiveUser){
        //     this.wiAdvisorTireInterface.district="NAT";
        // }

        if (this.isBCUser) {
            this.wiAdvisorTireInterface.district = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (this.isDistrictUser) {
            this.wiAdvisorTireInterface.district = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
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
        var RDBCPG = this.wiAdvisorTireInterface.bc;

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