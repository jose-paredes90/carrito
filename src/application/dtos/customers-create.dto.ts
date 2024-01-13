import { ApiModel, ApiModelProperty } from "@inversify-cn/swagger-express-ts";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

@ApiModel({
    description: 'Customer create',
    name: 'CustomerCreate'
})
export class CustomerCreateDto {

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
        description: 'address',
        required: true
    })
    @IsNotEmpty({ message: 'La direccion es obligatoria' })
    @IsString({ message: 'El valor debe ser un string' })
    address: string;

    @ApiModelProperty({
        description: 'document',
        required: true
    })
    @IsNotEmpty({ message: 'El documento es obligatorio' })
    @IsNumber()
    
    document: number;

    @ApiModelProperty({
        description: 'phone',
        required: true
    })
    @IsNotEmpty({message: 'El Telefono es obligatorio'})
    @IsNumber()
    phone: number;

    @ApiModelProperty({
        description: 'email',
        required: true
    })
    @IsNotEmpty({message: 'El Email es obligatorio'})
    email: string;

    @ApiModelProperty({
        description: 'country',
        required: true
    })
    @IsNotEmpty({message: 'El pais es obligatorio'})
    @IsString({ message: 'El valor debe ser un string' })
    country: string;
}