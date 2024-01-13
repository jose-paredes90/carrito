import { ApiModel, ApiModelProperty } from "@inversify-cn/swagger-express-ts";

@ApiModel({
    description: 'Customer item',
    name: 'CustomerItem'
})
export class CustomerDto {
    @ApiModelProperty({
        description: 'id',
        required: true,
        example: '2'
    })
    id: string;

    @ApiModelProperty({
        description: 'name',
        required: true,
        example: 'Jose'
    })
    name: string;

    @ApiModelProperty({
        description: 'lastname',
        required: true,
        example: 'Paredes'
    })
    lastname: string;

    @ApiModelProperty({
        description: 'address',
        required: true,
        example: 'Jr tacna 2982'
    })
    address: string;

    @ApiModelProperty({
        description: 'document',
        required: true,
        example: '97229291'
    })
    document: number;

    @ApiModelProperty({
        description: 'phone',
        required: true,
        example: '117899777'
    })
    phone: number;

    @ApiModelProperty({
        description: 'email',
        required: true,
        example: 'jose@gmail.com'
    })
    email: string;

    @ApiModelProperty({
        description: 'country',
        required: true,
        example: 'Alemania'
    })
    country: string;
}