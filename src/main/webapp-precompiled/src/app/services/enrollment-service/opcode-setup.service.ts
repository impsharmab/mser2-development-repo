import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class OpcodeSetupService {
 private baseUrl = "https://test.myfcarewards.com/mser/";
  // private baseUrl = "./";

  constructor(private http: Http) { }

  getOpcodesetupResponse(dealerCode: string): any {
    var url = this.baseUrl + "enrollments/getopcode/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);

  }

  getInactiveOpcodesetupResponse(dealerCode: string): any {
    var url = this.baseUrl + "enrollments/getopcode/inactive/" + dealerCode;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);
    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);

  }

  addOpCode(id: number, dealercode: string, opcode: string, source: string, createdDate: string, createdBy: string): any {
    var url = this.baseUrl + 'enrollments/addopcode';
    var body = {
      "iD": id, "dealerCode": dealercode, "opCode": opcode, "source": source, "createdDate": createdDate,
      "createdBy": createdBy, "updatedBy": source, "updatedDate": createdDate
    };
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);

  }
  deactivateOpCode(id: number): any {
    var deleteOpCodeUrl = this.baseUrl + 'enrollments/deleteopcode/' + id;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(deleteOpCodeUrl, { headers })
      .map((response: Response) =>
        response.json())
    // .catch(this.handleError);

  }
  activateOpCode(id: number): any {
    var deleteOpCodeUrl = this.baseUrl + 'enrollments/activateopcode/' + id;
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);

    return this.http.get(deleteOpCodeUrl, { headers })
      .map((response: Response) =>
        response.json())
    // .catch(this.handleError);

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
