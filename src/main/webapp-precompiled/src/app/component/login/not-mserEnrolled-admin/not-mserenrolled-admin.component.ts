import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
    selector: 'not-mser-admin',
    templateUrl: './not-mser-admin.html'
})

export class NotMSEREnrolledAdminComponent implements OnInit {
    constructor(private router: Router, private cookieService: CookieService) {

    }

    ngOnInit() {

    }
}
