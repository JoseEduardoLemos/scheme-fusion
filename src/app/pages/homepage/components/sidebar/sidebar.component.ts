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

  public setSidebar(){
    this.service.sidebarVisible = !this.service.sidebarVisible;
  }

  public get hasExamples(){
    return this.exemples.length > 0;
  }

  public get exemples(){
    return this.service.exemples;
  }

  public get exemplesReversed(){
    return this.fetchFromLocalStorage().reverse();
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

  public removeExemple(exemple: Exemple){
    this.service.removeExemple(exemple);
  }


}
