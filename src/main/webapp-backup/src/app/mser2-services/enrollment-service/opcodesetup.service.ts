import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import '../rxjs-operators';


@Injectable()
export class OpcodesetupService {

  constructor(private http: Http) { }

  getOpcodesetupResponse(): any {
    
    var url = "./enrollments/getopcode";  
    var url='http://localhost:4200/src/app/mser2-services/enrollment-service/opcode-response.json';      
    return this.http.get(url)
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
