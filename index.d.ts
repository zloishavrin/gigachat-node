declare class GigaChat {
    private authorization;
    private clientSecretKey;
    private isIgnoreTSL;
    private isPersonal;
    private url;
    private urlAuth;
    private scopeForPersonal;
    private scopeForCorporation;
    constructor(clientSecretKey: string, isIgnoreTSL?: boolean, isPersonal?: boolean);
    private get;
    private post;
    createToken(): Promise<any>;
    completion(data: any): Promise<any>;
    allModels(): Promise<any>;
    model(modelName: string): Promise<any>;
}
export default GigaChat;
