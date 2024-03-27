import { IMessage } from "./message";
export interface ICompletionRequest {
    model: string;
    messages: IMessage[];
    temperature?: number;
    top_p?: number;
    n?: number;
    max_tokens?: number;
    repetition_penalty?: number;
    update_interval?: number;
    profanity_check?: boolean;
}
export interface ICompletionResponse {
    created: number;
    model: string;
    object: string;
    usage: ICompletionUsage;
    choices: ICompletionChoice[];
}
interface ICompletionUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
interface ICompletionChoice {
    index: number;
    finish_reason: string;
    message: IMessage;
}
export {};
