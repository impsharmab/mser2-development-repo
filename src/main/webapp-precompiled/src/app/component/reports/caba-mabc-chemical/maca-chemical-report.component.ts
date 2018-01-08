import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../global-variable/service-url';


import { ReportService } from '../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'maca-chemical-report',
    templateUrl: './maca-chemical-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class MACAChemicalReportComponent implements OnInit {

    showExIFrame: boolean = false;
    showBCIFrame: boolean = false;
    showDISTIFrame: boolean = false;
    showDealerIFrame: boolean = false;
    showParticipantIFrame: boolean = false;

    selectedRole: any;
    isAdminUser: boolean = false;
    isExecutiveUser: boolean = false;
    isBCUser: boolean = false;
    isDistrictUser: boolean = false;
    isDealerUser: boolean = false;
    isManagerUser: boolean = false;
    isParticipantUser: boolean = false;

    viewExecutiveTab: boolean = false;
    viewBCTab: boolean = false;
    viewDistrictTab: boolean = false;
    viewDealerTab: boolean = false;
    viewManagerTab: boolean = false;
    viewParticipantTab: boolean = false;

    disableBCInput: boolean = false;
    disableDISTInput: boolean = false;
    disableDealerInput: boolean = false;
    disableParticipantInput: boolean = false;

    src: any;

    selectedPositionCode: any = "";

    minDate: Date;
    maxDate: Date;

    selectedBC: string = "";
    selectedDIST: string = "";
    selectedDC: string = "";
    selectedSID: string = ""
    bcOptions: SelectItem[] = [
        { label: "CA", value: "CA" },
        { label: "MA", value: "MA" }
    ]

    tabNumber: any = "";
    fromDate: any = "";
    toDate: any = "";
    from: any = "";
    to: any = "";

    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.from = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.to = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();

        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(today.getFullYear() - 1);
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.checkRole();
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
            this.viewParticipantTab = true;
            this.viewEXTabOnly();
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
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
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.tabNumber = "tab3";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewDistrictTabOnly();
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = dealerCode;
            this.disableDealerInput = true;
            this.isDealerUser = true;
            this.tabNumber = "tab4";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = false;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewDealerTabOnly();
        } else if (this.selectedRole == 6 || this.selectedRole == 9) {
            var SID = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.selectedSID = SID;
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
    districtByBCDatum: any = [];
    //  getDistrictByBC(bc) {
    //     this.reportService.getDistrictByBC(bc).subscribe(
    //         (districtByBCDatum) => {
    //             this.districtByBCDatum = (districtByBCDatum)
    //             this.getDealerCodesBelongsToBCAndDIST(bc);
    //             // this.createDistrictOptions(this.districtByBCDatum);
    //             console.log(this.districtByBCDatum);
    //         },
    //         (error) => {
    //             this.getDealerCodesBelongsToBCAndDIST(bc);
    //         }
    //     )
    // }
    // private dealerCodesBelongsToThisBCOrDist: any = [];
    // private getDealerCodesBelongsToBCAndDIST(bcOrDist) {
    //     this.reportService.getDealerCodesBelongsToBCAndDIST(bcOrDist).subscribe(
    //         (dealerCodesBelongsToThisBCOrDist) => {
    //             this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
    //             this.getParticipantsByDealer(bcOrDist);
    //             console.log(this.dealerCodesBelongsToThisBCOrDist);
    //         },
    //         (error) => {
    //             this.getParticipantsByDealer(bcOrDist);
    //         }
    //     )
    // }
    //  sidsBelongsToThisDealer: any = [];
    // private getParticipantsByDealer(sid) {
    //     this.reportService.getParticipantsByDealer(sid).subscribe(
    //         (sidsBelongsToThisDealer) => {
    //             this.sidsBelongsToThisDealer = (sidsBelongsToThisDealer)
    //             // this.createParticipantOptions(this.sidsBelongsToThisDealer);
    //             if (this.isAdminUser || this.isExecutiveUser) {
    //                 this.viewEXTabOnly();
    //             } else if (this.isBCUser) {
    //                 this.viewBCTabOnly();
    //             } else if (this.isDistrictUser) {
    //                 this.viewDistrictTabOnly();
    //             } else if (this.isDealerUser) {
    //                 this.viewDealerTabOnly();
    //             } else if (this.isParticipantUser) {
    //                 this.viewParticipantTabOnly();
    //             }

    //             console.log(this.sidsBelongsToThisDealer);
    //         },
    //         (error) => {
    //             if (this.isAdminUser || this.isExecutiveUser) {
    //                 this.viewEXTabOnly();
    //             } else if (this.isBCUser) {
    //                 this.viewBCTabOnly();
    //             } else if (this.isDistrictUser) {
    //                 this.viewDistrictTabOnly();
    //             } else if (this.isDealerUser) {
    //                 this.viewDealerTabOnly();
    //             } else if (this.isParticipantUser) {
    //                 this.viewParticipantTabOnly();
    //             }
    //         }
    //     )
    // }

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

    getSIDValidation() {
        if (this.isParticipantUser) {
            this.viewParticipantReport();
        } else {
            if (this.selectedSID == "") {
                this.msg = "Please enter SID  to view the report "
                this.showParticipantIFrame = false;
                return;
            }
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.reportService.getSIDValidation(TERRITORY, this.selectedSID).subscribe(
                (sidBelongsToThisBCOrDist) => {
                    this.sidBelongsToThisBCOrDist = (sidBelongsToThisBCOrDist)
                    if (!this.sidBelongsToThisBCOrDist) {
                        this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                        this.showParticipantIFrame = false;
                        return;
                    } else {
                        this.msg = "";
                        this.viewParticipantReport();
                    }

                },
                (error) => {

                }
            )
        }
    }
    viewEXTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showExIFrame = false;
        // this.showExDepositReport();
    }
    viewBCTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showBCIFrame = false;
        // if (this.isExecutiveUser || this.isBCUser) {
        this.selectedBC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        //     this.viewBCReport();
        // }

    }
    viewDistrictTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showDISTIFrame = false;
        // if (this.isDistrictUser) {
        this.selectedDIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        // this.viewDistrictReport();
        // }

    }
    viewDealerTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showDealerIFrame = false;
        if (!this.isDealerUser) {
            this.selectedDC = "";
            this.selectedSID = "";
        }
    }
    viewParticipantTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.selectedDC = "";
        this.selectedSID = "";
        this.showParticipantIFrame = false;
        if (this.isDealerUser) {
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = DEALERCODE123;
        }
        if (this.isParticipantUser) {
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var SID = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.selectedDC = DEALERCODE123;
            this.selectedSID = SID;
            // this.viewParticipantReport();
        }
    }
    showExDepositReport() {
        this.showExIFrame = true;
        var programName = "MACAChemical_Executive";
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // this.chRef.detectChanges();
    }

    viewBCReport() {
        this.showBCIFrame = false;
        var programName = "MACAChemical_BC";
        if (this.isExecutiveUser) {
            this.showBCIFrame = true;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=NAT&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        } else if (this.isBCUser) {
            this.disableBCInput = true;
            this.showBCIFrame = true;
            var BusinessCenter1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=${BusinessCenter1}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    viewDistrictReport() {
        this.showDISTIFrame = false;
        var programName = "MACAChemical_DIST";
        if (this.isExecutiveUser) {
            // if (this.selectedDIST == "") {
            //     this.showDISTIFrame = false;
            //     return;
            // }
            this.showDISTIFrame = true;
            // var District = this.selectedDIST;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&District=NAT`;
        } else if (this.isBCUser || this.isDistrictUser) {
            var District1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // if (this.selectedDIST == "") {
            //     this.showDISTIFrame = false;
            //     return;
            // }
            this.showDISTIFrame = true;
            // var District1 = this.selectedDIST;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&District=${District1}`;
            // } else if (this.isDistrictUser) {
            //     this.showDISTIFrame = true;
            //     this.disableDISTInput = true;
            //     var District123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;;
            //     this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&District=${District123}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    msg: string = "";
    viewDealerReport() {
        var programName = "MACAChemical_Dealer";
        if (this.displayDealerReportWODealerCode) {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
                this.showDealerIFrame = true;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${TERRITORY}`;
            } else if (this.isDealerUser) {
                this.msg = "";
                this.showDealerIFrame = true;
                var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
                this.selectedDC = DEALERCODE123;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${DEALERCODE123}`;
            }
            console.log(this.src);
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        } else {
            if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser) {
                this.showDealerIFrame = true;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${this.selectedDC}`;
            } else if (this.isDealerUser) {
                this.msg = "";
                this.showDealerIFrame = true;
                var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
                this.selectedDC = DEALERCODE123;
                this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${DEALERCODE123}`;
            }
            console.log(this.src);
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        }

    }

    viewParticipantReport() {
        this.msg = "";
        var programName = "MACAChemical_SID";
        this.showParticipantIFrame = true;
        if (this.isExecutiveUser || this.isBCUser || this.isDistrictUser || this.isDealerUser) {
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;
        } else if (this.isParticipantUser) {
            // this.selectedSID = DEALERCODE123;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    hideParticipantTab: boolean = false;
}
