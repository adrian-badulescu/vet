export interface Invoices {
    id: string;
    number: string;
    date: Date;
    created_at?: string;
}

export interface InvoicesxArticles {
    id: string;
    invoiceid: string;
    article: string;
    price: string;
    qty: string;
    state: string;
}

