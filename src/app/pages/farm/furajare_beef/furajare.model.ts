export class FeedPlanningCls {
  id: string;
  grpId: string;
  personalId: string;
  DM: number; // dry matter
  ME: number; // (metabolisable energy)-megajoules/Kg dry matter(MJ/ kg DM)
  CP: number; // (crude protein)-g/Kg DM
//   milkLiters: number;
  water: number;

  // anual energy demand
  suckerCows500Kg: number;
  InCalfHeifers450Kg: number;
  growingFinishingCattleYear1: number;
  growingFinishingCattleYear2: number;
  totalEnergy1Y_ME: number;
  // Annual energy supply
  grazingLaxControl: number; // se ia din modul "pasunat"
  grazing: number;
  roughGrazing: number;
  twoCutSilage: number; //(moderate quality) Second cut silage is planned on many farms to replenish silage reserves for the coming winter
  firstCutSilage: number; // (low quality)
  calculusGrazing: number; // ex:2t DM/ha at 10.0 MJ ME/kg DM)
  wholecropSilage: number;
  otherConservedSilage: number;
  totalGrassAndForageEnergySupply: number; // exprimat in MJ ME
  // Bought-in feeds
  straw: number;
  rapeseedMeal: number;
  totalBoughtEnergySupply: number;
  totalFarmEnergySupply: number;


  // results
  supply: number;
  minus: number;
  demand: number;
  balance: number;
  plusMinus: string;
}
