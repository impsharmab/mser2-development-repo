import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from 'ng2-datepicker';
// import { PdfmakeModule } from 'ng-pdf-make';
import {
  DialogModule, InputTextModule, DataTableModule, MultiSelectModule, DataListModule,
  TabViewModule, ButtonModule, DropdownModule, SharedModule, CheckboxModule, TooltipModule,
  FileUploadModule, CalendarModule, RadioButtonModule, AccordionModule
} from 'primeng/primeng';

import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2-Smooth-Scroll";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { GetLastDateOfMonth } from 'get-last-date-of-month';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { FooterComponent } from '../../footer/footer.component';
import { JasperPocComponent } from '../../reports/jsper-report-poc/jasper-component';
import { CategoryMaintenanceComponent } from '../../category-maintenance/category-maintenance.component';
import { PartAddComponent } from '../../part-add/part-add.component';
import { PartMaintenanceComponent } from '../../part-maintenance/part-maintenance.component';
import { UserEmulationComponent } from '../../admin/user/user-emulation/user-emulation.component';

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
// import { MarketingHomeComponent } from '../../marketing/marketing-home/marketing-home.component';
import { CMSComponent } from '../../cms/cms.component';
import { PartsLookupComponent } from '../../parts-lookup/parts-lookup.component';
import { MVPComponent } from '../../mvp/mvp.component';
import { RewardsDistributionComponent } from '../../rewards-distribution/rewards-distribution';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component';
import { UconnectComponent } from '../../uconnect/uconnect-videos/uconnect-video.component';
import { DealerTeamComponent } from '../../express-lane/dealer-team/dealer-team.component';
import { EnrollmentComponent } from '../../enrollment/enrollment-maintenance/enrollment-maintenance';
import { RewardsRedistributionComponent } from '../../rewards-redistribution/rewards-redistribution.component';
import { EmployeeMaintenanceComponent } from '../../admin/user/employee-maintenance/employee-maintenance.component';
import { UserLookupComponent } from '../../admin/user/user-maintenance/user-lookup.component';
import { AddEmployeeMaintenanceComponent } from '../../admin/user/employee-maintenance/add-employee-maintenance.component';
import { AddUserMaintenanceComponent } from '../../admin/user/user-maintenance/add-user-maintenance';
import { PartCategoryLookupComponent } from '../../admin/part/part-category-lookup.component';
import { CommaSeparatedNumberPipe } from '../../number-formatting/comma-separated.component';
import { IneligibleROReportComponent } from '../../reports/mser/inelligible-repair-orders/ineligible-ro.component';
import { RewardsDepositReportComponent } from '../../reports/mser/reward-deposit-report/reward-deposit.component';
import { ROReportComponent } from '../../reports/mser/ro-report/ro-report.component';
import { PartsSummaryROReportComponent } from '../../reports/parts/parts-summary/parts-summary-ro.component';
import { WiAdvisorTireReportComponent } from '../../reports/wiAdvisor/wiAdvisor-tire/wiAdvisor-tire.component';
import { PCDistributionReportComponent } from '../../reports/parts-counter/pc-distribution/pc-distribution-report.component';
import { WiAdvisorManagementReportComponent } from '../../reports/wiAdvisor/wiAdvisor-management/wiAdvisor-management-report.component';
import { PCInvoiceReportComponent } from '../../reports/parts-counter/pc-invoice/pc-invoice-report.component';
import { MVPAutoApproveComponent } from '../../mvp/mvp-autoapprove/mvp-autoapprove.component';
// import { PhonePipe } from '../../number-formatting/phone-pipe';

import { OpcodeSetupService } from '../../../services/enrollment-service/opcode-setup.service';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { DealerTeamService } from '../../../services/express-lane/dealer-team/dealer-team.service';
import { RewardsDistributionService } from '../../../services/rewards-distribution/rewards-distribution.service';
import { RewardsReDistributionService } from '../../../services/rewards-redistribution/rewards-redistribution.service';
import { JasperService } from '../../../services/report/jasper-report-poc/jasper-service';
import { AdminService } from '../../../services/admin-service/admin-user/user-emulation.service';
import { HomeService } from '../../../services/home-service/home-service';
import { ReportService } from '../../../services/report/report-service';
import { PayoutChartService } from '../../../services/payout-chart/payout-chart.service';
import { AdminPayoutService } from '../../../services/admin-payout/admin-payout-service';
import { MVPAutoApprovalSettingService } from '../../../services/mvp-service/mvp-autoapprove/mvp-autoapprove.service';
import { PartsLookupService } from '../../../services/parts-lookup/parts-lookup.service';

// import { RecallRewardsRulesComponent } from '../../../component/marketing/recall-rewards-rules/recall-rewards-rules.component'
// import { MarketingProgramComponent } from '../../../component/marketing/marketing-program/marketing-program.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule, FormsModule, HttpModule, RoutingModule, DataTableModule,
    DialogModule, DatePickerModule, MultiSelectModule, InputTextModule, DataListModule, TabViewModule,
    ButtonModule, DropdownModule, SharedModule, CheckboxModule, TooltipModule, FileUploadModule, CalendarModule,
    RadioButtonModule, AccordionModule
    // GetLastDateOfMonth
    //PdfmakeModule
  ],

  declarations: [
    SidenavComponent, FooterComponent, BodyComponent, HeaderComponent, RootPageComponent, HomeComponent,
    PayoutchartComponent, OpcodeSetupComponent, UserProfileComponent, ContactUsComponent,
    DealercodeModalComponent, CMSComponent, PartsLookupComponent, RewardsRedistributionComponent, MVPComponent,
    RewardsDistributionComponent, AdminPayoutComponent, UconnectComponent, DealerTeamComponent,
    EnrollmentComponent, JasperPocComponent, CategoryMaintenanceComponent, PartAddComponent, PartMaintenanceComponent,
    SmoothScrollToDirective, SmoothScrollDirective, UserEmulationComponent, EmployeeMaintenanceComponent, UserLookupComponent,
    AddEmployeeMaintenanceComponent, AddUserMaintenanceComponent, PartCategoryLookupComponent, CommaSeparatedNumberPipe,
    ROReportComponent, RewardsDepositReportComponent, IneligibleROReportComponent, PartsSummaryROReportComponent,
    WiAdvisorTireReportComponent, PCDistributionReportComponent, WiAdvisorManagementReportComponent, PCInvoiceReportComponent,
    MVPAutoApproveComponent
    //MarketingHomeComponent, RecallRewardsRulesComponent, MarketingProgramComponent
    // PhonePipe

  ],
  providers: [
    OpcodeSetupService, EnrollmentMaintenanceService, DealerTeamService, RewardsDistributionService,
    RewardsReDistributionService, JasperService, CookieService, AdminService, HomeService, ReportService,
    PayoutChartService, AdminPayoutService, MVPAutoApprovalSettingService, PartsLookupService
  ]
})
export class MserModule { }
