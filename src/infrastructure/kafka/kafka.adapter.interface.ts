export interface KafkaAdapterInterface {
    consume(): Promise<any>;
}