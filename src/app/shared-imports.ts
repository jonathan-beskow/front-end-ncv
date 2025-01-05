import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NavComponentComponent } from './components/nav-component/nav-component.component';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './components/app-component/app.component';
export const SHARED_IMPORTS = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatTableModule,
  MatRadioModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  NavComponentComponent,
  RouterOutlet,
  AppComponent
];
