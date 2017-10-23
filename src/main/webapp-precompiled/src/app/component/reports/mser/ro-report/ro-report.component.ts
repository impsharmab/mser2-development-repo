import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { ROReportInterface } from "./ro-report.interface";
import { SelectItem } from 'primeng/primeng';

import { ReportService } from "../../../../services/report/report-service";
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
        } else if (role == 6 || role == 9) {
            this.isParticipantUser = true;

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
    public showROReport() {
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
            this.showROReportIframe = false;
            var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${DealerCode}&RONumber=${RONumber}`;
        } else if (this.isBCUser) {
            var DEALERCODE = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            var dealerCode = this.roReportInterface.dealerCode;
            this.getDealerCodesBelongsToBCAndDIST(DEALERCODE);
            if (dealerCode == "") {
                this.showROReportIframe = false;
            } else if (dealerCode != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(dealerCode) <= -1) {
                this.dealerCodeNotBelongsToThisBC = "Sorry the SID you have entered does not belongs to this Business Center";
                this.showROReportIframe = false;
            } else {
                var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${dealerCode}&RONumber=${RONumber}`;
            }

        } else if (this.isDistrictUser) {


        }
        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}