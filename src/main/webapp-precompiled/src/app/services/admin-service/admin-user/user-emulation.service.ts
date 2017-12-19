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
            .catch(this.handleCustomError);
    }

    emulateUserWithDealerCode(dealercode: string) {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "services/admin/dealerEmulation/" + dealercode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleCustomError);
    }

    getSearchDealerMaintenanceData(dc: string) {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "services/admin/dealerMaintenance/" + dc;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleCustomError);
    }

    getSearchEmployeeMaintenanceData(sid: string) {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "services/admin/userMaintenance/" + sid;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleCustomError);
    }

    getProgramGroupNameData() {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "General/ProgramGroups";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleCustomError);
    }

    getPositionCodeListData() {
        var getEmulateUserDataUrl = serviceUrl.baseUrl + "General/PositionCodeList";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(getEmulateUserDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleCustomError);
    }

    saveDealerMaintenanceData(dealer: any) {
        var postDealerDataUrl = serviceUrl.baseUrl + "services/admin/saveDealerMaintenance";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.post(postDealerDataUrl, dealer, { headers: headers })
            .map((response: Response) =>
              response.json())
            .catch(this.handleError);
    }

    saveUserMaintenanceByEnrollment(employee: any) {
        var postDealerDataUrl = serviceUrl.baseUrl + "services/admin/saveUserMaintenanceByEnrollment";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.post(postDealerDataUrl, employee, { headers: headers })
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
    private handleCustomError(error: Response | any) {
        let errMsg: string = "";
        if (error instanceof Response) {
            errMsg = `${error.text() || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);

    }
}
