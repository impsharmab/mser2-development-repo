import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { PartsLookupService } from '../../services/parts-lookup/parts-lookup.service';
@Component({
  selector: 'parts-lookup',
  templateUrl: './parts-lookup.html'
  //styleUrls: ['./marketing-home.component.css']
})
export class PartsLookupComponent implements OnInit {
  public categoriesList: any = [];
  public categoriesListOptions: SelectItem[] = [];
  public category: String = "";
  public partsByCategory: any = [];
  public hidePartCategoryTable: boolean = false;
  public hidePartInfoTable: boolean = false;
  public part: string = "";
  public partCategoryTableHeader: string = "";
  public partInfoDatum: any = [];
  constructor(private partsLookupService: PartsLookupService) { }

  ngOnInit() {
    this.getCategoriesList();
  }

  private createCategoriesOptions() {
    var categoriesListOptions: SelectItem[] = [];
    for (var i = 0; i < this.categoriesList.length; i++) {
      categoriesListOptions.push({ label: this.categoriesList[i].item2 + " - " + this.categoriesList[i].item1, value: this.categoriesList[i].item2 })
    }
    this.categoriesListOptions = categoriesListOptions;
  }

  public getCategoriesList() {
    this.partsLookupService.getCategoriesList().subscribe(
      (categoriesList) => {
        this.categoriesList = categoriesList
        this.createCategoriesOptions();
      },
      (error) => {

      }
    )
  }

  public getPartsByCategory(category) {
    this.part = "";
    for (var i = 0; i < this.categoriesList.length; i++) {
      if (category == this.categoriesList[i].item2) {
        this.partCategoryTableHeader = this.categoriesList[i].item1;
      }
    }
    this.partsLookupService.getPartsByCategory(category).subscribe(
      (partsByCategory) => {
        this.partsByCategory = partsByCategory
        this.hidePartCategoryTable = true;
        this.hidePartInfoTable = false;
      },
      (error) => {

      }
    )
  }

  public msg: string = "";
  public showgetPartsInfoErrorDiv: boolean = false;
  public getPartsInfo(parts) {
    if (parts != undefined && parts == "") {
      this.showgetPartsInfoErrorDiv = true;
      this.msg = "Please enter part number/plan code";
    }
    this.part = parts;
    this.partsLookupService.getPartsInfo(parts).subscribe(
      (partInfoDatum) => {
        this.partInfoDatum = partInfoDatum
        this.hidePartCategoryTable = false;
        this.hidePartInfoTable = true;
      },
      (error) => {

      }
    )
  }

  public getPartsInfoAndCatogory(partNumber, incentiveSubCode) {
    this.partsLookupService.getPartsInfoAndCatogory(partNumber, incentiveSubCode).subscribe(
      (partInfoDatum) => {
        this.partInfoDatum = partInfoDatum
        this.hidePartCategoryTable = false;
        this.hidePartInfoTable = true;
      },
      (error) => {

      }
    )
  }
}




