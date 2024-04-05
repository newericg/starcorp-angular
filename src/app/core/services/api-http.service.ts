// Angular Modules 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ApiHttpService {
	constructor(
		// Angular Modules 
		private http: HttpClient
	) { }

	apiURL = "https://www.selida.com.br/avaliacaotecnica/api/Pessoas";
	apiKey = '88918406-70BC-4E1D-A3B3-F8005C2F03FC';
	headers = new HttpHeaders({'Chave': this.apiKey});


	public get(url: string, options?: any) {
		//`${this.apiURL}/getAll`
		return this.http.get(url, {headers: options}).subscribe( res => console.log(res))
	}

	public post(url: string, data: any, options?: any) {
		return this.http.post(url, data, options);
	}

	public put(url: string, data: any, options?: any) {
		return this.http.put(url, data, options);
	}

	public delete(url: string, options?: any) {
		return this.http.delete(url, options);
	}
}