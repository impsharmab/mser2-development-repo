import { element } from 'protractor';

import { Component, OnInit, ViewChild, ElementRef, NgModule, Inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Message } from 'primeng/components/common/api';

//import { SafeHtml } from './safeHtml.pipe';
import { CMSService } from '../../../services/cms-service/cms-service';
// import '../../../../assets/js/html2canvas.js';
import { AdminPayoutService } from '../../../services/admin-payout/admin-payout-service';
import { PayoutChartService } from '../../../services/payout-chart/payout-chart.service';

import * as jsPDF from 'jspdf';
// import * as html2Canvas from 'html2Canvas'
import { SelectItem } from 'primeng/primeng';
declare var html2canvas: any;
declare var $: any;
declare var moment: any;

@Component({
    selector: 'add-admin-payout',
    templateUrl: './add-admin-payout.html',
    //styleUrls: ['./admin-payout.css']
    // providers:[OpcodesetupService] 
})


export class AddNewAdminPayoutComponent implements OnInit {
    uploadedFiles: any[] = [];
    private msgs: Message[];
    date: DateModel;
    options: DatePickerOptions;
    programs: any[] = [];
    selectedIncentives: string[] = [];
    programCategories: any = [];
    selectedProgramCategories: any[] = [];
    payoutMonth: string;
    payoutCopyMonth: string;
    selectedIncentiveSubCodes: string[] = [];
    newCategory: any = {};
    selectedOpenIncentives: string[] = [];
    startDate: string = '';
    endDate: string = '';
    rewards: any[] = [];
    eligiblePositions: any[] = [];
    rewardTypeDd: SelectItem[] = [];
    quantityDd: SelectItem[] = [];
    overrideModalReward: any;
    selectedRewardForOverride: any;
    selectedRewardPosForOverride: any;
    selectedOverrideForOverride: any;
    tabContentLoaded: boolean = false;
    payoutMonths: SelectItem[] = [];
    payoutCopyMonths: SelectItem[] = [];
    private postData: any;
    programsDd: SelectItem[] = [];
    postInProgress: boolean;
    postSuccess: boolean;
    postAlert: boolean;
    onNextMsg: string;
    displayConsolidatedPDF: boolean = false;
    selectedIncentiveSubCodeId: any[] = [];

    calendarOptions = {
        initialDate: new Date("07-01-2017")
    };

    @ViewChild('addCategory') addCategory: any;
    @ViewChild('addReward') addReward: any;
    @ViewChild('addPartNumber') addPartNumber: any;
    @ViewChild('overrideModal') overrideModal: any;
    @ViewChild('overrideRecordModal') overrideRecordModal: any;

    constructor(
        private modalService: NgbModal,
        private adminPayoutService: AdminPayoutService,
        private payoutChartService: PayoutChartService,
        private chRef: ChangeDetectorRef) {
        this.options = new DatePickerOptions();
    }

    ngOnInit() {
        // this.payoutMonths = [
        //     {
        //         label: 'NOV-2017',
        //         value: 'NOV'
        //     },
        //     {
        //         label: 'DEC-2017',
        //         value: 'DEC'
        //     }
        // ];
        this.getPayoutDates();
        this.getNewPayoutDates();

        // this.payoutCopyMonths = [
        //     {
        //         label: 'SEP-2017',
        //         value: 'SEP'
        //     },
        //     {
        //         label: 'OCT-2017',
        //         value: 'OCT'
        //     }
        // ];

        this.postData = {
            incentiveSubCodes: []
        }
    }

    public parentZOZOTab() {
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
            defaultTab: "tab1",
            orientation: "horizontal"
        });
        this.chRef.detectChanges();
        setTimeout(() => {
            this.nestedZOZOTab();
        }, 1000)
        // this.nestedZOZOTab();
    }
    public nestedZOZOTab() {
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
    private payoutCopyMonthsData: any[] = [];
    private getPayoutDates() {
        this.adminPayoutService.getPayoutDates().subscribe(
            (payoutCopyMonthsData) => {
                this.payoutCopyMonthsData = (payoutCopyMonthsData);
                this.payoutCopyMonthsData.forEach(month => {
                    this.payoutCopyMonths.push({
                        label: month.name,
                        value: month.value
                    })
                });
            },
            (error) => {
            });
    }
    private payoutNewMonthsData: any[] = [];
    private getNewPayoutDates() {
        this.adminPayoutService.getNewPayoutDates().subscribe(
            (payoutNewMonthsData) => {
                this.payoutNewMonthsData = (payoutNewMonthsData);
                this.payoutNewMonthsData.forEach(month => {
                    this.payoutMonths.push({
                        label: month.name,
                        value: month.value
                    })
                });
            },
            (error) => {
            });
    }
    private onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
    downloadPDF(id) {
        html2canvas(document.getElementById(id), {
            onrendered: function (canvas) {
                var img = canvas.toDataURL("image/png");
                var doc = new jsPDF();
                doc.addImage(img, 'JPEG', 10, 10);
                doc.save('payoutChart.pdf');
            },
            width: 760
        });
    }

    // downloadPDF(quotes) {
    //     // var quotes = document.getElementById('container-fluid');
    //     html2canvas(quotes, {
    //         onrendered: function (canvas) {
    //             //! MAKE YOUR PDF
    //             var pdf = new jsPDF('p', 'pt', 'letter');
    //             for (var i = 0; i <= quotes.clientHeight / 980; i++) {
    //                 //! This is all just html2canvas stuff
    //                 var srcImg = canvas;
    //                 var sX = 0;
    //                 var sY = 980 * i; // start 980 pixels down for every new page
    //                 var sWidth = 900;
    //                 var sHeight = 980;
    //                 var dX = 0;
    //                 var dY = 0;
    //                 var dWidth = 900;
    //                 var dHeight = 980;

    //                 window.onePageCanvas = document.createElement("canvas");
    //                 onePageCanvas.setAttribute('width', 900);
    //                 onePageCanvas.setAttribute('height', 980);
    //                 var ctx = onePageCanvas.getContext('2d');
    //                 // details on this usage of this function: 
    //                 // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
    //                 ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

    //                 // document.body.appendChild(canvas);
    //                 var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

    //                 var width = onePageCanvas.width;
    //                 var height = onePageCanvas.clientHeight;

    //                 //! If we're on anything other than the first page,
    //                 // add another page
    //                 if (i > 0) {
    //                     pdf.addPage(); //8.5" x 11" in pts (in*72)
    //                 }
    //                 //! now we declare that we're working on that page
    //                 pdf.setPage(i + 1);
    //                 //! now we add content to that page!
    //                 // pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));

    //             }
    //             //! after the for loop is finished running, we save the pdf.
    //             pdf.save('Test.pdf');
    //         }
    //     });
    // }
    openCategoryModal() {
        this.newCategory = {
            incentiveSubCodeId: 0,
            programGroup: "",
            incentiveId: 0,
            incentiveSubCode: "",
            description: ""
        };
        this.modalService.open(this.addCategory).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openRewardModal() {
        this.modalService.open(this.addReward).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openPartNumberModal() {
        this.modalService.open(this.addPartNumber).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openOverrideModal(reward) {
        this.overrideModalReward = {
            sourcePosition: {},
            recipientPosition: {},
            overrideType: {}
        };
        this.selectedRewardForOverride = reward;
        $.extend(this.overrideModalReward, reward);
        this.overrideModalReward.overrideAction = 'Add';
        /* this.overrideModalReward = reward;
        this.overrideModalReward.overrideAction = 'Add';
        this.overrideModalReward.sourcePosition = {};
        this.overrideModalReward.recipientPosition = {};
        this.overrideModalReward.overrideType = {};
        this.overrideModalReward.overrideAmt = ''; */
        this.modalService.open(this.overrideModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openOverrideRecordModal(reward, rewardPosition, override) {
        this.overrideModalReward = {
            sourcePosition: {},
            recipientPosition: {},
            overrideType: {}
        };
        this.selectedRewardForOverride = reward;
        this.selectedRewardPosForOverride = rewardPosition;
        this.selectedOverrideForOverride = override;
        $.extend(this.overrideModalReward, reward);
        this.overrideModalReward.overrideAction = 'Update';
        $.extend(this.overrideModalReward.sourcePosition, this.selectedOverrideForOverride.sourcePosition);
        $.extend(this.overrideModalReward.recipientPosition, this.selectedOverrideForOverride.recipientPosition);
        $.extend(this.overrideModalReward.overrideType, this.selectedOverrideForOverride.overrideType);
        this.overrideModalReward.overrideAmt = this.selectedOverrideForOverride.overrideAmt;
        this.modalService.open(this.overrideModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }
    index: number = 0;
    openNext($event) {
        this.index = (this.index === 6) ? 0 : this.index + 1;
        if (this.validateOnNext(this.index, $event.currentTarget))
            this.setDefaults();
        else
            this.index -= 1;
    }
    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
        //this.setDefaults();
    }
    validateOnNext(step, ele) {
        this.onNextMsg = undefined;
        switch (step) {
            case 1:
                if (!this.payoutMonth) {
                    this.onNextMsg = "Please select a payout month";
                    return false;
                }
                else return true;
            case 2:
                if (this.selectedIncentives.length == 0) {
                    this.onNextMsg = "Please select at least 1 program to proceed";
                    return false;
                }
                else return true;
            case 3:
                if (this.selectedIncentiveSubCodes.length == 0) {
                    this.onNextMsg = "Please select at least 1 category to proceed";
                    return false;
                }
                else return true;
            case 4:
                if (this.rewards.length >= 1) {
                    var count = 0;
                    this.rewards.forEach(reward => {
                        if (reward.laborTypes.length == 0 || reward.quantity.quantityVal == undefined) {
                            count++;
                            debugger;
                        }
                        reward.rewardPositions.forEach(element => {
                            if ((element.position.description == null || element.position.description == undefined)
                                || (element.rewardAmount == "")
                                || (element.rewardType.description == null || element.rewardType.description == undefined)) {
                                count++;
                            }
                        });
                    })
                }
                if (count > 0) {
                    this.onNextMsg = "Please select all the required fields to proceed";
                    return false;
                }
                else return true;
            case 5:
                this.getFinalPayoutData();
                return true;
            default:
                return true;
        }
    }
    setDefaults() {
        if (this.index == 1) {
            this.selectedIncentives = [];
            this.getPrograms();
        }
        else if (this.index == 2) {
            this.programCategories = [];
            this.createprogramsDd();
            this.getCategories();
        }
        else if (this.index == 3) {
            this.rewards = [];
            this.selectedIncentiveSubCodeId = [];
            this.getRewards();
            if (this.payoutCopyMonth) {
                // this.getRewardsObjForCopyMonth();
                this.a();
            } else {
                this.getRewards();
            }

        }
        else if (this.index == 4) {
            this.gotoSummary();
        }
    }
    selectProgramGroup(checked: boolean, program) {
        if (!program.selected) {
            if (checked)
                this.selectedOpenIncentives.push(program.incentiveId);
            else
                this.selectedOpenIncentives.splice(this.selectedOpenIncentives.indexOf(program.incentiveId), 1);
        }
        // console.log(this.selectedOpenIncentives);
    }
    createprogramsDd() {
        var selectedPrograms: any[] = [];
        for (var i = 0; i < this.selectedIncentives.length; i++) {
            for (var j = 0; j < this.programs.length; j++) {
                if (this.selectedIncentives[i] == this.programs[j].incentiveId) {
                    selectedPrograms.push(this.programs[j]);
                }
            }
        }
        if (selectedPrograms.length > 0) {
            this.programsDd = this.converToDd(selectedPrograms, "programGroup");
        }

    }
    getPrograms() {
        this.tabContentLoaded = false;
        this.startDate = moment(new Date(this.payoutMonth)).format('MMM D, YYYY');
        this.endDate = moment(new Date(this.payoutMonth)).endOf('month').format('MMM D, YYYY');
        this.postData.startDate = moment(new Date(this.payoutMonth)).format('YYYY-MM-DD 00:00:00.000');
        this.postData.endDate = moment(new Date(this.payoutMonth)).endOf('month').format('YYYY-MM-DD 00:00:00.000');
        var param = this.payoutMonth;
        if (this.payoutCopyMonth) {
            param = this.payoutCopyMonth;
        }
        this.adminPayoutService.getProgramsByMonth(param).subscribe(
            (programs) => {
                this.programs = (programs);
                if (this.payoutCopyMonth) {
                    this.programs.forEach(program => {
                        if (program.selected) {
                            this.selectedIncentives.push(program.incentiveId.toString());
                        }
                    });
                }
                this.tabContentLoaded = true;
                // if (this.programs.length > 0)
                //     this.programsDd = this.converToDd(this.programs, "programGroup");
            });
    }
    getCategories() {
        this.tabContentLoaded = false;
        var $this = this;
        // remove any open incentives selected from Step-2 from the selected incentives list
        // as their categories need to be called separately
        if (this.payoutCopyMonth && this.selectedOpenIncentives.length > 0) {
            this.selectedOpenIncentives.forEach(openIncentive => {
                $this.selectedIncentives.splice($this.selectedIncentives.indexOf(openIncentive), 1);
            });
        }
        if (this.payoutCopyMonth) {
            // get the categories for selected incetives(both regular and open) one by one
            this.adminPayoutService.getCategoriesByIncentive(this.selectedIncentives, this.payoutCopyMonth).subscribe(
                (programCategories) => {
                    this.programCategories = (programCategories);
                    if (this.programCategories.length > 0) {
                        if (this.selectedOpenIncentives.length > 0) {
                            this.adminPayoutService.getCategoriesByIncentive(this.selectedOpenIncentives, "NOMONTH").subscribe(
                                (openProgramCategories) => {
                                    if (openProgramCategories.length > 0)
                                        $.merge(this.programCategories, openProgramCategories);
                                });
                        }
                        this.programCategories.forEach(programCat => {
                            for (var i = 0; i < programCat.categories.length; i++) {
                                if (programCat.categories[i].selected) {
                                    this.selectedIncentiveSubCodes.push(programCat.categories[i].incentiveSubCode.toString());
                                }
                            }
                        }
                        )

                        this.tabContentLoaded = true;
                        this.fixTabDisplayIE11();
                    }
                });
        }
        else {
            // get categories for a barnd new payout for selected programs.
            this.adminPayoutService.getCategoriesByIncentive(this.selectedIncentives, "NOMONTH").subscribe(
                (programCategories) => {
                    this.programCategories = programCategories;
                    this.tabContentLoaded = true;
                    this.fixTabDisplayIE11();
                });
        }
    }
    addNewCategory() {
        var categoryAddedWithinSelections = false;
        this.programCategories.forEach(programCategory => {
            if (programCategory.programGroup == this.newCategory.program.programGroup) {
                programCategory.categories.push(this.buildCategoryObj(this.newCategory));
                categoryAddedWithinSelections = true;
            }
        });
        // if the user added a category within a program not displayed on Step-3 Programs,
        // add the selected programs and the entered category under the new programs
        // and add them to the main list of programCategories
        if (!categoryAddedWithinSelections) {
            this.programCategories.push({
                programGroup: this.newCategory.program.programGroup,
                categories: [this.buildCategoryObj(this.newCategory)]
            })
        }
    }
    private buildCategoryObj(newCategory) {
        return {
            incentiveSubCodeId: 0,
            programGroupId: this.newCategory.program.programGroupId,
            programGroup: this.newCategory.program.programGroup,
            incentiveId: this.newCategory.program.incentiveId,
            incentiveSubCode: this.newCategory.incentiveSubCode,
            description: this.newCategory.description,
            note: this.newCategory.note
        };
    }

    rewardsObj: any = [];

    //     [
    //{
    //         "canOverride": true,
    //         "laborTypes": [],
    //         "overrideModalOptions": {
    //             "rewardPositionDd": [
    //                 {
    //                     "label": "Parts Manager (08)",
    //                     "value": {
    //                         "description": "Parts Manager (08)",
    //                         "positionCode": "08"
    //                     }
    //                 },
    //                 {
    //                     "label": "Service Advisor (13)",
    //                     "value": {
    //                         "description": "Service Advisor (13)",
    //                         "positionCode": "13"
    //                     }
    //                 }
    //             ]
    //         },
    //         "positionDd": [
    //             {
    //                 "label": "Parts Manager (08)",
    //                 "value": {
    //                     "description": "Parts Manager (08)",
    //                     "positionCode": "08"
    //                 }
    //             },
    //             {
    //                 "label": "Service Manager (09)",
    //                 "value": {
    //                     "description": "Service Manager (09)",
    //                     "positionCode": "09"
    //                 }
    //             },
    //             {
    //                 "label": "Service Advisor (13)",
    //                 "value": {
    //                     "description": "Service Advisor (13)",
    //                     "positionCode": "13"
    //                 }
    //             },
    //             {
    //                 "label": "Service Technician (23)",
    //                 "value": {
    //                     "description": "Service Technician (23)",
    //                     "positionCode": "23"
    //                 }
    //             }
    //         ],
    //         "programCategory": {
    //             "description": "EL",
    //             "incentiveId": 1001,
    //             "incentiveSubCode": "EL",
    //             "incentiveSubCodeId": 0,
    //             "note": null,
    //             "programGroup": "Mopar Service Excellence Rewards-Express Lane",
    //             "programGroupId": 1,
    //             "quantityId": null,
    //             "selected": false
    //         },
    //         "quantity": {
    //             "createdBy": "System",
    //             "createdDate": 1486674476387,
    //             "delFlag": "0",
    //             "description": "SET",
    //             "quantityID": "2",
    //             "quantityVal": "SET of 2",
    //             "updateDate": 1486674476387,
    //             "updatedBy": "System",
    //             "value": 2
    //         },
    //         "rewardPositions": [
    //             {
    //                 "position": {
    //                     "description": "Parts Manager (08)",
    //                     "positionCode": "08"
    //                 },
    //                 "rewardAmount": "14",
    //                 "rewardType": {
    //                     "createdBy": "Sai",
    //                     "createdDate": 1486394883153,
    //                     "delFlag": "N",
    //                     "description": "DOLLAR",
    //                     "rewardTypeID": 1,
    //                     "updateDate": null,
    //                     "updatedBy": null
    //                 },
    //                 "overrides": [{
    //                     "isOverride": true,
    //                     "note": "Parts Manager (08) : 32 POINTS to Service Advisor (13)",
    //                     "overrideAmt": "32",
    //                     "overrideType": {
    //                         "createdBy": "SAI",
    //                         "createdDate": 1501256357783,
    //                         "delFlag": "N",
    //                         "description": "POINTS",
    //                         "rewardTypeID": 3,
    //                         "updateDate": null,
    //                         "updatedBy": null
    //                     },
    //                     "recipientPosition": {
    //                         "positionCode": "13",
    //                         "description": "Service Advisor (13)"
    //                     },
    //                     "sourcePosition": {
    //                         "positionCode": "08",
    //                         "description": "Parts Manager (08)"
    //                     }
    //                 }]
    //             }
    //         ]
    //     },
    //     {
    //         "canOverride": true,
    //         "laborTypes": ["C"],
    //         "overrideModalOptions": {
    //             "rewardPositionDd": [
    //                 {
    //                     "label": "Parts Manager (08)",
    //                     "value": {
    //                         "description": "Parts Manager (08)",
    //                         "positionCode": "08"
    //                     }
    //                 },
    //                 {
    //                     "label": "Service Advisor (13)",
    //                     "value": {
    //                         "description": "Service Advisor (13)",
    //                         "positionCode": "13"
    //                     }
    //                 }
    //             ]
    //         },
    //         "positionDd": [
    //             {
    //                 "label": "Parts Manager (08)",
    //                 "value": {
    //                     "description": "Parts Manager (08)",
    //                     "positionCode": "08"
    //                 }
    //             },
    //             {
    //                 "label": "Service Manager (09)",
    //                 "value": {
    //                     "description": "Service Manager (09)",
    //                     "positionCode": "09"
    //                 }
    //             },
    //             {
    //                 "label": "Service Advisor (13)",
    //                 "value": {
    //                     "description": "Service Advisor (13)",
    //                     "positionCode": "13"
    //                 }
    //             },
    //             {
    //                 "label": "Service Technician (23)",
    //                 "value": {
    //                     "description": "Service Technician (23)",
    //                     "positionCode": "23"
    //                 }
    //             }
    //         ],
    //         "programCategory": {
    //             "description": "EL",
    //             "incentiveId": 1001,
    //             "incentiveSubCode": "EL",
    //             "incentiveSubCodeId": 0,
    //             "note": null,
    //             "programGroup": "Mopar Service Excellence Rewards-Express Lane",
    //             "programGroupId": 1,
    //             "quantityId": null,
    //             "selected": false
    //         },
    //         "quantity": {
    //             "createdBy": "System",
    //             "createdDate": 1486674476387,
    //             "delFlag": "0",
    //             "description": "SET",
    //             "quantityID": "2",
    //             "quantityVal": "SET of 2",
    //             "updateDate": 1486674476387,
    //             "updatedBy": "System",
    //             "value": 2
    //         },
    //         "rewardPositions": [
    //             {
    //                 "position": {
    //                     "description": "Parts Manager (08)",
    //                     "positionCode": "08"
    //                 },
    //                 "rewardAmount": "100",
    //                 "rewardType": {
    //                     "createdBy": "Sai",
    //                     "createdDate": 1486394883153,
    //                     "delFlag": "N",
    //                     "description": "DOLLAR",
    //                     "rewardTypeID": 1,
    //                     "updateDate": null,
    //                     "updatedBy": null
    //                 },
    //                 "overrides": [{
    //                     "isOverride": true,
    //                     "note": "Parts Manager (08) : 32 POINTS to Service Advisor (13)",
    //                     "overrideAmt": "32",
    //                     "overrideType": {
    //                         "createdBy": "SAI",
    //                         "createdDate": 1501256357783,
    //                         "delFlag": "N",
    //                         "description": "POINTS",
    //                         "rewardTypeID": 3,
    //                         "updateDate": null,
    //                         "updatedBy": null
    //                     },
    //                     "recipientPosition": {
    //                         "positionCode": "13",
    //                         "description": "Service Advisor (13)"
    //                     },
    //                     "sourcePosition": {
    //                         "positionCode": "08",
    //                         "description": "Parts Manager (08)"
    //                     }
    //                 }]
    //             }
    //         ]
    //     }

    // ]
    removeDuplicates(duplicateArray) {
        var cleanArray: any[] = [];
        for (var i = 0; i < duplicateArray.length; i++) {
            var push = true;
            for (var j = 0; j < cleanArray.length; j++) {
                if (cleanArray[j] === duplicateArray[i]) {
                    push = false;
                }
            }
            if (push == true) {
                cleanArray.push(duplicateArray[i]);
            }
        }
        return cleanArray;
    }
    rawRewardsObj: any = [];
    selectedCopyMonthProgramCategories: any[] = [];
    // getRewardsObjForCopyMonth() {
    //     var $this = this;
    //     this.selectedIncentiveSubCodeId = [];
    //     if ($this.selectedIncentiveSubCodes.length > 0) {
    //         $this.selectedIncentiveSubCodes.forEach(function (selectedIncentiveSubCode) {
    //             $this.programCategories.forEach(programCategory => {
    //                 programCategory.categories.forEach(element => {
    //                     if (element.incentiveSubCode == selectedIncentiveSubCode) {
    //                         $this.selectedIncentiveSubCodeId.push(element.incentiveSubCodeId);
    //                     }
    //                 });
    //             });
    //         })
    //     }

    //     this.adminPayoutService.getRewardsObjForCopyMonth(this.selectedIncentiveSubCodeId, this.payoutCopyMonth).subscribe(
    //         (rawRewardsObj) => {
    //             this.rawRewardsObj = (rawRewardsObj);
    //             // this.mergeCopymonthRewards();
    //             this.a();
    //         }
    //     )
    // }
    mergeCopymonthRewards() {
        this.tabContentLoaded = false;
        var $this = this;
        this.selectedProgramCategories = [];
        // selectedIncentiveSubCodes refers to the list of category IDs selected on Step-3
        // match the list against the programCategories  list from Step-3
        // and build a list of selected program categories
        if ($this.selectedIncentiveSubCodes.length > 0) {
            $this.selectedIncentiveSubCodes.forEach(function (selectedIncentiveSubCode) {
                $this.programCategories.forEach(programCategory => {
                    programCategory.categories.forEach(element => {
                        if (element.incentiveSubCode == selectedIncentiveSubCode) {
                            $this.selectedProgramCategories.push(element);
                        }
                    });
                });
            })
        }

        // if (this.payoutCopyMonth) {
        //     this.getRewardsObjForCopyMonth();
        // }
        // For Step-4 we need a list of eligible positions per category per program 
        // and positions are tied to a program so build a list of selected programs per category 
        // and send it to the server to get a list of positions per program. Build rewards list per program thereafter
        if (this.selectedProgramCategories.length > 0) {
            var selectedProgramGroupIds: string[] = [];
            this.selectedProgramCategories.forEach(function (element) {
                if (selectedProgramGroupIds.indexOf(element.programGroupId) == -1)
                    selectedProgramGroupIds.push(element.programGroupId);
            });
            if (selectedProgramGroupIds.length > 0) {
                this.adminPayoutService.getEligiblePositions(selectedProgramGroupIds).subscribe(
                    (eligiblePositions) => {
                        this.eligiblePositions = eligiblePositions;
                        this.adminPayoutService.getRewardTypes().subscribe((rewardTypes) => {
                            this.rewardTypeDd = this.converToDd(rewardTypes, 'description');
                            this.adminPayoutService.getQuantities().subscribe((quantities) => {
                                this.quantityDd = this.converToDd(quantities, 'quantityVal');
                                this.selectedProgramCategories.forEach(element => {
                                    var positionDd = this.converToDd(this.getPositionsByProgramLocal(element.programGroupId), 'description');

                                    // this.rewards.push({
                                    //     positionDd: positionDd,
                                    //     programCategory: element,
                                    //     rewardPositions: [{
                                    //         position: {},
                                    //         rewardAmount: "",
                                    //         rewardType: {}
                                    //     }],
                                    //     overrideModalOptions: {
                                    //         rewardPositionDd: []
                                    //     },
                                    //     laborTypes: [],
                                    //     quantity: {}
                                    // });




                                });
                                this.tabContentLoaded = true;
                                this.fixTabDisplayIE11();
                            });
                        });
                    });
            }
        }
    }

    a() {
        var $this = this;
        var rewardsObject: any = {};
        this.selectedIncentiveSubCodeId = [];
        if ($this.selectedIncentiveSubCodes.length > 0) {
            $this.selectedIncentiveSubCodes.forEach(function (selectedIncentiveSubCode) {
                $this.programCategories.forEach(programCategory => {
                    programCategory.categories.forEach(element => {
                        if (element.incentiveSubCode == selectedIncentiveSubCode) {
                            $this.selectedIncentiveSubCodeId.push(element.incentiveSubCodeId);
                        }
                    });
                });
            })
        }

        this.selectedCopyMonthProgramCategories = [];
        // selectedIncentiveSubCodes refers to the list of category IDs selected on Step-3
        // match the list against the programCategories  list from Step-3
        // and build a list of selected program categories
        if ($this.selectedIncentiveSubCodes.length > 0) {
            $this.selectedIncentiveSubCodes.forEach(function (selectedIncentiveSubCode) {
                $this.programCategories.forEach(programCategory => {
                    programCategory.categories.forEach(element => {
                        if (element.incentiveSubCode == selectedIncentiveSubCode) {
                            $this.selectedCopyMonthProgramCategories.push(element);
                        }
                    });
                });
            })
        }
        // rewardsObject.incentives = this.selectedIncentiveSubCodeId;
        // rewardsObject.incentiveSubCodes = this.selectedIncentiveSubCodes;
        this.adminPayoutService.getRewardsObjForCopyMonth(this.selectedIncentiveSubCodeId, this.payoutCopyMonth).subscribe(
            (rawRewardsObj) => {
                this.rawRewardsObj = (rawRewardsObj);
                this.getQuantitiesForCopyMonth();

            }
        )

    }
    quantitiesForCopyMonth: any = [];
    getQuantitiesForCopyMonth() {
        this.adminPayoutService.getQuantities().subscribe((quantities) => {
            this.quantitiesForCopyMonth = (quantities);
            this.getRewardTypes();

        }
        )
    }

    rewardTypes: any = [];
    getRewardTypes() {
        this.adminPayoutService.getRewardTypes().subscribe((rewardTypes) => {
            this.rewardTypes = (rewardTypes);
            this.createRewardsObjForCopyMonth();
        }
        )
    }
    createRewardsObjForCopyMonth() {
        this.rawRewardsObj.forEach(element => {
            element.programCategory = {};
            this.selectedCopyMonthProgramCategories.forEach(item => {
                var csss;
                if (element.incentiveID == item.incentiveId) {
                    element.programCategory = item;
                }
            })
        });
        this.rawRewardsObj.forEach(element => {
            var positionDd = this.converToDd(this.getPositionsByProgramLocal(element.programCategory.programGroupId), 'description');
            element.positionDd = positionDd;
        });

        this.quantitiesForCopyMonth.forEach(quantity => {
            this.rawRewardsObj.forEach(element => {
                element.laborType = [];
                element.rewardPositions = [];
                if (element.quantityID == quantity.quantityID) {
                    element.quantity = quantity;
                }
            }
            )

        }
        )
        this.rawRewardsObj.forEach(element => {
            element.overrideModalOptions = {};
            element.overrideModalOptions.rewardPositionDd = element.positionDd;
            element.canOverride = false;

            element.incentiveRewards.forEach(reward => {
                if (reward.isOverrideReward == "Y") {
                    element.canOverride = true;
                }

                element.laborType.push(reward.laborType);
                element.laborType = this.removeDuplicates(element.laborType);

                // if (element.rewardPositions == undefined || element.rewardPositions.length == 0) {
                //     element.rewardPositions = [];
                // }

            });


        });
        this.rawRewardsObj.forEach(element => {
            var rpObj: any = {};
            rpObj.position = {};
            rpObj.rewardAmount = "";
            rpObj.rewardType = {};
            rpObj.overrides = [];
            rpObj.incentiveSubCodeID = 0;

            element.incentiveRewards.forEach(incentiveR => {
                if (incentiveR.isOverrideReward == "N") {
                    // rpObj.overrides.push({
                    //     "isOverride": true,
                    //     "overrideAmt": 0,
                    //     "overrideType": {},
                    //     "recipientPosition": {},
                    //     "sourcePosition": {},
                    //     "note": ""
                    // })
                    element.positionDd.forEach(positiondd => {
                        if (positiondd.value.positionCode == incentiveR.positionCode) {
                            rpObj.position = positiondd.value;
                            rpObj.rewardAmount = incentiveR.rewardValue;
                            rpObj.incentiveSubCodeID = incentiveR.incentiveSubCodeID;
                        }
                    });
                    //rewardtypes ajax call then do exactly like quantity 
                    this.rewardTypes.forEach(rewardTypesObj => {
                        rpObj.rewardType == rewardTypesObj;
                    });
                }

            });
            element.rewardPositions.push(rpObj);
        })

        this.rawRewardsObj.forEach(element => {
            element.incentiveRewards.forEach(incentiveR => {
                if (incentiveR.isOverrideReward == "Y") {

                    element.rewardPositions.forEach(rewardsPos => {
                        if (rewardsPos.incentiveSubCodeID == incentiveR.incentiveSubCodeID) {
                            var overrideObj: any = {};
                            overrideObj.isOverride = true;
                            overrideObj.overrideAmt = incentiveR.rewardValue;
                            overrideObj.overrideType = {};
                            overrideObj.recipientPosition = {};
                            overrideObj.sourcePosition = {};
                            overrideObj.note = "";

                            this.rewardTypes.forEach(rewardTypesObj => {
                                overrideObj.overrideType = rewardTypesObj;
                            });

                            element.positionDd.forEach(positiondd => {
                                if (rewardsPos.position.positionCode == positiondd.value.positionCode) {
                                    overrideObj.recipientPosition = positiondd.value;
                                    overrideObj.sourcePosition = rewardsPos.position;

                                    overrideObj.note = overrideObj.sourcePosition.description + " : "
                                        + overrideObj.overrideAmt + " " + overrideObj.overrideType.description + " to " +
                                        overrideObj.recipientPosition.description;
                                }

                            });

                        }
                        rewardsPos.overrides.push(overrideObj);

                    });
                }
            });
        })

        this.rawRewardsObj.forEach(element => {
            element.rewardPositions.forEach(rewardPos => {
                if (rewardPos.overrides.length > 0) {
                    rewardPos.canOverride = true;
                }
            });
        }
        )


        for (var i = 0; i < this.rewards.length; i++) {
            for (var j = 0; j < this.rawRewardsObj.length; j++) {
                if (i == j) {
                    this.rewards[i]["positionDd"] = this.rawRewardsObj[j].positionDd;
                    this.rewards[i]["programCategory"] = this.rawRewardsObj[j].programCategory;
                    this.rewards[i]["quantity"] = this.rawRewardsObj[j].quantity;
                    this.rewards[i]["rewardPositions"] = this.rawRewardsObj[j].rewardPositions;
                    this.rewards[i]["overrideModalOptions"] = this.rawRewardsObj[j].overrideModalOptions;
                    this.rewards[i]["laborTypes"] = this.rawRewardsObj[j].laborTypes;
                }
            }

        }

        console.log(this.rewards);
        console.log(this.rawRewardsObj);
        var count = 0
        this.rewards.forEach(rew => {
            rew.rewardPositions.forEach(ele => {
                count++;
                if (ele.overrides == undefined) {
                    alert(count);
                }

            });
        })
        console.log(count);
    }
    getRewards() {
        this.tabContentLoaded = false;
        var $this = this;
        this.selectedProgramCategories = [];
        // selectedIncentiveSubCodes refers to the list of category IDs selected on Step-3
        // match the list against the programCategories  list from Step-3
        // and build a list of selected program categories
        if ($this.selectedIncentiveSubCodes.length > 0) {
            $this.selectedIncentiveSubCodes.forEach(function (selectedIncentiveSubCode) {
                $this.programCategories.forEach(programCategory => {
                    programCategory.categories.forEach(element => {
                        if (element.incentiveSubCode == selectedIncentiveSubCode) {
                            $this.selectedProgramCategories.push(element);
                        }
                    });
                });
            })
        }



        // if (this.payoutCopyMonth) {
        //     this.getRewardsObjForCopyMonth();
        // }
        // For Step-4 we need a list of eligible positions per category per program 
        // and positions are tied to a program so build a list of selected programs per category 
        // and send it to the server to get a list of positions per program. Build rewards list per program thereafter
        if (this.selectedProgramCategories.length > 0) {
            var selectedProgramGroupIds: string[] = [];
            this.selectedProgramCategories.forEach(function (element) {
                if (selectedProgramGroupIds.indexOf(element.programGroupId) == -1)
                    selectedProgramGroupIds.push(element.programGroupId);
            });
            if (selectedProgramGroupIds.length > 0) {
                this.adminPayoutService.getEligiblePositions(selectedProgramGroupIds).subscribe(
                    (eligiblePositions) => {
                        this.eligiblePositions = eligiblePositions;
                        this.adminPayoutService.getRewardTypes().subscribe((rewardTypes) => {
                            this.rewardTypeDd = this.converToDd(rewardTypes, 'description');
                            this.adminPayoutService.getQuantities().subscribe((quantities) => {
                                this.quantityDd = this.converToDd(quantities, 'quantityVal');
                                this.selectedProgramCategories.forEach(element => {
                                    var positionDd = this.converToDd(this.getPositionsByProgramLocal(element.programGroupId), 'description');
                                    this.rewards.push({
                                        positionDd: positionDd,
                                        programCategory: element,
                                        rewardPositions: [{
                                            position: {},
                                            rewardAmount: "",
                                            rewardType: {}
                                        }],
                                        overrideModalOptions: {
                                            rewardPositionDd: []
                                        },
                                        laborTypes: [],
                                        quantity: {}
                                    });
                                    // if (this.payoutCopyMonth) {
                                    //     for (var i = 0; i < this.rewards.length; i++) {
                                    //         for (var j = 0; j < this.rewardsObj.length; j++) {
                                    //             if (i == j) {
                                    //                 this.rewards[i]["positionDd"] = this.rewardsObj[j].positionDd;
                                    //                 $.extend(this.rewards[i]["programCategory"], this.rewardsObj[j].programCategory);
                                    //                 $.extend(this.rewards[i]["quantity"], this.rewardsObj[j].quantity);
                                    //                 this.rewards[i]["rewardPositions"] = this.rewardsObj[j].rewardPositions;
                                    //                 $.extend(this.rewards[i]["overrideModalOptions"], this.rewardsObj[j].overrideModalOptions);
                                    //                 this.rewards[i]["laborTypes"] = this.rewardsObj[j].laborTypes;
                                    //             }

                                    //         }
                                    //     }
                                    // }
                                });
                                this.tabContentLoaded = true;
                                this.fixTabDisplayIE11();
                            });
                        });
                    });
            }
        }
    }

    onChangeRewardPosition(reward) {
        this.setRewardOverrideModalOptions(reward);
    }

    setRewardOverrideModalOptions(reward) {
        reward.overrideModalOptions.rewardPositionDd = [];
        reward.overrideModalOptions.rewardPositionDd = reward.positionDd;
        // reward.rewardPositions.forEach(element => {
        //     if (element.position.positionCode)
        //         reward.overrideModalOptions.rewardPositionDd.push({
        //             label: element.position.description,
        //             value: element.position
        //         });
        // });
        if (reward.overrideModalOptions.rewardPositionDd.length > 1)
            reward.canOverride = true;
        else
            reward.canOverride = false;
    }

    gotoSummary() {
        this.postData.incentiveSubCodes = [];
        this.rewards.forEach(reward => {
            this.postData.incentiveSubCodes.push({
                incentiveID: reward.programCategory.incentiveId,
                incentiveSubCode: reward.programCategory.incentiveSubCode,
                description: reward.programCategory.description,
                quantityID: reward.quantity.quantityID,
                note: reward.programCategory.note,
                incentiveRewards: this.buildIncentiveRewards(reward)
            })
        });
        // console.log(this.postData);
    }

    private buildIncentiveRewards(reward) {
        var incentiveRewards: any[] = [];
        reward.rewardPositions.forEach(rewardPos => {
            if (reward.laborTypes.length == 1) {
                $.merge(incentiveRewards, this.buildIncentiveRewardsByLaborType(reward, rewardPos, reward.laborTypes[0]))
            }
            else {
                reward.laborTypes.forEach(laborType => {
                    $.merge(incentiveRewards, this.buildIncentiveRewardsByLaborType(reward, rewardPos, laborType));
                });
            }
        });
        return incentiveRewards;
    }

    private buildIncentiveRewardsByLaborType(reward, rewardPos, laborType) {
        var incentiveRewards: any[] = [];
        if (!rewardPos.overrides) {
            incentiveRewards.push({
                incentiveID: reward.programCategory.incentiveId,
                positionCode: rewardPos.position.positionCode,
                rewardTypeID: rewardPos.rewardType.rewardTypeID,
                rewardValue: rewardPos.rewardAmount,
                overridePercentage: '0',
                laborType: laborType,
                isOverrideReward: 'N'
            })
        }
        else if (rewardPos.overrides.length == 1) {
            incentiveRewards.push({
                incentiveID: reward.programCategory.incentiveId,
                positionCode: rewardPos.position.positionCode,
                rewardTypeID: rewardPos.rewardType.rewardTypeID,
                rewardValue: rewardPos.rewardType.rewardTypeID == '1' ? rewardPos.rewardAmount : '0',
                overridePercentage: rewardPos.rewardType.rewardTypeID == '2' ? rewardPos.rewardAmount : '0',
                laborType: laborType,
                isOverrideReward: rewardPos.overrides.length > 0 ? 'Y' : 'N'
            });
        }
        else {
            rewardPos.overrides.forEach(override => {
                incentiveRewards.push({
                    incentiveID: reward.programCategory.incentiveId,
                    positionCode: rewardPos.position.positionCode,
                    rewardTypeID: override.overrideType.rewardTypeID,
                    rewardValue: override.overrideType.rewardTypeID == '1' ? override.overrideAmt : '0',
                    overridePercentage: override.overrideType.rewardTypeID == '2' ? override.overrideAmt : '0',
                    laborType: laborType,
                    isOverrideReward: rewardPos.overrides.length > 0 ? 'Y' : 'N'
                })
            });
        }
        return incentiveRewards;
    }

    saveUpdates() {
        this.postInProgress = true;
        // console.log(this.postData);
        this.adminPayoutService.postRewardData(this.postData).subscribe((response) => {
            this.postInProgress = false;
            if (response.success)
                this.postSuccess = true;
            else this.postSuccess = false
            this.postAlert = true;
            // console.log(response);
        })
    }
    finalPayoutChartDatum: any;
    finalPDFLoaded: boolean = false;
    getFinalPayoutData() {
        this.adminPayoutService.getFinalPayoutData(this.payoutMonth).subscribe(
            (payoutChartDatum) => {
                this.finalPayoutChartDatum = (payoutChartDatum)
                this.finalPDFLoaded = true;
                this.chRef.detectChanges();
                this.parentZOZOTab();
            },
            (error) => {
                this.finalPDFLoaded = true;
            }
        )
    }
    converToDd(list: any[], labelField: string) {
        var dD: SelectItem[] = [];
        list.forEach(element => {
            dD.push({
                label: element[labelField],
                value: element
            })
        });
        return dD;
    }
    getPositionsByProgramLocal(programGroupId) {
        for (let position of this.eligiblePositions) {
            if (position.programGroupId == programGroupId) {
                return position.positions;
            }
        }
    }
    addRewardPosRec(reward) {
        if (reward.rewardPositions.length < reward.positionDd.length) {
            reward.rewardPositions.push({
                position: {},
                rewardAmount: "",
                rewardType: {}
            });
        }
        this.setRewardOverrideModalOptions(reward);
    }
    removeRewardPosRec(reward, indexToDel) {
        reward.rewardPositions.splice(indexToDel, 1);
        this.setRewardOverrideModalOptions(reward);
    }
    setActionState() {
        if (this.overrideModalReward.sourcePosition && this.overrideModalReward.recipientPosition
            && this.overrideModalReward.overrideType && this.overrideModalReward.overrideAmt
            && this.overrideModalReward.overrideAmt.length > 0) {
            for (let rewardPos of this.selectedRewardForOverride.rewardPositions) {
                if (rewardPos.position.positionCode == this.overrideModalReward.sourcePosition.positionCode) {
                    var rewardDesc = this.getRewardDesc(this.overrideModalReward.overrideType.description,
                        this.overrideModalReward.overrideAmt);
                    this.overrideModalReward.rewardDesc = this.overrideModalReward.overrideType.description + " " +
                        rewardDesc + " per " + this.selectedRewardForOverride.quantity.quantityVal;
                    break;
                }
            }
            this.overrideModalReward.actionState = true;
        }
        else
            this.overrideModalReward.actionState = false;
    }
    addUpdateOverride(action) {
        if (action == 'Add')
            this.addOverride();
        if (action == 'Update')
            this.updateOverride();
    }
    addOverride() {
        for (let rewardPosition of this.overrideModalReward.rewardPositions) {
            if (rewardPosition.position.positionCode == this.overrideModalReward.recipientPosition.positionCode) {
                if (!rewardPosition.overrides)
                    rewardPosition.overrides = [];
                var overrideObj = this.buildOverrideObj(this.overrideModalReward);
                rewardPosition.overrides.push(overrideObj);
                // if (rewardPosition.overrides.length == 1) {
                //     rewardPosition.rewardType = overrideObj.overrideType;
                //     rewardPosition.rewardAmount = overrideObj.overrideAmt;
                // }
                // else {
                //     rewardPosition.rewardType = {};
                //     rewardPosition.rewardAmount = "";
                // }
            }
        }
        $.extend(this.selectedRewardForOverride.rewardPositions, this.overrideModalReward.rewardPositions);
    }
    updateOverride() {
        var updatedSourcePosCode = this.overrideModalReward.sourcePosition.positionCode;
        var updatedRecipientPosCode = this.overrideModalReward.recipientPosition.positionCode;
        if (updatedSourcePosCode != this.selectedOverrideForOverride.sourcePosition.positionCode ||
            updatedRecipientPosCode != this.selectedOverrideForOverride.recipientPosition.positionCode) {
            this.selectedRewardPosForOverride.overrides.
                splice(this.selectedRewardPosForOverride.overrides.indexOf(this.selectedOverrideForOverride), 1);
            this.addOverride();
        } else {
            this.selectedOverrideForOverride.overrideType = this.overrideModalReward.overrideType;
            this.selectedOverrideForOverride.overrideAmt = this.overrideModalReward.overrideAmt;
            this.selectedOverrideForOverride.note = this.setOverrideNote(this.overrideModalReward);
            // this.selectedRewardPosForOverride.rewardType = this.overrideModalReward.overrideType;
            // this.selectedRewardPosForOverride.rewardAmount = this.overrideModalReward.overrideAmt;
        }
    }
    buildOverrideObj(overrideModalReward) {
        return {
            isOverride: true,
            sourcePosition: overrideModalReward.sourcePosition,
            recipientPosition: overrideModalReward.recipientPosition,
            overrideType: overrideModalReward.overrideType,
            overrideAmt: overrideModalReward.overrideAmt,
            note: this.setOverrideNote(overrideModalReward)
        }
    }
    setOverrideNote(overrideModalReward) {
        var rewardDesc = this.getRewardDesc(overrideModalReward.overrideType.description,
            overrideModalReward.overrideAmt);
        return overrideModalReward.sourcePosition.description + " : " + rewardDesc
            + " to " + overrideModalReward.recipientPosition.description;
    }
    getRewardDesc(description, amt) {
        switch (description) {
            case 'DOLLAR':
                return '$' + amt;
            case 'PERCENT':
                return amt + '%';
            default:
                return amt + ' ' + description;
        }
    }
    trackProgram(index, program) {
        return program ? program.incentiveId : undefined;
    }

    trackCategory(index, category) {
        return category ? category.programGroup : undefined;
    }

    trackReward(index, reward) {
        return reward ? reward.programGroupId : undefined;
    }

    trackPosition(index, position) {
        return position ? position.positionCode : undefined;
    }

    trackOverride(index, override) {
        return override ? override.sourcePosition.positionCode : undefined;
    }

    fixTabDisplayIE11() {
        if (navigator.userAgent.indexOf("rv:11") != -1)
            window.setTimeout($('li.ui-tabview-selected>a>span.ui-tabview-title').click(), 100);
    }

}
