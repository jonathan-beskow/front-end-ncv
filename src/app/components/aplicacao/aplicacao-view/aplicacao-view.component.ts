import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AplicacaoService } from '../../../services/aplicacao.service';
import { Aplicacao } from '../../../models/aplicacao';
import { CommonModule } from '@angular/common'; // Importa o CommonModule
import { SHARED_IMPORTS } from '../../../shared-imports';
@Component({
  selector: 'app-aplicacao-view',
  templateUrl: './aplicacao-view.component.html',
  styleUrls: ['./aplicacao-view.component.css'],
  standalone: true,
  imports: [SHARED_IMPORTS], // Adiciona o CommonModule aqui
})
export class AplicacaoViewComponent implements OnInit {
  aplicacao: Aplicacao | null = null; // Inicializa como null

  constructor(
    private route: ActivatedRoute,
    private aplicacaoService: AplicacaoService
  ) {}

  ngOnInit(): void {
    // Captura o ID da URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.aplicacaoService.findById(+id).subscribe({
        next: (resposta) => {
          this.aplicacao = resposta;
          console.log('Aplicação carregada:', this.aplicacao);
        },
        error: (erro) => {
          console.error('Erro ao carregar a aplicação:', erro);
        },
      });
    }
  }
}
