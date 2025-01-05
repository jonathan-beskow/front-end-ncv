import { Routes } from '@angular/router';
import { AplicacaoViewComponent } from './components/aplicacao/aplicacao-view/aplicacao-view.component';
import { AppComponent } from './components/app-component/app.component';
import { NavComponentComponent } from './components/nav-component/nav-component.component';
import { AplicacaoListComponent } from './components/aplicacao/aplicacao-list/aplicacao-list.component';

export const routes: Routes = [
  {
    path: '', // Rota base
    component: NavComponentComponent, // Componente shell
    children: [
      { path: '', component: AppComponent }, // Página inicial
      { path: 'aplicacao/:id', component: AplicacaoViewComponent }, // Detalhes da aplicação
      { path: 'aplicacoes', component: AplicacaoListComponent }, // Listagem de aplicações
    ],
  },
];


