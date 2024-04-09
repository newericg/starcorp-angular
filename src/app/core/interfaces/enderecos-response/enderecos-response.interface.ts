import { IBaseEnderecosResponse } from "../base-enderecos-response.interface";
import { IEndereco } from "./endereco.interface";

export interface IEnderecosResponse extends IBaseEnderecosResponse {
    data: IEndereco[]
}