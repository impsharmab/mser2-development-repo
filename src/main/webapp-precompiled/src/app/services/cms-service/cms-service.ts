import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class CMSService {
     private baseUrl = "https://test.myfcarewards.com/mser/";
   // private baseUrl = "./";

    constructor(private http: Http) {
    }

    getCmsContent(page: string): any {
        var getCmsContentUrl = this.baseUrl + "content/" + page;

        return this.http.get(getCmsContentUrl)
            .map((response: Response) => response.text())
            .catch(this.handleError);

    }

    getCmsPDF(page: string): any {
        var getCmsContentUrl = this.baseUrl + "shared/imi-cms/MSER/webDocs/" + page;

        return this.http.get(getCmsContentUrl)
            .map((response: Response) => response.text())
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
