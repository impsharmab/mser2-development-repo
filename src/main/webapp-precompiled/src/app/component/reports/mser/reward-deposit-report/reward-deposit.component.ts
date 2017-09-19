import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

declare var $: any;

@Component({
    selector: 'reward-deposit-report',
    templateUrl: './reward-deposit-report.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    //styleUrls: ['./marketing-home.component.css'] 
})
export class RewardsDepositReportComponent implements OnInit {

    constructor(private domSanitizer:DomSanitizer) { }

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

    private showExecutiveRewardDepositReportIframe: boolean = true;
    private showDistrictRewardDepositReportIframe: boolean = false;
    private showDealerRewardDepositReportIframe: boolean = false;
    private showParticicpantRewardDepositReportIframe: boolean = false;
    private showDetailRewardDepositReportIframe: boolean = false;
    private viewExecutiveRewardDepositReport() {
        this.showExecutiveRewardDepositReportIframe = true;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
    }
    private viewDistrictRewardDepositReport() {
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = true;
        this.showDealerRewardDepositReportIframe = false;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
    }
    private viewDealerRewardDepositReport() {
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = true;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = false;
    }
    private viewParticicpantRewardDepositReport() {
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showExecutiveRewardDepositReportIframe = true;
        this.showDetailRewardDepositReportIframe = false;
    }
    private viewDetailRewardDepositReport() {
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDistrictRewardDepositReportIframe = false;
        this.showDealerRewardDepositReportIframe = false;
        this.showExecutiveRewardDepositReportIframe = false;
        this.showDetailRewardDepositReportIframe = true;
    }

    
}