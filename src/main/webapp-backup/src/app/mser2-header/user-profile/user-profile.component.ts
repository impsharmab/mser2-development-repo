import { Component, OnInit, Input } from '@angular/core';
import { UserProfileChangeInformationInterface } from './userProfile-changeInformation.interface';
import { UserProfileService } from '../../mser2-services/user-profile-service/user-profile.service';
import { UserChangePasswordInterface } from './userProfile-changePassword.interface';
import { UserProfileTextMessageOptionInterface } from './userProfile-textMessageOption.interface';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './new-userprofile.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() userProfileData: any;
  public profileChange: UserProfileChangeInformationInterface;
  public passwordChange: UserChangePasswordInterface;
  public textMsgOption: UserProfileTextMessageOptionInterface;
  private profileChangeData: any = {}
  private optIn: string = "";
  private optOut: string = "";
  private successUpdateUserProfile: string = "";
  private confirmPasswordMessage: string = "";
  private errorAgreeTermsAndCondition: string = "";
  private errorSID: string = "";
  private errorMobileNumber: string = "";
  private successPasswordChangedMessage: string = "";

  constructor(private userProfileService: UserProfileService) {
  }
  ngOnInit() {
    this.userProfileData = JSON.parse(sessionStorage.getItem("UserProfileData"))
    this.profileChange = {
      name: "",
      email: "",
      optIn: false,
      optOut: false,
      sendMail: ""
    }
    this.passwordChange = {
      newPassword: "",
      confirmPassword: ""
    }
    this.textMsgOption = {
      sid: "",
      mobileNumber: "",
      agreeTermsAndCondition: false,
      agree: ""
    }
  }


  private updateUserProfile() {
    
    if (this.profileChange.optIn) {
      this.profileChange.sendMail = "Y"
    } else {
      this.profileChange.sendMail = "N"
    }
    this.userProfileService.updateUserProfile(
      this.profileChange.name,
      this.profileChange.email,
      this.profileChange.sendMail
    ).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
        this.successUpdateUserProfile = "Your profile settings are updated";
      },
      // (error) => {
      //   this.loginFailed = "Login Failed";
      //   this.errorMessage = "Please enter your valid SID/TID and password";
      // }
    )

  }

  private changeUserPassword() {
    if (this.passwordChange.newPassword.trim() !== this.passwordChange.confirmPassword.trim()) {
      this.confirmPasswordMessage = "The confirmation does not match the password you entered";
      return;
    }
    this.userProfileService.changeUserPassword(this.passwordChange.newPassword).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
         this.successPasswordChangedMessage = "Your password has been successfully changed.";
      }
    )
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
      this.textMsgOption.agree).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
        
      }
      )
  }

  private emailValidator(email: string): boolean {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }
}
