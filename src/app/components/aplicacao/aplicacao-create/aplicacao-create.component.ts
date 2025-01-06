import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AplicacaoService } from './../../../services/aplicacao.service';

@Component({
  selector: 'app-aplicacao-create',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './aplicacao-create.component.html',
  styleUrls: ['./aplicacao-create.component.css'],
})
export class AplicacaoCreateComponent {
  constructor(
    private aplicacaoService: AplicacaoService,
    private router: Router
  ) {}

  aplicacao = {
    id: '',
    nomeAplicacao: '',
    repositorio: '',
    ic: '',
    bsResponsavelCodigo: 0
  };

  create(): void {
    this.aplicacaoService.create(this.aplicacao).subscribe(
      (resposta) => {
        console.log(this.aplicacao)
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}
