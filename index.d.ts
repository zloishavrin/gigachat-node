declare class GigaChat {
    authorization: string;
    private clientSecretKey;
    private isIgnoreTSL;
    private isPersonal;
    private autoRefreshToken;
    private url;
    private urlAuth;
    private scopeForPersonal;
    private scopeForCorporation;
    constructor(clientSecretKey: string, isIgnoreTSL?: boolean, isPersonal?: boolean, autoRefreshToken?: boolean);
    private get;
    private post;
    private handlingError;
    createToken(): Promise<any>;
    completion(data: any): Promise<any>;
    completionStream(data: any): Promise<any>;
    allModels(): Promise<any>;
    model(modelName: string): Promise<any>;
}
export default GigaChat;
