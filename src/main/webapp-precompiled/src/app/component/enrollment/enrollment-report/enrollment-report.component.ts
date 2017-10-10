import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../global-variable/user-matrix';
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
  private selectedPositionCode: any = "";

  private isAdmin: boolean = false;
  private isAdminByPC: boolean = false;
  private isExecutive: boolean = false;
  private isNational: boolean = false;
  private isDealer: boolean = false;
  private isBC: boolean = false;
  private isDistrict: boolean = false;
  private isManager: boolean = false;
  private isParticipant: boolean = false;
  private tabNumber: any = "tab1";
  private fromDate: any = "";
  private toDate: any = "";

  private enrollmentReportInterface: EnrollmentReportInterface = {
    programGroup: "",
    businessCenter: "",
    district: "",
    dealerCode: ""
  }

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
    if (this.isAdmin) {
      this.tabNumber = "tab1";
      this.isNational = true;
      this.isAdminByPC = true;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
    }
    var d = new Date;
    var today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
    this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();
    this.squarify();
    this.renderTab();
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
      defaultTab: this.tabNumber,
      orientation: "horizontal"
    });
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


  private enrollmentMatrix() {
    this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    if (this.selectedPositionCode != undefined && this.selectedPositionCode == "IAD") {
      this.tabNumber = "tab1";
      this.isNational = true;
      this.isAdminByPC = true;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
    } else if (this.selectedPositionCode != undefined && this.selectedPositionCode == "NAT") {
      this.tabNumber = "tab1";
      this.isNational = true;
      this.isAdminByPC = false;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
    } else if (this.selectedPositionCode != undefined && this.selectedPositionCode == "BC") {
      this.tabNumber = "tab2";
      this.isNational = false;
      this.isAdminByPC = false;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
    } else if (this.selectedPositionCode != undefined && this.selectedPositionCode == "DOM") {
      this.tabNumber = "tab3";
      this.isNational = false;
      this.isAdminByPC = false;
      this.isBC = false;
      this.isDistrict = true;
      this.isManager = true;
    } else if (this.selectedPositionCode != undefined && this.selectedPositionCode == "DST") {
      this.tabNumber = "tab3";
      this.isNational = false;
      this.isAdminByPC = false;
      this.isBC = false;
      this.isDistrict = true;
      this.isManager = true;

    }
  }
  private viewEXTabOnly() {
    this.showExecutiveEnrollmentReportIframe = true;
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
    this.showBCEnrollmentReportIframe = true;
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
    this.viewBCEnrollmentReport();
  }

  private viewDistrictTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = true;
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
    this.showDealerEnrollmentReportIframe = true;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.enrollmentReportInterface = {

      businessCenter: "", district: "", dealerCode: "", programGroup: "",

    }

    this.viewDealerEnrollmentReport();
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
    this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}`;
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
    this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&BusinessCenter=${BusinessCenter}`;
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

    this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&District=${District}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  private viewDealerEnrollmentReport() {
    this.showDealerEnrollmentReportIframe = true;
    this.programName = "Enrollment_Dealer";
    var DealerCode = this.enrollmentReportInterface.dealerCode;

    this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DealerCode}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }




}
