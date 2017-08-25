
import { Component, OnInit, ViewChild, ElementRef, NgModule, Inject } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
//import { SafeHtml } from './safeHtml.pipe';
import { CMSService } from '../../services/cms-service/cms-service';
import '../../../assets/js/html2canvas.js';

import * as jsPDF from 'jspdf';
declare var html2canvas: any;

@Component({
    selector: 'admin-payout',
    templateUrl: './admin-payout.html',
    //styleUrls: ['./admin-payout.css']
    // providers:[OpcodesetupService]
})


export class AdminPayoutComponent implements OnInit {
    date: DateModel;
    options: DatePickerOptions;


    calendarOptions = {
        initialDate: new Date("07-01-2017")
    };

    @ViewChild('addCategory') addCategory: any;
    @ViewChild('addReward') addReward: any;
    @ViewChild('addPartNumber') addPartNumber: any;
    @ViewChild('overrideModal') overrideModal: any;
    @ViewChild('overrideRecordModal') overrideRecordModal: any;

    constructor(private modalService: NgbModal) {
        this.options = new DatePickerOptions();
    }

    ngOnInit() {

    }
        downloadPDF(id) {
          html2canvas(document.getElementById(id),{
            onrendered:function(canvas){

              var img=canvas.toDataURL("image/png");
              var doc = new jsPDF();
              doc.addImage(img,'JPEG',10,10);
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
    }

    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
    }


}
