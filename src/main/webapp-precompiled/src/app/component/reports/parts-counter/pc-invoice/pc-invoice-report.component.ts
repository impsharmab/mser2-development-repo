import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { PCInvoiceInterface } from "./pc-invoice-interface";
import { SelectItem } from 'primeng/primeng';

declare var $: any;

@Component({
    selector: 'pc-invoice-report',
    templateUrl: './pc-invoice-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    //styleUrls: ['./marketing-home.component.css'] 
})
export class PCInvoiceReportComponent implements OnInit {
    private program = "";
    private fromDate: string = "";
    private toDate: string = "";
    private pcInvoiceInterface: PCInvoiceInterface = {
        "from": this.fromDate,
        "to": this.toDate,
        "dealerCode": ""
    }

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        this.squarify();
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
        /* jQuery activation and setting options for parent tabs with id selector*/
        this.renderTab();

        this.pcInvoiceInterface = {
            "from": this.fromDate,
            "to": this.toDate,
            "dealerCode": ""
        }
        this.openPCInvoiceReportLink();
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
    onResize(event) {
        this.squarify();
        //event.target.innerWidth; // window width
    }
    private src: any = "";
    private openPCInvoiceReportLink() {
    }

    private showPCInvoiceReportIframe: boolean = false;
    private dealerCodeOptions: SelectItem[] = [
        { label: "26550", value: "26550" },
        { label: "45614", value: "45614" },
        { label: "86250", value: "86250" }
    ]
    private selectedDealerList: any = [];
    private showPCInvoiceReport() {
        this.showPCInvoiceReportIframe = true;
        var programName = "PCDistribution_InvoiceDetails"
        var PCDDL="";
        var PCDDLFD = this.pcInvoiceInterface.from;
        var PCDDLTD = this.pcInvoiceInterface.to;
        for (var i = 0; i < this.selectedDealerList.length; i++) {
            PCDDL = PCDDL + "&PCDDL=" + this.selectedDealerList[i];
        }

        var src1 = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}${PCDDL}&PCDDLFD=${PCDDLFD}&PCDDLTD=${PCDDLTD}`;
        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}