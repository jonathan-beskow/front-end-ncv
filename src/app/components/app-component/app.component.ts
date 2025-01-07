import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared-imports';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SHARED_IMPORTS],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ngOnInit(): void {
    console.log('app component');
  }
}

