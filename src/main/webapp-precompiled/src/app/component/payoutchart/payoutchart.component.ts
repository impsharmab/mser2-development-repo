import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

import { PayoutChartService } from '../../services/payout-chart/payout-chart.service';

import * as userMatrix from '../../global-variable/user-matrix';

declare var $;
@Component({
    selector: 'app-payoutchart',
    templateUrl: './payoutchart.html',
    styleUrls: ['./payoutchart.component.css']
})
export class PayoutchartComponent implements OnInit {
    public payoutCMSObject: any;
    public iconPartsModalData: any = [];
    public tabNumber: any = "tab1";
    public testData: any = 0;
    constructor(
        private payoutChartService: PayoutChartService,
        private sanitizer: DomSanitizer,
        private chRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        this.openCMSPage("PayoutChartMonthlyHighlights");
        // this.parentZOZOTab();
        // this.nestedZOZOTab();
        this.getPayoutChartData();
        // this.parentZOZOTab();
        // this.nestedZOZOTab();

    }
    public parentZOZOTab() {
        this.identifyTabsPriority();
        /* jQuery activation and setting options for parent tabs with id selector*/
        $("#tabbed-nav").zozoTabs({
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
        this.chRef.detectChanges();
        setTimeout(() => {
            this.nestedZOZOTab();
        }, 1000)
        // this.nestedZOZOTab();
    }
    public nestedZOZOTab() {
        /* jQuery activation and setting options for nested tabs with class selector*/
        // this.chRef.detectChanges();
        $(".nested-tabs").zozoTabs({
            position: "top-left",
            theme: "red",
            style: "underlined",
            rounded: false,
            shadows: false,
            defaultTab: "tab1",
            animation: {
                easing: "easeInOutCirc",
                effects: "slideV"
            },
            size: "medium"
        });
    }

    public identifyTabsPriority() {
        var selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;

        if (userMatrix.payoutchartHomeMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab1"
        } else if (userMatrix.payoutchartServiceAdvisorMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab2";
        } else if (userMatrix.payoutchartServiceTechnicianMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab3";
        } else if (userMatrix.payoutchartPartsCounterMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab4";
        } else if (userMatrix.payoutchartUVMMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab5";
        }

    }
    public iconPartsModalHeading: string = "";
    public showIconPartsModal(data, data2Name) {
        this.chRef.detectChanges();
        this.iconPartsModalData = [];
        this.iconPartsModalHeading = "";
        if (data != undefined && data.parts.length > 0) {
            this.iconPartsModalData = data.parts;
        }
        if (data2Name != 'MOPAR VEHICLE PROTECTION') {
            this.iconPartsModalHeading = "Qualifying Part Numbers.";
        } else {
            this.iconPartsModalHeading = "Eligible Plan Codes.";
        }
    }
    public openCMSPage(pageName: string) {
        this.payoutChartService.getPayoutCMSPage(pageName).subscribe(
            (payoutCMSObject) => {
                this.payoutCMSObject = this.sanitizer.bypassSecurityTrustHtml(payoutCMSObject)
            },
            (error) => {
                alert("could not able to open cms content")
            }
        )
    }

    public payoutChartDatum: any;
    public getPayoutChartData() {
        this.payoutChartService.getPayoutChartData().subscribe(
            (payoutChartDatum) => {
                this.payoutChartDatum = (payoutChartDatum)
                // console.log(this.payoutChartDatum);
                // console.log(this.payoutChartDatum.length);
                this.chRef.detectChanges();
                // setTimeout(() => {
                this.parentZOZOTab();
                // this.nestedZOZOTab();
                // }, 1000)

            },
            (error) => {
                alert("could not get object")
            }
        )
    }

    public thisMonth: string = "";
    public addMonthOnPrint() {
        // this.chRef.detectChanges();
        this.thisMonth = "Hello Testing";
        this.chRef.detectChanges();
        window.print();
    }
}
