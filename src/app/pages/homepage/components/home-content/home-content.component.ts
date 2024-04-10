import { Component, HostListener, OnInit, } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';
import { homeContentService } from './home-content.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PalletsComponent } from '../pallets/pallets.component';
import { NavbarExampleComponent } from '../navbar-example/navbar-example.component';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    DropdownModule,
    MatFormFieldModule,
    MatSelectModule,
    PalletsComponent,
    NavbarExampleComponent  
  ],
  
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})

export class HomeContentComponent {


  public formModel : String = '';
  public isOne : boolean = true;

  options = [
    { value: 1, label: "Only One" },
    { value: 2, label: "Two Colors" },
    { value: 3, label: "Three, let's Try!" }
  ];
  

  selectedOption = this.options[0].value;

  constructor(
    public homeService: homeContentService,
    private colorPicker : ColorPickerService
  ) {
  
   }

 
  public get exempleGenerated(){
    return this.homeService.exempleGenerated;
  }

  public get corDestaque(){
    return this.homeService.corDestaque;
  }

  public get corFundo(){
    return this.homeService.corFundo;
  }

  public get corTexto(){
    return this.homeService.corTexto;
  }

  public get corTextoAux(){
    return this.homeService.corTextoAux;
  }


  public clickNextPrev(){
    this.isOne = !this.isOne;
  }


  public copyColor(color : String){
    navigator.clipboard.writeText(color as string);
  }

  
  

}
