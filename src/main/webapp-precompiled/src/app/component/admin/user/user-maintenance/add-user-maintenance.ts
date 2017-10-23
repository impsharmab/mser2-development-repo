import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';

@Component({
    selector: 'add-user-maintenance',
    templateUrl: './add-user-maintenance.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class AddUserMaintenanceComponent implements OnInit {

    constructor(private router: Router) {

    }
    ngOnInit() {

    }

    public searchUser() {
        let url = ["mserHomepage/userlookup"];
        this.router.navigate(url);
    }




}
