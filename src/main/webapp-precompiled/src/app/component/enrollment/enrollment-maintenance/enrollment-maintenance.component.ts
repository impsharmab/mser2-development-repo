import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentMaintenanceService } from '../../../services/enrollment-service/enrollment-maintenace.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enrollment-maintenance',
  templateUrl: './enrollment-maintenance.component.html',
  styleUrls: ['./enrollment-maintenance.component.css']
})
export class EnrollmentMaintenanceComponent implements OnInit {
  private employeeMaintenanceData: any;
  private newParticipantData: any = { "participantID": "", "dmsID": "", "myPersonnelDMSID": "", "name": "", "email": "", "enrolledRole": "", "enrollmentUpdatedDate": "" }
  private participantData: any = { "participantID": "", "dmsID": "", "myPersonnelDMSID": "", "name": "", "email": "", "enrolledRole": "", "enrollmentUpdatedDate": "" }
  @ViewChild('content') content: any;
  private employeeMaintenanceHeaders: any = [
    {
      "className": 'details-control',
      "orderable": false,
      "data": "participantID",
      "title": "Participant ID", 
      "defaultContent": '<button type="button" class="btn btn-primary btn-sm" ><i class="fa fa-close"></i></button>'
    },
    { "data": "dmsID", "title": "DMS ID" },
    { "data": "myPersonnelDMSID", "title": "MyPersonnel DMS ID" },
    { "data": "name", "title": "Name" },
    { "data": "enrolledRole", "title": "Enrolled Role" },
    { "data": "enrollmentUpdatedDate", "title": "Enrollment Updated Date" }


  ]
  constructor(private enrollmentMaintenanceService: EnrollmentMaintenanceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEnrollmentMaintenanceData();
  }
  private getEnrollmentMaintenanceData() {
    // debugger;
    // this.enrollmentMaintenanceService.getEnrollmentMaintenanceData().subscribe(
    //   (employeeMaintenanceData) => {
    //     this.employeeMaintenanceData = employeeMaintenanceData
    //     //https://editor.datatables.net/examples/inline-editing/simple
    //   }
    // )
  }
  public clickOnOpCode(data: any) {
    // alert()
    this.participantData = data;
    this.modalService.open(this.content).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
} 
