// Table data
export interface Table {
    nr: string;
    data: string;
    serie: string;
    
  }
  
  // Search Data
  export interface SearchResult {
    tables: Table[];
    total: number;
  }
  
  