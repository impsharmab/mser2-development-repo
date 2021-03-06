import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: '',
    templateUrl: './rootpage.component.html',

})
export class RootPageComponent implements OnInit {

    constructor(
        private router: Router,
        private http: Http,
        private ngZone: NgZone,
        private chRef: ChangeDetectorRef) {
        window.onresize = (e) => {
            ngZone.run(() => {
                this.resizeMe();
            });
        };
    }

    public resizeMe() {
        var blah = window.innerHeight;
        // console.log("window is: ", blah + "px high");
        /* 375 is the combined height of the header and footer */
        blah = blah - 375;
        $("main").css({
            "min-height": blah + "px",
            "padding-bottom": "2rem"
        });
    }
    ngOnInit() {
        this.chRef.detectChanges();
        this.resizeMe();
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
        //    this.router.navigate(["mserHomepage/home"]);
    }
}
