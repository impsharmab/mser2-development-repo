import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { SelectItem } from 'primeng/primeng';

import { DealerRegisterFormInterface } from './dealer-register.interface';
import { DealerEnrollmentFormInterface } from './dealer-enrollment.interface';
import { DealerRegisterService } from '../../../services/dealer-register-service/dealer-register.service';

@Component({
  selector: 'dealer-register-component',
  // templateUrl: './new-dealer-register.html',
  templateUrl: './dealer-register-wizard.html',
  styleUrls: ['./dealer-register.component.css']
})
export class DealerRegisterComponent implements OnInit {
  public registerDealer: DealerRegisterFormInterface;
  selectedValues: string[] = ['val1', 'val2'];
  value: boolean;
  date: DateModel;
  options: DatePickerOptions;
  submitted = false;
  booleanSelectCheckBox = false;

  private val;
  private option: SelectItem[] = [{ label: "S26126I", value: "S26126I" }, { label: "S26126T", value: "S26126T" }, { label: "S26126A", value: "S26126A" }]
  private dealerEnrollment: DealerEnrollmentFormInterface = {
    aggrement: false, dealerCode: "", sid: "", dealershipName: "", dealerPrincipalName: "", dealerPrincipalEmail: "", phone: "",
    signature: "", date: "", selectedManager: "", managerEmail: "",
    isPartsCounter: false, isUsedRecon: false, isExpressLane: false
  };
  private mserEnrollmentFormData = {}
  private errorSID: string = "";
  private errorDealerCode: string = "";
  private errorDealerEmail: string = "";
  private invalidCreds: boolean = false;
  private successDealerRegisterMessage: string = "";
  private errorDealerRegistrationMessage: string = "";

  constructor(private mserEnrollmentService: DealerRegisterService,
    private http: Http,
    private router: Router) {
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
    this.registerDealer = {
      dealerSID: "",
      dealerCode: "",
      dealerPrincipalEmail: ""
    }
  }
  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  private dealerEnrollmentAggrement(agrrement) {
    this.dealerEnrollment.aggrement = true;
    this.booleanSelectCheckBox = true;
  }
  private dealerEnrollmentPCCheckBox() {
    this.dealerEnrollment.isPartsCounter = true;
  }
  private dealerEnrollmentUsedReconCheckBox() {
    this.dealerEnrollment.isUsedRecon = true;
  }
  private dealerEnrollmentExpressLaneCheckBox() {
    this.dealerEnrollment.isExpressLane = true;
  }
  private dealerEnrollmentElligibleManagers() {

  }
  private saveDealerEnrollmentForm() {
    this.submitted = true;
    alert(this.dealerEnrollment.date);
    alert(this.dealerEnrollment.date["formatted"]);

  }
  cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
