import { Products } from "../entities/products";

export interface ProductsRepositoryInterface {
    getProduct(id: number): Promise<Products>;
    getProducts(): Promise<Products[]>;
    createProducts(product: Products): Promise<Products>;
    updateProducts(product: Products): Promise<Products>;
    deleteProducts(id: number): Promise<void>;
}