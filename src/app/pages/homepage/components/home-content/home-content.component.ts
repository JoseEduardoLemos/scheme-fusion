import { Component, HostListener, OnInit } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { homeContentService } from './home-content.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerModule,
  ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})

export class HomeContentComponent implements OnInit {

  constructor(
    public homeService: homeContentService,
    private colorPicker : ColorPickerService
  ) {
  
   }

  dica?: HTMLElement;
  box1?: HTMLElement;
  box2?: HTMLElement;
  box3?: HTMLElement;
  corPosicionada? : String;

  ngOnInit(): void {
    this.dica = document.getElementById('dica') as HTMLElement;
    this.box1 = document.getElementById('primary-box') as HTMLElement;
    this.box2 = document.getElementById('secundary-box') as HTMLElement;
    this.box3 = document.getElementById('tertiary-box') as HTMLElement;    

    this.definirHoverDasCores();
  }

  public alterarCor() {
    let box = document.getElementById('primary-box');
    box?.setAttribute('style', `background-color:${this.homeService.primaryColor}`);

    box = document.getElementById('secundary-box');
    box?.setAttribute('style', `background-color:${this.homeService.secundaryColor}`);

    box = document.getElementById('tertiary-box');
    box?.setAttribute('style', `background-color:${this.homeService.tertiaryColor}`);

    this.generateExemple();
    this.scrollPage();
  }

  public generateExemple(){}

  public scrollPage(){
    window.scrollTo({ top: 650, behavior: 'smooth'});
  }

  public resetarCor() {

    let box = document.getElementById('primary-box');
    box?.setAttribute('style', 'background-color: #5c849b');

    box = document.getElementById('secundary-box');
    box?.setAttribute('style', 'background-color: #435b64');

    box = document.getElementById('tertiary-box');
    box?.setAttribute('style', 'background-color: #2a343d');

  }

  public definirHoverDasCores(){

    this.box1!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 75}px`;
      this.dica!.style.top = `${e.pageY - 75}px`;
      this.corPosicionada = 'Cor Primária';
      e.stopPropagation();
    });

    this.box1!.addEventListener('mouseleave', (e : MouseEvent) =>{
      this.dica!.style.visibility = 'hidden';
    });

    this.box2!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 75}px`;
      this.dica!.style.top = `${e.pageY - 75}px`;
      this.corPosicionada = 'Cor Secundária';
      e.stopPropagation();
    });

    this.box2!.addEventListener('mouseleave', (e : MouseEvent) =>{
      this.dica!.style.visibility = 'hidden';
    });

    this.box3!.addEventListener('mousemove', (e: MouseEvent) => {
      this.dica!.style.visibility = 'visible';
      this.dica!.style.left = `${e.pageX - 75}px`;
      this.dica!.style.top = `${e.pageY - 75}px`;
      this.corPosicionada = 'Cor Terciária';
    });

    this.box3!.addEventListener('mouseleave', (e : MouseEvent) =>{
      this.dica!.style.visibility = 'hidden';
    });
  }

}
