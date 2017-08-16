import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
    selector: 'payout-redistribution',
    templateUrl: './rewards-redistribution.html'

})
export class RewardsRedistributionComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    private validDealerCode: boolean = true;
    private readDealerCode(dealerCode) {
        var z1 = /^[0-9]*$/;
        if (z1.test(dealerCode) && dealerCode.length == 5) {
            this.validDealerCode = true;
        } else {
            this.validDealerCode = false;
        }
        alert(dealerCode);
    }

    private hideValidationDiv() {
       // alert()
        this.validDealerCode = true;
    }


}
