import { Component, OnInit, Input, Output, ViewChild, EventEmitter, TemplateRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../services/user-profile-service/user-profile.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() data: any;
  @ViewChild("dealercodeModal") private dealercodeModal: NgbModalRef;
  @Output("onProfileChange") profileChange = new EventEmitter<any>();

  private poscodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).positionCode;
  private delcodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).dealerCode;
  private userProfileData: any = {};
  constructor(private router: Router, private userProfileService: UserProfileService, private modalService: NgbModal, private cookieService: CookieService) { }

  ngOnInit() {
    //debugger
    this.data = JSON.parse(sessionStorage.getItem("CurrentUser"))
    // this.getUserProfileData();
    /*****
    * CONFIGURATION
    */
    //Main navigation
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

    'use strict';

    /****
    * MAIN NAVIGATION
    */

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

    // Add class .active to current link


    /* ---------- Main Menu Open/Close, Min/Full ---------- */
    $('.navbar-toggler').click(function () {

      if ($(this).hasClass('sidebar-toggler')) {
        $('body').toggleClass('sidebar-hidden');
        resizeBroadcast();
      }

      if ($(this).hasClass('aside-menu-toggler')) {
        $('body').toggleClass('aside-menu-hidden');
        resizeBroadcast();
      }

      if ($(this).hasClass('mobile-sidebar-toggler')) {
        $('body').toggleClass('sidebar-mobile-show');
        resizeBroadcast();
      }

    });

    $('.sidebar-close').click(function () {
      $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
    });

    /* ---------- Disable moving to top ---------- */
    $('a[href="#"][data-top!=true]').click(function (e) {
      e.preventDefault();
    });



    /****
    * CARDS ACTIONS
    */

    $(document).on('click', '.card-actions a', function (e) {
      e.preventDefault();

      if ($(this).hasClass('btn-close')) {
        $(this).parent().parent().parent().fadeOut();
      } else if ($(this).hasClass('btn-minimize')) {
        var $target = $(this).parent().parent().next('.card-block');
        if (!$(this).hasClass('collapsed')) {
          $('i', $(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
        } else {
          $('i', $(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
        }

      } else if ($(this).hasClass('btn-setting')) {
        $('#myModal').modal('show');
      }

    });

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function init(url) {

      /* ---------- Tooltip ---------- */
      $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({ "placement": "bottom", delay: { show: 400, hide: 200 } });

      /* ---------- Popover ---------- */
      $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

    }
  }

  // private getUserProfileData() {

  //   this.userProfileService.getUserProfileData().subscribe(
  //     (resUserProfileData) => {
  //       this.userProfileData = (resUserProfileData)
  //       this.userProfileService.setUserProfileData(this.userProfileData)


  //     }
  //   )
  // }

  private openSSOSite(url: any) {
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var positioncodes: any = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    var dealerlcodes: any = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    window.open(url + validToken + "&positioncode=" + positioncodes + "&dealercode=" + dealerlcodes, "_self")

  }
  private positionCodeCancel() {
    this.dealercodeModal.close();
  }
  private positionCodeSubmit(c: any) {
    // alert("1");	
    c();
    this.profileChange.emit("")
  }
  private dropdownDealerCode() {
    // alert(this.poscodes + "" + this.delcodes)
    //    alert()
    this.modalService.open(this.dealercodeModal, { windowClass: 'dealercode' });
  }

  logout() {
    sessionStorage.removeItem('CurrentUser');
    sessionStorage.removeItem('selectedCodeData');
    sessionStorage.clear();
    this.cookieService.removeAll();
    let url = ["login"]
    this.router.navigate(url);
  }
}
