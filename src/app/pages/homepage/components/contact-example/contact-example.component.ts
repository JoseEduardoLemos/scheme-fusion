import { Component } from '@angular/core';
import { homeContentService } from '../home-content/home-content.service';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-contact-example',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
  ],
  templateUrl: './contact-example.component.html',
  styleUrl: './contact-example.component.css'
})
export class ContactExampleComponent {


  constructor(
    public service : homeContentService,
  ){ }

  public isOne : boolean = true;

  public get corFundo(){
    return this.service.corFundo;
  }

  public get corDestaque(){
    return this.service.corDestaque;
  }

  public get corTextoAux(){
    return this.service.corTextoAux;
  }

  
  public clickNextPrev(){
    this.isOne = !this.isOne;
  }

}
