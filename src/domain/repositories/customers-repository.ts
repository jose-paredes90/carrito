import { Customers } from "../entities/customers";

export interface CustomersRepositoryInterface {
    getCustomers(): Promise<Customers[]>;
    getCustomer(id: string): Promise<Customers> ;
    createCustomer(customer: Customers): Promise<Customers>;
    updateCustomer(customer: Customers): Promise<Customers>;
    deleteCustomer(id: string): Promise<void>;
}