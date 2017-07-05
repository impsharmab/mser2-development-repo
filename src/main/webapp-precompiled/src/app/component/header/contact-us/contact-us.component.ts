import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../../../services/user-profile-service/user-profile.service';
import { UserProfileTextMessageOptionInterface } from '../user-profile/userProfile-textMessageOption.interface';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  private errorAgreeTermsAndCondition: string = "";
  private errorSID: string = "";
  private errorMobileNumber: string = "";
  private successPasswordChangedMessage: string = "";
  private profileChangeData: any = {};
  public textMsgOption: UserProfileTextMessageOptionInterface;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.textMsgOption = {
      sid: "",
      mobileNumber: "",
      agreeTermsAndCondition: false,
      agree: ""
    }
  }

  private validateMobileNumber(mobileNumber) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //alert(mobileNumber.match(phoneno));
    if (mobileNumber.match(phoneno)) {
      //alert("match");
      this.errorMobileNumber = "";
      return true;
    }
    else {
      //alert("did not match");
      this.errorMobileNumber = "Please provide a valid Mobile Number";
      return false;
    }
  }

  private textMessageOption() {
    if (!this.textMsgOption.agreeTermsAndCondition) {
      this.errorAgreeTermsAndCondition = "You must accept the terms of service";
      return;
    } else if (this.textMsgOption.sid.trim() === "" && this.textMsgOption.mobileNumber === "") {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "You must provide your SID.";
      this.errorMobileNumber = "Please provide a valid number";
      return;
    } else if (this.textMsgOption.sid.trim() === "" && this.textMsgOption.mobileNumber !== "") {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "You must provide your SID.";
      this.errorMobileNumber = "";
      return;
    } else if (!this.validateMobileNumber(this.textMsgOption.mobileNumber)) {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "";
      return;
    } else if (this.textMsgOption.sid.trim() !== "" && this.textMsgOption.mobileNumber === "") {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "";
      this.errorMobileNumber = "Please provide a valid number";
      return;
    }
    if (this.textMsgOption.agreeTermsAndCondition) {
      this.textMsgOption.agree = "Y"
    } else {
      this.textMsgOption.agree = "N"
    }
    this.userProfileService.textMessageOption(
      this.textMsgOption.mobileNumber,
      this.textMsgOption.agree, ).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
        this.errorAgreeTermsAndCondition = "";
        this.errorSID = "";
        this.errorMobileNumber = "";
        this.successPasswordChangedMessage = "Successfully updated Text Message Option.";
      },
      (error) => {
        this.errorAgreeTermsAndCondition = "";
        this.errorSID = "";
        this.errorMobileNumber = "";
        this.successPasswordChangedMessage = "Error in updating Text Message Option. ";
      }
      )
  }
}
