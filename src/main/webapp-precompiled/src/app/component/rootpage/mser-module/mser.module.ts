import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProfileComponent } from '../../profile/profile.component';
import { BodyComponent } from '../../body/body.component';
import { HeaderComponent } from '../../header/header.component';
import { RoutingModule } from './../routing/routing.module';
import { RootPageComponent } from '../rootpage.component';
import { HomeComponent } from '../../home/home.component';
import { PayoutchartComponent } from '../../payoutchart/payoutchart.component';
import { OpcodeSetupComponent } from '../../enrollment/opcode-setup/opcode-setup.component';
import { UserProfileComponent } from '../../header/user-profile/user-profile.component';
import { ContactUsComponent } from '../../header/contact-us/contact-us.component';
import { DealercodeModalComponent } from '../../header/dealercode-modal/dealercode-modal.component';
import { MarketingHomeComponent } from '../../marketing/marketing-home/marketing-home.component';

import { OpcodeSetupService } from '../../../services/opcode-setup/opcode-setup.service';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],

  declarations: [
    SidenavComponent,
    FooterComponent,
    ProfileComponent,
    BodyComponent,
    HeaderComponent,
    RootPageComponent,
    HomeComponent,
    PayoutchartComponent,
    OpcodeSetupComponent,
    UserProfileComponent,
    ContactUsComponent,
    DealercodeModalComponent,
   // MarketingHomeComponent
  ],
  providers: [OpcodeSetupService] 
})
export class MserModule { }
