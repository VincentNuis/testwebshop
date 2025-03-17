import { Component } from '@angular/core';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-item-grid',
  imports: [ItemComponent],
  templateUrl: './item-grid.component.html',
  styleUrl: './item-grid.component.scss'
})
export class ItemGridComponent {

}
