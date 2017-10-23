import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';


@Component({
    selector: 'part-category-lookup',
    templateUrl: './part-category-lookup.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class PartCategoryLookupComponent implements OnInit {

    constructor(private router: Router) {

    }
    ngOnInit() {

    }
    public addEmployee() {        
        let url = ["mserHomepage/addemployeemaintenance"];
        this.router.navigate(url);
    }

}
