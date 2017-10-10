import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { PartsSummaryRO } from "./parts-summary.interface";
import { SelectItem } from 'primeng/primeng';

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
    private fromDate: string = "";
    private toDate: string = "";
    private partsSummaryROInterface: PartsSummaryRO = {
        "from": this.fromDate,
        "to": this.toDate,
        "dealerCode": ""
    }
    private partsSummaryROProgramOptions: SelectItem[] = [
        { label: "Mopar Parts & Engines", value: "4" },
        { label: "Magneti Marelli", value: "2" },
        { label: "Express Lane", value: "1" },
        { label: "Mopar Accessories", value: "3" }
    ]
    private selectedProgramList: any = [];

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
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
        this.openROReportLink();
    }

    private renderTab() {
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
    private squarify() {
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
    private src: any = "";
    private openROReportLink() {
    }

    private showPartsSummaryROReportIframe: boolean = false;
    private showPartsSummaryROReport() {
        this.showPartsSummaryROReportIframe = true;
        var programName = "SummaryRepairOrder"
        var FromDate = this.partsSummaryROInterface.from;
        var ToDate = this.partsSummaryROInterface.to;
        var DealerCode = this.partsSummaryROInterface.dealerCode;
        var ProgramGroup;


        var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${FromDate}&ToDate=${ToDate}&DealerCode=${DealerCode}`;
        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}