import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarpanelComponent } from './navbarpanel.component';

describe('NavbarpanelComponent', () => {
  let component: NavbarpanelComponent;
  let fixture: ComponentFixture<NavbarpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
