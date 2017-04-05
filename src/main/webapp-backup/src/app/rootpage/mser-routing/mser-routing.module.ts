import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { RootPageComponent } from "../rootpage.component"

import { HomeComponent } from '../../home/home.component';
import { PayoutchartComponent } from '../../payoutchart/payoutchart.component';
import { OpcodeSetupComponent } from '../../enrollment/opcode-setup/opcode-setup.component';
import { MarketingHomeComponent } from '../../marketing/marketing-home/marketing-home.component';
import { RecallRewardsRulesComponent } from '../../marketing/recall-rewards-rules/recall-rewards-rules.component';
import { MarketingProgramComponent } from '../../marketing/marketing-program/marketing-program.component';
import { MarketingTrainingPresentationComponent } from '../../marketing/marketing-training/marketing-presentations/marketing-training-presentation/marketing-training-presentation.component';


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
                path: "opcodesetup",
                component: OpcodeSetupComponent
            },
            {
                path: "marketinghome",
                component: MarketingHomeComponent
            },
            {
                path: "recallrewardsrule",
                component: RecallRewardsRulesComponent
            },
            {
                path: "marketingprogram",
                component: MarketingProgramComponent
            },
            {
                path: "presentation",
                component: MarketingTrainingPresentationComponent
            }


        ]
    }

]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MserRoutingModule { }
