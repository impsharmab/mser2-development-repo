import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class PayoutChartService {
    private baseUrl = "https://test.myfcarewards.com/mser/";
    // private baseUrl = "./";

    constructor(private http: Http) {
    }

    getPayoutCMSPage(pageName): any {
        var url = this.baseUrl + "content/" + pageName;

        return this.http.get(url)
            .map((response: Response) => response.text())
            .catch(this.handleError);

    }

    getPayoutChartData(): any {
        var url = "./payout-chart.json";

        return this.http.get(url)
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
