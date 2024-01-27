import axios, { AxiosError, AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import { Agent } from "https";
import * as fs from "fs";
import { Readable } from "stream";
type StreamResponse = Readable;
// Interfaces
import { 
    ICompletionRequest, 
    ICompletionResponse } from "./interfaces/completion";
import { 
    IAllModelResponse, 
    IModelResponse } from "./interfaces/model";
import { ITokenResponse } from "./interfaces/token";
import { IEmbeddingResponse } from "./interfaces/embedding";
import { ISummarizeResponse } from "./interfaces/summarize";

class GigaChat {

    public authorization: string | undefined;

    private clientSecretKey: string;
    private isIgnoreTSL: boolean;
    private isPersonal: boolean;
    private autoRefreshToken: boolean;
    private imgOn: boolean;
    private imgPath: string;

    private url: string = "https://gigachat.devices.sberbank.ru/api/v1";
    private urlAuth: string = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
    private scopeForPersonal: string = "GIGACHAT_API_PERS";
    private scopeForCorporation: string = "GIGACHAT_API_CORP";

    constructor(clientSecretKey: string,
        isIgnoreTSL: boolean = true,
        isPersonal: boolean = true,
        autoRefreshToken: boolean = true,
        imgOn: boolean = true,
        imgPath: string = ".") {
        this.clientSecretKey = clientSecretKey;
        this.isIgnoreTSL = isIgnoreTSL;
        this.isPersonal = isPersonal;
        this.autoRefreshToken = autoRefreshToken;
        this.imgOn = imgOn,
        this.imgPath = imgPath
    }

    private async get(path: string): Promise<AxiosResponse<any>> {
        const responce = await axios.get(`${this.url}${path}`, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            },
            httpsAgent: new Agent({
                rejectUnauthorized: !this.isIgnoreTSL
            })
        });
        return responce;
    }

    private async post(path: string, data: object, stream: boolean = false): Promise<AxiosResponse<any>> {
        const response = await axios.post(`${this.url}${path}`, data, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            },
            httpsAgent: new Agent({
                rejectUnauthorized: !this.isIgnoreTSL
            }),
            responseType: stream ? "stream" : "json"
        });
        return response;
    }

    private async getImage(imageId: string): Promise <AxiosResponse<any>> {
        const responce = await axios.get(`${this.url}/files/${imageId}/content`, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
                Accept: "application/jpg"
            },
            httpsAgent: new Agent({
                rejectUnauthorized: !this.isIgnoreTSL
            }),
            responseType: "stream"
        });
        return responce;
    }

    private extractImageSource(completionContent: string): string | null {
        const imgTagRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
        const match = completionContent.match(imgTagRegex);
        if (match) {
            return match[1];
        } 
        else {
            return null;
        }
    }

    private async handlingError(error: any, 
        currentFunction: any): Promise<any> {
        if(this.autoRefreshToken && error.response.data.message === "Token has expired"){
            try {
                await this.createToken();
                const responce = await currentFunction();
                return responce.data;
            }
            catch(error) {
                throw new Error(`GigaChat Error (create completion):\n${error}`);
            }
        }
        else {
            throw new Error(error);
        }
    }

    public async createToken(): Promise<ITokenResponse> {
        try {
            const requestUID = uuidv4();
            const data = new URLSearchParams();
            
            if(this.isPersonal) {
                data.append("scope", this.scopeForPersonal);
            }
            else {
                data.append("scope", this.scopeForCorporation);
            }

            const responce = await axios.post(this.urlAuth, data, {
                headers: {
                    "Authorization": `Bearer ${this.clientSecretKey}`,
                    "RqUID": requestUID,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                httpsAgent: new Agent({
                    rejectUnauthorized: !this.isIgnoreTSL
                }),
                maxRedirects: 5
            })
            this.authorization = responce.data.access_token;
            return responce.data;
        }
        catch(error) {
            throw new Error(`GigaChat Error (create authorization token):\n${error}`);
        }
    }

    public async completion(data: ICompletionRequest): Promise<ICompletionResponse> {
        const path = "/chat/completions";
        try {
            const response = await this.post(path, data);
            const completionContent = response.data.choices[0].message.content;
            if (this.imgOn) {
                const imageId = this.extractImageSource(completionContent);
                if (imageId) {
                    try {
                        const imagePath = `${this.imgPath}/${uuidv4()}.jpg`;
                        const imageStream = fs.createWriteStream(imagePath);
                        const transformStream = new Readable();
                        transformStream._read = () => {};
      
                        const imageResponse = await this.getImage(imageId);
      
                        await new Promise<void>((resolve, reject) => {
                            imageResponse.data.on("data", (chunk: any) => transformStream.push(chunk));
                            imageResponse.data.on("end", () => {
                                transformStream.push(null);
                                transformStream.pipe(imageStream);
                                transformStream.on("end", () => {
                                    imageStream.end();
                                    imageStream.on("finish", () => {
                                        response.data.choices[0].message["image"] = imagePath;
                                        resolve();
                                    });
                                });
                            });
                            imageResponse.data.on("error", reject);
                        });
      
                        return response.data;
                    } 
                    catch (error) {
                        throw new Error(`Ошибка при сохранении файла: ${error}`);
                    }
                } 
                else {
                    return response.data;
                }
            } 
            else {
                return response.data;
            }
        } 
        catch (error) {
            return await this.handlingError(error as AxiosError, async () => {
                return await this.post(path, data);
            });
        }
    }      

    public async completionStream(data: ICompletionRequest): Promise<StreamResponse> {
        const path = "/chat/completions";
        const streamData = { ...data, stream: true };
        try {
            const response = await this.post(path, streamData, true);
            return response.data;
        } 
        catch(error) {
            return await this.handlingError(error as AxiosError, async () => {
                return await this.post(path, streamData, true);
            });
        }
    }

    public async allModels(): Promise<IAllModelResponse> {
        const path = "/models";
        try {
            const responce = await this.get(path);
            return responce.data;
        }
        catch(error) {
            return await this.handlingError(error as AxiosError, async () => {
                return await this.get(path);
            });
        }
    }

    public async model(modelName: string): Promise<IModelResponse> {
        const path = `/models/${modelName}`;
        try {
            const responce = await this.get(path);
            return responce.data;
        }
        catch(error) {
            return await this.handlingError(error as AxiosError, async () => {
                return await this.get(path);
            });
        }
    }

    public async embedding(input: string[]): Promise<IEmbeddingResponse> {
        const path = "/embeddings";
        try {
            const responce = await this.post(path, { input: input });
            return responce.data;
        }
        catch(error) {
            return await this.handlingError(error as AxiosError, async () => {
                return await this.post(path, { input: input });
            });
        }
    }

    public async summarize(model: string, input: string[]): Promise<ISummarizeResponse[]> {
        const path = "/tokens/count";
        try {
            const responce = await this.post(path, { model, input });
            return responce.data;
        }
        catch(error) {
            return await this.handlingError(error as AxiosError, async () => {
                return await this.post(path, { model, input });
            });
        }
    }
}

export { GigaChat };
