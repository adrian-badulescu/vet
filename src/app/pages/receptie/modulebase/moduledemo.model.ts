// Table data
export interface Table {
    id: string;
    name: string;
    description: string;
    created_at?: string;    
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
