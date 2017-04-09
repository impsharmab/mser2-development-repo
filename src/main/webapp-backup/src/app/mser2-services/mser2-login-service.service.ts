import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './rxjs-operators';

@Injectable()
export class Mser2LoginServiceService {
  private userdata = {};
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

  getLoginResponse(username, password): any {
    // debugger
    var url = "./login/token/";
    // var url = "https://test.myfcarewards.com/imimserservices/login/token/"
    var url = "../assets/json-responses/login-response.json";
    var body = { "username": username, "password": password };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    // return this.http.post(url, body, { headers: headers })
    return this.http.get(url)
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  resetPassword(userId: string, emailId: string) {
    var url = "";
    var body = { "userId": userId, "emailId": emailId };
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
