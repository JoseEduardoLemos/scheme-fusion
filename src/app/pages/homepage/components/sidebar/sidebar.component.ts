import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Exemple, homeContentService } from '../home-content/home-content.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit {
  constructor(
    public service : homeContentService,
  ) { }


  ngAfterViewInit(){
    this.fetchFromLocalStorage();
  }



  public get sidebarVisible(){
    return this.service.sidebarVisible;
  }

  public get exemples(){
    return this.service.exemples;
  }

  public get exemplesReversed(){
    return this.fetchFromLocalStorage().reverse();
  }

  public last(exemple : Exemple){
    return this.exemples[this.exemples.length - 1].sequence === exemple.sequence;
  }

  public returnExemple(exemple : Exemple){
    this.service.primaryColor = exemple.first;
    this.service.secundaryColor = exemple.second;
  }

  private fetchFromLocalStorage(){
    if(!!window.localStorage.getItem('history')){
      this.service.exemples = JSON.parse(window.localStorage.getItem('history')!); 
    }

    return this.exemples;
  }

}
