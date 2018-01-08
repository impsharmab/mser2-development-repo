import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

import { SelectItem } from 'primeng/primeng';

import * as userMatrix from '../../../../global-variable/user-matrix';
import * as reportServiceUrl from '../../../../global-variable/service-url';


import { ReportService } from '../../../../services/report/report-service';
declare var $: any;

@Component({
    selector: 'rejected-invoice-report-report',
    templateUrl: './rejected-invoice-report.html',
    // styleUrls: ['./UCONNavigationActivation-report.component.css']
})
export class RejectedInvoiceReportComponent implements OnInit {

    public selectedRole: any;
    public isAdminUser: boolean = false;
    public isExecutiveUser: boolean = false;
    public isBCUser: boolean = false;
    public isDistrictUser: boolean = false;
    public isDealerUser: boolean = false;
    public isManagerUser: boolean = false;
    public isParticipantUser: boolean = false;

    public src: any;

    public minDate: Date;
    public maxDate: Date;

    public selectedPositionCode: string = "";

    public selectedDC: string = "";
    public inputNotes: string = "";
    public fromDate: any = "";
    public toDate: any = "";
    public from: any = "";
    public to: any = "";

    public dealerCodeNotBelongsToThisBCOrDist: string = "";
    public msg: string = "";

    public transactionTypeOptions: SelectItem[] = [
        { label: "I", value: "I" },
        { label: "R", value: "R" },
        { label: "W", value: "W" }
    ];
    public d2dIndicatorOptions: SelectItem[] = [{ label: "0", value: "0" }, { label: "1", value: "1" }];

    public displaycontinueCancelRejectedInvoiceDialog: boolean = false;
    public displaycontinueSaveRejectedInvoiceDialog: boolean = false;
    public displayEDITRejectedInvoiceDialog: boolean = false;
    public postSaveInProgress: boolean = false;

    constructor(private domSanitizer: DomSanitizer, private reportService: ReportService, private chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.selectedPositionCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedPositionCode;
        var d = new Date;
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.from = (d.getMonth() + 1) + "/1/" + new Date().getFullYear();
        this.to = (d.getMonth() + 1) + "/" + lastDayOfMonth.getDate() + "/" + new Date().getFullYear();

        this.fromDate = this.from;
        this.toDate = this.to;
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setMonth(0);
        this.minDate.setDate(1);
        this.minDate.setFullYear(today.getFullYear() - 1);
        this.maxDate.setMonth(d.getMonth());
        this.maxDate.setFullYear(today.getFullYear());
        this.maxDate.setDate(lastDayOfMonth.getDate());

        this.checkRole();
    }


    public checkRole() {
        this.isAdminUser = JSON.parse(sessionStorage.getItem("selectedCodeData")).isAdmin;
        this.selectedRole = JSON.parse(sessionStorage.getItem("selectedCodeData")).role;
        if (this.isAdminUser) {
            this.isExecutiveUser = true;
        } else if (this.selectedRole == 1) {
            this.isExecutiveUser = true;
        } else if (this.selectedRole == 12) {
            var BC = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.isBCUser = true;
        } else if (this.selectedRole == 11) {
            this.isDistrictUser = true;
            var DIST = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        } else if (this.selectedRole == 10 || this.selectedRole == 5) {
            var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
            this.isDealerUser = true;
        } else if (this.selectedRole == 6 || this.selectedRole == 9) {
            this.isParticipantUser = true;
        }


    }

    public rejectedInvoiceDatum: any = [];
    public showRejectedInvoiceDatatable: boolean = false;
    public getRejectedInvoiceData() {
        var TERRITORY = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.reportService.getRejectedInvoiceData(this.selectedDC, this.fromDate, this.toDate).subscribe(
            (rejectedInvoiceDatum) => {
                this.rejectedInvoiceDatum = (rejectedInvoiceDatum)
                this.showRejectedInvoiceDatatable = true;
            },
            (error) => {

            }
        )
    }


    public editRejectedInvoiceDatum: any = {
        "description": null,
        "transactionType": "",
        "statusCode": "",
        "saleQuantity": 0,
        "d2DIndicator": "",
        "exceptionCode": "",
        "saleType": "",
        "partNumber": "",
        "invoiceNumber": "",
        "invoiceDate": ""
    };
    public onRowSelect(event) {
        this.saveErrorMsg = "";
        this.saveMsg = "";
        this.editRejectedInvoiceDatum = event.data;
        this.chRef.detectChanges();
        this.displayEDITRejectedInvoiceDialog = true;
    }

    public cancelEdit() {
        this.saveErrorMsg = "";
        this.displaycontinueCancelRejectedInvoiceDialog = true;
        this.displayEDITRejectedInvoiceDialog = true;
    }
    public continueCancel() {
        this.displaycontinueCancelRejectedInvoiceDialog = false;
        this.displayEDITRejectedInvoiceDialog = false;
        // this.editRejectedInvoiceDatum = {
        //     "description": null,
        //     "transactionType": "",
        //     "statusCode": "",
        //     "saleQuantity": 0,
        //     "d2DIndicator": "",
        //     "exceptionCode": "",
        //     "saleType": "",
        //     "partNumber": "",
        //     "invoiceNumber": "",
        //     "invoiceDate": ""
        // };
        this.getRejectedInvoiceData();
    }
    public disContinueCancel() {
        this.displaycontinueCancelRejectedInvoiceDialog = false;
        this.displayEDITRejectedInvoiceDialog = true;
    }

    public saveRejectedInvoice() {
        this.saveErrorMsg = "";
        this.displaycontinueSaveRejectedInvoiceDialog = true;
        this.displayEDITRejectedInvoiceDialog = true;
    }

    public saveMsg: String = "";
    public saveErrorMsg: String = "";
    public saveInvoiceDatum: any;
    public continueSave() {
        this.postSaveInProgress = true;
        if (this.editRejectedInvoiceDatum.partNumber != undefined && this.editRejectedInvoiceDatum.partNumber == "") {
            this.saveErrorMsg = "Part Number field should not be empty";
            return;
        }
        if (this.editRejectedInvoiceDatum.transactionType != undefined && this.editRejectedInvoiceDatum.transactionType == "") {
            this.saveErrorMsg = "TransactionType field should not be empty";
            return;
        }
        if (this.editRejectedInvoiceDatum.d2DIndicator != undefined && this.editRejectedInvoiceDatum.d2DIndicator == "") {
            this.saveErrorMsg = "D2D Indicator field should not be empty";
            return;
        }

        this.reportService.saveRejectedInvoiceData(this.selectedDC, this.editRejectedInvoiceDatum).subscribe(
            (rejectedInvoiceDatum) => {
                this.saveInvoiceDatum = (rejectedInvoiceDatum)
                this.postSaveInProgress = false;
                this.displaycontinueSaveRejectedInvoiceDialog = false;
                this.displayEDITRejectedInvoiceDialog = false;
                this.saveMsg = "Successfully updated rejected invoice details.";
                this.getRejectedInvoiceData();
                this.chRef.detectChanges();
                this.editRejectedInvoiceDatum = {
                    "description": null,
                    "transactionType": "",
                    "statusCode": "",
                    "saleQuantity": 0,
                    "d2DIndicator": "",
                    "exceptionCode": "",
                    "saleType": "",
                    "partNumber": "",
                    "invoiceNumber": "",
                    "invoiceDate": ""
                };
            },
            (error) => {
                if (error !== undefined && error.length < 250) {
                    this.saveErrorMsg = error;
                } else {
                    this.saveErrorMsg = "Internal Server error while updating rejected invoice details.";
                }
                this.postSaveInProgress = false;
                this.displaycontinueSaveRejectedInvoiceDialog = false;
                this.displayEDITRejectedInvoiceDialog = true;
                this.getRejectedInvoiceData();
                this.chRef.detectChanges();
            }
        )

    }

    public disContinueSave() {
        this.displaycontinueSaveRejectedInvoiceDialog = false;
        this.displayEDITRejectedInvoiceDialog = true;
    }

}
