export default interface ConnectionOptions {
    jid: string;
    password?: string;
    transport: string;
    wsURL: string;
    sasl?: string;
}