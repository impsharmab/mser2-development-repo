import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'not-mserenrolled',
    templateUrl: './not-mserenrolled.html'
})

export class NotMSEREnrolledComponent implements OnInit {
    constructor(private router: Router, private cookieService: CookieService) {

    }

    ngOnInit() {

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
