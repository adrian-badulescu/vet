export class VaccinariCls {
    id: string;
    animalId: string;
    age: number;
    sex: string;
    gestating: number; // bit
    weight: number;
    height: number;
    temp: number;
    vaccineApplied: string;
    vaccineDate: Date;
    vaccineApplied2: string;
    boosterVaccine: Date; // vaccin rappel (vet term)
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