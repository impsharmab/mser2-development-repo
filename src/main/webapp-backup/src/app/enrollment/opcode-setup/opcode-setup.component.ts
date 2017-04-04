import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';

import { OpcodesetupService } from '../../mser2-services/enrollment-service/opcodesetup.service'

@Component({
  selector: 'app-opcode-setup',
  templateUrl: './new-opcode.html',
  styleUrls: ['./opcode-setup.component.css'],
  //providers:[OpcodesetupService]
})
export class OpcodeSetupComponent implements OnInit {
  private opcodesetupData: any;

  constructor(private opcodesetupService: OpcodesetupService, private router: Router) { }

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

}
