import { ApiModel, ApiModelProperty } from "@inversify-cn/swagger-express-ts";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

@ApiModel({
    description: 'Customer create',
    name: 'CustomerUpdate'
})
export class CustomerUpdateDto {

    @ApiModelProperty({
        description: 'name',
        required: true
    })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El valor debe ser un string' })
    name: string;

    @ApiModelProperty({
        description: 'lastname',
        required: true
    })
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El valor debe ser un string' })
    lastname: string;

    @ApiModelProperty({
        description: 'document',
        required: true
    })
    @IsNotEmpty({ message: 'El documento es obligatorio' })
    @IsNumber()
    
    document: number;
}