import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  templateUrl: './dealer-register-wizard.html',
  styleUrls: ['./dealer-register.component.css']
})
export class DealerRegisterComponent implements OnInit {
  public registerDealer: DealerRegisterFormInterface;
  public selectedValues: string[] = ['val1', 'val2'];
  public value: boolean;
  public date: DateModel;
  public options: DatePickerOptions;
  public submitted = false;
  public postDealerCodeSubmitAlert: boolean = false;

  public successsubmit: boolean = false;
  public displayConfirmationModal: boolean = false;
  private val;
  private todayDate: string = "";
  private option: SelectItem[] = [{ label: "S26126I", value: "S26126I" }, { label: "S26126T", value: "S26126T" }, { label: "S26126A", value: "S26126A" }]
  private dealerEnrollment: DealerEnrollmentFormInterface = {
    aggrement: false, dealerCode: "", sid: "", dealershipName: "", dealerPrincipalName: "", dealerPrincipalEmail: "", phone: "",
    extention: "", signature: "", date: "", selectedPartsManager: "", partsManagerEmail: "", selectedServiceManager: "",
    serviceManagerEmail: "", isPartsCounter: false, isUsedRecon: false, isExpressLane: false, autoApproveMVP: ""
  };
  private mserEnrollmentFormData = {}
  public errorSID: string = "";
  public errorDealerCode: string = "";
  public errorDealerEmail: string = "";
  public invalidCreds: boolean = false;
  public successDealerRegisterMessage: string = "";
  public errorDealerRegistrationMessage: string = "";

  constructor(private mserEnrollmentService: DealerRegisterService,
    private http: Http,
    private router: Router,
    private chRef: ChangeDetectorRef) {
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
    if (date != undefined && date.length < 2) {
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
  public dealerEnrollmentAggrement(agrrement: any) {
    if (agrrement !== undefined && agrrement.length > 0) {
      this.dealerEnrollment.aggrement = true;
      this.showAggrementErrorHiddenDiv = false;
    } else {
      this.dealerEnrollment.aggrement = false;
    }

  }
  public dealerEnrollmentPCCheckBox() {
    this.dealerEnrollment.isPartsCounter = true;
  }
  public dealerEnrollmentUsedReconCheckBox() {
    this.dealerEnrollment.isUsedRecon = true;
  }
  public dealerEnrollmentExpressLaneCheckBox() {
    this.dealerEnrollment.isExpressLane = true;
  }


  public msg: string = "";
  public submitDealerAndPositionCodeDatum: any = {
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
  public showButtonDiv: boolean = false;
  public showDiv: boolean = false;
  public partsMangerOptions: SelectItem[] = [{ label: "", value: "" }];
  public ServiceManagerOptions: SelectItem[] = [{ label: "", value: "" }];
  public isELValidated: boolean = false;
  public enableInputs: boolean = false;
  public enablemanualInputs: boolean = false;
  public enrollmentFee: string = ""
  public showDCErrorHiddenDiv: boolean = false;
  public showSIDErrorHiddenDiv: boolean = false;
  public postDealerCodeSubmitSuccess: boolean = false;
  public dealerCodeMessage: string = "";
  public postDealerCodeInProgress: boolean = false;
  public submitDealerAndPositionCode(valid) {
    this.postDealerCodeSubmitAlert = false;
    this.postDealerCodeSubmitSuccess = false;
    // var z1 = /^[0-9]{5}/;
    var dealerCodeRegex = /^([0-9]{5})$/;
    var sidRegex = /^([A-Za-z0-9]{7})$/;
    // var dcStartsWith =str.substring(0, 2);
    if ((this.dealerEnrollment.dealerCode.trim()).startsWith("69") && dealerCodeRegex.test(this.dealerEnrollment.dealerCode.trim()) && sidRegex.test(this.dealerEnrollment.sid.trim())) {
      this.dealerCodeMessage = "Thank you for choosing to enroll in MSER. However, for enrolling a FIAT dealership please return to the login screen and utilize the designated FIAT Enrollment Form.";
      this.postDealerCodeSubmitAlert = true;
      this.postDealerCodeSubmitSuccess = true;
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

    this.postDealerCodeInProgress = true;
    this.mserEnrollmentService.submitDealerAndPositionCode(this.dealerEnrollment.dealerCode.trim(), this.dealerEnrollment.sid.trim()).subscribe(
      (submitDealerAndPositionCodeDatum) => {
        this.submitDealerAndPositionCodeDatum = (submitDealerAndPositionCodeDatum)
        this.dealerCodeMessage = "";
        this.postDealerCodeInProgress = false;
        // this.clearMessage();
        this.postDealerCodeSubmitSuccess = true;
        this.showButtonDiv = true
        this.showDiv = true;
        this.enableInputs = true;
        this.enablemanualInputs = true;
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
        this.chRef.detectChanges();
      },
      (error) => {
        if (error !== undefined && error.length < 250) {
          this.dealerCodeMessage = error;
          if (this.dealerCodeMessage.indexOf("info@moparser.com") != -1)
            this.dealerCodeMessage = this.dealerCodeMessage.replace("info@moparser.com", "<a href='mailto:info@moparser.com'>info@moparser.com</a>");
        } else {
          this.dealerCodeMessage = "Error in Submitting Dealer Code and SID.";
        }
        this.postDealerCodeSubmitAlert = true;
        this.postDealerCodeSubmitSuccess = true;
        this.postDealerCodeInProgress = false;
        this.chRef.detectChanges();
      }
    )
  }
  public showalert: boolean = true;
  public showValidationDiv: boolean = false;
  public errorMobileNumber: string = "";
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

  public showAggrementErrorHiddenDiv: boolean = false;
  public showDealershipNameErrorHiddenDiv: boolean = false;
  public showDealerPrincipalNameErrorHiddenDiv: boolean = false;
  public showDealerPrincipalEmailErrorHiddenDiv: boolean = false;
  public showPhoneNumberErrorHiddenDiv: boolean = false;
  public showPartsManagerEmailErrorHiddenDiv: boolean = false;
  public showServiceManagerEmailErrorHiddenDiv: boolean = false;
  public showPartsManagerNameErrorHiddenDiv: boolean = false;
  public showServiceManagerNameErrorHiddenDiv: boolean = false;
  public showOKErrorHiddenDiv: boolean = false;
  public successmsg: string = "";

  public hideSubmit: boolean = false;
  public showContinueSave: boolean = false;
  public postInProgress: boolean = false;
  public postAlert: boolean = false;
  public postSuccess: boolean = false;
  public saveDealerEnrollmentForm(valid) {
    this.msg = "";
    this.errorMobileNumber = "";
    this.showAggrementErrorHiddenDiv = false;
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


    if (this.dealerEnrollment.aggrement != true) {
      this.showAggrementErrorHiddenDiv = true;
    }
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
      this.dealerEnrollment.signature.toLowerCase() != "ok" || this.dealerEnrollment.aggrement == false) {
      return;
    }
    if (this.dealerEnrollment.selectedPartsManager.length < 1 && this.dealerEnrollment.selectedServiceManager.length < 1) {
      return;
    }
    if (this.dealerEnrollment.partsManagerEmail.length < 1 && this.dealerEnrollment.serviceManagerEmail.length < 1) {
      return;
    }


    var aggrement = this.dealerEnrollment.aggrement;
    var dealerCode = this.dealerEnrollment.dealerCode;
    var sid = this.dealerEnrollment.sid;
    var dealershipName = this.dealerEnrollment.dealershipName;
    var dealerPrincipalName = this.dealerEnrollment.dealerPrincipalName;
    var dealerPrincipalEmail = this.dealerEnrollment.dealerPrincipalEmail;
    var phone = this.dealerEnrollment.phone;
    var extention = this.dealerEnrollment.extention;
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

    this.postInProgress = true;
    this.mserEnrollmentService.saveDealerEnrollmentForm(
      dealerCode, sid, dealerPrincipalEmail, phone, extention,
      selectedPartsManager, partsManagerEmail, selectedServiceManager, serviceManagerEmail,
      isPartsCounter, isUsedRecon, isExpressLane, isMVPAutoApprove
    ).subscribe(
      (submitDealerAndPositionCodeDatum) => {
        this.submitDealerAndPositionCodeDatum = (submitDealerAndPositionCodeDatum)
        this.successsubmit = true;
        this.postAlert = true;
        this.clearMessage();
        this.postSuccess = true;
        this.displayConfirmationModal = true;
        this.enableInputs = true;
        this.enablemanualInputs = true;
        this.postInProgress = false;
        this.successmsg = "Registration Successful, an email has been sent to the one provided with your temporary user id and password.";
        this.chRef.detectChanges();
      },
      (error) => {
        this.postAlert = true;
        this.clearMessage();
        this.postInProgress = false;
        this.postSuccess = false;
        setTimeout(() => {
          if (error !== undefined && error.length < 250) {
            this.msg = error;
          } else {
            this.msg = "Error in Submitting Dealer Code and SID.";
          }
        }, 1000)
        this.chRef.detectChanges();
      }
      )
  }

  private clearMessage() {
    setTimeout(() => {
      this.postAlert = false;
    }, 5000)

  }
  public onChangeInput() {
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

  public ngModelChangeDC() {
    this.msg = "";
    this.showDCErrorHiddenDiv = false;
    this.postDealerCodeSubmitAlert = false;
    this.postDealerCodeSubmitSuccess = false;
  }
  public ngModelChangeSID() {
    this.msg = "";
    this.showSIDErrorHiddenDiv = false;
    this.postDealerCodeSubmitAlert = false;
    this.postDealerCodeSubmitSuccess = false;
  }
  public ngModelChangeDealershipName() {
    this.msg = "";
    this.showDealershipNameErrorHiddenDiv = false;
  }
  public ngModelChangeDealerprincipalName() {
    this.msg = "";
    this.showDealerPrincipalNameErrorHiddenDiv = false;
  }
  public ngModelChangeDealerprincipalEmail() {
    this.msg = "";
    this.showDealerPrincipalEmailErrorHiddenDiv = false;
  }
  public ngModelChangePhone() {
    this.msg = "";
    this.showPhoneNumberErrorHiddenDiv = false;
  }
  public ngModelChangeOK() {
    this.msg = "";
    this.showOKErrorHiddenDiv = false;
  }
  public dealerEnrollmentElligiblePartsManagers() {
    this.showPartsManagerNameErrorHiddenDiv = false;
  }
  public dealerEnrollmentElligibleServiceManagers() {
    this.showServiceManagerNameErrorHiddenDiv = false;
  }
  public ngModelChangePartsManagerEmail() {
    this.showPartsManagerEmailErrorHiddenDiv = false;
  }
  public ngModelChangeServiceManagerEmail() {
    this.showServiceManagerEmailErrorHiddenDiv = false;
  }

  public resetForm() {
    var dealerEnrollmentForm = document.getElementById("dealerEnrollmentForm") as HTMLSelectElement;
    dealerEnrollmentForm.reset();
  }

  public redirectTOLoginPage() {
    let url = ["login"]
    this.router.navigate(url);
  }

  cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
