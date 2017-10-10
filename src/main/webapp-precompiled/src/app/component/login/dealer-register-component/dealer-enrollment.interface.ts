export interface DealerEnrollmentFormInterface {
    aggrement: boolean;
    dealerCode: string;
    sid: string;
    dealershipName: string;
    dealerPrincipalName: string;
    dealerPrincipalEmail: string;
    phone: string;
    signature: string;
    date: string;
    selectedPartsManager: string;
    partsManagerEmail: string;
    selectedServiceManager: string;
    serviceManagerEmail: string;
    isPartsCounter: boolean;
    isUsedRecon: boolean;
    isExpressLane: boolean;
    autoApproveMVP: string;
}