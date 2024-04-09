import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ApiHttpService {
	constructor(
		private http: HttpClient
	) { }

	public get(url: string, options?: any) {
		//`${this.apiURL}/getAll`
		return this.http.get<any>(url, {headers: options})
	}

	public post(url: string, data: any, options?: any) {
		return this.http.post<any>(url, data, {headers: options});
	}

	public put(url: string, data: any, options?: any) {
		return this.http.put(url, data, {headers: options});
	}

	public delete(url: string, options?: any) {
		return this.http.delete(url, {headers: options});
	}
}