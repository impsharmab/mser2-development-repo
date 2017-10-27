import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../../rxjs-operators';

import * as serviceUrl from '../../../global-variable/service-url';

@Injectable()
export class MVPAutoApprovalSettingService {

    constructor(private http: Http) {
    }

    getAutoApprovalCount(): any {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode
        var url = serviceUrl.baseUrl + "Rewards/MVP/getAutoApprovalCount/" + dealerCode;

        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);


    }

    getMVPApprovalData(): any {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode
        var url = serviceUrl.baseUrl + "Rewards/MVP/getAutoApproval/" + dealerCode + "/";

        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);


    }

    getMVPAutoApprovalData(auto): any {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode
        var url = serviceUrl.baseUrl + "Rewards/MVP/Auto/" + dealerCode + "/" + auto;

        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers })
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
