import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";


import { SelectItem } from 'primeng/primeng';

import { WiAdvisorTiresInterface } from './wiAdvisor-tire.interface';

declare var $: any;

@Component({
    selector: 'wiAdvisor-tire-report',
    templateUrl: './wiAdvisor-tire.html',
    host: {
        '(window:resize)': 'onResize($event)'
    }
    // styleUrls: ['./reward-deposit-report.css'] 
})
export class WiAdvisorTireReportComponent implements OnInit {

    private showExecutiveWiAdvisorTireReportIframe: boolean = false;
    private showBCWiAdvisorTireReportIframe: boolean = false;
    private showDistrictWiAdvisorTireReportIframe: boolean = false;
    private showDealerWiAdvisorTireReportIframe: boolean = false;
    private showParticipantWiAdvisorTireReportIframe: boolean = false;
    private showDetailWiAdvisorTireReportIframe: boolean = false;
    private programName: string = "";
    private src: any;
    private wiAdvisorTireInterface: WiAdvisorTiresInterface = {
        from: "9/1/2017",
        to: "9/30/2017",
        bc: "",
        district: "",
        dealerCode: "",
        sid: ""
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
                effects: "fade",
                easing: "easeInOutCirc",
                type: "jquery"
            },
            defaultTab: "tab1",
            orientation: "horizontal"
        });
        this.viewEXTabOnly();
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

    private viewEXTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            bc: "",
            district: "",
            dealerCode: "",
            sid: ""
        }

        this.showExDepositReport();
    }
    private viewBCTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            bc: "",
            district: "",
            dealerCode: "",
            sid: ""
        }
    }

    private viewDistrictTabOnly() {
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: "9/1/2017",
            to: "9/30/2017",
            bc: "",
            district: "",
            dealerCode: "",
            sid: ""
        }

        this.viewDistrictWiAdvisorTireReport();
    }

    private viewDealerTabOnly() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: "9/1/2017",
            to: "9/30/2017", bc: "", district: "", dealerCode: "", sid: "",

        }

        // this.viewDealerWiAdvisorTireReport();
    }

    private viewParticipantTabOnly() {
        //  this.createBCProgramOptions();
        var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        this.showExecutiveWiAdvisorTireReportIframe = false;
        this.showBCWiAdvisorTireReportIframe = false;
        this.showDistrictWiAdvisorTireReportIframe = false;
        this.showDealerWiAdvisorTireReportIframe = false;
        this.showParticipantWiAdvisorTireReportIframe = false;
        this.showDetailWiAdvisorTireReportIframe = false;
        this.wiAdvisorTireInterface = {
            from: "9/1/2017",
            to: "9/30/2017", bc: "", district: "", dealerCode: "", sid: ""



        }


        // this.viewParticipantWiAdvisorTireReport();
    }
    private showExDepositReport() {
        this.showExecutiveWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_Executive";
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private viewBCWiAdvisorTireReport() {
        this.showBCWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_BC";
        var BusinessCenter = this.wiAdvisorTireInterface.bc;
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;
        var RDBCPG = "";

        //https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=RewardDepositReward-BusinessCenter&RDBC=CA&RDBCFromDate=2017-07-19&RDBCToDate=2017-09-19&RDBCPG=Mopar%20Service%20Excellence%20Rewards%20-%20Used%20Vehicle%20Manager
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&BusinessCenter=${BusinessCenter}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDistrictWiAdvisorTireReport() {
        this.showDistrictWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_DIST";
        var District = this.wiAdvisorTireInterface.district;
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;

        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&District=${District}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    private viewDealerWiAdvisorTireReport() {
        this.showDealerWiAdvisorTireReportIframe = true;
        this.programName = "WiAdvisorTires_Dealer";
        var DealerCode = this.wiAdvisorTireInterface.dealerCode;
        var FromDate = this.wiAdvisorTireInterface.from;
        var ToDate = this.wiAdvisorTireInterface.to;
    
        this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DealerCode}&FromDate=${FromDate}&ToDate=${ToDate}`;
        console.log(this.src);
        this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    // private viewParticipantWiAdvisorTireReport() {
    //     this.showParticipantWiAdvisorTireReportIframe = true;
    //     this.programName = "WiAdvisorTireReport-Participant";
    //     var RDP = this.wiAdvisorTireInterface.sid;
    //     var RDPFromDate = this.wiAdvisorTireInterface.from;
    //     var RDPToDate = this.wiAdvisorTireInterface.to;
    //     var RDPPG = this.wiAdvisorTireInterface.program;
    //     for (var i = 0; i < this.selectedProgramList.length; i++) {
    //         RDPPG = RDPPG + "," + this.selectedProgramList[i];
    //     }
    //     this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&RDP=${RDP}&RDPFromDate=${RDPFromDate}&RDPToDate=${RDPToDate}&RDPPG=${RDPPG}`;
    //     console.log(this.src);
    //     this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
    // }


}