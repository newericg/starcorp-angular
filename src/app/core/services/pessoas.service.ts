import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiHttpService } from './api-http.service';
import { IPessoasResponse } from '../interfaces/pessoas-response/pessoas-response.interface';
import { Observable, catchError, map} from 'rxjs';
import { IPessoa } from '../interfaces/pessoas-response/pessoa.interface';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class PessoasService {
	constructor(
		private apiService: ApiHttpService,
		private toastComponent: ToastComponent
	) { }

	apiURL = "https://www.selida.com.br/avaliacaotecnica/api/Pessoas";
	apiKey = environment.apiKey;
	headers = new HttpHeaders({ 'Chave': this.apiKey });


	public getPessoas(): Observable<IPessoa[]> {
		return this.apiService.get(`${this.apiURL}/getAll`, this.headers).pipe(
			map((pessoasResponse: IPessoasResponse) => {
				return pessoasResponse.data
			})
		)
	}

	public getPessoa(id: string): Observable<IPessoa[]> {
		return this.apiService.get(`${this.apiURL}/${id}`, this.headers).pipe(
			map((pessoasResponse: IPessoasResponse) => {
				return pessoasResponse.data
			})
		)
	}

	public postPessoas(data: any, form: any) {
		return this.apiService.post(
			this.apiURL,
			{
				nome: data.nome,
				dataNascimento: data.dataNascimento,
				idade: data.idade,
				email: data.email,
				telefone: data.telefone,
				celular: data.celular
			}
			, this.headers
		).subscribe({
			next: (data: any) => {
				console.log(data)
				this.toastComponent.toastService.show('Salvo!', `Salvo com sucesso!`, 'text-bg-success')
				form.reset()
			},
			error: (err: any) => {
				console.log(err)
				this.toastComponent.toastService.show('Erro ao salvar!', `${err.error.errors[0]}`, 'text-bg-danger')
			}
		})
	}

	public putPessoa(data: any, id: string) {
		return this.apiService.put(
			`${this.apiURL}/${id}`,
			{
				nome: data.nome,
				dataNascimento: data.dataNascimento,
				idade: data.idade,
				email: data.email,
				telefone: data.telefone,
				celular: data.celular
			}
			, this.headers
		).subscribe({
			next: (data: any) => {
				console.log(data)
				this.toastComponent.toastService.show('Salvo!', `Salvo com sucesso!`, 'text-bg-success')
			},
			error: (err: any) => {
				console.log(err)
				this.toastComponent.toastService.show('Erro ao salvar!', `${err.error.errors[0]}`, 'text-bg-danger')
			}
		})
	}

	public deletePessoa(id: string): Observable<unknown> {
		return this.apiService.delete(`${this.apiURL}/${id}`, this.headers).pipe(
			map((res) => {
				console.log(res)
				this.toastComponent.toastService.show('Deletado!', `Deletado com sucesso!`, 'text-bg-success')
			}),
			catchError(err => {
				this.toastComponent.toastService.show('Erro', `Erro ao deletar`, 'text-bg-danger')
				throw 'error in source. Details: ' + err;
			})
		)
	}

}
