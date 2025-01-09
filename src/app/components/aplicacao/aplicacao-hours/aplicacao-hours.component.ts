
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared-imports';
import { AplicacaoService } from '../../../services/aplicacao.service';


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
    private aplicacaoService: AplicacaoService
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

  // cadastrar(): void {
  //   if (
  //     !this.novoLancamento.desenvolvedor ||
  //     this.novoLancamento.horas <= 0 ||
  //     !this.novoLancamento.dataLancamento
  //   ) {
  //     alert('Preencha todos os campos corretamente!');
  //     return;
  //   }

  //   if (!this.aplicacaoId) {
  //     alert('ID da aplicação não encontrado!');
  //     return;
  //   }

  //   // Objeto dos apontamentos com id e quantidade
  //   const apontamentosRequests = [
  //     { id: 1, quantidade: this.apontamentosForm.critico },
  //     { id: 2, quantidade: this.apontamentosForm.alto },
  //     { id: 3, quantidade: this.apontamentosForm.medio },
  //     { id: 4, quantidade: this.apontamentosForm.baixo },
  //   ];

  //   // Requisição para adicionar apontamentos
  //   apontamentosRequests.forEach((apontamento) => {
  //     if (apontamento.quantidade > 0) {
  //       this.aplicacaoService.addApontamento(this.aplicacaoId!, apontamento).subscribe(
  //         () => {
  //           console.log(`Apontamento com ID ${apontamento.id} cadastrado com sucesso!`);
  //         },
  //         (error: any) => {
  //           console.error(`Erro ao cadastrar apontamento com ID ${apontamento.id}:`, error);
  //         }
  //       );
  //     }
  //   });

  //   // Requisição para adicionar horas
  //   this.aplicacaoService.addHorasAplicacao(this.aplicacaoId, this.novoLancamento).subscribe(
  //     () => {
  //       alert('Horas cadastradas com sucesso!');
  //       this.loadHoras(this.aplicacaoId!);
  //       this.loadApontamentos(this.aplicacaoId!);
  //     },
  //     (error: any) => {
  //       console.error('Erro ao cadastrar horas:', error);
  //       alert('Erro ao cadastrar horas. Tente novamente.');
  //     }
  //   );
  // }

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

    console.log('Apontamentos a serem enviados:', apontamentosRequests);

    apontamentosRequests.forEach((apontamento) => {
      if (apontamento.quantidade > 0) {
        console.log('Enviando apontamento:', apontamento);
        this.aplicacaoService
          .addApontamento(this.aplicacaoId!, apontamento)
          .subscribe(
            () => {
              console.log(
                `Apontamento com ID ${apontamento.id} cadastrado com sucesso!`
              );
            },
            (error: any) => {
              console.error(
                `Erro ao cadastrar apontamento com ID ${apontamento.id}:`,
                error
              );
            }
          );
      }
    });
  }

}
