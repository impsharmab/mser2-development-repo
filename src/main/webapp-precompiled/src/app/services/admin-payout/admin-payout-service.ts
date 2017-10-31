import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

import * as serviceUrl from '../../global-variable/service-url';

@Injectable()
export class AdminPayoutService {
    constructor(private http: Http) { }


    getProgramsByMonth(month: string) {
        var getProgramsByMonthUrl = serviceUrl.baseUrl + "services/adminpayout/getPrograms/" + month;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getProgramsByMonthUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getCategoriesByIncentive(selectedIncentives: string[], month: string) {
        var getCategoryByIncentiveUrl = serviceUrl.baseUrl + "services/adminpayout/getCategoryByIncentive/" + month;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.post(getCategoryByIncentiveUrl, selectedIncentives, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }

    getEligiblePositions(selectedIncentiveSubCodesProgramGroups: string[]) {
        var getEligiblePositionsUrl = serviceUrl.baseUrl + "services/adminpayout/getEligiblePositions";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.post(getEligiblePositionsUrl, selectedIncentiveSubCodesProgramGroups, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getQuantities() {
        var getQuantitiesUrl = serviceUrl.baseUrl + "services/adminpayout/getQuantities";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getQuantitiesUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }

    getRewardTypes() {
        var getRewardTypesUrl = serviceUrl.baseUrl + "services/adminpayout/getRewardTypes";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getRewardTypesUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }

    postRewardData(postData: any) {
        var postRewardDataUrl = serviceUrl.baseUrl + "services/adminpayout/saveNewAdminPayout";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.post(postRewardDataUrl, postData, { headers })
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