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
import { OpcodeTableComponent } from '../../enrollment/opcode-setup/opcode-datatable';
import { CMSComponent } from '../../cms/cms.component';
import { PartsLookupComponent } from '../../parts-lookup/parts-lookup.component';
import { EnrollmentMaintenanceComponent } from '../../enrollment/enrollment-maintenance/enrollment-maintenance.component';
import { EnrollmentMaintenanceTableComponent } from '../../enrollment/enrollment-maintenance/enrollment-maintenance-datatable';
import { PayoutRedistributionComponent } from '../../enrollment/payout-redistribution/payout-redistribution';
import { MVPComponent } from '../../mvp/mvp.component';

import { OpcodeSetupService } from '../../../services/opcode-setup/opcode-setup.service';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';



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
    OpcodeTableComponent,
    UserProfileComponent,
    ContactUsComponent,
    DealercodeModalComponent,
    CMSComponent,
    PartsLookupComponent,
    EnrollmentMaintenanceComponent,
    EnrollmentMaintenanceTableComponent,
    PayoutRedistributionComponent,
    MVPComponent
    // MarketingHomeComponent
  ],
  providers: [OpcodeSetupService, EnrollmentMaintenanceService]
})
export class MserModule { }
