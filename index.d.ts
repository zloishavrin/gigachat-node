/// <reference types="node" />
import { Readable } from "stream";
type StreamResponse = Readable;
import { ICompletionRequest, ICompletionResponse } from "./interfaces/completion";
import { IAllModelResponse, IModelResponse } from "./interfaces/model";
import { ITokenResponse } from "./interfaces/token";
import { IEmbeddingResponse } from "./interfaces/embedding";
import { ISummarizeResponse } from "./interfaces/summarize";
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
    createToken(): Promise<ITokenResponse>;
    completion(data: ICompletionRequest): Promise<ICompletionResponse>;
    completionStream(data: ICompletionRequest): Promise<StreamResponse>;
    allModels(): Promise<IAllModelResponse>;
    model(modelName: string): Promise<IModelResponse>;
    embedding(input: string[]): Promise<IEmbeddingResponse>;
    summarize(model: string, input: string[]): Promise<ISummarizeResponse[]>;
}
export { GigaChat };
