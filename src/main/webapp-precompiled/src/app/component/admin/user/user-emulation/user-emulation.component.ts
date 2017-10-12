import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';
import { LoginService } from '../../../../services/login-service/login.service';
@Component({
    selector: 'user-emulation',
    templateUrl: './user-emulation.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class UserEmulationComponent implements OnInit {
    private emulateusermessage: string = "";
    private emulateUserData: any;
    constructor(
        private cookieService: CookieService,
        private adminService: AdminService,
        private router: Router,
        private loginService: LoginService
    ) {

    }

    ngOnInit() {

    }

    private emulateAllUser(emulateID) {
        if (emulateID != undefined && emulateID.trim() == "") {
            this.emulateusermessage = "Please enter valid SID/TID/Dealer Code";
            return;
        } else if (emulateID != undefined && emulateID.trim().length < 5) {
            this.emulateusermessage = "Please enter valid SID/TID/Dealer Code";
            return;
        }
        if (emulateID != undefined && emulateID.length == 5) {
            this.emulateDealerCodeUser(emulateID);
            this.cookieService.put("dealerCode", emulateID);
        } else {
            this.emulateSidTidUser(emulateID);
            this.cookieService.put("SID/TID", emulateID);

        }
    }

    private emulateSidTidUser(emulateID) {
        this.adminService.getEmulateUserData(emulateID).subscribe(
            (emulateUserData) => {
                this.emulateUserData = emulateUserData;
                if (emulateUserData["item"].length > 0) {
                    var adminToken = this.cookieService.get("token");
                    this.cookieService.put("isDealerEmulation", "false");
                    this.cookieService.put("adminToken", adminToken);
                    this.cookieService.put("token", emulateUserData.item);
                    let url = ["login"]
                    this.router.navigate(url);
                }
            }
            ,
            (error) => {
                this.emulateusermessage = "User Emulation Failed, Maybe due to incorrect SID/TID/Dealer Code";
            }
        )
    }

    private emulateDealerCodeUser(dealerCode) {
        this.adminService.emulateUserWithDealerCode(dealerCode).subscribe(
            (emulateUserData) => {
                this.emulateUserData = emulateUserData;
                var adminToken = this.cookieService.get("token");
                this.loginService.setUserData(this.emulateUserData);
                this.cookieService.put("isDealerEmulation", "true");
                this.cookieService.put("adminToken", adminToken);
                this.cookieService.put("dealercode", dealerCode);
                sessionStorage.setItem("hideButton", "true");
                // this.cookieService.put("token", adminToken);
                let url = ["login"]
                this.router.navigate(url);
            }
            ,
            (error) => {
                this.emulateusermessage = "User Emulation Failed, Maybe due to incorrect SID/TID/Dealer Code";
            }
        )
    }

}
