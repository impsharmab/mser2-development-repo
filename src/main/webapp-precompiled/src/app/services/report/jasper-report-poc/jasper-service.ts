import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../../rxjs-operators';

@Injectable()
export class JasperService {


    constructor(private http: Http) {
    }

    getJaperContent(): any {
        var url = "http://826912-jasperde.imperialm.com:8080/jasperserver-pro/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Forganizations%2FImperial%2Forganizations%2FMSER%2FReports&reportUnit=%2Forganizations%2FImperial%2Forganizations%2FMSER%2FReports%2FNatLevelView_Report&standAlone=true&j_username=superuser&j_password=superuser&decorate=no";

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
