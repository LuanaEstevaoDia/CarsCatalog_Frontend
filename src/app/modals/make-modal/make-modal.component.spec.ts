import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeModalComponent } from './make-modal.component';

describe('MakeModalComponent', () => {
  let component: MakeModalComponent;
  let fixture: ComponentFixture<MakeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
