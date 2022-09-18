// Table data
export interface Table {
    id: string;
    name: string;
    description: string;
    warehouseid: number;
    typeid: string;
    activ: number;
    is_virtual: number;
    consumption: number;
    delivery: number;
    receipt: number;
    adjustment: number;
    reservation: number;
    ownerid: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
