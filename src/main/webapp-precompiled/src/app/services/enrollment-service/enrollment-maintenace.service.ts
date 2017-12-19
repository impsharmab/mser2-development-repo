import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import * as serviceUrl from '../../global-variable/service-url';

import './../rxjs-operators';

@Injectable()
export class EnrollmentMaintenanceService {

  constructor(private http: Http) { }

  getEnrollmentData(dealerCode) {
    var url = serviceUrl.baseUrl + 'enrollments/getDealerEnrollements/' + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }
  getNotEnrolledData(dealerCode) {
    var url = serviceUrl.baseUrl + 'enrollments/getDealerNonEnrolledParticipants/' + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }
  getElligiblePositionCodes() {
    var url = serviceUrl.baseUrl + 'General/PositionCodeListForEnrollments';
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  getAllPositionCodes() {
    var url = serviceUrl.baseUrl + 'General/PositionCodeList';
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  saveEnrollmentMaintenanceData(enrollmentDataResponse, myPersonalPositionCode, overriddenpositionCodes, mserData, masData, mmData,
    mvpData, fiatData, tiresData, wiAdvMVPData, wiAdvTireData, uconSalesData, uconServiceData, pcData, elData, usedReconManagerData,
    usedReconParticipantData): any {
    var url = serviceUrl.baseUrl + "enrollments/DealerEnrollements/SET/";
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    var body = {
      "dealerCode": enrollmentDataResponse.dealerCode, "myPersonalDMSID": enrollmentDataResponse.myPersonalDMSID,
      "name": enrollmentDataResponse.name, "email": enrollmentDataResponse.email, "positionCodes": myPersonalPositionCode,
      "overriddenpositionCodes": overriddenpositionCodes, "mser": mserData, "mas": masData, "mm": mmData, "mvp": mvpData,
      "fiat": fiatData, "tires": tiresData, "wiMvp": wiAdvMVPData, "wiTires": wiAdvTireData, "pc": pcData, "el": elData,
      "usedRecon": usedReconManagerData, "usedReconP": usedReconParticipantData, "sid": enrollmentDataResponse.sid,
      "dmsid": enrollmentDataResponse.dmsid, "ucon": uconSalesData
    };
    console.log("body" + ": " + body);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.customHandleError);

  }

  // getExpresslaneDealer(dealerCode) {
  //   var url = 'https://test.myfcarewards.com/mser/enrollments/ELenrolled/' + dealerCode;
  //   var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', validToken);

  //   return this.http.get(url, { headers })
  //     .map((response: Response) =>
  //       response.json())
  //     .catch(this.handleError);
  // }
  private handleError(error: Response | any) {
    let errMsg: string = "";
    // if (error.status === 500) {
    //   alert(error._body);

    // }
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  private customHandleError(error: Response | any) {
    let errMsg: string = "";
    // if (error.status === 500) {
    //   alert(error._body);

    // }
    if (error instanceof Response) {
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      errMsg = `${error.text() || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
