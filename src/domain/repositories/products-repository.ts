import { Products } from "../entities/products";

export interface ProductsRepositoryInterface {
    getProduct(id: string): Promise<Products>;
    getProducts(): Promise<Products[]>;
    createProducts(product: Products): Promise<Products>;
    updateProducts(product: Products): Promise<Products>;
    deleteProducts(id: string): Promise<void>;
}