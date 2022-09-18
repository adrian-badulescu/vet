export interface Purchaseorder {
    id: string;
    number: number;
    internalreference: string;    
    date: Date;
    supplierid: string;
    suppliercontactid: string;
    orderdate: Date;
    notes: string;
    statusid: string;
    valutaid: string;
    contractid: string;
    discountpercent: number;
    discountreason: string;
    paymenttermdays: string;
    deliverylocationid: string;
    deliverylocationcustom: string;
    penalties: string;
    warrantyid: string;
    offervalidityid: string;
    reshdid: string;
    resordid: string;
    resvizid: string;
    generat: number;
    aquisitionrequestid: string;
    statusobs: string;
    statusact: string;
    data_lansare: Date;
    data_confirmare: Date;
    data_estimata_livrare: Date;
    inport: number; 
    intarziere_comanda: string;
    continut_comanda: string;
}

export interface Purchaseorderitems {
    id: string;
    purchaseorderid: string;
    code: string;
    suppliercode: string;
    umid: string;
    quantity: number;
    price: number;
    delivery_term: Date;
    description: string;
    artprodid: string;
    reception: number;
    reception_date: Date;
    state: string;
}
