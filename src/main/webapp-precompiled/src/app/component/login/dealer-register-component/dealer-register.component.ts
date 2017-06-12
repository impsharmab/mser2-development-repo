import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { DealerRegisterFormInterface } from './dealer-register.interface'
import { DealerRegisterService } from '../../../services/dealer-register-service/dealer-register.service';

@Component({
  selector: 'dealer-register-component',
  templateUrl: './new-dealer-register.html',
  styleUrls: ['./dealer-register.component.css']
})
export class DealerRegisterComponent implements OnInit {
  public registerDealer: DealerRegisterFormInterface;
  private mserEnrollmentFormData = {}
  private errorSID: string = "";
  private errorDealerCode: string = "";
  private errorDealerEmail: string = "";
  private invalidCreds: boolean = false;
  constructor(private mserEnrollmentService: DealerRegisterService, private http: Http, private router: Router) { }

  ngOnInit() {
    this.registerDealer = {
      dealerSID: "",
      dealerCode: "",
      dealerPrincipalEmail: ""
    }
  }
  private registerDealership() {
    if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() === "" && this.registerDealer.dealerPrincipalEmail.trim() === "") {
      this.errorSID = "SID is required.";
      this.errorDealerCode = "DealerCode is required.";
      this.errorDealerEmail = "Email is required";
      return;
    } else if (this.registerDealer.dealerSID.trim() === "" && this.registerDealer.dealerCode.trim() !== null && this.registerDealer.dealerPrincipalEmail.trim() !== null) {
      this.errorSID = "SID is required.";
      return;
    } else if (this.registerDealer.dealerSID.trim() !== null && this.registerDealer.dealerCode.trim() === "" && this.registerDealer.dealerPrincipalEmail.trim() !== null) {
      this.errorDealerCode = "DealerCode is required.";
      return;
    }
    this.mserEnrollmentService.registerDealership(this.registerDealer.dealerSID,
      this.registerDealer.dealerCode, this.registerDealer.dealerPrincipalEmail).subscribe(
      (responseMserEnrollmentData) => {
        this.mserEnrollmentFormData = (responseMserEnrollmentData)
      },
      error => {
        console.error('Error posting postMserEnrollmentData: ', error);
      },
      (error) => {
        this.invalidCreds = true;
      }

      )
  }

  cancel() {
    let url = ["login"]
    this.router.navigate(url);
  }

}
