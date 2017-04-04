import { Component, OnInit } from '@angular/core';

import { OpcodesetupService } from '../../mser2-services/enrollment-service/opcodesetup.service'

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './new-opcode.html',
  styleUrls: ['./opcode-setup.component.css'],
  //providers:[OpcodesetupService]
})
export class OpcodeSetupComponent implements OnInit {
  private opcodesetupData: any = {};

  constructor(private opcodesetupService: OpcodesetupService) { }

  ngOnInit() {
  }

  opcodesetup() {
    this.opcodesetupService.getOpcodesetupResponse().subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)
      }
    )
  }

}
