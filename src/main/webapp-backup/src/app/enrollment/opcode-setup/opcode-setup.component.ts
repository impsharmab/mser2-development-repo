import { Component, OnInit } from '@angular/core';
import { AddOpCode } from './add-opcode.interface';

import { OpcodeSetupService } from '../../mser2-services/enrollment-service/opcode-setup.service';

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './opcode-setup.component.html',
  styleUrls: ['./opcode-setup.component.css']
})
export class OpcodeSetupComponent implements OnInit {
  public addOpCode: AddOpCode;
  private opcode: "";
  constructor(private opcodeSetupService: OpcodeSetupService) { }

  ngOnInit() {
    this.addOpCode = {
      opCode: ""
    }
  }

  private findOpCode(opCode: string) {
    this.opcodeSetupService.findOpCode(this.addOpCode.opCode).subscribe(
      (opcode) => {
        this.opcode = (opcode)
      }
    )
  }
}
