
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AplicacaoService } from '../../../services/aplicacao.service';
import { SHARED_IMPORTS } from '../../../shared-imports';


@Component({
  selector: 'app-aplicacao-hours',
  imports: [SHARED_IMPORTS],
  templateUrl: './aplicacao-hours.component.html',
  styleUrls: ['./aplicacao-hours.component.css'],
})
export class AplicacaoHoursComponent implements OnInit {
  aplicacao: any = null;
  aplicacaoId: number | null = null;
  totalHoras: number | null = null;
  apontamentos: { [key: string]: number } = {};

  apontamentosForm = {
    critico: 0,
    alto: 0,
    medio: 0,
    baixo: 0,
  };

  desenvolvedores: string[] = ['Jonathan', 'Felipe', 'Glauber', 'Fernando', 'Ana'];

  novoLancamento = {
    desenvolvedor: '',
    horas: 0,
    dataLancamento: '',
  };

  constructor(
    private route: ActivatedRoute,
    private aplicacaoService: AplicacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.aplicacaoId = +id;
      this.loadAplicacao();
      if (this.aplicacaoId !== null) {
        this.loadHoras(this.aplicacaoId);
        this.loadApontamentos(this.aplicacaoId);
      }
    }
  }

  loadAplicacao(): void {
    if (this.aplicacaoId !== null) {
      this.aplicacaoService.findById(this.aplicacaoId).subscribe(
        (resposta) => {
          this.aplicacao = resposta;
        },
        (error: any) => {
          console.error('Erro ao carregar aplicação:', error);
        }
      );
    }
  }

  loadHoras(id: number): void {
    this.aplicacaoService.horasTotaisDaAplicacao(id).subscribe(
      (resposta) => {
        this.totalHoras = resposta;
      },
      (error: any) => {
        console.error('Erro ao carregar total de horas:', error);
      }
    );
  }

  loadApontamentos(id: number): void {
    this.aplicacaoService.findApontamentosPorTipo(id).subscribe(
      (resposta) => {
        this.apontamentos = resposta;
      },
      (error: any) => {
        console.error('Erro ao carregar apontamentos:', error);
      }
    );
  }

  getApontamentosKeys(): string[] {
    return this.apontamentos ? Object.keys(this.apontamentos) : [];
  }

  cadastrar(): void {
    if (!this.aplicacaoId) {
      alert('ID da aplicação não encontrado!');
      return;
    }

    const apontamentosRequests = [
      { id: 1, quantidade: this.apontamentosForm.critico },
      { id: 2, quantidade: this.apontamentosForm.alto },
      { id: 3, quantidade: this.apontamentosForm.medio },
      { id: 4, quantidade: this.apontamentosForm.baixo },
    ];

    let pendingRequests = 0;

    // Enviar apontamentos
    apontamentosRequests.forEach((apontamento) => {
      if (apontamento.quantidade > 0) {
        pendingRequests++;
        this.aplicacaoService.addApontamento(this.aplicacaoId!, apontamento).subscribe(
          () => {
            pendingRequests--;
            this.checkAndReload(pendingRequests);
          },
          (error: any) => {
            console.error(`Erro ao cadastrar apontamento com ID ${apontamento.id}:`, error);
            pendingRequests--;
            this.checkAndReload(pendingRequests);
          }
        );
      }
    });

    // Enviar lançamento de horas
    if (
      this.novoLancamento.desenvolvedor &&
      this.novoLancamento.dataLancamento &&
      this.novoLancamento.horas > 0
    ) {
      const formattedDate = new Date(this.novoLancamento.dataLancamento).toISOString().split('T')[0];
      const lancamento = {
        ...this.novoLancamento,
        dataLancamento: formattedDate,
      };

      pendingRequests++;
      this.aplicacaoService.addHorasAplicacao(this.aplicacaoId!, lancamento).subscribe(
        () => {
          pendingRequests--;
          this.checkAndReload(pendingRequests);
        },
        (error: any) => {
          console.error('Erro ao cadastrar lançamento de horas:', error);
          pendingRequests--;
          this.checkAndReload(pendingRequests);
        }
      );
    } else {
      console.warn('Lançamento de horas não preenchido corretamente.');
    }

    this.checkAndReload(pendingRequests);
  }


  checkAndReload(pendingRequests: number): void {
    if (pendingRequests === 0) {
      this.router.navigate([this.router.url]).then(() => {
        console.log('Página recarregada com sucesso!');
      });
    }
  }




}
