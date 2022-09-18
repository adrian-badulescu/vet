import { SitemapComponent } from './../../extras/sitemap/sitemap.component';
// Table data
export interface Table {
    id: string;
    serie_factura: string;
    data_factura: Date;
    data_scadenta: Date;
    cont_creditor: string;
    cont_creditor_2nd: string;
    cod_furnizor: string;
    cont_debitor: string;
    cont_debitor_2nd: string;
    denumire: string;
    valoare: string;
    centru_cost: string;
    cont_chelt: string;
    cont_chelt_2nd: string;
    comanda: string;
    nir: string;
    data_nir: Date;
    val_valuta: string;
    nr_luni_esalonare: string;
    data_start: Date;
    cont_gr_9: string;
    cont_gr_9_2nd: string;
    curs_pvr: string;
    nr_inv: string;
    unknown: string;
    created_at: Date;

}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
