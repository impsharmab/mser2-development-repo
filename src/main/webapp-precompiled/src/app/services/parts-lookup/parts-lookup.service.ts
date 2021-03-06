import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../rxjs-operators';

import * as serviceUrl from '../../global-variable/service-url';

@Injectable()
export class PartsLookupService {

    constructor(private http: Http) {
    }

    getCategoriesList(): any {
        var url = serviceUrl.baseUrl + "Partslookup/NewCategory/";

        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);


    }
    getPartsByCategory(category): any {
        var url = serviceUrl.baseUrl + "Partslookup/CatagoryCode/" + category;

        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);


    }
    getPartsInfo(part): any {
        var url = serviceUrl.baseUrl + "Partslookup/PartNumber/" + part;

        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.get(url, { headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);


    }
    getPartsInfoAndCatogory(partNumber, incentiveSubCode): any {
        var url = serviceUrl.baseUrl + "Partslookup/PartNumber/" + partNumber + "/" + incentiveSubCode;

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
