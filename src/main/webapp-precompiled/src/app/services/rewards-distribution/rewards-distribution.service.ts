import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class RewardsDistributionService {
  private baseUrl = "https://test.myfcarewards.com/mser/";
  // private baseUrl = "./";

  constructor(private http: Http) { }


  getRewardsAmount(dealerCode): any {
    var url = this.baseUrl + "Rewards/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  getManagersByDealer(dealerCode) {
    var url = this.baseUrl + "General/ManagersByDealer/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  getParticipantsByDealer(dealerCode) {
    var url = this.baseUrl + "General/ParticipantsByDealer/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  savePCData(dealerCode, list) {
    var url = this.baseUrl + "Rewards/PartsCounter/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = list;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

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
