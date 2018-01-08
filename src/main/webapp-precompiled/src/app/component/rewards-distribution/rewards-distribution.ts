import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { RewardsDistributionService } from '../../services/rewards-distribution/rewards-distribution.service';
import { MVPAutoApprovalSettingService } from '../../services/mvp-service/mvp-autoapprove/mvp-autoapprove.service';


import { MVPInterface } from './mvpData.interface';
import { ELDistributionInterface } from './el-distribution.interface';

declare var $: any;

@Component({
  selector: 'parts-counter',
  templateUrl: './rewards-distribution.html'
  //styleUrls: ['./marketing-home.component.css'] 
})
export class RewardsDistributionComponent implements OnInit {
  mvpInterface: MVPInterface = { approved: "No", sid: "" };
  eldistInterface: ELDistributionInterface = { name: "", amount: "" }
  booleanYesNoOptions: SelectItem[] = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }];
  programNameOptions: SelectItem[] = [{ label: "Express Lane", value: "Express Lane" }, { label: "Parts Counter", value: "Parts Counter" }, { label: "Used Recon", value: "Used Recon" }];
  date: string = "";
  approveAllMVP: boolean = false;
  distributedAmount: any = 0;
  elDistributedAmount: any = 0;
  hideelParticipantTable: boolean = false;
  hidepcParticipantTable: boolean = false;
  hideurParticipantTable: boolean = false;

  isDealerManager: boolean = false;
  isServiceManagerOfRecords: boolean = false;
  isELManager: boolean = false;
  isPCManager: boolean = false;
  isUVMManager: boolean = false;
  elManagerExists: boolean = true;
  pcManagerExists: boolean = true;
  uvmManagerExists: boolean = true;

  mvpApproval: boolean = false;
  selectedPositionCode: string = "";

  rewardsAmount: any = {}
  disableMVPButton: boolean = true;
  hideMVPTab: boolean = true;
  disableELButton: boolean = false;
  disablePCButton: boolean = false;
  disableURButton: boolean = false;
  elRewardAmountModal: boolean = false;
  pcRewardAmountModal: boolean = false;
  urRewardAmountModal: boolean = false;

  showELTab: boolean = false;
  showPCTab: boolean = false;
  showUVMTab: boolean = false;
  
  constructor(
    private rewardsDistributionService: RewardsDistributionService,
    private mvpAutoApprovalSettingService: MVPAutoApprovalSettingService) { }

  ngOnInit() {
    this.getMVPApprovalData();
    this.getRewardsDistributionAmount();
    var d = new Date;
    this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();

    var selectedCodeData = JSON.parse(sessionStorage.getItem("selectedCodeData"));
    this.isDealerManager = selectedCodeData.isDealerManager;
    this.isServiceManagerOfRecords = selectedCodeData.isServiceManagerOfRecord;
    this.isELManager = selectedCodeData.isElManager;
    this.isPCManager = selectedCodeData.isPCManager;
    this.isUVMManager = selectedCodeData.isUVMManager;
    this.elManagerExists = selectedCodeData.elManagerExists;
    this.pcManagerExists = selectedCodeData.pcManagerExists;
    this.uvmManagerExists = selectedCodeData.uvmManagerExists;
    this.mvpApproval = selectedCodeData.mvpApproval;
    this.selectedPositionCode = selectedCodeData.selectedPositionCode;
    // this.getParticipantsByDealer();
    this.showDistributionTabPerManager();

  }

  showDistributionTabPerManager() {
    if (this.isDealerManager) {
      if (this.elManagerExists) {
        this.showELTab = true;
      }
      if (this.pcManagerExists) {
        this.showPCTab = true;
      }
      if (this.uvmManagerExists) {
        this.showUVMTab = true;
      }
    }

    if (this.isELManager) {
      this.showELTab = true;
    }
    if (this.isPCManager) {
      this.showPCTab = true;
    }
    if (this.isUVMManager) {
      this.showUVMTab = true;
    }

  }

  mvpApprovalDatum: any = true;
  getMVPApprovalData() {
    this.mvpAutoApprovalSettingService.getMVPApprovalData().subscribe( 
      (mvpApprovalData) => {
        this.mvpApprovalDatum = mvpApprovalData
        // if mvpautoapproval is checked this.mvpApprovalDatum will return true 
        // manual-false
        if (!this.mvpApprovalDatum && (this.isDealerManager || this.isServiceManagerOfRecords || this.selectedPositionCode == "02" ||
          this.selectedPositionCode == "17" || this.selectedPositionCode == "33" || this.selectedPositionCode == "35")) {
          this.hideMVPTab = false;
        }
      },
      (error) => {
        this.mvpApprovalDatum = false;
      }
    )
  }

  getSelectedDealerCode() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  }

  getSelectedDealerName() {
    return JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerName;
  }

  getRewardsDistributionAmount() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getRewardsDistributionAmount(dealerCode).subscribe(
      (rewardsAmount) => {
        this.rewardsAmount = (rewardsAmount)
       
        if (this.rewardsAmount.MVP != undefined && this.rewardsAmount.MVP <= 0) {
          this.disableMVPButton = true; 
          this.rewardsAmount.MVP = 0; // because in some case the value is negative from service
        } else {
          this.disableMVPButton = false;
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

  showActiveProgram: boolean = false;
  activeProgram: string = "";
  lastClick: string = "";
  hideMVPSection: boolean = true;
  hideELSection: boolean = true;
  hidePCSection: boolean = true;
  hideURSection: boolean = true;
  mvpOpenAllocationTable() {
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

  elOpenAllocationTable() {
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

  pcOpenAllocationTable() {
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

  urOpenAllocationTable() {
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

  mvpDistributionDatum: any = [];
  getMVPDistributionData() {
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

  distributionAllocationHistoryDatum: any;
  getDistributionAllocationHistory(programName: string) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getDistributionAllocationHistory(dealerCode, programName).subscribe(
      (distributionAllocationHistoryDatum) => {
        this.distributionAllocationHistoryDatum = (distributionAllocationHistoryDatum)

      },
      (error) => {
      }
    )
  }
  participantsList: any = [];
  participantDataValue: any = [];
  participantsOptions: SelectItem[] = [];
  partcipantItem2SID: any = [];
  getParticipantsByDealer(program: string) {
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

  elParticipantsList: any = [];
  elParticipantDataValue: any = [];
  elParticipantsOptions: SelectItem[] = [];
  activeTeamID: any = "";
  elAmount: any = 0;
  getELParticipantsByDealer(program: string, teamID: string, amount: any) {
    this.activeTeamID = teamID;
    this.elAmount = amount;
    this.hideelParticipantTable = false;
    for (var i = 0; i < this.groupedELdistributionData.length; i++) {
      this.groupedELdistributionData[i].elDistributedAmount = 0
    }
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

  addNewRow() {
    this.participantDataValue.push({ name: "", value: 0 });
    this.elParticipantDataValue.push({ name: "", value: 0, teamID: this.activeTeamID.trim() });
  }

  saveMVPDistributionDatum: any;
  displayError: boolean = false;
  saveMVPDistributionDATA() {
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
      this.msg = "Approve atleast one plan.";
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
        this.msg = "Successfully approved";
      },
      (error) => {
        this.mvpCancellation();

      }
    )

  }
  distributionHistoryData: any = [];
  getDistributionHistoryData(programName: string) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

    this.rewardsDistributionService.getDistributionHistoryData(dealerCode, programName).subscribe(
      (distributionHistoryData) => {
        this.distributionHistoryData = (distributionHistoryData)


      },
      (error) => {
      }
    )
  }

  eldistributionData: any = [];
  getELDistributionData() {
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

  groupedELdistributionData: any = [];
  groupELdistributionData() {
    var uniqueTeamID: any = [];
    var groupByTeamIDData: any = [];

    for (var i = 0; i < this.eldistributionData.length; i++) {
      uniqueTeamID.push(this.eldistributionData[i].teamId.toUpperCase().trim());
    }
    uniqueTeamID = this.removeDuplicates(uniqueTeamID);

    for (var j = 0; j < uniqueTeamID.length; j++) {
      groupByTeamIDData.push({ teamName: "", teamId: "", amount: 0, elDistributedAmount: 0 })
      for (var k = 0; k < this.eldistributionData.length; k++) {
        if (this.eldistributionData[k].teamName == "") {
          this.eldistributionData[k].teamName = "-";
        }
        if (uniqueTeamID[j].toUpperCase().trim() == this.eldistributionData[k].teamId.toUpperCase().trim()) {
          groupByTeamIDData[j].teamId = this.eldistributionData[k].teamId.trim();
          groupByTeamIDData[j].teamName = this.eldistributionData[k].teamName.trim();
          groupByTeamIDData[j].amount += this.eldistributionData[k].amount;

        }
      }
    }
    this.groupedELdistributionData = groupByTeamIDData;
    // console.log(groupByTeamIDData);
  }

  removeDuplicates(duplicateArray) {
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

  saveDistributionDATUM: any;
  saveDistributionDATA(programName: string) {

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
          nameValueList.push({ name: this.elParticipantDataValue[j].name, value: parseFloat(this.elParticipantDataValue[j].value), teamId: this.elParticipantDataValue[j].teamID.trim() })
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
      this.msg = "Please select a participant and indicate the amount to be paid. The total reward amount available must be distributed to participants in order to proceed.";
      return;
    }
    else if (totalValues > amount) {
      this.displayError = true;
      this.msg = "Distributions should not exceed total reward amount";
      return;
    } else if (totalValues < amount) {
      this.displayError = true;
      this.msg = "Additional funds remain, please continue reward distribution";
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
          this.msg = "Successfully allocated the reward amount";
        } else if (this.saveDistributionDATUM == false) {
          this.displayError = true;
          this.hideelParticipantTable = true;
          this.hidepcParticipantTable = true;
          this.hideurParticipantTable = true;
          this.msg = "Internal server error";
        }

      },
      (error) => {
        setTimeout(() => {
          if (error != undefined && error.length < 250) {
            this.msg = error;
          } else {
            this.displayError = true;
            this.msg = "Error in distribution.";
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

  msg: String = "";
  selectedProgramName(programName: string) {
  }

  mvpSelectedSID(sid) {
    // alert(sid)
  }
  mvpApproved(approve) {
    // alert(approve)
  }
  selectedParticipant(participantName) {
    //alert(participantName);
  }
  totalRewardedAmount: any = 0;
  rewardedAmount(amount) {
    this.totalRewardedAmount = 0;
    for (var i = 0; i < this.participantDataValue.length; i++) {
      this.totalRewardedAmount = this.totalRewardedAmount + this.participantDataValue[i].value
    }
    this.distributedAmount = this.totalRewardedAmount;
  }

  totalELRewardedAmount: any = 0;
  elRewardedAmount(amount, teamID) {
    this.totalELRewardedAmount = 0;
    for (var i = 0; i < this.elParticipantDataValue.length; i++) {
      for (var j = 0; j < this.groupedELdistributionData.length; j++) {
        if (this.elParticipantDataValue[i].teamID == this.groupedELdistributionData[j].teamId.trim()) {
          this.totalELRewardedAmount = this.totalELRewardedAmount + this.elParticipantDataValue[i].value
          this.groupedELdistributionData[j].elDistributedAmount = this.totalELRewardedAmount;
        }
      }

    }
    // this.elDistributedAmount = this.totalELRewardedAmount;
  }



  mvpCancellation() {
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
  elCancellation() {
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
  pcCancellation() {
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
  urCancellation() {
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
  approveAllMVPPlans(approveAllMVP) {
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

  rewardsAmountDatum: any;
  getRewardsAmountData(programName) {
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
  elRewardsAmountDatum: any;
  getELRewardsAmountData(programName, teamID) {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getELRewardsAmountData(programName, dealerCode, teamID.trim()).subscribe(
      (elRewardsAmountDatum) => {
        this.elRewardsAmountDatum = (elRewardsAmountDatum)
        // console.log(this.elRewardsAmountDatum);
      },
      (error) => {

      }
    )
  }

}
