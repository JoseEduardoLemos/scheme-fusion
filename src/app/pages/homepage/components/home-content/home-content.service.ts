import { Injectable, } from "@angular/core";
import chroma from "chroma-js";
import { first } from "rxjs";



export class Exemple {
  constructor(
    public sequence : number,
    public first : string,
    public second : string,
  ){}
}


@Injectable({
    providedIn: "root",
})
export class homeContentService {
    constructor()
    {
        this.primaryColor = '#5c849b';
        this.secundaryColor = '#2a343d';
        this.tertiaryColor = '#435b64';
    }   

    public sidebarVisible : boolean = false;

    public primaryColor : any;
    public secundaryColor : any; 
    public tertiaryColor : any;

    public corPosicionada : string = '';

    public backgroundColor : string = '';

    public colors : Array<String> = [];
    public exempleGenerated : boolean = false;  
    public corTexto : string = '#353535';
    public corTextoAux : string = '';
    public corDestaque : string = '';
    public corFundo : string = '';

    private history : any;


    public exemples : Array<Exemple> = new Array<Exemple>();

    public alterarCor() {

        let box = document.getElementById('primary-box');
        box?.setAttribute('style', `background-color:${this.primaryColor}`);
    
        box = document.getElementById('secundary-box');
        box?.setAttribute('style', `background-color:${this.secundaryColor}`);
    
        box = document.getElementById('tertiary-box');
        box?.setAttribute('style', `background-color:${this.tertiaryColor}`);
    
        this.incrementExemples();
        this.generateExemple();
        this.scrollPage();
      }

      public saveToLocalStorage(){
        window.localStorage.setItem('history', this.history);
      }

      private get getNextVal(){
        return this.exemples.length +1;
      }
      
      public exemplesToJson(){
        this.history = JSON.stringify(this.exemples);
        this.saveToLocalStorage();
      }

      private incrementExemples(){
        if(this.exemples.length < 1 || this.exemples[this.exemples.length - 1].first !== this.primaryColor || this.exemples[this.exemples.length - 1].second !== this.secundaryColor){
            this.exemples.push({sequence: this.getNextVal, first: this.primaryColor, second: this.secundaryColor});
            this.exemples.sort((first, last) => first.sequence - last.sequence)
            this.exemplesToJson();
        }
      }

      public scrollPage(){
        window.scrollTo({ top: 650, behavior: 'smooth'});
      }

    public resetarCor() {

        let box = document.getElementById('primary-box');
        box?.setAttribute('style', 'background-color: #5c849b');
    
        box = document.getElementById('secundary-box');
        box?.setAttribute('style', 'background-color: #2a343d');
    
        // box = document.getElementById('tertiary-box');
        // box?.setAttribute('style', 'background-color: #435b64');

        this.primaryColor = '#5c849b';
        this.secundaryColor = '#2a343d';
        this.tertiaryColor = '#435b64';
    
      }

      public generateExemple(){
        this.exempleGenerated = true;
        this.colors = chroma.scale([this.primaryColor, this.secundaryColor]).mode('lch').colors(16);
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
    
        this.backgroundColor = corMaisClara as string;
          
        // const sortedColors = this.colors.map(color => chroma(color));
        
        // this.colors.sort((a, b) => chroma(a).luminance() - chroma(b).luminance());
      }

};
