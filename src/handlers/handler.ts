export default interface Handler {
    name: string;
    handler: Function
    emits?: string;
    info?: string;
}