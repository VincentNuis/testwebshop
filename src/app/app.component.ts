import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AdminComponent } from "./admin/admin.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'webshop';
}
