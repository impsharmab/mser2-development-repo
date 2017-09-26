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
  private cmsContentObject: any;
  private selectedPositionCode: any = "";
  private showMSERRulesPage: boolean = false;
  private showMSEREnrollmentReport: boolean = false;
  private showMSEREnrollmentForm: boolean = false;
  private showMSEROPCodeSetup: boolean = false;
  private showMSEREnrollmentMaintenance: boolean = false;
  private showMSERAutoEnrollmentOpt: boolean = false;
  private isMSEREnrolled: boolean = false;
  private showMVPChangeApprovalSettings: boolean = false;
  constructor(private cmsService: CMSService) { }

  ngOnInit() {

    var mserEnrolled: any = [];
    mserEnrolled = JSON.parse(sessionStorage.getItem("CurrentUser")).mserEnrollment;
    if (mserEnrolled.length > 0) {
      this.isMSEREnrolled = true;
    } else {
      this.isMSEREnrolled = false;
    }
    this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    //  console.log(this.selectedPositionCode);
  }

  ngAfterViewInit() {
    this.executeJQueryCode();
  }
  private mSEREnrollmentPageMatrix() {
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
    if (this.isMSEREnrolled == true && userMatrix.enrollmentMaintenanceMatrix.indexOf(this.selectedPositionCode) > -1) {
      this.showMSEREnrollmentMaintenance = true;
    } else {
      this.showMSEREnrollmentMaintenance = false;
    }
    if (this.isMSEREnrolled == true && userMatrix.autoEnrollmentOptMatrix.indexOf(this.selectedPositionCode) > -1) {
      this.showMSERAutoEnrollmentOpt = true;
    } else {
      this.showMSERAutoEnrollmentOpt = false;
    }

  }

  private mvpPageMatrix() {
    if (userMatrix.mvpChangeApprovalSettings.indexOf(this.selectedPositionCode) > -1) {
      this.showMVPChangeApprovalSettings = true;
    } else {
      this.showMVPChangeApprovalSettings = false;
    }
  }


  private executeJQueryCode() {
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


  private openCMSPage(pageName) {
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
