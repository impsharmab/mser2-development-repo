import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-enrollment',
    templateUrl: './new-enrollment.html'
    //   styleUrls: ['./enrollment-maintenance.component.css']
})
export class EnrollmentComponent implements OnInit {
    private displayEnrollmentDialog: boolean;
    private moparPartsData: any = [{ "pc1": "Service Advisor (13)" }, { "pc2": "Service Advisor (13)" }];
    private enrollmentData: any = [
        {
            "sid": "S1234", "name": "James Watt", "dmsId": "2547", "myPersonnelDmsId": "145", "myPersonnelPositions": ["45", "2", "2"],
            "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"], "wiAdvisorTiresData": ["11", "65"],
            "posCodeOverrides": ["4", "5", "1"], "pcManager": "23", "elManager": "13", "urManager": "11", "urParticipant": "13"
        },
        {
            "sid": "S2452", "name": "Holiday Steff", "dmsId": "879", "myPersonnelDmsId": "214", "myPersonnelPositions": ["11", "87", "25"],
            "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"], "wiAdvisorTiresData": ["11", "65"],
            "posCodeOverrides": ["10", "20", "21"], "pcManager": "23", "elManager": "23", "urManager": "8", "urParticipant": "13"
        },
        {
            "sid": "S3895", "name": "John Voight", "dmsId": "489", "myPersonnelDmsId": "802", "myPersonnelPositions": ["23", "24", "5"],
            "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"], "wiAdvisorTiresData": ["11", "65"],
            "posCodeOverrides": ["40", "50", "41"], "pcManager": "23", "elManager": "13", "urManager": "18", "urParticipant": "15"
        },
        {
            "sid": "S9851", "name": "Logan Wright", "dmsId": "89", "myPersonnelDmsId": "142", "myPersonnelPositions": ["68", "7", "11"],
            "moparPartsData": ["13", "23"], "magnetiMarelliData": ["23, 13"], "mvpData": ["23, 13"], "wiAdvisorMVPData": ["23, 13"], "wiAdvisorTiresData": ["11", "65"],
            "posCodeOverrides": ["4", "15", "1"], "pcManager": "23", "elManager": "19", "urManager": "11", "urParticipant": "13"
        },

    ];

    cities: any = [{ label: 'New York', value: 'New York' }, { label: 'Rome', value: 'Rome' }];

    constructor(private enrollmentMaintenanceService: EnrollmentMaintenanceService) { }

    ngOnInit() {

    }

    private getEnrollmentData() {

    }

    private showEditEnrollmentDialogue() {
        this.displayEnrollmentDialog = true;
    }

    private onRowSelect() {

    }

} 
