import { ProductsCreateDto } from "../dtos/products-create.dto";
import { ProductsDto } from "../dtos/products.dto";
import { ShoppingDetailDto } from "../dtos/shopping-detail.dto";

export interface IProductsUseCasesPort {
    getById(id: string): Promise<ProductsDto>;
    get(): Promise<ProductsDto[]>;
    create(dto: ProductsCreateDto): Promise<ProductsDto>;
    update(id: string, dto: ProductsCreateDto): Promise<ProductsDto>;
    delete(id: string): Promise<ProductsDto>;
    updateStock(details: ShoppingDetailDto[]): Promise<void>;
}