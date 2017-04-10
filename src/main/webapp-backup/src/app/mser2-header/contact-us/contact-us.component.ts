import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../../mser2-services/user-profile-service/user-profile.service';
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

  private textMessageOption() {
    debugger
    if (!this.textMsgOption.agreeTermsAndCondition) {
      this.errorAgreeTermsAndCondition = "You must accept the terms of service";
      return;
    } else if (this.textMsgOption.sid.trim() === "" && this.textMsgOption.mobileNumber === "") {
      this.errorSID = "You must provide your SID.";
      this.errorMobileNumber = "Please provide a valid number";
      return;
    } else if (this.textMsgOption.sid.trim() === "" && this.textMsgOption.mobileNumber !== "") {
      this.errorSID = "You must provide your SID.";
      return;
    } else if (this.textMsgOption.sid.trim() !== "" && this.textMsgOption.mobileNumber === "") {
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
        this.successPasswordChangedMessage = "Your password has been successfully changed.";
      }
      )
  }
}
