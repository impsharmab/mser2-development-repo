import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';

import { Mser2SidenavComponent } from '../../mser2-sidenav/mser2-sidenav.component';
import { Mser2FooterComponent } from '../../mser2-footer/mser2-footer.component';
import { Mser2ProfileComponent } from '../../mser2-profile/mser2-profile.component';
import { Mser2BodyComponent } from '../../mser2-body/mser2-body.component';
import { Mser2HeaderComponent } from '../../mser2-header/mser2-header.component';
import { MserRoutingModule } from './../mser-routing/mser-routing.module';
import { RootPageComponent } from '../rootpage.component';
import { HomeComponent } from '../../home/home.component';
import { PayoutchartComponent } from '../../payoutchart/payoutchart.component';

import { OpcodeSetupComponent } from '../../enrollment/opcode-setup/opcode-setup.component'
import { OpcodesetupService } from '../../mser2-services/enrollment-service/opcodesetup.service'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MserRoutingModule
  ],

  declarations: [Mser2SidenavComponent,
    Mser2FooterComponent,
    Mser2ProfileComponent,
    Mser2BodyComponent,
    Mser2HeaderComponent,
    RootPageComponent,
    HomeComponent,
    PayoutchartComponent,
    OpcodeSetupComponent

  ],

  providers:
  [OpcodesetupService]
})
export class MserModule { }
