export interface IMessage {
    role: "user" | "assistant" | "system";
    content: string;
    image?: string;
}
