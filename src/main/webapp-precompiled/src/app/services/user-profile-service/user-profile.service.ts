import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class UserProfileService {
  private userProfileData: any = {};
  constructor(private http: Http) { }

  setUserProfileData(userProfileData) {
    this.userProfileData = userProfileData;
    sessionStorage.setItem("UserProfileData", "");
    sessionStorage.removeItem('UserProfileData');
    sessionStorage.setItem("UserProfileData", JSON.stringify(userProfileData));
  }
  updateUserProfile(name: string, email: string, sendMail?: string): any {    
    var url = "https://test.myfcarewards.com/mser2/UserProfile/Profile";
    //var url="./UserProfile/Profile"
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = { "name": name, "email": email, "sendMail": sendMail };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);
    // headers.append("Cache-Control", "no-cache");
    // headers.append("Cache-Control", "no-store");

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  changeUserPassword(newPassword: string): any {
     var url = "https://test.myfcarewards.com/mser2/UserProfile/Password";
   // var url = "./UserProfile/Password";
    
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = { "item": newPassword };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);
    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  textMessageOption(mobileNumber: string, aggree:string): any {    
    //var url = "https://test.myfcarewards.com/mser2/UserProfile/TextAlerts";
    var url = "./UserProfile/TextAlerts";
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = { "item1": mobileNumber, "item2": aggree };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);

  }

  getUserProfileData() {  
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var getUserProfileDataServiceUrl: string = "https://test.myfcarewards.com/mser2/UserProfile/Profile";
  
    var headers = new Headers();
    headers.append('Authorization', validToken);
    // headers.append("Cache-Control", "no-cache");
    // headers.append("Cache-Control", "no-store");
    return this.http.get(getUserProfileDataServiceUrl, { headers })
      .map((response: Response) => response.json())
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
