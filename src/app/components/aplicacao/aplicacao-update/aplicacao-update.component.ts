import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule,
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

  statusOpcoes = [
    { value: 0, label: 'Em Desenvolvimento' },
    { value: 1, label: 'Disponibilizada para testes' },
    { value: 2, label: 'Em Homologação' },
    { value: 3, label: 'Em Implantação' },
    { value: 4, label: 'Implantada' },
    { value: 5, label: 'Impedimento' },
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
    }
  }

  findById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.aplicacaoService.findById(id).subscribe(
        (resposta) => {
          this.aplicacao = resposta;

          // Define o status como numérico (caso venha como texto do backend)
          const statusEncontrado = this.statusOpcoes.find(
            (status) => status.label === resposta.statusAplicacaoDescricao
          );
          if (statusEncontrado) {
            this.aplicacao.statusAplicacaoCodigo = statusEncontrado.value;
          }
        },
        (error) => {
          console.error('Houve algum erro ao carregar a aplicação:', error);
        }
      );
    }
  }


  update(): void {
    this.aplicacaoService.update(this.aplicacao).subscribe(
      (resposta) => {
        console.log('Aplicação atualizada com sucesso:', resposta);
        const id = this.route.snapshot.paramMap.get('id');
        this.router.navigate(['/aplicacoes/', id]);
      },
      (ex) => {
        console.error('Erro ao atualizar aplicação:', ex);
      }
    );
  }

}
