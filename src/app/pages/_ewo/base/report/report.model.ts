// Table data
export interface Table {
    id: string;
    name: string;
    description: string;
    
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
