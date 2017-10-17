import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import * as serviceUrl from '../../global-variable/service-url';

import './../rxjs-operators';

@Injectable()
export class CMSService {

    constructor(private http: Http) {
    }

    getCmsContent(page: string): any {
        var getCmsContentUrl = serviceUrl.baseUrl + "content/" + page;
        // var getCmsContentUrl = "https://test.myfcarewards.com/mser/" + "content/" + page;

        return this.http.get(getCmsContentUrl)
            .map((response: Response) => response.text())
            .catch(this.handleError);

    }

    getCmsPDF(page: string): any {
        var getCmsContentUrl = serviceUrl.baseUrl + "shared/imi-cms/MSER/webDocs/" + page;
        // var getCmsContentUrl = " https://test.myfcarewards.com/mser/" + "shared/imi-cms/MSER/webDocs/" + page;

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
