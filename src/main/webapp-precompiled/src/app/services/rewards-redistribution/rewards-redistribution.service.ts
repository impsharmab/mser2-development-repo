import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

import * as serviceUrl from '../../global-variable/service-url';

@Injectable()
export class RewardsReDistributionService {

    constructor(private http: Http) { }

    redistributeAmount(dealerCode, allocationID) {
        var url = serviceUrl.baseUrl + "Rewards/RedistributeReturnToDealer/" + dealerCode + "/" + allocationID;
        var value = '0';
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        //headers.append('Content-Length', '0');
        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getRedistributionData(dealerCode, programName): any {
        var url = serviceUrl.baseUrl + "Rewards/ReHistory/" + programName + "/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }
    // getPCRedistributionData(dealerCode, programName): any {
    //     var url = serviceUrl.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
    //     var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', validToken);

    //     return this.http.get(url, { headers: headers })
    //         .map((response: Response) =>
    //             response.json())
    //         .catch(this.handleError);
    // }

    // getELRedistributionData(dealerCode, programName): any {
    //     var url = serviceUrl.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
    //     var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', validToken);

    //     return this.http.get(url, { headers: headers })
    //         .map((response: Response) =>
    //             response.json())
    //         .catch(this.handleError);
    // }

    // getURRedistributionData(dealerCode, programName): any {
    //     var url = serviceUrl.baseUrl + "Rewards/History/" + programName + "/" + dealerCode;
    //     var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', validToken);

    //     return this.http.get(url, { headers: headers })
    //         .map((response: Response) =>
    //             response.json())
    //         .catch(this.handleError);
    // }

    getPayoutRedistributionData(dealerCode, programName): any {
        var url = serviceUrl.baseUrl + "Rewards/PayoutRedistribution/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    saveRedistributionData(dealerCode, list, allocationID) {
        var url = serviceUrl.baseUrl + "Rewards/Redistribute/" + dealerCode + "/" + allocationID;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var body = list;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleCustomError);
    }

    savePayoutRedistributionData(dealerCode, list) {
        var url = serviceUrl.baseUrl + "Rewards/PayoutRedistribution/" + dealerCode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var body = list;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleCustomError);
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
