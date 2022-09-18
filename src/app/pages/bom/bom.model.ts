export class BomCls {
    id: string;
    nonstock: number;
    article: string;
    code: string;
    blocked?: number;
    minQty: number;
    optimQty: number;
    revision?: string;
    revisionDate?: Date;
    date: Date;
    scrapPercent: number;
    um: string;
    type: string;
    deliveryMaxTerm?: string;
    obs: string;
}