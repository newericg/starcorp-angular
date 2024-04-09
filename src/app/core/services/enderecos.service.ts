import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiHttpService } from './api-http.service';
import { Observable, catchError, map} from 'rxjs';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { IEndereco } from '../interfaces/enderecos-response/endereco.interface';
import { IEnderecosResponse } from '../interfaces/enderecos-response/enderecos-response.interface';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
	constructor(
		private apiService: ApiHttpService,
		private toastComponent: ToastComponent
	) { }

	apiURL = "https://www.selida.com.br/avaliacaotecnica/api/Endereco";
	apiKey =  environment.apiKey;
	headers = new HttpHeaders({ 'Chave': this.apiKey });


	public getEnderecos(id: string): Observable<IEndereco[]> {
		return this.apiService.get(`${this.apiURL}/getAll/${id}`, this.headers).pipe(
			map((enderecosResponse: IEnderecosResponse) => {
				return enderecosResponse.data
			})
		)
	}

    public postEndereco(data: any) {
		return this.apiService.post(
			`${this.apiURL}`,
			{
                pessoaId: data.pessoaId,
                logradouro: data.logradouro,
                numero: data.numero,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf
			}
			, this.headers
		).subscribe({
			next: (data: any) => {
				this.toastComponent.toastService.show('Salvo!', `Endereço adicionado com sucesso!`, 'text-bg-success')
			},
			error: (err: any) => {
				this.toastComponent.toastService.show('Erro ao salvar!', `${err.error.errors[0]}`, 'text-bg-danger')
			}
		})
	}

	public deleteEndereco(id: string): Observable<unknown> {
		return this.apiService.delete(`${this.apiURL}/${id}`, this.headers).pipe(
			map((res) => {
				this.toastComponent.toastService.show('Deletado!', `Deletado com sucesso!`, 'text-bg-success')
			}),
			catchError(err => {
				this.toastComponent.toastService.show('Erro', `${err.error.errors[0]}`, 'text-bg-danger')
				throw 'error in source. Details: ' + err;
			})
		)
	}
}