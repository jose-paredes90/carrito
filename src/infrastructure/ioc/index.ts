import { Container } from "inversify";
import { IProductsUseCasesPort } from "../../application/useCasesPorts/products.use-cases.ports";
import { ProductsUseCases } from "../../application/useCases/products.use-cases";
import { ProductsRepositoryInterface } from "../../domain/repositories/products-repository";
import { ProductsRepository } from "../repository-mongo/repositories/products-repository";
import { ICustomerUseCasesPort } from "../../application/useCasesPorts/customer.use-cases.ports";
import { CustomersUseCases } from "../../application/useCases/customer.use-cases";
import { CustomersRepositoryInterface } from "../../domain/repositories/customers-repository";
import { CustomerRepository } from "../repository-mongo/repositories/customers-repository";
import { KafkaAdapterInterface } from "../kafka/kafka.adapter.interface";
import { kafkaAdapter } from "../kafka/kafka.adapter";

export class IOC {
    public configureContainer(container: Container) {
        container
            .bind<IProductsUseCasesPort>("ProductsUseCases")
            .to(ProductsUseCases);
        container
            .bind<ProductsRepositoryInterface>("ProductsRepository")
            .to(ProductsRepository);
        container
            .bind<ICustomerUseCasesPort>("CustomersUseCases")
            .to(CustomersUseCases)
        container
            .bind<CustomersRepositoryInterface>("CustomerRepository")
            .to(CustomerRepository)
        container.bind<KafkaAdapterInterface>("KafkaAdapter")
            .to(kafkaAdapter);
    }
}