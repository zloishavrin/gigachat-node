declare class GigaChat {
    private apiKey;
    url: string;
    constructor(apiKey: string);
    private get;
    private post;
    completion(data: any): Promise<any>;
    allModels(): Promise<any>;
    model(modelName: string): Promise<any>;
}
export default GigaChat;
