import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from 'ng2-datepicker';
import { DialogModule, InputTextModule, DataTableModule, MultiSelectModule, DataListModule, TabViewModule, SharedModule } from 'primeng/primeng';
// import { MultiSelectModule } from '../../multiselect/multiselect';
// import { DataTableModule } from '../../ngprime-datatable/datatable';
// import { DialogModule } from '../../dialog/dialog';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { FooterComponent } from '../../footer/footer.component';

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
import { PartsCounterComponent } from '../../parts-counter/parts-counter.component';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component';
import { UconnectComponent } from '../../uconnect/uconnect-videos/uconnect-video.component';
import { InactiveOpcodeTableComponent } from '../../enrollment/opcode-setup/inactive-opcode.datatable';
import { DealerTeamComponent } from '../../express-lane/dealer-team/dealer-team.component';
import { DealerTeamTableComponent } from '../../express-lane/dealer-team/dealer-team-datatable.component';
import { EnrollmentComponent } from '../../enrollment/enrollment-maintenance/new-enrollment';

import { OpcodeSetupService } from '../../../services/enrollment-service/opcode-setup.service';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { DealerTeamService } from '../../../services/express-lane/dealer-team/dealer-team.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    DataTableModule,
    DialogModule,
    DatePickerModule,
    MultiSelectModule,
    InputTextModule,
    DataListModule,
    TabViewModule,
    SharedModule
  ],

  declarations: [
    SidenavComponent,
    FooterComponent,
    // DataTableModule,

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
    MVPComponent,
    PartsCounterComponent,
    AdminPayoutComponent,
    UconnectComponent,
    InactiveOpcodeTableComponent,
    DealerTeamComponent,
    DealerTeamTableComponent,
    EnrollmentComponent
    // MarketingHomeComponent
  ],
  providers: [OpcodeSetupService, EnrollmentMaintenanceService, DealerTeamService]
})
export class MserModule { }
