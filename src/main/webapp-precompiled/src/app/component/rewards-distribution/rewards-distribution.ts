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
  mvpData = { acceptance: "4545", number: "25", vin: "454545", plancode: "59898", rewardsamount: "$785", sid: ["14546546- Raymond Fisher Edwards", "2", "858755", "4565650", "89898898", "858755", "4565650", "89898898", "100"] }
  dealerRewDistAmt = { dealershipName: "Bob Baker", rewardsAmount: "$58956.03", distributedAmount: "$4545.54" };
  booleanYesNoOptions: SelectItem[] = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }];
  programNameOptions: SelectItem[] = [{ label: "Express Lane", value: "Express Lane" }, { label: "Parts Counter", value: "Parts Counter" }, { label: "Used Recon", value: "Used Recon" }];
  participantOptions: SelectItem[] = [{ label: "Oliver Edward", value: "Oliver Edward" }, { label: "Kevin Hunt", value: "Kevin Hunt" }];
  participantTable: any = [{ name: "Oliver Edward", value: "" },
  { name: "Kevin Hahn", value: "" },
  { name: "Miller Wayne", value: "" },
  { name: "Hunter East", value: "" }
  ]
  constructor(private rewardsDistributionService: RewardsDistributionService) { }

  ngOnInit() {
    this.getRewardsAmount();
    this.getParticipantsByDealer();
  }

  private rewardsAmount: any = {}
  private getRewardsAmount() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    this.rewardsDistributionService.getRewardsAmount(dealerCode).subscribe(
      (rewardsAmount) => {
        this.rewardsAmount = (rewardsAmount)
      },
      (error) => {
      }
    )
  }

  private mvpOpenAllocationTable() {
    // this.getManagersByDealer();

  }
  private elOpenAllocationTable() {
    // this.getParticipantsByDealer();
  }

  private pcOpenAllocationTable() {
    // this.getParticipantsByDealer();
  }

  private urOpenAllocationTable() {
    // this.getParticipantsByDealer();
  }

  private participantsList: any = [];
  private participantDataValue: any = [];
  private participantsOptions: SelectItem[] = [];
  private getParticipantsByDealer() {
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var constructParticipants: any = [];
    this.rewardsDistributionService.getParticipantsByDealer(dealerCode).subscribe(
      (participantsList) => {
        this.participantsList = (participantsList)
        for (var i = 0; i < this.participantsList.length; i++) {
          constructParticipants.push(this.participantsList[i].item2 + " - " + this.participantsList[i].item1);
          this.participantsOptions.push({
            label: this.participantsList[i].item2 + " - " + this.participantsList[i].item1, value: this.participantsList[i].item2
          })
        }
        // for (var i = 0; i < constructParticipants.length; i++) {
        //   this.participantsOptions.push({
        //     label: constructParticipants[i], value: constructParticipants[i]
        //   })
        // }
        for (var i = 0; i < this.participantsList.length; i++) {
          this.participantDataValue.push({ name: "", value: "" });
        }

      },
      (error) => {
      }
    )
  }
  private addNewRow() {
    this.participantDataValue.push({ name: "", value: "" });
  }
  private saveMVPDATA() {
    alert(this.mvpInterface.approved);
    alert("sid: " + this.mvpInterface.sid);

  }
  private savePCDATUM:any;
  private savePCDATA() {
    // console.log(this.participantDataValue);
    var nameValueList: any = [];
    var nameValues: any = {  };
    for (var i = 0; i < this.participantDataValue.length; i++) {
      if (this.participantDataValue[i].name.length > 1 && this.participantDataValue[i].value.length > 1) {
        nameValueList.push({ name: this.participantDataValue[i].name, value:  parseFloat(this.participantDataValue[i].value) })
      }
    }
    nameValues.list = nameValueList;
    var dealerCode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
    var constructParticipants: any = [];
    this.rewardsDistributionService.savePCData(dealerCode, nameValues).subscribe(
      (savePCDATUM) => {
        this.savePCDATUM = (savePCDATUM)        
      },
      (error) => {
      }
    )
  }

  private selectedProgramName(programName) {
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

  private selectedParticipant(participantName) {

    //alert(participantName);
  }

  private rewardedAmount(amount) {
    // alert(amount);
  }

  private saveELDATA() {
    console.log(this.participantTable)
  }

  private savePCData() {

  }

  private saveUsedReconDATA() {

  }

}
