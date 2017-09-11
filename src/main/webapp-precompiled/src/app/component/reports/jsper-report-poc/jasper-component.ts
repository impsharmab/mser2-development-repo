import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { JasperService } from '../../../services/report/jasper-report-poc/jasper-service';

declare var $: any;

@Component({
    selector: 'jasper-poc',
//    templateUrl: './japer.html'
    templateUrl: './report-center.html',
    //styleUrls: ['../report-center.component.css'],
    host: {
        '(window:resize)': 'onResize($event)'
      }
})
export class JasperPocComponent implements OnInit {

    constructor(private jasperService: JasperService) { }

    /*
      squarify will take a block and make sure it is square, then apply styles to the icon and link heading
      to make sure they scale with the browser.  Make sure to call squarify in both the init and resize events
      so that it doesn't go all goofy when the user has to resize the browser.
     */
    private squarify() {
      var containerWidth= $("#report-center").find(".report-item-link").width();
      //adds two pixels to accommodate for the border
      containerWidth = containerWidth + 2;
      var iconSize = containerWidth * .6;
      var fontSize = containerWidth / 7;
      var headingHeight = containerWidth / 6;
      $("#report-center").find(".report").css("height", containerWidth + "px");
      $("#report-center").find(".report-icon").css("font-size", iconSize + "px");
      $("#report-center").find(".report-item-link").css("font-size", fontSize + "px");
      $("#report-center").find(".report-item-link span").css("height" + headingHeight + "px" );
    }

    ngOnInit() {
      this.squarify();
      //  this.getJasperReportData();
      /* jQuery activation and setting options for parent tabs with id selector*/
      $(".tabbed-nav").zozoTabs({
          rounded: false,
          multiline: true,
          theme: "white",
          size: "medium",
          responsive: true,
          animation: {
              effects: "slideH",
              easing: "easeInOutCirc",
              type: "jquery"
          },
          defaultTab: "tab1",
          orientation: "horizontal"
      });

    }



    onResize(event){
     this.squarify();
     //event.target.innerWidth; // window width
   }


    private getSelectedDealerCode() {

    }

    private jasperObject: any = {}
    private getJasperReportData() {

        this.jasperService.getJaperContent().subscribe(
            (jasperObject) => {
                this.jasperObject = (jasperObject)
                console.log(jasperObject);
            },
            (error) => {
            }
        )
    }



}
