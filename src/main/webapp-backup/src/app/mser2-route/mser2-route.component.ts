
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Mser2LoginComponent } from '../mser2-login/mser2-login.component';
// import { RootPageComponent } from '../rootpage/rootpage.component';
import { ResetPasswordComponent } from '../mser2-login/reset-password/reset-password.component'
// import {HomeComponent} from "../home/home.component"

import { OpcodeSetupComponent } from '../enrollment/opcode-setup/opcode-setup.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: "login",
        component: Mser2LoginComponent
    },
    // {
    //     path: "mserHomepage",
    //     component: RootPageComponent
    // },
    {
        path: "resetPassword",
        component: ResetPasswordComponent
    },
    // {
    //     path: "opcodesetup",
    //     component: OpcodeSetupComponent
    // }
    //  {
    //     path: "home",
    //     component: HomeComponent
    // },
    //,
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
