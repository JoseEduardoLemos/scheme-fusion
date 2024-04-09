import { Component, HostListener, OnInit, } from '@angular/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { homeContentService } from './home-content.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import chroma, { Color } from "chroma-js";
import { stringify } from 'querystring';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
  ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})

export class HomeContentComponent implements OnInit {


  public formModel : String = '';
  public isOne : boolean = true;
  public colors : Array<String> = [];
  public corTexto : string = '#353535';
  public corTextoAux : string = '';
  public corDestaque : string = '';
  public corFundo : string = '';

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

  public clickNextPrev(){
    this.isOne = !this.isOne;
  }

  public alterarCor() {
    let box = document.getElementById('primary-box');
    box?.setAttribute('style', `background-color:${this.homeService.primaryColor}`);

    box = document.getElementById('secundary-box');
    box?.setAttribute('style', `background-color:${this.homeService.secundaryColor}`);

    box = document.getElementById('tertiary-box');
    box?.setAttribute('style', `background-color:${this.homeService.tertiaryColor}`);

    this.scrollPage();
    this.generateExemple();
  }

  public generateExemple(){
    this.colors = chroma.scale([this.homeService.primaryColor, this.homeService.secundaryColor, this.homeService.tertiaryColor]).mode('lch').colors(16);
    let maxContrast = 0;
    let corMaisClara;
    let corMaisEscura;

    for (const color of this.colors){
      const constraste = chroma.contrast(color as string, 'black');
      if(constraste > maxContrast){
        maxContrast = constraste;
        corMaisClara = color;
      } else{
        corMaisEscura = color;
      }
    }
    this.corFundo = corMaisClara as string;
    this.corDestaque = corMaisEscura as string;

    let luminosidade = chroma(corMaisClara as string).luminance();
    if(luminosidade > 0.5){
      this.corTexto = '#353535';
    } else {
      this.corTexto = 'white';
    }

    luminosidade = chroma(this.corDestaque as string).luminance();
    if(luminosidade > 0.5){
      this.corTextoAux = '#353535';
    } else {
      this.corTextoAux = 'white';
    }

    this.homeService.backgroundColor = corMaisClara as string;
    let bg1 = document.getElementById('bg-1');
    bg1!.style.backgroundColor = corMaisClara as string;

    bg1 = document.getElementById('bg-2');
    bg1!.style.backgroundColor = corMaisClara as string;

    bg1 = document.getElementById('bg-3');
    bg1!.style.backgroundColor = corMaisClara as string;

    bg1 = document.getElementById('bg-4');
    bg1!.style.backgroundColor = corMaisClara as string;

    let destaque = document.getElementById('destaque-1');
    destaque!.style.backgroundColor = corMaisEscura as string;

    destaque = document.getElementById('destaque-2');
    destaque!.style.backgroundColor = corMaisEscura as string;

    destaque = document.getElementById('destaque-3');
    destaque!.style.backgroundColor = corMaisEscura as string;

    destaque = document.getElementById('destaque-4');
    destaque!.style.backgroundColor = corMaisEscura as string;


    // console.log(corMaisClara)
    // const sortedColors = this.colors.map(color => chroma(color));
    
    // this.colors.sort((a, b) => chroma(a).luminance() - chroma(b).luminance());
  }

  public scrollPage(){
    window.scrollTo({ top: 650, behavior: 'smooth'});
  }

  public copyColor(color : String){
    navigator.clipboard.writeText(color as string);
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
