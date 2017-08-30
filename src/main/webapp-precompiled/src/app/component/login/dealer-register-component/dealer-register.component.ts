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
  booleanSelectCheckBox: boolean = true;

  private val;
  private todayDate: string = "";
  private option: SelectItem[] = [{ label: "S26126I", value: "S26126I" }, { label: "S26126T", value: "S26126T" }, { label: "S26126A", value: "S26126A" }]
  private dealerEnrollment: DealerEnrollmentFormInterface = {
    aggrement: false, dealerCode: "", sid: "", dealershipName: "", dealerPrincipalName: "", dealerPrincipalEmail: "", phone: "",
    signature: "", date: "", selectedPartsManager: "", partsManagerEmail: "", selectedServiceManager: "", serviceManagerEmail: "",
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
    var d = new Date;
    this.todayDate = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();

  }
  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //   private onCheckCall(aggrement) {
  // if(aggrement==)
  //   }
  private dealerEnrollmentAggrement(agrrement: any) {
    this.dealerEnrollment.aggrement = true;
    if (agrrement !== undefined && agrrement.length > 0) {
      this.booleanSelectCheckBox = false;
      this.showalert = true;
    } else {
      this.booleanSelectCheckBox = true;
    }

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
  private msg: string = "";
  private submitDealerAndPositionCodeDatum: any = {
    "PartsManagers": [{
      "name": "",
      "value": ""
    }],
    "ELValidated": false,
    "dealershipName": "",
    "ServiceManagers": [{
      "name": "",
      "value": ""
    }]
  };
  private showButtonDiv: boolean = false;
  private showDiv: boolean = false;
  private partsMangerOptions: SelectItem[] = [];
  private ServiceManagerOptions: SelectItem[] = [];
  private isELValidated: boolean = false;
  private enableInputs: boolean = false;
  private submitDealerAndPositionCode(valid) {
    if (valid !== undefined && valid === false) {
      this.showValidationDiv = true;
      return;
    } else {
      this.showValidationDiv = false;
    }
    var z1 = /^[0-9]*$/;
    if (this.dealerEnrollment.dealerCode.trim() == "" && this.dealerEnrollment.sid.trim() == "") {
      this.msg = "Please enter Dealer Code and SID";
      return;
    } else if (this.dealerEnrollment.dealerCode.trim() != "" && z1.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length == 5 && this.dealerEnrollment.sid.trim() == "") {
      this.msg = "Please Enter SID";
      return;
    } else if (this.dealerEnrollment.dealerCode.trim() != "" && !z1.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length != 5 && this.dealerEnrollment.sid.trim() != "") {
      this.msg = "Please Enter Valid Dealer Code";
      return;
    } else if (this.dealerEnrollment.dealerCode.trim() != "" && !z1.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length != 5 && this.dealerEnrollment.sid.trim() == "") {
      this.msg = "Please Enter Valid Dealer Code and SID";
      return;
    } else if (this.dealerEnrollment.dealerCode.trim() == "" && this.dealerEnrollment.sid.trim() != "") {
      this.msg = "Plese Enter Dealer Code";
      return;
    }

    this.mserEnrollmentService.submitDealerAndPositionCode(this.dealerEnrollment.dealerCode.trim(), this.dealerEnrollment.sid.trim()).subscribe(
      (submitDealerAndPositionCodeDatum) => {
        this.submitDealerAndPositionCodeDatum = (submitDealerAndPositionCodeDatum)
        this.msg = "";
        this.showButtonDiv = true
        this.showDiv = true;
        this.enableInputs = true;
        for (var i = 0; i < this.submitDealerAndPositionCodeDatum.PartsManagers.length; i++) {
          this.partsMangerOptions.push({
            label: this.submitDealerAndPositionCodeDatum.PartsManagers[i].name + " - " + this.submitDealerAndPositionCodeDatum.PartsManagers[i].value,
            value: this.submitDealerAndPositionCodeDatum.PartsManagers[i].name + " - " + this.submitDealerAndPositionCodeDatum.PartsManagers[i].value
          })
        }

        for (var j = 0; j < this.submitDealerAndPositionCodeDatum.ServiceManagers.length; j++) {
          this.ServiceManagerOptions.push({
            label: this.submitDealerAndPositionCodeDatum.ServiceManagers[j].name + " - " + this.submitDealerAndPositionCodeDatum.ServiceManagers[j].value,
            value: this.submitDealerAndPositionCodeDatum.ServiceManagers[j].name + " - " + this.submitDealerAndPositionCodeDatum.ServiceManagers[j].value
          })
        }
        if (this.submitDealerAndPositionCodeDatum.isELValidated) {
          this.isELValidated = true;
        } else {
          this.isELValidated = false;
        }
      },
      (error) => {
        setTimeout(() => {
          if (error !== undefined && error.length < 250) {
            this.msg = error;
          } else {
            this.msg = "Error in Submitting Dealer Code and SID.";
          }
        }, 1000)
      }
    )
  }
  private showalert: boolean = true;
  private showValidationDiv: boolean = false;
  private saveDealerEnrollmentForm(valid) {
    if (this.booleanSelectCheckBox !== undefined && this.booleanSelectCheckBox !== true) {
      this.showalert = true;

    } else {
      this.showalert = false;
    }
    if (valid !== undefined && valid === false) {
      this.showValidationDiv = true;
      return;
    } else {
      this.showValidationDiv = false;
    }

    var aggrement = this.dealerEnrollment.aggrement;
    var dealerCode = this.dealerEnrollment.dealerCode;
    var sid = this.dealerEnrollment.sid;
    var dealershipName = this.submitDealerAndPositionCodeDatum.dealershipName;
    var dealerPrincipalName = this.dealerEnrollment.dealerPrincipalName;
    var dealerPrincipalEmail = this.dealerEnrollment.dealerPrincipalEmail;
    var phone = this.dealerEnrollment.phone;
    var signature = this.dealerEnrollment.signature;
    var date = this.dealerEnrollment.date;
    var selectedPartsManager = this.dealerEnrollment.selectedPartsManager;
    var partsManagerEmail = this.dealerEnrollment.partsManagerEmail;
    var selectedServiceManager = this.dealerEnrollment.selectedServiceManager;
    var serviceManagerEmail = this.dealerEnrollment.serviceManagerEmail;
    var isPartsCounter = this.dealerEnrollment.isPartsCounter;
    var isUsedRecon = this.dealerEnrollment.isUsedRecon;
    var isExpressLane = this.dealerEnrollment.isExpressLane;

    this.mserEnrollmentService.saveDealerEnrollmentForm(
      dealerCode, sid, dealerPrincipalEmail, phone,
      selectedPartsManager, partsManagerEmail, selectedServiceManager, serviceManagerEmail,
      isPartsCounter, isUsedRecon, isExpressLane
    ).subscribe(
      (submitDealerAndPositionCodeDatum) => {
        this.submitDealerAndPositionCodeDatum = (submitDealerAndPositionCodeDatum)

      },
      (error) => {
        setTimeout(() => {
          if (error !== undefined && error.length < 250) {
            this.msg = error;
          } else {
            this.msg = "Error in Submitting Dealer Code and SID.";
          }
        }, 1000)
      }
      )
  }

  cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
