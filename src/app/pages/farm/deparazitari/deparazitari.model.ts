export class DeparazitariCls {
    id: string;
    animalId: string;
    grpId: string;
    grpAdm: number; // bit
    vetName: string;
    age: number;
    sex: string;
    gestating: number; // bit
    weight: number;    
    temp: number;    
    desinfestationApplied: string;
    qty: number;
    measurementUnit: string;
    measurementUnit2: string;
    admType: string;
    desinfestationDate: Date;
    obs: string;
}

export interface ChartType {
    labels?: any;
    chart?: any;
    series?: any;
    colors?: any;
    legend?: any;
    dataLabels?: any;
    responsive?: any;
}