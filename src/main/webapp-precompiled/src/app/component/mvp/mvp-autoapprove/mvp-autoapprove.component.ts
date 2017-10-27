import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MVPAutoApprovalSettingService } from '../../../services/mvp-service/mvp-autoapprove/mvp-autoapprove.service';

declare var $: any;

@Component({
    selector: 'mvp-autoapprove',
    templateUrl: './mvp-autoapprove.html'

})
export class MVPAutoApproveComponent implements OnInit {
    public mvpApprovalData: any = false;
    public mvpManualApprove: any;
    public mvpAutoApproval: any;
    public checkedManual: string = "";
    public checkedAuto: string = "";
    public mvpAutoApprovalData: any;
    public updatedMessage: string = "";
    constructor(
        private mvpAutoApprovalSettingService: MVPAutoApprovalSettingService
    ) {

    }

    ngOnInit() {
        this.getAutoApprovalCount();
        this.getMVPApprovalData();
    }

    public getMVPApprovalData() {
        this.mvpAutoApprovalSettingService.getMVPApprovalData().subscribe(
            (mvpApprovalData) => {
                this.mvpApprovalData = mvpApprovalData
                if (this.mvpApprovalData != undefined && this.mvpApprovalData == true) {
                    this.checkedManual = null;
                    this.checkedAuto = "true";
                } else {
                    this.checkedManual = "true";
                    this.checkedAuto = null;
                }
            },
            (error) => {

            }
        )
    }

    public checkedUncheckedRadio(value) {
        this.updatedMessage = "";
        if (value) {
            this.checkedManual = null;
            this.checkedAuto = "true";
            this.mvpApprovalData = true;
        } else {
            this.checkedManual = "true";
            this.checkedAuto = null;
            this.mvpApprovalData = false;
        }
    }
    public saveAutoPay() {
        this.mvpAutoApprovalSettingService.getMVPAutoApprovalData(this.mvpApprovalData).subscribe(
            (mvpAutoApprovalData) => {
                this.mvpAutoApprovalData = mvpAutoApprovalData

                this.updatedMessage = "Successfully updated the changes";

                if (this.mvpApprovalData != undefined && this.mvpApprovalData == true) {
                    this.checkedManual = null;
                    this.checkedAuto = "true";
                } else {
                    this.checkedManual = "true";
                    this.checkedAuto = null;
                }
            },
            (error) => {

            }
        )
    }

    public autoApprovalCount: number = 0;
    public getAutoApprovalCount() {
        this.mvpAutoApprovalSettingService.getAutoApprovalCount().subscribe(
            (autoApprovalCount) => {
                this.autoApprovalCount = autoApprovalCount
            },
            (error) => {

            }
        )

    }
}
