import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared-imports';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-recursos',
  imports: [SHARED_IMPORTS],
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'] // Corrigir para o plural
})
export class RecursosComponent {

  constructor(private resource: ResourceService) { }

  ngOnInit(): void {}

  downloadExcel(): void {
    this.resource.downloadEstadoAtual();
  }

  downloadMetrics(): void {
    this.resource.downloadMetricasAplicações();
  }
}
