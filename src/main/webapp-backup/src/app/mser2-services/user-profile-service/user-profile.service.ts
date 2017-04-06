import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class UserProfileService {

  constructor(private http: Http) { }

  updateUserProfile(name: string, email: string, optIn: boolean, optOut: boolean): any {
   // debugger
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var url = "/UserProfile/Profile";
    var body = { "name": name, "email": email, "optIn": optIn, "optOut": optOut };
    var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);
    headers.append("Cache-Control", "no-cache");
    headers.append("Cache-Control", "no-store");
    
    return this.http.post(url, body, { headers: headers })    
      .map((response: Response) =>      
        response.json())        
      .catch(this.handleError);

  }

  changeUserPassword(newPassword: string, confirmPassword: string): any {     
    var url = "/UserProfile/Password/";
    var body = { "key": newPassword};
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  textMessageOption(sid: string, mobileNumber: string, agreeTermsAndCondition: boolean): any {
    var url = "";
    var body = { "sid": sid, "mobileNumber": mobileNumber, "agreeTermsAndCondition": agreeTermsAndCondition };
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
