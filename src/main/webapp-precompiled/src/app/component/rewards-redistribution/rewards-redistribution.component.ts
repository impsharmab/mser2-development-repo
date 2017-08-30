import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { RewardsDistributionService } from '../../services/rewards-distribution/rewards-distribution.service';
import { RewardsReDistributionService } from '../../services/rewards-redistribution/rewards-redistribution.service';

declare var $: any;

@Component({
    selector: 'payout-redistribution',
    templateUrl: './rewards-redistribution.html'

})
export class RewardsRedistributionComponent implements OnInit {
    private showAllocationDiv: boolean = false;

    constructor(private rewardsReDistributionService: RewardsReDistributionService,
        private rewardsDistributionService: RewardsDistributionService) {
    }

    ngOnInit() {
    }
    private validDealerCode: boolean = true;
    private insertedDealercode: any = "";
    private submitDealerCode(dealerCode) {
        var z1 = /^[0-9]*$/;
        if (z1.test(dealerCode) && dealerCode.length == 5) {
            this.validDealerCode = true;
            this.showAllocationDiv = true;
        } else {
            this.validDealerCode = false;
        }
        this.insertedDealercode = dealerCode;
        this.getELRedistributionData(dealerCode, "el");
        this.getPCRedistributionData(dealerCode, "pc");
        this.getURRedistributionData(dealerCode, "ur");
        this.getPayoutRedistributionData(dealerCode, "payout");
    }

    private elRedistributionDataResponse: any = [];
    private disablepayoutButton: any = false;
    private disableelButton: any = false;
    private disablepcButton: any = false;
    private disableurButton: any = false;
    private getELRedistributionData(dealerCode, programName) {
        this.rewardsReDistributionService.getRedistributionData(dealerCode, programName).subscribe(
            (elRedistributionDataResponse) => {
                this.elRedistributionDataResponse = (elRedistributionDataResponse)
                this.constructELAllocationData();
                //  this.getParticipantsByDealer(dealerCode, programName);

            },
            (error) => {

            }
        )
    }

    private pCRedistributionDataResponse: any = [];
    private getPCRedistributionData(dealerCode, programName) {
        this.rewardsReDistributionService.getRedistributionData(dealerCode, programName).subscribe(
            (pCRedistributionDataResponse) => {
                this.pCRedistributionDataResponse = (pCRedistributionDataResponse)
                this.constructPCAllocationData();
                // this.getParticipantsByDealer(dealerCode, programName);

                //console.log(this.pCRedistributionDataResponse);
            },
            (error) => {

            }
        )
    }

    private uRRedistributionDataResponse: any = [];
    private getURRedistributionData(dealerCode, programName) {
        this.rewardsReDistributionService.getRedistributionData(dealerCode, programName).subscribe(
            (uRRedistributionDataResponse) => {
                this.uRRedistributionDataResponse = (uRRedistributionDataResponse)
                this.constructURAllocationData();


            },
            (error) => {

            }
        )
    }

    private payoutRedistributionDataResponse: any = [];
    private getPayoutRedistributionData(dealerCode, programName) {
        this.rewardsReDistributionService.getPayoutRedistributionData(dealerCode, programName).subscribe(
            (payoutRedistributionDataResponse) => {
                this.payoutRedistributionDataResponse = (payoutRedistributionDataResponse)
                this.constructPayoutAllocationData();
            },
            (error) => {

            }
        )
    }
    private allocationTableData: any = {};
    private constructPCAllocationData() {
        var pcTotalData: any = 0;
        for (var i = 0; i < this.pCRedistributionDataResponse.length; i++) {
            pcTotalData = pcTotalData + this.pCRedistributionDataResponse[i].amount;
        }
        this.allocationTableData.pc = pcTotalData;
        if (this.allocationTableData.pc == 0) {
            this.disablepcButton = true;
        }
        else {
            this.disablepcButton = false;
        }

        this.constructPCDistributedDateAndAmount();
    }
    private constructELAllocationData() {
        var elTotalData: any = 0;
        for (var i = 0; i < this.elRedistributionDataResponse.length; i++) {
            elTotalData = elTotalData + this.elRedistributionDataResponse[i].amount;
        }
        this.allocationTableData.el = elTotalData;
        if (elTotalData == 0) {
            this.disableelButton = true;
        } else {
            this.disableelButton = false;
        }
        this.constructELDistributedDateAndAmount();
    }
    private constructURAllocationData() {
        var urTotalData: any = 0;
        for (var i = 0; i < this.uRRedistributionDataResponse.length; i++) {
            urTotalData = urTotalData + this.uRRedistributionDataResponse[i].amount;
        }
        this.allocationTableData.ur = urTotalData;
        if (urTotalData == 0) {
            this.disableurButton = true;
        } else {
            this.disableurButton = false;
        }
        this.constructURDistributedDateAndAmount();
    }
    private constructPayoutAllocationData() {
        var payoutTotalData: any = 0;
        for (var i = 0; i < this.payoutRedistributionDataResponse.length; i++) {
            payoutTotalData = payoutTotalData + this.payoutRedistributionDataResponse[i].amount;
        }
        this.allocationTableData.payout = payoutTotalData;
        if (payoutTotalData == 0) {
            this.disablepayoutButton = true;
        } else {
            this.disablepayoutButton = false;
        }
    }

    private data = [
        {
            "lastName": "AAAA",
            "firstName": "Steven",
            "updatedDate": "2017-08-16",
            "amount": 11,
            "allocationID": 23,
            "sid": "S89460P",
            "updatedBy": "S06810G"
        },
        {
            "lastName": "BBBB",
            "firstName": "Steven",
            "updatedDate": "2017-08-17",
            "amount": 1,
            "allocationID": 23,
            "sid": "S89460P",
            "updatedBy": "S06810G"
        },
        {
            "lastName": "CCCC",
            "firstName": "Steven",
            "updatedDate": "2017-08-18",
            "amount": 10,
            "allocationID": 21,
            "sid": "S89460P",
            "updatedBy": "S06810G"
        },
        {
            "lastName": "DDDD",
            "firstName": "Steven",
            "updatedDate": "2017-08-19",
            "amount": 7,
            "allocationID": 21,
            "sid": "S89460P",
            "updatedBy": "S06810G"
        },
        {
            "lastName": "DDDD",
            "firstName": "Steven",
            "updatedDate": "2017-08-19",
            "amount": 70,
            "allocationID": 21,
            "sid": "S89460P",
            "updatedBy": "S06810G"
        },
        {
            "lastName": "DDDD",
            "firstName": "Steven",
            "updatedDate": "2017-08-19",
            "amount": 72,
            "allocationID": 11,
            "sid": "S89460P",
            "updatedBy": "S06810G"
        }
    ]


    private removeDuplicates(duplicateArray) {
        var cleanArray = [];
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
    private elAllocationDataa = [];
    private constructELDistributedDateAndAmount() {
        var dataJson = [];
        var allocationArray = [];
        var date = {};
        var amount = {};
        var allocationID = {};
        for (var i = 0; i < this.elRedistributionDataResponse.length; i++) {
            allocationArray.push(this.elRedistributionDataResponse[i].allocationID);
        }
        allocationArray = this.removeDuplicates(allocationArray);

        for (var j = 0; j < allocationArray.length; j++) {
            dataJson.push({ allocationID: allocationArray[j], date: "", amount: 0 });
            for (var k = 0; k < this.elRedistributionDataResponse.length; k++) {
                if (allocationArray[j] == this.elRedistributionDataResponse[k].allocationID) {
                    dataJson[j].date = this.elRedistributionDataResponse[k].updatedDate;
                    dataJson[j].amount += this.elRedistributionDataResponse[k].amount;
                }
            }
        }
      //  console.log(dataJson);
        this.elAllocationDataa = dataJson;

    }
    private pcAllocationDataa = []
    private constructPCDistributedDateAndAmount() {
        var dataJson = [];
        var allocationArray = [];
        var date = {};
        var amount = {};
        var allocationID = {};
        for (var i = 0; i < this.pCRedistributionDataResponse.length; i++) {
            allocationArray.push(this.pCRedistributionDataResponse[i].allocationID);
        }
        allocationArray = this.removeDuplicates(allocationArray);

        for (var j = 0; j < allocationArray.length; j++) {
            dataJson.push({ allocationID: allocationArray[j], date: "", amount: 0 });
            for (var k = 0; k < this.pCRedistributionDataResponse.length; k++) {
                if (allocationArray[j] == this.pCRedistributionDataResponse[k].allocationID) {
                    dataJson[j].date = this.pCRedistributionDataResponse[k].updatedDate;
                    dataJson[j].amount += this.pCRedistributionDataResponse[k].amount;
                }
            }
        }
       // console.log(dataJson);
        this.pcAllocationDataa = dataJson;

    }
    private urAllocationDataa = []
    private constructURDistributedDateAndAmount() {
        var dataJson = [];
        var allocationArray = [];
        var date = {};
        var amount = {};
        var allocationID = {};
        for (var i = 0; i < this.uRRedistributionDataResponse.length; i++) {
            allocationArray.push(this.uRRedistributionDataResponse[i].allocationID);
        }
        allocationArray = this.removeDuplicates(allocationArray);

        for (var j = 0; j < allocationArray.length; j++) {
            dataJson.push({ allocationID: allocationArray[j], date: "", amount: 0 });
            for (var k = 0; k < this.uRRedistributionDataResponse.length; k++) {
                if (allocationArray[j] == this.uRRedistributionDataResponse[k].allocationID) {
                    dataJson[j].date = this.uRRedistributionDataResponse[k].updatedDate;
                    dataJson[j].amount += this.uRRedistributionDataResponse[k].amount;
                }
            }
        }
      //  console.log(dataJson);
        this.urAllocationDataa = dataJson;

    }

    private redistributeAmountDatum: any;
    private redistributeAmount() {
        this.rewardsReDistributionService.redistributeAmount(this.insertedDealercode, this.activeAllocationID).subscribe(
            (redistributeAmountDatum) => {
                this.redistributeAmountDatum = (redistributeAmountDatum)
                alert(this.insertedDealercode + " , " + this.activeAllocationID)
                if (this.redistributeAmountDatum == true) {
                    this.msg = "Successfully Redistributed the Amount";
                }
            },
            (error) => {
                setTimeout(() => {
                    if (error !== undefined && error.length < 250) {
                        this.msg = error;
                    } else {
                        this.msg = "Error in Re-Distribution.";
                    }

                }, 1000)
            }
        )
    }
    private elHistoryData = []
    private openELHistory(allocationID) {       
        var elHistoryData1 = [];
        for (var i = 0; i < this.elRedistributionDataResponse.length; i++) {
            if (allocationID == this.elRedistributionDataResponse[i].allocationID) {
                elHistoryData1.push(this.elRedistributionDataResponse[i]);
            }
        }
        this.elHistoryData = elHistoryData1;
    }
    private pcHistoryData = []
    private openPCHistory(allocationID) {       
        var pcHistoryData1 = [];
        for (var i = 0; i < this.pCRedistributionDataResponse.length; i++) {
            if (allocationID == this.pCRedistributionDataResponse[i].allocationID) {
                pcHistoryData1.push(this.pCRedistributionDataResponse[i]);
            }
        }
        this.pcHistoryData = pcHistoryData1;
    }
    private urHistoryData = []
    private openURHistory(allocationID) {       
        var urHistoryData1 = [];
        for (var i = 0; i < this.uRRedistributionDataResponse.length; i++) {
            if (allocationID == this.uRRedistributionDataResponse[i].allocationID) {
                urHistoryData1.push(this.uRRedistributionDataResponse[i]);
            }
        }
        this.pcHistoryData = urHistoryData1;
    }

    private participantsList: any = [];
    private participantDataValue: any = [];
    private participantsOptions: SelectItem[] = [];
    private getParticipantsByDealer(dealerCode: string, program: string) {
        this.participantDataValue = [];
        var constructParticipants: any = [];
        this.rewardsDistributionService.getParticipantsByDealer(dealerCode, program).subscribe(
            (participantsList) => {
                this.participantsList = (participantsList)
                for (var i = 0; i < this.participantsList.length; i++) {
                    this.participantDataValue.push({ name: "", value: "", item2: "" });
                    constructParticipants.push(this.participantsList[i].item2 + " - " + this.participantsList[i].item1);
                    this.participantsOptions.push({
                        label: this.participantsList[i].item2 + " - " + this.participantsList[i].item1, value: this.participantsList[i].item2
                    })
                }

                // console.log(this.participantsOptions);
            },
            (error) => {
            }
        )
    }

    private selectedParticipant(participantName) {

        alert(participantName);
    }

    private activeAllocationID: any = 0;
    openPCRedistributionTable(allocationID, programName) { 
        this.activeAllocationID = allocationID;
        this.participantsOptions = [];
        this.getParticipantsByDealer(this.insertedDealercode, programName);
    }
    private savePCDATUM: any;
    private rewardsAmount: any = {};
    private msg: string = "";
    private savePCRedistributionData() {
        var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        var nameValueList: any = [];
        var nameValues: any = {};
        var rewardsAmount = this.rewardsAmount;
        var totalValues: any = 0;

        for (var i = 0; i < this.participantDataValue.length; i++) {
            if (this.participantDataValue[i].item2.length > 0 && this.participantDataValue[i].value.length > 0) {
                nameValueList.push({ name: this.participantDataValue[i].item2, value: parseFloat(this.participantDataValue[i].value) })
            }
        }
        nameValues.list = nameValueList;

        this.rewardsReDistributionService.saveRedistributionData(dealerCode, nameValues, this.activeAllocationID).subscribe(
            (savePCDATUM) => {
                this.savePCDATUM = (savePCDATUM)
                if (this.savePCDATUM == true) {
                    this.msg = "Successfully Allocated the Rewards Amount";
                }
            },
            (error) => {
                setTimeout(() => {
                    if (error !== undefined && error.length < 250) {
                        this.msg = error;
                    } else {
                        this.msg = "Error in Distribution.";
                    }

                }, 1000)
            }
        )
    }

    private hidepcParticipantTable: boolean = false;
    private hidepcDistributionTable: boolean = false;
    private pcCancelationModal() {
        this.hidepcParticipantTable = true;
        this.hidepcDistributionTable = true;
    }
    pcProccedToRellocation() {
        this.hidepcParticipantTable = false;
        this.hidepcDistributionTable = false;
    }

    private showActiveProgram: boolean = false;
    private activeProgram: string = "";
    private lastClick: string = "";
    private hideELSection: boolean = true;
    private hidePCSection: boolean = true;
    private hideURSection: boolean = true;
    private hidePayoutSection: boolean = true; 
    private elProceedToAllocation() {
        this.hideELSection = true;
        this.hidePCSection = false;
        this.hideURSection = false;
        this.hidePayoutSection = false;
        if (this.lastClick == "Express Lane" && this.showActiveProgram == false) {
            this.showActiveProgram = false;
            this.activeProgram = "Express Lane";
            this.lastClick = "Express Lane";
        } else if (this.lastClick == "Express Lane" && this.showActiveProgram == true) {
            this.showActiveProgram = false;
            this.hideELSection = true;
            this.activeProgram = "";
            this.lastClick = "";
        } else {
            this.showActiveProgram = true;
            this.activeProgram = "Express Lane";
            this.lastClick = "Express Lane";
        }
    }
    private pcProceedToAllocation() {
        this.hideELSection = false;
        this.hidePCSection = true;
        this.hideURSection = false;
        this.hidePayoutSection = false;
        if (this.lastClick == "Parts Counter" && this.showActiveProgram == false) {
            this.showActiveProgram = false;
            this.activeProgram = "Parts Counter";
            this.lastClick = "Parts Counter";
        } else if (this.lastClick == "Parts Counter" && this.showActiveProgram == true) {
            this.showActiveProgram = false;
            this.hidePCSection = true;
            this.activeProgram = "";
            this.lastClick = "";
        } else {
            this.showActiveProgram = true;
            this.activeProgram = "Parts Counter";
            this.lastClick = "Parts Counter";
        }
    }
    private urProceedToAllocation() {
        this.hideELSection = false;
        this.hidePCSection = false;
        this.hideURSection = true;
        this.hidePayoutSection = false;
        if (this.lastClick == "Used Recon" && this.showActiveProgram == false) {
            this.showActiveProgram = false;
            this.activeProgram = "Used Recon";
            this.lastClick = "Used Recon";
        } else if (this.lastClick == "Used Recon" && this.showActiveProgram == true) {
            this.showActiveProgram = false;
            this.hideURSection = true;
            this.activeProgram = "";
            this.lastClick = "";
        } else {
            this.showActiveProgram = true;
            this.activeProgram = "Used Recon";
            this.lastClick = "Used Recon";
        }
    }
    private payoutProceedToAllocation() {
        this.hideELSection = false;
        this.hidePCSection = false;
        this.hideURSection = false;
        this.hidePayoutSection = true;
        if (this.lastClick == "Payout Redistribution" && this.showActiveProgram == false) {
            this.showActiveProgram = false;
            this.activeProgram = "Payout Redistribution";
            this.lastClick = "Payout Redistribution";
        } else if (this.lastClick == "Payout Redistribution" && this.showActiveProgram == true) {
            this.hidePayoutSection = true;
            this.showActiveProgram = false;
            this.activeProgram = "";
            this.lastClick = "";
        } else {
            this.showActiveProgram = true;
            this.activeProgram = "Payout Redistribution";
            this.lastClick = "Payout Redistribution";
        }
    }

    private hideValidationDiv() {
        // alert()
        this.validDealerCode = true;
    }


}
