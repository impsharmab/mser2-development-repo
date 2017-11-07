import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Observable } from 'rxjs/Observable'
import './../../rxjs-operators';

import * as serviceUrl from '../../../global-variable/service-url';

@Injectable()
export class PasswordResetService {

    private userdata = {};

    constructor(private http: Http, private cookieService: CookieService) { }


    getPasswordResetResponse(password): any {
        var url = serviceUrl.baseUrl + "UserProfile/Password"; 
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        var body = { "item": password };

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
