export interface InventoryList {  
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
    // created_at: string;
}
