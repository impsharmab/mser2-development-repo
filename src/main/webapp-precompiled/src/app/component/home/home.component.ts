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
  }

  private mserEnrollmentDatum: any = [{
    "name": "",
    "value": 0,
    "type": "",
    "tileName": "",
    "tileHeaderImage": ""
  }];
  private getMSEREnrollmentTileData() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var positionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    this.homeService.getMSEREnrollmentTileData(positionCode, dealerCode).subscribe(
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
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var positionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
    this.homeService.getMSEREarningTileData(positionCode, dealerCode).subscribe(
      (mserEarningDatum) => {
        this.mserEarningDatum = (mserEarningDatum)

      },
      (error) => {
      }
    )
  }

  private openEnrollmentSite() {
    let url = ["mserHomepage/enrollmentmaintenance"]
    this.router.navigate(url);
  }

}
