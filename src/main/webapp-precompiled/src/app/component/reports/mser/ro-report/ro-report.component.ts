import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { ROReportInterface } from "./ro-report.interface";
import { SelectItem } from 'primeng/primeng';

import { ReportService } from "../../../../services/report/report-service";
import * as reportServiceUrl from '../../../../global-variable/service-url';
declare var $: any;

@Component({
    selector: 'ro-report',
    templateUrl: './ro-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    //styleUrls: ['./marketing-home.component.css'] 
})
export class ROReportComponent implements OnInit {
    public program = "Enrollment_Admin";
    public fromDate: string = "";
    public toDate: string = "";
    public isAdmin: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public minDate: Date;
    public maxDate: Date;

    public roReportInterface: ROReportInterface = {
        "from": this.fromDate,
        "to": this.toDate,
        "dealerCode": "",
        "roNumber": ""
    }

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

        this.roReportInterface = {
            "from": this.fromDate,
            "to": this.toDate,
            "dealerCode": "",
            "roNumber": ""
        }
        this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;

        if (this.isAdmin) {
            this.isExecutiveUser = true;
        }

        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(today.getFullYear());
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.checkRoles();
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
    public src: any = "";

    public checkRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
            this.isExecutiveUser = true;
        } else if (role == 12) {
            this.isBCUser = true;
        } else if (role == 11) {
            this.isDistrictUser = true;
        } else if (role == 5) {
            this.isManagerUser = true;
        } else if (role == 10) {
            this.isDealerUser = true;
            this.disableDealerCodeInputField = true;
            this.roReportInterface.dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (role == 6 || role == 9) {
            this.isParticipantUser = true;
            this.disableDealerCodeInputField = true;
            this.roReportInterface.dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

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
    public showROReportIframe: boolean = false;
    public dealerCodeNotBelongsToThisBC: string = "";
    public msg: string = "";
    public disableDealerCodeInputField: boolean = false;
    public showROReport() {
        this.showROReportIframe = false;
        this.dealerCodeNotBelongsToThisBC = "";
        this.msg = "";
        if (this.roReportInterface.dealerCode == "" && this.roReportInterface.roNumber == "") {
            this.msg = "Please enter Dealer Code and RO Number to view the report";
            return;
        } else if (this.roReportInterface.dealerCode != "" && this.roReportInterface.roNumber == "") {
            this.msg = "Please enter the valid RO Number";
            return;
        } else if (this.roReportInterface.dealerCode == "" && this.roReportInterface.roNumber != "") {
            this.msg = "Please enter valid Dealer Code";
            return;
        }

        var programName = "RepairOrder"
        var RepairOrderSD = this.roReportInterface.from;
        var RepairOrderED = this.roReportInterface.to;
        var DealerCode = this.roReportInterface.dealerCode;
        var RONumber = this.roReportInterface.roNumber;

        if (this.isExecutiveUser) {
            var dealerCode = this.roReportInterface.dealerCode;
            this.getDealerCodesBelongsToBCAndDIST("NAT");
            if (dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dealerCode) <= -1) {
                this.msg = "Sorry, the dealer code you have entered does not belongs to any Business Center";
                this.showROReportIframe = false;
            } else {
                this.showROReportIframe = true;
            }
            var src1 = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${dealerCode}&RONumber=${RONumber}`;
        } else if (this.isBCUser) {
            var DEALERCODE1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var dealerCode1 = this.roReportInterface.dealerCode;
            this.getDealerCodesBelongsToBCAndDIST(DEALERCODE1);
            if (dealerCode1 == "") {
                this.showROReportIframe = false;
            } else if (dealerCode1 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dealerCode1) <= -1) {
                this.dealerCodeNotBelongsToThisBC = "Sorry the Dealer Code you have entered does not belongs to this Business Center";
                this.showROReportIframe = false;
            } else {
                this.showROReportIframe = true;
                var src1 = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${dealerCode1}&RONumber=${RONumber}`;
            }

        } else if (this.isDistrictUser) {
            var DEALERCODE2 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var dealerCode2 = this.roReportInterface.dealerCode;
            this.getDealerCodesBelongsToBCAndDIST(DEALERCODE2);
            if (dealerCode2 == "") {
                this.showROReportIframe = false;
            } else if (dealerCode2 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dealerCode2) <= -1) {
                this.dealerCodeNotBelongsToThisBC = "Sorry the Dealer Code you have entered does not belongs to this Business Center";
                this.showROReportIframe = false;
            } else {
                this.showROReportIframe = true;
                var src1 = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${dealerCode2}&RONumber=${RONumber}`;
            }


        } else if (this.isDealerUser || this.isParticipantUser) {
            var DEALERCODE3 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.roReportInterface.dealerCode = DEALERCODE3;
            var src1 = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${DEALERCODE3}&RONumber=${RONumber}`;
        }
        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}