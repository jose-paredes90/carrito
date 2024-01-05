import { injectable } from "inversify";
import { ProductsRepositoryInterface } from "../../../domain/repositories/products-repository";
import { Products } from "../../../domain/entities/products";
import ProductsSchema from "../schemas/product.schema";

@injectable()
export class ProductsRepository implements ProductsRepositoryInterface {
    public async getProducts(): Promise<Products[]> {
        const response: Products[] = await ProductsSchema.find();
        return response;
    }

    public async createProducts(product: Products): Promise<Products> {
        const response: Products = await ProductsSchema.create(product)
        return response;
    }

    public async getProduct(id: string): Promise<Products> {
        const response = await ProductsSchema.findById(id);
        return response as Products
    }

    public async updateProducts(product: Products): Promise<Products> {
        console.log(product);
        await ProductsSchema.findByIdAndUpdate(product._id, product);
        return product;
    }

    public async deleteProducts(id: string): Promise<void> {
        await ProductsSchema.findByIdAndDelete(id);
    }
}