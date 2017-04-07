import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
//import { AddOpCodeInterface } from './add-opcode.interface'

import { OpcodeSetupService } from '../../mser2-services/enrollment-service/opcode-setup.service'

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './new-opcode.html',
  styleUrls: ['./opcode-setup.component.css'],
  // providers:[OpcodesetupService]
})
export class OpcodeSetupComponent implements OnInit {
  opcodesetupData: any;
  //public addopcInterface: AddOpCodeInterface;

  constructor(private opcodesetupService: OpcodeSetupService, private router: Router) { }

  ngOnInit() {
    this.opcodesetup();
  }

  private opcodesetup() {
    //debugger
    this.opcodesetupService.getOpcodesetupResponse().subscribe(
      (opcodesetupData) => {
        this.opcodesetupData = (opcodesetupData)
        // if (true) {
        //   let url = ["opcodesetup"]
        //   this.router.navigate(url);
        //debugger
        //alert(this.opcodesetupData.createdDate)
        //console.log(this.opcodesetupData)
        //}
      }
    )
  }

  addOpCode() {

  }

}
