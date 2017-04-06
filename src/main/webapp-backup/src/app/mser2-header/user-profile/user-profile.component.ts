import { Component, OnInit } from '@angular/core';
import { UserProfileChangeInformationInterface } from './userProfile-changeInformation.interface';
import { UserProfileService } from '../../mser2-services/user-profile-service/user-profile.service';
import { UserChangePasswordInterface } from './userProfile-changePassword.interface';
import { UserProfileTextMessageOptionInterface } from './userProfile-textMessageOption.interface';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public profileChange: UserProfileChangeInformationInterface;
  public passwordChange: UserChangePasswordInterface;
  public textMsgOption: UserProfileTextMessageOptionInterface;
  private profileChangeData = {}
  constructor(private userProfileService: UserProfileService) {

  }

  ngOnInit() {
    this.profileChange = {
      name: "",
      email: "",
      optIn: false,
      optOut: false
    }
    this.passwordChange = {
      newPassword: "",
      confirmPassword: ""
    }
    this.textMsgOption = {
      sid: "",
      mobileNumber: "",
      agreeTermsAndCondition: false
    }
  }


  private updateUserProfile(name: string, email: string, optIn: boolean, optOut: boolean) {
    if (optIn) {
      var x = this.profileChange.optIn;
      var y = x.toString();
      y = "y";
    } else {
      var x = this.profileChange.optOut;
      var y = x.toString();
      y = "n";
    }

    this.userProfileService.updateUserProfile(
    
      this.profileChange.name,
      this.profileChange.email,
      this.profileChange.optIn,
      this.profileChange.optOut).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
      }
      )
    
  }

  private changeUserPassword(newPassword: string, confirmPassword: string) {
    this.userProfileService.changeUserPassword(this.passwordChange.newPassword,
      this.passwordChange.confirmPassword).subscribe(
      (profileChangeData) => {
        this.profileChangeData = (profileChangeData)
      }
      )
     
  }

  private textMessageOption(sid: string, mobileNumber: string, agreeTermsAndCondition: boolean) {
    this.userProfileService.textMessageOption(this.textMsgOption.sid,
      this.textMsgOption.mobileNumber,
      this.textMsgOption.agreeTermsAndCondition).subscribe(
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
