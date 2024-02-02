import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from "@inversify-cn/swagger-express-ts";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { ICustomerUseCasesPort } from "../../application/useCasesPorts/customer.use-cases.ports";
import { Request, Response } from "express";
import { validateRequestMiddleware } from "../middlewares/validate-request.middleware";
import { CustomerCreateDto } from "../../application/dtos/customers-create.dto";
import { CustomerUpdateDto } from "../../application/dtos/customers-update.dto";
import { KafkaAdapterInterface } from "../kafka/kafka.adapter.interface";

@ApiPath({
    path: "/customers",
    name: "Customers",
    security: { basicAuth: [] },
})

@controller("/customers")
export class CustomersController {
    constructor(
        @inject("CustomersUseCases") private CustomerUseCases: ICustomerUseCasesPort,
        @inject("KafkaAdapter") private IkafkaAdapter: KafkaAdapterInterface
    ) { }

    @ApiOperationGet({
        description: "Get Customer By Id",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                description: "Customer",
                model: "CustomerItem"
            },
        },
    })

    @httpGet("/:id")
    public async getCustomerId(req: Request, res: Response) {
        const { id } = req.params;
        const customer = await this.CustomerUseCases.getById(id);
        res.send(customer)
    }

    @ApiOperationGet({
        description: "Get All Customers",
        responses: {
            200: {
                model: "CustomerItem",
                type: SwaggerDefinitionConstant.Response.Type.ARRAY
            },
            400: {},
        },
    })

    @httpGet("/")
    public async getCustomers(req: Request, res: Response) {
        const response = await this.CustomerUseCases.getAll();
        res.send(response);
    }

    @ApiOperationPost({
        description: "Create a new Customer",
        parameters: {
            body: {
                description: "New Customer",
                model: "CustomerCreate",
                required: true
            },
        },
        responses: {
            200: {
                model: "CustomerItem",
            },
        },
        summary: "Create new customer"
    })

    @httpPost("/", validateRequestMiddleware(CustomerCreateDto))
    public async createCustomer(req: Request, res: Response) {
        const { name, lastname, address, document, phone, country, email, password } = req.body;
        const dto = new CustomerCreateDto();
            dto.name = name,
            dto.lastname = lastname,
            dto.address = address,
            dto.document = document,
            dto.phone = phone,
            dto.email = email,
            dto.password = password,
            dto.country = country

        const response = await this.CustomerUseCases.create(dto);
        if (response) {
            const kaf = JSON.stringify(response)
            this.IkafkaAdapter.produce(kaf);
        }

        res.send(response);
    }

    @ApiOperationPut({
        description: "Actualizar un Costumer",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
            body: {
                description: "Customer",
                model: "CustomerCreate",
                required: true
            },
        },
        responses: {
            200: {
                model: "CustomerItem"
            },
        },
        summary: "Update Customer"
    })

    @httpPut("/:id")

    public async updateCustomer(req: Request, res: Response) {
        const { id } = req.params;
        const { name, lastname, document, email, password } = req.body;
        const dto = new CustomerUpdateDto();
        dto.name = name;
        dto.lastname = lastname;
        dto.document = document;
        dto.email = email;
        dto.password = password;
        const response = await this.CustomerUseCases.update(id, dto);
        res.send(response);
    }

    @ApiOperationDelete({
        description: "Delete customer",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                model: "CustomerItem"
            },
        },
        summary: "Delete customer"
    })

    @httpDelete("/:id")
    public async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;
        const response = await this.CustomerUseCases.delete(id);
        res.send(response);
    }
}