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
        this.secondaryColor = '#2a343d';
        this.tertiaryColor = '#435b64';
    }   

    public sidebarVisible : boolean = false;

    public primaryColor : any;
    public secondaryColor : any; 
    public tertiaryColor : any;

    public corPosicionada : string = '';

    public backgroundColor : string = '';

    public primaryColors : Array<String> = [];
    public secondaryColors : Array<String> = [];
    public exempleGenerated : boolean = false;  
    public corTexto : string = '#353535';
    public corTextoAux : string = '';
    public corDestaque : string = '';
    public corFundo : string = '';

    private history : any;
    public random : boolean = false;


    public exemples : Array<Exemple> = new Array<Exemple>();

    public alterarCor() {

        let box = document.getElementById('primary-box');
        box?.setAttribute('style', `background-color:${this.primaryColor}`);
    
        box = document.getElementById('secondary-box');
        box?.setAttribute('style', `background-color:${this.secondaryColor}`);
    
        // box = document.getElementById('tertiary-box');
        // box?.setAttribute('style', `background-color:${this.tertiaryColor}`);
    
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
        if(this.exemples.length < 1 || this.exemples[this.exemples.length - 1].first !== this.primaryColor || this.exemples[this.exemples.length - 1].second !== this.secondaryColor){
            if(this.exemples.length > 19){
              this.removeExemple(this.exemples[this.exemples.length -1]);
            }
          
            this.exemples.push({sequence: this.getNextVal, first: this.primaryColor, second: this.secondaryColor});
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
    
        box = document.getElementById('secondary-box');
        box?.setAttribute('style', 'background-color: #2a343d');
    
        // box = document.getElementById('tertiary-box');
        // box?.setAttribute('style', 'background-color: #435b64');

        this.primaryColor = '#5c849b';
        this.secondaryColor = '#2a343d';
        this.tertiaryColor = '#435b64';
    
      }

      public generateExemple(){

        let maxContrast = 0;
        let corMaisClara;
        let corMaisEscura;

        this.exempleGenerated = true;
      
        if(this.random) {

          this.primaryColors = chroma.scale(['white', chroma(this.primaryColor).hex(), 'black']).mode("lab").colors(22);
          this.secondaryColors = chroma.scale(['white', chroma(this.secondaryColor).hex(), 'black']).mode('lab').colors(22);

          this.primaryColors.splice(0, 1);
          this.primaryColors.splice(this.primaryColors.length -1, 1);

          this.secondaryColors.splice(0,1);
          this.secondaryColors.splice(this.secondaryColors.length -1, 1);

          let index = Math.floor(Math.random() * this.primaryColors.length);

          let randomPrimary = this.primaryColors[index] as string;
          let randomSecondary = this.secondaryColors[Math.floor(Math.random() * this.secondaryColors.length)] as string;

          if(chroma.contrast(randomPrimary, 'black') > chroma.contrast(randomSecondary, 'black')){
            corMaisClara = randomPrimary;
            corMaisEscura = randomSecondary;
          } else {
            corMaisClara = randomSecondary;
            corMaisEscura = randomPrimary;
          }
        } else {
          if(chroma.contrast(this.primaryColor, 'black') > chroma.contrast(this.secondaryColor, 'black')){
            corMaisClara = this.primaryColor;
            corMaisEscura = this.secondaryColor;
          } else {
            corMaisEscura = this.primaryColor;
            corMaisClara = this.secondaryColor;
          }

          // for (const color of this.colors){
          //   const constraste = chroma.contrast(color as string, 'black');
          //   if(constraste > maxContrast){
          //     maxContrast = constraste;
          //     corMaisClara = color;
          //   } else{
          //     corMaisEscura = color;
          //   }
          // }
      }

        corMaisClara = chroma(corMaisClara as string).hex();
        this.corFundo = corMaisClara;
        corMaisEscura = chroma(corMaisEscura as string).hex();
        this.corDestaque = corMaisEscura;      

        let luminosidade = chroma(corMaisClara).luminance();
        if(luminosidade > 0.5){
          this.corTexto = '#353535';
        } else {
          this.corTexto = 'white';
        }
    
        luminosidade = chroma(this.corDestaque).luminance();
        if(luminosidade > 0.5){
          this.corTextoAux = '#353535';
        } else {
          this.corTextoAux = 'white';
        }


        this.backgroundColor = corMaisClara as string;
          
        // const sortedColors = this.colors.map(color => chroma(color));
        
        // this.colors.sort((a, b) => chroma(a).luminance() - chroma(b).luminance());
      }


      public removeExemple(exemple : Exemple){
        this.exemples = this.exemples.reverse();
        this.exemples.splice(exemple.sequence -1, 1);
        this.atualizarSequencias();
        this.exemplesToJson();
      }
    
      public atualizarSequencias(){
        for(let x = 0; x < this.exemples.length; x++){
          let exemple = this.exemples[x];
          if(exemple.sequence -1 !== x){
            exemple.sequence = x +1;  
          }
        }
      }
};
