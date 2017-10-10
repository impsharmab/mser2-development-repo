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

  private successsubmit: boolean = false;
  private val;
  private todayDate: string = "";
  private option: SelectItem[] = [{ label: "S26126I", value: "S26126I" }, { label: "S26126T", value: "S26126T" }, { label: "S26126A", value: "S26126A" }]
  private dealerEnrollment: DealerEnrollmentFormInterface = {
    aggrement: false, dealerCode: "", sid: "", dealershipName: "", dealerPrincipalName: "", dealerPrincipalEmail: "", phone: "",
    signature: "", date: "", selectedPartsManager: "", partsManagerEmail: "", selectedServiceManager: "", serviceManagerEmail: "",
    isPartsCounter: false, isUsedRecon: false, isExpressLane: false, autoApproveMVP: ""
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

  val1: string;

  val2: string = 'Option 2';
  ngOnInit() {
    this.registerDealer = {
      dealerSID: "",
      dealerCode: "",
      dealerPrincipalEmail: ""
    }
    var d = new Date;
    var date = JSON.stringify(new Date().getDate());
    if (date != undefined && date.length < 10) {
      date = ("0" + date);
    }
    this.todayDate = (d.getMonth() + 1) + "/" + date + "/" + new Date().getFullYear();

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
  private partsMangerOptions: SelectItem[] = [{ label: "", value: "" }];
  private ServiceManagerOptions: SelectItem[] = [{ label: "", value: "" }];
  private isELValidated: boolean = false;
  private enableInputs: boolean = false;
  private enrollmentFee: string = ""
  private showDCErrorHiddenDiv: boolean = false;
  private showSIDErrorHiddenDiv: boolean = false;
  private submitDealerAndPositionCode(valid) {
    // var z1 = /^[0-9]{5}/;
    var dealerCodeRegex = /^([0-9]{5})$/;
    var sidRegex = /^([A-Za-z0-9]{7})$/;
    // var dcStartsWith =str.substring(0, 2);
    if ((this.dealerEnrollment.dealerCode.trim()).startsWith("69") && dealerCodeRegex.test(this.dealerEnrollment.dealerCode.trim()) && sidRegex.test(this.dealerEnrollment.sid.trim())) {
      this.msg = "Thank you for choosing to enroll in MSER. However, for enrolling a FIAT dealership please return to the login screen and utilize the designated FIAT Enrollment Form.";
    }

    if (!dealerCodeRegex.test(this.dealerEnrollment.dealerCode.trim())) {
      this.showDCErrorHiddenDiv = true;
    }
    if (!sidRegex.test(this.dealerEnrollment.sid.trim())) {
      this.showSIDErrorHiddenDiv = true;
    }
    if (!dealerCodeRegex.test(this.dealerEnrollment.dealerCode.trim()) || !sidRegex.test(this.dealerEnrollment.sid.trim()) || this.dealerEnrollment.dealerCode.trim().startsWith("69")) {
      return;
    }

    // if (this.dealerEnrollment.dealerCode.trim() == "" && this.dealerEnrollment.sid.trim() == "") {
    //   // this.msg = "Please enter Dealer Code and SID";
    //   this.showDCErrorHiddenDiv = true;
    //   this.showPCErrorHiddenDiv = true;
    //   return;
    // } else if (this.dealerEnrollment.dealerCode.trim() != "" && dealerCodeRegex.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length == 5 && this.dealerEnrollment.sid.trim() == "") {
    //   this.msg = "Please Enter SID";
    //   this.showDCErrorHiddenDiv = false;
    //   this.showPCErrorHiddenDiv = true;
    //   return;
    // } else if (this.dealerEnrollment.dealerCode.trim() != "" && !dealerCodeRegex.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length != 5 && this.dealerEnrollment.sid.trim() != "") {
    //   // this.msg = "Please Enter Valid Dealer Code";
    //   this.showDCErrorHiddenDiv = true;
    //   this.showPCErrorHiddenDiv = false;
    //   return;
    // } else if (this.dealerEnrollment.dealerCode.trim() != "" && !dealerCodeRegex.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length == 5 && this.dealerEnrollment.sid.trim() != "") {
    //   // this.msg = "Please Enter Valid Dealer Code";
    //   this.showDCErrorHiddenDiv = true;
    //   this.showPCErrorHiddenDiv = false;
    //   return;
    // } else if (this.dealerEnrollment.dealerCode.trim() != "" && !dealerCodeRegex.test(this.dealerEnrollment.dealerCode) && this.dealerEnrollment.dealerCode.length != 5 && this.dealerEnrollment.sid.trim() == "") {
    //   // this.msg = "Please Enter Valid Dealer Code and SID";
    //   this.showDCErrorHiddenDiv = true;
    //   this.showPCErrorHiddenDiv = true;
    //   return;
    // } else if (this.dealerEnrollment.dealerCode.trim() == "" && this.dealerEnrollment.sid.trim() != "") {
    //   // this.msg = "Plese Enter Dealer Code";
    //   this.showDCErrorHiddenDiv = true;
    //   this.showPCErrorHiddenDiv = false;
    //   return;
    // }
    // if (valid !== undefined && valid === false) {
    //   this.showValidationDiv = true;
    //   return;
    // } else {
    //   this.showValidationDiv = false;
    // }
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
            value: this.submitDealerAndPositionCodeDatum.PartsManagers[i].name
          })
        }

        for (var j = 0; j < this.submitDealerAndPositionCodeDatum.ServiceManagers.length; j++) {
          this.ServiceManagerOptions.push({
            label: this.submitDealerAndPositionCodeDatum.ServiceManagers[j].name + " - " + this.submitDealerAndPositionCodeDatum.ServiceManagers[j].value,
            value: this.submitDealerAndPositionCodeDatum.ServiceManagers[j].name
          })
        }
        if (this.submitDealerAndPositionCodeDatum.ELValidated) {
          this.isELValidated = true;
        } else {
          this.isELValidated = false;
        }

        if (this.submitDealerAndPositionCodeDatum.size != undefined && (this.submitDealerAndPositionCodeDatum.size == "A" || this.submitDealerAndPositionCodeDatum.size == "B")) {
          this.enrollmentFee = "$75 Per Month";
        } else if (this.submitDealerAndPositionCodeDatum.size != undefined && this.submitDealerAndPositionCodeDatum.size == "C") {
          this.enrollmentFee = "$150 Per Month";
        } else if (this.submitDealerAndPositionCodeDatum.size != undefined && (this.submitDealerAndPositionCodeDatum.size == "D" || this.submitDealerAndPositionCodeDatum.size == "E")) {
          this.enrollmentFee = "$200 Per Month";
        } else {
          this.enrollmentFee = "-";
        }
        if (this.submitDealerAndPositionCodeDatum.dealershipName != undefined && this.submitDealerAndPositionCodeDatum.dealershipName.length > 1) {
          this.dealerEnrollment.dealershipName = this.submitDealerAndPositionCodeDatum.dealershipName;
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
  private errorMobileNumber: string = "";
  private validateMobileNumber(mobileNumber) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (mobileNumber.match(phoneno)) {
      this.errorMobileNumber = "";
      return true;
    }
    else {
      this.errorMobileNumber = "Please provide a valid Phone Number";
      return false;
    }
  }

  private showDealershipNameErrorHiddenDiv: boolean = false;
  private showDealerPrincipalNameErrorHiddenDiv: boolean = false;
  private showDealerPrincipalEmailErrorHiddenDiv: boolean = false;
  private showPhoneNumberErrorHiddenDiv: boolean = false;
  private showPartsManagerEmailErrorHiddenDiv: boolean = false;
  private showServiceManagerEmailErrorHiddenDiv: boolean = false;
  private showPartsManagerNameErrorHiddenDiv: boolean = false;
  private showServiceManagerNameErrorHiddenDiv: boolean = false;
  private showOKErrorHiddenDiv: boolean = false;

  private saveDealerEnrollmentForm(valid) {
    this.msg = "";
    this.errorMobileNumber = "";
    this.showDealershipNameErrorHiddenDiv = false;
    this.showDealerPrincipalNameErrorHiddenDiv = false;
    this.showDealerPrincipalEmailErrorHiddenDiv = false;
    this.showPartsManagerEmailErrorHiddenDiv = false;
    this.showServiceManagerEmailErrorHiddenDiv = false;
    this.showPartsManagerNameErrorHiddenDiv = false;
    this.showServiceManagerNameErrorHiddenDiv = false;
    this.showPhoneNumberErrorHiddenDiv = false;
    this.showOKErrorHiddenDiv = false;


    var nameRegex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (this.booleanSelectCheckBox != undefined && this.booleanSelectCheckBox != true) {
      this.showalert = true;
    } else {
      this.showalert = false;
    }

    // if (!nameRegex.test(this.dealerEnrollment.dealershipName)) {
    //   this.showDealershipNameErrorHiddenDiv = true;
    // }
    if (this.dealerEnrollment.dealershipName != undefined && this.dealerEnrollment.dealershipName.length < 1) {
      this.showDealershipNameErrorHiddenDiv = true;
    }
    if (!nameRegex.test(this.dealerEnrollment.dealerPrincipalName)) {
      this.showDealerPrincipalNameErrorHiddenDiv = true;
    }
    if (!emailRegex.test(this.dealerEnrollment.dealerPrincipalEmail)) {
      this.showDealerPrincipalEmailErrorHiddenDiv = true;
    }
    if (!phoneRegex.test(this.dealerEnrollment.phone)) {
      this.showPhoneNumberErrorHiddenDiv = true;
    }
    if (this.dealerEnrollment.signature != undefined && this.dealerEnrollment.signature.toLowerCase() != "ok") {
      this.showOKErrorHiddenDiv = true;
    }
    if (this.dealerEnrollment.selectedPartsManager != undefined && this.dealerEnrollment.selectedPartsManager.length > 1
      && this.dealerEnrollment.partsManagerEmail != undefined && !emailRegex.test(this.dealerEnrollment.partsManagerEmail)) {
      this.showPartsManagerEmailErrorHiddenDiv = true;
    }
    if (this.dealerEnrollment.selectedServiceManager != undefined && this.dealerEnrollment.selectedServiceManager.length > 1
      && this.dealerEnrollment.serviceManagerEmail != undefined && !emailRegex.test(this.dealerEnrollment.serviceManagerEmail)) {
      this.showServiceManagerEmailErrorHiddenDiv = true;
    }
    if (this.dealerEnrollment.selectedPartsManager != undefined && this.dealerEnrollment.selectedPartsManager.length < 1
      && this.dealerEnrollment.selectedServiceManager != undefined && this.dealerEnrollment.selectedServiceManager.length < 1) {
      this.showPartsManagerNameErrorHiddenDiv = true;
      this.showServiceManagerNameErrorHiddenDiv = true;
    }

    if (this.dealerEnrollment.dealershipName.length < 1 || !nameRegex.test(this.dealerEnrollment.dealerPrincipalName) ||
      !emailRegex.test(this.dealerEnrollment.dealerPrincipalEmail) || !phoneRegex.test(this.dealerEnrollment.phone) ||
      this.dealerEnrollment.signature.toLowerCase() != "ok") {
      return;
    }
    if (this.dealerEnrollment.selectedPartsManager.length < 1 && this.dealerEnrollment.selectedServiceManager.length < 1) {
      return;
    }
    if (this.dealerEnrollment.partsManagerEmail.length < 1 && this.dealerEnrollment.serviceManagerEmail.length < 1) {
      return;
    }
    // if (valid !== undefined && valid === false) {
    //   this.showValidationDiv = true;
    // } else {
    //   this.showValidationDiv = false;
    // }


    // if (this.dealerEnrollment.dealerPrincipalName != undefined && this.dealerEnrollment.dealerPrincipalName.length < 1) {
    //   this.showDealerPrincipalNameErrorHiddenDiv = true;
    // }
    // if (this.dealerEnrollment.dealerPrincipalEmail != undefined && this.dealerEnrollment.dealerPrincipalEmail.length < 1) {
    //   this.showDealerPrincipalEmailErrorHiddenDiv = true;
    // }

    // if (!this.validateMobileNumber(this.dealerEnrollment.phone)) {
    //   this.showPhoneNumberErrorHiddenDiv = true;
    // }

    var aggrement = this.dealerEnrollment.aggrement;
    var dealerCode = this.dealerEnrollment.dealerCode;
    var sid = this.dealerEnrollment.sid;
    var dealershipName = this.dealerEnrollment.dealershipName;
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
    var isMVPAutoApprove = this.dealerEnrollment.autoApproveMVP;

    this.mserEnrollmentService.saveDealerEnrollmentForm(
      dealerCode, sid, dealerPrincipalEmail, phone,
      selectedPartsManager, partsManagerEmail, selectedServiceManager, serviceManagerEmail,
      isPartsCounter, isUsedRecon, isExpressLane, isMVPAutoApprove
    ).subscribe(
      (submitDealerAndPositionCodeDatum) => {
        this.submitDealerAndPositionCodeDatum = (submitDealerAndPositionCodeDatum)
        this.successsubmit = true;
        this.msg = "Registration Successful, an email has been sent to the one provided with your temporary user id and password.";
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

  private onChangeInput() {
    this.msg = "";
    // this.errorMobileNumber = "";
    this.showDealershipNameErrorHiddenDiv = false;
    this.showDealerPrincipalNameErrorHiddenDiv = false;
    this.showDealerPrincipalEmailErrorHiddenDiv = false;
    this.showPartsManagerEmailErrorHiddenDiv = false;
    this.showServiceManagerEmailErrorHiddenDiv = false;
    this.showPartsManagerNameErrorHiddenDiv = false;
    this.showServiceManagerNameErrorHiddenDiv = false;
    this.showPhoneNumberErrorHiddenDiv = false;
    this.showOKErrorHiddenDiv = false;
  }

  private ngModelChangeDC() {
    this.msg = "";
    this.showDCErrorHiddenDiv = false;
  }
  private ngModelChangeSID() {
    this.msg = "";
    this.showSIDErrorHiddenDiv = false;
  }
  private ngModelChangeDealershipName() {
    this.msg = "";
    this.showDealershipNameErrorHiddenDiv = false;
  }
  private ngModelChangeDealerprincipalName() {
    this.msg = "";
    this.showDealerPrincipalNameErrorHiddenDiv = false;
  }
  private ngModelChangeDealerprincipalEmail() {
    this.msg = "";
    this.showDealerPrincipalEmailErrorHiddenDiv = false;
  }
  private ngModelChangePhone() {
    this.msg = "";
    this.showPhoneNumberErrorHiddenDiv = false;
  }
  private ngModelChangeOK() {
    this.msg = "";
    this.showOKErrorHiddenDiv = false;
  }
  private dealerEnrollmentElligiblePartsManagers() {
    this.showPartsManagerNameErrorHiddenDiv = false;
  }
  private dealerEnrollmentElligibleServiceManagers() {
    this.showServiceManagerNameErrorHiddenDiv = false;
  }
  private ngModelChangePartsManagerEmail() {
    this.showPartsManagerEmailErrorHiddenDiv = false;
  }
  private ngModelChangeServiceManagerEmail() {
    this.showServiceManagerEmailErrorHiddenDiv = false;
  }

  cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
