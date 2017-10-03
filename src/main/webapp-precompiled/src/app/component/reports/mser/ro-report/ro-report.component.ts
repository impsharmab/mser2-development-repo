import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { ROReportInterface } from "./ro-report.interface";
import { SelectItem } from 'primeng/primeng';

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
    private program = "Enrollment_Admin";
    private fromDate: string = "";
    private toDate: string = "";
    private roReportInterface: ROReportInterface = {
        "from": this.fromDate,
        "to": this.toDate,
        "dealerCode": "",
        "roNumber": ""
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

    private showROReportIframe: boolean = false;
    private showROReport() {
        this.showROReportIframe = true;
        var programName = "RepairOrder"
        var RepairOrderSD = this.roReportInterface.from;
        var RepairOrderED = this.roReportInterface.to;
        var DealerCode = this.roReportInterface.dealerCode;
        var RONumber = this.roReportInterface.roNumber;

        var src1 = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${programName}&RepairOrderSD=${RepairOrderSD}&RepairOrderED=${RepairOrderED}&DealerCode=${DealerCode}&RONumber=${RONumber}`;
        console.log(src1);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src1);
    }

}