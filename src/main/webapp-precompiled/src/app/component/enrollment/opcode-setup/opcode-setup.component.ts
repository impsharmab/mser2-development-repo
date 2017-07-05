import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
import { AddOpCodeInterface } from './add-opcode.interface'

import { OpcodeSetupService } from '../../../services/enrollment-service/opcode-setup.service'

declare var $: any;

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './new-opcode.html',
  styleUrls: ['./opcode-setup.component.css'],
  // providers:[OpcodesetupService]
})
export class OpcodeSetupComponent implements OnInit {

  private currentuser: any = {};
  private selectedCodeData: any = {};
  private addOpcodeResponse: any;
  private dealercode: string = "";
  opcodesetupData: any;
  public addopcInterface: AddOpCodeInterface;
  private id: number = 0;
  private date: string = "";
  private source: string = "TDLR";
  private createdBy: string = "";
  private successOpcodeSetupMessage: string = "";
  private errorOpcodeSetupMessage: string = "";
  private bannerColumnHeaders: any = [
    { "data": "opCode", "title": "Op Code" },
    { "data": "createdDate", "title": "Created Date" },
    {
      "className": 'details-control',
      "orderable": false,
      "data": null,
      "title": "Delete",
      "defaultContent": '<button type="button" class="btn btn-primary btn-sm" ><i class="fa fa-close"></i></button>'
    }
  ]

  constructor(private opcodesetupService: OpcodeSetupService, private router: Router) {
    //this.date = new Date();

  }

  ngOnInit() {
    this.currentuser = JSON.parse(sessionStorage.getItem("CurrentUser"))
    //this.dealercode = this.currentuser.dealerCode[0];
    this.selectedCodeData = JSON.parse(sessionStorage.getItem("selectedCodeData"));
    this.dealercode = this.selectedCodeData.selectedDealerCode;
    this.createdBy = this.currentuser.userId;
    var d = new Date;
    this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();
    // alert(this.date)

    $(document).ready(function () {
      $('#dataTable').DataTable();
    });
    this.opcodesetup();

    this.addopcInterface = {
      "iD": 0,
      "dealerCode": "",
      "opCode": "",
      "source": "",
      "createdDate": new Date,
      "createdBy": ""
    }
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

  private opcodesetup() {
    this.opcodesetupService.getOpcodesetupResponse(this.selectedCodeData.selectedDealerCode).subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)
        // this.source = this.opcodesetupData[0].source;
      }
    )
  }

  private addOpCode() {
    if (this.addopcInterface.opCode === "") {
      this.successOpcodeSetupMessage = "Please enter Op Code";
      return;
    }
    this.opcodesetupService.addOpCode(this.id,
      this.dealercode,
      this.addopcInterface.opCode,
      this.source,
      this.date,
      this.createdBy).subscribe(
      (addOpcodeResponse) => {
        this.addOpcodeResponse = (addOpcodeResponse);
        this.successOpcodeSetupMessage = "Successfully added new OpCode.";
        this.opcodesetup();
      },
      (error) => {
        this.errorOpcodeSetupMessage = "Error in adding Op Code.";
      }
      )
  }

  private deleteOpCode(iD) {
  //  alert(iD);
    this.opcodesetupService.deleteOpCode(iD).subscribe(
      (addOpcodeResponse) => {
        this.addOpcodeResponse = (addOpcodeResponse)
       // alert("Opcode is successfully deleted...");
        this.opcodesetup();
      },
      (error) => {       
       // alert("Opcode was not deleted...");
      }
    )
  }

}
