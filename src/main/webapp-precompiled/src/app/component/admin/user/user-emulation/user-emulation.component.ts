import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';
import { LoginService } from '../../../../services/login-service/login.service';

declare var $: any;

@Component({
    selector: 'user-emulation',
    templateUrl: './user-emulation.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class UserEmulationComponent implements OnInit {
    public emulateusermessage: string = "";
    private emulateUserData: any;
    public emulateUserID: string = "";
    constructor(
        private cookieService: CookieService,
        private adminService: AdminService,
        private router: Router,
        private loginService: LoginService
    ) {

    }

    ngOnInit() {
        this.resizeMe();
    }

    public resizeMe() {
        var blah = window.innerHeight;
        console.log("window is: ", blah + "px high");
        /* 302 is the combined height of the header and footer */
        blah = blah - 302;
        $("main, mser-cms").css("min-height", "calc(" + blah + "px - 2rem)");
        console.log("main is now: ", blah + "px high");
    }
    public emulateAllUser(emulateID) {
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

    public emulateSidTidUser(emulateID) {
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
                this.emulateusermessage = "There is no user with this ID";
            }
        )
    }

    public emulateDealerCodeUser(dealerCode) {
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
                this.emulateusermessage = "There is no Dealer with this Dealer Code";
            }
        )
    }

}
