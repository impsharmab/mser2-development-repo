import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class RewardsDistributionService {
  private baseUrl = "https://test.myfcarewards.com/mser/";
  // private baseUrl = "./";

  constructor(private http: Http) { }


  getRewardsDistributionAmount(dealerCode): any {
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
  getMVPDistributionData(dealerCode): any {
    var url = this.baseUrl + "Rewards/MVPApproval/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }

  getParticipantsByDealer(dealerCode, program) {
    var url = this.baseUrl + "General/ParticipantsByDealer/" + program + "/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }
  saveMVPDistributionDATA(dealerCode, data){
    var url = this.baseUrl + "Rewards/MVPApproval/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body=data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);
  }
  getDistributionHistoryData(dealerCode, programName): any {
    var url = this.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
        .map((response: Response) =>
            response.json())
        .catch(this.handleError);
}

  // savePCDistributionData(dealerCode, list) {
  //   var url = this.baseUrl + "Rewards/PartsCounter/" + dealerCode;
  //   var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
  //   var body = list;
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', validToken);

  //   return this.http.post(url, body, { headers: headers })
  //     .map((response: Response) =>
  //       response.json())
  //     .catch(this.handleCustomError);
  // }

  // saveELDistributionData(dealerCode, list) {
  //   var url = this.baseUrl + "Rewards/ExpressLane/" + dealerCode;
  //   var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
  //   var body = list;
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', validToken);

  //   return this.http.post(url, body, { headers: headers })
  //     .map((response: Response) =>
  //       response.json())
  //     .catch(this.handleCustomError);
  // }

  // saveURDistributionData(dealerCode, list) {
  //   var url = this.baseUrl + "Rewards/UsedRecon/" + dealerCode;
  //   var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
  //   var body = list;
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', validToken);

  //   return this.http.post(url, body, { headers: headers })
  //     .map((response: Response) =>
  //       response.json())
  //     .catch(this.handleCustomError);
  // }

  saveDistributionData(dealerCode, list, programName) {
    var url = this.baseUrl + "Rewards/Distribution/" + programName + "/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var body = list;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleCustomError);
  }

  getDistributionAllocationHistory(dealerCode, programName) {
    var url = this.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
   
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleCustomError);
  }


  private handleCustomError(error: Response | any) {
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
