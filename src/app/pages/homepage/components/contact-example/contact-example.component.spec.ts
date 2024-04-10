import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactExampleComponent } from './contact-example.component';

describe('ContactExampleComponent', () => {
  let component: ContactExampleComponent;
  let fixture: ComponentFixture<ContactExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
