import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmemberFormComponent } from './newmember-form.component';

describe('NewmemberFormComponent', () => {
  let component: NewmemberFormComponent;
  let fixture: ComponentFixture<NewmemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewmemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
