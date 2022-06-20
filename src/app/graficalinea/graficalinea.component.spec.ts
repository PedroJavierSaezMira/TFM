import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficalineaComponent } from './graficalinea.component';

describe('GraficalineaComponent', () => {
  let component: GraficalineaComponent;
  let fixture: ComponentFixture<GraficalineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficalineaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficalineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
