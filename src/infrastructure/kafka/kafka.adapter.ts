import { inject, injectable } from "inversify";
import { Kafka } from "kafkajs";
import { KafkaAdapterInterface } from "./kafka.adapter.interface";
import { IProductsUseCasesPort } from "../../application/useCasesPorts/products.use-cases.ports";

@injectable()
export class kafkaAdapter implements KafkaAdapterInterface {
    
    private kafka = new Kafka({
        clientId: "products-api-client-id",
        brokers: ["localhost:29092"],
    });

    private consumer = this.kafka.consumer({ groupId: "products-api-consumer" });

    constructor(@inject("ProductsUseCases") private productsUseCases: IProductsUseCasesPort) {}

    async consume(): Promise<any> {
        const topic = "shopping-create";

        await this.consumer.connect();
        await this.consumer.subscribe({ topic, fromBeginning: true });

        await this.consumer.run({
            eachMessage:async ({message}) => {
                const data: any = message.value?.toString() || null;
                const shopping = JSON.parse(data);
                this.productsUseCases.updateStock(shopping.details);
            }
        })
    }
}