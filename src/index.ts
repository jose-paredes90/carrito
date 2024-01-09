import express from "express";
import "reflect-metadata";
import cors from 'cors';
import * as swagger from "@inversify-cn/swagger-express-ts";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import { dbConnection } from "./infrastructure/repository-mongo/schemas/index";
import { IOC } from "./infrastructure/ioc";
import "./infrastructure/controllers";
import { ExceptionsMiddleware } from "./infrastructure/middlewares/exceptions.middleware";
import { KafkaAdapterInterface } from "./infrastructure/kafka/kafka.adapter.interface";

const main = async () => {

    dbConnection();

    const container = new Container({
        defaultScope: "Singleton",
    });
    const ioc = new IOC();
    ioc.configureContainer(container);

    const brokerConsumer = container.get<KafkaAdapterInterface>("KafkaAdapter");
    brokerConsumer.consume();

    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use("/api-docs/swagger", express.static("swagger"));
        app.use(
            "/api-docs/swagger/assets",
            express.static("node_modules/swagger-ui-dist")
        );
        app.use(express.json());
        app.use(
            swagger.express({
                definition: {
                    info: {
                        title: "Products Api",
                        version: "1.0",
                    },
                    // Models can be defined here
                },
            })
        );

        app.use(cors({ origin: `*` }));
    });

    const exceptionsMiddleware = new ExceptionsMiddleware();
    exceptionsMiddleware.configureExceptionHandler(server);

    const app = server.build();

    app.set("port", process.env.PORT || 3500);
    app.listen(app.get("port"), () => {
        console.log(`server is running on http://localhost:${app.get("port")}`);
    });

}

main();
