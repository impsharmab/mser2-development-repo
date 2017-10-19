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
    private hideelParticipantTable: boolean = false;
    private hidepcParticipantTable: boolean = false;
    private hideurParticipantTable: boolean = false;
    private hidepayoutParticipantTable: boolean = false;

    constructor(private rewardsReDistributionService: RewardsReDistributionService,
        private rewardsDistributionService: RewardsDistributionService) {
    }

    ngOnInit() {
    }
    private validDealerCode: boolean = true;
    private insertedDealercode: any = "";
    private submitDealerCode(dealerCode) {
        this.msg = "";
        this.hideELSection = false;
        this.hidePCSection = false;
        this.hideURSection = false;
        this.hidePayoutSection = false;
        this.lastClick = "";
        this.showActiveProgram = false;
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

                console.log(this.pCRedistributionDataResponse);
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
            if (this.payoutRedistributionDataResponse[i].itastatus == "RJCT") {
                payoutTotalData = payoutTotalData + this.payoutRedistributionDataResponse[i].rewardAmount;
            }
        }
        this.allocationTableData.payout = payoutTotalData;
        if (payoutTotalData == 0) {
            this.disablepayoutButton = true;
        } else {
            this.disablepayoutButton = false;
        }
        this.payoutGroupbyDescription();
    }
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
            dataJson.push({ allocationID: allocationArray[j], date: "", amount: 0, teamID: "", teamName: "" });
            for (var k = 0; k < this.elRedistributionDataResponse.length; k++) {
                if (allocationArray[j] == this.elRedistributionDataResponse[k].allocationID) {
                    dataJson[j].date = this.elRedistributionDataResponse[k].updatedDate;
                    dataJson[j].amount += this.elRedistributionDataResponse[k].amount;
                    dataJson[j].teamID = this.elRedistributionDataResponse[k].teamId;
                    
                    if (this.elRedistributionDataResponse[k].teamName == "") {
                        this.elRedistributionDataResponse[k].teamName = "-"
                    }

                    dataJson[j].teamName = this.elRedistributionDataResponse[k].teamName;

                }
            }
        }
        // console.log(dataJson);
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
        // // console.log(dataJson);
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
        //  // console.log(dataJson);
        this.urAllocationDataa = dataJson;

    }

    private redistributeAmountDatum: any;
    private redistributeAmount() {
        this.rewardsReDistributionService.redistributeAmount(this.insertedDealercode, this.activeAllocationID).subscribe(
            (redistributeAmountDatum) => {
                this.redistributeAmountDatum = (redistributeAmountDatum)
                // alert(this.insertedDealercode + " , " + this.activeAllocationID)
                if (this.redistributeAmountDatum == true) {
                    this.msg = "Distribution has been successfully Reset.";
                    this.hideELSection = false;
                    this.hidePCSection = false;
                    this.hideURSection = false;
                    this.hidePayoutSection = false;
                    this.lastClick = "";
                    this.showActiveProgram = false;
                    this.getELRedistributionData(this.insertedDealercode, "el");
                    this.getPCRedistributionData(this.insertedDealercode, "pc");
                    this.getURRedistributionData(this.insertedDealercode, "ur");
                    this.getPayoutRedistributionData(this.insertedDealercode, "payout");
                }
            },
            (error) => {
                setTimeout(() => {
                    if (error !== undefined && error.length < 250) {
                        this.msg = error;
                    } else {
                        this.msg = "Error in Re-Distribution.";
                        this.hideELSection = false;
                        this.hidePCSection = false;
                        this.hideURSection = false;
                        this.hidePayoutSection = false;
                        this.lastClick = "";
                        this.showActiveProgram = false;
                    }

                }, 1000)
            }
        )
    }
    private elHistoryData = []
    private openELHistory(allocationID) {
        this.msg = "";
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
        this.msg = "";
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
        this.msg = "";
        var urHistoryData1 = [];
        for (var i = 0; i < this.uRRedistributionDataResponse.length; i++) {
            if (allocationID == this.uRRedistributionDataResponse[i].allocationID) {
                urHistoryData1.push(this.uRRedistributionDataResponse[i]);
            }
        }
        this.urHistoryData = urHistoryData1;
    }

    private participantsList: any = [];
    private participantDataValue: any = [];
    private participantsOptions: SelectItem[] = [];
    private getParticipantsByDealer(dealerCode: string, program: string, allocationID: any) {
        this.hidepcParticipantTable = false;
        this.hideelParticipantTable = false;
        this.hideurParticipantTable = false;
        this.participantDataValue = [];
        var constructParticipants: any = [];
        this.rewardsDistributionService.getParticipantsByDealer(dealerCode, program).subscribe(
            (participantsList) => {
                this.participantsList = (participantsList)
                console.log(this.participantsList);
                if (program == 'pc') {
                    this.openPCHistory(allocationID)
                } else if (program == 'el') {
                    this.openELHistory(allocationID)
                } else if (program == 'ur') {
                    this.openURHistory(allocationID)
                }
                for (var i = 0; i < this.participantsList.length; i++) {
                    if (program == 'pc' && i < this.pcHistoryData.length) {
                        this.participantDataValue.push({ name: this.pcHistoryData[i].sid + " - " + this.pcHistoryData[i].firstName + " " + this.pcHistoryData[i].lastName, value: this.pcHistoryData[i].amount, item2: this.pcHistoryData[i].sid });
                    } else if (program == 'el' && i < this.elHistoryData.length) {
                        this.participantDataValue.push({ name: this.elHistoryData[i].sid + " - " + this.elHistoryData[i].firstName + " " + this.elHistoryData[i].lastName, value: this.elHistoryData[i].amount, item2: this.elHistoryData[i].sid });
                    } else if (program == 'ur' && i < this.urHistoryData.length) {
                        this.participantDataValue.push({ name: this.urHistoryData[i].sid + " - " + this.urHistoryData[i].firstName + " " + this.urHistoryData[i].lastName, value: this.urHistoryData[i].amount, item2: this.urHistoryData[i].sid });
                    } else {
                        this.participantDataValue.push({ name: "", value: 0, item2: "" });
                    }
                    constructParticipants.push(this.participantsList[i].item2 + " - " + this.participantsList[i].item1);
                    this.participantsOptions.push({
                        label: this.participantsList[i].item2 + " - " + this.participantsList[i].item1, value: this.participantsList[i].item2
                    })
                }
                console.log(this.participantsOptions);
                console.log(this.participantDataValue);

                // // console.log(this.participantsOptions);
            },
            (error) => {
            }
        )
    }

    private selectedParticipant(participantName) {

        // alert(participantName);
    }

    private activeAllocationID: any = 0;
    openPCRedistributionTable(allocationID, programName) {
        this.hidepcParticipantTable = false;
        this.hideelParticipantTable = false;
        this.hideurParticipantTable = false;
        this.msg = "";
        this.activeAllocationID = allocationID;
        this.participantsOptions = [];
        this.getParticipantsByDealer(this.insertedDealercode, programName, allocationID);
    }

    private savePCDATUM: any;
    private rewardsAmount: any = {};
    private msg: string = "";
    private savePCRedistributionData() {
        this.hidepcParticipantTable = true;
        this.hideelParticipantTable = true;
        this.hideurParticipantTable = true;
        this.hidePayoutDistributionTable = true;
        var nameValueList: any = [];
        var nameValues: any = {};
        var rewardsAmount = this.rewardsAmount;
        var totalValues: any = 0;

        for (var i = 0; i < this.participantDataValue.length; i++) {
            if (this.participantDataValue[i].item2 != undefined && this.participantDataValue[i].item2.length > 0 && this.participantDataValue[i].value > 0) {
                nameValueList.push({ name: this.participantDataValue[i].item2, value: parseFloat(this.participantDataValue[i].value) })
            }
        }
        nameValues.list = nameValueList;
        this.rewardsReDistributionService.saveRedistributionData(this.insertedDealercode, nameValues, this.activeAllocationID).subscribe(
            (savePCDATUM) => {
                this.savePCDATUM = (savePCDATUM)
                if (this.savePCDATUM == true) {
                    this.msg = "Successfully Allocated the Rewards Amount";
                    this.getELRedistributionData(this.insertedDealercode, "el");
                    this.getPCRedistributionData(this.insertedDealercode, "pc");
                    this.getURRedistributionData(this.insertedDealercode, "ur");
                    this.getPayoutRedistributionData(this.insertedDealercode, "payout");
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

    // private hidepcParticipantTable: boolean = false;
    private hidepcDistributionTable: boolean = false;
    private pcCancelationModal() {
        this.hideELSection = false;
        this.hidePCSection = false;
        this.hideURSection = false;
        this.hidePayoutSection = false;
        this.lastClick = "";
        this.showActiveProgram = false;
        this.hidepcParticipantTable = true;
        this.hidepcDistributionTable = true;
    }

    private hidePayoutDistributionTable: boolean = false;
    private payoutCancelationModal() {
        this.hidePayoutDistributionTable = true;

    }
    private pcProccedToRellocation() {
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
        this.msg = "";
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
        this.msg = "";
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
        this.msg = "";
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
        this.msg = "";
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

    private clearationAllModal() {
        for (var i = 0; i < this.participantDataValue.length; i++) {
            this.participantDataValue[i].name = "";
            this.participantDataValue[i].value = 0;
            this.participantDataValue[i].item2 = "";
        }
    }

    private payoutGroupedData: any = [];
    private payoutGroupbyDescription() {
        var payoutData = this.payoutRedistributionDataResponse;
        var descriptionArray: any = [];
        var rewardDateArray: any = [];
        var payoutGroupedData: any = [];

        for (var i = 0; i < payoutData.length; i++) {
            descriptionArray.push(payoutData[i].description);
            rewardDateArray.push(payoutData[i].rewardDate);
        }

        descriptionArray = this.removeDuplicates(descriptionArray);
        rewardDateArray = this.removeDuplicates(rewardDateArray);

        for (var j = 0; j < descriptionArray.length; j++) {
            payoutGroupedData.push({ dealerCode: this.insertedDealercode, description: descriptionArray[j], payoutPeriod: "", totalRewardAmount: 0, rewardAmount: 0, rejectedAmount: 0 })
            for (var x = 0; x < rewardDateArray.length; x++) {

                for (var k = 0; k < payoutData.length; k++) {
                    if (descriptionArray[j] == payoutData[k].description && rewardDateArray[x] == payoutData[k].rewardDate) {
                        if (payoutData[k].itastatus == "RJCT" || payoutData[k].itastatus == "CLSE") {
                            payoutGroupedData[j].totalRewardAmount += payoutData[k].rewardAmount;
                        }
                        if (payoutData[k].itastatus == "RJCT") {
                            payoutGroupedData[j].payoutPeriod = payoutData[k].rewardDate;
                            payoutGroupedData[j].rejectedAmount += payoutData[k].rewardAmount;
                        } else if (payoutData[k].itastatus == "CLSE") {
                            payoutGroupedData[j].payoutPeriod = payoutData[k].rewardDate;
                            payoutGroupedData[j].rewardAmount += payoutData[k].rewardAmount;
                        }
                    }
                }
            }
        }
        this.payoutGroupedData = payoutGroupedData;
        // console.log(payoutGroupedData);

    }

    private roDetails: any = [];
    private sortedRODetails: any = [];
    private payoutSIDOptions: SelectItem[] = [];
    private createRODetails(description) {
        this.msg = "";
        this.getParticipantsByDealer(this.insertedDealercode, "payout", 0);
        if (!this.hidePayoutDistributionTable) {
            this.hidePayoutDistributionTable = false;
        } else if (this.hidePayoutDistributionTable) {
            this.hidePayoutDistributionTable = false;
        }
        var roDetails: any = [];
        var sortedRODetails: any = [];
        var payoutSIDs: any = [];

        for (var x = 0; x < this.payoutRedistributionDataResponse.length; x++) {
            if (this.payoutRedistributionDataResponse[x].description == description) {
                roDetails.push(this.payoutRedistributionDataResponse[x]);
            }
        }

        for (var y = 0; y < roDetails.length; y++) {
            if (roDetails[y].itastatus == "RJCT") {
                roDetails[y].status = "Rejected";
                roDetails[y].checked = false;
                roDetails[y].disable = false;
            }
            else if (roDetails[y].itastatus == "CLSE") {
                roDetails[y].status = "Paid";
                roDetails[y].checked = true;
                roDetails[y].disable = true;
            }
        }
        this.roDetails = roDetails;
        var rejectedROindex: any = [];
        for (var z = 0; z < this.roDetails.length; z++) {
            if (this.roDetails[z].itastatus == "RJCT") {
                sortedRODetails.push(this.roDetails[z]);
                rejectedROindex.push(z);
            }
        }
        for (var r = rejectedROindex.length - 1; r >= 0; r--) {
            this.roDetails.splice(rejectedROindex[r], 1);

        }

        for (var q = 0; q < this.roDetails.length; q++) {
            sortedRODetails.push(this.roDetails[q]);
        }
        this.sortedRODetails = sortedRODetails;

        // console.log(roDetails);
    }

    private getDistributionHistoryData(programName) {
        this.msg = "";
    }

    private payoutSelectedSID(sid) {

    }

    private approveAllPayoutRedistribution(approveAllpayout) {
        if (approveAllpayout != undefined && approveAllpayout == true) {
            for (var y = 0; y < this.sortedRODetails.length; y++) {
                if (this.sortedRODetails[y].itastatus == "RJCT") {
                    this.sortedRODetails[y].checked = true;
                    // this.roDetails[y].disable = true;
                }
            }
        }
        else if (approveAllpayout != undefined && approveAllpayout == false) {
            for (var y = 0; y < this.sortedRODetails.length; y++) {
                if (this.sortedRODetails[y].itastatus == "RJCT") {
                    this.sortedRODetails[y].checked = false;
                    // this.roDetails[y].disable = false;
                }
            }
        }
    }

    private savePayoutDATUM: any;
    private savePayoutRedistributionData() {
        this.hidePayoutDistributionTable = true;
        var data: any = {};
        for (var i = 0; i < this.sortedRODetails.length; i++) {
            if (this.sortedRODetails[i].sid != undefined && this.sortedRODetails[i].checked == true && this.sortedRODetails[i].itastatus == "RJCT") {
                this.sortedRODetails[i].itastatus = "APRV";
            }
        }
        data.list = this.sortedRODetails;
        this.rewardsReDistributionService.savePayoutRedistributionData(this.insertedDealercode, data).subscribe(
            (savePayoutDATUM) => {
                this.savePayoutDATUM = (savePayoutDATUM)
                if (this.savePayoutDATUM == true) {
                    this.msg = "Successfully Approved.";
                    this.getPayoutRedistributionData(this.insertedDealercode, "payout");
                } else {
                    this.msg = "Internal Server error.";
                }

            },
            (error) => {
                setTimeout(() => {
                    if (error !== undefined && error.length < 250) {
                        this.msg = error;
                    } else {
                        this.msg = "Internal Server error.";
                    }

                }, 1000)
            }
        )
    }
}
