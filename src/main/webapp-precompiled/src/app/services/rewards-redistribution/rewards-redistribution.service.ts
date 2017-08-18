import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

@Injectable()
export class RewardsReDistributionService {
    private baseUrl = "https://test.myfcarewards.com/mser/";
    // private baseUrl = "./";

    constructor(private http: Http) { }


    getPCRedistributionData(dealerCode, programName): any {
        var url = this.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getELRedistributionData(dealerCode, programName): any {
        var url = this.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getURRedistributionData(dealerCode, programName): any {
        var url = this.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }
    getPayoutRedistributionData(dealerCode, programName): any {
        var url = this.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }



    private handleCustomError(error: Response | any) {
        let errMsg: string = "";
        // if (error.status === 500) {
        //   alert(error._body);
        // }
        if (error instanceof Response) {
            // const body = error.json() || '';
            // const err = body.error || JSON.stringify(body);
            errMsg = `${error.text() || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);

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
