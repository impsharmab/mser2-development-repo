import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ResetPasswordInterface } from './resetPw.interface'
import { LoginService } from '../../../services/login-service/login.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetpassword: ResetPasswordInterface;
  private resetPasswordData: any;
  public errorUserID: string = "";
  public errorEmailID: string = "";
  public invalidCreds: boolean = false;
  public successResetPasswordMessage: string = "";

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.resetpassword = {
      userId: "",
      emailId: ""
    }
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  public resetPassword() {
    if (this.resetpassword.userId.trim() === "" && this.resetpassword.emailId.trim() === "") {
      this.errorUserID = "Please enter your SID/TID.";
      this.errorEmailID = "Email is required.";
      return;
    } else if (this.resetpassword.userId.trim() === "" && this.resetpassword.emailId.trim() !== null) {
      this.errorUserID = "Please enter your SID/TID.";
      this.errorEmailID = ''
      return;
    } else if (this.resetpassword.userId.trim() !== null && this.resetpassword.emailId.trim() === "") {
      this.errorUserID = "";
      this.errorEmailID = 'Email is required.';
      return;
    }else if (this.resetpassword.userId.trim() !== null && this.resetpassword.emailId.trim() !== null && !this.validateEmail(this.resetpassword.emailId.trim())) {
      this.errorUserID = "";
      this.errorEmailID = 'Please enter the valid Email ID.';
      return;
    }
    this.loginService.resetPassword(this.resetpassword.userId, this.resetpassword.emailId).subscribe(
      (resetPasswordData) => {
        this.resetPasswordData = (resetPasswordData)
        this.errorUserID = "";
        this.errorEmailID = '';
        this.successResetPasswordMessage = "Please check your Email for new Password";

      },
      (error) => {
        this.errorUserID = "";
        this.errorEmailID = '';
        this.invalidCreds = true;
        
        //this.errorMessage = "Please enter your valid SID/TID and password";
      }
    )
    //debugger
  }

  public cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
