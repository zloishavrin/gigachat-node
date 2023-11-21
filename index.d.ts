declare class GigaChat {
    private authorization;
    private apiKey;
    url: string;
    private scopeForPersonal;
    private scopeForCorporation;
    constructor(apiKey: string);
    private get;
    private post;
    createToken(isPersonal: boolean): Promise<any>;
    completion(data: any): Promise<any>;
    allModels(): Promise<any>;
    model(modelName: string): Promise<any>;
}
export default GigaChat;
