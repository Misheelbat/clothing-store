export enum PRODUCTS_ACTIONS {
	FETCH_PRODUCT_START = 'FETCH_PRODUCT_START',
	FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
	FETCH_PRODUCT_FAILED = 'FETCH_PRODUCT_FAILED',
}
export type ProductItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Product = {
	title: string;
	imageUrl: string;
	items: ProductItem[];
};

export type ProductMap = {
	[key: string]: ProductItem[];
};
