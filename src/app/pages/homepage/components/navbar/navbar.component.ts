import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { homeContentService } from '../home-content/home-content.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SidebarComponent,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public service : homeContentService
  ) {}

  public setSidebarVisible(){
    this.service.sidebarVisible = !this.service.sidebarVisible;
  }

}
