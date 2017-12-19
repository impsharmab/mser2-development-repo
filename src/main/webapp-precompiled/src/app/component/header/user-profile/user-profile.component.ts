import { Component, OnInit, Input } from '@angular/core';
import { UserProfileChangeInformationInterface } from './userProfile-changeInformation.interface';
import { UserProfileService } from '../../../services/user-profile-service/user-profile.service';
import { UserChangePasswordInterface } from './userProfile-changePassword.interface';
import { UserProfileTextMessageOptionInterface } from './userProfile-textMessageOption.interface';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './userprofile.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //@Input() userProfileData: any;
  public ranOnce = false;
  public errorProfileChangeMessage: string = "";
  public errorsPasswordMessage: any = [];
  public userProfileData: any = { name: "", email: "", sendMail: null };
  public emptyNameMessage: string = "";
  //public profileChange: UserProfileChangeInformationInterface;
  public profileChange: any = {
    name: "",
    email: "",
    optIn: false,
    optOut: false,
    sendMail: null
  }
  //public passwordChange: UserChangePasswordInterface;
  public passwordChange: any = {
    newPassword: "",
    confirmPassword: ""
  }
  // public textMsgOption: UserProfileTextMessageOptionInterface;
  public textMsgOption: any = {
    sid: "",
    mobileNumber: "",
    agreeTermsAndCondition: false,
    agree: ""
  }
  public profileChangeData: any = { name: "", email: "", sendMail: null }
  public optIn: string = "";
  public optOut: string = "";
  public successUpdateUserProfile: string = "";
  public confirmPasswordMessage: string = "";
  public errorAgreeTermsAndCondition: string = "";
  public errorSID: string = "";
  public errorMobileNumber: string = "";
  public successPasswordChangedMessage: string = "";
  public successTextMessageOption: string = "";
  public errorSuccessTextMessageOption: string = "";

  constructor(private userProfileService: UserProfileService) {
  }
  ngOnInit() {
    if (!this.ranOnce) {
      this.getUserProfileData1();
    }
    this.ranOnce = true;
    //this.userProfileData = JSON.parse(sessionStorage.getItem("UserProfileData"));
    //console.log(this.userProfileData);


  }

  public continueInit() {
    this.profileChange = {
      name: this.userProfileData.name,
      email: this.userProfileData.email,
      optIn: false,
      optOut: false,
      sendMail: this.userProfileData.sendMail

    }

  }
  public validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  public validatePassword(password) {
    var errorsPasswordMessage = [];
    if (password.length < 6) {
      this.errorsPasswordMessage.push("Your password must be at least 6 characters");
    }
    if (password.search(/[a-z]/i) < 0) {
      this.errorsPasswordMessage.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/i) < 0) {
      this.errorsPasswordMessage.push("Your password must contain at least one digit.");
    }
    if (this.errorsPasswordMessage.length > 0) {
      alert(this.errorsPasswordMessage.join("\n"));
      return false;
    }
    return true;
  }
  public validateMobileNumber(mobileNumber) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //alert(mobileNumber.match(phoneno));
    if (mobileNumber.match(phoneno)) {
      //alert("match");
      this.errorMobileNumber = "";
      return true;
    }
    else {
      //alert("did not match");
      this.errorMobileNumber = "Please provide a valid mobile number";
      return false;
    }
  }
  public getUserProfileData1() {
    var self = this;
    this.userProfileService.getUserProfileData().subscribe(
      (resUserProfileData) => {
        self.userProfileData = (resUserProfileData)
        if (self.userProfileData != undefined) {
          if (self.userProfileData.sendMail == null) {
            self.userProfileData.sendMail = false;
          } else if (self.userProfileData.sendMail == "N") {
            self.userProfileData.sendMail = false;
          }
        }

        console.log(self.userProfileData);
        self.continueInit();
        // this.userProfileService.setUserProfileData(this.userProfileData)
        //debugger
        // let url = ["userprofile"]
        // this.router.navigate(url);

      }
    )
  }
  public updateUserProfile() {
    this.profileChange.sendMail = this.userProfileData.sendMail;

    if (this.profileChange.sendMail == null) {
      this.profileChange.sendMail = "N"
    } else if (this.profileChange.sendMail == false) {
      this.profileChange.sendMail = "N"
    } else if (this.profileChange.sendMail == true) {
      this.profileChange.sendMail = "Y"
    }

    if (this.profileChange.email == "" && this.profileChange.name == "") {
      this.emptyNameMessage = "Name is required.";
      this.errorProfileChangeMessage = "Email is required.";
      this.successUpdateUserProfile = "";
      return;
    } else if (this.profileChange.email == "" && this.profileChange.name != "") {
      this.emptyNameMessage = "";
      this.errorProfileChangeMessage = "Email is required.";
      this.successUpdateUserProfile = "";
      return;
    }

    else if (!this.validateEmail(this.profileChange.email)) {
      this.errorProfileChangeMessage = "Please enter a valid email id.";
      this.successUpdateUserProfile = "";
      return;
    }
    this.userProfileService.updateUserProfile(
      this.profileChange.name,
      this.profileChange.email,
      this.profileChange.sendMail
    ).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
        this.errorProfileChangeMessage = "";
        this.successUpdateUserProfile = "Your profile settings are updated";
      },
      // (error) => {
      //   this.loginFailed = "Login Failed";
      //   this.errorMessage = "Please enter your valid SID/TID and password";
      // }
    )

  }

  public changeUserPassword() {
    if (this.passwordChange.newPassword.trim() == "" || this.passwordChange.confirmPassword.trim() == "") {
      this.confirmPasswordMessage = "Password field should not be empty";
      return;
    }
    else if (this.passwordChange.newPassword.trim() !== this.passwordChange.confirmPassword.trim()) {
      this.confirmPasswordMessage = "The confirmation does not match the password you entered";
      return;
    }
    else if (this.passwordChange.newPassword.trim() !== this.validatePassword(this.passwordChange.confirmPassword.trim())) {
      this.confirmPasswordMessage = "";
      // this.confirmPasswordMessage = "The confirmation does not match the password you entered";

    }
    this.userProfileService.changeUserPassword(this.passwordChange.newPassword).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
        this.confirmPasswordMessage = "";
        this.successPasswordChangedMessage = "Your password has been successfully changed.";
      }
    )
  }

  public textMessageOption() {

    if (!this.textMsgOption.agreeTermsAndCondition) {
      this.errorAgreeTermsAndCondition = "You must accept the terms of service";
      this.errorSID = "";
      this.errorMobileNumber = "";
      return;
    } else if (this.textMsgOption.sid.trim() === "" && this.textMsgOption.mobileNumber === "") {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "You must provide your SID/TID.";
      this.errorMobileNumber = "Please provide a valid mobile number";
      return;
    } else if (this.textMsgOption.sid.trim() === "" && this.textMsgOption.mobileNumber !== "") {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "You must provide your SID/TID.";
      this.errorMobileNumber = "";
      return;
    } else if (!this.validateMobileNumber(this.textMsgOption.mobileNumber)) {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "";
      return;
    } else if (this.textMsgOption.sid.trim() !== "" && this.textMsgOption.mobileNumber === "") {
      this.errorAgreeTermsAndCondition = "";
      this.errorSID = "";
      this.errorMobileNumber = "Please provide a valid mobile number";
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
        this.profileChangeData = (profileChangeData);
        this.errorAgreeTermsAndCondition = "";
        this.errorSID = "";
        this.errorMobileNumber = "";
        this.successTextMessageOption = "Successfully updated text message option";

      }, (error) => {
        this.errorSuccessTextMessageOption = "Error in updating text message option.";
      }
      )
  }

  public emailValidator(email: string): boolean {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }
}
