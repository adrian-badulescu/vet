export class PartenerCls {
    id: string;
    name: string;
    code: string;
    cui: string;
    fiscalAttr: string;
    regNumber: string;
    capSoc: number;
    partnerType: string;
    web: string;
}

export class PartenerdDivisionCls {
    id: string;
    partnerDivId: string;
    division: string;
    state: string;
}

export class PartnerContactCls {
    id: string;
    partnerContactId: string;
    surname: string;
    forename: string;
    responsability: string;
    state: string;
}

export class PartnerAccountsCls {
    id: string;
    partnerAccId: string;
    account: string;
    bank: string;
    code: string;
    currency: string;
    state: string;
}
export class PartnerResponsabilitiesCls {
    id: string;
    partnerRespId: string;
    department: string;
    person: string;
    state: string;
}

export class PartnerGeneralCls {
    id: string;
    partnerGenId: string;
    state: string;
}
