export interface IOrderResponseView {
    _id: string;
    products: OrderResponseProduct[];
    total: string;
    tax: string;
    grandTotal: string;
    paymentType: string;
    orderStatus: string;
    orderBy: OrderBy;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IOrderStorageType {
    _id: string;
    products: IOrderProduct[];
    total: string;
    tax: string;
    grandTotal: string;
    paymentType: string;
    orderStatus: string;
    orderBy: OrderBy;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IOrderProduct {
    _id: string;
    title: string;
    count: number;
    description: string;
    imageUrl: string;
    brand: string;
    price: string;
    quantity: string;
    sold: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface OrderResponseProduct {
    productObj: ProductObj;
    count: number;
    price: string;
    _id: string;
}

export interface ProductObj {
    _id: string;
    title: string;
    count: number;
    description: string;
    imageUrl: string;
    brand: string;
    price: string;
    quantity: string;
    sold: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OrderBy {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
