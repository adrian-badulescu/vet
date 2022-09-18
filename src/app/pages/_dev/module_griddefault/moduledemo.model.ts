
export interface Model {
    id: string;
    name: string;
    description: string;
    created_at?: string;    
}

// Search Data
export interface SearchResult {
    tables: Model[];
    total: number;
}
