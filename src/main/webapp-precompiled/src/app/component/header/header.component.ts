import { Component, OnInit, Input, Output, ViewChild, EventEmitter, TemplateRef, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { CodeData } from './selected-codedata.interface';
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

  private poscodesSession: any = [];
  private delcodesSession: any = [];
  private dealerNamesSession: any = [];
  private dealerManagerSession: any = [];
  private serviceManagerOfRecordSession: any = []
  private partsManagerOfRecordSession: any = [];
  private userProfileData: any = {};
  private displayDealerCode: any = false;
  private displayRetweetModal: boolean = false;
  private selectedDealerCode: any = "";
  private selectedPositionCode: any = "";
  private selectedDealerName: any = "";
  private rolesSession: any;
  private isDealerManager: boolean = false;
  private isServiceManagerOfRecord: boolean = false;
  private isPartsManagerOfRecord: boolean = false;
  private isAdminSession: boolean = false;
  private isELManagerSession: any = [];
  private isPCManagerSession: any = [];
  private isUVMManagerSession: any = [];
  private isELEnrolledSession: any = [];
  private isPCEnrolledSession: any = [];
  private bcsSession: any = [];
  private isELEnrolled: string = "";
  private isPCEnrolled: string = "";
  private isELManager: boolean = false;
  private isPCManager: boolean = false;
  private isUVMManager: boolean = false;
  private selectedIndex: any = 0;
  private codeData: CodeData;

  private booleanAdminToken: any = this.cookieService.get("adminToken");
  // private booleanDealerEmulation: any = false;
  private isDealerEmulation: string = "false";

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private modalService: NgbModal,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.isDealerEmulation = this.cookieService.get("isDealerEmulation");
    this.data = JSON.parse(sessionStorage.getItem("CurrentUser"));
    this.poscodesSession = this.data.positionCode;
    this.delcodesSession = this.data.dealerCode;
    this.dealerNamesSession = this.data.dealerName;
    this.dealerManagerSession = this.data.dealerManager;
    this.partsManagerOfRecordSession = this.data.partsManagerOfRecord;
    this.serviceManagerOfRecordSession = this.data.serviceManagerOfRecord;
    this.rolesSession = this.data.roles;
    this.isAdminSession = this.data.admin;
    this.isELManagerSession = this.data.elManager;
    this.isPCManagerSession = this.data.pcManager;
    this.isUVMManagerSession = this.data.uvmManager;
    this.isELEnrolledSession = this.data.elEnrolled;
    this.isPCEnrolledSession = this.data.pcEnrolled;
    this.bcsSession = this.data.bcs;

    // this.poscodesSession = ["01", "03", "05", "08", "09", "05", "06"];
    // this.delcodesSession = ["05002", "05002", "05002", "08625", "08625", "45614", "45614"];
    // this.dealerNamesSession = ["as", "as", "as", "de", "de", "dw", "dw"];
    // this.dealerManagerSession = [true, true, false, true, false, false, true];
    // this.partsManagerOfRecordSession = [true, false, true, false, false, true, false];
    // this.serviceManagerOfRecordSession = [false, true, false, false, true, true, true];



    this.selectedIndex = JSON.parse(sessionStorage.getItem("selectedIndex"));
    if (this.selectedIndex == undefined || this.selectedIndex == null) {
      this.selectedIndex = 0;
    }
    this.codeData = {
      selectedPositionCode: this.poscodesSession[this.selectedIndex],
      selectedDealerCode: this.delcodesSession[this.selectedIndex],
      selectedDealerName: this.selectedDealerName[this.selectedIndex],
      isDealerManager: this.dealerManagerSession[this.selectedIndex],
      isPartsManagerOfRecord: this.partsManagerOfRecordSession[this.selectedIndex],
      isServiceManagerOfRecord: this.serviceManagerOfRecordSession[this.selectedIndex],
      role: this.rolesSession[this.selectedIndex],
      isAdmin: this.isAdminSession,
      isElManager: this.isELManagerSession[this.selectedIndex],
      isPCManager: this.isPCManagerSession[this.selectedIndex],
      isUVMManager: this.isUVMManagerSession[this.selectedIndex],
      isELEnrolled: this.isELEnrolledSession[this.selectedIndex],
      isPCEnrolled: this.isPCEnrolledSession[this.selectedIndex],
      bcs: this.bcsSession[this.selectedIndex]
    }
    this.groupbyPCDC();
    var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
    if (role != undefined && (role == "5" || role == "6" || role == "9" || role == "10" || role == "0")) {
      this.displayDealerCode = true;
    }
  }

  private removeDuplicates(duplicateArray) {
    var cleanArray = [];
    for (var i = 0; i < duplicateArray.length; i++) {
      var push = true;
      for (var j = 0; j < cleanArray.length; j++) {
        if (cleanArray[j] === duplicateArray[i]) {
          push = false;
        }
      }
      if (push == true) {
        cleanArray.push(duplicateArray[i]);
      }
    }
    return cleanArray;
  }
  private dcDinstinct = [];
  private pcMap = {};

  private groupbyPCDC() {
    this.dcDinstinct = this.removeDuplicates(this.delcodesSession);
    // console.log(this.dcDinstinct); 

    for (var i = 0; i < this.dcDinstinct.length; i++) {
      for (var j = 0; j < this.delcodesSession.length; j++) {
        if (this.dcDinstinct[i] == this.delcodesSession[j]) {
          if (this.pcMap[this.dcDinstinct[i]] == undefined) {
            this.pcMap[this.dcDinstinct[i]] = [this.poscodesSession[j]];
          } else {
            var temp = this.pcMap[this.dcDinstinct[i]];
            temp.push(this.poscodesSession[j]);
            this.pcMap[this.dcDinstinct[i]] = temp;
          }
        }
      }
    }

    this.pcDinstinct = this.pcMap[this.dcDinstinct[0]];
    this.onPCChange();
  }
  private pcDinstinct = [];
  private onDCChange() {
    var htmlObject = document.getElementById("dcOptions") as HTMLSelectElement;
    var index = htmlObject.selectedIndex

    this.pcDinstinct = this.pcMap[this.dcDinstinct[index]];
    // this.codeData.selectedPositionCode = this.pcDinstinct[0];
    // alert(this.pcDinstinct[0]);

    this.onPCChange();

  }
  private onPCChange() {
    for (var i = 0; i < this.delcodesSession.length; i++) {
      if (this.delcodesSession[i] == this.codeData.selectedDealerCode && this.codeData.selectedPositionCode == this.poscodesSession[i]) {
        this.selectedIndex = i;
      }
    }

    this.onChangePC();
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
    for (var i = 0; i < this.poscodesSession.length; i++) {
      positionCodeOptions.push({ label: this.poscodesSession[i], value: this.poscodesSession[i], id: i })
    }
    for (var i = 0; i < this.delcodesSession.length; i++) {
      dealerCodeOptions.push({ label: this.delcodesSession[i], value: this.delcodesSession[i], id: i })
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
    // alert(this.selectedIndex);
    this.onDCChange();
    // this.onPCChange();
    this.displayRetweetModal = false;
    //alert(this.selectedIndex);
    location.reload();
    // console.log(this.selectedPositionCode + " " + this.selectedDealerCode);
  }


  //private selectedPCIndex: any = 0;
  //private selectedDCIndex: any = 0;
  private selectedCodeData: any = [];
  private role: any = "";
  private onChangePC() {
    // var index = this.poscodes.indexOf(event.value);
    //var htmlObject = document.getElementById("pcOptions") as HTMLSelectElement;
    //var index = htmlObject.selectedIndex
    //this.selectedPCIndex = index;
    //this.codeData.selectedPositionCode = this.selectedPositionCode = selectedPositionCode;
    //this.codeData.selectedDealerCode = this.selectedDealerCode = this.delcodesSession[index];
    this.codeData.selectedDealerName = this.selectedDealerName = this.dealerNamesSession[this.selectedIndex];
    this.codeData.isDealerManager = this.isDealerManager = this.dealerManagerSession[this.selectedIndex];
    this.codeData.isServiceManagerOfRecord = this.isServiceManagerOfRecord = this.serviceManagerOfRecordSession[this.selectedIndex];
    this.codeData.isPartsManagerOfRecord = this.isPartsManagerOfRecord = this.partsManagerOfRecordSession[this.selectedIndex];
    this.codeData.role = this.role = this.rolesSession[this.selectedIndex];
    this.codeData.isAdmin = this.isAdminSession;
    this.codeData.isElManager = this.isELManagerSession[this.selectedIndex];
    this.codeData.isPCManager = this.isPCManagerSession[this.selectedIndex];
    this.codeData.isUVMManager = this.isUVMManagerSession[this.selectedIndex];
    this.codeData.isELEnrolled = this.isELEnrolledSession[this.selectedIndex];
    this.codeData.isPCEnrolled = this.isPCEnrolledSession[this.selectedIndex];
    this.codeData.bcs = this.bcsSession[this.selectedIndex];
    sessionStorage.setItem("selectedIndex", JSON.stringify(this.selectedIndex));
    this.selectedCodeData = sessionStorage.setItem("selectedCodeData", JSON.stringify(this.codeData));
    // console.log("Selectes Index: " + this.selectedIndex);
  }
  /*private onChangeDC(selectedDealerCode) {
    var htmlObject = document.getElementById("dcOptions") as HTMLSelectElement;
    var index = htmlObject.selectedIndex
    this.selectedDCIndex = index;
    this.codeData.selectedDealerCode = this.selectedDealerCode = selectedDealerCode;
    this.codeData.selectedPositionCode = this.selectedPositionCode = this.poscodesSession[index];
    this.codeData.selectedDealerName = this.selectedDealerName = this.dealerNamesSession[index];
    this.codeData.isDealerManager = this.isDealerManager = this.dealerManagerSession[index];
    this.codeData.isServiceManagerOfRecord = this.isServiceManagerOfRecord = this.serviceManagerOfRecordSession[index];
    this.codeData.isPartsManagerOfRecord = this.isPartsManagerOfRecord = this.partsManagerOfRecordSession[index];
    this.selectedCodeData = sessionStorage.setItem("selectedCodeData", JSON.stringify(this.codeData));
    console.log(selectedDealerCode + " " + index);
  }*/

  private endEmulation() {
    this.cookieService.put("isDealerEmulation", "false");
    var adminToken = this.cookieService.get("adminToken");
    this.cookieService.remove("adminToken");
    this.cookieService.remove("token");
    this.cookieService.removeAll();
    sessionStorage.clear();
    window.sessionStorage.clear();
    //document.sessionStorage.clear();

    this.cookieService.put("token", adminToken)
    let url = ["login"]
    this.router.navigate(url);

  }

  private endDealerEmulation() {
    this.cookieService.put("isDealerEmulation", "false");
    var adminToken = this.cookieService.get("adminToken");
    this.cookieService.remove("adminToken");
    this.cookieService.remove("token");
    this.cookieService.remove("dealercode");
    this.cookieService.removeAll();
    sessionStorage.clear();
    window.sessionStorage.clear();
    //document.sessionStorage.clear();

    this.cookieService.put("token", adminToken)
    let url = ["login"]
    this.router.navigate(url);

  }

  // private checkDealerToken() {
  //   if (this.cookieService.get("adminToken") == this.cookieService.get("token")) {
  //     if ((this.cookieService.get("token") !== undefined) && this.cookieService.get("token") !== null) {
  //       this.booleanDealerEmulation = true;
  //     }
  //   }
  // }

  logout() {
    sessionStorage.removeItem('CurrentUser');
    sessionStorage.removeItem('selectedCodeData');
    sessionStorage.clear();
    this.cookieService.removeAll();
    let url = ["login"]
    this.router.navigate(url);
  }
}
