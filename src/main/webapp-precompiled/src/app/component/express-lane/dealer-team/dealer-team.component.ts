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
    public newDealerTeamData: any = { "name": "", "id": "", "createdDate": "", "groupTeamId": "" }
    public addNewDealerTeamData: any = {};
    public date: string = "";
    public data: any;
    public addTeamData: any;
    public dealerTeamData: any;
    public emptyNameMessage: string = "";
    public emptyIDMessage: string = "";
    public successAddingTeamMessage: string = "";
    public errorAddingTeamMessage: string = "";
    public n: string = "none";
    displayDialog: boolean;
    displayAddTeamDialog: boolean; 


    constructor(private dealerTeamService: DealerTeamService, private modalService: NgbModal) {

    }
    ngOnInit() {
        var d = new Date;
        this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();
        this.getTeamData();
    }
    public editTeamName(name, id) {
        this.emptyNameMessage = "";
        this.emptyIDMessage = "";
        this.successAddingTeamMessage = "";
        this.errorAddingTeamMessage = "";
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
    public deleteTeamName(id) {
        this.emptyNameMessage = "";
        this.emptyIDMessage = "";
        this.successAddingTeamMessage = "";
        this.errorAddingTeamMessage = "";
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
    public cancelTeamName() {

    }
    public saveTeamName() {

    }
    public getTeamData() {
        this.emptyNameMessage = "";
        this.emptyIDMessage = "";
        this.successAddingTeamMessage = "";
        this.errorAddingTeamMessage = "";
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
        this.emptyNameMessage = "";
        this.emptyIDMessage = "";
        this.successAddingTeamMessage = "";
        this.errorAddingTeamMessage = "";
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
        for (var i = 0; i < this.dealerTeamData.length; i++) {
            if (this.newDealerTeamData.id == this.dealerTeamData[i].teamID) {
                this.emptyIDMessage = "Team ID already exists";
                return;
            }
        }

        this.dealerTeamService.addNewDealerTeam(this.newDealerTeamData.name.trim(), this.newDealerTeamData.id.trim(), this.date, user, dealercode).subscribe(
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

    public ngModelChangeTeamIDName() {
        this.emptyNameMessage = "";
        this.emptyIDMessage = "";
        this.successAddingTeamMessage = "";
        this.errorAddingTeamMessage = "";
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


