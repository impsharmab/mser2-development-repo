import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as reportServiceUrl from '../../../../global-variable/service-url';

import { PCDistributionReportInterface } from './pc-distribution-report.interface';
import { ReportService } from "../../../../services/report/report-service";
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
    public dealerCodeNotBelongsToThisBC: String = "";

    public isAdmin: boolean = false;
    public isExecutive: boolean = false;
    public isDealer: boolean = false;
    public isBC: boolean = false;
    public isDistrict: boolean = false;
    public isManager: boolean = false;
    public isParticipant: boolean = false;
    public tabNumber: any = "tab1";

    public minDate: Date;
    public maxDate: Date;

    public fromDate: string = "";
    public toDate: string = "";

    public selectedRole: any;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public pCDistributionReportInterface: PCDistributionReportInterface = {
        from: this.fromDate,
        to: this.toDate,
        bc: "",
        district: "",
        dealerCode: ""
    }


    public programOptions: SelectItem[] = [];
    
    
    public selectedBCList: any = [];
    public selectedDistrictList: any = [];
    public selectedDealerCodeList: any = [];
    constructor(
        private domSanitizer: DomSanitizer,
        private reportService: ReportService
    ) { }

    ngOnInit() {
        this.squarify();
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
            this.tabNumber = "tab1";
            this.isExecutiveUser = true;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isDealer = true;
            this.isManager = true;
            this.isParticipant = false;
            this.viewEXTabOnly();
        } else {
            this.identifyRoles();
        }

        this.renderTab();
    }

    public squarify() {
        /* jQuery activation and setting options for parent tabs with id selector*/
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
    public disableDealerInput: boolean = false;
    public identifyRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
            this.getDealerCodesBelongsToBCAndDIST("NAT");
            this.tabNumber = "tab1";
            this.isExecutiveUser = true;
            this.isExecutive = true;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = false;
            this.viewEXTabOnly();
        } else if (role == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getDealerCodesBelongsToBCAndDIST(BC);
            this.tabNumber = "tab2";
            this.disableBCDropdown = true;
            this.isBCUser = true;
            this.isExecutive = false;
            this.isBC = true;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = false;
            this.viewBCTabOnly();
        } else if (role == 11) {
            var DISTRICT = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getDealerCodesBelongsToBCAndDIST(DISTRICT);
            this.tabNumber = "tab3";
            this.isDistrictUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = true;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = false;
            this.viewDistrictTabOnly();
        } else if (role == 5) {
            this.tabNumber = "tab4";
            this.isManagerUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = true;
            this.isDealer = true;
            this.isParticipant = false;
            this.viewDealerTabOnly();
        } else if (role == 10) {
            this.tabNumber = "tab4";
            this.isDealerUser = true;
            this.isExecutive = false;
            this.isBC = false;
            this.isDistrict = false;
            this.isManager = false;
            this.isDealer = true;
            this.isParticipant = false;
            this.viewDealerTabOnly();
        }
        else if (role == 6 || role == 9) {
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
    private dealerCodesBelongsToThisBCOrDist: any = [];
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
    public viewEXTabOnly() {
        // this.createBCProgramOptions();
        this.showExecutivePCDistributionReportIframe = true;
        this.showBCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface.from = this.fromDate,
            this.pCDistributionReportInterface.to = this.toDate,

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
        this.pCDistributionReportInterface.from = this.fromDate;
        this.pCDistributionReportInterface.to = this.toDate;
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
        this.pCDistributionReportInterface.from = this.fromDate;
        this.pCDistributionReportInterface.to = this.toDate;


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
        this.pCDistributionReportInterface.from = this.fromDate,
            this.pCDistributionReportInterface.to = this.toDate,
            this.pCDistributionReportInterface.dealerCode = "";

        if (this.isDealerUser || this.isManagerUser) {
            this.disableDealerInput = true;
            this.pCDistributionReportInterface.dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

        }
        this.viewDealerPCDistributionReport();
    }

    public viewParticipantTabOnly() {
        //   this.createBCProgramOptions();
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutivePCDistributionReportIframe = false;
        this.showBCDistributionReportIframe = false;
        this.showDistrictPCDistributionReportIframe = false;
        this.showDealerPCDistributionReportIframe = true;
        this.showParticipantPCDistributionReportIframe = false;
        this.showDetailPCDistributionReportIframe = false;
        this.pCDistributionReportInterface.from = this.fromDate,
            this.pCDistributionReportInterface.to = this.toDate,
            this.pCDistributionReportInterface.dealerCode = "";

        if (this.isParticipantUser) {
            this.disableDealerInput = true;
            this.pCDistributionReportInterface.dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

        }
        this.viewDealerPCDistributionReport();
    }


    public showExDepositReport() {
        this.showExecutivePCDistributionReportIframe = true;
        this.programName = "PCDistribution_Executive";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;

        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public disableBCDropdown: boolean = false;
    public viewBCPCDistributionReport() {
        this.showBCDistributionReportIframe = true;
        this.programName = "PCDistribution_BusinessCenter";
        var PCDBC1 = "";
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;
        var PCDB = "0";

        if (this.isExecutiveUser) {
            PCDBC1 = "&PCDBC=NAT";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDBC1}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        } else if (this.isBCUser) {
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var PCDBC2 = "&PCDBC=" + dealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDBC2}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewDistrictPCDistributionReport() {
        this.showDistrictPCDistributionReportIframe = true;
        this.programName = "PCDistribution_District";
        var PCDD = "";
        var PCDDFD = this.pCDistributionReportInterface.from;
        var PCDDTD = this.pCDistributionReportInterface.to;
        if (this.isExecutiveUser) {
            // PCDD = "&PCDBC=NAT";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDDFD=${PCDDFD}&PCDDTD=${PCDDTD}`;
        } else if (this.isBCUser || this.isDistrictUser) {
            var BCCS = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            PCDD = "&PCDD=" + BCCS;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}${PCDD}&PCDDFD=${PCDDFD}&PCDDTD=${PCDDTD}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public msg: string = "";
    public viewDealerPCDistributionReport() {
        this.programName = "PCDistribution_Dealer";
        var PCDDL = this.pCDistributionReportInterface.dealerCode;
        var PCDFD = this.pCDistributionReportInterface.from;
        var PCDTD = this.pCDistributionReportInterface.to;
        if (this.pCDistributionReportInterface.dealerCode == "") {
            this.showDealerPCDistributionReportIframe = false;
            // this.msg = "Please enter Dealer Code to view the report";
            return;
        }

        if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
            if (this.pCDistributionReportInterface.dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(PCDDL) <= -1) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showDealerPCDistributionReportIframe = false;
            } else {
                this.showDealerPCDistributionReportIframe = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDDL=${PCDDL}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        } else if (this.isDealerUser || this.isManagerUser || this.isParticipantUser) {
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&PCDDL=${PCDDL}&PCDFD=${PCDFD}&PCDTD=${PCDTD}`;
        }

        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

}