import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../global-variable/user-matrix';
import { EnrollmentReportInterface } from "./enrollment-report.interface";

import { ReportService } from '../../../services/report/report-service';
declare var $: any;

@Component({
  selector: 'app-enrollment-report',
  templateUrl: './enrollment-report.component.html',
  styleUrls: ['./enrollment-report.component.css']
})
export class EnrollmentReportComponent implements OnInit {
  public showExecutiveEnrollmentReportIframe: boolean = false;
  public showBCEnrollmentReportIframe: boolean = false;
  public showDistrictEnrollmentReportIframe: boolean = false;
  public showDealerEnrollmentReportIframe: boolean = false;
  public showParticipantEnrollmentReportIframe: boolean = false;
  public showDetailEnrollmentReportIframe: boolean = false;
  public programName: string = "";
  public src: any;
  public selectedProgramList: any = [];
  public selectedPositionCode: any = "";

  public isAdmin: boolean = false;
  public isAdminByPC: boolean = false;
  public isExecutive: boolean = false;
  public isNational: boolean = false;
  public isDealer: boolean = false;
  public isBC: boolean = false;
  public isDistrict: boolean = false;
  public isManager: boolean = false;
  public isParticipant: boolean = false;
  public tabNumber: any = "";
  public fromDate: any = "";
  public toDate: any = "";

  public enrollmentReportInterface: EnrollmentReportInterface = {
    programGroup: "",
    businessCenter: "",
    district: "",
    dealerCode: ""
  }

  constructor(private domSanitizer: DomSanitizer, private reportService: ReportService) { }

  ngOnInit() {
    this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
    if (this.isAdmin) {
      this.isExecutiveUser = true;
      this.tabNumber = "tab1";
      this.isNational = true;
      this.isAdminByPC = true;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
      this.viewEXTabOnly();
    }
    var d = new Date;
    var today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.fromDate = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
    this.toDate = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();


    this.checkRole();
    this.squarify();
    this.renderTab();

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
      defaultTab: this.tabNumber,
      orientation: "horizontal"
    });
  }
  onResize(event) {
    this.squarify();
    //event.target.innerWidth; // window width
  }
  public selectedRole: any;
  public isExecutiveUser: boolean = false;
  public isBCUser: boolean = false;
  public isDistrictUser: boolean = false;
  public isDealerUser: boolean = false;
  public isManagerUser: boolean = false;
  public isParticipantUser: boolean = false;
  public checkRole() {
    this.selectedRole = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
    if (this.selectedRole == 1) {

      this.isExecutiveUser = true;
      this.tabNumber = "tab1";
      this.isNational = true;
      this.isAdminByPC = true;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
      this.viewEXTabOnly();

    } else if (this.selectedRole == 12) {

      this.isBCUser = true;
      this.tabNumber = "tab2";
      this.isNational = false;
      this.isAdminByPC = false;
      this.isBC = true;
      this.isDistrict = true;
      this.isManager = true;
      this.viewBCTabOnly();

    } else if (this.selectedRole == 11) {

      this.isDistrictUser = true;
      this.tabNumber = "tab3";
      this.isNational = false;
      this.isAdminByPC = false;
      this.isBC = false;
      this.isDistrict = true;
      this.isManager = true;
      this.viewDistrictTabOnly();

    } else if (this.selectedRole == 10) {
      this.viewDealerTabOnly();
      this.isDealerUser = true;

    }
    // alert("inside checkrole " + this.tabNumber + this.isBC);

  }
  public districtByBCDatum: any;
  public getDistrictByBC(bc) {
    this.reportService.getDistrictByBC(bc).subscribe(
      (districtByBCDatum) => {
        this.districtByBCDatum = (districtByBCDatum)
        console.log(this.districtByBCDatum);
      },
      (error) => {


      }
    )

  }
  public enrollmentReportProgramOptions: SelectItem[] = [
    { label: "Mopar Parts & Engines", value: "4" },
    { label: "Express Lane", value: "1" },
    { label: "Parts Counter", value: "6" }
  ]

  public viewEXTabOnly() {
    this.showExecutiveEnrollmentReportIframe = true;
    this.showBCEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.showExDepositReport();
  }
  public viewBCTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = true;
    this.showDealerEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.viewBCEnrollmentReport();
  }
  public viewDistrictTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = true;
    this.showDealerEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.viewDistrictEnrollmentReport();
  }
  public viewDealerTabOnly() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = true;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.viewDealerEnrollmentReport();
  }

  public showExDepositReport() {
    this.showExecutiveEnrollmentReportIframe = true;
    this.programName = "Enrollment_Executive";
    this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  public viewBCEnrollmentReport() {
    this.showBCEnrollmentReportIframe = true;
    this.programName = "Enrollment_BC";
    if (this.isExecutiveUser) {
      var BusinessCenter = "NAT";
      this.getDistrictByBC(BusinessCenter);
      this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&BusinessCenter=${BusinessCenter}`;
    } else if (this.isBCUser) {
      var BusinessCenter1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
      this.getDistrictByBC(BusinessCenter1);
      this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&BusinessCenter=${BusinessCenter1}`;
    }
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  public viewDistrictEnrollmentReport() {
    this.showDistrictEnrollmentReportIframe = true;
    this.programName = "Enrollment_DIST";

    if (this.isExecutiveUser) {
      var District = "NAT";
      this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&District=${District}`;
    } else if (this.isBCUser || this.isDistrictUser) {
      var District1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
      this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&District=${District1}`;
    }
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  public viewDealerEnrollmentReport() {
    this.showDealerEnrollmentReportIframe = true;
    this.programName = "Enrollment_Dealer";

    if (this.isExecutiveUser) {
      var DealerCode = "NAT";
      this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DealerCode}`;

    } else if (this.isBCUser || this.isDistrictUser || this.isDealerUser) {
      var DealerCode1 = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
      this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}&DealerCode=${DealerCode1}`;

    }
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
}
