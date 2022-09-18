export class ReceptieCls {
    // Principal
    id: string;
    number: number;
    serie: string;
    date: Date;
    administration: string;
    currency: string;
    exgRate: number;    
    ficalCode: string;
    obs: string;
    confirmation: number; // bit
    discount: number;
    transport: string;
    arrivalDate: Date;
    receptionDomain: string;
    // T Document
    type: string;
    serieDoc: string;
    numberDoc: number;
    dateDoc: Date;    
    provider: string;
    autoNr: string;
    delegate: string;
    providerDoc: string;
    // T Comisie receptie
    prezCom: string;
    qtInsp: string;
    member: string;

}

export class ReceptiedCls {
    id: string;
    recepid: string;
    product: string;
    um: string;
    invoice: string;
    qtyInv: number;
    qty: number;
    priceAquisition: number;
    state: string;
}
