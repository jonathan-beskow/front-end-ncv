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
    historicoDeMudanca: [], // Atualize para refletir corretamente os objetos recebidos
    statusAplicacaoDescricao: "",
  };

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
    }
  }

  editar(): void {
    this.router.navigate(['atualizar/:id']); // Caminho configurado nas rotas
  }

  // Método para buscar a aplicação pelo ID
  findById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Converta para número
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
