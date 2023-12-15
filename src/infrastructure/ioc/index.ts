import { Container } from "inversify";
import { IProductsUseCasesPort } from "../../application/useCasesPorts/products.use-cases.ports";
import { ProductsUseCases } from "../../application/useCases/products.use-cases";
import { ProductsRepositoryInterface } from "../../domain/repositories/products-repository";
import { ProductsRepository } from "../repository-mongo/repositories/products-repository";

export class IOC {
    public configureContainer(container: Container) {
        container
            .bind<IProductsUseCasesPort>("ProductsUseCases")
            .to(ProductsUseCases);
        container
            .bind<ProductsRepositoryInterface>("ProductsRepository")
            .to(ProductsRepository)
    }
}