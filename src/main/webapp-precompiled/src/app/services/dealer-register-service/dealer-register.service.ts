import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class DealerRegisterService {
  private baseUrl = "https://test.myfcarewards.com/mser/";
  // private baseUrl = "./";

  constructor(private http: Http) {

  }

  submitDealerAndPositionCode(dealerCode, sid) {
    var url = this.baseUrl + "enrollments/forms/mser/check";
    var body = { dealerCode: dealerCode, sid: sid }
    // var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;   
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //  headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleCustomError);
  }

  saveDealerEnrollmentForm(
    dealerCode, sid, dealerPrincipalEmail, phone, extention,
    selectedPartsManager, partsManagerEmail, selectedServiceManager, serviceManagerEmail,
    isPartsCounter, isUsedRecon, isExpressLane, mvpApprove
  ) {
    var url = this.baseUrl + "enrollments/forms/mser";
    var body = {
      dealerCode: dealerCode, sid: sid, email: dealerPrincipalEmail, phone: phone, extension: extention,
      managerP: selectedPartsManager, managerPEmail: partsManagerEmail,
      managerS: selectedServiceManager, managerSEmail: serviceManagerEmail,
      enrollPartsCounter: isPartsCounter, enrollUsedRecon: isUsedRecon, enrollExpressLane: isExpressLane,
      mvpAuto: mvpApprove
    }
    // var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;   
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //  headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleCustomError);
  }

  registerDealership(dealerSID: string, dealerCode: string, dealerPrincipalEmail: string): any {
    var registerDealershipUrl = this.baseUrl + "Registration/dealerRegistration";
    var body = { "sid": dealerSID, "dealerCode": dealerCode, "email": dealerPrincipalEmail };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(registerDealershipUrl, body, { headers: headers })
      .map((response: Response) => response.text());
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

  private handleCustomError(error: Response | any) {
    let errMsg: string = "";
    if (error instanceof Response) {
      errMsg = `${error.text() || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);

  }
}
