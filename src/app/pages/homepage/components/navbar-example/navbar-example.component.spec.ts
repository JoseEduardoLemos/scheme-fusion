import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarExampleComponent } from './navbar-example.component';

describe('NavbarExampleComponent', () => {
  let component: NavbarExampleComponent;
  let fixture: ComponentFixture<NavbarExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
