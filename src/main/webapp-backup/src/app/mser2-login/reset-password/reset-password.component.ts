import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ResetPasswordInterface } from './resetPw.interface'
import { Mser2LoginServiceService } from '../../mser2-services/mser2-login-service.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './new-resetpassword.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetpassword: ResetPasswordInterface;
  private resetPasswordData: any;
  private errorUserID: string = "";
  private errorEmailID: string = "";
  private invalidCreds: boolean = false;

  constructor(private router: Router, private loginService: Mser2LoginServiceService) { }

  ngOnInit() {
    this.resetpassword = {
      userId: "",
      emailId: ""
    }
  }

  private resetPassword() {
    if (this.resetpassword.userId.trim() === "" && this.resetpassword.emailId.trim() === "") {
      this.errorUserID = "Please enter your Login ID.";
      this.errorEmailID = "Email is required.";
      return;
    } else if (this.resetpassword.userId.trim() === "" && this.resetpassword.emailId.trim() !== null) {
      this.errorUserID = "Please enter your Login ID.";
      //this.errorEmailID = 'Email is required'
      return;
    } else if (this.resetpassword.userId.trim() !== null && this.resetpassword.emailId.trim() === "") {
      //this.errorUserID = "Login Failed";
      this.errorEmailID = 'Email is required'
      return;
    }
    this.loginService.resetPassword(this.resetpassword.userId, this.resetpassword.emailId).subscribe(
      (resetPasswordData) => {
        this.resetPasswordData = (resetPasswordData)
      },
      (error) => {
        this.invalidCreds = true;
       //this.errorMessage = "Please enter your valid SID/TID and password";
      }
    )
    //debugger
  }

  private cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
