import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { PasswordResetService } from '../../../services/login-service/password-reset/password-reset.service';

import { PasswordResetInterface } from './passwordreset.interface';

@Component({
    selector: 'password-reset',
    templateUrl: './password-reset.html'

})

export class PasswordResetComponent implements OnInit {
    public passwordResetInterface: PasswordResetInterface;
    constructor(private passwordResetService: PasswordResetService, private router: Router, private cookieService: CookieService) {

    }
    ngOnInit() {
        this.passwordResetInterface = {
            password: "",
            confirmpassword: ""
        }
    }

    public msg: string = "";
    private passwordResetResponse: any;
    public confirmResetPassword() {
        var password = this.passwordResetInterface.password;
        var confirmpassword = this.passwordResetInterface.confirmpassword;
        if (password.trim() == "" && confirmpassword.trim() == "") {
            this.msg = "Please enter new Password";
            return;
        } else if (password.trim() != "" && confirmpassword.trim() == "") {
            this.msg = "Confirm Password should not be empty";
            return;
        } else if (password.trim() == "" && confirmpassword.trim() != "") {
            this.msg = "Please enter new Password";
            return;
        } else if (password !== confirmpassword) {
            this.msg = "Confirmation Password you entered does not match";
            return;
        }

        this.passwordResetService.getPasswordResetResponse(this.passwordResetInterface.password).subscribe(
            (passwordResetResponse) => {
                this.passwordResetResponse = (passwordResetResponse)
                if (this.passwordResetResponse == true) {
                    this.msg = "Successfully changed the password"
                    let url = ["/login"]
                    this.router.navigate(url);
                }
            },
            (error) => {
                this.msg = "Internal Server Error";
            }
        )
    }

    public ngModelChangePW() {
        this.msg = "";
    }

    logout() {
        sessionStorage.removeItem('CurrentUser');
        sessionStorage.removeItem('selectedCodeData');
        sessionStorage.clear();
        this.cookieService.removeAll();
        let url = ["/login"]
        this.router.navigate(url);
    }
}