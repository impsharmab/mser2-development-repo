import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { SelectItem } from 'primeng/primeng';
import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';
import * as errorMessage from '../../../../global-variable/error-success-message';
import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'mvp-approved-contract-report',
    templateUrl: './mvp-approved-contract-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class MVPApprovedContractsReportComponent implements OnInit {

    public selectedRole: any;
    public isAdminUser: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public hideInput: boolean = false;

    public src: any;

    public selectedPositionCode: any = "";

    public minDate: Date;
    public maxDate: Date;

    public selectedDC: string = "";
    public selectedMonth: any = "";
    public selectedYear: any = "";

    public bcOptions: SelectItem[] = [
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
    public monthOptions: SelectItem[] = [
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" }
    ];

    public currentYear: any = "";
    public yearOptions: SelectItem[] = [];
    public showIframe: boolean = false;
    public fromDate: any = "";
    public toDate: any = "";
    public from: any = "";
    public to: any = "";

    public programName: string = "MVPApprovedContracts";
    public msg: string = "";

    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        // this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        // this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        this.currentYear = new Date().getFullYear();
        // this.from = this.fromDate;
        // this.to = this.toDate;
        this.yearOptions.push({ label: this.currentYear, value: this.currentYear });
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
            defaultTab: "tab1",
            orientation: "horizontal"
        });
    }
    onResize(event) {
        this.squarify();
        //event.target.innerWidth; // window width
    }
    public diableInput: boolean = false;
    public checkRole() {
        this.isAdminUser = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        this.selectedRole = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (this.isAdminUser) {
            this.isExecutiveUser = true;
        } else if (this.selectedRole == 1) {
            this.isExecutiveUser = true;
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.isBCUser = true;
        } else if (this.selectedRole == 11) {
            this.isDistrictUser = true;
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.selectedDC = dealerCode;
            this.isDealerUser = true;
            this.diableInput = true;
        } else if (this.selectedRole == 6 || this.selectedRole == 9) {
            var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
            this.selectedDC = sid;
            this.isParticipantUser = true;
            this.hideInput = true;
        }
        this.renderTab();
    }

    private dealerCodesBelongsToThisBCOrDist: boolean = false;
    public verifyInputs() {
        this.msg = "";
        if (this.isParticipantUser) {
            this.viewParticipantReport();
        } else {
            var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.reportService.getDealerCodeValidation(TERRITORY, this.selectedDC).subscribe(
                (dealerCodesBelongsToThisBCOrDist) => {
                    this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                    if (this.isExecutiveUser) {
                        this.showExReport();
                    } else if (this.isBCUser) {
                        this.viewBCReport();
                    } else if (this.isDistrictUser) {
                        this.viewDistrictReport();
                    } else if (this.isDealerUser) {
                        this.viewDealerReport();
                    }
                },
                (error) => {

                }
            )
        }

    }

    public createDates() {
        if (this.selectedMonth == "" && this.selectedYear == "") {
            this.msg = errorMessage.selectYearAndMonth;
            this.showIframe = false;
            return;
        } else if (this.selectedMonth != "" && this.selectedYear == "") {
            this.msg = errorMessage.selectYear;
            this.showIframe = false;
            return;
        } else if (this.selectedMonth == "" && this.selectedYear != "") {
            this.msg = errorMessage.selectMonth;
            this.showIframe = false;
            return;
        } else {
            this.showIframe = true;
        }
        var lastDayOfSelectedMonth: any = "";
        lastDayOfSelectedMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
        this.fromDate = this.selectedMonth + "/" + "01/" + this.selectedYear;
        this.toDate = this.selectedMonth + "/" + lastDayOfSelectedMonth + "/" + this.selectedYear;
    }

    public showExReport() {
        this.createDates();
        // if (this.selectedDC == "") {
        //     this.showIframe = false;
        //     this.msg = "Please select Dealer Code to view the report";
        //     return;
        // } else if (!this.dealerCodesBelongsToThisBCOrDist) {
        //     this.showIframe = false;
        //     this.msg = "The information entered is invalid, Please change your search criteria and try again.";
        //     return;
        // } else {        
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=NAT&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        // }
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    public viewBCReport() {
        this.createDates();
        // if (this.selectedDC == "") {
        //     this.showIframe = false;
        //     this.msg = "Please select Dealer Code to view the report";
        //     return;
        // } else if (!this.dealerCodesBelongsToThisBCOrDist) {
        //     this.showIframe = false;
        //     this.msg = "The information entered is invalid, Please change your search criteria and try again.";
        //     return;
        // } else {
        var BusinessCenter1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${BusinessCenter1}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // }
    }
    public viewDistrictReport() {
        this.createDates();
        // if (this.selectedDC == "") {
        //     this.showIframe = false;
        //     this.msg = "Please select Dealer Code to view the report";
        //     return;
        // } else if (!this.dealerCodesBelongsToThisBCOrDist) {
        //     this.showIframe = false;
        //     this.msg = "The information entered is invalid, Please change your search criteria and try again.";
        //     return;
        // } else {
        var BusinessCenter312 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${BusinessCenter312}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // }
    }
    public viewDealerReport() {
        this.createDates();
        var DEALERCODE980 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DEALERCODE980}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    public viewParticipantReport() {
        this.createDates();
        var SID = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${SID}&FromDate=${this.fromDate}&ToDate=${this.toDate}`; console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
