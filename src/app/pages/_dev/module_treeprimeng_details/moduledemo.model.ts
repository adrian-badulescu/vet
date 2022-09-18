export class Category {
    id;
    parinteid;
    denumire;
    description;
}

export class CategoryxArticles {
    id: string;
    categoryid: string; 
    article: string;
    price: number;
    qty: number;
    state: string;
}
