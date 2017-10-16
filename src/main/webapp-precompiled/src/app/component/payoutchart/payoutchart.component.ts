import { Component, OnInit } from '@angular/core';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

import { PayoutChartService } from '../../services/payout-chart/payout-chart.service';
declare var $;
@Component({
    selector: 'app-payoutchart',
    templateUrl: './payoutchart.html',
    styleUrls: ['./payoutchart.component.css']
})
export class PayoutchartComponent implements OnInit {
    private payoutCMSObject: any;
    constructor(
        private payoutChartService: PayoutChartService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.parentZOZOTab();
        this.nestedZOZOTab();
        this.openCMSPage("PayoutChartHome");
        // this.getPayoutChartData();
    }
    private parentZOZOTab() {
        /* jQuery activation and setting options for parent tabs with id selector*/
        $("#tabbed-nav").zozoTabs({
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
            defaultTab: "tab2",
            orientation: "horizontal"
        });
    }
    private nestedZOZOTab() {
        /* jQuery activation and setting options for nested tabs with class selector*/
        $(".nested-tabs").zozoTabs({
            position: "top-left",
            theme: "red",
            style: "underlined",
            rounded: false,
            shadows: false,
            defaultTab: "tab1",
            animation: {
                easing: "easeInOutCirc",
                effects: "slideV"
            },
            size: "medium"
        });
    }

    private openCMSPage(pageName: string) {
        this.payoutChartService.getPayoutCMSPage(pageName).subscribe(
            (payoutCMSObject) => {
                this.payoutCMSObject = this.sanitizer.bypassSecurityTrustHtml(payoutCMSObject)
            },
            (error) => {
                alert("could not able to open cms content")
            }
        )
    }

    private payoutChartDatum: any = [
        {
            "tab": "HOME",
            "positionCode": "23",
            "programs": [
                {
                    "id": 3,
                    "image": "image.jpg",
                    "name": "Mopar Parts",
                    "managerLabel": "PARTS & SERVICE MANAGER OVERRIDE IS 20% ON ALL ABOVE ITEMS.",
                    "payouts": [
                        {
                            "name": "Transmissions/Trans Axles/T-Cases",
                            "value": 20,
                            "parts": [
                                "11111",
                                "22222",
                                "333333",
                                "444444"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tab": "MONTHLY",
            "positionCode": "23",
            "programs": [
                {
                    "id": 3,
                    "image": "image.jpg",
                    "name": "Mopar Parts",
                    "managerLabel": "PARTS & SERVICE MANAGER OVERRIDE IS 20% ON ALL ABOVE ITEMS.",
                    "payouts": [
                        {
                            "name": "Transmissions/Trans Axles/T-Cases",
                            "value": 20,
                            "parts": [
                                "11111",
                                "22222",
                                "333333",
                                "444444"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tab": "SERVICE ADVISORS",
            "positionCode": "23",
            "programs": [
                {
                    "id": 3,
                    "image": "image.jpg",
                    "name": "Mopar Parts",
                    "managerLabel": "PARTS & SERVICE MANAGER OVERRIDE IS 20% ON ALL ABOVE ITEMS.",
                    "payouts": [
                        {
                            "name": "Transmissions/Trans Axles/T-Cases",
                            "value": 20,
                            "parts": [
                                "11111",
                                "22222",
                                "333333",
                                "444444"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tab": "SERVICE Technicians",
            "positionCode": "23",
            "programs": [
                {
                    "id": 3,
                    "image": "image.jpg",
                    "name": "Mopar Parts",
                    "managerLabel": "PARTS & SERVICE MANAGER OVERRIDE IS 20% ON ALL ABOVE ITEMS.",
                    "payouts": [
                        {
                            "name": "Transmissions/Trans Axles/T-Cases",
                            "value": 20,
                            "parts": [
                                "11111",
                                "22222",
                                "333333",
                                "444444"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tab": "Parts ADVISORS",
            "positionCode": "23",
            "programs": [
                {
                    "id": 3,
                    "image": "image.jpg",
                    "name": "Mopar Parts",
                    "managerLabel": "PARTS & SERVICE MANAGER OVERRIDE IS 20% ON ALL ABOVE ITEMS.",
                    "payouts": [
                        {
                            "name": "Transmissions/Trans Axles/T-Cases",
                            "value": 20,
                            "parts": [
                                "11111",
                                "22222",
                                "333333",
                                "444444"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tab": "Sirius",
            "positionCode": "23",
            "programs": [
                {
                    "id": 3,
                    "image": "image.jpg",
                    "name": "Mopar Parts",
                    "managerLabel": "PARTS & SERVICE MANAGER OVERRIDE IS 20% ON ALL ABOVE ITEMS.",
                    "payouts": [
                        {
                            "name": "Transmissions/Trans Axles/T-Cases",
                            "value": 20,
                            "parts": [
                                "11111",
                                "22222",
                                "333333",
                                "444444"
                            ]
                        }
                    ]
                }
            ]
        }
    ];
    private getPayoutChartData() {
        this.payoutChartService.getPayoutChartData().subscribe(
            (payoutChartDatum) => {
                this.payoutChartDatum = (payoutChartDatum)
            },
            (error) => {
                alert("could not able to open cms content")
            }
        )
    }

}
