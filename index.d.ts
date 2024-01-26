declare class GigaChat {
    authorization: string | undefined;
    private clientSecretKey;
    private isIgnoreTSL;
    private isPersonal;
    private autoRefreshToken;
    private imgOn;
    private imgPath;
    private url;
    private urlAuth;
    private scopeForPersonal;
    private scopeForCorporation;
    constructor(clientSecretKey: string, isIgnoreTSL?: boolean, isPersonal?: boolean, autoRefreshToken?: boolean, imgOn?: boolean, imgPath?: string);
    private get;
    private post;
    private getImage;
    private extractImageSource;
    private handlingError;
    createToken(): Promise<any>;
    completion(data: any): Promise<any>;
    completionStream(data: any): Promise<any>;
    allModels(): Promise<any>;
    model(modelName: string): Promise<any>;
}
export default GigaChat;
