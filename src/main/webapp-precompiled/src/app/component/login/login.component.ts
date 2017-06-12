import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';
import { User } from './user.interface';

@Component({
  selector: 'login',
  // templateUrl: './mser2-login.component.html',
  templateUrl: './new-login.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  private userdata: any = {};
  private errorMessage: string = "";
  private loginFailed: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    }
  }

  private login() {
    // if (this.user.username.trim() === "" && this.user.password.trim() === "") {
    //   this.loginFailed = "Login Failed";
    //   this.errorMessage = "Please enter your valid SID/TID and Password";
    //   return;
    // } else if (this.user.username.trim() === "" && this.user.password.trim() !== null) {
    //   this.loginFailed = "Login Failed";
    //   this.errorMessage = 'Please enter your valid SID or TID'
    //   return;
    // } else if (this.user.username.trim() !== null && this.user.password.trim() === "") {
    //   this.loginFailed = "Login Failed";
    //   this.errorMessage = 'Please enter your valid Password'
    //   return;
    // }
    debugger
    this.loginService.getLoginResponse(this.user.username, this.user.password).subscribe(
      
      (resUserData) => {
        this.userdata = (resUserData)
        if (resUserData["token"].length > 0) {
          this.loginService.setUserdata(this.userdata);
          this.loginService.setUserRole(this.userdata.roles);
          var poscodes: any = this.userdata.positionCode; 
          var delcodes: any = this.userdata.dealerCode;
          sessionStorage.setItem("selectedCodeData", JSON.stringify(
            {
              "selectedPositionCode": poscodes === undefined ? 0 : poscodes[0] === "" ? "0" : poscodes.length > 0 ? poscodes[0] : 0,
              "selectedDealerCode": delcodes === undefined ? 0 : delcodes[0] === "" ? "0" : delcodes.length > 0 ? delcodes[0] : 0
            }))
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
