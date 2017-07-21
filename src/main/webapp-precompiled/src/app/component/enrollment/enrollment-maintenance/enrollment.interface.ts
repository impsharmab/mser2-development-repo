export interface EnrollmentInterface {
    "sid": string,
    "name": string,
    "dmsId": string,
    "myPersonnelDmsId": string,
    "myPersonnelPositions": Array<string>,
    "moparPartsData": Array<string>,
    "magnetiMarelliData": Array<string>,
    "mvpData": Array<string>,
    "wiAdvisorMVPData": Array<string>,
    "wiAdvisorTiresData": Array<string>,
    "posCodeOverrides": Array<string>,
    "pcManager": string,
    "elManager": string,
    "urManager": string,
    "urParticipant": string
}