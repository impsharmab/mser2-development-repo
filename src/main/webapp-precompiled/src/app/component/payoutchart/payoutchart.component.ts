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
    private payoutCMSObject: any;
    private iconPartsModalData: any = [];
    private tabNumber: any = "tab1";
    constructor(
        private payoutChartService: PayoutChartService,
        private sanitizer: DomSanitizer,
        private chRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        this.openCMSPage("PayoutChartHome");
        // this.parentZOZOTab();
        // this.nestedZOZOTab();
        this.getPayoutChartData();
        // this.parentZOZOTab();
        // this.nestedZOZOTab();

    }
    private parentZOZOTab() {
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
    private nestedZOZOTab() {
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

    private identifyTabsPriority() {
        var selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;

        if (userMatrix.payoutchartHomeMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab1"
        } else if (userMatrix.payoutchartServiceAdvisorMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab3";
        } else if (userMatrix.payoutchartServiceTechnicianMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab4";
        } else if (userMatrix.payoutchartPartsCounterMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab5";
        } else if (userMatrix.payoutchartUVMMatrix.indexOf(selectedPositionCode) > -1) {
            this.tabNumber = "tab6";
        }

    }
    private showIconPartsModal(data) {
        if (data != undefined && data.parts.length > 0) {
            this.iconPartsModalData = data.parts;
        }

    }
    private openCMSPage(pageName: string) {
        this.payoutChartService.getPayoutCMSPage(pageName).subscribe(
            (payoutCMSObject) => {
                this.payoutCMSObject = this.sanitizer.bypassSecurityTrustHtml(payoutCMSObject)
            },
            (error) => {
                alert("could not able to open cms content")
            }
        )
    }

    private payoutChartDatum: any;
    private getPayoutChartData() {
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

}
