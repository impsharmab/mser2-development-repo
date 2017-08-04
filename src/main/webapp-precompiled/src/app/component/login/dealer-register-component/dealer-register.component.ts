import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { SelectItem } from 'primeng/primeng';

import { DealerRegisterFormInterface } from './dealer-register.interface'
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
  private val;
  options: DatePickerOptions;
  private option: SelectItem[] = [{ label: "S26126I", value: "S26126I" }, { label: "S26126T", value: "S26126T" }, { label: "S26126A", value: "S26126A" }]

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

  private registerDealership() {
    if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() === "" && this.registerDealer.dealerPrincipalEmail.trim() === "") {
      this.errorSID = "SID is Required.";
      this.errorDealerCode = "Dealer Code is Required.";
      this.errorDealerEmail = "Email is Required";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() === "" && this.registerDealer.dealerPrincipalEmail.trim() !== null && this.validateEmail(this.registerDealer.dealerPrincipalEmail.trim())) {
      this.errorSID = "SID is Required.";
      this.errorDealerCode = "Dealer Code is Required.";
      this.errorDealerEmail = "";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() !== null && this.registerDealer.dealerPrincipalEmail.trim() === "") {
      this.errorSID = "SID is Required.";
      this.errorDealerCode = "";
      this.errorDealerEmail = "Email is Required.";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() !== null && this.registerDealer.dealerCode.trim() === "" && this.registerDealer.dealerPrincipalEmail.trim() === "") {
      this.errorSID = "";
      this.errorDealerCode = "Dealer Code is Required.";
      this.errorDealerEmail = "Email is Required.";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() !== null && this.registerDealer.dealerPrincipalEmail.trim() !== null) {
      this.errorSID = "SID is Required.";
      this.errorDealerCode = "";
      this.errorDealerEmail = "";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() !== null && this.registerDealer.dealerPrincipalEmail.trim() !== null) {
      this.errorSID = "SID is Required.";
      this.errorDealerCode = "";
      this.errorDealerEmail = "";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() !== null && this.registerDealer.dealerCode.trim() === "" && this.registerDealer.dealerPrincipalEmail.trim() !== null) {
      this.errorSID = "";
      this.errorDealerCode = "Dealer Code is Required.";
      this.errorDealerEmail = "";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() !== null && this.registerDealer.dealerCode.trim() !== "" && this.registerDealer.dealerPrincipalEmail.trim() === "") {
      this.errorSID = "";
      this.errorDealerCode = "";
      this.errorDealerEmail = "Email is Required.";
      this.errorDealerRegistrationMessage = "";
      return;
    } else if (this.registerDealer.dealerSID.trim() !== null && this.registerDealer.dealerCode.trim() !== null && this.registerDealer.dealerPrincipalEmail.trim() !== null && !this.validateEmail(this.registerDealer.dealerPrincipalEmail.trim())) {
      this.errorSID = "";
      this.errorDealerCode = "";
      this.errorDealerEmail = "Please enter the valid Email.";
      this.errorDealerRegistrationMessage = "";
      return;
    }

    // if (this.validateEmail(this.registerDealer.dealerPrincipalEmail)) {
    //   alert(true)
    //   return;
    // } else {
    //   alert(false)
    // }
    this.mserEnrollmentService.registerDealership(this.registerDealer.dealerSID.trim(),
      this.registerDealer.dealerCode.trim(), this.registerDealer.dealerPrincipalEmail.trim())
      .subscribe(
      (responseMserEnrollmentData) => {
        this.mserEnrollmentFormData = (responseMserEnrollmentData)

        let loginPageUrl = ["/login"];
        this.router.navigate(loginPageUrl);

        this.errorSID = "";
        this.errorDealerCode = "";
        this.errorDealerEmail = "";
        this.errorDealerRegistrationMessage = "";
        // var body = "mailto:info@moparser.com?subject=Request Enrollment &body= Dealer SID:"
        // var dealerSid = this.registerDealer.dealerSID;
        // var dealerCode = "%0D%0A Dealer Code: " + this.registerDealer.dealerCode;
        // var dealerPrincipalEmail = "%0D%0A Dealer Principal Email: " + this.registerDealer.dealerPrincipalEmail;
        // var url = body.concat(dealerSid, dealerSid, dealerCode, dealerPrincipalEmail)
        // location.href = (url);
      },

      (error: any) => {
        console.log(error.status);
        // alert(error._body);
        if (error.status === 500) {
          this.errorSID = "";
          this.errorDealerCode = "";
          this.errorDealerEmail = "";
          this.errorDealerRegistrationMessage = error._body;
        } else {
          this.errorSID = "";
          this.errorDealerCode = "";
          this.errorDealerEmail = "";
          this.invalidCreds = true;
        }

      }

      )
    // this.errorSID = "";
    // this.errorDealerCode = "";
    // this.errorDealerEmail = "";
    // var body = "mailto:info@moparser.com?subject=Request Enrollment &body= Dealer SID:"
    // var dealerSid = this.registerDealer.dealerSID;
    // var dealerCode = "%0D%0A Dealer Code: " + this.registerDealer.dealerCode;
    // var dealerPrincipalEmail = "%0D%0A Dealer Principal Email: " + this.registerDealer.dealerPrincipalEmail;
    // var url = body.concat(dealerSid, dealerSid, dealerCode, dealerPrincipalEmail)
    // location.href = (url);
  }
  cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
