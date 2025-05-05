import { inject, Injectable, OnInit, signal } from "@angular/core";
import { Item } from "../models/item";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ItemService implements OnInit {
    private httpClient = inject(HttpClient);
    private items: Item[] = [];
    // Mock items lijst
    private itemList = signal<Item[]>([
        new Item(1, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(2, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(3, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(4, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(5, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(6, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(7, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(8, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(9, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(10, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(11, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(12, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(13, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(14, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(15, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(16, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(17, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(18, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(19, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
    ]);

    getItems = this.itemList;

    addItem(newItem: Omit<Item, 'id'>) {
        const current = this.itemList();
        const newId = current.length ? Math.max(...current.map(i => i.id)) + 1 : 1;
        this.itemList.set([...current, new Item(newId, newItem.name, newItem.category, newItem.price, newItem.image)]);
      }
    
      deleteItem(id: number) {
        this.itemList.set(this.itemList().filter(item => item.id !== id));
      }

    ngOnInit() {

    }
    // addItem(newItem: NewItem) {


    //     this.httpClient.put('http://localhost:8080/addItem', newItem)
    //         .subscribe({
    //             next: (resData) => console.log(resData)
    //         })
        //     if(this.items.length == 0){
        //         this.items.push({
        //             id: 0,
        //             name: newItem.name,
        //             category: newItem.category,
        //             price: newItem.price,
        //             image: newItem.image
        //         });
        //     } else {
        //     this.items.push({
        //         id: this.items[this.items.length-1].id + 1,
        //         name: newItem.name,
        //         category: newItem.category,
        //         price: newItem.price,
        //         image: newItem.image
        //     });
        // }
    //     console.log(this.items);
    // }

    // removeItem(id: number) {
    //     this.items = this.items.filter(item => item.id !== id);
    // }

    // getItems() {
    //     return this.items;
    // }
}