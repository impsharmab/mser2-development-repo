import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: '',
    templateUrl: './rootpage.component.html',

})
export class RootPageComponent implements OnInit {
        
    constructor(private router: Router, private http: Http) {
    }
    ngOnInit() {        
    }
}