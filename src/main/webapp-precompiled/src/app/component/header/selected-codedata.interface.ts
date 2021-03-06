export interface CodeData {
    selectedPositionCode: string;
    selectedPositionCodeDesc: string;
    selectedDealerCode: string;
    selectedDealerName: string;
    isDealerManager: boolean;
    isPartsManagerOfRecord: boolean;
    role: string;
    isServiceManagerOfRecord: boolean;
    isAdmin: boolean;
    isElManager: boolean;
    isPCManager: boolean;
    isUVMManager: boolean;
    isELEnrolled: string;
    isPCEnrolled: string;
    bcs: string;
    elValidated: string;
    elManagerExists: string;
    pcManagerExists: string;
    uvmManagerExists: String;
    mvpApproval: boolean;
}