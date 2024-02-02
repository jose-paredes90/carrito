import { inject, injectable } from "inversify";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        return customers.map((item: Customers) => {
            return this.toDTO(item)
        });

    }

    public async getById(id: string): Promise<CustomerDto> {
        const customer = await this.customerRepository.getCustomer(id);
        return this.toDTO(customer);
    }

    // private async generarToken(data: CustomerDto): Promise<string> {
    //     const jwtSecret = 'miclave';
    //     const jwtExpires = '300'
    //     return jwt.sign({ datos: { id: data.id, name: data.name, email: data.email } }, jwtSecret, {
    //         expiresIn: parseInt(jwtExpires)
    //     });
    // }

    // public async login(email: string, password: string): Promise<string> {
    //     const user = await this.customerRepository.login(email);
    //     if (user) {
    //         const passwordMatch = await bcrypt.compare(password, user.password);
    //         if (passwordMatch) {
    //             const token = await this.generarToken(user);
    //             return token;
    //         }
    //         else {
    //             throw new NotFoundException(`La contraseña proporcionada para el usuario con email ${email} es incorrecta`);
    //         }
    //     }
    //     else {
    //         throw new NotFoundException(`El usuario con el email ${email} no existe`);
    //     }
    // }

    public async create(dto: CustomerCreateDto): Promise<CustomerDto> {

        const newPasswordEncrypted = await bcrypt.hash(dto.password, 11);
        const customer = new Customers();
        customer.name = dto.name;
        customer.lastname = dto.lastname;
        customer.address = dto.address;
        customer.document = dto.document;
        customer.password = newPasswordEncrypted;
        customer.phone = dto.phone;
        customer.email = dto.email;
        customer.country = dto.country;
        const response = await this.customerRepository.createCustomer(customer);
        return this.toDTO(response);
    }

    public async update(id: string, dto: CustomerUpdateDto): Promise<CustomerDto> {
        const customer = new Customers();
        customer.id = id;
        customer.name = dto.name;
        customer.lastname = dto.lastname;
        customer.document = dto.document;
        customer.email = dto.email;
        customer.password = dto.password;
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
        item.email = customer.email;
        item.country = customer.country;
        return item;
    }
}