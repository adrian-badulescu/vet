export interface Company {
    id: string;
    name: string;
    cui: number;
    // logo: string;
    header: string;
    ceoid: string;
    nrregcom: string;
    slogan: string;
    fax: string;
    adresa: string;
    codpostal: string;
    // pathlogo: string;
}

export interface CompanyxWork {
    id: string;
    companyid: string;
    name: string;
    main: number;
    phone: string;
    email: string;
    notes: string;
    state: string;
}

