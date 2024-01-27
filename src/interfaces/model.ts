export interface IModelResponse {
    id: string;
    object: string;
    owned_by: string;
}

export interface IAllModelResponse {
    object: string,
    data: IModelResponse[]
}