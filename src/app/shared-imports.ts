import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// PrimeNG Modules
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

// Components

import { MatDatepickerModule } from '@angular/material/datepicker';

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
  FormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

