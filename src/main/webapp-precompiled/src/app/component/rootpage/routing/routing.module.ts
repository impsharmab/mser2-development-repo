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
import { EnrollmentMaintenanceComponent } from '../../enrollment/enrollment-maintenance/enrollment-maintenance.component';
import { RewardsRedistributionComponent } from '../../rewards-redistribution/rewards-redistribution.component';
import { MarketingTrainingPresentationComponent } from '../../marketing/marketing-training/marketing-presentations/marketing-training-presentation/marketing-training-presentation.component';
import { MVPComponent } from '../../mvp/mvp.component';
import { RewardsDistributionComponent } from '../../rewards-distribution/rewards-distribution';
import { AdminPayoutComponent } from '../../admin-payout/admin-payout.component';
import { UconnectComponent } from '../../uconnect/uconnect-videos/uconnect-video.component';
import { DealerTeamComponent } from '../../express-lane/dealer-team/dealer-team.component';
import { EnrollmentComponent } from '../../enrollment/enrollment-maintenance/new-enrollment';
import { JasperPocComponent } from '../../reports/jsper-report-poc/jasper-component';

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

        ]
    }

]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
