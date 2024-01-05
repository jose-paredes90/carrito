import { Request, Response } from "express";
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from "@inversify-cn/swagger-express-ts";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { IProductsUseCasesPort } from "../../application/useCasesPorts/products.use-cases.ports";
import { ProductsCreateDto } from "../../application/dtos/products-create.dto";
import { validateRequestMiddleware } from "../middlewares/validate-request.middleware";

@ApiPath({
    path: "/products",
    name: "Products",
    security: { basicAuth: [] },
})

@controller("/products")
export class ProductsController {
    constructor(
        @inject("ProductsUseCases") private productsUseCases: IProductsUseCasesPort
    ) { }

    @ApiOperationGet({
        description: "Get Products By Id",
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
                description: "Product",
                model: "ProductItem",
            },
        },
    })
    @httpGet("/:id")
    public async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        const response = await this.productsUseCases.getById(id);
        res.send(response);
    }

    @ApiOperationGet({
        description: "Get Products",
        responses: {
            200: {
                model: "ProductItem",
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            },
            400: {},
        },
    })
    @httpGet("/")
    public async getProducts(req: Request, res: Response) {
        const response = await this.productsUseCases.get();
        res.send(response);
    }

    @ApiOperationPost({
        description: "Create Product",
        parameters: {
            body: {
                description: "New Product",
                model: "ProductCreate",
                required: true,
            },
        },
        responses: {
            200: {
                model: "ProductItem",
            },
        },
        summary: "Create new product",
    })
    @httpPost("/", validateRequestMiddleware(ProductsCreateDto))
    public async createProduct(req: Request, res: Response) {
        const { name, stock, price } = req.body;
        const dto = new ProductsCreateDto();
        dto.name = name;
        dto.stock = stock;
        dto.price = price

        const response = await this.productsUseCases.create(dto);
        res.send(response);
    }

    @ApiOperationPut({
        description: "Update Product",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
            body: {
                description: "Product",
                model: "ProductCreate",
                required: true,
            },
        },
        responses: {
            200: {
                model: "ProductItem",
            },
        },
        summary: "Update product",
    })
    @httpPut("/:id")
    public async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { name, stock, price } = req.body;
        const dto = new ProductsCreateDto();
        dto.name = name;
        dto.stock = stock;
        dto.price = price;
        const response = await this.productsUseCases.update(id, dto);
        res.send(response);
    }

    @ApiOperationDelete({
        description: "Delete Product",
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
                model: "ProductItem",
            },
        },
        summary: "Delete product",
    })
    @httpDelete("/:id")
    public async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        const response = await this.productsUseCases.delete(id);
        res.send(response);
    }
}