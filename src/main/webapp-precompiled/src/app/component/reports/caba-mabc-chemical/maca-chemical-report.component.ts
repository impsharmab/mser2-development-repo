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

    public disableBCInput: boolean = false;
    public disableDISTInput: boolean = false;
    public disableDealerInput: boolean = false;
    public disableParticipantInput: boolean = false;

    public src: any;

    public selectedPositionCode: any = "";

    public minDate: Date;
    public maxDate: Date;

    public selectedBC: string = "";
    public selectedDIST: string = "";
    public selectedDC: string = "";
    public selectedSID: string = ""
    public bcOptions: SelectItem[] = [
        { label: "CA", value: "CA" },
        { label: "MA", value: "MA" }
    ]

    public tabNumber: any = "";
    public fromDate: any = "";
    public toDate: any = "";
    public from: any = "";
    public to: any = "";

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
        this.minDate.setFullYear(today.getFullYear());
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.checkRole();
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
        if (this.isAdminUser) {
            this.isExecutiveUser = true;
            this.tabNumber = "tab1";
            this.viewExecutiveTab = true;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewEXTabOnly();
            // this.getDistrictByBC("NAT");
            // this.getDealerCodesBelongsToBCAndDIST("NAT");
        } else if (this.selectedRole == 1) {
            // this.getDealerCodesBelongsToBCAndDIST("NAT");
            this.tabNumber = "tab1";
            this.isExecutiveUser = true;
            this.viewExecutiveTab = true;
            this.viewBCTab = true;
            this.viewDistrictTab = true;
            this.viewManagerTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;

            this.viewEXTabOnly();
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
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
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // this.getDealerCodesBelongsToBCAndDIST(DIST);
            this.tabNumber = "tab3";
            this.viewExecutiveTab = false;
            this.viewBCTab = false;
            this.viewDistrictTab = true;
            this.viewDealerTab = true;
            this.viewParticipantTab = true;
            this.viewDistrictTabOnly();
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // this.getParticipantsByDealer(dealerCode);
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
    // public getDistrictByBC(bc) {
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
    // public sidsBelongsToThisDealer: any = [];
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
    public getDealerCodeValidation() {
        if (this.isDealerUser) {
            this.viewDealerReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.reportService.getDealerCodeValidation(TERRITORY, this.selectedDC).subscribe(
                (dealerCodesBelongsToThisBCOrDist) => {
                    this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                    this.viewDealerReport();
                },
                (error) => {

                }
            )
        }
    }

    public getSIDValidation() {
        if (this.isParticipantUser) {
            this.viewParticipantReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

            this.reportService.getSIDValidation(TERRITORY, this.selectedSID).subscribe(
                (sidBelongsToThisBCOrDist) => {
                    this.sidBelongsToThisBCOrDist = (sidBelongsToThisBCOrDist)
                    this.viewParticipantReport();
                },
                (error) => {

                }
            )
        }
    }
    public viewEXTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showExIFrame = false;
        // this.showExDepositReport();
    }
    public viewBCTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showBCIFrame = false;
        // if (this.isExecutiveUser || this.isBCUser) {
            this.selectedBC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        //     this.viewBCReport();
        // }

    }
    public viewDistrictTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.showDISTIFrame = false;
        // if (this.isDistrictUser) {
        this.selectedDIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        // this.viewDistrictReport();
        // }

    }
    public viewDealerTabOnly() {
        this.fromDate = this.from;
        this.toDate = this.to;
        this.msg = "";
        this.selectedDC = "";
        this.selectedSID = "";
        this.showDealerIFrame = false;
        // if (this.isDealerUser) {
        //     this.viewDealerReport();
        // }
    }
    public viewParticipantTabOnly() {
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
    public showExDepositReport() {
        this.showExIFrame = true;
        var programName = "MACAChemical_Executive";
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // this.chRef.detectChanges();
    }

    public viewBCReport() {
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
    public viewDistrictReport() {
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
    public msg: string = "";
    public disableDealerButton: boolean = false;
    public disableParticipantButton: boolean = false;
    public viewDealerReport() {
        var DEALERCODE980 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.msg = "";
        var programName = "MACAChemical_Dealer";
        if (this.isExecutiveUser) {
            // if (this.selectedDC == "") {
            //     this.msg = "Please enter Dealer Code to view the report "
            //     this.showDealerIFrame = false;
            //     return;
            // }
            // if (this.selectedDC != "") {
            //     if (!this.dealerCodesBelongsToThisBCOrDist) { 
            //         this.msg = "The information entered is invalid, Please change your search criteria and try again.";
            //         this.showDealerIFrame = false;
            //         return;
            //     } else {
            //         this.showDealerIFrame = true;
            //     }
            this.showDealerIFrame = true;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=NAT`;
            // }

        } else if (this.isBCUser) {
            var DealerCode12342 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // if (DEALERCODE1 == "") {
            //     this.msg = "Please enter Dealer Code to view the report";
            //     this.showDealerIFrame = false;
            //     return;
            // } else if (DEALERCODE1 != "") {
            //     if (!this.dealerCodesBelongsToThisBCOrDist) {
            //         this.msg = "The information entered is invalid, Please change your search criteria and try again.";
            //         this.showDealerIFrame = false;
            //         return;
            //     } else {
            //         this.showDealerIFrame = true;
            //     }
            this.showDealerIFrame = true;

            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${DealerCode12342}`;


        } else if (this.isDistrictUser) {
            this.msg = "";
            this.showDealerIFrame = true;
            var DealerCode12312 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            // if (DEALERCODE2 == "") {
            //     this.msg = "Please enter Dealer Code to view the report";
            //     this.showDealerIFrame = false;
            //     return;
            // } else if (DEALERCODE1 != "") {
            //     if (!this.dealerCodesBelongsToThisBCOrDist) {
            //         this.msg = "The information entered is invalid, Please change your search criteria and try again.";
            //         this.showDealerIFrame = false;
            //         return;
            //     } else {
            //         this.showDealerIFrame = true;
            //     }

            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${DealerCode12312}`;
            // }
        } else if (this.isDealerUser) {
            this.msg = "";
            this.showDealerIFrame = true;
            this.disableDealerButton = true;
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = DEALERCODE123;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&DealerCode=${DEALERCODE123}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewParticipantReport() {
        this.msg = "";
        var programName = "MACAChemical_SID";
        if (this.isExecutiveUser) {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            if (this.selectedSID == "") {
                this.msg = "Please enter SID  to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (!this.sidBelongsToThisBCOrDist) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
                return;
            } else {
                this.showParticipantIFrame = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;

        } else if (this.isBCUser) {
            if (this.selectedSID == "") {
                this.msg = "Please enter SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (!this.sidBelongsToThisBCOrDist) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
                return;
            } else {
                this.showParticipantIFrame = true;
            }

            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;

        } else if (this.isDistrictUser) {
            this.msg = "";
            this.showParticipantIFrame = false;
            var DealerCode12 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var DEALERCODE2 = this.selectedDC;
            if (this.selectedSID == "") {
                this.msg = "Please enter SID to view the report "
                this.showParticipantIFrame = false;
                return;
            } else if (!this.sidBelongsToThisBCOrDist) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
                return;
            } else {
                this.showParticipantIFrame = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;

        } else if (this.isDealerUser) {
            this.msg = "";
            this.showDealerIFrame = true;
            this.disableDealerButton = true;
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = DEALERCODE123;
            if (this.selectedSID == "") {
                this.msg = "Please enter SID to view the report";
                this.showParticipantIFrame = false;
            } else if (!this.sidBelongsToThisBCOrDist) {
                this.msg = "The information entered is invalid, Please change your search criteria and try again.";
                this.showParticipantIFrame = false;
            } else {
                this.showParticipantIFrame = true;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;

        } else if (this.isParticipantUser) {
            this.msg = "";
            this.showParticipantIFrame = true;

            this.disableParticipantButton = true;
            this.hideParticipantTab = true;

            this.selectedDC = DEALERCODE123;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${this.fromDate}&ToDate=${this.toDate}&SID=${this.selectedSID}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public hideParticipantTab: boolean = false;
}
