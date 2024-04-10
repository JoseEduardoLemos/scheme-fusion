import { Component } from '@angular/core';
import { homeContentService } from '../home-content/home-content.service';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login-example',
  standalone: true,
  imports: [
    CheckboxModule,
  ],
  templateUrl: './login-example.component.html',
  styleUrl: './login-example.component.css'
})
export class LoginExampleComponent {
  constructor(
    public service : homeContentService,
  ){

  }

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
