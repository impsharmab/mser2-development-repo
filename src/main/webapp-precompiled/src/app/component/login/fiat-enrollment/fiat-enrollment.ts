import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { SelectItem } from 'primeng/primeng';

import { DealerRegisterService } from '../../../services/dealer-register-service/dealer-register.service';
import { FiatEnrollmentFormInterface } from './fiat-enrollment.interface';
@Component({
    selector: 'dealer-register-component',
    // templateUrl: './new-dealer-register.html',
    templateUrl: './fiat-enrollment.html'
    // styleUrls: ['./dealer-register.component.css']
})
export class FiatEnrollmentComponent implements OnInit {
    private disableFields: boolean = false;
    private date: DateModel;
    private todayDate: string = "";
    private fiatEnrollment: FiatEnrollmentFormInterface = {
        aggrement1: false, aggrement2: false, dealerCode: "", sid: "", dealershipName: "", dealerPrincipalName: "", dealerPrincipalEmail: "", phone: "",
        signature: "", date: "", selectedManager: "", managerEmail: "",
        isPartsCounter: false, isUsedRecon: false, isExpressLane: false
    };
    constructor(private router: Router) { }

    ngOnInit() {
        var d = new Date;
        this.todayDate = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();
    
    }

    private submitDealerCodeAndSID() {
        this.disableFields = true;
    }
    cancel() {
        let url = ["login"]
        this.router.navigate(url);
    }
}
