import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigMapComponent } from './pig-map.component';

describe('PigMapComponent', () => {
  let component: PigMapComponent;
  let fixture: ComponentFixture<PigMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PigMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
