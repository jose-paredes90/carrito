import { CustomerCreateDto } from "../dtos/customers-create.dto";
import { CustomerUpdateDto } from "../dtos/customers-update.dto";
import { CustomerDto } from "../dtos/customers.dto";

export interface ICustomerUseCasesPort {
    getAll(): Promise<CustomerDto[]>;
    getById(id: string): Promise<CustomerDto>
    create(dto: CustomerCreateDto): Promise<CustomerDto>;
    update(id: string, dto: CustomerUpdateDto): Promise<CustomerDto>;
    delete(id: string): Promise<CustomerDto>;
    //login(email: string, password: string): Promise<string>;
}