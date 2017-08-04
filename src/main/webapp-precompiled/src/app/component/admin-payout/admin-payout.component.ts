import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
//import { SafeHtml } from './safeHtml.pipe';
import { CMSService } from '../../services/cms-service/cms-service'


declare let jsPDF;



@Component({
    selector: 'admin-payout',
    templateUrl: './admin-payout.html'
    // styleUrls: ['./admin-payout.css'],
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

    public download() {
        //START working code block
            var doc = new jsPDF();
            doc.text(20, 20, 'Hello world!');
            doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
            doc.addPage();
            doc.text(20, 20, 'Do you like that?');

            // Save the PDF
            doc.save('Test.pdf');
        //END working code block


        // //Create jsPDF object
        // var doc = new jsPDF();

        // // Create variable using the styled HTML on the Step 5 summary
        // var theDocument = document.getElementById('payout-chart-export');
        
        // //Initiate the PDF document download
        // doc.fromHTML(theDocument, 15, 15, {
        //     'width': 170
        // });

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
    openPDF(){
        
    }
}
