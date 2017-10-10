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
  private mvpInterface: MVPInterface = { approved: "No", sid: "" };
  private eldistInterface: ELDistributionInterface = { name: "", amount: "" }
  booleanYesNoOptions: SelectItem[] = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }];
  programNameOptions: SelectItem[] = [{ label: "Express Lane", value: "Express Lane" }, { label: "Parts Counter", value: "Parts Counter" }, { label: "Used Recon", value: "Used Recon" }];
  private date: string = "";
  private approveAllMVP: boolean = false;
  private distributedAmount: any = 0;
  private hideelParticipantTable: boolean = false;
  private hidepcParticipantTable: boolean = false;
  private hideurParticipantTable: boolean = false;
  constructor(private rewardsDistributionService: RewardsDistributionService) { }

  ngOnInit() {
    this.getRewardsDistributionAmount();
    var d = new Date;
    this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();

    // this.getParticipantsByDealer();
  }


  private getSelectedDealerCode() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  }

  private getSelectedDealerName() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
  }

  private rewardsAmount: any = {}
  private disableMVPButton: boolean = false;
  private disableELButton: boolean = false;
  private disablePCButton: boolean = false;
  private disableURButton: boolean = false;
  private elRewardAmountModal: boolean = false;
  private pcRewardAmountModal: boolean = false;
  private urRewardAmountModal: boolean = false;
  private getRewardsDistributionAmount() {
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

  private showActiveProgram: boolean = false;
  private activeProgram: string = "";
  private lastClick: string = "";
  private hideMVPSection: boolean = true;
  private hideELSection: boolean = true;
  private hidePCSection: boolean = true;
  private hideURSection: boolean = true;
  private mvpOpenAllocationTable() {
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
  private elOpenAllocationTable() {
    if (this.rewardsAmount.el != undefined && this.rewardsAmount.el <= 0) {
      this.hideelParticipantTable = true;
    } else {
      this.hideelParticipantTable = false;
    }
    this.displayError = false;
    this.msg = "";
    this.distributedAmount = 0;
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
  private pcOpenAllocationTable() {
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
  private urOpenAllocationTable() {
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

  private mvpDistributionDatum: any = [];
  private getMVPDistributionData() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getMVPDistributionData(dealerCode).subscribe(
      (mvpDistributionDatum) => {
        this.mvpDistributionDatum = (mvpDistributionDatum)
        // console.log(this.mvpDistributionDatum);
        for (var i = 0; i < this.mvpDistributionDatum.length; i++) {
          this.mvpDistributionDatum[i].selectedSid = "";
          this.mvpDistributionDatum[i].approved = false;
        }
        //  console.log(this.mvpDistributionDatum);
      },
      (error) => {
      }
    )
  }
  private distributionAllocationHistoryDatum: any;
  private getDistributionAllocationHistory(programName: string) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getDistributionAllocationHistory(dealerCode, programName).subscribe(
      (distributionAllocationHistoryDatum) => {
        this.distributionAllocationHistoryDatum = (distributionAllocationHistoryDatum)

      },
      (error) => {
      }
    )
  }
  private participantsList: any = [];
  private participantDataValue: any = [];
  private participantsOptions: SelectItem[] = [];
  private getParticipantsByDealer(program: string) {
    this.participantsOptions = [];
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.participantDataValue = [];
    var constructParticipants: any = [];
    this.rewardsDistributionService.getParticipantsByDealer(dealerCode, program).subscribe(
      (participantsList) => {
        this.participantsList = (participantsList)
        for (var i = 0; i < this.participantsList.length; i++) {
          constructParticipants.push(this.participantsList[i].item2 + " - " + this.participantsList[i].item1);
          this.participantsOptions.push({
            label: this.participantsList[i].item2 + " - " + this.participantsList[i].item1, value: this.participantsList[i].item2
          })
        }
        for (var i = 0; i < 10; i++) {
          this.participantDataValue.push({ name: "", value: 0 });
        }
        // console.log(this.participantDataValue);
      },
      (error) => {
      }
    )
  }
  private addNewRow() {
    this.participantDataValue.push({ name: "", value: 0 });
  }

  private saveMVPDistributionDatum: any;
  private displayError: boolean = false;
  private saveMVPDistributionDATA() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var mvpDistributionData = this.mvpDistributionDatum;
    var data: any = {};
    var count: any = 0;
    for (var i = 0; i < mvpDistributionData.length; i++) {
      if (mvpDistributionData[i].sid.length > 0 && mvpDistributionData[i].approved == true) {
        mvpDistributionData[i].approveDate = this.date;
      } else if (mvpDistributionData[i].approved == false) {
        mvpDistributionData[i].approveDate = null;
        count++;
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
  private distributionHistoryData: any = [];
  private getDistributionHistoryData(programName: string) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    this.rewardsDistributionService.getDistributionHistoryData(dealerCode, programName).subscribe(
      (distributionHistoryData) => {
        this.distributionHistoryData = (distributionHistoryData)


      },
      (error) => {
      }
    )
  }

  private saveDistributionDATUM: any;
  private saveDistributionDATA(programName: string) {
    
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
      amount = rewardsAmount.el
    } else if (programName == "MVP") {
      amount = rewardsAmount.MVP
    } else if (programName == "ur") {
      amount = rewardsAmount.ur
    }

    for (var i = 0; i < this.participantDataValue.length; i++) {
      if (this.participantDataValue[i].name != undefined && this.participantDataValue[i].name.length > 0 && this.participantDataValue[i].value > 0) {
        nameValueList.push({ name: this.participantDataValue[i].name, value: parseFloat(this.participantDataValue[i].value) })
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


  private msg: String = "";
  private selectedProgramName(programName: string) {



  }
  private mvpSelectedSID(sid) {
    // alert(sid)
  }

  private mvpApproved(approve) {
    // alert(approve)
  }
  private selectedParticipant(participantName) {

    //alert(participantName);
  }
  private totalRewardedAmount: any = 0;
  private rewardedAmount(amount) {
    this.totalRewardedAmount = 0;
    for (var i = 0; i < this.participantDataValue.length; i++) {
      this.totalRewardedAmount = this.totalRewardedAmount + this.participantDataValue[i].value
    }
    this.distributedAmount = this.totalRewardedAmount;
  }

  private mvpCancellation() {
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
  private elCancellation() {
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
  private pcCancellation() {
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
  private urCancellation() {
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
  private approveAllMVPPlans(approveAllMVP) {
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

  private rewardsAmountDatum: any;
  private getRewardsAmountData(programName) {
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

}
