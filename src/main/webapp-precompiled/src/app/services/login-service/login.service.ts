import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class LoginService {
  private userdata = {};
  private role: string = "";
  constructor(private http: Http) { }

  setUserdata(userdata: any) {
    this.userdata = userdata;
    sessionStorage.setItem("CurrentUser", "");
    sessionStorage.removeItem('CurrentUser');
    sessionStorage.setItem("CurrentUser", JSON.stringify(userdata));
  }
  getUserdata() {
    return this.userdata;
  }
  setUserRole(userRole: any) {
    if (userRole[0] == 1 || userRole[0] == 3 || userRole[0] == 13) {
      this.role = "Executive"
      userRole = "Executive"
    } else if (userRole[0] == 12) {
      userRole = "Business Center"
      this.role = "Business Center"
    } else if (userRole[0] == 11) {
      userRole = "District Manager"
      this.role = "District Manager"
    } else if (userRole[0] == 10) {
      userRole = "Dealer"
      this.role = "Dealer"
    } else if (userRole[0] == 9) {
      userRole = "Participant"
      this.role = "Participant"
    } else if (userRole[0] == 5) {
      userRole = "Manager"
      this.role = "Manager"
    }

    sessionStorage.setItem("UserRole", "");
    sessionStorage.removeItem('UserRole');
    sessionStorage.removeItem('UserRole');
    sessionStorage.setItem("UserRole", JSON.stringify(this.role));
  }

  getUserRole() {
    return this.role;
  }

  getLoginResponse(username, password): any {
    // debugger
    var url = "./login/token/";
    //var url = "https://test.myfcarewards.com/mser2/login/token/"
    //var url = "../assets/json-responses/login-response.json";
    var body = { "username": username, "password": password };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'POST');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    return this.http.post(url, body, { headers: headers })
      //return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  resetPassword(userId: string, emailId: string) {
    // var url = "https://test.myfcarewards.com/imimserservices/UserProfile/ResetPassword";
    var url = "./UserProfile/ResetPassword";

    var body = { "userId": userId, "email": emailId };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string = "";
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}