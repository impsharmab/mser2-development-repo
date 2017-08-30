import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { RewardsDistributionService } from '../../services/rewards-distribution/rewards-distribution.service';

import { MVPInterface } from './mvpData.interface';
import { ELDistributionInterface } from './el-distribution.interface';

@Component({
  selector: 'parts-counter',
  templateUrl: './rewards-distribution.html'
  //styleUrls: ['./marketing-home.component.css'] 
})
export class RewardsDistributionComponent implements OnInit {
  private mvpInterface: MVPInterface = { approved: "No", sid: "" };
  private eldistInterface: ELDistributionInterface = { name: "", amount: "" }
  allocateAmount = { "mvp": "$9000.02", "el": "$400", "pc": "$750", "ur": "$230" };
  dealerRewDistAmt = { dealershipName: "Bob Baker", rewardsAmount: "$58956.03", distributedAmount: "$4545.54" };
  booleanYesNoOptions: SelectItem[] = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }];
  programNameOptions: SelectItem[] = [{ label: "Express Lane", value: "Express Lane" }, { label: "Parts Counter", value: "Parts Counter" }, { label: "Used Recon", value: "Used Recon" }];
  participantOptions: SelectItem[] = [{ label: "Oliver Edward", value: "Oliver Edward" }, { label: "Kevin Hunt", value: "Kevin Hunt" }];
  participantTable: any = [{ name: "Oliver Edward", value: "" },
  { name: "Kevin Hahn", value: "" },
  { name: "Miller Wayne", value: "" },
  { name: "Hunter East", value: "" }
  ]
  private date: string = "";
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
  private getRewardsDistributionAmount() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getRewardsDistributionAmount(dealerCode).subscribe(
      (rewardsAmount) => {
        this.rewardsAmount = (rewardsAmount)
        if (this.rewardsAmount.MVP != undefined && this.rewardsAmount.MVP == 0) {
          this.disableMVPButton = true;
        } if (this.rewardsAmount.el != undefined && this.rewardsAmount.el == 0) {
          this.disableELButton = true;
        } if (this.rewardsAmount.pc != undefined && this.rewardsAmount.pc == 0) {
          this.disablePCButton = true;
        } if (this.rewardsAmount.ur != undefined && this.rewardsAmount.ur == 0) {
          this.disableURButton = true;
        }
      },
      (error) => {
      }
    )
  }


  // private showMVPDIV: boolean = false;
  // private showELDIV: boolean = false;
  // private showPCDIV: boolean = false;
  // private showURDIV: boolean = false;
  // private preSelectedProgramName: string = "";
  // private displayActiveProgram: boolean = false;
  // private count: any = 0;
  // private mvpOpenAllocationTable() {
  //   this.msg = "";
  //   if (this.count == 0) { }
  //   this.displayActiveProgram = !this.displayActiveProgram;
  //   this.preSelectedProgramName = "Active Program: MVP";
  //   this.showMVPDIV = true;
  //   this.showELDIV = false;
  //   this.showPCDIV = false;
  //   this.showURDIV = false;

  // }
  // private elOpenAllocationTable() {
  //   this.msg = "";
  //   this.displayActiveProgram = !this.displayActiveProgram;
  //   this.preSelectedProgramName = "Active Program: Express Lane";
  //   this.showMVPDIV = false;
  //   this.showELDIV = true;
  //   this.showPCDIV = false;
  //   this.showURDIV = false;
  // }
  // private pcOpenAllocationTable() {
  //   this.msg = "";
  //   this.displayActiveProgram = !this.displayActiveProgram;
  //   this.preSelectedProgramName = "Active Program: Parts Counter";
  //   this.showMVPDIV = false;
  //   this.showELDIV = false;
  //   this.showPCDIV = true;
  //   this.showURDIV = false;
  // }
  // private urOpenAllocationTable() {
  //   this.msg = "";
  //   this.displayActiveProgram = !this.displayActiveProgram;
  //   this.preSelectedProgramName = "Active Program: Used Recon";
  //   this.showMVPDIV = false;
  //   this.showELDIV = false;
  //   this.showPCDIV = false;
  //   this.showURDIV = true;
  // }
  private showActiveProgram: boolean = false;
  private activeProgram: string = "";
  private lastClick: string = "";
  private hideMVPSection: boolean = true;
  private hideELSection: boolean = true;
  private hidePCSection: boolean = true;
  private hideURSection: boolean = true;
  private mvpOpenAllocationTable() {
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
    this.msg = "";
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
    this.msg = "";
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
    this.msg = "";
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

  private mvpDistributionDatum: any;
  private getMVPDistributionData() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getMVPDistributionData(dealerCode).subscribe(
      (mvpDistributionDatum) => {
        this.mvpDistributionDatum = (mvpDistributionDatum)
        // console.log(this.mvpDistributionDatum);
        for (var i = 0; i < this.mvpDistributionDatum.length; i++) {
          this.mvpDistributionDatum[i].selectedSid = "";
          this.mvpDistributionDatum[i].approved = "No";
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
          this.participantDataValue.push({ name: "", value: "" });
        }
        // console.log(this.participantDataValue);
      },
      (error) => {
      }
    )
  }
  private addNewRow() {
    this.participantDataValue.push({ name: "", value: "" });
  }

  private saveMVPDistributionDatum: any;
  private saveMVPDistributionDATA() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var mvpDistributionData = this.mvpDistributionDatum;
    var data: any = {};
    var count: any = 0;
    for (var i = 0; i < mvpDistributionData.length; i++) {
      if (mvpDistributionData[i].sid.length > 0 && mvpDistributionData[i].approved == "Yes") {
        mvpDistributionData[i].approveDate = this.date;
      } else if (mvpDistributionData[i].approved == "No") {
        mvpDistributionData[i].approveDate = null;
        count++;
      }
    }

    if (count == mvpDistributionData.length) {
      this.msg="Please check at least a single SID."
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
        this.msg = "Successfully Updated";
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
  // private saveELDATUM: any;
  // private saveELDistributionDATA() {
  //   var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  //   var nameValueList: any = [];
  //   var nameValues: any = {};
  //   var rewardsAmount = this.rewardsAmount;
  //   var totalValues: any = 0;

  //   for (var i = 0; i < this.participantDataValue.length; i++) {
  //     if (this.participantDataValue[i].name.length > 0 && this.participantDataValue[i].value.length > 0) {
  //       nameValueList.push({ name: this.participantDataValue[i].name, value: parseFloat(this.participantDataValue[i].value) })
  //     }
  //   }
  //   nameValues.list = nameValueList;

  //   this.rewardsDistributionService.saveELDistributionData(dealerCode, nameValues).subscribe(
  //     (savePCDATUM) => {
  //       this.savePCDATUM = (savePCDATUM)
  //       if (this.savePCDATUM == true) {
  //         this.msg = "Successfully Allocated the Rewards Amount";
  //       }
  //     },
  //     (error) => {
  //       setTimeout(() => {
  //         if (error !== undefined && error.length < 250) {
  //           this.msg = error;
  //         } else {
  //           this.msg = "Error in Distribution.";
  //         }

  //       }, 1000)
  //     }
  //   )
  // }
  // private savePCDATUM: any;
  // private savePCDistributionDATA() {
  //   var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  //   var nameValueList: any = [];
  //   var nameValues: any = {};
  //   var rewardsAmount = this.rewardsAmount;
  //   var totalValues: any = 0;

  //   for (var i = 0; i < this.participantDataValue.length; i++) {
  //     if (this.participantDataValue[i].name.length > 0 && this.participantDataValue[i].value.length > 0) {
  //       nameValueList.push({ name: this.participantDataValue[i].name, value: parseFloat(this.participantDataValue[i].value) })
  //     }
  //   }
  //   nameValues.list = nameValueList;

  //   this.rewardsDistributionService.savePCDistributionData(dealerCode, nameValues).subscribe(
  //     (savePCDATUM) => {
  //       this.savePCDATUM = (savePCDATUM)
  //       if (this.savePCDATUM == true) {
  //         this.msg = "Successfully Allocated the Rewards Amount";
  //       }
  //     },
  //     (error) => {
  //       setTimeout(() => {
  //         if (error !== undefined && error.length < 250) {
  //           this.msg = error;
  //         } else {
  //           this.msg = "Error in Distribution.";
  //         }

  //       }, 1000)
  //     }
  //   )
  // }

  // private saveURDATUM: any;
  // private saveURDistributionDATA() {
  //   var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
  //   var nameValueList: any = [];
  //   var nameValues: any = {};
  //   var rewardsAmount = this.rewardsAmount;
  //   var totalValues: any = 0;

  //   for (var i = 0; i < this.participantDataValue.length; i++) {
  //     if (this.participantDataValue[i].name.length > 0 && this.participantDataValue[i].value.length > 0) {
  //       nameValueList.push({ name: this.participantDataValue[i].name, value: parseFloat(this.participantDataValue[i].value) })
  //     }
  //   }
  //   nameValues.list = nameValueList;

  //   this.rewardsDistributionService.saveURDistributionData(dealerCode, nameValues).subscribe(
  //     (saveURDATUM) => {
  //       this.saveURDATUM = (saveURDATUM)
  //       if (this.saveURDATUM == true) {
  //         this.msg = "Successfully Allocated the Rewards Amount";
  //       }
  //     },
  //     (error) => {
  //       setTimeout(() => {
  //         if (error !== undefined && error.length < 250) {
  //           this.msg = error;
  //         } else {
  //           this.msg = "Error in Distribution.";
  //         }

  //       }, 1000)
  //     }
  //   )
  // }

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
      if (this.participantDataValue[i].name.length > 0 && this.participantDataValue[i].value.length > 0) {
        nameValueList.push({ name: this.participantDataValue[i].name, value: parseFloat(this.participantDataValue[i].value) })
      }
    }

    checkDuplicateArray.push(nameValueList[0]);
    for (var k = 1; k < nameValueList.length; k++) {
      var check = false;
      for (var l = 0; l < checkDuplicateArray.length; l++) {
        if (nameValueList[k].name == checkDuplicateArray[l].name) {
          check = true;
          this.pcOpenAllocationTable();
          this.getParticipantsByDealer('pc');
          this.msg = "You have selected the same participant twice. Please revise your reward distribution and Save Changes.";
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

    if (totalValues > amount) {
      this.msg = "Distributions may not exceed total reward amount";
      return;
    } else if (totalValues < amount) {
      this.msg = "Additional funds remain, Please continue reward distribution";
      return;
    }
    nameValues.list = nameValueList;

    this.rewardsDistributionService.saveDistributionData(dealerCode, nameValues, programName).subscribe(
      (saveDistributionDATUM) => {
        this.saveDistributionDATUM = (saveDistributionDATUM)
        if (this.saveDistributionDATUM == true) {
          this.msg = "Successfully Allocated the Reward Amount";
        }
        this.elCancellation();
        this.pcCancellation();
        this.urCancellation();
      },
      (error) => {
        setTimeout(() => {
          if (error !== undefined && error.length < 250) {
            this.msg = error;
          } else {
            this.msg = "Error in Distribution.";
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
    if (programName === "Express Lane") {
      this.dealerRewDistAmt = { dealershipName: "Bob Baker Express Lane", rewardsAmount: "$58956.03", distributedAmount: "$4545.54" };
      this.participantOptions = [{ label: "Oliver Edward", value: "Oliver Edward" }, { label: "Kevin Hunt", value: "Kevin Hunt" }, { label: "Kevin Hunt", value: "Kevin Hunt" }];
    } else if (programName === "Parts Counter") {
      this.dealerRewDistAmt = { dealershipName: "Bob Baker Parts Counter", rewardsAmount: "$58956.03", distributedAmount: "$4545.54" };
      this.participantOptions = [{ label: "Parts Counter", value: "Parts Counter" }, { label: "Kevin Hunt", value: "Kevin Hunt" }, { label: "Kevin Hunt", value: "Kevin Hunt" }];
    } else if (programName === "Used Recon") {
      this.dealerRewDistAmt = { dealershipName: "Bob Baker Used Recon", rewardsAmount: "$58956.03", distributedAmount: "$4545.54" };
      this.participantOptions = [{ label: "Used Recon", value: "Used Recon" }, { label: "Kevin Hunt", value: "Kevin Hunt" }, { label: "Kevin Hunt", value: "Kevin Hunt" }];
    }


  }
  private mvpSelectedSID(sid) {
    alert(sid)
  }

  private mvpApproved(approve) {
    alert(approve)
  }
  private selectedParticipant(participantName) {

    //alert(participantName);
  }

  private rewardedAmount(amount) {
    // alert(amount);
  }

  private mvpCancellation() {
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


}
