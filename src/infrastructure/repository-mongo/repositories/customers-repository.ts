import { injectable } from "inversify";
import { CustomersRepositoryInterface } from "../../../domain/repositories/customers-repository";
import { Customers } from "../../../domain/entities/customers";

import CustomersSchema from "../schemas/customer.schema";

@injectable()

export class CustomerRepository implements CustomersRepositoryInterface {
    public async getCustomers(): Promise<Customers[]> {
        const response: Customers[] = await CustomersSchema.find();
        return response;
    }
    public async getCustomer(id: string): Promise<Customers> {
        const response = await CustomersSchema.findById(id);
        return response as Customers
    }
    public async createCustomer(customer: Customers): Promise<Customers> {
        const response: Customers = await CustomersSchema.create(customer)
        return response;
    }
    public async updateCustomer(customer: Customers): Promise<Customers> {
        await CustomersSchema.findByIdAndUpdate(customer.id, customer);
        return customer;
    }
    public async deleteCustomer(id: string): Promise<void> {
        await CustomersSchema.findByIdAndDelete(id);
    }
}