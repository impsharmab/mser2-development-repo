import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { NgbModal, NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; 

import { AppComponent } from './app.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
//import { FooterComponent } from './component/footer/footer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BodyComponent } from './component/body/body.component';
//import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './route/route.component';
// import { RootPageComponent } from './rootpage/rootpage.component';
import { OpcodeSetupComponent } from './component/enrollment/opcode-setup/opcode-setup.component';
import { EnrollmentReportComponent } from './component/enrollment/enrollment-report/enrollment-report.component';
import { EnrollmentMaintenanceComponent } from './component/enrollment/enrollment-maintenance/enrollment-maintenance.component';
import { ResetPasswordComponent } from './component/login/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { MserModule } from './component/rootpage/mser-module/mser.module';
import { DealerRegisterComponent } from './component/login/dealer-register-component/dealer-register.component';
import { DealerRegisterService } from './services/dealer-register-service/dealer-register.service';
import { UserProfileComponent } from './component/header/user-profile/user-profile.component';
import { DealercodeModalComponent } from './component/header/dealercode-modal/dealercode-modal.component';

import { LoginService } from './services/login-service/login.service';
import { UserProfileService } from './services/user-profile-service/user-profile.service';
import { OpcodeSetupService } from './services/enrollment-service/opcode-setup.service';
import { DealercodePositioncodeService } from './services/dealercode-positioncode-service/dealercode-positioncode.service'
//import { ContactUsComponent } from './header/contact-us/contact-us/contact-us.component'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MserModule,
    AppRoutingModule,
    MserModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    LoginComponent,
    DealerRegisterComponent,
    //UserProfileComponent,
    // OpcodeSetupComponent,
    EnrollmentReportComponent,
    EnrollmentMaintenanceComponent,
    //DealercodeModalComponent,
    //ContactUsComponent
  ],
  providers: [
    LoginService,
    DealerRegisterService,
    UserProfileService,
    OpcodeSetupService,
    DealercodePositioncodeService

  ],
  // exports: [DealercodeModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
