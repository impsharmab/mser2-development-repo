import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import './../../rxjs-operators';

@Injectable()
export class DealerTeamService {
    private baseUrl = "https://test.myfcarewards.com/mser/";
    //private baseUrl = "./";

    constructor(private http: Http) { }

    getDealerTeamData(dealercode: string): any {
        var url = this.baseUrl + "enrollments/groupteams/getteams/" + dealercode;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        // headers.append("Cache-Control", "no-cache");
        // headers.append("Cache-Control", "no-store");

        return this.http.get(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }
    editDealerTeamData(name: string, id: number, groupTeamId: number, date: string, user: string, dealercode: string): any {
        var url = this.baseUrl + "enrollments/groupteams/updateteam";
        // var url = "./assets/json/dealerteam.json"
        var body = {
            "GroupTeamID": groupTeamId, "ProgramGroupID": 1, "DealerCode": dealercode, "TeamID": id, "TeamName": name,
            "CreatedDate": date, "CreatedBy": user, "UpdatedDate": date, "UpdatedBy": user, "DelFlag": "N"
        };
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        // headers.append("Cache-Control", "no-cache");
        // headers.append("Cache-Control", "no-store");

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    deleteDealerTeamData(id: string): any {
        var url = this.baseUrl + "enrollments/groupteams/deleteteam/" + id;
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);
        // headers.append("Cache-Control", "no-cache");
        // headers.append("Cache-Control", "no-store");

        return this.http.delete(url, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    addNewDealerTeam(name: string, id: number, date: string, user: string, dealercode: string): any {
        var url = this.baseUrl + "enrollments/groupteams/addteam";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var body = {
            "GroupTeamID": 0, "ProgramGroupID": 1, "DealerCode": dealercode, "TeamID": id, "TeamName": name,
            "CreatedDate": date, "CreatedBy": user, "UpdatedDate": date, "UpdatedBy": user, "DelFlag": "N"
        };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    getPowerPointLists(): any {
        var url = this.baseUrl + "UserProfile/Password";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var body = {};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    textMessageOption(mobileNumber: string, aggree: string): any {
        var url = this.baseUrl + "UserProfile/TextAlerts";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var body = { "item1": mobileNumber, "item2": aggree };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', validToken);

        return this.http.post(url, body, { headers: headers })
            .map((response: Response) =>
                response.json())
            .catch(this.handleError);

    }

    getUserProfileData() {
        var getUserProfileDataServiceUrl: string = this.baseUrl + "UserProfile/Profile";
        var validToken: any = JSON.parse(sessionStorage.getItem("CurrentUser")).token;
        var headers = new Headers();
        headers.append('Authorization', validToken);

        return this.http.get(getUserProfileDataServiceUrl, { headers })
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