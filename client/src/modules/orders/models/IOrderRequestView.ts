export interface IOrderRequestView {
    products: OrderRequestProduct[];
    total: string;
    tax: string;
    grandTotal: string;
    paymentType: string;
}

export interface OrderRequestProduct {
    productObj: string;
    count: string;
    price: string;
}
