import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';

import { RewardsReDistributionService } from '../../services/rewards-redistribution/rewards-redistribution.service';

declare var $: any;

@Component({
    selector: 'payout-redistribution',
    templateUrl: './rewards-redistribution.html'

})
export class RewardsRedistributionComponent implements OnInit {
    private showAllocationDiv: boolean = false;

    constructor(private rewardsReDistributionService: RewardsReDistributionService) {
    }

    ngOnInit() {
    }
    private validDealerCode: boolean = true;
    private submitDealerCode(dealerCode) {
        var z1 = /^[0-9]*$/;
        if (z1.test(dealerCode) && dealerCode.length == 5) {
            this.validDealerCode = true;
            this.showAllocationDiv = true;
        } else {
            this.validDealerCode = false;
        }
        //  this.getELRedistributionData(dealerCode);
        this.getPCRedistributionData(dealerCode);
        // this.getURRedistributionData(dealerCode);
        // this.getPayoutRedistributionData(dealerCode);


    }
    private elRedistributionDataResponse: any = [];
    private getELRedistributionData(dealerCode) {
        var programName = "el";
        this.rewardsReDistributionService.getELRedistributionData(dealerCode, programName).subscribe(
            (elRedistributionDataResponse) => {
                this.elRedistributionDataResponse = (elRedistributionDataResponse)
                this.constructAllocationData();
                console.log(this.elRedistributionDataResponse);
            },
            (error) => {

            }
        )
    }

    private pCRedistributionDataResponse: any = [];
    private getPCRedistributionData(dealerCode) {
        var programName = "pc";
        this.rewardsReDistributionService.getPCRedistributionData(dealerCode, programName).subscribe(
            (pCRedistributionDataResponse) => {
                this.pCRedistributionDataResponse = (pCRedistributionDataResponse)
                this.constructAllocationData();
                console.log(this.pCRedistributionDataResponse);
            },
            (error) => {

            }
        )
    }

    private uRRedistributionDataResponse: any = [];
    private getURRedistributionData(dealerCode) {
        var programName = "ur";
        this.rewardsReDistributionService.getURRedistributionData(dealerCode, programName).subscribe(
            (uRRedistributionDataResponse) => {
                this.uRRedistributionDataResponse = (uRRedistributionDataResponse)

            },
            (error) => {

            }
        )
    }
    private payoutRedistributionDataResponse: any = [];
    private getPayoutRedistributionData(dealerCode) {
        var programName = "payout";
        this.rewardsReDistributionService.getPayoutRedistributionData(dealerCode, programName).subscribe(
            (payoutRedistributionDataResponse) => {
                this.payoutRedistributionDataResponse = (payoutRedistributionDataResponse)

            },
            (error) => {

            }
        )
    }
    private allocationTableData: any = {};
    private constructAllocationData() {
        var elTotalData: any = 0;
        var pcTotalData: any = 0;
        var urTotalData: any = 0;
        var payoutTotalData: any = 0
        // var allocationTableData: any = [];

        for (var i = 0; i < this.pCRedistributionDataResponse.length; i++) {
            pcTotalData = pcTotalData + this.pCRedistributionDataResponse[i].amount;
        }
        this.allocationTableData.el = elTotalData;
        this.allocationTableData.pc = pcTotalData;
        this.allocationTableData.ur = urTotalData;
        this.allocationTableData.payout = payoutTotalData;

    }
    private hideValidationDiv() {
        // alert()
        this.validDealerCode = true;
    }


}
