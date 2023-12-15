import { ApiModel, ApiModelProperty } from "@inversify-cn/swagger-express-ts";

@ApiModel({
    description: 'Product item',
    name: 'ProductItem'
})
export class ProductsDto {
    @ApiModelProperty({
        description: 'id',
        required: true,
        example: '2'
    })
    _id: string;

    @ApiModelProperty({
        description: 'name',
        example: 'Product 1',
        required: true
    })
    name: string;

    @ApiModelProperty({
        description: 'stock',
        example: '100',
        required: true
    })
    stock: number;

    @ApiModelProperty({
        description: 'price',
        example: '2000',
        required: true
    })
    price: number;
}