import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, RouterOutlet, Params, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from '../../../component/multiselect/multiselect';
import { SelectItem } from 'primeng/primeng';

import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab
import { Message, MenuItem } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';


import { DealerTeamService } from '../../../services/express-lane/dealer-team/dealer-team.service';

declare var $: any;

@Component({
    selector: 'dealer-team',
    // templateUrl: './dealer-team.html',
    templateUrl: './ngprime.html',

    styleUrls: ['./../../dialog/dialog.css'],
    // providers:[OpcodesetupService]
})
export class DealerTeamComponent implements OnInit {
    @ViewChild('addteammodal') addteammodal: any;
    @Output("onSaveNewTeamData") saveEvent: EventEmitter<any> = new EventEmitter<any>();
    //  cities: SelectItem[];
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
    private dealerTeamHeaders: any = [
        { "data": "teamName", "title": "Team Name" },
        { "data": "teamID", "title": "Dealer Team ID" },
        { "data": "createdDate", "title": "Created Date" },
        {
            "className": 'details-control',
            "orderable": false,
            "data": null,
            "title": "Actions",
            "defaultContent": `
            <button type="button" class="btn btn-primary btn-sm" >Edit</button>  
            <button type="button" class="btn btn-primary btn-sm" >Delete</button> 
            
            `
            // <button *ngIf="false" type="button" class="btn btn-primary btn-sm"  >Edit</button>             
            // <button type="button" class="btn btn-primary btn-sm"  >Cancel</button>
            // <button style= "" type="button" class="btn btn-primary btn-sm"  >Save</button>
        }
    ]

    constructor(private dealerTeamService: DealerTeamService, private modalService: NgbModal) {
        // this.cities = [];
        // this.cities.push({ label: 'New York', value: 'New York' });
        // this.cities.push({ label: 'Rome', value: 'Rome' });
        // this.cities.push({ label: 'London', value: 'London' });
        // this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
        // this.cities.push({ label: 'Paris', value: 'Paris' });

    }
    ngOnInit() {
        var d = new Date;
        this.date = new Date().getFullYear() + "-" + (d.getMonth() + 1) + "-" + new Date().getDate();
        this.getTeamData();
    }
    private editTeamName(name, id) {
        // alert("edit" + " " + name);
        var user = JSON.parse(sessionStorage.getItem("CurrentUser")).userId;
        var dealercode = JSON.parse(sessionStorage.getItem("selectedCodeData")).selectedDealerCode;

        this.dealerTeamService.editDealerTeamData(name, id,
            this.newDealerTeamData.groupTeamId, this.date, user, dealercode).subscribe(
            (addNewDealerTeamData) => {
                this.addNewDealerTeamData = (addNewDealerTeamData)
                this.displayDialog = false;
                this.successAddingTeamMessage = "Team Name has been updated";
                this.getTeamData();
                // this.getTeamData();
                // this.emptyNameMessage = "";
                // this.emptyIDMessage = "";
                // this.errorAddingTeamMessage = "";
                // this.successAddingTeamMessage = "Team has been added";
                //alert("edited Team data.");
            },
            (error) => {
                // this.emptyNameMessage = "";
                // this.emptyIDMessage = "";
                // this.successAddingTeamMessage = "";
                // this.errorAddingTeamMessage = "Error in adding New Team";
                // alert("Error in editing team data.");
                this.errorAddingTeamMessage = "Error in updating Team Name";
            }
            )
    }
    private deleteTeamName(id) {
        this.dealerTeamService.deleteDealerTeamData(id).subscribe(
            (dealerTeamData) => {
                //this.dealerTeamData = (dealerTeamData)
                this.displayDialog = false;
                this.getTeamData();
                this.errorAddingTeamMessage = "";
                this.successAddingTeamMessage = "Team has been Deleted";
                // alert("deleted")
            },
            (error) => {
                this.successAddingTeamMessage = "";
                this.errorAddingTeamMessage = "Error in Deleting Team";
                // alert("error")
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
        //this.newDealerTeamData = addTeamData;
        // this.modalService.open(this.addteammodal).result.then((result) => {
        //     //this.closeResult = `Closed with: ${result}`;
        // }, (reason) => {
        //     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // });
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
                //alert("Team has been added.");
            },
            (error) => {
                this.emptyNameMessage = "";
                this.emptyIDMessage = "";
                this.successAddingTeamMessage = "";
                this.errorAddingTeamMessage = "Error in adding New Team";
                //alert("Error in adding new Team.");
            }
        )
        // c();
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


