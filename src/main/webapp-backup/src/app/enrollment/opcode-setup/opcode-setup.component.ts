import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
import { AddOpCodeInterface } from './add-opcode.interface'

import { OpcodeSetupService } from '../../mser2-services/enrollment-service/opcode-setup.service'

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './new-opcode.html',
  styleUrls: ['./opcode-setup.component.css'],
  // providers:[OpcodesetupService]
})
export class OpcodeSetupComponent implements OnInit {
  private currentuser: any = {};
  private dealercode: string = "";
  opcodesetupData: any;
  public addopcInterface: AddOpCodeInterface;
  private id: number = 0;
  private date: string="2017-03-10";
  private source: string = "";
  private createdBy: string = "";

  constructor(private opcodesetupService: OpcodeSetupService, private router: Router) {
    //this.date = new Date();
  }

  ngOnInit() {
    this.currentuser = JSON.parse(sessionStorage.getItem("CurrentUser"))
    this.dealercode = this.currentuser.dealerCode[0];

    this.opcodesetup();
    this.addopcInterface = {
      "iD": 0,
      "dealerCode": "",
      "opCode": "",
      "source": "",
      "createdDate": new Date,
      "createdBy": ""
    }
  }

  private opcodesetup() {
    //debugger
    this.opcodesetupService.getOpcodesetupResponse(this.dealercode).subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)
        this.source = this.opcodesetupData[0].source;
        this.source = this.opcodesetupData[0].source;
        this.createdBy = this.opcodesetupData[0].createdBy
        // this.dealercode = this.opcodesetupData.;
      }
    )
  }

  addOpCode() {
    debugger
    this.opcodesetupService.addOpCode(this.id,
      this.dealercode,
      this.addopcInterface.opCode,
      this.source,
      this.date,
      this.createdBy)

  }

}
