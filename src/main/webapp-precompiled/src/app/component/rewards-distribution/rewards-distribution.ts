import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

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
  { name: "Oller Wayne", value: "" },
  { name: "Hunter East", value: "" }
  ]
  constructor() { }

  ngOnInit() {
    // alert(Object.keys(this.allocateAmount)[1]);
    this.constructSIDOptions();

  }
  private saveMVPDATA() {
    alert(this.mvpInterface.approved);
    alert("sid: " + this.mvpInterface.sid);

  }
  private mvpSIDOptions: SelectItem[] = []
  constructSIDOptions() {
    for (var i = 0; i < this.mvpData.sid.length; i++) {
      this.mvpSIDOptions.push({ label: this.mvpData.sid[i], value: this.mvpData.sid[i] })
    }
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
     alert(participantName);
  }

  private rewardedAmount(amount) {
    alert(amount);
  }

}
