import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ItemGridComponent } from "./item-grid/item-grid.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, ItemGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webshop';
}
