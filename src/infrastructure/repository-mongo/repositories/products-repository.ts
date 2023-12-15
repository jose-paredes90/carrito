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

    public async getProduct(id: number): Promise<Products> {
        const response = await ProductsSchema.findById(id);
        return response as Products
    }

    public async updateProducts(product: Products): Promise<Products> {
        await ProductsSchema.updateOne(product, { where: { id: product._id } });
        return product;
    }

    public async deleteProducts(id: number): Promise<void> {
        await ProductsSchema.deleteOne({ where: { id } });
    }
}