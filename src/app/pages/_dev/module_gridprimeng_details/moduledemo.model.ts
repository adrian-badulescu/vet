export class Invoices {
    id: string;
    number: string;
    date: Date;
    created_at?: string;
}

export class InvoicesxArticles {
    id: string;
    invoiceid: string;
    article: string;
    price: number;
    qty: number;
    state: string;
}
