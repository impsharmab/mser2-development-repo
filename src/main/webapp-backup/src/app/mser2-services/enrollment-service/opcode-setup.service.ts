import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class OpcodeSetupService {

  constructor(private http: Http) { }

  findOpCode(opCode): any {
    var url = "";
    var body = { "opCode": opCode };
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
