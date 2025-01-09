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
  imports: [SHARED_IMPORTS],
})
export class AplicacaoViewComponent implements OnInit {
  aplicacao: Aplicacao = {
    id: '',
    nomeAplicacao: '',
    dataChegada: '',
    repositorio: '',
    ic: '',
    historicoDeMudanca: [],
    statusAplicacaoDescricao: '',
  };

  totalHoras: number | null = null;
  horasDetalhadas: any = [];
  desenvolvedores: string[] = ['Jonathan', 'Felipe', 'Glauber', 'Fernando', 'Ana', 'Anderson', 'Deise', 'Glauber A.', 'Wesley'];

  novoLancamento = {
    desenvolvedor: '',
    horas: 0,
    dataLancamento: '',
  };

  statusOpcoes = [
    { value: 0, label: 'Em Desenvolvimento' },
    { value: 1, label: 'Disponibilizada para Testes' },
    { value: 2, label: 'Em Homologação' },
    { value: 3, label: 'Em Implantação' },
    { value: 4, label: 'Implantada' },
    { value: 5, label: 'Impedimento' },
  ];

  responsavelOpcoes = [
    { value: 0, label: 'Alex' },
    { value: 1, label: 'Camila' },
    { value: 2, label: 'Leila' },
    { value: 3, label: 'Ricardo' },
  ];

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

  horasDetalhadasNavegar(): void {
    console.log('Navegar para horas detalhadas');
    this.router.navigate(['/horas-detalhadas', this.aplicacao.id]);
  }

  // Método para buscar a aplicação pelo ID
  findById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.aplicacaoService.findById(id).subscribe(
        (resposta) => {
          this.aplicacao = resposta;

          // Mapear status
          const statusEncontrado = this.statusOpcoes.find(
            (status) => status.label === resposta.statusAplicacaoDescricao
          );
          if (statusEncontrado) {
            this.aplicacao.statusAplicacaoDescricao = statusEncontrado.label;
          }

          // Mapear responsável
          const responsavelEncontrado = this.responsavelOpcoes.find(
            (responsavel) => responsavel.value === resposta.bsResponsavelCodigo
          );
          if (responsavelEncontrado) {
            this.aplicacao.bsResponsavelNome = responsavelEncontrado.label;
          }
        },
        (error) => {
          console.error('Houve algum erro ao carregar a aplicação:', error);
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
        console.error('Erro ao carregar total de horas:', error);
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
        console.error('Erro ao carregar horas detalhadas:', error);
      }
    );
  }

  // Método para calcular o total de horas
  getTotalHoras(horas: any[]): number {
    return horas.reduce((total, detalhe) => total + detalhe.quantidade, 0);
  }

  // Método para cadastrar horas
  cadastrarHoras(): void {
    if (!this.novoLancamento.desenvolvedor || this.novoLancamento.horas <= 0 || !this.novoLancamento.dataLancamento) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const id = this.aplicacao.id;
    this.aplicacaoService.addHorasAplicacao(Number(id), this.novoLancamento).subscribe(
      () => {
        alert('Horas cadastradas com sucesso!');
        this.loadHoras(id); // Atualiza a lista de horas após o cadastro
      },
      (error) => {
        console.error('Erro ao cadastrar horas:', error);
        alert('Erro ao cadastrar horas. Tente novamente.');
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'em desenvolvimento':
        return 'status-em-desenvolvimento';
      case 'disponibilizada para testes':
        return 'status-disponibilizada-para-testes';
      case 'em homologação':
        return 'status-em-homologacao';
      case 'em implantação':
        return 'status-em-implantacao';
      case 'implantada':
        return 'status-implantada';
      case 'impedimento':
        return 'status-impedimento';
      default:
        return 'status-default'; // Classe padrão caso o status não seja reconhecido
    }
  }
}
