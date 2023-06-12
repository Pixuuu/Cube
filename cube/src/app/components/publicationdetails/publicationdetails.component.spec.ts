import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationdetailsComponent } from './publicationdetails.component';

describe('PublicationdetailsComponent', () => {
  let component: PublicationdetailsComponent;
  let fixture: ComponentFixture<PublicationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
