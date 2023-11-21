import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Agent } from 'https';

class GigaChat {

    private authorization: string;
    private clientSecretKey: string;

    private isIgnoreTSL: boolean;
    private isPersonal: boolean;

    private url: string = 'https://gigachat.devices.sberbank.ru/api/v1';
    private urlAuth: string = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
    private scopeForPersonal: string = 'GIGACHAT_API_PERS';
    private scopeForCorporation: string = 'GIGACHAT_API_CORP';

    constructor(clientSecretKey: string, isIgnoreTSL: boolean = true, isPersonal: boolean = true) {
        this.clientSecretKey = clientSecretKey;
        this.isIgnoreTSL = isIgnoreTSL;
        this.isPersonal = isPersonal;
        
        this.createToken();
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

    private async post(path: string, data: any): Promise<any> {
        const response = await axios.post(`${this.url}${path}`, data, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            },
            httpsAgent: new Agent({
                rejectUnauthorized: !this.isIgnoreTSL
            })
        });
        return response;
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
            console.error("GigaChat Error (create completion):\n", error);
            throw error;
        }
    }

    public async allModels(): Promise<any> {
        const path = '/models';
        try {
            const responce = await this.get(path);
            return responce.data;
        }
        catch(error) {
            console.error("GigaChat Error (get all models):\n", error);
            throw error;
        }
    }

    public async model(modelName: string): Promise<any> {
        const path = `/models/${modelName}`;
        try {
            const responce = await this.get(path);
            return responce.data;
        }
        catch(error) {
            console.error(`GigaChat Error (get model ${modelName}):\n`, error);
            throw error;
        }
    }
}

export default GigaChat;
