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
  private code: Code;
  private pcode: any = [];
  private dcode: any = [];
  private codeData: any = { "selectedPositionCode": "", "selectedDealerCode": "", "selectedDealerName": "" };
  private dealerNamesFromSession: any = [];
  //private codeData: any = { };

  private poscodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).positionCode;
  private delcodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).dealerCode;

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
  private selectPositionCode(poscode?: any) {
    //this.positionCodeService.setCodeData(this.code);
  }
  private submitClick() {
    this.positionCodeService.setCodeData(this.code);
    this.submitEvent.emit("");
  }
  private cancelClick() {
    this.cancelEvent.emit("");
  }

  private arr = [
    { "a": "s" },
    { "d": "c" }
  ]

  private dcindex: any = 0;
  private dnindex: any = 0;
  private selectDealerCode(delcode?: any) {
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
