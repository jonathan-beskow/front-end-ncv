import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Aplicacao } from '../../../models/aplicacao';
import { AplicacaoService } from '../../../services/aplicacao.service';

@Component({
  selector: 'app-aplicacao-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './aplicacao-update.component.html',
  styleUrls: ['./aplicacao-update.component.css'],
})
export class AplicacaoUpdateComponent implements OnInit {
  aplicacao: Aplicacao = {
    id: '',
    nomeAplicacao: '',
    dataChegada: '',
    repositorio: '',
    ic: '',
    historicoDeMudanca: [],
    statusAplicacaoDescricao: '',
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

  findById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.aplicacaoService.findById(id).subscribe(
        (resposta) => {
          this.aplicacao = resposta;
          this.router.navigate(['/aplicacoes']);
        },
        (error) => {
          console.error('Houve algum erro ao carregar a aplicação:', error);
        }
      );
    }
  }

  update(): void {
    this.aplicacaoService.update(this.aplicacao).subscribe(
      resposta => {
        this.aplicacao = resposta;
        console.log(resposta);
      },
      (ex) => {
        console.error('Erro ao atualizar aplicação:', ex);
      }
    );
  }
}
