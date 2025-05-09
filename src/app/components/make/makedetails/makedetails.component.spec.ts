import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakedetailsComponent } from './makedetails.component';

describe('MakedetailsComponent', () => {
  let component: MakedetailsComponent;
  let fixture: ComponentFixture<MakedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
