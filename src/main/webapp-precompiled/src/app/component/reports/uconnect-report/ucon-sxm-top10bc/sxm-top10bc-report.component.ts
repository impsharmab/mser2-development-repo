import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';


import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'app-sxm-top10-report',
    templateUrl: './sxm-top10-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class SXMTop10BCReportComponent implements OnInit {

    public showExIFrame: boolean = false;
    public showBCIFrame: boolean = false;

    public selectedRole: any;
    public isAdminUser: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;

    public viewExecutiveTab: boolean = false;
    public viewBCTab: boolean = false;

    public msg = "";
    public src: any;

    public selectedPositionCode: any = "";
    public disableBCInput: boolean = false;
    public selectedBC: string = "";

    public minDate: Date;
    public maxDate: Date;
    public tabNumber: any = "";
    public fromDate: any = "";
    public toDate: any = "";

    public bcOptions: SelectItem[] =
    [
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

    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
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
            this.viewEXTabOnly();
        } else if (this.selectedRole == 1) {
            this.tabNumber = "tab1";
            this.isExecutiveUser = true;
            this.viewExecutiveTab = true;
            this.viewBCTab = true;
            this.viewEXTabOnly();
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.tabNumber = "tab2";
            this.selectedBC = BC;
            this.isBCUser = true;
            this.viewExecutiveTab = false;
            this.viewBCTab = true;
            this.disableBCInput = true;
            this.viewBCTabOnly();
        }

        this.renderTab();
        // this.chRef.detectChanges();
    }

    public viewEXTabOnly() {
        this.msg = "";
        this.showExIFrame = true;
        this.showExReport();
    }
    public viewBCTabOnly() {
        this.msg = "";
        this.showBCIFrame = false;
        this.viewBCReport();
    }

    public showExReport() {
        this.showExIFrame = true;
        var programName = "SXMTop10BC";
        this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=NAT&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
        // this.chRef.detectChanges();
    }

    public viewBCReport() {
        this.showBCIFrame = true;
        var programName = "SXMTop10BC";
        if (this.isExecutiveUser) {
            if (this.selectedBC == "") {
                this.showBCIFrame = false;
                return;
            }
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=${this.selectedBC}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        } else if (this.isBCUser) {
            var BusinessCenter1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&BusinessCenter=${BusinessCenter1}&FromDate=${this.fromDate}&ToDate=${this.toDate}`;
        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
