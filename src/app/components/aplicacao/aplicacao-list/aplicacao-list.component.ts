import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared-imports';
import { Aplicacao } from './../../../models/aplicacao';
import { AplicacaoService } from './../../../services/aplicacao.service';
@Component({
  selector: 'app-aplicacao-list',
  imports: [SHARED_IMPORTS],
  templateUrl: './aplicacao-list.component.html',
  styleUrl: './aplicacao-list.component.css'
})
export class AplicacaoListComponent {

  ELEMENT_DATA: Aplicacao[] = []

  constructor (private aplicacaoService: AplicacaoService,

  ) {}
  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    console.log('Chamando findAll()');
    this.aplicacaoService.findAll().subscribe({
      next: (resposta: Aplicacao[]) => {
        this.ELEMENT_DATA = resposta
      },
      error: (erro) => {
        console.error('Erro ao carregar aplicações:', erro);
      },
    });
  }

}
