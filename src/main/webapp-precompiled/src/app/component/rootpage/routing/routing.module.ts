import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { RootPageComponent } from "../rootpage.component";

import { HomeComponent } from '../../home/home.component';
import { PayoutchartComponent } from '../../payoutchart/payoutchart.component';
import { UserProfileComponent } from '../../header/user-profile/user-profile.component'
import { OpcodeSetupComponent } from '../../enrollment/opcode-setup/opcode-setup.component'
import { ContactUsComponent } from '../../header/contact-us/contact-us.component';
import { CMSComponent } from '../../cms/cms.component';
import { PartsLookupComponent } from '../../parts-lookup/parts-lookup.component';
import { RewardsRedistributionComponent } from '../../rewards-redistribution/rewards-redistribution.component';
import { MarketingTrainingPresentationComponent } from '../../marketing/marketing-training/marketing-presentations/marketing-training-presentation/marketing-training-presentation.component';
import { MVPComponent } from '../../mvp/mvp.component';
import { RewardsDistributionComponent } from '../../rewards-distribution/rewards-distribution';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component';
import { UconnectComponent } from '../../uconnect/uconnect-videos/uconnect-video.component';
import { DealerTeamComponent } from '../../express-lane/dealer-team/dealer-team.component';
import { EnrollmentComponent } from '../../enrollment/enrollment-maintenance/enrollment-maintenance';
import { JasperPocComponent } from '../../reports/jsper-report-poc/jasper-component';
import { CategoryMaintenanceComponent } from '../../category-maintenance/category-maintenance.component';
import { PartAddComponent } from '../../part-add/part-add.component';
import { PartMaintenanceComponent } from '../../part-maintenance/part-maintenance.component';
import { UserEmulationComponent } from '../../admin/user/user-emulation/user-emulation.component';
import { EmployeeMaintenanceComponent } from '../../admin/user/employee-maintenance/employee-maintenance.component';
import { AddEmployeeMaintenanceComponent } from '../../admin/user/employee-maintenance/add-employee-maintenance.component';
import { UserLookupComponent } from '../../admin/user/user-maintenance/user-lookup.component';
import { AddUserMaintenanceComponent } from '../../admin/user/user-maintenance/add-user-maintenance';
import { PartCategoryLookupComponent } from '../../admin/part/part-category-lookup.component';
import { IneligibleROReportComponent } from '../../reports/mser/inelligible-repair-orders/ineligible-ro.component';
import { RewardsDepositReportComponent } from '../../reports/mser/reward-deposit-report/reward-deposit.component';
import { ROReportComponent } from '../../reports/mser/ro-report/ro-report.component';
import { WiAdvisorTireReportComponent } from '../../reports/wiAdvisor/wiAdvisor-tire/wiAdvisor-tire.component';
import { EnrollmentReportComponent } from '../../enrollment/enrollment-report/enrollment-report.component';
import { PCDistributionReportComponent } from '../../reports/parts-counter/pc-distribution/pc-distribution-report.component';
import { WiAdvisorManagementReportComponent } from '../../reports/wiAdvisor/wiAdvisor-management/wiAdvisor-management-report.component';
import { PartsSummaryROReportComponent } from '../../reports/parts/parts-summary/parts-summary-ro.component';
import { PCInvoiceReportComponent } from '../../reports/parts-counter/pc-invoice/pc-invoice-report.component';


const routes: Routes = [

    {
        path: "mserHomepage",
        component: RootPageComponent,
        children: [

            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "payoutchart",
                component: PayoutchartComponent
            },
            {
                path: "userprofile",
                component: UserProfileComponent
            },
            {
                path: "opcodesetup",
                component: OpcodeSetupComponent
            },
            {
                path: "contactus",
                component: ContactUsComponent

            },
            {
                path: "cmsrouter",
                component: CMSComponent

            },
            {
                path: "partslookuppage",
                component: PartsLookupComponent

            },
            // {
            //     path: "enrollmentmaintenance",
            //     component: EnrollmentMaintenanceComponent

            // },
            {
                path: "enrollmentmaintenance",
                component: EnrollmentComponent

            },

            {
                path: "rewardsredistribution",
                component: RewardsRedistributionComponent

            },
            {
                path: "marketingtrainingpresentation",
                component: MarketingTrainingPresentationComponent

            },

            {
                path: "mvp",
                component: MVPComponent

            },
            {
                path: "rewardsdistribution",
                component: RewardsDistributionComponent

            },
            {
                path: "adminpayout",
                component: AdminPayoutComponent

            },
            {
                path: "uconnectvideos",
                component: UconnectComponent

            },

            {
                path: "dealerteam",
                component: DealerTeamComponent

            },
            {
                path: "jasperreport",
                component: JasperPocComponent

            },
            {
                path: "categorymaintenance",
                component: CategoryMaintenanceComponent

            },
            {
                path: "partadd",
                component: PartAddComponent

            },
            {
                path: "partmaintenance",
                component: PartMaintenanceComponent

            },
            {
                path: "useremulation",
                component: UserEmulationComponent

            },

            {
                path: "employeemaintenance",
                component: EmployeeMaintenanceComponent

            },
            {
                path: "addemployeemaintenance",
                component: AddEmployeeMaintenanceComponent

            },
            {
                path: "userlookup",
                component: UserLookupComponent

            },
            {
                path: "addusermaintenance",
                component: AddUserMaintenanceComponent
            },
            {
                path: "partcategorylookup",
                component: PartCategoryLookupComponent
            },
            {
                path: "ineligibleroreport",
                component: IneligibleROReportComponent
            },
            {
                path: "rewardsdepositreport",
                component: RewardsDepositReportComponent
            },
            {
                path: "roreport",
                component: ROReportComponent
            },
            {
                path: "wiadvisortirereport",
                component: WiAdvisorTireReportComponent
            },
            {
                path: "enrollmentreport",
                component: EnrollmentReportComponent
            },
            {
                path: "pcdistributionreport",
                component: PCDistributionReportComponent
            },
            {
                path: "wiadvisormanagementreport",
                component: WiAdvisorManagementReportComponent
            },
            {
                path: "partssummaryroreport",
                component: PartsSummaryROReportComponent
            },
            {
                path: "pcinvoicereport",
                component: PCInvoiceReportComponent
            }















        ]
    }



]
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
           // RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class RoutingModule { }
