import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared-imports';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, RouterModule, SHARED_IMPORTS,
    MatIconModule
  ],

  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css'],
})
export class NavComponentComponent {
  isOpened: boolean = true;

  toggleSidenav() {
    this.isOpened = !this.isOpened;
    console.log('Menu lateral', this.isOpened ? 'aberto' : 'fechado');
  }

  ngOnInit(): void {
    console.log("nav bar");
  }

}
