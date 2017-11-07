import { NgModule, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes, Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';
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
    public ssotoken: string = "";
    public origin: string = "";
    public isssodealercode: boolean = false;
    public isssopositioncode: boolean = false;
    public ssodealercode: string = "0"
    public ssopositioncode: string = "0";
    public isssotoken: boolean = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {
        this.ssotoken = this.getParameterByName("token");
        this.origin = this.getParameterByName("origin");
        if (this.ssotoken != undefined && this.ssotoken != null && this.ssotoken.length > 0) {
            this.cookieService.put("token", this.ssotoken);
            this.cookieService.put("origin", this.origin);

        }
    }

    private getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
} 
