import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { DealerRegisterFormInterface } from './dealer-register.interface'
import { DealerRegisterService } from '../../mser2-services/dealer-register-service/dealer-register.service';

@Component({
  selector: 'dealer-register-component',
  templateUrl: './new-dealer-register.html',
  styleUrls: ['./dealer-register.component.css']
})
export class DealerRegisterComponent implements OnInit {
  public mserEnrollmentFormInterface: DealerRegisterFormInterface;
  private mserEnrollmentFormData = {}
  constructor(private mserEnrollmentService: DealerRegisterService, private http: Http, private router: Router ) { }

  ngOnInit() {
    this.mserEnrollmentFormInterface = {
      dealerSID: "",
      dealerCode: "",
      dealerPrincipalEmail: ""
    }
  }
  private postMserEnrollmentData(dealerSID: string, dealerCode: string, dealerPrincipalEmail: string) {
    this.mserEnrollmentService.postMserEnrollmentData(this.mserEnrollmentFormInterface.dealerSID,
      this.mserEnrollmentFormInterface.dealerCode, this.mserEnrollmentFormInterface.dealerPrincipalEmail).subscribe(
      (responseMserEnrollmentData) => {
        this.mserEnrollmentFormData = (responseMserEnrollmentData)
      },
      error => {
        console.error('Error posting postMserEnrollmentData: ', error);
      }
      )
  }

  cancel(){
    let url = ["login"]
    this.router.navigate(url);
  }

}
