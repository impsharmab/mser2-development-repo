import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";


import { SelectItem } from 'primeng/primeng';

import { WIAdvisorManagementInterface } from './wiAdvisor-management-interface';

declare var $: any;
// const GetLastDateOfMonth = require('get-last-date-of-month');
// import { GetLastDateOfMonth } from 'get-last-date-of-month';

@Component({
    selector: 'wiAdvisor-management-report',
    templateUrl: './wiAdvisor-management-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    // styleUrls: ['./reward-deposit-report.css'] 
})
export class WiAdvisorManagementReportComponent implements OnInit {

    public showExecutiveWiAdvisorManagementReportIframe: boolean = false;
    public showBCWiAdvisorManagementReportIframe: boolean = false;
    public showDistrictWiAdvisorManagementReportIframe: boolean = false;
    public showDealerWiAdvisorManagementReportIframe: boolean = false;
    public showParticipantWiAdvisorManagementReportIframe: boolean = false;
    public showDetailWiAdvisorManagementReportIframe: boolean = false;
    public programName: string = "";
    public src: any;
    public selectedProgramList: any = [];
    public fromDate: string = "";
    public toDate: string = "";
    public wIAdvisorManagementInterface: WIAdvisorManagementInterface = {
        from: this.fromDate,
        to: this.toDate,
        bc: "",
        dealerCode: "",
        district: ""
    }
    public wiAdvisorManagementBCOptions: SelectItem[] = [
        { label: "CA", value: "CA" },
        { label: "DN", value: "DN" },
        { label: "GL", value: "GL" },
        { label: "MA", value: "MA" },
        { label: "MW", value: "MW" },
        { label: "NE", value: "NE" },
        { label: "SE", value: "SE" },
        { label: "SW", value: "SW" }

    ]
    public wiAdvisorManagementDistrictOptions: SelectItem[] = [
        { label: "SE-K", value: "SE-K" },
        { label: "NE-S", value: "NE-S" },
        { label: "SE-A", value: "SE-A" },
        { label: "MW-E", value: "MW-E" }
    ]
    public wiAdvisorManagementDealeCodeOptions: SelectItem[] = [
        { label: "05239", value: "05239" },
        { label: "05551", value: "05551" },
        { label: "07203", value: "07203" },
        { label: "07595", value: "07595" }
    ]
    public selectedBCList: any = [];
    public selectedDistrictList: any = [];
    public selectedDealerCodeList: any = [];
    public rewardDepositProgramIDOptions: SelectItem[] = [
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
    public programOptions: SelectItem[] = [];
    constructor(private domSanitizer: DomSanitizer) { }


    ngOnInit() {
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        console.log(this.fromDate + "-----" + this.toDate + " " + lastDayOfMonth.getDate());
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

    onResize(event) {
        this.squarify();
        //event.target.innerWidth; // window width
    }

    public viewEXTabOnly() {
        // this.createBCProgramOptions();
        this.showExecutiveWiAdvisorManagementReportIframe = false;
        this.showBCWiAdvisorManagementReportIframe = false;
        this.showDealerWiAdvisorManagementReportIframe = false;
        this.showDistrictWiAdvisorManagementReportIframe = false;
        this.showParticipantWiAdvisorManagementReportIframe = false;
        this.showDetailWiAdvisorManagementReportIframe = false;
        this.wIAdvisorManagementInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            dealerCode: "",
            district: ""
        }
        this.showExDepositReport();
    }
    public viewBCTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutiveWiAdvisorManagementReportIframe = false;
        this.showBCWiAdvisorManagementReportIframe = false;
        this.showDealerWiAdvisorManagementReportIframe = false;
        this.showDistrictWiAdvisorManagementReportIframe = false;
        this.showParticipantWiAdvisorManagementReportIframe = false;
        this.showDetailWiAdvisorManagementReportIframe = false;
        this.wIAdvisorManagementInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            dealerCode: "",
            district: ""
        }
        this.selectedBCList = ["CA", "DN", "GL", "MA", "MW", "NE", "SE", "SW"];
        this.viewBCWiAdvisorManagementReport();
    }

    public viewDistrictTabOnly() {
        //  this.createBCProgramOptions();
        this.showExecutiveWiAdvisorManagementReportIframe = false;
        this.showBCWiAdvisorManagementReportIframe = false;
        this.showDistrictWiAdvisorManagementReportIframe = false;
        this.showDealerWiAdvisorManagementReportIframe = false;
        this.showParticipantWiAdvisorManagementReportIframe = false;
        this.showDetailWiAdvisorManagementReportIframe = false;
        this.wIAdvisorManagementInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            dealerCode: "",
            district: ""
        }
        this.selectedBCList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        this.selectedDistrictList = ["SE-K", "NE-S", "SE-A", "MW-E"];
        this.viewDistrictWiAdvisorManagementReport();
    }

    public viewDealerTabOnly() {
        //   this.createBCProgramOptions();
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutiveWiAdvisorManagementReportIframe = false;
        this.showBCWiAdvisorManagementReportIframe = false;
        this.showDistrictWiAdvisorManagementReportIframe = false;
        this.showDealerWiAdvisorManagementReportIframe = false;
        this.showParticipantWiAdvisorManagementReportIframe = false;
        this.showDetailWiAdvisorManagementReportIframe = false;
        this.wIAdvisorManagementInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            dealerCode: dealerCode,
            district: ""
        }
        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        // this.viewDealerWiAdvisorManagementReport();
    }

    public viewParticipantTabOnly() {
        //  this.createBCProgramOptions();
        var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.showExecutiveWiAdvisorManagementReportIframe = false;
        this.showBCWiAdvisorManagementReportIframe = false;
        this.showDistrictWiAdvisorManagementReportIframe = false;
        this.showDealerWiAdvisorManagementReportIframe = false;
        this.showParticipantWiAdvisorManagementReportIframe = false;
        this.showDetailWiAdvisorManagementReportIframe = false;
        this.wIAdvisorManagementInterface = {
            from: this.fromDate,
            to: this.toDate,
            bc: "",
            dealerCode: "",
            district: ""
        }

        this.selectedProgramList = ["15", "2", "3", "4", "5", "6", "9", "7", "11"];
        //this.viewParticipantWiAdvisorManagementReport();
    }
    public showExDepositReport() {
        this.showExecutiveWiAdvisorManagementReportIframe = true;
        this.programName = "WiadvisorManagement_Executive";
        var WFD = this.wIAdvisorManagementInterface.from;
        var WTD = this.wIAdvisorManagementInterface.to;

        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&WFD=${WFD}&WTD=${WTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewBCWiAdvisorManagementReport() {
        this.showBCWiAdvisorManagementReportIframe = true;
        this.programName = "WiadvisorManagement_BusinessCenter";
        var WBC = "";
        var WBCFD = this.wIAdvisorManagementInterface.from;
        var WBCTD = this.wIAdvisorManagementInterface.to;
        for (var i = 0; i < this.selectedBCList.length; i++) {
            WBC = WBC + "&WBC=" + this.selectedBCList[i];
        }
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${WBC}&WBCFD=${WBCFD}&WBCTD=${WBCTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictWiAdvisorManagementReport() {
        this.showDistrictWiAdvisorManagementReportIframe = true;
        this.programName = "WiAdvisorManagementReport-District";
        var WMDFD = this.wIAdvisorManagementInterface.from;
        var WMDTD = this.wIAdvisorManagementInterface.to;
        var WMDBC = "";
        var WMDD = "";
        for (var i = 0; i < this.selectedBCList.length; i++) {
            WMDBC = WMDBC + "&WMDBC=" + this.selectedBCList[i];
        }
        for (var i = 0; i < this.selectedDistrictList.length; i++) {
            WMDD = WMDD + "&WMDD=" + this.selectedDistrictList[i];
        }
        this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&WMDFD=${WMDFD}&WMDTD=${WMDTD}${WMDBC}${WMDD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    // public viewDealerWiAdvisorManagementReport() {
    //     this.showDealerWiAdvisorManagementReportIframe = true;
    //     this.programName = "WiAdvisorManagementreward-Dealer";
    //     var RDDL = this.wIAdvisorManagementInterface.dealerCode;
    //     var RDDFromDate = this.wIAdvisorManagementInterface.from;
    //     var RDDToDate = this.wIAdvisorManagementInterface.to;
    //     var RDDLPG = this.wIAdvisorManagementInterface.program;
    //     for (var i = 0; i < this.selectedProgramList.length; i++) {
    //         RDDLPG = RDDLPG + "&RDDLPG=" + this.selectedProgramList[i];
    //     }
    //     this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDDL=${RDDL}&RDDFromDate=${RDDFromDate}&RDDToDate=${RDDToDate}${RDDLPG}`;
    //     console.log(this.src);
    //     this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    // }

    // public viewParticipantWiAdvisorManagementReport() {
    //     this.showParticipantWiAdvisorManagementReportIframe = true;
    //     this.programName = "WiAdvisorManagementReport-Participant";
    //     var RDP = this.wIAdvisorManagementInterface.sid;
    //     var RDPFromDate = this.wIAdvisorManagementInterface.from;
    //     var RDPToDate = this.wIAdvisorManagementInterface.to;
    //     var RDPPG = this.wIAdvisorManagementInterface.program;
    //     for (var i = 0; i < this.selectedProgramList.length; i++) {
    //         RDPPG = RDPPG + "&RDPPG=" + this.selectedProgramList[i];
    //     }
    //     this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}${RDPPG}`;
    //     console.log(this.src);
    //     this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    // }


}