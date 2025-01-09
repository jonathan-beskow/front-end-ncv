import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  downloadEstadoAtual(): void {
    this.http.get(`${API_CONFIG.baseUrl}/resources/estado-atual`, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Criação do link de download
        const a = document.createElement('a');
        a.href = url;
        a.download = `status_aplicacoes_${new Date().toISOString().split('T')[0]}.xlsx`;
        a.click();

        // Revogar URL para evitar vazamento de memória
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao baixar o arquivo:', err);
        alert('Erro ao baixar o arquivo. Tente novamente.');
      }
    });
  }

  downloadMetricasAplicações(): void {
    this.http.get(`${API_CONFIG.baseUrl}/resources/metricas`, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Criação do link de download
        const a = document.createElement('a');
        a.href = url;
        a.download = `estatisticas_aplicacoes_${new Date().toISOString().split('T')[0]}.xlsx`;
        a.click();

        // Revogar URL para evitar vazamento de memória
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao baixar o arquivo:', err);
        alert('Erro ao baixar o arquivo. Tente novamente.');
      }
    });
  }

}
