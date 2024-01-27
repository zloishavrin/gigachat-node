export interface IEmbeddingResponse {
    object: string;
    model: string;
    data: IEmbedding[];
}

interface IEmbedding {
    object: string;
    embedding: number[];
    index: number;
}