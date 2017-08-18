import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { JasperService } from '../../../services/report/jasper-report-poc/jasper-service';


@Component({
    selector: 'jasper-poc',
    templateUrl: './japer.html'
    //styleUrls: ['./marketing-home.component.css'] 
})
export class JasperPocComponent implements OnInit {

    constructor(private jasperService: JasperService) { }

    ngOnInit() {
      //  this.getJasperReportData();
    }


    private getSelectedDealerCode() {

    }

    private jasperObject: any = {}
    private getJasperReportData() {

        this.jasperService.getJaperContent().subscribe(
            (jasperObject) => {
                this.jasperObject = (jasperObject)
                console.log(jasperObject);
            },
            (error) => {
            }
        )
    }



}
