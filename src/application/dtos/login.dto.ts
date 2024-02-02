// import { ApiModelProperty } from "@inversify-cn/swagger-express-ts";
// import { IsEmail, IsNotEmpty } from "class-validator";

// export class LoginDto {
//     @ApiModelProperty({
//         description: 'email',
//         required: true
//     })
//     @IsNotEmpty({message: 'El Email es obligatorio'})
//     @IsEmail({}, { message: 'El Email del formato es invalido' })
//     email: string;

//     @ApiModelProperty({
//         description: 'password',
//         required: true
//     })
//     @IsNotEmpty({message: 'El password es obligatorio'})
//     password: string;
// }