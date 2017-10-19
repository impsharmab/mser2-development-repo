import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
import { AddOpCodeInterface } from './add-opcode.interface'

import { OpcodeSetupService } from '../../../services/enrollment-service/opcode-setup.service'

declare var $: any;

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './opcode.html',
  styleUrls: ['./opcode-setup.component.css'],
  // providers:[OpcodesetupService]
})
export class OpcodeSetupComponent implements OnInit {
  private currentuser: any = {};
  private selectedCodeData: any = {};
  private addOpcodeResponse: any;
  private dealercode: string = "";
  private activeopcode: any = true;
  private inactiveopcode: any = false;
  private activateOpCodeResponse: any = {};
  private activetable: any = true;
  private inactivetable = false;
  private opcodesetupData: any;
  private inactiveOpcodesetupData: any;
  private switchstatusmessage: string = "";
  private tableName: string = "Inactive Table";
  public addopcInterface: AddOpCodeInterface;
  private id: number = 0;
  private date: string = "";
  private source: string = "user";
  private createdBy: string = "";
  private successOpcodeSetupMessage: string = "";
  private errorOpcodeSetupMessage: string = "";
  private selectedId: any = 0


  constructor(private opcodesetupService: OpcodeSetupService, private router: Router) {

  }

  ngOnInit() {
    this.currentuser = JSON.parse(sessionStorage.getItem("CurrentUser"));

    this.selectedCodeData = JSON.parse(sessionStorage.getItem("selectedCodeData"));
    this.dealercode = this.selectedCodeData.selectedDealerCode;
    this.createdBy = this.currentuser.userId;
    var d = new Date;
    this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();

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
    this.opcodesetupService.getOpcodesetupResponse(this.selectedCodeData.selectedDealerCode).subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)

      },
      (error) => {
        alert("error in getting active Op Code data");
      }
    )
  }

  private getInactiveOpcodesetupData() {
    this.opcodesetupService.getInactiveOpcodesetupResponse(this.selectedCodeData.selectedDealerCode).subscribe(
      (inactiveOpcodesetupData) => {
        this.inactiveOpcodesetupData = (inactiveOpcodesetupData)

      },
      (error) => {
        alert("error in getting Inactive Op Code data");
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
        this.errorOpcodeSetupMessage = "";
        this.switchstatusmessage = "";
        this.opcodesetup();
      },
      (error) => {
        this.successOpcodeSetupMessage = "";
        this.errorOpcodeSetupMessage = "Error in adding Op Code.";
      }
      )
  }

  private inactivateOpCode(iD) {
    this.opcodesetupService.deactivateOpCode(iD).subscribe(
      (addOpcodeResponse) => {
        this.addOpcodeResponse = (addOpcodeResponse)
        this.opcodesetup();
        this.successOpcodeSetupMessage = "";
        this.errorOpcodeSetupMessage = "";
        this.switchstatusmessage = "Successfully Deactivated Op Code.";
      },
      (error) => {
        alert("Opcode was not Deactivated.");
      }
    )
  }

  private activateOpCode(iD) {
    this.opcodesetupService.activateOpCode(iD).subscribe(
      (activateOpCodeResponse) => {
        this.activateOpCodeResponse = (activateOpCodeResponse)
        this.getInactiveOpcodesetupData();
        this.successOpcodeSetupMessage = "";
        this.errorOpcodeSetupMessage = "";
        this.switchstatusmessage = "Successfully Activated Op Code.";
      },
      (error) => {
        alert("Opcode was not Activated.");
      }
    )
  }

  switchOpcodeTable() {
    if (this.activeopcode) {
      this.tableName = "Active Table";
      this.successOpcodeSetupMessage = "";
      this.switchstatusmessage = "";
      this.errorOpcodeSetupMessage = "";
      this.activeopcode = false;
      this.inactiveopcode = true;
      this.getInactiveOpcodesetupData();
    } else if (!this.activeopcode) {
      this.tableName = "Inactive Table";
      this.switchstatusmessage = "";
      this.successOpcodeSetupMessage = "";
      this.errorOpcodeSetupMessage = "";
      this.activeopcode = true;
      this.inactiveopcode = false;
      this.opcodesetup();

    }
  }
  switchOpcodeTable1() {
    this.activeopcode = true;
    this.inactiveopcode = false;

  }
  switchOpcodeTable2() {
    this.activeopcode = false;
    this.inactiveopcode = true;

  }
  private onRowSelect(event) {
    this.selectedId = event.data.id;
    console.log(event.data);
  }
}
