import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../component/login/login.component';
// import { RootPageComponent } from '../rootpage/rootpage.component';
import { ResetPasswordComponent } from '../component/login/reset-password/reset-password.component'
// import {HomeComponent} from "../home/home.component"
import { DealerRegisterComponent } from '../component/login/dealer-register-component/dealer-register.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent
    },
    // {
    //     path: "mserHomepage",
    //     component: RootPageComponent
    // },
    {
        path: "resetPassword",
        component: ResetPasswordComponent
    },
    {
        path: "dealerregister",
        component: DealerRegisterComponent
    },
    //  {
    //     path: "home",
    //     component: HomeComponent
    // },
    //,
    // {
    //     path: "myfcadashboard",
    //     //component: RootPageComponent
    // },
    // {
    //     path: "admin",
    //     //component: AdminRootPageComponent
    // }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
