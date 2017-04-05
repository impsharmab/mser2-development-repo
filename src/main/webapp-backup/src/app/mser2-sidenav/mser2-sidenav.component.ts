import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';

import { OpcodeSetupComponent } from '../enrollment/opcode-setup/opcode-setup.component';
// import 'https://code.jquery.com/jquery-1.12.4.min.js';
// import '../assets/assets/jquery.dataTables.min.js';
// import '../assets/assets/dataTables.bootstrap.min.js';
// import '../assets/_js/zozo.tabs.min.js';

@Component({
  selector: 'app-mser2-sidenav',
  templateUrl: './mser2-sidenav.component.html',
  // styleUrls: [
  //   './mser2-sidenav.component.css', 
  // '../assets/_css/zozo.tabs.min.css', 
  // '../assets/assets/dataTables.bootstrap.min.css'
  
  // ],

})
export class Mser2SidenavComponent implements OnInit {
  private opcodesetupComponent: OpcodeSetupComponent;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  opcodesetup() {
    // this.opcodesetupComponent.opcodesetup();
    // debugger
  }
}
