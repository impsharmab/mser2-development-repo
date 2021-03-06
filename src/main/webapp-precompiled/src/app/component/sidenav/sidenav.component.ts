import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import * as userMatrix from '../../global-variable/user-matrix';
import { RewardsDistributionService } from '../../services/rewards-distribution/rewards-distribution.service';
import { MVPAutoApprovalSettingService } from '../../services/mvp-service/mvp-autoapprove/mvp-autoapprove.service';

declare var $: any;

@Component({
  selector: 'sidenav',
  // templateUrl: './mser2-sidenav.component.html',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent implements OnInit, AfterViewInit {
  isAdmin: boolean = false;
  cmsContentObject: any;
  selectedPositionCode: any = "";
  showMSERRulesPage: boolean = false;
  showMSEREnrollmentReport: boolean = false;
  showMSEREnrollmentForm: boolean = false;
  showMSEROPCodeSetup: boolean = false;
  showMSEREnrollmentMaintenance: boolean = false;
  showMSERAutoEnrollmentOpt: boolean = false;
  showuvmHome: boolean = false;
  showuvmProgramRules: boolean = false;
  showexcellenceCardIssuance: boolean = false;
  showexcellenceCardInfo: boolean = false;
  showRewardDistribution: boolean = false;
  isMSEREnrolled: boolean = false;
  showMVPChangeApprovalSettings: boolean = false;
  showRewardDistributionMainTab: boolean = false;
  roleSession: any = "";
  hideThisReportForParticipant: boolean = false;
  hideThisReportBelowBCUsers: boolean = false;
  halfAdmin: boolean = false;
  mvpApproval: boolean = false;

  showUconnectSMIncentiveProgramRulesPage: boolean = false;
  isCABCMABCUser: boolean = false;
  hideMVPTab: boolean = true;

  isDealerManager: boolean = false;
  isPartsManagerOfRecords: boolean = false;
  isServiceManagerOfRecords: boolean = false;
  isELManager: boolean = false;
  isPCManager: boolean = false;
  isUVMManager: boolean = false;
  elManagerExists: boolean = true;
  pcManagerExists: boolean = true;
  uvmManagerExists: boolean = true;

  role: any = "";

  constructor(private mvpAutoApprovalSettingService: MVPAutoApprovalSettingService,
    private cookieService: CookieService) {

  }

  ngOnInit() {
    var mserEnrolled: any = [];
    var mserEnrolled = JSON.parse(sessionStorage.getItem("CurrentUser")).mserEnrollment;
    this.halfAdmin = JSON.parse(sessionStorage.getItem("CurrentUser")).halfAdmin;
    var selectedCodeData = JSON.parse(sessionStorage.getItem("selectedCodeData"));
    this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
    this.roleSession = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
    this.isDealerManager = selectedCodeData.isDealerManager;
    this.isPartsManagerOfRecords = selectedCodeData.isPartsManagerOfRecord;
    this.isServiceManagerOfRecords = selectedCodeData.isServiceManagerOfRecord;
    this.isELManager = selectedCodeData.isElManager;
    this.isPCManager = selectedCodeData.isPCManager;
    this.isUVMManager = selectedCodeData.isUVMManager;

    this.role = selectedCodeData.role;
    this.mvpApproval = selectedCodeData.mvpApproval;

    if (this.roleSession != undefined && (this.roleSession == 6 || this.roleSession == 9)) {
      this.hideThisReportForParticipant = true;
    }

    if (this.roleSession != undefined && (this.roleSession == 1 || this.roleSession == 12 || this.isAdmin)) {
      this.hideThisReportBelowBCUsers = true;
    }


    if (mserEnrolled) {
      this.isMSEREnrolled = true;
    } else {
      this.isMSEREnrolled = false;
    }

    // if (this.isAdmin) {
    //   this.showMSEREnrollmentReport = true;
    // }
    //  console.log(this.selectedPositionCode);
    this.getMVPApprovalData();

    this.caBCMABCReport();
    this.showUconnectSMIncentiveProgramRules();
    this.swbcTireSpinReportMatrix();
    this.swbcSpinDetailsROSummaryReportMatrix();
  }

  ngAfterViewInit() {
    this.executeJQueryCode();
  }
  mSEREnrollmentPageMatrix(): void {
    var isDealerManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isDealerManager;
    var isPartsManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPartsManagerOfRecord;
    var isServiceManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isServiceManagerOfRecord;
    var isElManger = JSON.parse(sessionStorage.getItem("selectedCodeData")).isElManager;
    var isPCManger = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPCManager;
    var isUVMManger = JSON.parse(sessionStorage.getItem("selectedCodeData")).isUVMManager;
    var isELManagerExist = JSON.parse(sessionStorage.getItem("selectedCodeData")).elManagerExists;
    var isPCMnanagerExist = JSON.parse(sessionStorage.getItem("selectedCodeData")).pcManagerExists;
    var isUVMManagerExist = JSON.parse(sessionStorage.getItem("selectedCodeData")).uvmManagerExists;

    if (userMatrix.enrollmentFormMatrix.indexOf(this.selectedPositionCode) > -1) {
      this.showMSEREnrollmentForm = true;
    } else {
      this.showMSEREnrollmentForm = false;
    }
    if (userMatrix.enrollmentReportMatrix.indexOf(this.selectedPositionCode) > -1) {
      this.showMSEREnrollmentReport = true;
    } else {
      this.showMSEREnrollmentReport = false;
    }
    if (this.isMSEREnrolled && (userMatrix.opcodeSetupMatrix.indexOf(this.selectedPositionCode) > -1)) {
      this.showMSEROPCodeSetup = true;
    } else {
      this.showMSEROPCodeSetup = false;
    }
    if (this.isMSEREnrolled && (isDealerManager == true || isPartsManagerOfRecord == true || isServiceManagerOfRecord == true ||
      isElManger || isPCManger || isUVMManger)) {
      this.showMSEREnrollmentMaintenance = true;
    } else {
      this.showMSEREnrollmentMaintenance = false;
    }
    if (isDealerManager == true || isPartsManagerOfRecord == true || isServiceManagerOfRecord == true
      // || (userMatrix.automaticEnrollmentOptoutFormMatrix.indexOf(this.selectedPositionCode) > -1)
    ) {
      this.showMSERAutoEnrollmentOpt = true;
    } else {
      this.showMSERAutoEnrollmentOpt = false;
    }

  }

  mvpPageMatrix() {
    if (userMatrix.mvpChangeApprovalSettings.indexOf(this.selectedPositionCode) > -1) {
      this.showMVPChangeApprovalSettings = true;
    } else {
      this.showMVPChangeApprovalSettings = false;
    }
  }

  showUconnectSMIncentiveProgramRules() {
    if (this.isDealerManager || this.isServiceManagerOfRecords || (this.role == 1) || (this.role == 11) || (this.role == 12)) {
      this.showUconnectSMIncentiveProgramRulesPage = true;
    }
  }

  uvmPageMatrix() {
    if (userMatrix.uvmHome.indexOf(this.selectedPositionCode) > -1) {
      this.showuvmHome = true;
    } else {
      this.showuvmHome = false;
    }
    if (userMatrix.uvmProgramRules.indexOf(this.selectedPositionCode) > -1) {
      this.showuvmProgramRules = true;
    } else {
      this.showuvmProgramRules = false;
    }
  }

  excellenceCardMatrix() {
    if (userMatrix.excellenceCardIssuance.indexOf(this.selectedPositionCode) > -1) {
      this.showexcellenceCardIssuance = true;
    } else {
      this.showexcellenceCardIssuance = false;
    }
    if (userMatrix.excellenceCardInfo.indexOf(this.selectedPositionCode) > -1) {
      this.showexcellenceCardInfo = true;
    } else {
      this.showexcellenceCardInfo = false;
    }
  }

  mvpApprovalDatum: any = true;
  getMVPApprovalData() {
    this.mvpAutoApprovalSettingService.getMVPApprovalData().subscribe(
      (mvpApprovalData) => {
        this.mvpApprovalDatum = mvpApprovalData
        // if mvpautoapproval is checked this.mvpApprovalDatum will return true 
        // manual-false
        if (this.mvpApprovalDatum) {
          this.hideMVPTab = true;
        } else if (!this.mvpApprovalDatum && (this.selectedPositionCode == "02" || this.selectedPositionCode == "17" ||
          this.selectedPositionCode == "33" || this.selectedPositionCode == "35")) {
          this.hideMVPTab = false;
        }
        this.rewardDistributionMatrix();
      },
      (error) => {
        this.mvpApprovalDatum = false;
        this.rewardDistributionMatrix();
      }
    )
  }

  showDistributionMainTabPerRoleAndPC: boolean = false;
  showDistributionTabPerManager() {
    if (this.isDealerManager) {
      if (this.elManagerExists) {
        this.showDistributionMainTabPerRoleAndPC = true;
      }
      if (this.pcManagerExists) {
        this.showDistributionMainTabPerRoleAndPC = true;
      }
      if (this.uvmManagerExists) {
        this.showDistributionMainTabPerRoleAndPC = true;
      }
    }

    if (this.isELManager) {
      this.showDistributionMainTabPerRoleAndPC = true;
    }
    if (this.isPCManager) {
      this.showDistributionMainTabPerRoleAndPC = true;
    }
    if (this.isUVMManager) {
      this.showDistributionMainTabPerRoleAndPC = true;
    }

  }

  showChangeApprovalSetting: boolean = false;
  rewardDistributionMatrix() {
    var isDealerManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isDealerManager;
    var isPartsManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPartsManagerOfRecord;
    var isServiceManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isServiceManagerOfRecord;
    var isELManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isElManager;
    var isPCMnanager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPCManager;
    var isUVMManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isUVMManager;

    if (this.isMSEREnrolled && (isDealerManager == true || isPartsManagerOfRecord == true || isServiceManagerOfRecord == true ||
      isELManager == true || isPCMnanager == true || isUVMManager == true || !this.hideMVPTab)) {
      this.showRewardDistributionMainTab = true;
      this.showRewardDistribution = true;
    } else {
      this.showRewardDistribution = false;
    }

    if (this.isMSEREnrolled && (isDealerManager == true || isServiceManagerOfRecord == true ||
      this.selectedPositionCode == "02" || this.selectedPositionCode == "17" || this.selectedPositionCode == "33" || this.selectedPositionCode == "35")) {
      // isELManager == true || isPCMnanager == true || isUVMManager == true || !this.hideMVPTab)) {
      this.showChangeApprovalSetting = true;
    } else {
      this.cookieService.put("donotshowMVPPage", "hideMVPPage");
    }
  }

  caBCMABCReport() {
    var bcFromSession = "";
    bcFromSession = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;

    if (bcFromSession != undefined && (bcFromSession == "CA" || bcFromSession == "MA" ||
      bcFromSession == "NAT" || bcFromSession.includes("CA") || bcFromSession.includes("MA"))) {
      this.isCABCMABCUser = true;
    }
  }

  showReportForSWBCUsersOnly: boolean = false;
  swbcTireSpinReportMatrix() {
    var TERRITORY = "";
    TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
    if (TERRITORY != undefined && (TERRITORY == "NAT" || TERRITORY == "SW" || TERRITORY.includes("SW"))) {
      this.showReportForSWBCUsersOnly = true;
    }
  }
  showswbcSpinDetailsROSummaryReport: boolean = false;
  swbcSpinDetailsROSummaryReportMatrix() {
    var TERRITORY = "";
    var ROLE = "";
    TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;
    ROLE = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
    if (ROLE != undefined && (ROLE == "1" || ROLE == "12" || this.isAdmin)) {
      if (TERRITORY != undefined && (TERRITORY == "NAT" || TERRITORY == "SW")) {
        this.showswbcSpinDetailsROSummaryReport = true;
      }
    }
  }
  executeJQueryCode() {
    $.navigation = $('nav > ul.nav');

    $.panelIconOpened = 'icon-arrow-up';
    $.panelIconClosed = 'icon-arrow-down';

    //Default colours
    $.brandPrimary = '#20a8d8';
    $.brandSuccess = '#4dbd74';
    $.brandInfo = '#63c2de';
    $.brandWarning = '#f8cb00';
    $.brandDanger = '#f86c6b';

    $.grayDark = '#2a2c36';
    $.gray = '#55595c';
    $.grayLight = '#818a91';
    $.grayLighter = '#d1d4d7';
    $.grayLightest = '#f8f9fa';
    // Add class .active to current link
    $.navigation.find('a').each(function () {

      var cUrl = String(window.location).split('?')[0];

      if (cUrl.substr(cUrl.length - 1) == '#') {
        cUrl = cUrl.slice(0, -1);
      }

      if ($($(this))[0].href == cUrl) {
        $(this).addClass('active');

        $(this).parents('ul').add(this).each(function () {
          $(this).parent().addClass('open');
        });
      }
    });

    // Dropdown Menu
    $.navigation.on('click', 'a', function (e) {

      if ($.ajaxLoad) {
        e.preventDefault();
      }

      if ($(this).hasClass('nav-dropdown-toggle')) {

        //           if ($(this).parent().hasClass('open')) {
        //             // $(this).parent().siblings('.open').toggleClass('open');
        //             // $(this).toggleClass('open');
        //              $(this).parent().siblings('.open').toggleClass('open');
        //  +            $(this).toggleClass('open');

        //           }

        //           resizeBroadcast();
        $(this).parent().toggleClass('open');
        $(this).parent().siblings('li').removeClass('open').addClass('closed');
        resizeBroadcast();

      }



    });
    function resizeBroadcast() {

      var timesRun = 0;
      var interval = setInterval(function () {
        timesRun += 1;
        if (timesRun === 5) {
          clearInterval(interval);
        }
        window.dispatchEvent(new Event('resize'));
      }, 62.5);
    }
  }
}
