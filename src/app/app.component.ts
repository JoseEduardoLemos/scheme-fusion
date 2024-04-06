import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomepageComponent, ColorPickerModule]
})
export class AppComponent {
  title = 'material-fusion';
}
