import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

declare var $: any;

@Component({
    selector: 'ineligible-ro-report',
    templateUrl: './ineligible-ro-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    //styleUrls: ['./marketing-home.component.css'] 
})
export class IneligibleROReportComponent implements OnInit {
    private showExecutiveInelligibleROReport: boolean = true;
    private showDistrictInelligibleROReport: boolean = false;
    private showDealerInelligibleRODepositReport: boolean = false;


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

    private openExecutiveInelligibleROReport() {
        this.showExecutiveInelligibleROReport = true;
        this.showDistrictInelligibleROReport = false;
        this.showDealerInelligibleRODepositReport = false;
    }

    private openDistrictInelligibleROReport() {
        this.showExecutiveInelligibleROReport = false;
        this.showDistrictInelligibleROReport = true;
        this.showDealerInelligibleRODepositReport = false;
    }

    private openDealerInelligibleRODepositReport() {
        this.showExecutiveInelligibleROReport = false;
        this.showDistrictInelligibleROReport = false;
        this.showDealerInelligibleRODepositReport = true;
    }

    private openInalegibleROReportLink() {
        var programName = "Enrollment_Admin"
        var src = `http://172.25.32.40/reports/ReportServlet?reportPath=MSER&reportName=${programName}`
        return this.domSanitizer.bypassSecurityTrustResourceUrl(src);

    }
}