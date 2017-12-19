import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';


import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'app-UCONNavigationActivation-report',
    templateUrl: './ucon-navigate-to-higherprofit.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class UCONNavigationActivationReportComponent implements OnInit {

    public showExIFrame: boolean = false;
    public showBCIFrame: boolean = false;
    public showDISTIFrame: boolean = false;
    public showDealerIFrame: boolean = false;
    public showParticipantIFrame: boolean = false;

    public selectedRole: any;
    public isAdminUser: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public viewExecutiveTab: boolean = false;
    public viewBCTab: boolean = false;
    public viewDistrictTab: boolean = false;
    public viewDealerTab: boolean = false;
    public viewManagerTab: boolean = false;
    public viewParticipantTab: boolean = false;
    public hideDealerTab: boolean = false;

    public disableDealerInput: boolean = false;
    public disableParticipantInput: boolean = false;

    public src: any;

    public selectedPositionCode: any = "";

    public selectedBC: string = "";
    public selectedDC: string = "";
    public selectedSID: string = ""
    public bcOptions: SelectItem[] = [
        { label: "NAT", value: "NAT" },
        { label: "CA", value: "CA" },
        { label: "DN", value: "DN" },
        { label: "GL", value: "GL" },
        { label: "MA", value: "MA" },
        { label: "MW", value: "MW" },
        { label: "NE", value: "NE" },
        { label: "SE", value: "SE" },
        { label: "SW", value: "SW" },
        { label: "WE", value: "WE" }
    ]

    public tabNumber: any = "";
    public fromDate: any = "";
    public toDate: any = "";

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

    public checkRole() {
        this.isAdminUser = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        this.selectedRole = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (this.isAdminUser || this.selectedRole == 1) {
            this.isExecutiveUser = true;
            this.tabNumber = "tab1";
            this.viewExecutiveTab = true;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            // this.getDistrictByBC("NAT");
            // this.getDealerCodesBelongsToBCAndDIST("NAT");        
            this.viewEXTabOnly();
        } else if (this.selectedRole == 12) {
            // var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // this.getDistrictByBC(BC);
            this.tabNumber = "tab2";
            this.isBCUser = true;
            this.viewExecutiveTab = false;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewBCTabOnly();
        } else if (this.selectedRole == 11) {
            this.isDistrictUser = true;
            // var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // this.getDealerCodesBelongsToBCAndDIST(DIST);
            this.tabNumber = "tab3";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewDistrictTabOnly();
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            this.hideDealerTab = true;
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.getParticipantsByDealer(dealerCode);
            this.disableDealerInput = true;
            this.isDealerUser = true;
            this.tabNumber = "tab4";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = false;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            // this.viewDealerTabOnly();
        } else if (this.selectedRole == 6 || this.selectedRole == 9) {
            this.disableParticipantInput = true;
            this.isParticipantUser = true;
            this.tabNumber = "tab5";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = false;
            this.viewDealerTab = false;
            this.viewParticipantTab = true;
            this.viewParticipantTabOnly();
        }

        this.renderTab();
        // this.chRef.detectChanges();
    }
    public districtByBCDatum: any = [];
    public getDistrictByBC(bc) {
        this.reportService.getDistrictByBC(bc).subscribe(
            (districtByBCDatum) => {
                this.districtByBCDatum = (districtByBCDatum)
                this.getDealerCodesBelongsToBCAndDIST(bc);
                // this.createDistrictOptions(this.districtByBCDatum);
                console.log(this.districtByBCDatum);
            },
            (error) => {
                this.getDealerCodesBelongsToBCAndDIST(bc);
            }
        )
    }
    private dealerCodesBelongsToThisBCOrDist: any = [];
    private getDealerCodesBelongsToBCAndDIST(bcOrDist) {
        this.reportService.getDealerCodesBelongsToBCAndDIST(bcOrDist).subscribe(
            (dealerCodesBelongsToThisBCOrDist) => {
                this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                this.getParticipantsByDealer(bcOrDist);
                console.log(this.dealerCodesBelongsToThisBCOrDist);
            },
            (error) => {
                this.getParticipantsByDealer(bcOrDist);
            }
        )
    }
    public sidsBelongsToThisDealer: any = [];
    private getParticipantsByDealer(sid) {
        this.reportService.getParticipantsByDealer(sid).subscribe(
            (sidsBelongsToThisDealer) => {
                this.sidsBelongsToThisDealer = (sidsBelongsToThisDealer)
                // this.createParticipantOptions(this.sidsBelongsToThisDealer);
                if (this.isAdminUser || this.isExecutiveUser) {
                    this.viewEXTabOnly();
                } else if (this.isBCUser) {
                    this.viewBCTabOnly();
                } else if (this.isDistrictUser) {
                    this.viewDistrictTabOnly();
                } else if (this.isDealerUser) {
                    this.viewDealerTabOnly();
                } else if (this.isParticipantUser) {
                    this.viewParticipantTabOnly();
                }

                console.log(this.sidsBelongsToThisDealer);
            },
            (error) => {
                if (this.isAdminUser || this.isExecutiveUser) {
                    this.viewEXTabOnly();
                } else if (this.isBCUser) {
                    this.viewBCTabOnly();
                } else if (this.isDistrictUser) {
                    this.viewDistrictTabOnly();
                } else if (this.isDealerUser) {
                    this.viewDealerTabOnly();
                } else if (this.isParticipantUser) {
                    this.viewParticipantTabOnly();
                }
            }
        )
    }

    public viewEXTabOnly() {
        this.msg = "";
        this.showExIFrame = true;
        this.showExDepositReport();
    }
    public viewBCTabOnly() {
        this.msg = "";
        this.showBCIFrame = false;
        this.viewBCReport();
    }
    public viewDistrictTabOnly() {
        this.msg = "";
        this.showDISTIFrame = false;
        this.viewDistrictReport();
    }
    public viewDealerTabOnly() {
        this.msg = "";
        this.selectedDC = "";
        this.selectedSID = "";
        this.showDealerIFrame = false;
        this.disableDealerButton = true;
        // if (this.isDealerUser) {
        this.viewDealerReport();
        // }
    }
    public viewParticipantTabOnly() { 
        this.msg = "";
        this.selectedDC = "";
        this.selectedSID = "";
        this.showParticipantIFrame = false;
        if (this.isDealerUser) {
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = DEALERCODE123;
        }
        if (this.isParticipantUser) {
            this.hideParticipantTab = true;
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var SID = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.selectedDC = DEALERCODE123;
            this.selectedSID = SID;
            this.viewParticipantReport();
        }
    }
    public showExDepositReport() {
        this.showExIFrame = true;
        var programName = "UconnectSalesService_Executive";
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&Territory=NAT`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // this.chRef.detectChanges();
    }

    public viewBCReport() {
        this.showBCIFrame = true;
        var programName = "UConnectSalesService_BC";
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
    public viewDistrictReport() {
        this.showDISTIFrame = true;
        var programName = "UconnectSalesService_DIST";
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
    public msg: string = "";
    public disableDealerButton: boolean = false;
    public disableParticipantButton: boolean = false;
    public viewDealerReport() {
        this.msg = "";
        var programName = "UConnectSalesService_Dealer";
        if (this.isExecutiveUser) {
            // if (this.selectedDC == "") {
            //     this.msg = "Please enter Dealer Code to view the report "
            //     this.showDealerIFrame = false;
            //     return;
            // }
            // else if (this.selectedDC != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(this.selectedDC) <= -1) {
            //     this.msg = "The information entered is invalid, Please change your search criteria and try again.";
            //     this.showDealerIFrame = false;
            //     return;
            // } else {
            this.showDealerIFrame = true;
            // }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=NAT`;

        } else if (this.isBCUser || this.isDistrictUser || this.isDealerUser) {
            var DEALERCODE101 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // var DEALERCODE1 = this.selectedDC;
            // if (DEALERCODE1 == "") {
            //     this.msg = "Please enter Dealer Code to view the report";
            //     this.showDealerIFrame = false;
            //     return;
            // } else if (DEALERCODE1 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE1) <= -1) {
            //     this.msg = "The information entered is invalid, Please change your search criteria and try again.";
            //     this.showDealerIFrame = false;
            //     return;
            // } else {
            this.showDealerIFrame = true;
            // }

            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE101}`;

            // } else if (this.isDistrictUser) {
            //     this.msg = "";
            //     this.showDealerIFrame = false;
            //     var DealerCode12 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            //     var DEALERCODE2 = this.selectedDC;
            //     if (DEALERCODE2 == "") {
            //         this.msg = "Please enter Dealer Code to view the report";
            //         this.showDealerIFrame = false;
            //         return;
            //     } else
            //         if (DEALERCODE2 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE2) <= -1) {
            //             this.msg = "The information entered is invalid, Please change your search criteria and try again.";
            //             this.showDealerIFrame = false;
            //             return;
            //         } else {
            //             this.showDealerIFrame = true;
            //         }

            //     this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE2}`;

            // } else if (this.isDealerUser) {
            // this.msg = "";
            // this.showDealerIFrame = true;
            // this.disableDealerButton = true;
            // var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // this.selectedDC = DEALERCODE123;
            // this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE123}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewParticipantReport() {
        this.msg = "";
        var programName = "UconnectSalesService_Participant";
        if (this.isExecutiveUser) {
            if (this.selectedDC == "" && this.selectedSID == "") {
                this.msg = "Please enter Dealer Code and SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC != "" && this.selectedSID == "") {
                this.msg = "Please enter  SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC == "" && this.selectedSID != "") {
                this.msg = "Please enter Dealer Code  to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(this.selectedDC.toUpperCase()) <= -1) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
            } else {
                this.showParticipantIFrame = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${this.selectedDC}&SID=${this.selectedSID}`;

        } else if (this.isBCUser) {
            var DealerCode1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var DEALERCODE1 = this.selectedDC;
            if (this.selectedDC == "" && this.selectedSID == "") {
                this.msg = "Please enter Dealer Code and SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC != "" && this.selectedSID == "") {
                this.msg = "Please enter  SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC == "" && this.selectedSID != "") {
                this.msg = "Please enter Dealer Code  to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (DEALERCODE1 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE1.toUpperCase()) <= -1) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
            } else {
                this.showParticipantIFrame = true;
            }

            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE1}&SID=${this.selectedSID}`;

        } else if (this.isDistrictUser) {
            this.msg = "";
            this.showParticipantIFrame = false;
            var DealerCode12 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var DEALERCODE2 = this.selectedDC;
            if (this.selectedDC == "" && this.selectedSID == "") {
                this.msg = "Please enter Dealer Code and SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC != "" && this.selectedSID == "") {
                this.msg = "Please enter  SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (this.selectedDC == "" && this.selectedSID != "") {
                this.msg = "Please enter Dealer Code  to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (DEALERCODE2 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE2.toUpperCase()) <= -1) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
            } else {
                this.showParticipantIFrame = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE2}&SID=${this.selectedSID}`;

        } else if (this.isDealerUser) {
            this.msg = "";
            this.showDealerIFrame = true;
            this.disableDealerButton = true;
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = DEALERCODE123;
            if (this.selectedSID == "") {
                this.msg = "Please enter SID to view the report";
                this.showParticipantIFrame = false;
            } else if (this.selectedSID != "" && this.sidsBelongsToThisDealer.indexOf(this.selectedSID.toUpperCase()) <= -1) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
            } else {
                this.showParticipantIFrame = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE123}&SID=${this.selectedSID}`;

        } else if (this.isParticipantUser) {
            this.msg = "";
            this.showParticipantIFrame = true;
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = DEALERCODE123;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&DealerCode=${DEALERCODE123}&SID=${this.selectedSID}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public hideParticipantTab: boolean = false;
}
