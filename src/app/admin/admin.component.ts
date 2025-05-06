import { Component, inject } from '@angular/core';
import { AddItemComponent } from "../add-item/add-item.component";
import { ItemService } from '../services/item.service';
import { NewItem } from '../models/item';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AddItemComponent, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isAddingItem = false;
  itemService = inject(ItemService);

  onStartAddItem(): void {
    this.isAddingItem = true;
  }

  onCancelAddItem(): void {
    this.isAddingItem = false;
  }
}
