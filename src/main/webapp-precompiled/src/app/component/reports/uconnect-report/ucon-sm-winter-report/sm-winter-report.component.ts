import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';


import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'sm-winter-report',
    templateUrl: './sm-winter-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class UCONSMWinterProgramReportComponent implements OnInit {

    showExIFrame: boolean = false;
    showBCIFrame: boolean = false;
    showDISTIFrame: boolean = false;
    showDealerIFrame: boolean = false;

    selectedRole: any;
    isAdminUser: boolean = false;
    isExecutiveUser: boolean = false;
    isBCUser: boolean = false;
    isDistrictUser: boolean = false;
    isDealerUser: boolean = false;
    isManagerUser: boolean = false;

    viewExecutiveTab: boolean = false;
    viewBCTab: boolean = false;
    viewDistrictTab: boolean = false;
    viewDealerTab: boolean = false;
    viewManagerTab: boolean = false;
    hideDealerTab: boolean = false;

    disableDealerInput: boolean = false;

    src: any;

    selectedPositionCode: any = "";

    selectedBC: string = "";
    selectedDC: string = "";
    selectedSID: string = ""

    tabNumber: any = "";
    fromDate: any = "";
    toDate: any = "";

    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {
        this.checkRole();
    }

    ngOnInit() {
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        this.renderTab();
        this.squarify();
    }

    squarify() {
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
    renderTab() {
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

    checkRole() {
        this.isAdminUser = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        this.selectedRole = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (this.isAdminUser || this.selectedRole == 1) {
            this.isExecutiveUser = true;
            this.tabNumber = "tab1";
            this.viewExecutiveTab = true;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewEXTabOnly();
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.tabNumber = "tab2";
            this.isBCUser = true;
            this.viewExecutiveTab = false;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewBCTabOnly();
        } else if (this.selectedRole == 11) {
            this.isDistrictUser = true;
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.tabNumber = "tab3";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewDistrictTabOnly();
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            this.hideDealerTab = true;
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.disableDealerInput = true;
            this.isDealerUser = true;
            this.tabNumber = "tab4";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = false;
            this.viewDealerTab = true;
            this.viewDealerTabOnly();
        }
        this.renderTab();

    }

    private dealerCodesBelongsToThisBCOrDist: any = false;
    private sidBelongsToThisBCOrDist: any = false;
    displayDealerReportWODealerCode: boolean = false;
    getDealerCodeValidation() {
        if (this.isDealerUser) {
            this.viewDealerReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            if (this.selectedDC == "") {
                this.displayDealerReportWODealerCode = true;
                // this.selectedDC = TERRITORY
                this.msg = "";
                this.viewDealerReport();
            } else {
                this.displayDealerReportWODealerCode = false;
                this.reportService.getDealerCodeValidation(TERRITORY, this.selectedDC).subscribe(
                    (dealerCodesBelongsToThisBCOrDist) => {
                        this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                        if (!this.dealerCodesBelongsToThisBCOrDist) {
                            this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                            this.showDealerIFrame = false;
                            return;
                        } else {
                            this.msg = "";
                            this.viewDealerReport();
                        }
                    },
                    (error) => {

                    }
                )
            }

        }
    }

    viewEXTabOnly() {
        this.msg = "";
        this.showExIFrame = true;
        this.showExDepositReport();
    }
    viewBCTabOnly() {
        this.msg = "";
        this.showBCIFrame = false;
        this.viewBCReport();
    }
    viewDistrictTabOnly() {
        this.msg = "";
        this.showDISTIFrame = false;
        this.viewDistrictReport();
    }
    viewDealerTabOnly() {
        this.msg = "";
        this.selectedDC = "";
        this.selectedSID = "";
        if (this.isDealerUser) {
            this.viewDealerReport();
        }
    }

    showExDepositReport() {
        this.showExIFrame = true;
        var programName = "UConnectSM_Executive";
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&Territory=NAT`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // this.chRef.detectChanges();
    }

    viewBCReport() {
        this.showBCIFrame = true;
        var programName = "UconnectSM_BC";
        if (this.isExecutiveUser) {
            var BusinessCenter = "NAT";
            // this.getDistrictByBC(BusinessCenter);
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=${BusinessCenter}`;
        } else if (this.isBCUser) {
            var BusinessCenter1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // this.getDistrictByBC(BusinessCenter1);
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=${BusinessCenter1}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    viewDistrictReport() {
        this.showDISTIFrame = true;
        var programName = "UConnectSM_DIST";
        if (this.isExecutiveUser) {
            var District = "NAT";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&District=${District}`;
        } else if (this.isBCUser || this.isDistrictUser) {
            var District1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&District=${District1}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    msg: string = "";
    disableDealerButton: boolean = false;
    disableParticipantButton: boolean = false;
    viewDealerReport() {
        this.msg = "";
        var programName = "UConnectSM_Dealer";
        if (this.displayDealerReportWODealerCode) {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
                this.showDealerIFrame = true;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${TERRITORY}`
            }
        } else {
            if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
                this.showDealerIFrame = true;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${this.selectedDC}`;
            } else if (this.isDealerUser) {
                this.msg = "";
                this.showDealerIFrame = true;
                var DEALERCODE1238 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE1238}`;
            }
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
