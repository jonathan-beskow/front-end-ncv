import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aplicacao } from '../models/aplicacao';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AplicacaoService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}


  findById(id: any): Observable<Aplicacao> {
    return this.http.get<Aplicacao>(`${API_CONFIG.baseUrl}/${id}`);
    console.log(`${API_CONFIG.baseUrl}/${id}`);
  }

  findAll(): Observable<Aplicacao[]> {
    return this.http.get<Aplicacao[]>(`${API_CONFIG.baseUrl}`);
  }

  create(aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.http.post<Aplicacao>(`${API_CONFIG.baseUrl}/create`, aplicacao)
  }

  update(chamado: Aplicacao): Observable<Aplicacao> {
    return this.http.put<Aplicacao>(`${API_CONFIG.baseUrl}/${chamado.id}`, chamado);
  }

}
