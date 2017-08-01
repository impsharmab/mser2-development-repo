import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class EnrollmentMaintenanceService {
  private baseUrl = "https://test.myfcarewards.com/mser/";
  //private baseUrl = "./";

  constructor(private http: Http) { }

  getEnrollmentData(dealerCode) {
    var url = 'https://test.myfcarewards.com/mser/enrollments/getDealerEnrollements/' + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }
  getPositionCodes() {
    var url = 'https://test.myfcarewards.com/mser/General/PositionCodeList';
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  saveEnrollmentMaintenanceData(enrollmentDataResponse): any {
    var url = this.baseUrl + "enrollments/DealerEnrollements/SET/";
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    var body = {
      "dealerCode": enrollmentDataResponse.dealerCode, "myPersonalDMSID": enrollmentDataResponse.myPersonalDMSID,
      "name": enrollmentDataResponse.name, "email": enrollmentDataResponse.email, "positionCodes": enrollmentDataResponse.positionCodes,
      "overriddenpositionCodes": enrollmentDataResponse.overriddenpositionCodes, "mser": enrollmentDataResponse.mser,
      "mas": enrollmentDataResponse.mas, "mm": enrollmentDataResponse.mm, "mvp": enrollmentDataResponse.mvp,
      "wiMvp": enrollmentDataResponse.wiMvp, "wiTires": enrollmentDataResponse.wiTires,
      "pc": enrollmentDataResponse.pc, "el": enrollmentDataResponse.el, "usedRecon": enrollmentDataResponse.usedRecon,
      "usedReconP": enrollmentDataResponse.usedReconP, "sid": enrollmentDataResponse.sid, "dmsid": enrollmentDataResponse.dmsid,
      "ucon": enrollmentDataResponse.ucon
    };
    console.log("body" + ": " + body);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers })
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
