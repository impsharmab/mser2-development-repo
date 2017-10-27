
import { Component, OnInit, ViewChild, ElementRef, NgModule, Inject } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, } from '@angular/router';
import { CommonModule } from "@angular/common";
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Message } from 'primeng/components/common/api';

//import { SafeHtml } from './safeHtml.pipe';
import { CMSService } from '../../services/cms-service/cms-service';
import '../../../assets/js/html2canvas.js';
import { AdminPayoutService } from '../../services/admin-payout/admin-payout-service';

import * as jsPDF from 'jspdf';
import { SelectItem } from 'primeng/primeng';
declare var html2canvas: any;
declare var $: any;
declare var moment: any;

@Component({
    selector: 'admin-payout',
    templateUrl: './admin-payout.html',
    //styleUrls: ['./admin-payout.css']
    // providers:[OpcodesetupService]
})


export class AdminPayoutComponent implements OnInit {
    uploadedFiles: any[] = [];
    private msgs: Message[];
    date: DateModel;
    options: DatePickerOptions;
    public programs: any;
    public selectedIncentives: string[] = [];
    public programCategories: any = [];
    public selectedProgramCategories: any[] = [];
    public payoutMonth: string;
    public payoutCopyMonth: string;
    public selectedIncentiveSubCodes: string[] = [];
    public newCategory: any = {};
    public selectedOpenIncentives: string[] = [];
    public startDate: string = '';
    public endDate: string = '';
    public rewards: any[] = [];
    public eligiblePositions: any[] = [];
    public rewardTypeDd: SelectItem[] = [];
    public quantityDd: SelectItem[] = [];
    public overrideModalReward: any;
    selectedRewardForOverride: any;
    selectedRewardPosForOverride: any;
    selectedOverrideForOverride: any;
    public tabContentLoaded: boolean = false;
    public payoutMonths: SelectItem[];
    public payoutCopyMonths: SelectItem[];
    private postData: any;
    public programsDd: SelectItem[] = [];


    calendarOptions = {
        initialDate: new Date("07-01-2017")
    };

    @ViewChild('addCategory') addCategory: any;
    @ViewChild('addReward') addReward: any;
    @ViewChild('addPartNumber') addPartNumber: any;
    @ViewChild('overrideModal') overrideModal: any;
    @ViewChild('overrideRecordModal') overrideRecordModal: any;

    constructor(private modalService: NgbModal, private adminPayoutService: AdminPayoutService) {
        this.options = new DatePickerOptions();
    }

    ngOnInit() {
        this.payoutMonths = [
            {
                label: 'NOV-2017',
                value: 'NOV'
            },
            {
                label: 'DEC-2017',
                value: 'DEC'
            }
        ];

        this.payoutCopyMonths = [
            {
                label: 'SEP-2017',
                value: 'SEP'
            },
            {
                label: 'OCT-2017',
                value: 'OCT'
            }
        ];

        this.postData = {
            incentiveSubCodes: [],
            incentiveRewards: []
        }
    }

    private onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
    downloadPDF(id) {
        html2canvas(document.getElementById(id), {
            onrendered: function (canvas) {
                var img = canvas.toDataURL("image/png");
                var doc = new jsPDF();
                doc.addImage(img, 'JPEG', 10, 10);
                doc.save('payoutChart.pdf');
            },
            width: 760
        });
    }

    openCategoryModal() {
        this.newCategory = {
            incentiveSubCodeId: 0,
            programGroup: "",
            incentiveId: 0,
            incentiveSubCode: "",
            description: ""
        };
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


    openOverrideModal(reward) {
        this.overrideModalReward = {
            sourcePosition: {},
            recipientPosition: {},
            overrideType: {}
        };
        this.selectedRewardForOverride = reward;
        $.extend(this.overrideModalReward, reward);
        this.overrideModalReward.overrideAction = 'Add';
        /* this.overrideModalReward = reward;
        this.overrideModalReward.overrideAction = 'Add';
        this.overrideModalReward.sourcePosition = {};
        this.overrideModalReward.recipientPosition = {};
        this.overrideModalReward.overrideType = {};
        this.overrideModalReward.overrideAmt = ''; */
        this.modalService.open(this.overrideModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openOverrideRecordModal(reward, rewardPosition, override) {
        this.overrideModalReward = {
            sourcePosition: {},
            recipientPosition: {},
            overrideType: {}
        };
        this.selectedRewardForOverride = reward;
        this.selectedRewardPosForOverride = rewardPosition;
        this.selectedOverrideForOverride = override;
        $.extend(this.overrideModalReward, reward);
        this.overrideModalReward.overrideAction = 'Update';
        $.extend(this.overrideModalReward.sourcePosition, this.selectedOverrideForOverride.sourcePosition);
        $.extend(this.overrideModalReward.recipientPosition, this.selectedOverrideForOverride.recipientPosition);
        $.extend(this.overrideModalReward.overrideType, this.selectedOverrideForOverride.overrideType);
        this.overrideModalReward.overrideAmt = this.selectedOverrideForOverride.overrideAmt;
        this.modalService.open(this.overrideModal).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    index: number = 0;

    openNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
        this.setDefaults();
    }

    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
        //this.setDefaults();
    }

    setDefaults() {
        if (this.index == 1) {
            this.selectedIncentives = [];
            this.getPrograms();
        }
        else if (this.index == 2) {
            this.programCategories = [];
            this.getCategories();
        }
        else if (this.index == 3) {
            this.rewards = [];
            this.getRewards();
        }
        else if (this.index == 4) {
            this.gotoSummary();
        }
    }

    selectProgramGroup(checked: boolean, program) {
        if (!program.selected) {
            if (checked)
                this.selectedOpenIncentives.push(program.incentiveId);
            else
                this.selectedOpenIncentives.splice(this.selectedOpenIncentives.indexOf(program.incentiveId), 1);
        }
    }

    getPrograms() {
        this.tabContentLoaded = false;
        this.startDate = moment().month(this.payoutMonth).date(1).format('MMM D, YYYY');
        this.endDate = moment().month(this.payoutMonth).endOf('month').format('MMM D, YYYY');
        this.adminPayoutService.getProgramsByMonth(this.payoutMonth).subscribe(
            (programs) => {
                this.programs = (programs);
                if (this.payoutCopyMonth) {
                    this.programs.forEach(program => {
                        if (program.selected) {
                            this.selectedIncentives.push(program.incentiveId.toString());
                        }
                    });
                }
                this.tabContentLoaded = true;
                if (this.programs.length > 0)
                    this.programsDd = this.converToDd(this.programs, "programGroup");
            });
    }

    getCategories() {
        this.tabContentLoaded = false;
        var $this = this;
        // remove any open incentives selected from Step-2 from the selected incentives list
        // as their categories need to be called separately
        if (this.payoutCopyMonth && this.selectedOpenIncentives.length > 0) {
            this.selectedOpenIncentives.forEach(openIncentive => {
                $this.selectedIncentives.splice($this.selectedIncentives.indexOf(openIncentive), 1);
            });
        }
        if (this.payoutCopyMonth) {
            // get the categories for selected incetives(both regular and open) one by one
            this.adminPayoutService.getCategoriesByIncentive(this.selectedIncentives, this.payoutMonth).subscribe(
                (programCategories) => {
                    this.programCategories = (programCategories);
                    if (this.programCategories.length > 0) {
                        if (this.selectedOpenIncentives.length > 0) {
                            this.adminPayoutService.getCategoriesByIncentive(this.selectedOpenIncentives, "NOMONTH").subscribe(
                                (openProgramCategories) => {
                                    if (openProgramCategories.length > 0)
                                        $.merge(this.programCategories, openProgramCategories);
                                });
                        }
                        this.tabContentLoaded = true;
                        this.fixTabDisplayIE11();
                    }
                });
        }
        else {
            // get categories for a barnd new payout for selected programs.
            this.adminPayoutService.getCategoriesByIncentive(this.selectedIncentives, "NOMONTH").subscribe(
                (programCategories) => {
                    this.programCategories = programCategories;
                    this.tabContentLoaded = true;
                    this.fixTabDisplayIE11();
                });
        }
    }

    addNewCategory() {
        var categoryAddedWithinSelections = false;
        this.programCategories.forEach(programCategory => {
            if (programCategory.programGroup == this.newCategory.program.programGroup) {
                programCategory.categories.push(this.buildCategoryObj(this.newCategory));
                categoryAddedWithinSelections = true;
            }
        });
        // if the user added a category within a program not displayed on Step-3 Programs,
        // add the selected programs and the entered category under the new programs
        // and add them to the main list of programCategories
        if (!categoryAddedWithinSelections) {
            this.programCategories.push({
                programGroup: this.newCategory.program.programGroup,
                categories: [this.buildCategoryObj(this.newCategory)]
            })
        }
    }

    private buildCategoryObj(newCategory) {
        return {
            incentiveSubCodeId: 0,
            programGroupId: this.newCategory.program.programGroupId,
            programGroup: this.newCategory.program.programGroup,
            incentiveId: this.newCategory.program.incentiveId,
            incentiveSubCode: this.newCategory.incentiveSubCode,
            description: this.newCategory.description,
            notes: this.newCategory.notes
        };
    }

    getRewards() {
        this.tabContentLoaded = false;
        var $this = this;
        this.selectedProgramCategories = [];
        // selectedIncentiveSubCodes refers to the list of category IDs selected on Step-3
        // match the list against the programCategories  list from Step-3
        // and build a list of selected program categories
        if ($this.selectedIncentiveSubCodes.length > 0) {
            $this.selectedIncentiveSubCodes.forEach(function (selectedIncentiveSubCode) {
                $this.programCategories.forEach(programCategory => {
                    programCategory.categories.forEach(element => {
                        if (element.incentiveSubCode == selectedIncentiveSubCode) {
                            $this.selectedProgramCategories.push(element);
                        }
                    });
                });
            })
        }
        // For Step-4 we need a list of eligible positions per category per program 
        // and positions are tied to a program so build a list of selected programs per category 
        // and send it to the server to get a list of positions per program. Build rewards list per program thereafter
        if (this.selectedProgramCategories.length > 0) {
            var selectedProgramGroupIds: string[] = [];
            this.selectedProgramCategories.forEach(function (element) {
                if (selectedProgramGroupIds.indexOf(element.programGroupId) == -1)
                    selectedProgramGroupIds.push(element.programGroupId);
            });
            if (selectedProgramGroupIds.length > 0) {
                this.adminPayoutService.getEligiblePositions(selectedProgramGroupIds).subscribe(
                    (eligiblePositions) => {
                        this.eligiblePositions = eligiblePositions;
                        this.adminPayoutService.getRewardTypes().subscribe((rewardTypes) => {
                            this.rewardTypeDd = this.converToDd(rewardTypes, 'description');
                            this.adminPayoutService.getQuantities().subscribe((quantities) => {
                                this.quantityDd = this.converToDd(quantities, 'quantityVal');
                                this.selectedProgramCategories.forEach(element => {
                                    var positionDd = this.converToDd(this.getPositionsByProgramLocal(element.programGroupId), 'description');
                                    this.rewards.push({
                                        positionDd: positionDd,
                                        programCategory: element,
                                        rewardPositions: [{
                                            position: {},
                                            rewardAmount: "",
                                            rewardType: {}
                                        }],
                                        overrideModalOptions: {
                                            rewardPositionDd: []
                                        },
                                        laborTypes: [],
                                        quantity: {}
                                    });
                                });
                                this.tabContentLoaded = true;
                                this.fixTabDisplayIE11();
                            });
                        });
                    });
            }
        }
    }

    onChangeRewardPosition(reward) {
        this.setRewardOverrideModalOptions(reward);
    }

    setRewardOverrideModalOptions(reward) {
        reward.overrideModalOptions.rewardPositionDd = [];
        reward.rewardPositions.forEach(element => {
            if (element.position.positionCode)
                reward.overrideModalOptions.rewardPositionDd.push({
                    label: element.position.description,
                    value: element.position
                });
        });
        if (reward.overrideModalOptions.rewardPositionDd.length > 1)
            reward.canOverride = true;
        else
            reward.canOverride = false;
    }

    gotoSummary() {
        this.postData.incentiveSubCodes = [];
        this.postData.incentiveRewards = [];
        this.rewards.forEach(reward => {
            this.postData.incentiveSubCodes.push({
                incentiveId: reward.programCategory.incentiveId,
                incentiveSubCode: reward.programCategory.incentiveSubCode,
                description: reward.programCategory.description,
                quantityId: reward.quantity.quantityID,
                notes: reward.programCategory.notes
            })
            reward.rewardPositions.forEach(rewardPos => {
                if (reward.laborTypes.length == 1) {
                    this.buildPostDataIncentiveRewards(reward, rewardPos, reward.laborTypes[0])
                }
                else {
                    reward.laborTypes.forEach(laborType => {
                        this.buildPostDataIncentiveRewards(reward, rewardPos, laborType);
                    });
                }
            });
        });
        console.log(this.postData);
    }

    private buildPostDataIncentiveRewards(reward, rewardPos, laborType) {
        if (!rewardPos.overrides) {
            this.postData.incentiveRewards.push({
                incentiveId: reward.programCategory.incentiveId,
                positionCode: rewardPos.position.positionCode,
                rewardTypeID: rewardPos.rewardType.rewardTypeID,
                rewardValue: rewardPos.rewardAmount,
                overridePercentage: '0',
                laborType: laborType,
                isOverrideReward: 'N'
            })
        }
        else if (rewardPos.overrides.length == 1) {
            this.postData.incentiveRewards.push({
                incentiveId: reward.programCategory.incentiveId,
                positionCode: rewardPos.position.positionCode,
                rewardTypeID: rewardPos.rewardType.rewardTypeID,
                rewardValue: rewardPos.rewardType.rewardTypeID == '1' ? rewardPos.rewardAmount : '0',
                overridePercentage: rewardPos.rewardType.rewardTypeID == '2' ? rewardPos.rewardAmount : '0',
                laborType: laborType,
                isOverrideReward: rewardPos.overrides.length > 0 ? 'Y' : 'N'
            });
        }
        else {
            rewardPos.overrides.forEach(override => {
                this.postData.incentiveRewards.push({
                    incentiveId: reward.programCategory.incentiveId,
                    positionCode: rewardPos.position.positionCode,
                    rewardTypeID: override.overrideType.rewardTypeID,
                    rewardValue: override.overrideType.rewardTypeID == '1' ? override.overrideAmt : '0',
                    overridePercentage: override.overrideType.rewardTypeID == '2' ? override.overrideAmt : '0',
                    laborType: laborType,
                    isOverrideReward: rewardPos.overrides.length > 0 ? 'Y' : 'N'
                })
            });
        }
    }

    converToDd(list: any[], labelField: string) {
        var dD: SelectItem[] = [];
        list.forEach(element => {
            dD.push({
                label: element[labelField],
                value: element
            })
        });
        return dD;
    }

    getPositionsByProgramLocal(programGroupId) {
        for (let position of this.eligiblePositions) {
            if (position.programGroupId == programGroupId) {
                return position.positions;
            }
        }
    }

    addRewardPosRec(reward) {
        if (reward.rewardPositions.length < reward.positionDd.length) {
            reward.rewardPositions.push({
                position: {},
                rewardAmount: "",
                rewardType: {}
            });
        }
        this.setRewardOverrideModalOptions(reward);
    }

    removeRewardPosRec(reward, indexToDel) {
        reward.rewardPositions.splice(indexToDel, 1);
        this.setRewardOverrideModalOptions(reward);
    }

    setActionState() {
        if (this.overrideModalReward.sourcePosition && this.overrideModalReward.recipientPosition
            && this.overrideModalReward.overrideType && this.overrideModalReward.overrideAmt
            && this.overrideModalReward.overrideAmt.length > 0) {
            for (let rewardPos of this.selectedRewardForOverride.rewardPositions) {
                if (rewardPos.position.positionCode == this.overrideModalReward.sourcePosition.positionCode) {
                    var rewardDesc = this.getRewardDesc(this.overrideModalReward.overrideType.description,
                        this.overrideModalReward.overrideAmt);
                    this.overrideModalReward.rewardDesc = this.overrideModalReward.overrideType.description + " " +
                        rewardDesc + " per " + this.selectedRewardForOverride.quantity.quantityVal;
                    break;
                }
            }
            this.overrideModalReward.actionState = true;
        }
        else
            this.overrideModalReward.actionState = false;
    }

    addUpdateOverride(action) {
        if (action == 'Add')
            this.addOverride();
        if (action == 'Update')
            this.updateOverride();
    }

    addOverride() {
        for (let rewardPosition of this.overrideModalReward.rewardPositions) {
            if (rewardPosition.position.positionCode == this.overrideModalReward.recipientPosition.positionCode) {
                if (!rewardPosition.overrides)
                    rewardPosition.overrides = [];
                var overrideObj = this.buildOverrideObj(this.overrideModalReward);
                rewardPosition.overrides.push(overrideObj);
                if (rewardPosition.overrides.length == 1) {
                    rewardPosition.rewardType = overrideObj.overrideType;
                    rewardPosition.rewardAmount = overrideObj.overrideAmt;
                }
                else {
                    rewardPosition.rewardType = {};
                    rewardPosition.rewardAmount = "";
                }
            }
        }
        $.extend(this.selectedRewardForOverride.rewardPositions, this.overrideModalReward.rewardPositions);
    }

    updateOverride() {
        var updatedSourcePosCode = this.overrideModalReward.sourcePosition.positionCode;
        var updatedRecipientPosCode = this.overrideModalReward.recipientPosition.positionCode;
        if (updatedSourcePosCode != this.selectedOverrideForOverride.sourcePosition.positionCode ||
            updatedRecipientPosCode != this.selectedOverrideForOverride.recipientPosition.positionCode) {
            this.selectedRewardPosForOverride.overrides.
                splice(this.selectedRewardPosForOverride.overrides.indexOf(this.selectedOverrideForOverride), 1);
            this.addOverride();
        } else {
            this.selectedOverrideForOverride.overrideType = this.overrideModalReward.overrideType;
            this.selectedOverrideForOverride.overrideAmt = this.overrideModalReward.overrideAmt;
            this.selectedOverrideForOverride.note = this.setOverrideNote(this.overrideModalReward);
            /* this.selectedRewardPosForOverride.rewardType = this.overrideModalReward.overrideType;
            this.selectedRewardPosForOverride.rewardAmount = this.overrideModalReward.rewardAmt; */
        }
    }

    buildOverrideObj(overrideModalReward) {
        return {
            isOverride: true,
            sourcePosition: overrideModalReward.sourcePosition,
            recipientPosition: overrideModalReward.recipientPosition,
            overrideType: overrideModalReward.overrideType,
            overrideAmt: overrideModalReward.overrideAmt,
            note: this.setOverrideNote(overrideModalReward)
        }
    }

    setOverrideNote(overrideModalReward) {
        var rewardDesc = this.getRewardDesc(overrideModalReward.overrideType.description,
            overrideModalReward.overrideAmt);
        return overrideModalReward.sourcePosition.description + " : " + rewardDesc
            + " to " + overrideModalReward.recipientPosition.description;
    }

    getRewardDesc(description, amt) {
        switch (description) {
            case 'DOLLAR':
                return '$' + amt;
            case 'PERCENT':
                return amt + '%';
            default:
                return amt + ' ' + description;
        }
    }

    trackProgram(index, program) {
        return program ? program.incentiveId : undefined;
    }

    trackCategory(index, category) {
        return category ? category.programGroup : undefined;
    }

    trackReward(index, reward) {
        return reward ? reward.programGroupId : undefined;
    }

    trackPosition(index, position) {
        return position ? position.positionCode : undefined;
    }

    trackOverride(index, override) {
        return override ? override.sourcePosition.positionCode : undefined;
    }

    fixTabDisplayIE11() {
        if (navigator.userAgent.indexOf("rv:11") != -1)
            window.setTimeout($('li.ui-tabview-selected>a>span.ui-tabview-title').click(), 100);
    }

}
