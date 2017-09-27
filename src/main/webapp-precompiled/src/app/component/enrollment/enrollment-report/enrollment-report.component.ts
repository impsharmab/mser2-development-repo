import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import { EnrollmentReportInterface } from "./enrollment-report.interface";
declare var $: any;

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrls: ['./enrollment-report.component.css']
})
export class EnrollmentReportComponent implements OnInit {
  private showExecutiveEnrollmentReportIframe: boolean = false;
  private showBCEnrollmentReportIframe: boolean = false;
  private showDistrictEnrollmentReportIframe: boolean = false;
  private showDealerEnrollmentReportIframe: boolean = false;
  private showParticipantEnrollmentReportIframe: boolean = false;
  private showDetailEnrollmentReportIframe: boolean = false;
  private programName: string = "";
  private src: any;
  private selectedProgramList: any = [];
  private enrollmentReportInterface: EnrollmentReportInterface = {
    programGroup: "",
    businessCenter: "",
    district: "",
    dealerCode: ""
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

  private enrollmentReportProgramOptions: SelectItem[] = [
    { label: "Mopar Parts & Engines", value: "4" },
    { label: "Express Lane", value: "1" },
    { label: "Parts Counter", value: "6" }
  ]

  private viewEXTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.enrollmentReportInterface = {
      businessCenter: "",
      district: "",
      dealerCode: "",
      programGroup: ""
    }
    this.selectedProgramList = ["4", "1", "6"];
    this.showExDepositReport();
  }
  private viewBCTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.enrollmentReportInterface = {
      businessCenter: "",
      district: "",
      dealerCode: "",
      programGroup: ""
    }
    this.selectedProgramList = ["4", "1", "6"];
  }

  private viewDistrictTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.enrollmentReportInterface = {
      businessCenter: "",
      district: "",
      dealerCode: "",
      programGroup: ""
    }
    this.selectedProgramList = ["4", "1", "6"];
    this.viewDistrictEnrollmentReport();
  }

  private viewDealerTabOnly() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.enrollmentReportInterface = {

      businessCenter: "", district: "", dealerCode: "", programGroup: "",

    }

    // this.viewDealerEnrollmentReport();
  }

  private viewParticipantTabOnly() {
    //  this.createBCProgramOptions();
    var sid = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.enrollmentReportInterface = {

      businessCenter: "", district: "", dealerCode: "", programGroup: ""



    }


    // this.viewParticipantEnrollmentReport();
  }
  private showExDepositReport() {
    this.showExecutiveEnrollmentReportIframe = true;
    this.programName = "Enrollment_Executive";
    var ProgramGroup = "";

    for (var i = 0; i < this.selectedProgramList.length; i++) {
      ProgramGroup = ProgramGroup + "&ProgramGroup=" + this.selectedProgramList[i];
    }
    console.log(ProgramGroup);
    this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}${ProgramGroup}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  private viewBCEnrollmentReport() {
    this.showBCEnrollmentReportIframe = true;
    this.programName = "Enrollment_BC";
    var BusinessCenter = this.enrollmentReportInterface.businessCenter;
    var ProgramGroup = "";
    for (var i = 0; i < this.selectedProgramList.length; i++) {
      ProgramGroup = ProgramGroup + "&ProgramGroup=" + this.selectedProgramList[i];
    }
    this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&BusinessCenter=${BusinessCenter}${ProgramGroup}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  private viewDistrictEnrollmentReport() {
    this.showDistrictEnrollmentReportIframe = true;
    this.programName = "Enrollment_DIST";
    var District = this.enrollmentReportInterface.district;
    var ProgramGroup = "";

    for (var i = 0; i < this.selectedProgramList.length; i++) {
      ProgramGroup = ProgramGroup + "&ProgramGroup=" + this.selectedProgramList[i];
    }

    this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&District=${District}${ProgramGroup}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  private viewDealerEnrollmentReport() {
    this.showDealerEnrollmentReportIframe = true;
    this.programName = "Enrollment_Dealer";
    var DealerCode = this.enrollmentReportInterface.dealerCode;
    
     this.src = `https://backoffice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DealerCode}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }




}
