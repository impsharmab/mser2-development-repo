import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class DealercodePositioncodeService {

  private selectedCodeData: any;
  constructor(private http: Http) { }

  setCodeData(codeData: any) {
    //debugger
    this.selectedCodeData = sessionStorage.setItem("selectedCodeData", JSON.stringify(codeData))
  }
  getCodeData() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData"));
  }

}
