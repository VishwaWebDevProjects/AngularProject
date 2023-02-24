import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPigFormComponent } from './add-pig-form.component';

describe('AddPigFormComponent', () => {
  let component: AddPigFormComponent;
  let fixture: ComponentFixture<AddPigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPigFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
