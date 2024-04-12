import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { homeContentService } from '../home-content/home-content.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-pallets',
  standalone: true,
  imports: [
    ColorPickerModule,
    SelectButtonModule,
    FormsModule,
    MatButtonToggleModule
  ],
  templateUrl: './pallets.component.html',
  styleUrl: './pallets.component.css'
})
export class PalletsComponent implements OnInit{
  
  constructor(
    public homeService : homeContentService,
  ) {}


  dica?: HTMLElement;
  box1?: HTMLElement;
  box2?: HTMLElement;
  box3?: HTMLElement;
 

  ngOnInit(): void {
    this.dica = document.getElementById('dica') as HTMLElement;
    this.box1 = document.getElementById('primary-box') as HTMLElement;
    this.box2 = document.getElementById('secondary-box') as HTMLElement;
    // this.box3 = document.getElementById('tertiary-box') as HTMLElement;    

    this.definirHoverDasCores();
  }

  // generationOptions = [
  //   { label: 'Objetive', value: false },
  //   { label: 'Random', value: true },
  // ];

  // value : string = 'Objetive';

  public onToggleValueChange(event : MatButtonToggleChange){
    this.homeService.random = event.value;
   
  }

  public definirHoverDasCores(){

    this.box1!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 50}px`;
      this.dica!.style.top = `${e.pageY - 100}px`;
      this.homeService.corPosicionada = 'Primary Color';
      e.stopPropagation();
    });

    this.box1!.addEventListener('mouseleave', (e : MouseEvent) =>{
      this.dica!.style.visibility = 'hidden';
    });

    this.box2!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 50}px`;
      this.dica!.style.top = `${e.pageY - 100}px`;
      this.homeService.corPosicionada = 'Secondary Color';
      e.stopPropagation();
    });

    this.box2!.addEventListener('mouseleave', (e : MouseEvent) =>{
      this.dica!.style.visibility = 'hidden';
    });

      }

  public resetarCor(){
    this.homeService.resetarCor();
  }

  public alterarCor(){
    this.homeService.alterarCor();
  }

  public get corPosicionada(){
    return this.homeService.corPosicionada;
  }
}
