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
  private isDealerManager: any = false;
  private isAdmin: any = false;
  private isTIDUser: any = false;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
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

  private showEnrollmentMaintenanceButton: boolean = false;
  private checkRoles() {
    var isDealerManager = JSON.parse(sessionStorage.getItem("selectedCodeData")).isDealerManager;
    var isPartsManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isPartsManagerOfRecord;
    var isServiceManagerOfRecord = JSON.parse(sessionStorage.getItem("selectedCodeData")).isServiceManagerOfRecord;
    if (isDealerManager || isPartsManagerOfRecord || isServiceManagerOfRecord) {
      this.showEnrollmentMaintenanceButton = true;
    } else {

    }
  }
  private mserEnrollmentDatum: any = [{
    "name": "",
    "value": 0,
    "type": "",
    "tileName": "",
    "tileHeaderImage": ""
  }];
  private getMSEREnrollmentTileData() {
    this.homeService.getMSEREnrollmentTileData().subscribe(
      (mserEnrollmentDatum) => {
        this.mserEnrollmentDatum = (mserEnrollmentDatum)
      },
      (error) => {
      }
    )
  }
  private mserEarningDatum: any = [{
    "name": "",
    "value": 0,
    "type": "",
    "tileName": "",
    "tileHeaderImage": ""
  }];
  private getMSEREarningTileData() {
    this.homeService.getMSEREarningTileData().subscribe(
      (mserEarningDatum) => {
        this.mserEarningDatum = (mserEarningDatum)
      },
      (error) => {
      }
    )
  }

  private hideEnrollmentTile: boolean = false;
  private hideEnrollmentTileMatrix() {
    var role = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
    if (role == 6 || role == 9) {
      this.hideEnrollmentTile = true;
    }
  }
  private openEnrollmentSite() {
    let url = ["mserHomepage/enrollmentmaintenance"]
    this.router.navigate(url);
  }

}
