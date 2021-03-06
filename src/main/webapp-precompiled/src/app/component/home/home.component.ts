import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';

import { CommaSeparatedNumberPipe } from '../number-formatting/comma-separated.component';

import { HomeService } from '../../services/home-service/home-service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isDealerManager: any = false;
  public isAdmin: any = false;
  public isTIDUser: any = false;
  public ssotoken: string = "";
  public isssotoken: boolean = false;

  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.ssotoken = params['token'];
      if (this.ssotoken != undefined && this.ssotoken.length > 0) {
        this.isssotoken = true;
      }

    });
    if (!this.isssotoken) {
      if (navigator.userAgent.indexOf("rv:11") != -1 && !sessionStorage.appReloaded) {
        sessionStorage.appReloaded = true;
        location.reload();
      }
    }
  }

  ngOnInit() {
    // this.cookieService.remove("donotshowMVPPage");
    this.isAdmin = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
    if (this.isAdmin) {
      this.isTIDUser = true;
    } else {
      this.checkRoles(); 
    }
    this.getMSEREnrollmentTileData();
    this.getMSEREarningTileData();
    this.hideEnrollmentTileMatrix();

  }

  public showEnrollmentMaintenanceButton: boolean = false;
  public checkRoles() {
    var isDealerManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isDealerManager;
    var isPartsManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPartsManagerOfRecord;
    var isServiceManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isServiceManagerOfRecord;
    var isElManger = JSON.parse(sessionStorage.getItem("selectedCodeData")).isElManager;
    var isPCManger = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPCManager;
    var isUVMManger = JSON.parse(sessionStorage.getItem("selectedCodeData")).isUVMManager;
    var isELManagerExist = JSON.parse(sessionStorage.getItem("selectedCodeData")).elManagerExists;
    var isPCMnanagerExist = JSON.parse(sessionStorage.getItem("selectedCodeData")).pcManagerExists;
    var isUVMManagerExist = JSON.parse(sessionStorage.getItem("selectedCodeData")).uvmManagerExists;

    if (isDealerManager || isPartsManagerOfRecord || isServiceManagerOfRecord || isElManger || isPCManger || isUVMManger) {
      this.showEnrollmentMaintenanceButton = true;
    } else {
      this.showEnrollmentMaintenanceButton = false;
    }
  }
  public mserEnrollmentDatum: any = [{
    "name": "",
    "value": 0,
    "type": "",
    "tileName": "",
    "tileHeaderImage": ""
  }];
  public getMSEREnrollmentTileData() {
    this.homeService.getMSEREnrollmentTileData().subscribe(
      (mserEnrollmentDatum) => {
        this.mserEnrollmentDatum = (mserEnrollmentDatum)
      },
      (error) => {
      }
    )
  }
  public mserEarningDatum: any = [{
    "name": "",
    "value": 0,
    "type": "",
    "tileName": "",
    "tileHeaderImage": ""
  }];
  public getMSEREarningTileData() {
    this.homeService.getMSEREarningTileData().subscribe(
      (mserEarningDatum) => {
        this.mserEarningDatum = (mserEarningDatum)
      },
      (error) => {
      }
    )
  }

  public hideEnrollmentTile: boolean = false;
  public hideEnrollmentTileMatrix() {
    var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
    if (role == 6 || role == 9) {
      this.hideEnrollmentTile = true;
    }
  }
  public openEnrollmentSite() {
    let url = ["mserHomepage/enrollmentmaintenance"]
    this.router.navigate(url);
  }

}
