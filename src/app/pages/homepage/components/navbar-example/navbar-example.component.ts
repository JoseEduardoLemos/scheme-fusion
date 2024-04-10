import { Component } from '@angular/core';
import { homeContentService } from '../home-content/home-content.service';

@Component({
  selector: 'app-navbar-example',
  standalone: true,
  imports: [],
  templateUrl: './navbar-example.component.html',
  styleUrl: './navbar-example.component.css'
})
export class NavbarExampleComponent {
  constructor(
    public service : homeContentService,
  ) {}

  public get corFundo(){
    return this.service.corFundo;
  }

  public get corDestaque(){
    return this.service.corDestaque;
  }

  public get corTexto(){
    return this.service.corTexto;
  }

  
}
