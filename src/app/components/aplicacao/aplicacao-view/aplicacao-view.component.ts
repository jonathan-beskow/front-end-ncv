import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacaoService } from '../../../services/aplicacao.service';
import { SHARED_IMPORTS } from '../../../shared-imports';
import { Aplicacao } from './../../../models/aplicacao';

@Component({
  selector: 'app-aplicacao-view',
  templateUrl: './aplicacao-view.component.html',
  styleUrls: ['./aplicacao-view.component.css'],
  standalone: true,
  imports: [SHARED_IMPORTS], // Adiciona o CommonModule aqui
})
export class AplicacaoViewComponent implements OnInit {
  aplicacao: Aplicacao = {
    id: "",
    nomeAplicacao: "",
    dataChegada: "",
    repositorio: "",
    ic: "",
    historicoDeMudanca: [],
    statusAplicacaoDescricao: "",
  };

  totalHoras: number | null = null;
  horasDetalhadas: any = [];

  constructor(
    private route: ActivatedRoute,
    private aplicacaoService: AplicacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.aplicacao.id = id;
      this.findById();
      this.loadHoras(id);
    }
  }

  // Método para buscar a aplicação pelo ID
  findById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.aplicacaoService.findById(id).subscribe(
        (resposta) => {
          this.aplicacao = resposta;
        },
        (error) => {
          console.error("Houve algum erro ao carregar a aplicação:", error);
        }
      );
    }
  }

  // Método para carregar horas totais e detalhadas
  loadHoras(id: any): void {
    this.aplicacaoService.horasTotaisDaAplicacao(id).subscribe(
      (resposta) => {
        this.totalHoras = resposta;
      },
      (error) => {
        console.error("Erro ao carregar total de horas:", error);
      }
    );

    this.aplicacaoService.horasDetalhadasPorDesenvolvedor(id).subscribe(
      (resposta) => {
        // Transformar o JSON para um formato iterável
        this.horasDetalhadas = Object.keys(resposta).map((desenvolvedor) => ({
          desenvolvedor,
          horas: Object.keys(resposta[desenvolvedor]).map((quantidade) => ({
            quantidade: +quantidade,
            dias: resposta[desenvolvedor][quantidade],
          })),
        }));
      },
      (error) => {
        console.error("Erro ao carregar horas detalhadas:", error);
      }
    );
  }

  // Método para calcular o total de horas
  getTotalHoras(horas: any[]): number {
    return horas.reduce((total, detalhe) => total + detalhe.quantidade, 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Em Desenvolvimento':
        return 'status-em-desenvolvimento';
      case 'Disponibilizada para testes':
        return 'status-disponibilizada-para-testes';
      case 'Em Homologação':
        return 'status-em-homologacao';
      case 'Em Implantação':
        return 'status-em-implantacao';
      case 'IMPLANTADA':
        return 'status-implantada';
      case 'IMPEDIMENTO':
        return 'status-impedimento';
      default:
        return '';
    }
  }
}
