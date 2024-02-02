// import { ApiOperationPost, ApiPath } from "@inversify-cn/swagger-express-ts";
// import { inject } from "inversify";
// import { controller, httpPost } from "inversify-express-utils";
// import { CustomersUseCases } from "../../application/useCases/customer.use-cases";
// import { Request, Response } from "express";
// import { validateRequestMiddleware } from "../middlewares/validate-request.middleware";
// import { CustomerCreateDto } from "../../application/dtos/customers-create.dto";
// import { NotFoundException } from "../middlewares/exeptions";
// import { LoginDto } from "../../application/dtos/login.dto";

// @ApiPath({
//     path: "/login",
//     name: "Authentication",
//     security: { basicAuth: [] },
// })

// @controller("/login")
// export class UserController {

//     constructor(@inject('CustomersUseCases') private customersUseCases: CustomersUseCases,) { }

//     @ApiOperationPost({
//         description: "user login",
//         parameters: {
//             body: {
//                 description: "Login",
//                 model: "LoginDto",
//                 required: true
//             },
//         },
//         responses: {
//             200: {
//                 model: "TokenResponse",
//             },
//         },
//         summary: "user login"
//     })

//     @httpPost('/', validateRequestMiddleware(LoginDto))
//     public async login(req: Request, res: Response) {
//         const { email, password } = req.body;

//         const token = await this.customersUseCases.login(email, password);
//         console.log(token);
//         res.status(200).json({ token });
//     }
// }