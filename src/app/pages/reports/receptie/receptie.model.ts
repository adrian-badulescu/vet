
export interface Table {
    id: string;
    number: string;
    date: Date;
}

export interface SearchResult {
    tables: Table[];
    total: number;
}
