import { Component, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Code } from './dealercode-positioncode.interface';
import { DealercodePositioncodeService } from '../../mser2-services/dealercode-positioncode-service/dealercode-positioncode.service'
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
  private codeData: any = { "selectedPositionCode": "", "selectedDealerCode": "" };
  //private codeData: any = { };

  private poscodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).positionCode;
  private delcodes: any = JSON.parse(sessionStorage.getItem("CurrentUser")).dealerCode;

  constructor(private positionCodeService: DealercodePositioncodeService) { }

  ngOnInit() {
    //debugger
    this.code = {
      selectedPositionCode: '',
      selectedDealerCode: ''
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

  private selectDealerCode(delcode?: any) {
    this.positionCodeService.setCodeData(this.code);

  }


}
