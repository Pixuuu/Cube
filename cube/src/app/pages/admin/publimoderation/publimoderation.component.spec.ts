import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublimoderationComponent } from './publimoderation.component';

describe('PublimoderationComponent', () => {
  let component: PublimoderationComponent;
  let fixture: ComponentFixture<PublimoderationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublimoderationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublimoderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
