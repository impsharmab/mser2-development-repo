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
  private profileChangeData = {}
  private optIn: string = "";
  private optOut: string = "";
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
      agreeTermsAndCondition: false
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
      }
      )

  }

  private changeUserPassword() {
    debugger
    this.userProfileService.changeUserPassword(this.passwordChange.newPassword).subscribe(
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
