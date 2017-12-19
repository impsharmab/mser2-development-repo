import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

import * as serviceUrl from '../../global-variable/service-url';

@Injectable()
export class ReportService {

    constructor(private http: Http) {
    }

    getDistrictByBC(bc): any {
        // var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        var url = serviceUrl.baseUrl + "services/admin/districts/" + bc;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getDealerCodesBelongsToBCAndDIST(bcOrDist) {
        var url = serviceUrl.baseUrl + "General/Report/Dealers/" + bcOrDist;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getDealerCodeValidation(territory, dealer) {
        var dc = "";
        if (dealer == "") {
            dc = "0";
        } else {
            dc = dealer;
        }
        var url = serviceUrl.baseUrl + "General/Report/CheckDealer/" + territory + "/" + dc;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getRejectedInvoiceData(dc, fromDate, toDate) {
        var url = serviceUrl.baseUrl + "service/RejectedInvoices/Get/" + dc;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        var body = {
            "item1": fromDate, "item2": toDate
        }
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    saveRejectedInvoiceData(dc, rejectedInvoiceSavingData) {
        var url = serviceUrl.baseUrl + "service/RejectedInvoices/Set/" + dc;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        var body = rejectedInvoiceSavingData;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleCustomError);
    }
    getSIDValidation(territory, sid) {
        var SID = "";
        if (sid == "") {
            SID = "0";
        } else {
            SID = sid.toUpperCase();
        }
        var url = serviceUrl.baseUrl + "General/Report/CheckParticipants/" + territory + "/" + SID;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getReportPrograms(programName) {
        var url = serviceUrl.baseUrl + "General/Report/" + programName;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getPeriod() {
        var url = serviceUrl.baseUrl + "General/Report/SWReport/Period";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getParticipantsByDealer(sid) {
        var SID = sid.toUpperCase();
        var url = serviceUrl.baseUrl + "General/Report/Participants/" + sid;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        return this.http.get(url, { headers: headers })
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
