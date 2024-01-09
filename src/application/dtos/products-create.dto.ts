import { ApiModel, ApiModelProperty } from "@inversify-cn/swagger-express-ts";
import { IsNumber, IsString, Max, Min, IsNotEmpty } from 'class-validator';

@ApiModel({
    description: 'Product create',
    name: 'ProductCreate'
})
export class ProductsCreateDto {

    @ApiModelProperty({
        description: 'name',
        required: true
    })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El valor debe ser un string' })
    name: string;

    @ApiModelProperty({
        description: 'stock',
        required: true
    })
    @IsNotEmpty({ message: 'El stock es obligatorio' })
    @IsNumber()
    @Min(1, { message: 'El valor del stock debe ser mayor a 0' })
    @Max(5000, { message: 'El valor del stock no puede ser mayor a 5000' })
    stock: number;

    @ApiModelProperty({
        description: 'price',
        required: true
    })
    @IsNotEmpty({ message: 'El price es obligatorio' })
    @IsNumber()
    @Min(1, { message: 'El valor del price debe ser mayor a 0' })
    price: number;
}