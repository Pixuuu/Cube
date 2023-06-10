import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierComponent } from './publier.component';

describe('PublierComponent', () => {
  let component: PublierComponent;
  let fixture: ComponentFixture<PublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
