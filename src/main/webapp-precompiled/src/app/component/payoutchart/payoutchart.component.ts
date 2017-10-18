import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private iconPartsModalData: any = [];
    constructor(
        private payoutChartService: PayoutChartService,
        private sanitizer: DomSanitizer,
        private chRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {

        this.openCMSPage("PayoutChartHome");
        // this.parentZOZOTab();
        // this.nestedZOZOTab();
        this.getPayoutChartData();
        // this.parentZOZOTab();
        // this.nestedZOZOTab();

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
        this.chRef.detectChanges();
        setTimeout(() => {
            this.nestedZOZOTab();
        }, 1000)
        // this.nestedZOZOTab();
    }
    private nestedZOZOTab() {
        /* jQuery activation and setting options for nested tabs with class selector*/
        // this.chRef.detectChanges();
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

    private showIconPartsModal(data) {
        if (data != undefined && data.parts.length > 0) {
            this.iconPartsModalData = data.parts;
        }

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

    private localPayoutChartDatum: any = [
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

    private servicePayoutData: any = [
        {
            "tap": "SERVICE ADVISOR",
            "positionCode": "23",
            "programs": [{
                "id": 0,
                "image": "",
                "name": "EXPRESS LANE",
                "managerLabel": "",
                "payouts": [{
                    "name": "Express Lane - Mopar Batteries",
                    "value": 2.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR PARTS & ENGINES",
                "managerLabel": "",
                "payouts": [{
                    "name": "MSER RECALL - N45",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "MSER RECALL - N46",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Tires",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Cabin Air Filters",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Rain Repellent (#68194881AA)",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "MSER OE Brake Pad Kits",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Mopar Engines",
                    "value": 15.0,
                    "parts": []
                }, {
                    "name": "Transmissions and T-Cases",
                    "value": 25.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MAGNETI MARELLI",
                "managerLabel": "",
                "payouts": [{
                    "name": "Magneti Marelli Rotors and Drums  ",
                    "value": 0.5,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Beam Blades",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Cabin Air Filters",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Radiators and Condensers",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Batteries",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Brake Pad Kit",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Tire Pressure Monitor System",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "MSER Magneti Marelli Reman Alternators",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "MSER Magneti Marelli Reman Starters",
                    "value": 2.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "UCONNECT",
                "managerLabel": "",
                "payouts": [{
                    "name": "UConnect-Service",
                    "value": 10.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": " USED VEHICLE MANAGER",
                "managerLabel": "",
                "payouts": [{
                    "name": "Used Recon - Bed Liners",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Cell Phone Hands Free Kit",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Batteries",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Beam Blades",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Brake Pad Kit",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Radiators and Condensers",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Rotors and Drums  ",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Tire Pressure Monitor System",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Water Pumps",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - OHTSU Tires (Set of 2)",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Spare Tire kits",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Tonneau Covers",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "UVM Magneti Marelli Reman Alternators",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "UVM Magneti Marelli Reman Starters",
                    "value": 10.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR ACCESSORIES",
                "managerLabel": "",
                "payouts": [{
                    "name": "Cell Phone Hands Free Kit",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Mopar Bedliner",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Tonneau Covers",
                    "value": 10.0,
                    "parts": []
                }]
            }]
        },
        {
            "tap": "SERVICE TECHNICIAN",
            "positionCode": "13",
            "programs": [{
                "id": 0,
                "image": "",
                "name": "EXPRESS LANE",
                "managerLabel": "",
                "payouts": [{
                    "name": "Express Lane - Mopar Batteries",
                    "value": 2.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR PARTS & ENGINES",
                "managerLabel": "",
                "payouts": [{
                    "name": "Tires",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Cabin Air Filters",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Rain Repellent (#68194881AA)",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "MSER OE Brake Pad Kits",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "MSER RECALL - N45",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "MSER RECALL - N46",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "N45-Inspected",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Transmissions and T-Cases",
                    "value": 20.0,
                    "parts": []
                }, {
                    "name": "Mopar Engines",
                    "value": 30.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MAGNETI MARELLI",
                "managerLabel": "",
                "payouts": [{
                    "name": "Magneti Marelli Rotors and Drums  ",
                    "value": 0.5,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Beam Blades",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Cabin Air Filters",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Radiators and Condensers",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Batteries",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Brake Pad Kit",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Tire Pressure Monitor System",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "MSER Magneti Marelli Reman Alternators",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "MSER Magneti Marelli Reman Starters",
                    "value": 2.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "UCONNECT",
                "managerLabel": "",
                "payouts": [{
                    "name": "UConnect-Service",
                    "value": 10.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": " USED VEHICLE MANAGER",
                "managerLabel": "",
                "payouts": [{
                    "name": "Used Recon - Magneti Marelli Beam Blades",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Radiators and Condensers",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Tire Pressure Monitor System",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Water Pumps",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "UVM Magneti Marelli Reman Alternators",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "UVM Magneti Marelli Reman Starters",
                    "value": 2.0,
                    "parts": []
                }, {
                    "name": "Used Recon - OHTSU Tires (Set of 2)",
                    "value": 2.5,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Batteries",
                    "value": 3.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Rotors and Drums  ",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Magneti Marelli Brake Pad Kit",
                    "value": 7.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Cell Phone Hands Free Kit",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Tonneau Covers",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Bed Liners",
                    "value": 20.0,
                    "parts": []
                }, {
                    "name": "Used Recon - Spare Tire kits",
                    "value": 20.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR ACCESSORIES",
                "managerLabel": "",
                "payouts": [{
                    "name": "Mopar Bedliner",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Cell Phone Hands Free Kit",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Tonneau Covers",
                    "value": 10.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR VEHICLE PROTECTION",
                "managerLabel": "",
                "payouts": [{
                    "name": "Essential Care Plans - $1-$99",
                    "value": 1.0,
                    "parts": []
                }, {
                    "name": "Essential Care Plans - $100-$149",
                    "value": 4.0,
                    "parts": []
                }, {
                    "name": "Convenience & Maintenance - September2017",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Essential Care Plans - $150-$199",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Essential Care Plans for Chapman",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Mopar Quik Care",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "MOPARGold MVP",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "MVP Road Ready",
                    "value": 5.0,
                    "parts": []
                }, {
                    "name": "Essential Care Plans - $200-$249",
                    "value": 6.0,
                    "parts": []
                }, {
                    "name": "Essential Care Plans - $250-$299",
                    "value": 7.0,
                    "parts": []
                }, {
                    "name": "Essential Care Plans - $300+",
                    "value": 8.0,
                    "parts": []
                }, {
                    "name": "Component Group Coverage Plans (Except DRIVE2 & COOLFUEL2)",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Pre-Owned Mechanical Plans (Standard & CPOV Upgrades)",
                    "value": 10.0,
                    "parts": []
                }, {
                    "name": "Auto Appearance Care Plans",
                    "value": 20.0,
                    "parts": []
                }, {
                    "name": "Road Hazard Tire & Wheel (excludes RHTW1N one year plan)",
                    "value": 20.0,
                    "parts": []
                }, {
                    "name": "2 Year Maximum Care Plus",
                    "value": 50.0,
                    "parts": []
                }]
            }]
        },
        {
            "tap": "PARTS ADVISOR",
            "positionCode": "08",
            "programs": [{
                "id": 0,
                "image": "",
                "name": "EXPRESS LANE",
                "managerLabel": "",
                "payouts": [{
                    "name": "Express Lane - Mopar Batteries",
                    "value": 0.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR PARTS & ENGINES",
                "managerLabel": "",
                "payouts": [{
                    "name": "Mopar Engines",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Tires",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Transmissions and T-Cases",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Cabin Air Filters",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "MSER OE Brake Pad Kits",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "MSER RECALL - N45",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "MSER RECALL - N46",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Rain Repellent (#68194881AA)",
                    "value": 0.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MAGNETI MARELLI",
                "managerLabel": "",
                "payouts": [{
                    "name": "Magneti Marelli Batteries",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Beam Blades",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Brake Pad Kit",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Cabin Air Filters",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Radiators and Condensers",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Rotors and Drums  ",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Magneti Marelli Tire Pressure Monitor System",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "MSER Magneti Marelli Reman Alternators",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "MSER Magneti Marelli Reman Starters",
                    "value": 0.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "UCONNECT",
                "managerLabel": "",
                "payouts": [{
                    "name": "UConnect-Service",
                    "value": 10.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "MOPAR ACCESSORIES",
                "managerLabel": "",
                "payouts": [{
                    "name": "Cell Phone Hands Free Kit",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Mopar Bedliner",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Tonneau Covers",
                    "value": 0.0,
                    "parts": []
                }]
            }, {
                "id": 0,
                "image": "",
                "name": "PARTS COUNTER",
                "managerLabel": "",
                "payouts": [{
                    "name": "Parts Counter - Cell Phone Hands Free Kit",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Freedom Wrench - 82215006",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Magneti Marelli Batteries",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Magneti Marelli Radiators and Condensers",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Magneti Marelli Reman Alternators",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Magneti Marelli Reman Starters",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Magneti Marelli Rotors and Drums",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Magneti Marelli Tire Pressure Monitor System",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Manager Override",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Rain Repelling Glass Treatment",
                    "value": 0.0,
                    "parts": []
                }, {
                    "name": "Parts Counter - Water Pumps",
                    "value": 0.0,
                    "parts": []
                }]
            }]
        }
    ]

    private payoutChartDatum: any;
    private getPayoutChartData() {
        this.payoutChartService.getPayoutChartData().subscribe(
            (payoutChartDatum) => {
                this.payoutChartDatum = (payoutChartDatum)
                // console.log(this.payoutChartDatum);
                // console.log(this.payoutChartDatum.length);
                this.chRef.detectChanges();
                // setTimeout(() => {
                this.parentZOZOTab();
                // this.nestedZOZOTab();
                // }, 1000)

            },
            (error) => {
                alert("could not get object")
            }
        )
    }

}
