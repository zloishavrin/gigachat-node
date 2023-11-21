import axios from 'axios';

class GigaChat {
    private apiKey: string;
    public url: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.url = 'https://gigachat.devices.sberbank.ru/api/v1';
    }

    private async get(path: string): Promise<any> {
        const responce = await axios.get(`${this.url}${path}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            }
        })
        return responce;
    }

    private async post(path: string, data: any): Promise<any> {
        const response = await axios.post(`${this.url}${path}`, data, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        });
        return response;
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
