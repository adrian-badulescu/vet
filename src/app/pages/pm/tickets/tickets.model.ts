// Card Data
export interface CardData {
    icon?: string;
    tickets?: number;
    title?: string;
    text?: string;
    priority?: string;
    status?: any;
}

// Table Data
export interface TableData {
    id: string;
    // requestuser: string;
    // name: string;
    subject: string;
    // assignuser: string;
    priority: string;
    status: string;
    createddate: any;
    duedate: any;
    // searchTerm?: string;
}

// Search Data
export interface SearchResult {
    tickets: TableData[];
    total: number;
}
