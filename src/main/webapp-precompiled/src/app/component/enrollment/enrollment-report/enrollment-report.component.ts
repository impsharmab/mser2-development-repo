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
  private tabNumber: any = "";
  private fromDate: any = "";
  private toDate: any = "";

  private enrollmentReportInterface: EnrollmentReportInterface = {
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
  private selectedRole: any;
  private isExecutiveUser: boolean = false;
  private isBCUser: boolean = false;
  private isDistrictUser: boolean = false;
  private isDealerUser: boolean = false;
  private isManagerUser: boolean = false;
  private isParticipantUser: boolean = false;
  private checkRole() {
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
  private districtByBCDatum: any;
  private getDistrictByBC(bc) {
    this.reportService.getDistrictByBC(bc).subscribe(
      (districtByBCDatum) => {
        this.districtByBCDatum = (districtByBCDatum)
        console.log(this.districtByBCDatum);
      },
      (error) => {


      }
    )

  }
  private enrollmentReportProgramOptions: SelectItem[] = [
    { label: "Mopar Parts & Engines", value: "4" },
    { label: "Express Lane", value: "1" },
    { label: "Parts Counter", value: "6" }
  ]

  private viewEXTabOnly() {
    this.showExecutiveEnrollmentReportIframe = true;
    this.showBCEnrollmentReportIframe = false;
    this.showDealerEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.showExDepositReport();
  }
  private viewBCTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = true;
    this.showDealerEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
    this.viewBCEnrollmentReport();
  }
  private viewDistrictTabOnly() {
    this.showExecutiveEnrollmentReportIframe = false;
    this.showBCEnrollmentReportIframe = false;
    this.showDistrictEnrollmentReportIframe = true;
    this.showDealerEnrollmentReportIframe = false;
    this.showParticipantEnrollmentReportIframe = false;
    this.showDetailEnrollmentReportIframe = false;
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
    this.viewDealerEnrollmentReport();
  }

  private showExDepositReport() {
    this.showExecutiveEnrollmentReportIframe = true;
    this.programName = "Enrollment_Executive";
    this.src = `https://reportservice.imperialm.com/reports/ReportServlet?reportPath=MSER&reportName=${this.programName}`;
    console.log(this.src);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  private viewBCEnrollmentReport() {
    this.showBCEnrollmentReportIframe = true;
    this.programName = "Enrollment_BC";
    if (this.isExecutiveUser) {
      var BusinessCenter = "NAT";
      // var BusinessCenter = "CA&BusinessCenter=DN";      

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
  private viewDistrictEnrollmentReport() {
    this.showDistrictEnrollmentReportIframe = true;
    this.programName = "Enrollment_DIST";
    var District = this.enrollmentReportInterface.district;
    

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
