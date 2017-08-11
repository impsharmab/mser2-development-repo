
import { Component, OnInit, ViewChild, ElementRef, NgModule, Inject } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
//import { SafeHtml } from './safeHtml.pipe';
import { CMSService } from '../../services/cms-service/cms-service';

import * as jsPDF from 'jspdf'


@Component({
    selector: 'admin-payout',
    templateUrl: './admin-payout.html'
    // styleUrls: ['./admin-payout.css'],
    // providers:[OpcodesetupService]
})


export class AdminPayoutComponent implements OnInit {
    date: DateModel;
    options: DatePickerOptions;


    calendarOptions = {
        initialDate: new Date("07-01-2017")
    };

    @ViewChild('addCategory') addCategory: any;
    @ViewChild('addReward') addReward: any;
    @ViewChild('addPartNumber') addPartNumber: any;
    @ViewChild('overrideModal') overrideModal: any;
    @ViewChild('overrideRecordModal') overrideRecordModal: any;

    constructor(private modalService: NgbModal) {
        this.options = new DatePickerOptions();
    }

    ngOnInit() {
        
    }
        downloadPDF() {
            var doc = new jsPDF();
            
            //Page 1
            doc.setFontSize(30);
            doc.setFont("Helvetica"); 
            doc.setFontStyle("bold");   
            doc.text(20, 20, 'REWARDS WRAP');

              
            doc.setFontSize(24);
            doc.setFont("Helvetica");    
            doc.text(20, 30, 'MSER PAYOUT CHART');

            doc.setFontStyle("normal"); 
            doc.setFontSize(24);
            doc.setFont("Helvetica");    
            doc.text(20, 40, 'Q3 2017 July Update');

            doc.setFontSize(20);
            doc.setFont("Helvetica");    
            doc.text(30, 90, 'Q3 2017 July Highlights');

            doc.setFontSize(20);
            doc.setFont("Helvetica");    
            doc.text(30, 100, 'Service Advisor Rewards');

            doc.setFontSize(20);
            doc.setFont("Helvetica");    
            doc.text(30, 110, 'Service Technician Rewards');

            doc.setFontSize(20);
            doc.setFont("Helvetica");    
            doc.text(30, 120, 'Parts Personnel Rewards');

            doc.setFontSize(20);
            doc.setFont("Helvetica");    
            doc.text(30, 130, 'Used Vehicle Recon Promotion');

            doc.addPage();
            //Page HIGHLIGHTS

            doc.setFontSize(20);
            doc.setFont("Verdana");
            doc.text(55,20, 'Q3 2017 JULY HIGHLIGHTS');

            // Q3 2017 JULY - Rewards of Note
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 40, 'Q3 2017 JULY - Rewards of Note');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 45, '- Beam Blades and Rain Repellent are now on the drive. See details and special rebate for this perfect Summer duo!');  
            doc.text(25, 50, '- Carpet Floor Mats stay put for July at $5.00!');
            doc.text(25, 55, '- RAM Trailer Hitches continue on the menu for Advisors, Technicians, and Parts Personnel.');
            doc.text(25, 60, '- Uconnect continues to pay all Service, Sales, and Parts Personnel $10!');
            doc.text(25, 65, '- Uconnect override is 20% for Service Managers.');
            doc.text(25, 70, '- Service Techs: the reward for engines stays at $15!');
            
            // MVP
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 80, 'MVP');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 85, 'MVP has simplified the payouts on MSER Service Lanes Sales. All Essential Care Plan Code Payouts will be');
            doc.text( 25, 90, 'based on "Dealer Cost" of the plans. Rewards range from $2 to $8. 7 Year Unlimitedplan continues!');
            doc.text( 25, 95, 'See MVP page for complete plan listings and any other changes this month.');  

            // Used Vehicle Manager Recon Promotion
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 105, 'Used Vehicle Manager Recon Promotion');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 110, 'Special promotion for Used Vehicle Manager, Used Vehicle Sales Persons, Parts Managers and Technicians.');
            doc.text(25, 115, 'Rewards are available for using Magneti Marelli parts on vehicles being traded in or reconditioned for resale.');
            doc.text(25, 120, 'Items continuing for July: Set of 2 OHTSU Tires for $5.');
            doc.text(25, 125, 'NEW!! Magneti Marelli Tire Pressure Monitor System is now on the menu at $2!');
            doc.text(25, 130, 'Spare Tire Kits, Bed Liners and Uconnect Activation continues as well!');


            // Find Your Gear in June
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 140, 'Find Your Gear in June');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 145, 'Transmissions, Trans Axles, and T-Cases are continuing on the July Payout Chart.');
            doc.text(25, 150, 'Earn on Customer Pay and Internal Repair Orders ($25 Service Advisors, $5 override for Service Managers).');



            // Uconnect, U-earn
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 160, 'Uconnect, U-earn');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 165, 'Service, Sales and Parts Personnel earn $10 for each Uconnect Navigation Activation you perform!');
            doc.text(25, 170, 'Rules are on the Marketing Page. Service Managers receive a 20% override.');
            doc.text(25, 175, 'Service Advisors: Inform your Retail Sales People and let them know that all Uconnect Navigation Activations properly processed will be paid $10.');
            doc.text(25, 180, 'Come directly from DealerConnect,without logging into MSER! See link onTraining tab.');

            // wiAdvisor
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 190, 'wiADVISOR');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 195, 'wiADVISOR continues to pay $5 for a set of 2 tires and $10 for a set of 4 tires in July!');
            doc.text(25, 200, 'Plus $1 on any MVP Plan sold using wiADVISOR technology.');


              
            doc.addPage();
            //Page 2, Service Advisor Rewards
            

            doc.setFontSize(20);
            doc.setFont("Verdana");
            doc.text(55,20, 'SERVICE ADVISOR REWARDS');

            // MOPAR PARTS AND ENGINES
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 40, 'MOPAR PARTS & ENGINES');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 45, '$20.00 Transmission/Trans-Axles/T-Cases');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 50, 'Service Manager override is $5. Refer to Appendix A for qualifying part number(s).');        
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 55, '$2.00 Brake Pads (OE, MM)');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 60, 'OE and Magneti Marelli Brake Pads. Refer to Appendix A for qualifying part number(s).');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 65, '$30.00 Mopar Engines');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 70, '$10.00 N45 & N46 Recall Rewards');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 75, '$5.00 Mopar AC Compressors');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 80, '$2.00 Cabin Air Filters (MM and Mopar)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 85, '$2.00 Beam Blades (Set of 2)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 90, '$1.00 Rain Repellent (Set of 2)');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 95, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // MOPAR Upfits
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 105, 'MOPAR Upfits');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 110, '$2.50 RAM Trailer Hitches');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 115, 'Refer to Appendix A for qualifying part number(s).');        
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 120, '$10.00 Mopar WiFi');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 125, '$10.00 Cell Phone Hands-Free Kit');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 130, '$5.00 Dart/Ram Wireless Battery Charger Kit');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 135, '$5.00 Carpet Floor Mats');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 140, 'Refer to Appendix A for qualifying part number(s).');  
            
            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 145, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');
        
            // wiADVISOR
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 155, 'wiADVISOR');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 160, '$1.00 MVP Plans');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 165, '$10.00 Tires (Set of 4)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 170, '$5.00 Tires (Set of 2)');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 175, 'SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // MAGNETI MARELLI RETAIL PARTS
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 185, 'MAGNETI MARELLI RETAIL PARTS');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 190, '$2.00 Magneti Marelli (TPMS Part #1AMTP3350A)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 195, '$2.00 Magneti Marelli Water Pump');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 200, '$2.00 Magneti Marelli Starters');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 205, '$2.00 Magneti Marelli Alternators');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 210, '$2.00 Magneti Marelli Batteries');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 215, '$1.00 Magneti Marelli Radiators & Condensers');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 220, '$1.00 Magneti Marelli Rotors (Per Pair');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 225, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // EXPRESS LANE
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 235, 'EXPRESS LANE');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 240, '$2.00 Beam Blades (Set of 2)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 245, '$2.00 Cabin Air Filters (MM and Mopar)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 250, '$2.00 Batteries (Mopar)');
            
            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 255, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // UCONNECT
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 265, 'UCONNECT');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 270, '$10.00 Uconnect RA3 Navigation Activation');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 275, 'All Sales, Service and Parts Personnel.');     
            
            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 280, 'SERVICE MANAGER OVERRIDE IS 20%');

            doc.addPage();
            //Page 3, Service Technician Rewards
            
            doc.setFontStyle('normal');
            doc.setFontSize(20);
            doc.setFont("Verdana");
            doc.text(45,20, 'SERVICE TECHNICIAN REWARDS');

            // MOPAR PARTS AND ENGINES
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 40, 'MOPAR PARTS & ENGINES');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 45, '$25.00 Transmission/Trans-Axles/T-Cases');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 50, 'Service Manager override is $5. Refer to Appendix A for qualifying part number(s).');        
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 55, '$2.00 Mopar Brake Pads (OE, MM)');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 60, 'OE and Magneti Marelli Brake Pads. Refer to Appendix A for qualifying part number(s).');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 65, '$15.00 Mopar Engines');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 70, '$5.00 Mopar AC Compressors');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 75, '$2.00 Cabin Air Filters (MM and Mopar)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 80, '$2.00 Beam Blades (Set of 2)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 85, '$1.00 Rain Repellent (Set of 2)');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 90, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // MOPAR Upfits
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 100, 'MOPAR Upfits');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 105, '$2.50 RAM Trailer Hitches');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 110, 'Refer to Appendix A for qualifying part number(s).');        
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 115, '$5.00 Carpet Floor Mats');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 120, 'Refer to Appendix A for qualifying part number(s).');  
            
            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 125, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');
        
           // MAGNETI MARELLI RETAIL PARTS
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 135, 'MAGNETI MARELLI RETAIL PARTS');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 140, '$2.00 Magneti Marelli (TPMS Part #1AMTP3350A)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 145, '$2.00 Magneti Marelli Water Pump');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 150, '$2.00 Magneti Marelli Starters');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 155, '$2.00 Magneti Marelli Alternators');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 160, '$2.00 Magneti Marelli Batteries');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 165, '$1.00 Magneti Marelli Radiators & Condensers');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 170, '$1.00 Magneti Marelli Rotors (Per Pair');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 175, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // EXPRESS LANE
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 185, 'EXPRESS LANE');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 190, '$2.00 Beam Blades (Set of 2)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 195, '$2.00 Cabin Air Filters (MM and Mopar)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 200, '$2.00 Batteries (Mopar)');
            
            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 205, 'PARTS & SERVICE MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            
            doc.addPage();
            //Page 4, PARTS PERSONNEL REWARDS
            
            doc.setFontStyle('normal');
            doc.setFontSize(20);
            doc.setFont("Verdana");
            doc.text(50,20, 'PARTS PERSONNEL REWARDS');

            // PARTS COUNTER
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 40, 'PARTS COUNTER');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 45, '$2.50 RAM Trailer Hitches');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 50, 'Refer to Appendix A for qualifying part number(s).');        
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 55, '$10.00 Mopar WiFi');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 60, '$10.00 Cell Phone Hands-Free Kit');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 65, '$5.00 Carpet Floor Mats');
            
            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 70, 'Refer to Appendix A for qualifying part number(s).');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 75, '$2.00 Magneti Marelli (TPMS Part #1AMTP3350A');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 80, 'Refer to Appendix A for qualifying part number(s).');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 85, '$2.00 Magneti Marelli Alternators');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 90, '$2.00 Magneti Marelli Starters');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 95, '$2.00 Magneti Marelli Water Pump');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 100, '$1.00 Magneti Marelli Rotors');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 105, '$2.00 Magneti Marelli Batteries');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 110, '$1.00 Magneti Marelli Radiators & Condensers');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 115, '$1.00 Magneti Marelli Brake Pad Kit');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 120, 'PARTS MANAGER OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            doc.addPage();
            //Page 5, MSER USED VEHICLE MANAGER RECON PROMO
            
            doc.setFontStyle('normal');
            doc.setFontSize(20);
            doc.setFont("Verdana");
            doc.text(20,20, 'MSER USED VEHICLE MANAGER RECON PROMO');

            // PARTS COUNTER
            doc.setFontStyle('bold');
            doc.setFontSize(14);
            doc.setFont("Impact");    
            doc.text(20, 40, 'USED RECON PROMOTION PARTS');

            doc.setFontStyle('normal');
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 45, '$20.00 Spare Tire Kits');

            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 50, 'Refer to Appendix A for qualifying part number(s).');        
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 55, '$20.00 Bed Liners');
            
            doc.setFontSize(8);
            doc.setFont("Helvetica");    
            doc.text(30, 60, 'Refer to Appendix A for qualifying part number(s).');  

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 65, '$5.00 OHTSU Tires (Set of 2)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 70, '$3.00 Magneti Marelli Batteries');
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 75, '$2.00 Magneti Marelli Alternator');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 80, '$2.00 Magneti Marelli Starter');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 85, '$2.00 Magneti Marelli Water Pump');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 90, '$5.00 Magneti Marelli Brake Pads');
            
            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 95, '$5.00 Magneti Marelli Brake Rotors');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 100, '$2.00 Magneti Marelli Radiators/Condensers');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 105, '$2.00 Beam Blades (Set of 2)');

            doc.setFontSize(10);
            doc.setFont("Helvetica");    
            doc.text(25, 110, '$2.00 Magneti Marelli (TPMS Part #1AMTP3350A');

            doc.setFontSize(8);
            doc.setFontStyle('bold');
            doc.setFont("Helvetica");    
            doc.text(25, 115, 'PARTS MANAGER & TECHNICIANS OVERRIDE IS 10% ON ALL ABOVE ITEMS');

            // Save the PDF
            doc.save('Test.pdf');
        }

    openCategoryModal() {
        this.modalService.open(this.addCategory).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openRewardModal() {
        this.modalService.open(this.addReward).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    openPartNumberModal() {
        this.modalService.open(this.addPartNumber).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openOverrideModal() {
        this.modalService.open(this.overrideModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openOverrideRecordModal() {
        this.modalService.open(this.overrideRecordModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    index: number = 0;

    openNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
    }

    
}
