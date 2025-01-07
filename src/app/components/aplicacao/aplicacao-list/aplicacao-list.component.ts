import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared-imports';
import { Aplicacao } from './../../../models/aplicacao';
import { AplicacaoService } from './../../../services/aplicacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplicacao-list',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS // Expande os módulos compartilhados
  ],
  templateUrl: './aplicacao-list.component.html',
  styleUrls: ['./aplicacao-list.component.css']
})
export class AplicacaoListComponent {
  ELEMENT_DATA: Aplicacao[] = [];

  constructor(
    private aplicacaoService: AplicacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    console.log('Chamando findAll()');
    this.aplicacaoService.findAll().subscribe({
      next: (resposta: Aplicacao[]) => {
        this.ELEMENT_DATA = resposta;
      },
      error: (erro) => {
        console.error('Erro ao carregar aplicações:', erro);
      },
    });
  }

  cadastrarAplicacao(): void {
    this.router.navigate(['/criar']); // Caminho configurado nas rotas
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
      case 'Implantada':
        return 'status-implantada';
      case 'Impedimento':
        return 'status-impedimento';
      default:
        return '';
    }
  }
}
