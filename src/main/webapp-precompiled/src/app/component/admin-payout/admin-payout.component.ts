
import { Component, OnInit, ViewChild, ElementRef, NgModule, Inject } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Message } from 'primeng/components/common/api';

//import { SafeHtml } from './safeHtml.pipe';
import { CMSService } from '../../services/cms-service/cms-service';
import '../../../assets/js/html2canvas.js';
import { AdminPayoutService } from '../../services/admin-payout/admin-payout-service';

import * as jsPDF from 'jspdf';
declare var html2canvas: any;
declare var $: any;
declare var moment: any;

@Component({
    selector: 'admin-payout',
    templateUrl: './admin-payout.html',
    //styleUrls: ['./admin-payout.css']
    // providers:[OpcodesetupService]
})


export class AdminPayoutComponent implements OnInit {
    uploadedFiles: any[] = [];
    private msgs: Message[];
    date: DateModel;
    options: DatePickerOptions;
    programs: any;
    selectedIncentives: string[] = [];
    programCategories: any = [];
    payoutMonth: string = "JUL";
    selectedIncentiveSubCodes: string[] = [];
    newCategory: any = {};
    selectedOpenIncentives: string[] = [];
    startDate: string = '';
    endDate: string = ''


    calendarOptions = {
        initialDate: new Date("07-01-2017")
    };

    @ViewChild('addCategory') addCategory: any;
    @ViewChild('addReward') addReward: any;
    @ViewChild('addPartNumber') addPartNumber: any;
    @ViewChild('overrideModal') overrideModal: any;
    @ViewChild('overrideRecordModal') overrideRecordModal: any;

    constructor(private modalService: NgbModal, private adminPayoutService: AdminPayoutService) {
        this.options = new DatePickerOptions();
    }

    ngOnInit() {
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

    openOverrideModal() {
        this.modalService.open(this.overrideModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openOverrideRecordModal() {
        this.modalService.open(this.overrideRecordModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    index: number = 0;

    openNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
        this.setDefaults();
    }

    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
        //this.setDefaults();
    }

    setDefaults() {
        if (this.index == 1) {
            this.selectedIncentives = [];
            this.getPrograms();
        }
        else if (this.index == 2) {
            this.programCategories = [];
            this.getCategories();
        }
    }

    selectProgramGroup(checked: boolean, program) {
        if (!program.selected) {
            if (checked)
                this.selectedOpenIncentives.push(program.incentiveId);
            else
                this.selectedOpenIncentives.splice(this.selectedOpenIncentives.indexOf(program.incentiveId), 1);
        }
    }

    getPrograms() {
        this.startDate = moment().month(this.payoutMonth).date(1).format('MMM D YYYY');
        this.endDate = moment().month(this.payoutMonth).endOf('month').format('MMM D YYYY');
        console.log("Incentive month selected:" + this.payoutMonth);
        this.adminPayoutService.getProgramsByMonth(this.payoutMonth).subscribe(
            (programs) => {
                this.programs = (programs);
                this.programs.forEach(program => {
                    if (program.selected) {
                        this.selectedIncentives.push(program.incentiveId.toString());
                    }
                });
            });
    }

    getCategories() {
        var $this = this;
        if (this.selectedOpenIncentives.length > 0) {
            this.selectedOpenIncentives.forEach(function (openIncentive) {
                $this.selectedIncentives.splice($this.selectedIncentives.indexOf(openIncentive), 1);
            });
        }
        console.log("selected incentives are:" + this.selectedIncentives);
        console.log("selected incentives are:" + this.selectedOpenIncentives);
        this.adminPayoutService.getCategoriesByIncentive(this.selectedIncentives, this.payoutMonth).subscribe(
            (programCategories) => {
                this.programCategories = (programCategories);
                if (this.programCategories.length > 0) {
                    if (this.selectedOpenIncentives.length > 0) {
                        this.adminPayoutService.getCategoriesByIncentive(this.selectedOpenIncentives, "NOMONTH").subscribe(
                            (openProgramCategories) => {
                                if (openProgramCategories.length > 0)
                                    Array.prototype.push.apply(this.programCategories, openProgramCategories);
                            });
                    }
                }
            });
    }

    addNewCategory() {
        var myArr = this.newCategory.programGroup.split(":");
        this.newCategory.programGroup = myArr[0];
        this.newCategory.incentiveId = myArr[1];
        console.log(this.newCategory);
        var categoryAddedWithinSelections = false;
        this.programCategories.forEach(programCategory => {
            if (programCategory.programGroup == this.newCategory.programGroup) {
                programCategory.categories.push(this.newCategory);
                categoryAddedWithinSelections = true;
            }
        });
        if (!categoryAddedWithinSelections) {
            this.programCategories.push({
                programGroup: this.newCategory.programGroup,
                categories: [this.newCategory]
            })
        }
    }

}
