import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { RootPageComponent } from "../rootpage.component"

import { HomeComponent } from '../../home/home.component';
import { PayoutchartComponent } from '../../payoutchart/payoutchart.component';
import { UserProfileComponent } from '../../header/user-profile/user-profile.component'
import { OpcodeSetupComponent } from '../../enrollment/opcode-setup/opcode-setup.component'
import { ContactUsComponent } from '../../header/contact-us/contact-us.component'


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

        ]
    }

]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
