import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';

@Component({
    selector: 'add-employee-maintenance',
    templateUrl: './add-employee-maintenance.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class AddEmployeeMaintenanceComponent implements OnInit {
    constructor(private router: Router) {

    }

    ngOnInit() {

    }

    searchAgain() {
        let url = ["mserHomepage/employeemaintenance"];
        this.router.navigate(url);
    }


}
