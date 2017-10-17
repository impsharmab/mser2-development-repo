import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import * as serviceUrl from '../../global-variable/service-url';

import './../rxjs-operators';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  getMSEREnrollmentTileData(): any {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var positionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    if (dealerCode == undefined) {
      dealerCode = 0;
    }
    if (positionCode == undefined) {
      positionCode = 0;
    }
    var url = serviceUrl.baseUrl + "services/tile/en/" + positionCode + "/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = {};
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  getMSEREarningTileData(): any {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var positionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    if (dealerCode == undefined) {
      dealerCode = 0;
    }
    if (positionCode == undefined) {
      positionCode = 0;
    }
    var url = serviceUrl.baseUrl + "services/tile/re/" + positionCode + "/" + dealerCode;

    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = {};
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
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
