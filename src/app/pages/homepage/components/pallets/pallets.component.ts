import { Component, OnInit } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { homeContentService } from '../home-content/home-content.service';


@Component({
  selector: 'app-pallets',
  standalone: true,
  imports: [
    ColorPickerModule,

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
    this.box2 = document.getElementById('secundary-box') as HTMLElement;
    // this.box3 = document.getElementById('tertiary-box') as HTMLElement;    

    this.definirHoverDasCores();
  }

  public definirHoverDasCores(){

    this.box1!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 50}px`;
      this.dica!.style.top = `${e.pageY - 100}px`;
      this.homeService.corPosicionada = 'Cor Primária';
      e.stopPropagation();
    });

    this.box1!.addEventListener('mouseleave', (e : MouseEvent) =>{
      this.dica!.style.visibility = 'hidden';
    });

    this.box2!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 50}px`;
      this.dica!.style.top = `${e.pageY - 100}px`;
      this.homeService.corPosicionada = 'Cor Secundária';
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
