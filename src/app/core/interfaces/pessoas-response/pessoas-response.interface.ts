import { IBasePessoasResponse } from "../base-pessoas-response.interface";
import { IPessoa } from "./pessoa.interface";

export interface IPessoasResponse extends IBasePessoasResponse {
    data: IPessoa[]
}
