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
import { OpcodeSetupComponent } from './enrollment/opcode-setup/opcode-setup.component';
import { OpcodesetupService } from './mser2-services/enrollment-service/opcodesetup.service'



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MserModule
  ],
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    Mser2LoginComponent,
    //OpcodeSetupComponent

  ],

  providers: [Mser2LoginServiceService, OpcodesetupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
