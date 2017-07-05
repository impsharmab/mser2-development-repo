import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

//import { SafeHtml } from './safeHtml.pipe';

import { CMSService } from '../../services/cms-service/cms-service';


@Component({
    selector: 'mser-cms',
    templateUrl: './cms.html',
    //styleUrls: ['./opcode-setup.component.css'],
    // providers:[OpcodesetupService]
})

export class CMSComponent implements OnInit {
    @ViewChild('div') private div: ElementRef;
    private firstRouterParameter: string = "";
    private secondRouterParameter: string = "";
    private cmsContentObject: any = "";

    constructor(private cmsService: CMSService, private route: ActivatedRoute,
        private router: Router, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.getRouterParameter();

    }

    private getRouterParameter() {
        this.route.params.subscribe(params => {
            this.firstRouterParameter = (params['cmsPage']);
            this.secondRouterParameter = (params['pdf']);
            if (this.secondRouterParameter == "false") {
                this.openCMSPage(this.firstRouterParameter);
            } else {
                this.openCMSPDF(this.firstRouterParameter);
            }
        },
            (error) => {
                alert("could not pass router parameter")
            }
        )
    }

    private openCMSPage(pageName) {
        this.cmsService.getCmsContent(pageName).subscribe(
            (cmsContentObject) => {
                this.cmsContentObject = this.sanitizer.bypassSecurityTrustHtml(cmsContentObject)
            },
            (error) => {
                alert("could not able to open cms content")
            }
        )
    }
    private openCMSPDF(pageName) {
        this.cmsService.getCmsPDF(pageName).subscribe(
            (cmsContentObject) => {
                this.cmsContentObject = (cmsContentObject)
            },
            (error) => {
                alert("could not able to open cms pdf")
            }
        )
    }

    private render(cmsContentObject) {
        this.div.nativeElement.innerHTML = cmsContentObject;
    }
}