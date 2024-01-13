export interface KafkaAdapterInterface {
    consume(): Promise<any>;
    produce(data: string): Promise<any>;
}