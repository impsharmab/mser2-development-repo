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
  public currentuser: any = {};
  public selectedCodeData: any = {};
  public addOpcodeResponse: any;
  public dealercode: string = "";
  public activeopcode: any = true;
  public inactiveopcode: any = false;
  public activateOpCodeResponse: any = {};
  public activetable: any = true;
  public inactivetable = false;
  public opcodesetupData: any;
  public inactiveOpcodesetupData: any;
  public switchstatusmessage: string = "";
  public tableName: string = "Inactive Table";
  public addopcInterface: AddOpCodeInterface;
  public id: number = 0;
  public date: string = "";
  public source: string = "user";
  public createdBy: string = "";
  public successOpcodeSetupMessage: string = "";
  public errorOpcodeSetupMessage: string = "";
  public selectedId: any = 0


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


  public opcodesetup() {
    this.opcodesetupService.getOpcodesetupResponse(this.selectedCodeData.selectedDealerCode).subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)

      },
      (error) => {
        alert("error in getting active Op Code data");
      }
    )
  }

  public getInactiveOpcodesetupData() {
    this.opcodesetupService.getInactiveOpcodesetupResponse(this.selectedCodeData.selectedDealerCode).subscribe(
      (inactiveOpcodesetupData) => {
        this.inactiveOpcodesetupData = (inactiveOpcodesetupData)

      },
      (error) => {
        alert("error in getting Inactive Op Code data");
      }
    )
  }

  public addOpCode() {
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

  public inactivateOpCode(iD) {
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

  public activateOpCode(iD) {
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
  public onRowSelect(event) {
    this.selectedId = event.data.id;
    console.log(event.data);
  }
}
