import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Mser2LoginServiceService } from '../mser2-services/mser2-login-service.service';
import { User } from './mser2-user.interface';

@Component({
  selector: 'app-mser2-login',
  // templateUrl: './mser2-login.component.html',
  templateUrl: './new-login.html',
  styleUrls: ['./mser2-login.component.css']
})
export class Mser2LoginComponent implements OnInit {
  public user: User;
  private userdata: any = {};
  private errorMessage: string = "";
  private loginFailed: string = "";

  constructor(private loginService: Mser2LoginServiceService, private router: Router) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    }
  }

  private login() {
    if (this.user.username.trim() === "" && this.user.password.trim() === "") {
      this.loginFailed = "Login Failed";
      this.errorMessage = "Please enter you valid SID/TID and Password";
      return;
    } else if (this.user.username.trim() === "" && this.user.password.trim() !== null) {
      this.loginFailed = "Login Failed";
      this.errorMessage = 'Please enter your valid SID or TID'
      return;
    } else if (this.user.username.trim() !== null && this.user.password.trim() === "") {
      this.loginFailed = "Login Failed";
      this.errorMessage = 'Please enter your valid Password'
      return;
    }
    this.loginService.getLoginResponse(this.user.username, this.user.password).subscribe(
      (resUserData) => {
        this.userdata = (resUserData)
        if (resUserData["token"].length > 0) {
          this.loginService.setUserdata(this.userdata);

          let url = ["mserHomepage"]
          this.router.navigate(url);
        }
        else {

        }
        // var msg = JSON.parse(resUserData["error"])["error"];
        // alert(msg);
      },
      (error) => {
        this.loginFailed = "Login Failed";
        this.errorMessage = "Please enter your valid SID/TID and password";
      }
    )
  }
  private resetPassword() {
    let url = ["resetPassword"]
    this.router.navigate(url);
  }
  dealerregister() {
    let url = ["dealerregister"]
    this.router.navigate(url);
  }
}
