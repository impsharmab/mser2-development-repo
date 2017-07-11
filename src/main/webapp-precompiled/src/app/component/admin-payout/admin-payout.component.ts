import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

//import { SafeHtml } from './safeHtml.pipe';

import { CMSService } from '../../services/cms-service/cms-service';


@Component({
    selector: 'admin-payout',
    templateUrl: './admin-payout.html',
    //styleUrls: ['./opcode-setup.component.css'],
    // providers:[OpcodesetupService]
})

export class AdminPayoutComponent implements OnInit {
    constructor() { }
    ngOnInit() {

    }
}