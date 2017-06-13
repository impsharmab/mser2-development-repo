import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class OpcodeSetupService {

  constructor(private http: Http) { }

   getOpcodesetupResponse(dealerCode: string): any {
    var url = "https://test.myfcarewards.com/imimserservices/enrollments/getopcode/" + dealerCode;
   // var url = "./enrollments/getopcode/" + dealerCode;

    // var url = 'http://localhost:4200/src/app/mser2-services/enrollment-service/opcode-response.json';

    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);
    return this.http.get(url, { headers })
      .map((response: Response) =>
        response.json())
      .catch(this.handleError);

  }

   addOpCode(id: number,
    dealercode: string,
    opcode: string,
    source: string,
    createdDate: string,
    createdBy: string): any {
    debugger;

    var url = 'https://test.myfcarewards.com/imimserservices/enrollments/addopcode';
    // var url='./opcode-response.json';      

    var body = {
      "iD": id,
      "dealerCode": dealercode,
      "opCode": opcode,
      "source": source,
      "createdDate": createdDate,
      "createdBy": createdBy
    };
    var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', validToken);
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'POST');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    // return this.http.get(url)
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