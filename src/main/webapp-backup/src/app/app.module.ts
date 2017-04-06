import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { Mser2SidenavComponent } from './mser2-sidenav/mser2-sidenav.component';
import { Mser2FooterComponent } from './mser2-footer/mser2-footer.component';
import { Mser2ProfileComponent } from './mser2-profile/mser2-profile.component';
import { Mser2BodyComponent } from './mser2-body/mser2-body.component';
import { Mser2HeaderComponent } from './mser2-header/mser2-header.component';
import { Mser2LoginComponent } from './mser2-login/mser2-login.component';
import { AppRoutingModule } from './mser2-route/mser2-route.component';
// import { RootPageComponent } from './rootpage/rootpage.component';

import { Mser2LoginServiceService } from './mser2-services/mser2-login-service.service';
import { ResetPasswordComponent } from './mser2-login/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { MserModule } from './rootpage/mser-module/mser-module.module';
import { DealerRegisterComponent } from './mser2-login/dealer-register-component/dealer-register.component';
import { DealerRegisterService } from './mser2-services/dealer-register-service/dealer-register.service';
import { UserProfileComponent } from './mser2-header/user-profile/user-profile.component';

import { UserProfileService } from './mser2-services/user-profile-service/user-profile.service';
import { OpcodeSetupComponent } from './enrollment/opcode-setup/opcode-setup.component';
import { EnrollmentReportComponent } from './enrollment/enrollment-report/enrollment-report.component';
import { EnrollmentMaintenanceComponent } from './enrollment/enrollment-maintenance/enrollment-maintenance.component';
//import { ContactUsComponent } from './mser2-header/contact-us/contact-us/contact-us.component'


@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    Mser2LoginComponent,
    DealerRegisterComponent,
    //UserProfileComponent,
   // OpcodeSetupComponent,
    EnrollmentReportComponent,
    EnrollmentMaintenanceComponent,
    //ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MserModule
  ],
  providers: [
    Mser2LoginServiceService,
    DealerRegisterService,
    UserProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
