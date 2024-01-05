import { inject, injectable } from "inversify";
import { CustomersRepositoryInterface } from "../../domain/repositories/customers-repository";
import { CustomerDto } from "../dtos/customers.dto";
import { ICustomerUseCasesPort } from "../useCasesPorts/customer.use-cases.ports";
import { CustomerCreateDto } from "../dtos/customers-create.dto";
import { Customers } from "../../domain/entities/customers";
import { NotFoundException } from "../../infrastructure/middlewares/exeptions";
import { CustomerUpdateDto } from "../dtos/customers-update.dto";

@injectable()

export class CustomersUseCases implements ICustomerUseCasesPort {
    constructor(
        @inject("CustomerRepository")
        private readonly customerRepository: CustomersRepositoryInterface) {
    }

    public async getAll(): Promise<CustomerDto[]> {
        const customers = await this.customerRepository.getCustomers();
        return customers;
    }

    public async getById(id: string): Promise<CustomerDto> {
        const customer = await this.customerRepository.getCustomer(id);
        return customer;
    }
    public async create(dto: CustomerCreateDto): Promise<CustomerDto> {
        const customer = new Customers();
        customer.name = dto.name;
        customer.lastname = dto.lastname;
        customer.address = dto.address;
        customer.document = dto.document;
        customer.phone = dto.phone;
        customer.country = dto.country;
        const response = await this.customerRepository.createCustomer(customer);
        return response;
    }

    public async update(id: string, dto: CustomerUpdateDto): Promise<CustomerDto> {
        const customer = new Customers();
        customer.id = id;
        customer.name = dto.name;
        customer.lastname = dto.lastname;
        customer.document = dto.document;
        const updatedCustomer = await this.customerRepository.updateCustomer(customer);
        return this.toDTO(updatedCustomer);
    }

    public async delete(id: string): Promise<CustomerDto> {
        const customer = await this.customerRepository.getCustomer(id);
        if (!customer) throw new NotFoundException("Customer no encontrado");
        await this.customerRepository.deleteCustomer(id);
        return this.toDTO(customer);
    }

    private toDTO(customer: Customers) {
        const item = new CustomerDto();
        item.id = customer.id;
        item.name = customer.name;
        item.lastname = customer.lastname;
        item.address = customer.address;
        item.document = customer.document;
        item.phone = customer.phone;
        item.country = customer.country;
        return item;
    }
}