import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';


import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'spin-detail-report',
    templateUrl: './swbc-spin-detail-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class SWBCSpinDetailReportComponent implements OnInit {

    public showIFrame: boolean = false;
    public src: any;
    public msg: string = "";

    public selectedPeriod: string = "";
    public weekOptions: SelectItem[] = [];
    // [
    //     { label: "Week1 (01 Oct to 06 Oct)", value: "1" },
    //     { label: "Week2 (07 Oct to 13 Oct)", value: "2" },
    //     { label: "Week3 (14 Oct to 20 Oct)", value: "3" },
    //     { label: "Week4 (21 Oct to 27 Oct)", value: "4" },
    //     { label: "Week5 (28 Oct to 03 Nov)", value: "5" },
    //     { label: "Week6 (04 Nov to 10 Nov)", value: "6" },
    //     { label: "Week7 (11 Nov to 17 Nov)", value: "7" },
    //     { label: "Week8 (18 Nov to 24 Nov)", value: "8" },
    //     { label: "Week9 (25 Nov to 30 Nov)", value: "9" }
    // ]
    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.getPeriods();
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

    public getPeriods() {
        this.reportService.getPeriod().subscribe(
            (weekOptions) => {
                this.weekOptions = (weekOptions)
            },
            (error) => {

            }
        )
    }
    public disableDealerButton: boolean = false;
    public disableParticipantButton: boolean = false;
    public viewReport() {
        if (this.selectedPeriod == "") {
            this.showIFrame = false;
            this.msg = "Please select period to view the report";
            return;
        } else {
            this.msg = "";
            this.showIFrame = true;
            var programName = "SWBCSpinsDetailedSummary_Excel";
            this.src = reportServiceUrl.reportUrl + `ReportServlet?reportPath=MSER&reportName=${programName}&Period=${this.selectedPeriod}`;

        }
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
