import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MespublicationsComponent } from './mespublications.component';

describe('MespublicationsComponent', () => {
  let component: MespublicationsComponent;
  let fixture: ComponentFixture<MespublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MespublicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MespublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
