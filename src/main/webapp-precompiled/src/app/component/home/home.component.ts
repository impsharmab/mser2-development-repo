import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, Params } from '@angular/router';

import { CommaSeparatedNumberPipe } from '../number-formatting/comma-separated.component';

import { HomeService } from '../../services/home-service/home-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isDealerManager: any = false;
  private mserEnrollmentTileData: any = [
    {
      "name": "Total Dealers Enrolled",
      "value": "245",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "number"
    },
    {
      "name": "QTD Survey Count",
      "value": "18086",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "currency"
    },
    {
      "name": "Total Survey Count",
      "value": "12014",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "number"
    },
    {
      "name": "Test Count",
      "value": "32547",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "currency"
    }
  ];

  private mserEarningTileData: any = [
    {
      "name": "Total Dealers Enrolled",
      "value": "47",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "number"
    },
    {
      "name": "Survey Count",
      "value": "24701",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "currency"
    },
    {
      "name": "YTD Survey Count",
      "value": "30111",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "currency"
    },
    {
      "name": "QTD Survey Count",
      "value": "18086",
      "tileName": "",
      "tileHeaderImage": "mser-logo.jpg",
      "type": "number"
    }
  ];
  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.getMSEREnrollmentTileData();
    this.getMSEREarningTileData();
    this.hideEnrollmentTileMatrix();
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
