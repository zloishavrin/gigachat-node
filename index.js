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
class GigaChat {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.url = 'https://gigachat.devices.sberbank.ru/api/v1';
    }
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
            const responce = yield axios_1.default.get(`${this.url}${path}`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                }
            });
            return responce;
        });
    }
    post(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
            const response = yield axios_1.default.post(`${this.url}${path}`, data, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
            });
            return response;
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
