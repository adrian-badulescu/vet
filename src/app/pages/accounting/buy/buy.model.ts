

// Table data
export interface Table {
    // tab 1
    id: string;
    serie_factura: string;
    cod_furnizor: string;
    data_factura: Date;
    data_scadenta: Date;
    nr_cartoteca: string;
    nr_cec: string;
    tip_factura: string;
    tip_achizitie: string;
    tip_doc: string;
    proc_tva: string;
    o: boolean;
    exclus_evidenta: boolean;
    baza_exclus_evidenta: boolean;
    cern: boolean;
    tva_exigibil_incasare: boolean;
    // tab 2
    scutit_tva: string;
    neimpozabil: string;
    tva_19_20: string;
    tva_9: string;
    tva_5: string;
    tva_neexigibil: string;
    jurnal_tva_19_20: string;
    jurnal_tva_9: string;
    jurnal_tva_5: string;
    jurnal_tva_neexigibil: string;
    diferente_tva_19_20: string;
    diferente_tva_9: string;
    diferente_tva_5: string;
    diferente_tva_neexigibil: string;
    // tab 3
    cod_fiscal: string;
    cod_fiscal_start: Date;
    cod_fiscal_end: Date;
    tip_operatie: string;
    fact_avans_409: string;
    data_fact_avans: Date;
    // tab 4
    total_factura: string;
    valoare_in_valuta: string;
    curs_valutar: string;
    tip_valuta: string;
    diferente_total_factura: string;
    taxare_inversa_valoare: string;
    taxare_inversa_tva: string;
    taxare_inversa_codprod: string;
    tva_furnizori: string;
    total_chelt: string;
    nir: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}