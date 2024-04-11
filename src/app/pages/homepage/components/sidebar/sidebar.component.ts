import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class SidebarComponent {
  constructor(
    public service : homeContentService,
  ) {}

  public get sidebarVisible(){
    return this.service.sidebarVisible;
  }

  public get exemples(){
    return this.service.exemples;
  }

  public get exemplesReversed(){
    return this.exemples.reverse();
  }

  public last(exemple : Exemple){
    return this.exemples[this.exemples.length - 1].sequence === exemple.sequence;
  }

  public returnExemple(exemple : Exemple){
    this.service.primaryColor = exemple.first;
    this.service.secundaryColor = exemple.second;
  }

}
