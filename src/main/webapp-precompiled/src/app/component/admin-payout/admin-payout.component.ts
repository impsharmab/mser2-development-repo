
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
<<<<<<< HEAD
=======
    selectedIncentives: string[] = [];
    programCategories: any = [];
    payoutMonth: string = "JUL";
>>>>>>> 779a643e51f233ecc1a98cf77f993706e52362e6


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
<<<<<<< HEAD
        if (this.index == 1)
            this.getPrograms();
=======
        this.setDefaults();
    }

    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
        this.setDefaults();
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
>>>>>>> 779a643e51f233ecc1a98cf77f993706e52362e6
    }

    getPrograms() {
<<<<<<< HEAD
        console.log("Incentive month selected:" + $('#payout-month').val());
        this.adminPayoutService.getProgramsByMonth($('#payout-month').val()).subscribe(
            (programs) => { 
=======
        console.log("Incentive month selected:" + this.payoutMonth);
        this.adminPayoutService.getProgramsByMonth(this.payoutMonth).subscribe(
            (programs) => {
>>>>>>> 779a643e51f233ecc1a98cf77f993706e52362e6
                this.programs = (programs);
            });
    }

<<<<<<< HEAD
=======
    getCategories() {
        console.log("selected incentives are:" + this.selectedIncentives);
        this.adminPayoutService.getCategoriesByIncentive(this.selectedIncentives, this.payoutMonth).subscribe(
            (programCategories) => {
                this.programCategories = (programCategories);
            });
    }
>>>>>>> 779a643e51f233ecc1a98cf77f993706e52362e6

}
