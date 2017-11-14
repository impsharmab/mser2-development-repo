import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { User } from './user.interface';
import { SSOLoginInterface } from './ssologin.interface'
import { LoginService } from '../../services/login-service/login.service';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User = {
    uname: '',
    pword: ''
  };
  private userdata: any = {};
  public errorMessage: string = "";
  public loginFailed: string = "";
  private ssouserdata: any = {};
  private ssotoken: string = "";
  private ssodealercode: string = "";
  private ssopositioncode: string = "";
  private origin: string = "";
  public hideLoginPage: boolean = false;
  private booleanDealerEmulation: any = false;
  private refreshTokenData: any;
  private endEmulationFromCookie: string = "";
  public originFromCookie: string = "";

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute,
    private cookieService: CookieService, private chRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.endEmulationFromCookie = this.cookieService.get("endEmulation");
    this.cookieService.remove("endEmulation");
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.ssotoken = params['token'];
      this.ssodealercode = params['dc'];
      this.ssopositioncode = params['pc'];
      this.origin = params['origin'];
      if (this.ssotoken != undefined && this.ssotoken != null && this.ssotoken != "") {
        this.hideLoginPage = true;
        this.ssologin(
          this.ssotoken,
          this.ssopositioncode,
          this.ssodealercode,
          this.origin
        )
      }
    });

    var tokenFromCookie = this.cookieService.get("token");
    var dcFromCookie = this.cookieService.get("dc");
    var pcFromCookie = this.cookieService.get("pc");
    var originFromCookie = this.cookieService.get("origin");
    this.originFromCookie = originFromCookie;
    if (tokenFromCookie != undefined && dcFromCookie != undefined && pcFromCookie != undefined) {
      this.hideLoginPage = true;
      this.ssologin(
        tokenFromCookie,
        pcFromCookie,
        dcFromCookie,
        originFromCookie
      )
    }
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
  private ssologin(ssotoken: string, ssopositioncode: string, ssodealercode: string, originFromCookie?: string) {
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
      ssotoken,
      ssopositioncode,
      ssodealercode).subscribe(
      (resUserData) => {
        this.userdata = (resUserData)
        if (resUserData["token"].length > 0) {
          this.loginService.setUserData(this.userdata, originFromCookie);
          var poscodes: any = this.userdata.positionCode;
          var delcodes: any = this.userdata.dealerCode;
          var delnames: any = this.userdata.dealerName;
          var mserEnrollment: any = this.userdata.mserEnrollment;
          // var userid: any = this.userdata.userId;
          // ga('set', 'userId', userid);
          sessionStorage.setItem("selectedCodeData", JSON.stringify(
            {
              "selectedPositionCode": poscodes === undefined ? 0 : poscodes[0] === "" ? "0" : poscodes.length > 0 ? poscodes[0] : 0,
              "selectedDealerCode": delcodes === undefined ? 0 : delcodes[0] === "" ? "0" : delcodes.length > 0 ? delcodes[0] : 0,
              "selectedDealerName": delnames === undefined ? "" : delnames[0] === "" ? "" : delnames.length > 0 ? delnames[0] : 0
            }))

          if (!mserEnrollment) {
            let url = ["notMserEnrolledPage"]
            this.router.navigate(url);
          } else if (mserEnrollment && originFromCookie != undefined && originFromCookie == "payout") {
            let url = ["mserHomepage/payoutchart"]
            this.router.navigate(url);
          } else if (mserEnrollment) {
            let url = ["mserHomepage/home"]
            this.router.navigate(url);
          }

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
    // this.cookieService.put("origin", this.origin);
  }
  private refreshLogin() {
    var user = this.cookieService.get("token");
    var isDealerEmulation = this.cookieService.get("isDealerEmulation");

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

            } else {
              this.loginService.setUserData(this.refreshTokenData, this.origin);
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

            if ((this.endEmulationFromCookie != undefined && this.endEmulationFromCookie == "endEmulate") && mserEnrollment && !passwordReset) {
              let url = ["mserHomepage/useremulation"]
              this.router.navigate(url);
            } else if (mserEnrollment && this.originFromCookie != undefined && this.originFromCookie == "payout") {
              let url = ["mserHomepage/payoutchart"]
              this.router.navigate(url);
            } else if (mserEnrollment && !passwordReset) {
              let url = ["mserHomepage/home"]
              this.router.navigate(url);
            } else if (mserEnrollment && passwordReset) {
              let url = ["resetpassword"]
              this.router.navigate(url);
            } else if (!mserEnrollment) {
              let url = ["notMserEnrolledPage"]
              this.router.navigate(url);
            }
            // location.reload();
          } else {

          }
        },
        (error) => {
          this.cookieService.removeAll();
          this.hideLoginPage = false;
          // let url = ["login"]
          // this.router.navigate(url);
          // location.reload();
        }
      )
    }
    else {
      this.cookieService.removeAll();
      this.hideLoginPage = false;
      // let url = ["login"]
      // this.router.navigate(url);
      // window.location.href =
      //   window.location.origin
      //     ? window.location.origin + '/'
      //     : window.location.protocol + '/' + window.location.host + '/';
    }
  }
  public login() {
    if (this.user.uname.trim() === "" && this.user.pword.trim() === "") {
      //this.loginFailed = "Login Failed";
      this.errorMessage = "Please enter your valid SID/TID and Password";
      return;
    } else if (this.user.uname.trim() === "" && this.user.pword.trim() !== null) {
      //this.loginFailed = "Login Failed";
      this.errorMessage = 'Please enter your SID/TID'
      return;
    } else if (this.user.uname.trim() !== null && this.user.pword.trim() === "") {
      // this.loginFailed = "Login Failed";
      this.errorMessage = 'Please enter your Password'
      return;
    }
    this.loginService.getLoginResponse(this.user.uname, this.user.pword).subscribe(
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
            let url = ["mserHomepage/home"]
            this.router.navigate(url);
          } else if (mserEnrollment && passwordReset) {
            let url = ["resetpassword"]
            this.router.navigate(url);
          } else if (!mserEnrollment) {
            let url = ["notMserEnrolledPage"]
            this.router.navigate(url);
          }
          // location.reload();
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
  public resetPassword() {
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
