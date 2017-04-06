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

  constructor(private router: Router, private loginService: Mser2LoginServiceService) { }

  ngOnInit() {
    this.resetpassword = {
      userId: "",
      emailId: ""
    }
  }

  private resetPassword(userId: string, emailId: string) {
    this.loginService.resetPassword(this.resetpassword.userId, this.resetpassword.emailId).subscribe(
      (resetPasswordData) => {
        this.resetPasswordData = (resetPasswordData)
      }
    )
    //debugger
  }

  private cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
