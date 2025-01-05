import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacaoViewComponent } from './aplicacao-view.component';

describe('AplicacaoViewComponent', () => {
  let component: AplicacaoViewComponent;
  let fixture: ComponentFixture<AplicacaoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicacaoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicacaoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
