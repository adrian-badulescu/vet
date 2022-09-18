export class DecontCls {
    id: string;
    // T1
    year: number;
    paymentOrderId: number;
    paymentOrderName: string;
    costClaim: number;
    date: Date;
    brandId: number;
    brandName: string;
    payment: number;
    // T2
    acc: string;
    analytic: string;
    // T3
    acc2: string;
    policy: string;
    forbearance: number;
    analytic2: string;
    date2: Date;
    date2Start: Date;
    counter: number;
    // T4
    invoice: string;
    invoiceDate: Date; // *
    partId: number; // *
    chargeCenter: number;
    order: string;
    payment2: number;
    paymentForeignCurrency: number;
    docType: string;
    partName: string; // *
    CIG: string;
    vatPercent: number; // *
    taxBase: number;
    currency: string;
    exgRate: number;
    // T5
    fiscalCode: number; // *
    vatRecovery: number; //bit // *
    dateStart: Date;
    dateEnd: Date;
    operationType: string;
    // T6
    inventory1: string;
    inventory2: number;
}