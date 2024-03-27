export interface IMessage {
    role: "user" | "assistant" | "system" | "search_result";
    content: string;
    image?: string;
}
