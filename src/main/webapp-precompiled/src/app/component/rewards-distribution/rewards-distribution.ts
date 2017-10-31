import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { RewardsDistributionService } from '../../services/rewards-distribution/rewards-distribution.service';

import { MVPInterface } from './mvpData.interface';
import { ELDistributionInterface } from './el-distribution.interface';

declare var $: any;

@Component({
  selector: 'parts-counter',
  templateUrl: './rewards-distribution.html'
  //styleUrls: ['./marketing-home.component.css'] 
})
export class RewardsDistributionComponent implements OnInit {
  public mvpInterface: MVPInterface = { approved: "No", sid: "" };
  public eldistInterface: ELDistributionInterface = { name: "", amount: "" }
  booleanYesNoOptions: SelectItem[] = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }];
  programNameOptions: SelectItem[] = [{ label: "Express Lane", value: "Express Lane" }, { label: "Parts Counter", value: "Parts Counter" }, { label: "Used Recon", value: "Used Recon" }];
  public date: string = "";
  public approveAllMVP: boolean = false;
  public distributedAmount: any = 0;
  public elDistributedAmount: any = 0;
  public hideelParticipantTable: boolean = false;
  public hidepcParticipantTable: boolean = false;
  public hideurParticipantTable: boolean = false;
  constructor(private rewardsDistributionService: RewardsDistributionService) { }

  ngOnInit() {
    this.getRewardsDistributionAmount();
    var d = new Date;
    this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();

    // this.getParticipantsByDealer();
  }


  public getSelectedDealerCode() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  }

  public getSelectedDealerName() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
  }

  public rewardsAmount: any = {}
  public disableMVPButton: boolean = false;
  public disableELButton: boolean = false;
  public disablePCButton: boolean = false;
  public disableURButton: boolean = false;
  public elRewardAmountModal: boolean = false;
  public pcRewardAmountModal: boolean = false;
  public urRewardAmountModal: boolean = false;
  public getRewardsDistributionAmount() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getRewardsDistributionAmount(dealerCode).subscribe(
      (rewardsAmount) => {
        this.rewardsAmount = (rewardsAmount)
        if (this.rewardsAmount.MVP != undefined && this.rewardsAmount.MVP <= 0) {
          this.disableMVPButton = true;
          this.rewardsAmount.MVP = 0;
        }
        if (this.rewardsAmount.el != undefined && this.rewardsAmount.el <= 0) {
          this.disableELButton = true;
          this.hideelParticipantTable = true;
          this.rewardsAmount.el = 0
          this.elRewardAmountModal = false;
        } else {
          this.elRewardAmountModal = true;
          this.hideelParticipantTable = false;
        }
        if (this.rewardsAmount.pc != undefined && this.rewardsAmount.pc <= 0) {
          this.disablePCButton = true;
          this.hidepcParticipantTable = true;
          this.rewardsAmount.pc = 0;
          this.pcRewardAmountModal = false;
        } else {
          this.pcRewardAmountModal = true;
          this.hidepcParticipantTable = false;
        }
        if (this.rewardsAmount.ur != undefined && this.rewardsAmount.ur <= 0) {
          this.disableURButton = true;
          this.hideurParticipantTable = true;
          this.rewardsAmount.ur = 0;
          this.urRewardAmountModal = false;
        } else {
          this.urRewardAmountModal = true;
          this.hideurParticipantTable = false;
        }

      },
      (error) => {
      }
    )
  }

  public showActiveProgram: boolean = false;
  public activeProgram: string = "";
  public lastClick: string = "";
  public hideMVPSection: boolean = true;
  public hideELSection: boolean = true;
  public hidePCSection: boolean = true;
  public hideURSection: boolean = true;
  public mvpOpenAllocationTable() {
    this.displayError = false;
    this.msg = "";
    this.hideMVPSection = true;
    this.hideELSection = false;
    this.hideURSection = false;
    this.hidePCSection = false;
    if (this.lastClick == "MVP" && this.showActiveProgram == false) {
      this.showActiveProgram = false;
      this.activeProgram = "MVP";
      this.lastClick = "MVP";
    } else if (this.lastClick == "MVP" && this.showActiveProgram == true) {
      this.showActiveProgram = false;
      this.hideMVPSection = true;
      this.activeProgram = "";
      this.lastClick = "";
    } else {
      this.showActiveProgram = true;
      this.activeProgram = "MVP";
      this.lastClick = "MVP";
    }
  }
  public elOpenAllocationTable() {
    this.hideelParticipantTable = true;

    this.displayError = false;
    this.msg = "";
    this.elDistributedAmount = 0;
    this.hideMVPSection = false;
    this.hideELSection = true;
    this.hideURSection = false;
    this.hidePCSection = false;
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
  public pcOpenAllocationTable() {
    if (this.rewardsAmount.pc != undefined && this.rewardsAmount.pc <= 0) {
      this.hidepcParticipantTable = true;
    } else {
      this.hidepcParticipantTable = false;
    }
    this.displayError = false;
    this.msg = "";
    this.distributedAmount = 0;
    this.hideMVPSection = false;
    this.hideELSection = false;
    this.hidePCSection = true;
    this.hideURSection = false;
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

  public urOpenAllocationTable() {
    if (this.rewardsAmount.ur != undefined && this.rewardsAmount.ur <= 0) {
      this.hideurParticipantTable = true;
    } else {
      this.hideurParticipantTable = false;
    }
    this.displayError = false;
    this.msg = "";
    this.distributedAmount = 0;
    this.hideMVPSection = false;
    this.hideELSection = false;
    this.hidePCSection = false;
    this.hideURSection = true;
    if (this.lastClick == "Used Recon" && this.showActiveProgram == false) {
      this.showActiveProgram = false;
      this.activeProgram = "Used Recon";
      this.lastClick = "Used Recon";
    } else if (this.lastClick == "Used Recon" && this.showActiveProgram == true) {
      this.hideURSection = true;
      this.showActiveProgram = false;
      this.activeProgram = "";
      this.lastClick = "";
    } else {
      this.showActiveProgram = true;
      this.activeProgram = "Used Recon";
      this.lastClick = "Used Recon";
    }
  }

  public mvpDistributionDatum: any = [];
  public getMVPDistributionData() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getMVPDistributionData(dealerCode).subscribe(
      (mvpDistributionDatum) => {
        this.mvpDistributionDatum = (mvpDistributionDatum)
        // console.log(this.mvpDistributionDatum);
        for (var i = 0; i < this.mvpDistributionDatum.length; i++) {
          this.mvpDistributionDatum[i].selectedSid = "";
          this.mvpDistributionDatum[i].approved = false;
          if (this.partcipantItem2SID.indexOf(this.mvpDistributionDatum[i].sid) <= -1) {
            this.mvpDistributionDatum[i].sid = "";
          }
        }
        //  console.log(this.mvpDistributionDatum);
      },
      (error) => {
      }
    )
  }
  public distributionAllocationHistoryDatum: any;
  public getDistributionAllocationHistory(programName: string) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getDistributionAllocationHistory(dealerCode, programName).subscribe(
      (distributionAllocationHistoryDatum) => {
        this.distributionAllocationHistoryDatum = (distributionAllocationHistoryDatum)

      },
      (error) => {
      }
    )
  }
  public participantsList: any = [];
  public participantDataValue: any = [];
  public participantsOptions: SelectItem[] = [];
  public partcipantItem2SID: any = [];
  public getParticipantsByDealer(program: string) {
    this.participantsOptions = [];
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.participantDataValue = [];
    var constructParticipants: any = [];
    this.rewardsDistributionService.getParticipantsByDealer(dealerCode, program).subscribe(
      (participantsList) => {
        this.participantsList = (participantsList)
        for (var i = 0; i < this.participantsList.length; i++) {
          this.partcipantItem2SID.push(this.participantsList[i].item2);
          constructParticipants.push(this.participantsList[i].item2 + " - " + this.participantsList[i].item1);
          this.participantsOptions.push({
            label: this.participantsList[i].item2 + " - " + this.participantsList[i].item1, value: this.participantsList[i].item2
          })
        }
        for (var i = 0; i < 10; i++) {
          this.participantDataValue.push({ name: "", value: 0, teamID: null });
        }
        // console.log(this.participantDataValue);
        this.getMVPDistributionData();
      },
      (error) => {
      }
    )
  }

  public elParticipantsList: any = [];
  public elParticipantDataValue: any = [];
  public elParticipantsOptions: SelectItem[] = [];
  public activeTeamID: any = "";
  public elAmount: any = 0;
  public getELParticipantsByDealer(program: string, teamID: string, amount: any) {
    this.activeTeamID = teamID;
    this.elAmount = amount;
    this.hideelParticipantTable = false;

    this.elParticipantsOptions = [];
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.elParticipantDataValue = [];
    var constructParticipants: any = [];
    this.rewardsDistributionService.getParticipantsByDealer(dealerCode, program).subscribe(
      (elParticipantsList) => {
        this.elParticipantsList = (elParticipantsList)
        for (var i = 0; i < this.elParticipantsList.length; i++) {
          constructParticipants.push(this.elParticipantsList[i].item2 + " - " + this.elParticipantsList[i].item1);
          this.elParticipantsOptions.push({
            label: this.elParticipantsList[i].item2 + " - " + this.elParticipantsList[i].item1, value: this.elParticipantsList[i].item2
          })
        }
        for (var i = 0; i < 10; i++) {
          this.elParticipantDataValue.push({ name: "", value: 0, teamID: teamID });
        }
        // console.log(this.participantDataValue);
      },
      (error) => {
      }
    )


  }
  public addNewRow() {
    this.participantDataValue.push({ name: "", value: 0 });
    this.elParticipantDataValue.push({ name: "", value: 0, teamID: this.activeTeamID });
  }

  public saveMVPDistributionDatum: any;
  public displayError: boolean = false;
  public saveMVPDistributionDATA() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var mvpDistributionData = this.mvpDistributionDatum;
    var data: any = {};
    var count: any = 0;
    var countApprovedAll: any = 0;
    for (var i = 0; i < mvpDistributionData.length; i++) {
      if (mvpDistributionData[i].sid.length > 0 && mvpDistributionData[i].approved == true) {
        mvpDistributionData[i].approveDate = this.date;
      } else if (mvpDistributionData[i].approved == false) {
        mvpDistributionData[i].approveDate = null;
        count++;
      }
    }

    for (var j = 0; j < mvpDistributionData.length; j++) {
      if (mvpDistributionData[j].approved == true) {
        countApprovedAll++;
      }
    }
    if (countApprovedAll == mvpDistributionData.length) {
      var returnFlag = false;
      for (var k = 0; k < mvpDistributionData.length; k++) {
        if (mvpDistributionData[k].sid.length == 0) {
          this.msg = "Please select SID to approve.";
          returnFlag = true;
        }
      }
      if (returnFlag) {
        return;
      }
    }

    if (count == mvpDistributionData.length) {
      this.displayError = true;
      this.msg = "Approve atleast one Plan.";
      return;
    }
    for (var j = 0; j < mvpDistributionData.length; j++) {

    }

    data.list = mvpDistributionData;
    this.rewardsDistributionService.saveMVPDistributionDATA(dealerCode, data).subscribe(
      (saveMVPDistributionDatum) => {
        this.saveMVPDistributionDatum = (saveMVPDistributionDatum)
        this.getMVPDistributionData();
        this.mvpCancellation();
        this.getRewardsDistributionAmount();
        this.displayError = true;
        this.msg = "Successfully Approved";
      },
      (error) => {
        this.mvpCancellation();

      }
    )

  }
  public distributionHistoryData: any = [];
  public getDistributionHistoryData(programName: string) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    this.rewardsDistributionService.getDistributionHistoryData(dealerCode, programName).subscribe(
      (distributionHistoryData) => {
        this.distributionHistoryData = (distributionHistoryData)


      },
      (error) => {
      }
    )
  }

  // public eldistributionData: any = [
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "",
  //     "teamId": "SLXX",
  //     "updatedBy": "S08784O   ",
  //     "sid": "S08784O   ",
  //     "updatedDate": "2017-09-27",
  //     "allocationID": null,
  //     "amount": 2,
  //     "firstName": "Holly",
  //     "lastName": "Lebel"
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "",
  //     "teamId": "SLXX",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-09-27",
  //     "allocationID": null,
  //     "amount": 2,
  //     "firstName": null,
  //     "lastName": null
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "",
  //     "teamId": "SLXX",
  //     "updatedBy": "S08784O   ",
  //     "sid": "S08784O   ",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 2,
  //     "firstName": "Holly",
  //     "lastName": "Lebel"
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "",
  //     "teamId": "SLXX",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 2,
  //     "firstName": null,
  //     "lastName": null
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "test123",
  //     "teamId": "123",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 20,
  //     "firstName": null,
  //     "lastName": null
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "test123",
  //     "teamId": "123",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 212,
  //     "firstName": null,
  //     "lastName": null
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "testabc",
  //     "teamId": "abc",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 15,
  //     "firstName": null,
  //     "lastName": null
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "testabc",
  //     "teamId": "abc",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 1.1,
  //     "firstName": null,
  //     "lastName": null
  //   },
  //   {
  //     "expectedPayoutDate": "2017-10-19",
  //     "teamName": "testabc",
  //     "teamId": "abc1",
  //     "updatedBy": "SLXX",
  //     "sid": "SLXX",
  //     "updatedDate": "2017-07-03",
  //     "allocationID": null,
  //     "amount": 1.9,
  //     "firstName": null,
  //     "lastName": null
  //   }
  // ];
  public eldistributionData: any = [];
  public getELDistributionData() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    this.rewardsDistributionService.getELDistributionData(dealerCode).subscribe(
      (eldistributionData) => {
        this.eldistributionData = (eldistributionData)
        this.groupELdistributionData();
      },
      (error) => {
      }
    )
  }

  public groupedELdistributionData: any = [];
  public groupELdistributionData() {
    var uniqueTeamID: any = [];
    var groupByTeamIDData: any = [];

    for (var i = 0; i < this.eldistributionData.length; i++) {
      uniqueTeamID.push(this.eldistributionData[i].teamId);
    }
    uniqueTeamID = this.removeDuplicates(uniqueTeamID);

    for (var j = 0; j < uniqueTeamID.length; j++) {
      groupByTeamIDData.push({ teamName: "", teamId: "", amount: 0, elDistributedAmount: 0 })
      for (var k = 0; k < this.eldistributionData.length; k++) {
        if (this.eldistributionData[k].teamName == "") {
          this.eldistributionData[k].teamName = "-";
        }
        if (uniqueTeamID[j] == this.eldistributionData[k].teamId) {
          groupByTeamIDData[j].teamId = this.eldistributionData[k].teamId;
          groupByTeamIDData[j].teamName = this.eldistributionData[k].teamName;
          groupByTeamIDData[j].amount += this.eldistributionData[k].amount;

        }
      }
    }
    this.groupedELdistributionData = groupByTeamIDData;
    console.log(groupByTeamIDData);


  }

  public removeDuplicates(duplicateArray) {
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
  public saveDistributionDATUM: any;
  public saveDistributionDATA(programName: string) {

    var program = programName;
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var nameValueList: any = [];
    var nameValues: any = {};
    var rewardsAmount = this.rewardsAmount;
    var totalValues: any = 0;
    var checkDuplicateArray = [];
    var amount: any = 0;

    if (programName == "pc") {
      amount = rewardsAmount.pc
    } else if (programName == "el") {
      amount = this.elAmount;
    } else if (programName == "MVP") {
      amount = rewardsAmount.MVP
    } else if (programName == "ur") {
      amount = rewardsAmount.ur
    }

    if (programName == "el") {
      for (var j = 0; j < this.elParticipantDataValue.length; j++) {
        if (this.elParticipantDataValue[j].name != undefined && this.elParticipantDataValue[j].name.length > 0 && this.elParticipantDataValue[j].value > 0) {
          nameValueList.push({ name: this.elParticipantDataValue[j].name, value: parseFloat(this.elParticipantDataValue[j].value), teamId: this.elParticipantDataValue[j].teamID })
        }
      }
    } else {
      for (var i = 0; i < this.participantDataValue.length; i++) {
        if (this.participantDataValue[i].name != undefined && this.participantDataValue[i].name.length > 0 && this.participantDataValue[i].value > 0) {
          nameValueList.push({ name: this.participantDataValue[i].name, value: parseFloat(this.participantDataValue[i].value), teamId: null })
        }
      }
    }
    checkDuplicateArray.push(nameValueList[0]);
    for (var k = 1; k < nameValueList.length; k++) {
      var check = false;
      for (var l = 0; l < checkDuplicateArray.length; l++) {
        if (nameValueList[k].name == checkDuplicateArray[l].name) {
          check = true;
          // this.pcOpenAllocationTable();
          // this.getParticipantsByDealer(programName);
          // this.getRewardsDistributionAmount();
          this.displayError = true;
          this.msg = "A user has been selected multiple times for distribution.";
          return;
        }
      }
      if (!check) {
        checkDuplicateArray.push(nameValueList[k]);
      }
    }

    for (var m = 0; m < nameValueList.length; m++) {
      totalValues = totalValues + nameValueList[m].value;
    }

    if (totalValues == 0) {
      this.displayError = true;
      this.msg = "Please select a participant and indicate the amount to be paid. The total Reward Amount available must be distributed to participants in order to proceed.";
      return;
    }
    else if (totalValues > amount) {
      this.displayError = true;
      this.msg = "Distributions should not exceed total Reward Amount";
      return;
    } else if (totalValues < amount) {
      this.displayError = true;
      this.msg = "Additional funds remain, Please continue Reward Distribution";
      return;
    }

    nameValues.list = nameValueList;

    this.rewardsDistributionService.saveDistributionData(dealerCode, nameValues, programName).subscribe(
      (saveDistributionDATUM) => {
        this.saveDistributionDATUM = (saveDistributionDATUM)
        this.elCancellation();
        this.pcCancellation();
        this.urCancellation();
        this.getRewardsDistributionAmount();
        if (this.saveDistributionDATUM == true) {
          this.displayError = true;
          this.hideelParticipantTable = true;
          this.hidepcParticipantTable = true;
          this.hideurParticipantTable = true;
          this.msg = "Successfully Allocated the Reward Amount";
        } else if (this.saveDistributionDATUM == false) {
          this.displayError = true;
          this.hideelParticipantTable = true;
          this.hidepcParticipantTable = true;
          this.hideurParticipantTable = true;
          this.msg = "Internal Server Error";
        }

      },
      (error) => {
        setTimeout(() => {
          if (error != undefined && error.length < 250) {
            this.msg = error;
          } else {
            this.displayError = true;
            this.msg = "Error in Distribution.";
            this.hideelParticipantTable = true;
            this.hidepcParticipantTable = true;
            this.hideurParticipantTable = true;
          }

        }, 1000)
        this.elCancellation();
        this.pcCancellation();
        this.urCancellation();
      }
    )
  }


  public msg: String = "";
  public selectedProgramName(programName: string) {



  }
  public mvpSelectedSID(sid) {
    // alert(sid)
  }

  public mvpApproved(approve) {
    // alert(approve)
  }
  public selectedParticipant(participantName) {

    //alert(participantName);
  }
  public totalRewardedAmount: any = 0;
  public rewardedAmount(amount) {
    this.totalRewardedAmount = 0;
    for (var i = 0; i < this.participantDataValue.length; i++) {
      this.totalRewardedAmount = this.totalRewardedAmount + this.participantDataValue[i].value
    }
    this.distributedAmount = this.totalRewardedAmount;
  }

  public totalELRewardedAmount: any = 0;
  public elRewardedAmount(amount, teamID) {
    this.totalELRewardedAmount = 0;
    for (var i = 0; i < this.elParticipantDataValue.length; i++) {
      for (var j = 0; j < this.groupedELdistributionData.length; j++) {
        if (this.elParticipantDataValue[i].teamID == this.groupedELdistributionData[j].teamID) {
          this.totalELRewardedAmount = this.totalELRewardedAmount + this.elParticipantDataValue[i].value
          this.groupedELdistributionData[j].elDistributedAmount = this.totalELRewardedAmount;
        }
      }

    }
    // this.elDistributedAmount = this.totalELRewardedAmount;
  }



  public mvpCancellation() {
    this.msg = "";
    this.displayError = false;
    this.approveAllMVP = false;
    this.hideMVPSection = false;
    if (this.lastClick == "MVP" && this.showActiveProgram == false) {
      this.showActiveProgram = false;
      this.activeProgram = "MVP";
      this.lastClick = "MVP";
    } else if (this.lastClick == "MVP" && this.showActiveProgram == true) {
      this.showActiveProgram = false;
      this.hideMVPSection = false;
      this.activeProgram = "";
      this.lastClick = "";
    } else {
      this.showActiveProgram = true;
      this.activeProgram = "MVP";
      this.lastClick = "MVP";
    }
  }
  public elCancellation() {
    this.msg = "";
    this.displayError = false;
    this.hideELSection = false;
    if (this.lastClick == "Express Lane" && this.showActiveProgram == false) {
      this.showActiveProgram = false;
      this.activeProgram = "Express Lane";
      this.lastClick = "Express Lane";
    } else if (this.lastClick == "Express Lane" && this.showActiveProgram == true) {
      this.showActiveProgram = false;
      this.hideELSection = false;
      this.activeProgram = "";
      this.lastClick = "";
    } else {
      this.showActiveProgram = true;
      this.activeProgram = "Express Lane";
      this.lastClick = "Express Lane";
    }
  }
  public pcCancellation() {
    this.displayError = false;
    this.msg = "";
    this.hidePCSection = false;
    if (this.lastClick == "Parts Counter" && this.showActiveProgram == false) {
      this.showActiveProgram = false;
      this.activeProgram = "Parts Counter";
      this.lastClick = "Parts Counter";
    } else if (this.lastClick == "Parts Counter" && this.showActiveProgram == true) {
      this.showActiveProgram = false;
      this.hidePCSection = false;
      this.activeProgram = "";
      this.lastClick = "";
    } else {
      this.showActiveProgram = true;
      this.activeProgram = "Parts Counter";
      this.lastClick = "Parts Counter";
    }
  }
  public urCancellation() {
    this.displayError = false;
    this.msg = "";
    this.hideURSection = false;
    if (this.lastClick == "Used Recon" && this.showActiveProgram == false) {
      this.showActiveProgram = false;
      this.activeProgram = "Used Recon";
      this.lastClick = "Used Recon";
    } else if (this.lastClick == "Used Recon" && this.showActiveProgram == true) {
      this.hideURSection = false;
      this.showActiveProgram = false;
      this.activeProgram = "";
      this.lastClick = "";
    } else {
      this.showActiveProgram = true;
      this.activeProgram = "Used Recon";
      this.lastClick = "Used Recon";
    }
  }
  public approveAllMVPPlans(approveAllMVP) {
    // alert(approveAllMVP);
    if (approveAllMVP != undefined && approveAllMVP == true) {
      this.approveAllMVP = true;
    } else {
      this.approveAllMVP = false;
    }

    if (this.approveAllMVP == true) {
      for (var i = 0; i < this.mvpDistributionDatum.length; i++) {
        this.mvpDistributionDatum[i].approved = true;
      }
    } else if (this.approveAllMVP == false) {
      for (var i = 0; i < this.mvpDistributionDatum.length; i++) {
        this.mvpDistributionDatum[i].approved = false;
      }
    }
  }

  public rewardsAmountDatum: any;
  public getRewardsAmountData(programName) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getRewardsAmountData(programName, dealerCode).subscribe(
      (rewardsAmountDatum) => {
        this.rewardsAmountDatum = (rewardsAmountDatum)
        console.log(this.rewardsAmountDatum);
      },
      (error) => {

      }
    )
  }
  public elRewardsAmountDatum: any;
  public getELRewardsAmountData(programName, teamID) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getELRewardsAmountData(programName, dealerCode, teamID).subscribe(
      (elRewardsAmountDatum) => {
        this.elRewardsAmountDatum = (elRewardsAmountDatum)
        // console.log(this.elRewardsAmountDatum);
      },
      (error) => {

      }
    )
  }

}
