import { Component, OnInit, Input, Output, ViewChild, EventEmitter, TemplateRef, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { SelectItem } from 'primeng/primeng';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../services/user-profile-service/user-profile.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component-matt.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @ViewChild("dealercodeModal") private dealercodeModal: NgbModalRef;
  @Output("onProfileChange") profileChange = new EventEmitter<any>();

  private poscodes: any = [];
  private delcodes: any = [];
  private userProfileData: any = {};
  private displayDealerCode: any = false;
  private displayRetweetModal: boolean = false;
  private selectedDealerCode: any = "";
  private selectedPositionCode: any = "";


  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private modalService: NgbModal,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.data = JSON.parse(sessionStorage.getItem("CurrentUser"));
    // this.poscodes = this.data.positionCode;
    // this.delcodes = this.data.dealerCode;
    this.poscodes = ["01", "05", "08", "09"];
    this.delcodes = ["05002", "08625", "45614", "78451"];

    var role = JSON.parse(sessionStorage.getItem("UserRole"));
    if (role != undefined && role == "Dealer") {
      this.displayDealerCode = true;
    }
  }

  /*****
  * CONFIGURATION
  */
  //Main navigation
  ngAfterViewInit() {
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

  private getSelectedDealerCode() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  }

  private getSelectedDealerName() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
  }

  private openSSOSite(url: any) {
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var positioncodes: any = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    var dealerlcodes: any = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    window.open(url + validToken + "&positioncode=" + positioncodes + "&dealercode=" + dealerlcodes, "_self")

  }

  private positionCodeOptions: SelectItem[] = [];
  private dealerCodeOptions: SelectItem[] = [];
  private createPCDCOptions() {
    // var positionCodeOptions = [{ label: "", value: "" }];
    // var dealerCodeOptions = [{ label: "", value: "" }];
    var positionCodeOptions = [];
    var dealerCodeOptions = [];
    for (var i = 0; i < this.poscodes.length; i++) {
      positionCodeOptions.push({ label: this.poscodes[i], value: this.poscodes[i] })
    }
    for (var i = 0; i < this.delcodes.length; i++) {
      dealerCodeOptions.push({ label: this.delcodes[i], value: this.delcodes[i] })
    }
    this.positionCodeOptions = positionCodeOptions;
    this.dealerCodeOptions = dealerCodeOptions;
  }




  private positionCodeCancel() {
    this.dealercodeModal.close();
  }
  private positionCodeSubmit(c: any) {
    c();
    this.profileChange.emit("")
  }
  private dropdownDealerCode() {
    // this.modalService.open(this.dealercodeModal, { windowClass: 'dealercode' });
    this.createPCDCOptions();
    this.displayRetweetModal = true;

  }
  private submitRetweetPCDC() {
    this.displayRetweetModal = false;
    console.log(this.selectedPositionCode + " " + this.selectedDealerCode);
  }

  private selectedPCIndex: any = 0;
  private selectedDCIndex: any = 0;
  private onChangePC(event, selectedPositionCode) {
    alert(selectedPositionCode);

  }
  private onChangeDC(event, selectedDealerCode) {
    alert(selectedDealerCode);
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
