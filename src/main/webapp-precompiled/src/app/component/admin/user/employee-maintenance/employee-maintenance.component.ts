import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../../services/admin-service/admin-user/user-emulation.service';

@Component({
    selector: 'user-emulation',
    templateUrl: './employee-lookup.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class EmployeeMaintenanceComponent implements OnInit {

    constructor(private router: Router) {

    }
    ngOnInit() {

    }
    private addEmployee() {        
        let url = ["mserHomepage/addemployeemaintenance"];
        this.router.navigate(url);
    }

}