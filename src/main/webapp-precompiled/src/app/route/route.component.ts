import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../component/login/login.component';
import { RootPageComponent } from '../component/rootpage/rootpage.component';
import { ResetPasswordComponent } from '../component/login/reset-password/reset-password.component'
// import {HomeComponent} from "../home/home.component"
import { DealerRegisterComponent } from '../component/login/dealer-register-component/dealer-register.component';
import { FiatEnrollmentComponent } from '../component/login/fiat-enrollment/fiat-enrollment';
import { PasswordResetComponent } from '../component/login/password-reset/password-reset.component';
import { NotMSEREnrolledComponent } from '../component/login/not-mserenrolled/not-mserenrolled.component';

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
    {
        path: "mserHomepage",
        component: RootPageComponent
    },
    // {
    //     path: "resetPassword",
    //     component: ResetPasswordComponent
    // },
    {
        path: "dealerregister",
        component: DealerRegisterComponent
    },
    {
        path: "fiatenrollment",
        component: FiatEnrollmentComponent
    },
    {
        path: "resetpassword",
        component: PasswordResetComponent
    },
    {
        path: "notMserEnrolledPage",
        component: NotMSEREnrolledComponent
    },
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
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
