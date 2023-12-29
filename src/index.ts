import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Agent } from 'https';

class GigaChat {

    public authorization: string;
    private clientSecretKey: string;
    private isIgnoreTSL: boolean;
    private isPersonal: boolean;
    private autoRefreshToken: boolean;

    private url: string = 'https://gigachat.devices.sberbank.ru/api/v1';
    private urlAuth: string = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
    private scopeForPersonal: string = 'GIGACHAT_API_PERS';
    private scopeForCorporation: string = 'GIGACHAT_API_CORP';

    constructor(clientSecretKey: string, isIgnoreTSL: boolean = true, isPersonal: boolean = true, autoRefreshToken: boolean = true) {
        this.clientSecretKey = clientSecretKey;
        this.isIgnoreTSL = isIgnoreTSL;
        this.isPersonal = isPersonal;
        this.autoRefreshToken = autoRefreshToken;
    }

    private async get(path: string): Promise<any> {
        const responce = await axios.get(`${this.url}${path}`, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            },
            httpsAgent: new Agent({
                rejectUnauthorized: !this.isIgnoreTSL
            })
        })
        return responce;
    }

    private async post(path: string, data: any, stream: boolean = false): Promise<any> {
        const response = await axios.post(`${this.url}${path}`, data, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            },
            httpsAgent: new Agent({
                rejectUnauthorized: !this.isIgnoreTSL
            }),
            responseType: stream ? 'stream' : 'json'
        });
        return response;
    }

    private async handlingError(error: any, currentFunction: any): Promise<any> {
        if(this.autoRefreshToken && error.response.data.message === 'Token has expired'){
            try {
                await this.createToken();
                const responce = await currentFunction();
                return responce.data;
            }
            catch(error) {
                console.error("GigaChat Error (create completion):\n", error);
                throw error;
            }
        }
        else {
            console.error("GigaChat Error (create completion):\n", error);
            throw error;
        }
    }

    public async createToken(): Promise<any> {
        try {
            const requestUID = uuidv4();
            const data = new URLSearchParams();
            
            if(this.isPersonal) {
                data.append('scope', this.scopeForPersonal);
            }
            else {
                data.append('scope', this.scopeForCorporation);
            }

            const responce = await axios.post(this.urlAuth, data, {
                headers: {
                    'Authorization': `Bearer ${this.clientSecretKey}`,
                    'RqUID': requestUID,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                httpsAgent: new Agent({
                    rejectUnauthorized: !this.isIgnoreTSL
                })
            })
            this.authorization = responce.data.access_token;
            return responce.data;
        }
        catch(error) {
            console.error('GigaChat Error (create authorization token):\n', error);
            throw error;
        }
    }

    public async completion(data: any): Promise<any> {
        const path = '/chat/completions';
        try {
            const response = await this.post(path, data);
            return response.data;
        } 
        catch(error) {
            return await this.handlingError(error, async () => {
                return await this.post(path, data);
            })
        }
    }

    public async completionStream(data: any): Promise<any> {
        const path = '/chat/completions';
        try {
            const response = await this.post(path, data, true);
            return response.data;
        } 
        catch(error) {
            return await this.handlingError(error, async () => {
                return await this.post(path, data, true);
            })
        }
    }

    public async allModels(): Promise<any> {
        const path = '/models';
        try {
            const responce = await this.get(path);
            return responce.data;
        }
        catch(error) {
            return await this.handlingError(error, async () => {
                return await this.get(path);
            })
        }
    }

    public async model(modelName: string): Promise<any> {
        const path = `/models/${modelName}`;
        try {
            const responce = await this.get(path);
            return responce.data;
        }
        catch(error) {
            return await this.handlingError(error, async () => {
                return await this.get(path);
            })
        }
    }
}

export default GigaChat;
