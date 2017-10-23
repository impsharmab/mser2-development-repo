import { Component, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Code } from './dealercode-positioncode.interface';
import { DealercodePositioncodeService } from '../../../services/dealercode-positioncode-service/dealercode-positioncode.service'
//import { DashboardBodyService } from '../../services/dashboard-body-services/dashboard-body.service'

@Component({
  selector: 'dealercode-modal',
  templateUrl: './dealercode-modal.component.html',
  styleUrls: ['./dealercode-modal.component.css'],

})
export class DealercodeModalComponent implements OnInit {
  @Output("onSubmit") submitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output("onCancel") cancelEvent: EventEmitter<any> = new EventEmitter<any>();
  public code: Code;
  public pcode: any = [];
  public dcode: any = [];
  public codeData: any = { "selectedPositionCode": "", "selectedDealerCode": "", "selectedDealerName": "" };
  public dealerNamesFromSession: any = [];
  public submitSelectedCodes: any;
  //public codeData: any = { };

  public poscodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).positionCode;
  public delcodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).dealerCode;

  constructor(private positionCodeService: DealercodePositioncodeService) { }

  ngOnInit() {
    //debugger
    this.dealerNamesFromSession = JSON.parse(sessionStorage.getItem("CurrentUser")).dealerName;
    console.log(this.dealerNamesFromSession);
    this.code = {
      selectedPositionCode: '',
      selectedDealerCode: '',
      selectedDealerName: ''
    }

    this.code = this.positionCodeService.getCodeData()
    this.pcode = this.poscodes;
    this.dcode = this.delcodes;

  }
  public selectPositionCode(poscode?: any) {
    //this.positionCodeService.setCodeData(this.code);
  }
  public submitClick() {
    this.positionCodeService.setCodeData(this.code);
    this.submitEvent.emit("");
  }
  public cancelClick() {
    this.cancelEvent.emit("");
  }

  public arr = [
    { "a": "s" },
    { "d": "c" }
  ]

  public dcindex: any = 0;
  public dnindex: any = 0;
  public selectDealerCode(delcode?: any) {
    var indexOfSelectedDealerCode = this.dcode.indexOf(delcode);
    this.code.selectedDealerName = this.dealerNamesFromSession[indexOfSelectedDealerCode];
    //alert(indexOfSelectedDealerCode);
    // for (var dcindex in this.dcode) {
    //   console.log(dcindex + ":" + this.dcode[dcindex]);
    //   this.dcindex = dcindex;
    // }

    // for (var dnindex in this.dealerNamesFromSession) {
    //   console.log(dnindex + ":" + this.dealerNamesFromSession[dnindex]);
    //   this.dnindex = dnindex;
    // }

    //     for (var i = 0; i < this.dcode.length; i++) {
    // if(this.)
    //     }

    // while(){

    // }


    this.positionCodeService.setCodeData(this.code);

  }


}
