"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const uuid_1 = require("uuid");
const https_1 = require("https");
class GigaChat {
    constructor(clientSecretKey, isIgnoreTSL = true, isPersonal = true) {
        this.url = 'https://gigachat.devices.sberbank.ru/api/v1';
        this.urlAuth = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
        this.scopeForPersonal = 'GIGACHAT_API_PERS';
        this.scopeForCorporation = 'GIGACHAT_API_CORP';
        this.clientSecretKey = clientSecretKey;
        this.isIgnoreTSL = isIgnoreTSL;
        this.isPersonal = isPersonal;
        this.createToken();
    }
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const responce = yield axios_1.default.get(`${this.url}${path}`, {
                headers: {
                    Authorization: `Bearer ${this.authorization}`,
                },
                httpsAgent: new https_1.Agent({
                    rejectUnauthorized: !this.isIgnoreTSL
                })
            });
            return responce;
        });
    }
    post(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(`${this.url}${path}`, data, {
                headers: {
                    Authorization: `Bearer ${this.authorization}`,
                },
                httpsAgent: new https_1.Agent({
                    rejectUnauthorized: !this.isIgnoreTSL
                })
            });
            return response;
        });
    }
    createToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUID = (0, uuid_1.v4)();
                const data = new URLSearchParams();
                if (this.isPersonal) {
                    data.append('scope', this.scopeForPersonal);
                }
                else {
                    data.append('scope', this.scopeForCorporation);
                }
                const responce = yield axios_1.default.post(this.urlAuth, data, {
                    headers: {
                        'Authorization': `Bearer ${this.clientSecretKey}`,
                        'RqUID': requestUID,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    httpsAgent: new https_1.Agent({
                        rejectUnauthorized: !this.isIgnoreTSL
                    })
                });
                this.authorization = responce.data.access_token;
                return responce.data;
            }
            catch (error) {
                console.error('GigaChat Error (create authorization token):\n', error);
                throw error;
            }
        });
    }
    completion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = '/chat/completions';
            try {
                const response = yield this.post(path, data);
                return response.data;
            }
            catch (error) {
                console.error("GigaChat Error (create completion):\n", error);
                throw error;
            }
        });
    }
    allModels() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = '/models';
            try {
                const responce = yield this.get(path);
                return responce.data;
            }
            catch (error) {
                console.error("GigaChat Error (get all models):\n", error);
                throw error;
            }
        });
    }
    model(modelName) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = `/models/${modelName}`;
            try {
                const responce = yield this.get(path);
                return responce.data;
            }
            catch (error) {
                console.error(`GigaChat Error (get model ${modelName}):\n`, error);
                throw error;
            }
        });
    }
}
exports.default = GigaChat;
