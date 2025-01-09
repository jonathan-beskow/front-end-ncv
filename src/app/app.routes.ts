import { Routes } from '@angular/router';
import { AplicacaoCreateComponent } from './components/aplicacao/aplicacao-create/aplicacao-create.component';
import { AplicacaoHoursComponent } from './components/aplicacao/aplicacao-hours/aplicacao-hours.component';
import { AplicacaoListComponent } from './components/aplicacao/aplicacao-list/aplicacao-list.component';
import { AplicacaoUpdateComponent } from './components/aplicacao/aplicacao-update/aplicacao-update.component';
import { AplicacaoViewComponent } from './components/aplicacao/aplicacao-view/aplicacao-view.component';
import { NavComponentComponent } from './components/nav-component/nav-component.component';
import { RecursosComponent } from './components/recursos/recursos.component';

export const routes: Routes = [
  {
    path: '', // Rota base
    component: NavComponentComponent, // Componente shell
    children: [
      // Página inicial
      { path: 'aplicacoes', component: AplicacaoListComponent }, // Listagem de aplicações
      { path: 'aplicacoes/:id', component: AplicacaoViewComponent }, // Detalhes da aplicação
      { path: 'criar', component: AplicacaoCreateComponent },
      { path: 'atualizar/:id', component: AplicacaoUpdateComponent },
      { path: 'recursos', component: RecursosComponent },
      { path: 'horas-detalhadas/:id', component: AplicacaoHoursComponent },
    ],
  },
];
