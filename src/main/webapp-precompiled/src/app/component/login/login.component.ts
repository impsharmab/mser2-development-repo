import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { User } from './user.interface';
import { SSOLoginInterface } from './ssologin.interface'
import { LoginService } from '../../services/login-service/login.service';


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
  private ssouserdata: any = {};
  private ssotoken: string = "";
  private ssodealercode: string = "";
  private ssopositioncode: string = "";
  private hideLoginPage: boolean = false;
  private booleanDealerEmulation: any = false;
  private refreshTokenData: any;

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.ssotoken = params['token'];
      this.ssodealercode = params['dc'];
      this.ssopositioncode = params['pc'];
      if (this.ssotoken !== undefined && this.ssotoken !== "") {
        this.hideLoginPage = true;
        this.ssologin(
          this.ssotoken,
          this.ssopositioncode,
          this.ssodealercode
        )
      }
    });
    this.checkDealerToken();
    this.refreshLogin();
  }

  private checkDealerToken() {
    if (this.cookieService.get("adminToken") == this.cookieService.get("token")) {
      if ((this.cookieService.get("token") !== undefined) && this.cookieService.get("token") !== null) {
        this.booleanDealerEmulation = true;
      }
    }
  }
  private ssologin(ssotoken: string, ssopositioncode: string, ssodealercode: string) {
    var adminToken = this.cookieService.get("adminToken");
    if (adminToken !== undefined && adminToken !== null && adminToken.length > 1) {
      let url = ["login"]
      this.router.navigate(url);
      return;
    }
    sessionStorage.removeItem("selectedCodeData");
    sessionStorage.removeItem("selectedDealerCode");
    sessionStorage.removeItem("CurrentUser");
    sessionStorage.clear();
    this.cookieService.remove("token");
    this.cookieService.removeAll();
    this.loginService.getSSOLoginResponse(
      this.ssotoken,
      this.ssopositioncode,
      this.ssodealercode).subscribe(
      (resUserData) => {
        this.userdata = (resUserData)
        if (resUserData["token"].length > 0) {
          this.loginService.setUserData(this.userdata);
          var poscodes: any = this.userdata.positionCode;
          var delcodes: any = this.userdata.dealerCode;
          var delnames: any = this.userdata.dealerName;
          // var userid: any = this.userdata.userId;
          // ga('set', 'userId', userid);
          sessionStorage.setItem("selectedCodeData", JSON.stringify(
            {
              "selectedPositionCode": poscodes === undefined ? 0 : poscodes[0] === "" ? "0" : poscodes.length > 0 ? poscodes[0] : 0,
              "selectedDealerCode": delcodes === undefined ? 0 : delcodes[0] === "" ? "0" : delcodes.length > 0 ? delcodes[0] : 0,
              "selectedDealerName": delnames === undefined ? "" : delnames[0] === "" ? "" : delnames.length > 0 ? delnames[0] : 0
            }))

          let url = ["mserHomepage"]
          this.router.navigate(url);

        } else {
          let url = ["login"]
          this.router.navigate(url);
        }
      },
      (error) => {
        this.cookieService.removeAll();
        window.open("./loginerror.html", "_self");
      }
      )
  }
  private refreshLogin() {
    var user = this.cookieService.get("token");
    var isDealerEmulation = this.cookieService.get("isDealerEmulation");
    if (user !== undefined) {
      if (user !== undefined && user.length > 1) {
        this.hideLoginPage = true;
        this.loginService.getRefreshLoginResponse(user).subscribe(
          (refreshTokenData) => {
            this.refreshTokenData = (refreshTokenData)
            if (refreshTokenData !== undefined && refreshTokenData.token.length > 1) {
              sessionStorage.setItem("showWelcomePopup", "false");
              if (isDealerEmulation == "true") {
                var poscodes: any = ["01"];
                var delcodes: any = [this.cookieService.get("dealercode")];
                var delnames: any = this.refreshTokenData.dealerName;
                var mserEnrollment: any = this.refreshTokenData.mserEnrollment;
                var passwordReset: any = this.refreshTokenData.passwordReset;
                var roles: any = ["10"];
                // this.loginService.setUserData(this.refreshTokenData);
                // sessionStorage.setItem("CurrentUser", JSON.stringify(
                //   {
                //     "token": this.refreshTokenData.token,
                //     "name": this.refreshTokenData.name,
                //     "positionCode": poscodes,
                //     "dealerCode": delcodes,
                //     "dealerName": [],
                //     "mserEnrollment": this.refreshTokenData.mserEnrollment,
                //     "roles": roles,
                //     "userId": "",
                //     "dealerManager": this.refreshTokenData.dealerManager,
                //     "serviceManagerOfRecord": this.refreshTokenData.serviceManagerOfRecord,
                //     "partsManagerOfRecord": this.refreshTokenData.partsManagerOfRecord,
                //     "elManager": this.refreshTokenData.elManager,
                //     "pcManager": this.refreshTokenData.pcManager,
                //     "uvmManager": this.refreshTokenData.uvmManager,
                //     "elEnrolled": this.refreshTokenData.elEnrolled,
                //     "pcEnrolled": this.refreshTokenData.pcEnrolled,
                //     "passwordReset": false,
                //     "admin": false
                //   }
                // )
                // )

              } else {
                this.loginService.setUserData(this.refreshTokenData);
                var poscodes: any = this.refreshTokenData.positionCode;
                var delcodes: any = this.refreshTokenData.dealerCode;
                var delnames: any = this.refreshTokenData.dealerName;
                var mserEnrollment: any = this.refreshTokenData.mserEnrollment;
                var passwordReset: any = this.refreshTokenData.passwordReset;
              }
              // var userid: any = this.refreshTokenData.userId;
              // ga('set', 'userId', userid);
              sessionStorage.setItem("selectedCodeData", JSON.stringify(
                {
                  "selectedPositionCode": poscodes === undefined ? 0 : poscodes[0] === "" ? "0" : poscodes.length > 0 ? poscodes[0] : 0,
                  "selectedDealerCode": delcodes === undefined ? 0 : delcodes[0] === "" ? "0" : delcodes.length > 0 ? delcodes[0] : 0,
                  "selectedDealerName": delnames === undefined ? "" : delnames[0] === "" ? "" : delnames.length > 0 ? delnames[0] : 0
                }))

              if (mserEnrollment && !passwordReset) {
                let url = ["mserHomepage"]
                this.router.navigate(url);
              } else if (mserEnrollment && passwordReset) {
                let url = ["resetpassword"]
                this.router.navigate(url);
              } else if (!mserEnrollment) {
                let url = ["notMserEnrolledPage"]
                this.router.navigate(url);
              }
            } else {

            }
          },
          (error) => {
            this.cookieService.removeAll();
            location.reload();
          }
        )
      }
    }
  }
  private login() {
    if (this.user.username.trim() === "" && this.user.password.trim() === "") {
      //this.loginFailed = "Login Failed";
      this.errorMessage = "Please enter your valid SID/TID and Password";
      return;
    } else if (this.user.username.trim() === "" && this.user.password.trim() !== null) {
      //this.loginFailed = "Login Failed";
      this.errorMessage = 'Please enter your SID/TID'
      return;
    } else if (this.user.username.trim() !== null && this.user.password.trim() === "") {
      // this.loginFailed = "Login Failed";
      this.errorMessage = 'Please enter your Password'
      return;
    }
    this.loginService.getLoginResponse(this.user.username, this.user.password).subscribe(
      (resUserData) => {
        this.userdata = (resUserData)
        if (resUserData["token"].length > 0) {
          this.loginService.setUserdata(this.userdata);
          this.loginService.setUserRole(this.userdata.roles);
          var poscodes: any = this.userdata.positionCode;
          var delcodes: any = this.userdata.dealerCode;
          var delnames: any = this.userdata.dealerName;
          var mserEnrollment: any = this.userdata.mserEnrollment;
          var passwordReset: any = this.userdata.passwordReset;
          this.cookieService.put("isDealerEmulation", "false");
          sessionStorage.setItem("selectedCodeData", JSON.stringify(
            {
              "selectedPositionCode": poscodes === undefined ? 0 : poscodes[0] === "" ? "0" : poscodes.length > 0 ? poscodes[0] : poscodes.length == 0 ? 0 : 0,
              "selectedDealerCode": delcodes === undefined ? 0 : delcodes[0] === "" ? "0" : delcodes.length > 0 ? delcodes[0] : delcodes.length == 0 ? 0 : 0,
              "selectedDealerName": delnames === undefined ? "" : delnames[0] === "" ? "" : delnames.length > 0 ? delnames[0] : delnames.length == 0 ? "" : 0
            }))

          if (mserEnrollment && !passwordReset) {
            let url = ["mserHomepage"]
            this.router.navigate(url);
          } else if (mserEnrollment && passwordReset) {
            let url = ["resetpassword"]
            this.router.navigate(url);
          } else if (!mserEnrollment) {
            let url = ["notMserEnrolledPage"]
            this.router.navigate(url);
          }

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
    let url = ["resetpassword"]
    this.router.navigate(url);
  }
  dealerregister() {
    let url = ["dealerregister"]
    this.router.navigate(url);
  }
  fiatEnrollment() {
    let url = ["fiatenrollment"]
    this.router.navigate(url);
  }
}
