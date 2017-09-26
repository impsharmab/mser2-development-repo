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
    
    private partsSummaryROInterface: PartsSummaryRO = {
        "from": "",
        "to": "",
        "dealerCode": ""
    }

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        this.squarify();
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

        this.partsSummaryROInterface = {
            "from": "9/1/2017",
            "to": "9/30/2017",
            "dealerCode": ""
        }
        this.openROReportLink();
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
        

        var src1 = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${programName}&FromDate=${FromDate}&ToDate=${ToDate}&DealerCode=${DealerCode}`;
        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}