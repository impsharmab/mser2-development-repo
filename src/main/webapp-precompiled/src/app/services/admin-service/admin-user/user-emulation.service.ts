import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../../rxjs-operators';

import * as serviceUrl from '../../../global-variable/service-url';

@Injectable()
export class AdminService {
    constructor(private http: Http) { }


    getEmulateUserData(sid: string) {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "services/admin/emulate/" + sid;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    emulateUserWithDealerCode(dealercode: string) {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "services/admin/dealerEmulation/" + dealercode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
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
