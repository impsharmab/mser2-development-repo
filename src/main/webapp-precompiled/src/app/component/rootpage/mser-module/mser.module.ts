import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from 'ng2-datepicker';
import { PdfmakeModule } from 'ng-pdf-make';
import {
  DialogModule, InputTextModule, DataTableModule, MultiSelectModule, DataListModule,
  TabViewModule, ButtonModule, DropdownModule, SharedModule, CheckboxModule, TooltipModule
} from 'primeng/primeng';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { FooterComponent } from '../../footer/footer.component';
import { JasperPocComponent } from '../../reports/jsper-report-poc/jasper-component';

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
import { CMSComponent } from '../../cms/cms.component';
import { PartsLookupComponent } from '../../parts-lookup/parts-lookup.component';
import { PayoutRedistributionComponent } from '../../enrollment/payout-redistribution/payout-redistribution';
import { MVPComponent } from '../../mvp/mvp.component';
import { RewardsDistributionComponent } from '../../rewards-distribution/rewards-distribution';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component';
import { UconnectComponent } from '../../uconnect/uconnect-videos/uconnect-video.component';
import { DealerTeamComponent } from '../../express-lane/dealer-team/dealer-team.component';
import { EnrollmentComponent } from '../../enrollment/enrollment-maintenance/new-enrollment';
import { RewardsRedistributionComponent } from '../../rewards-redistribution/rewards-redistribution.component';
import { OpcodeSetupService } from '../../../services/enrollment-service/opcode-setup.service';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { DealerTeamService } from '../../../services/express-lane/dealer-team/dealer-team.service';
import { RewardsDistributionService } from '../../../services/rewards-distribution/rewards-distribution.service';
import { RewardsReDistributionService } from '../../../services/rewards-redistribution/rewards-redistribution.service';
import { JasperService } from '../../../services/report/jasper-report-poc/jasper-service';

@NgModule({
  imports: [
    CommonModule, BrowserAnimationsModule, BrowserModule, FormsModule, HttpModule, RoutingModule, DataTableModule,
    DialogModule, DatePickerModule, MultiSelectModule, InputTextModule, DataListModule, TabViewModule,
    ButtonModule, DropdownModule, SharedModule, CheckboxModule, TooltipModule
    //PdfmakeModule
  ],

  declarations: [
    SidenavComponent, FooterComponent, BodyComponent, HeaderComponent, RootPageComponent, HomeComponent,
    PayoutchartComponent, OpcodeSetupComponent, UserProfileComponent, ContactUsComponent,
    DealercodeModalComponent, CMSComponent, PartsLookupComponent, RewardsRedistributionComponent, MVPComponent,
    RewardsDistributionComponent, AdminPayoutComponent, UconnectComponent, DealerTeamComponent,
    EnrollmentComponent, JasperPocComponent

  ],
  providers: [
    OpcodeSetupService, EnrollmentMaintenanceService, DealerTeamService, RewardsDistributionService,
    RewardsReDistributionService, JasperService
  ]
})
export class MserModule { }
