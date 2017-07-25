import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DealerTeamService } from '../../../services/express-lane/dealer-team/dealer-team.service';

declare var $: any;

@Component({
    selector: 'dealer-team',
    templateUrl: './dealer-team.html'
})
export class DealerTeamComponent implements OnInit {
    @ViewChild('addteammodal') addteammodal: any;
    @Output("onSaveNewTeamData") saveEvent: EventEmitter<any> = new EventEmitter<any>();
   
    cities: any = [{ label: 'New York', value: 'New York' }, { label: 'Rome', value: 'Rome' }];
    private newDealerTeamData: any = { "name": "", "id": "", "createdDate": "", "groupTeamId": "" }
    private addNewDealerTeamData: any = {};
    private date: string = "";
    private dealerTeamData: any;
    private emptyNameMessage: string = "";
    private emptyIDMessage: string = "";
    private successAddingTeamMessage: string = "";
    private errorAddingTeamMessage: string = "";
    private n: string = "none";
    displayDialog: boolean;
    displayAddTeamDialog: boolean;
    

    constructor(private dealerTeamService: DealerTeamService, private modalService: NgbModal) {
       
    }
    ngOnInit() {
        var d = new Date;
        this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();
        this.getTeamData();
    }
    private editTeamName(name, id) {
        var user = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        var dealercode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

        this.dealerTeamService.editDealerTeamData(name, id,
            this.newDealerTeamData.groupTeamId, this.date, user, dealercode).subscribe(
            (addNewDealerTeamData) => {
                this.addNewDealerTeamData = (addNewDealerTeamData)
                this.displayDialog = false;
                this.successAddingTeamMessage = "Team Name has been updated";
                this.getTeamData();
               
            },
            (error) => {
               
                this.errorAddingTeamMessage = "Error in updating Team Name";
            }
            )
    }
    private deleteTeamName(id) {
        this.dealerTeamService.deleteDealerTeamData(id).subscribe(
            (dealerTeamData) => {
              
                this.displayDialog = false;
                this.getTeamData();
                this.errorAddingTeamMessage = "";
                this.successAddingTeamMessage = "Team has been Deleted";
               
            },
            (error) => {
                this.successAddingTeamMessage = "";
                this.errorAddingTeamMessage = "Error in Deleting Team";
               
            }
        )
    }
    private cancelTeamName() {

    }
    private saveTeamName() {

    }
    private getTeamData() {
        var dealercode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        this.dealerTeamService.getDealerTeamData(dealercode).subscribe(
            (dealerTeamData) => {
                this.dealerTeamData = (dealerTeamData)
            },
            (error) => {
            }
        )

    }
    addTeam(addTeamData: any) {        
        this.newDealerTeamData.name = "";
        this.newDealerTeamData.id = "";
        this.successAddingTeamMessage = "";
        this.displayAddTeamDialog = true;
    }

    saveNewTeamData(c) {
        var user = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        var dealercode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;
        if (this.newDealerTeamData.name === "" && this.newDealerTeamData.id === "") {
            this.emptyNameMessage = "Team Name is Required";
            this.emptyIDMessage = "Dealer Team ID is Required";
            return;
        } else if (this.newDealerTeamData.name !== "" && this.newDealerTeamData.id === "") {
            this.emptyNameMessage = "";
            this.emptyIDMessage = "Dealer Team ID is Required";
            return;
        } else if (this.newDealerTeamData.name === "" && this.newDealerTeamData.id !== "") {
            this.emptyNameMessage = "Team Name is Required";
            this.emptyIDMessage = "";
            return;
        }
        this.dealerTeamService.addNewDealerTeam(this.newDealerTeamData.name, this.newDealerTeamData.id, this.date, user, dealercode).subscribe(
            (addNewDealerTeamData) => {
                this.addNewDealerTeamData = (addNewDealerTeamData)
                this.displayAddTeamDialog = false;
                this.getTeamData();
                this.emptyNameMessage = "";
                this.emptyIDMessage = "";
                this.errorAddingTeamMessage = "";
                this.successAddingTeamMessage = "New Team has been added Successfully";
            
            },
            (error) => {
                this.emptyNameMessage = "";
                this.emptyIDMessage = "";
                this.successAddingTeamMessage = "";
                this.errorAddingTeamMessage = "Error in adding New Team";
               
            }
        )
      
    }

    showDialogToAdd() {

        this.displayDialog = true;
    }

    save() {

        this.displayDialog = false;
    }

    delete() {

        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.successAddingTeamMessage = "";
        this.newDealerTeamData.name = event.data.TeamName;
        this.newDealerTeamData.id = event.data.teamID;
        this.newDealerTeamData.groupTeamId = event.data.groupTeamID;
        this.newDealerTeamData.createdDate = event.data.createdDate;
        this.displayDialog = true;
    }

    cancel() {
        this.displayAddTeamDialog = false;
    }
}

