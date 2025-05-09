import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakelistComponent } from './makelist.component';

describe('MakelistComponent', () => {
  let component: MakelistComponent;
  let fixture: ComponentFixture<MakelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
