export class BtMaterialeCls {
    id: string;
    name: string;
    receiver: number; // bit
    giver: number; // bit
    giverAdm: string;
    giverInput1: string;
    giverInput2: string;
    receiverAdm: string;
    receiverInput1: string;
    receiverInput2: string;
    searchAllAdm: number; // bit
    searchCodeGestStoc: string;
    searchDocEmitted: number;
    docType: string;
    btNo: string;
    matCode: string;
    desc: string;
    producerMatCode: string;
    partCode: string;
    docDate: Date;
    matAcc: string;
    correspAcc: string;
    counterPos: string;
    counterBt: string;
    reservedQty: number;
    measurement: string; // BUC
    validatedReceivedAdm: number; // bit
    currentStockHandoverAdm: number;
    reservedEHandoverAdm: string;
    reservedIHandoverAdm: string;
    currentStockReceivedAdm: number;
    reservedEReceivedAdm: string;
    reservedIReceivedAdm: string;
    qtyhandover: number;
    validatedHandeoverAdm: number; // bit
}