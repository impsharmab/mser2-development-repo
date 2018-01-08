import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';
import { LoginService } from '../../../../services/login-service/login.service';
import { ReportService } from './../../../../services/report/report-service';

declare var $: any;

@Component({
    selector: 'user-emulation',
    templateUrl: './user-emulation.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class UserEmulationComponent implements OnInit {
    emulateusermessage: string = "";
    private emulateUserData: any;
    emulateUserID: string = "";
    constructor(
        private cookieService: CookieService,
        private adminService: AdminService,
        private router: Router,
        private loginService: LoginService,
        private reportService: ReportService
    ) {

    }

    ngOnInit() {
        this.resizeMe();
    }

    resizeMe() {
        var blah = window.innerHeight;
        console.log("window is: ", blah + "px high");
        /* 302 is the combined height of the header and footer */
        blah = blah - 302;
        $("main, mser-cms").css("min-height", "calc(" + blah + "px - 2rem)");
        console.log("main is now: ", blah + "px high");
    }
    emulateAllUser(id) {
        var emulateID = id.trim();
        if (emulateID != undefined && emulateID.trim() == "") {
            this.emulateusermessage = "Please enter valid SID/TID/Dealer Code";
            return;
        } else if (emulateID != undefined && (emulateID.trim().length < 5 || emulateID.trim().length == 6)) {
            this.emulateusermessage = "Please enter valid SID/TID/Dealer Code";
            return;
        }

        if (emulateID != undefined && emulateID.length == 5) {
            //sessionStorage.appReloaded = false;
            // this.validateDealerCode(emulateID);
            this.emulateDealerCodeUser(emulateID);
            this.cookieService.put("dealerCode", emulateID);
        } else {
            //sessionStorage.appReloaded = false;
            // this.validateSID(emulateID);
            this.emulateSidTidUser(emulateID);
            this.cookieService.put("SID/TID", emulateID);

        }
    }

    isValidSID: boolean = false;
    validateSID(emulateID) {
        var territory = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.reportService.getSIDValidation(territory, emulateID).subscribe(
            (isValidSID) => {
                this.isValidSID = isValidSID
                if (this.isValidSID) {
                    this.emulateSidTidUser(emulateID);
                } else {
                    this.emulateusermessage = "The information entered is invalid. Please change your criteria and try again";
                }

            },
            (error) => {

            })
    }

    isValidDealerCode: string = "";
    validateDealerCode(emulateID) {
        var territory = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.reportService.getDealerCodeValidation(territory, emulateID).subscribe(
            (isValidDealerCode) => {
                this.isValidDealerCode = isValidDealerCode
                if (this.isValidDealerCode) {
                    this.emulateDealerCodeUser(emulateID);
                } else {
                    this.emulateusermessage = "The information entered is invalid. Please change your criteria and try again"
                }

            },
            (error) => {

            })
    }

    emulateSidTidUser(emulateID) {
        this.adminService.getEmulateUserData(emulateID).subscribe(
            (emulateUserData) => {
                this.emulateUserData = emulateUserData;
                if (emulateUserData["item"].length > 0) {
                    var adminToken = this.cookieService.get("token");
                    this.cookieService.put("isDealerEmulation", "false");
                    this.cookieService.put("adminToken", adminToken);
                    this.cookieService.put("token", emulateUserData.item);
                    let url = ["login"]
                    // sessionStorage.appReloaded = false;
                    // this.router.navigate(url);
                    // window.location.href = location.protocol + "//" + location.hostname +
                    //     (location.port && ":" + location.port) + "/"
                    window.location.href =
                        window.location.origin
                            ? window.location.origin + '/'
                            : window.location.protocol + '/' + window.location.host + '/';
                }
            }
            ,
            (error) => {
                if (error !== undefined && error.length < 250) {
                    this.emulateusermessage = error;
                } else {
                    this.emulateusermessage = "User does not exist.";
                }
            }
        )
    }

    emulateDealerCodeUser(dealerCode) {
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
                // sessionStorage.appReloaded = false;
                // this.router.navigate(url);
                // window.location.href = location.protocol + "//" + location.hostname +
                //     (location.port && ":" + location.port) + "/"
                window.location.href =
                    window.location.origin
                        ? window.location.origin + '/'
                        : window.location.protocol + '/' + window.location.host + '/';
            }
            ,
            (error) => {
                if (error !== undefined && error.length < 250) {
                    this.emulateusermessage = error;
                } else {
                    // this.emulateusermessage = "User doesnot exists.";
                }
            }
        )
    }

}
