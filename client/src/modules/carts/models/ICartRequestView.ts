export interface ICartRequestView {
    products: ICartRequestProduct[];
    total: string;
    tax: string;
    grandTotal: string;
}

export interface ICartRequestProduct {
    productObj: string;
    count: string;
    price: string;
}
