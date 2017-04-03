import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Mser2LoginServiceService } from '../mser2-services/mser2-login-service.service';
import { User } from './mser2-user.interface';

@Component({
  selector: 'app-mser2-login',
  templateUrl: './mser2-login.component.html',
  styleUrls: ['./mser2-login.component.css']
})
export class Mser2LoginComponent implements OnInit {
  public user: User;
  private userdata: any = {};

  constructor(private loginService: Mser2LoginServiceService, private router: Router) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    }
  }

  private login(username: string, password: string) {
    //alert(username)
    this.loginService.getLoginResponse(this.user.username, this.user.password).subscribe(
      (resUserData) => {
        this.userdata = (resUserData)
        // alert(resUserData["userID"]);
        if (resUserData["token"].length > 0) {
          this.loginService.setUserdata(this.userdata);

          let url = ["mserHomepage"]
          this.router.navigate(url);
        }

        else if (resUserData["token"] !== undefined) {
          alert("user is not registered in database");
        }

        else {
          alert("invalid user");

          //alert(resUserData.error)
        }
        // var msg = JSON.parse(resUserData["error"])["error"];
        // alert(msg);
      }
    )
  }
  resetPassword() {
    let url = ["resetPassword"]
    this.router.navigate(url);
  }

}
