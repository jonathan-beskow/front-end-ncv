import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Aplicacao } from '../models/aplicacao';

@Injectable({
  providedIn: 'root',
})
export class AplicacaoService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Aplicacao> {
    return this.http.get<Aplicacao>(`${API_CONFIG.baseUrl}/${id}`);
    console.log(`${API_CONFIG.baseUrl}/${id}`);
  }

  findAll(): Observable<Aplicacao[]> {
    return this.http.get<Aplicacao[]>(`${API_CONFIG.baseUrl}`);
  }

  create(aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.http.post<Aplicacao>(`${API_CONFIG.baseUrl}/create`, aplicacao);
  }

  update(chamado: Aplicacao): Observable<Aplicacao> {
    return this.http.put<Aplicacao>(
      `${API_CONFIG.baseUrl}/${chamado.id}`,
      chamado
    );
  }

  horasDetalhadasPorDesenvolvedor(id: any): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/${id}/horas/detalhadas`);
  }

  horasTotaisDaAplicacao(id: any): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/${id}/horas/totais`);
  }

  findApontamentosPorTipo(id: number): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(
      `${API_CONFIG.baseUrl}/${id}/apontamentos/tipos`
    );
  }

  addHorasAplicacao(
    idAplicacao: number,
    lancamento: { desenvolvedor: string; horas: number; dataLancamento: string }
  ): Observable<any> {
    return this.http.post<any>(
      `${API_CONFIG.baseUrl}/${idAplicacao}/horas`,
      lancamento
    );
  }

  addApontamento(
    idAplicacao: number,
    apontamento: { id: number; quantidade: number }
  ): Observable<any> {
    console.log('Enviando apontamento:', { idAplicacao, apontamento });
    return this.http.post<any>(
      `${API_CONFIG.baseUrl}/${idAplicacao}/apontamentos`,
      apontamento
    );
  }


}
