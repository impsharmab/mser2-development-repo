import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { PartsSummaryRO } from "./parts-summary.interface";
import { SelectItem } from 'primeng/primeng';

import * as reportServiceUrl from '../../../../global-variable/service-url';

import { ReportService } from "../../../../services/report/report-service";

declare var $: any;

@Component({
    selector: 'parts-summary-ro-report',
    templateUrl: './parts-summary-ro.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    //styleUrls: ['./marketing-home.component.css'] 
})
export class PartsSummaryROReportComponent implements OnInit {
    public fromDate: string = "";
    public toDate: string = "";
    public partsSummaryROInterface: PartsSummaryRO = {
        "from": this.fromDate,
        "to": this.toDate,
        "dealerCode": ""
    }
    public partsSummaryROProgramOptions: SelectItem[] = [
        // { label: "Mopar Parts & Engines", value: "4" },
        // { label: "Magneti Marelli", value: "2" },
        // { label: "Express Lane", value: "1" },
        // { label: "Mopar Upfits", value: "3" }
    ]


    public minDate: Date;
    public maxDate: Date;

    public selectedProgramList: any = [];
    public isAdmin: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;
    public disableDealerCodeInputField: boolean = false;
    constructor(
        private domSanitizer: DomSanitizer,
        private reportService: ReportService
    ) { }

    ngOnInit() {
        this.getReportPrograms();
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        this.squarify();
        /* jQuery activation and setting options for parent tabs with id selector*/
        this.renderTab();
        this.partsSummaryROInterface = {
            "from": this.fromDate,
            "to": this.toDate,
            "dealerCode": ""
        }

        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(today.getFullYear() - 1);
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;

        if (this.isAdmin) {
            this.isExecutiveUser = true;
            this.getDealerCodesBelongsToBCAndDIST("NAT");
        }

        this.checkRoles();
        this.openROReportLink();
        this.resizeMe();
    }

    public resizeMe() {
        var blah = window.innerHeight;
        console.log("window is: ", blah + "px high");
        /* 302 is the combined height of the header and footer */
        blah = blah - 302;
        $("main, mser-cms").css("min-height", "calc(" + blah + "px - 2rem)");
        console.log("main is now: ", blah + "px high");
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
    public repairOrdersReportPrograms: any = [];
    public getReportPrograms() {
        this.reportService.getReportPrograms("RepairOrdersReportPrograms").subscribe(
            (repairOrdersReportPrograms) => {
                this.repairOrdersReportPrograms = (repairOrdersReportPrograms)
                this.createPartsSummaryROProgramOptions();
                for (var i = 0; i < this.repairOrdersReportPrograms.length; i++) {
                    this.selectedProgramList.push(this.repairOrdersReportPrograms[i].value);
                }
            },
            (error) => {
            }
        )
    }

    public createPartsSummaryROProgramOptions() {
        var partsSummaryROProgramOptions: SelectItem[] = [];
        for (var i = 0; i < this.repairOrdersReportPrograms.length; i++) {
            partsSummaryROProgramOptions.push({ label: this.repairOrdersReportPrograms[i].name, value: this.repairOrdersReportPrograms[i].value })
        }
        this.partsSummaryROProgramOptions = partsSummaryROProgramOptions;


    }
    public checkRoles() {
        var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (role == 1) {
            this.isExecutiveUser = true;
            this.getDealerCodesBelongsToBCAndDIST("NAT");
        } else if (role == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.isBCUser = true;
            this.getDealerCodesBelongsToBCAndDIST(BC);
        } else if (role == 11) {
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.isDistrictUser = true;
            this.getDealerCodesBelongsToBCAndDIST(DIST);
        } else if (role == 10 || role == 5) {
            this.isDealerUser = true;
            this.disableDealerCodeInputField = true;
            this.partsSummaryROInterface.dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (role == 6 || role == 9) {
            this.isParticipantUser = true;
            this.disableDealerCodeInputField = true;
            this.partsSummaryROInterface.dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

        }
    }
    onResize(event) {
        this.squarify();
        //event.target.innerWidth; // window width
    }
    public src: any = "";
    public openROReportLink() {
    }
    private dealerCodesBelongsToThisBCOrDist: any = [];
    private getDealerCodesBelongsToBCAndDIST(bcOrDist) {
        this.reportService.getDealerCodesBelongsToBCAndDIST(bcOrDist).subscribe(
            (dealerCodesBelongsToThisBCOrDist) => {
                this.dealerCodesBelongsToThisBCOrDist = (dealerCodesBelongsToThisBCOrDist)
                // setTimeout(() => {

                // }, 500);
                console.log(this.dealerCodesBelongsToThisBCOrDist);
            },
            (error) => {
            }
        )
    }

    public showPartsSummaryROReportIframe: boolean = false;
    public msg: string = "";
    public showPartsSummaryROReport() {
        this.msg = "";
        this.showPartsSummaryROReportIframe = true;
        var programName = "SummaryRepairOrder"
        var FromDate = this.partsSummaryROInterface.from;
        var ToDate = this.partsSummaryROInterface.to;
        var DealerCode = this.partsSummaryROInterface.dealerCode;
        var ProgramGroup = "";
        if (this.selectedProgramList.length == 0 && this.partsSummaryROInterface.dealerCode == "") {
            this.msg = "Please enter dealer code and select program to view the report";
            this.showPartsSummaryROReportIframe = false;
            return;
        }
        else if (this.selectedProgramList.length == 0) {
            this.msg = "Please select program to view the report";
            this.showPartsSummaryROReportIframe = false;
            return;
        } else {
            for (var i = 0; i < this.selectedProgramList.length; i++) {
                ProgramGroup = ProgramGroup + "&ProgramGroup=" + this.selectedProgramList[i];
            }
        }
        if (this.partsSummaryROInterface.dealerCode == "") {
            this.showPartsSummaryROReportIframe = false;
            this.msg = "Please enter Dealer Code to view the report";
            return;
        }
        if (this.isExecutiveUser) {
            // this.getDealerCodesBelongsToBCAndDIST("NAT");
            var DEALERCODE = this.partsSummaryROInterface.dealerCode;
            if (DEALERCODE != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE) <= -1) {
                this.showPartsSummaryROReportIframe = false;
                this.msg = "The information entered is invalid. Please change your search criteria and try again.";
                return;
            } else {
                this.showPartsSummaryROReportIframe = true;
            }
            var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${FromDate}&ToDate=${ToDate}&DealerCode=${DealerCode}${ProgramGroup}`;
        }

        if (this.isBCUser) {
            var DEALERCODE1 = this.partsSummaryROInterface.dealerCode;
            if (DEALERCODE1 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE1) <= -1) {
                this.showPartsSummaryROReportIframe = false;
                this.msg = "The information entered is invalid. Please change your search criteria and try again.";
                return;
            } else {
                this.showPartsSummaryROReportIframe = true;
            }
            var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${FromDate}&ToDate=${ToDate}&DealerCode=${DEALERCODE1}${ProgramGroup}`;
        }
        if (this.isDistrictUser) {
            var DEALERCODE12 = this.partsSummaryROInterface.dealerCode;
            if (DEALERCODE12 != "" && this.dealerCodesBelongsToThisBCOrDist.indexOf(DEALERCODE12) <= -1) {
                this.showPartsSummaryROReportIframe = false;
                this.msg = "The information entered is invalid. Please change your search criteria and try again.";
                return;
            } else {
                this.showPartsSummaryROReportIframe = true;
            }
            var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${FromDate}&ToDate=${ToDate}&DealerCode=${DEALERCODE12}${ProgramGroup}`;
        }
        if (this.isDealerUser || this.isParticipantUser) {
            var DEALERCODE123 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.disableDealerCodeInputField = true;
            this.showPartsSummaryROReportIframe = true;
            this.partsSummaryROInterface.dealerCode = DEALERCODE123;
            var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${FromDate}&ToDate=${ToDate}&DealerCode=${DEALERCODE123}${ProgramGroup}`;
        }

        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}