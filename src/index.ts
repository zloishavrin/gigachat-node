import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class GigaChat {

    private authorization: string;
    private apiKey: string;
    public url: string = 'https://gigachat.devices.sberbank.ru/api/v1';

    private scopeForPersonal: string = 'GIGACHAT_API_PERS';
    private scopeForCorporation: string = 'GIGACHAT_API_CORP';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    private async get(path: string): Promise<any> {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const responce = await axios.get(`${this.url}${path}`, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            }
        })
        return responce;
    }

    private async post(path: string, data: any): Promise<any> {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const response = await axios.post(`${this.url}${path}`, data, {
            headers: {
                Authorization: `Bearer ${this.authorization}`,
            },
        });
        return response;
    }

    public async createToken(isPersonal: boolean): Promise<any> {
        try {
            const requestUID = uuidv4();
            const data = new URLSearchParams();
            
            if(isPersonal) {
                data.append('scope', this.scopeForPersonal);
            }
            else {
                data.append('scope', this.scopeForCorporation);
            }
            
            const responce = await axios.post('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', data, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'RqUID': requestUID,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
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
