import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';

import { OpcodeSetupComponent } from '../enrollment/opcode-setup/opcode-setup.component'

@Component({
  selector: 'app-mser2-sidenav',
  templateUrl: './mser2-sidenav.component.html',
  styleUrls: ['./mser2-sidenav.component.css'],

})
export class Mser2SidenavComponent implements OnInit {
  private opcodesetupComponent: OpcodeSetupComponent;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  opcodesetup() {
    this.opcodesetupComponent.opcodesetup();
    debugger
  }
}
