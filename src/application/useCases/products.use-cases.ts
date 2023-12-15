import { inject, injectable } from "inversify";
import { ProductsDto } from "../dtos/products.dto";
import { ProductsRepositoryInterface } from "../../domain/repositories/products-repository";
import { IProductsUseCasesPort } from "../useCasesPorts/products.use-cases.ports";
import { Products } from "../../domain/entities/products";
import { ProductsCreateDto } from "../dtos/products-create.dto";
import { NotFoundException } from "../../infrastructure/middlewares/exeptions";
import { ShoppingDetailDto } from "../dtos/shopping-detail.dto";

@injectable()
export class ProductsUseCases implements IProductsUseCasesPort {
    constructor(
        @inject("ProductsRepository")
        private readonly productRepository: ProductsRepositoryInterface) {
    }

    public async getById(id: number): Promise<ProductsDto> {
        const product = await this.productRepository.getProduct(id);
        return product
    }

    public async get(): Promise<ProductsDto[]> {
        const products = await this.productRepository.getProducts();
        return products
    }

    public async create(dto: ProductsCreateDto): Promise<ProductsDto> {
        const product = new Products();
        product.stock = dto.stock;
        product.name = dto.name;
        product.price = dto.price
        const response = await this.productRepository.createProducts(product);
        return response
    }

    public async update(
        id: number,
        dto: ProductsCreateDto
    ): Promise<ProductsDto> {
        const product = new Products();
        product._id = id.toString();
        product.stock = dto.stock;
        product.name = dto.name;
        const response = await this.productRepository.updateProducts(product);

        return this.toDTO(response);
    }

    public async delete(id: number): Promise<ProductsDto> {
        const product = await this.productRepository.getProduct(id);
        if (!product) throw new NotFoundException("Producto no encontrado");

        await this.productRepository.deleteProducts(id);
        return this.toDTO(product);
    }

    public async updateStock(details: ShoppingDetailDto[]): Promise<void> {
        details.map(async (det) => {
            const product = await this.productRepository.getProduct(det.productId);
            if (!product) throw new NotFoundException("Producto no encontrado");

            product.stock = product.stock - det.quantity;
            await this.productRepository.updateProducts(product);
        });
    }

    private toDTO(product: Products) {
        const item = new ProductsDto();
        item._id = product._id;
        item.name = product.name;
        item.stock = product.stock;
        return item;
    }
}
