import { Component, OnInit, AfterViewInit } from '@angular/core';

import { CMSService } from '../../services/cms-service/cms-service';

import * as userMatrix from '../../global-variable/user-matrix';

declare var $: any;

@Component({
  selector: 'sidenav',
  // templateUrl: './mser2-sidenav.component.html',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit, AfterViewInit {
  public isAdmin: boolean = false;
  public cmsContentObject: any;
  public selectedPositionCode: any = "";
  public showMSERRulesPage: boolean = false;
  public showMSEREnrollmentReport: boolean = false;
  public showMSEREnrollmentForm: boolean = false;
  public showMSEROPCodeSetup: boolean = false;
  public showMSEREnrollmentMaintenance: boolean = false;
  public showMSERAutoEnrollmentOpt: boolean = false;
  public showuvmHome: boolean = false;
  public showuvmProgramRules: boolean = false;
  public showexcellenceCardIssuance: boolean = false;
  public showexcellenceCardInfo: boolean = false;
  public showRewardDistribution: boolean = false;
  public isMSEREnrolled: boolean = false;
  public showMVPChangeApprovalSettings: boolean = false;
  public showRewardDistributionMainTab: boolean = false;
  public roleSession: any = "";
  public hideThisReportForParticipant: boolean = false;

  constructor(private cmsService: CMSService) { }

  ngOnInit() {
    var mserEnrolled: any = [];
    var mserEnrolled = JSON.parse(sessionStorage.getItem("CurrentUser")).mserEnrollment;
    this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
    this.roleSession = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;

    if (this.roleSession != undefined && (this.roleSession == 6 || this.roleSession == 9)) {
      this.hideThisReportForParticipant = true;
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
    this.rewardDistributionMatrix();
    this.caBCMABCReport();
  }

  ngAfterViewInit() {
    this.executeJQueryCode();
  }
  public mSEREnrollmentPageMatrix() : void {
    var isDealerManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isDealerManager;
    var isPartsManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPartsManagerOfRecord;
    var isServiceManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isServiceManagerOfRecord;

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
    if (userMatrix.opcodeSetupMatrix.indexOf(this.selectedPositionCode) > -1) {
      this.showMSEROPCodeSetup = true;
    } else {
      this.showMSEROPCodeSetup = false;
    }
    if (isDealerManager == true || isPartsManagerOfRecord == true || isServiceManagerOfRecord == true) {
      this.showMSEREnrollmentMaintenance = true;
    } else {
      this.showMSEREnrollmentMaintenance = false;
    }
    if (isDealerManager == true || isPartsManagerOfRecord == true || isServiceManagerOfRecord == true) {
      this.showMSERAutoEnrollmentOpt = true;
    } else {
      this.showMSERAutoEnrollmentOpt = false;
    }

  }

  public mvpPageMatrix() {
    if (userMatrix.mvpChangeApprovalSettings.indexOf(this.selectedPositionCode) > -1) {
      this.showMVPChangeApprovalSettings = true;
    } else {
      this.showMVPChangeApprovalSettings = false;
    }
  }

  public uvmPageMatrix() {
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

  public excellenceCardMatrix() {
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

  public rewardDistributionMatrix() {
    var isDealerManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isDealerManager;
    var isPartsManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPartsManagerOfRecord;
    var isServiceManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isServiceManagerOfRecord;

    if (isDealerManager == true || isPartsManagerOfRecord == true || isServiceManagerOfRecord == true) {
      this.showRewardDistributionMainTab = true;
      this.showRewardDistribution = true;
    } else {
      this.showRewardDistribution = false;
    }

  }

  public isCABCMABCUser: boolean = false;
  public caBCMABCReport() {
    var bcFromSession = JSON.parse(sessionStorage.getItem("selectedCodeData")).bcs;

    if (bcFromSession == "CA" || bcFromSession == "MA" || bcFromSession == "NAT") {
      this.isCABCMABCUser = true;
    }
  }

  public executeJQueryCode() {
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


  public openCMSPage(pageName) {
    this.cmsService.getCmsContent(pageName).subscribe(
      (cmsContentObject) => {
        this.cmsContentObject = (cmsContentObject)

        alert("Success")
      },
      (error) => {
        alert("could not able to open cms content")
      }
    )
  }
}
