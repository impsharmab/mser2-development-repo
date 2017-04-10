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
  opcodesetupData: any;
  public addopcInterface: AddOpCodeInterface;
  private date: Date;

  constructor(private opcodesetupService: OpcodeSetupService, private router: Router) {
    this.date = new Date();
  }

  ngOnInit() {
    this.addopcInterface.dealerCode=JSON.parse(sessionStorage.getItem("CurrentUser").dealerCode[0])
    this.opcodesetup();
    this.addopcInterface = {
      "iD": 0,
      "dealerCode": "",
      "opCode": "",
      "source": "",
      "createdDate": this.date,
      "createdBy": ""
    }
  }

  private opcodesetup() {
    //debugger
    this.opcodesetupService.getOpcodesetupResponse(this.addopcInterface.dealerCode).subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)
      }
    )
  }

  addOpCode() {
    this.opcodesetupService.addOpCode(this.addopcInterface.iD,
      this.addopcInterface.dealerCode,
      this.addopcInterface.opCode,
      this.addopcInterface.source,
      this.addopcInterface.createdDate,
      this.addopcInterface.createdBy)

  }

}
